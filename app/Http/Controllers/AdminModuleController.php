<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\RegistrationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminModuleController extends Controller
{
    public function index(Request $request)
    {
        abort_unless($request->user()->hasRole('admin'), 403);

        $tab = $request->query('tab', 'documents');
        $tab = in_array($tab, ['documents', 'activity', 'registrations'], true) ? $tab : 'documents';
        $documentCount = Document::count();
        $movementCounts = DB::table('document_movements')
            ->selectRaw('COUNT(released_at) as released, COUNT(received_at) as received')->first();
        $stats = [
            'documents' => $documentCount,
            'activity' => $documentCount + (int) $movementCounts->released + (int) $movementCounts->received,
            'registrations' => RegistrationRequest::where('status', 'pending')->count(),
        ];

        $documents = $tab === 'documents' ? Document::with([
            'creator:id,first_name,middle_name,last_name',
            'originStation:id,name',
            'currentStation:id,name',
        ])->latest('id')->paginate(10, ['*'], 'documents_page', total: $stats['documents'])->withQueryString() : null;

        $activities = null;
        if ($tab === 'activity') {
        // Receiving adds an event without replacing the earlier release event.
        $created = DB::table('documents')->selectRaw("id as document_id, 
                            id as event_id, 
                            'Created' as action, 
                            created_at as occurred_at, 
                            created_by as employee_id, 
                            origin_station_id as station_id, 
                            NULL as from_station_id, 
                            NULL as remarks");
        $released = DB::table('document_movements')->whereNotNull('released_at')
            ->selectRaw("document_id, 
                        id as event_id, 
                        'Released' as action, 
                        released_at as occurred_at, 
                        released_by as employee_id, 
                        to_station_id as station_id, 
                        from_station_id, remarks");
        $received = DB::table('document_movements')->whereNotNull('received_at')
            ->selectRaw("document_id, 
                        id as event_id, 
                        'Received' as action, 
                        received_at as occurred_at, 
                        received_by as employee_id, 
                        to_station_id as station_id, 
                        from_station_id, remarks");

        $activities = DB::query()->fromSub($created->unionAll($released)->unionAll($received), 'events')
            ->join('documents as d', 'd.id', '=', 'events.document_id')
            ->leftJoin('employees as e', 'e.id', '=', 'events.employee_id')
            ->leftJoin('stations as s', 's.id', '=', 'events.station_id')
            ->leftJoin('stations as f', 'f.id', '=', 'events.from_station_id')
            ->select(
                'events.*', 
                DB::raw('CAST(d.tracking_number AS CHAR) as tracking_number'),
                'd.title',
                'e.first_name',
                'e.middle_name', 
                'e.last_name', 
                's.name as station_name', 
                'f.name as from_station_name')
            ->orderByDesc('occurred_at')->orderByDesc('event_id')->orderBy('action')
            ->paginate(10, ['*'], 'activity_page', total: $stats['activity'])->withQueryString();
        }

        $registrations = $tab === 'registrations'
            ? RegistrationRequest::where('status', 'pending')
                ->select('id', 'name', 'first_name', 'middle_name', 'last_name', 'email', 'station_id', 'status', 'created_at')
                ->with('station:id,name,type')->latest('id')->paginate(10, ['*'], 'registrations_page', total: $stats['registrations'])->withQueryString()
            : null;
        return Inertia::render('AdminModule/Index', [
            'tab' => $tab,
            'stats' => $stats,
            'documents' => $tab === 'documents' ? $documents : null,
            'activities' => $tab === 'activity' ? $activities : null,
            'registrations' => $registrations,
        ]);
    }
}
