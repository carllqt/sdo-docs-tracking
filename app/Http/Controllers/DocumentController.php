<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index(Request $request)
    {
        $employee = $request->user()->employee()->with('station')->first();

        return Inertia::render('EmployeeModule/Index', [
            'employee' => $employee,
            'documents' => $employee
                ? $employee->documents()->latest('id')->paginate(10)->withQueryString()
                : null,
        ]);
    }

    public function store(Request $request)
    {
        abort_unless($request->user()->employee()->exists(), 403, 'An employee profile is required.');

        $request->merge([
            'control_number' => is_string($request->control_number) ? strtoupper(trim($request->control_number)) : $request->control_number,
        ]);
        $data = $request->validate([
            'control_number' => ['required', 'string', 'max:100', 'regex:/\A[A-Z0-9][A-Z0-9._\/-]*\z/', 'unique:documents,tracking_number'],
            'title' => ['required', 'string', 'max:255'],
        ], [
            'control_number.unique' => 'This control number is already registered.',
            'control_number.regex' => 'Use letters, numbers, hyphens, slashes, dots or underscores without spaces.',
        ]);

        try {
            $document = DB::transaction(function () use ($request, $data) {
                $employee = $request->user()->employee()->lockForUpdate()->first();
                abort_unless($employee && $employee->station()->exists(), 403, 'An employee station is required.');

                return $employee->documents()->create([
                    'tracking_number' => $data['control_number'],
                    'title' => $data['title'],
                    'qr_token' => (string) Str::uuid(),
                    'origin_station_id' => $employee->station_id,
                    'current_station_id' => $employee->station_id,
                ]);
            }, 3);
        } catch (UniqueConstraintViolationException $exception) {
            // The unique index also protects simultaneous submissions.
            if (Document::where('tracking_number', $data['control_number'])->exists()) {
                throw ValidationException::withMessages(['control_number' => 'This control number is already registered.']);
            }
            throw $exception;
        }

        return to_route('employeemodule.show', $document->qr_token)->with('document_saved', true);
    }

    public function show(Request $request, Document $document)
    {
        abort_unless($request->user()->employee()->whereKey($document->created_by)->exists(), 403);

        return Inertia::render('EmployeeModule/Show', [
            'document' => $document->load('originStation:id,name'),
            'qrValue' => route('employeemodule.show', $document->qr_token),
            'saved' => (bool) $request->session()->get('document_saved'),
        ]);
    }
}
