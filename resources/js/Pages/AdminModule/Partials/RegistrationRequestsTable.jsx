import { formatEmployeeName } from '@/Pages/utils';
import TablePagination from './TablePagination';

const RegistrationRequestsTable = ({ registrations }) => (
    <section className="min-w-0 overflow-hidden rounded-[22px] border-[3px] border-[#ffe600] bg-[#191225] shadow-[5px_5px_0_#7b2fff]">
        <div className="border-b-2 border-dashed border-[#7b2fff] p-5 sm:p-6">
            <p className="mb-3 text-[10px] font-extrabold tracking-[2px] text-[#ffe600]">03 / WAITING FOR REVIEW</p>
            <h2 className="font-['Outfit',sans-serif] text-2xl font-extrabold text-white [text-shadow:2px_2px_0_#7b2fff]">Employee registration requests</h2>
            <p className="mt-2 text-sm text-[#c4b6d6]">Pending registrations from schools and SDO units.</p>
        </div>
        <div className="overflow-x-auto" role="region" aria-label="Pending registrations" tabIndex={0}>
            <table className="w-full min-w-[760px] text-left text-sm">
                <caption className="sr-only">Employees awaiting account approval</caption>
                <thead className="border-b-2 border-[#7b2fff] bg-[#2a1c40] text-[10px] uppercase tracking-[1px] text-[#e3deec]"><tr>{['Employee', 'Email', 'School / SDO unit', 'Submitted', 'Status'].map(label => <th key={label} scope="col" className="px-5 py-4">{label}</th>)}</tr></thead>
                <tbody className="divide-y divide-[#443250]">
                    {registrations.data.length === 0 ? <tr><td colSpan={5} className="px-6 py-16 text-center text-[#c4b6d6]">No registrations awaiting approval.</td></tr> : registrations.data.map(request => <tr key={request.id} className="hover:bg-[#2b1c3c]">
                        <th scope="row" className="max-w-[220px] break-words px-5 py-4 font-semibold text-white">{formatEmployeeName(request) || request.name}</th>
                        <td className="max-w-[250px] break-words px-5 py-4 text-[#c4b6d6]">{request.email}</td>
                        <td className="max-w-[260px] px-5 py-4 text-[#e3deec]">{request.station?.name || 'Unavailable'}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-xs text-[#c4b6d6]">{new Date(request.created_at).toLocaleString()}</td>
                        <td className="px-5 py-4"><span className="whitespace-nowrap rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-amber-400/25">Pending approval</span></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        <TablePagination paginator={registrations} />
    </section>
);

export default RegistrationRequestsTable;
