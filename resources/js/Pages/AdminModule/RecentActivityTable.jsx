import TablePagination from './TablePagination';

const actionStyles = { Created: 'bg-indigo-50 text-indigo-700', Released: 'bg-amber-50 text-amber-700', Received: 'bg-emerald-50 text-emerald-700' };

export default function RecentActivityTable({ activities }) {
    return <section className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6"><h2 className="text-lg font-semibold text-gray-900">Recent document activity</h2><p className="mt-1 text-sm text-gray-500">Recorded creation, release, and receipt events, newest first.</p></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm">
            <caption className="sr-only">Recent document activity across all stations</caption>
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr>{['Date & time', 'Document', 'Activity', 'Employee', 'Station / route', 'Remarks'].map(label => <th key={label} scope="col" className="px-5 py-4 font-semibold">{label}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
                {activities.data.length === 0 ? <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-500">Activity will appear when documents are registered or transferred.</td></tr> : activities.data.map(event => <tr key={`${event.action}-${event.event_id}`} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-5 py-4 text-gray-500">{event.occurred_at}</td>
                    <th scope="row" className="max-w-xs break-words px-5 py-4"><p className="font-semibold text-indigo-600">{event.tracking_number}</p><p className="mt-1 font-normal text-gray-500">{event.title}</p></th>
                    <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${actionStyles[event.action]}`}>{event.action}</span></td>
                    <td className="px-5 py-4 text-gray-700">{[event.first_name, event.middle_name, event.last_name].filter(Boolean).join(' ') || 'Unavailable'}</td>
                    <td className="px-5 py-4 text-gray-500">{event.from_station_name && <span>{event.from_station_name} → </span>}{event.station_name ?? 'Unavailable'}</td>
                    <td className="max-w-xs whitespace-pre-wrap break-words px-5 py-4 text-gray-500">{event.remarks || '—'}</td>
                </tr>)}
            </tbody>
        </table></div>
        <TablePagination paginator={activities} />
    </section>;
}
