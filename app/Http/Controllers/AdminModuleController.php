<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminModuleController extends Controller
{
    public function index(Request $request)
    {
        abort_unless($request->user()->hasRole('admin'), 403);

        $documents = Document::with([
            'creator:id,first_name,middle_name,last_name',
            'originStation:id,name',
            'currentStation:id,name',
        ])->latest('id')->paginate(10, ['*'], 'documents_page')->withQueryString();

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
                'd.tracking_number', 
                'd.title',
                'e.first_name',
                'e.middle_name', 
                'e.last_name', 
                's.name as station_name', 
                'f.name as from_station_name')
            ->orderByDesc('occurred_at')->orderByDesc('event_id')->orderBy('action')
            ->paginate(10, ['*'], 'activity_page')->withQueryString();

        return Inertia::render('AdminModule/Index', compact('documents', 'activities'));
    }
}