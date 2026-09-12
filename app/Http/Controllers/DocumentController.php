<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Station;
use Illuminate\Validation\Rule;
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
            'sdoOffices' => Station::where('type', 'sdo_office')->orderBy('name')->get(['id', 'name']),
            'documents' => $employee
                ? $employee->documents()->latest('id')->paginate(10)->withQueryString()
                : null,
        ]);
    }

    public function store(Request $request)
    {
        abort_unless($request->user()->employee()->exists(), 403, 'An employee profile is required.');

        $controlNumber = $request->input('control_number');
        if (is_string($controlNumber)) {
            $controlNumber = trim($controlNumber);
            if (preg_match('/\A[0-9]+\z/', $controlNumber)) {
                $controlNumber = ltrim($controlNumber, '0') ?: '0';
            }
        }
        $request->merge(['control_number' => $controlNumber]);
        $data = $request->validate([
            'control_number' => ['bail', 'required', 'string', 'max:20', 'regex:/\A[0-9]+\z/',
                function ($attribute, $value, $fail) {
                    if (strlen($value) === 20 && strcmp($value, '18446744073709551615') > 0) {
                        $fail('The control number must not exceed 18446744073709551615.');
                    }
                },
                'unique:documents,tracking_number'],
            'title' => ['required', 'string', 'max:255'],
            'to_station_id' => ['required', 'integer', Rule::exists('stations', 'id')->where('type', 'sdo_office')],
        ], [
            'control_number.unique' => 'This control number is already registered.',
            'control_number.regex' => 'Use numbers only (0–9), without letters, spaces, or symbols.',
        ]);

        try {
            $document = DB::transaction(function () use ($request, $data) {
                $employee = $request->user()->employee()->lockForUpdate()->first();
                abort_unless($employee && $employee->station()->exists(), 403, 'An employee station is required.');

                $document = $employee->documents()->create([
                    'tracking_number' => $data['control_number'],
                    'title' => $data['title'],
                    'qr_token' => (string) Str::uuid(),
                    'origin_station_id' => $employee->station_id,
                    'current_station_id' => $employee->station_id,
                ]);

                $document->movements()->create([
                    'from_station_id' => $employee->station_id,
                    'to_station_id' => $data['to_station_id'],
                    'released_by' => $employee->id,
                    'released_at' => now(),
                ]);

                return $document;
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

        return Inertia::render('EmployeeModule/Partials/Show', [
            'document' => $document->load('originStation:id,name'),
            'qrValue' => route('employeemodule.show', $document->qr_token),
            'saved' => (bool) $request->session()->get('document_saved'),
        ]);
    }
}
