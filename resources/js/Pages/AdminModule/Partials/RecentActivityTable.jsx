import { formatEmployeeName } from "@/Pages/utils";
import TablePagination from './TablePagination';

const actionStyles = { Created: 'bg-[#7b2fff]/15 text-[#c9a9ff] ring-1 ring-[#7b2fff]/30', Released: 'bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/25', Received: 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/25' };

const RecentActivityTable = ({ activities }) => {
    return <section className="min-w-0 overflow-hidden rounded-[22px] border-[3px] border-[#ff3af2] bg-[#191225] shadow-[5px_5px_0_#7b2fff,9px_9px_0_#ff3af220]">
        <div className="relative border-b-2 border-dashed border-[#7b2fff] p-5 sm:p-6"><p className="mb-3 pr-8 text-[10px] font-extrabold tracking-[2px] text-[#ff3af2]">02 / FOLLOW EVERY MOVE</p><span aria-hidden="true" className="absolute right-6 top-5 text-[30px] text-[#ffe600]">↗</span><h2 className="font-['Outfit',sans-serif] text-2xl font-extrabold tracking-[-.8px] text-white [text-shadow:2px_2px_0_#7b2fff] sm:text-[26px]">Recent document activity</h2><p className="mt-1 text-sm text-[#bcaecc]">Recorded creation, release, and receipt events, newest first.</p></div>
        <div className="overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00f5d4]" tabIndex={0} role="region" aria-label="Scrollable records"><table className="w-full min-w-[900px] text-left text-sm">
            <caption className="sr-only">Recent document activity across all stations</caption>
            <thead className="border-b-2 border-[#7b2fff] bg-[#2a1c40] text-[10px] uppercase tracking-[1px] text-[#e3deec]"><tr>{['Date & time', 'Document', 'Activity', 'Employee', 'Station / route', 'Remarks'].map(label => <th key={label} scope="col" className="px-5 py-4 font-semibold">{label}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#443250]">
                {activities.data.length === 0 ? <tr><td colSpan={6} className="px-6 py-16 text-center text-[#c4b6d6] bg-[radial-gradient(circle,#00f5d413_1px,transparent_1px)] [background-size:18px_18px]">Activity will appear when documents are registered or transferred.</td></tr> : activities.data.map(event => <tr key={`${event.action}-${event.event_id}`} className="hover:bg-[#261a36]">
                    <td className="whitespace-nowrap px-5 py-4 text-[#bcaecc]">{event.occurred_at}</td>
                    <th scope="row" className="max-w-xs break-words px-5 py-4"><p className="font-semibold text-[#00f5d4]">{event.tracking_number}</p><p className="mt-1 font-normal text-[#bcaecc]">{event.title}</p></th>
                    <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${actionStyles[event.action]}`}>{event.action}</span></td>
                    <td className="px-5 py-4 text-[#e3deec]">{formatEmployeeName(event) || 'Unavailable'}</td>
                    <td className="px-5 py-4 text-[#bcaecc]">{event.from_station_name && <span>{event.from_station_name} → </span>}{event.station_name ?? 'Unavailable'}</td>
                    <td className="max-w-xs whitespace-pre-wrap break-words px-5 py-4 text-[#bcaecc]">{event.remarks || '—'}</td>
                </tr>)}
            </tbody>
        </table></div>
        <TablePagination paginator={activities} />
    </section>;
};

export default RecentActivityTable;
