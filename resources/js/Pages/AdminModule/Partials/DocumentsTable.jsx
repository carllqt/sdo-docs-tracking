import { formatEmployeeName } from "@/Pages/utils";
import TablePagination from './TablePagination';

const DocumentsTable = ({ documents }) => {
    return <section className="min-w-0 overflow-hidden rounded-[22px] border-[3px] border-[#00f5d4] bg-[#191225] shadow-[5px_5px_0_#7b2fff,9px_9px_0_#00f5d420]">
        <div className="relative border-b-2 border-dashed border-[#7b2fff] p-5 sm:p-6"><p className="mb-3 pr-8 text-[10px] font-extrabold tracking-[2px] text-[#00f5d4]">01 / THE DOCUMENT COLLECTION</p><span aria-hidden="true" className="absolute right-6 top-5 text-[30px] text-[#ffe600]">↗</span><h2 className="font-['Outfit',sans-serif] text-2xl font-extrabold tracking-[-.8px] text-white [text-shadow:2px_2px_0_#7b2fff] sm:text-[26px]">All requested documents</h2><p className="mt-1 text-sm text-[#bcaecc]">Employee registrations, newest first.</p></div>
        <div className="overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00f5d4]" tabIndex={0} role="region" aria-label="Scrollable records"><table className="w-full min-w-[900px] text-left text-sm">
            <caption className="sr-only">All documents registered by employees</caption>
            <thead className="border-b-2 border-[#7b2fff] bg-[#2a1c40] text-[10px] uppercase tracking-[1px] text-[#e3deec]"><tr>{['Control number', 'Document title', 'Created by', 'Origin station', 'Current station', 'Date created'].map(label => <th key={label} scope="col" className="px-5 py-4 font-semibold">{label}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#443250]">
                {documents.data.length === 0 ? <tr><td colSpan={6} className="px-6 py-16 text-center text-[#c4b6d6] bg-[radial-gradient(circle,#00f5d413_1px,transparent_1px)] [background-size:18px_18px]">No documents registered yet.</td></tr> : documents.data.map(doc => <tr key={doc.id} className="hover:bg-[#2b1c3c]">
                    <th scope="row" className="max-w-[180px] break-words px-5 py-4 font-semibold text-[#00f5d4]">{doc.tracking_number}</th>
                    <td className="max-w-xs break-words px-5 py-4 text-white">{doc.title}</td>
                    <td className="px-5 py-4 text-[#e3deec]">{formatEmployeeName(doc.creator) || 'Unavailable'}</td>
                    <td className="px-5 py-4 text-[#bcaecc]">{doc.origin_station?.name ?? 'Unavailable'}</td>
                    <td className="px-5 py-4 text-[#bcaecc]">{doc.current_station?.name ?? 'Unassigned'}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-[#bcaecc]">{new Date(doc.created_at).toLocaleString()}</td>
                </tr>)}
            </tbody>
        </table></div>
        <TablePagination paginator={documents} />
    </section>;
};

export default DocumentsTable;
