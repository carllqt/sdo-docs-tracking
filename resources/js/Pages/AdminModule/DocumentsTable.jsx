import TablePagination from './TablePagination';

export default function DocumentsTable({ documents }) {
    return <section className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6"><h2 className="text-lg font-semibold text-gray-900">All requested documents</h2><p className="mt-1 text-sm text-gray-500">Employee registrations, newest first.</p></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm">
            <caption className="sr-only">All documents registered by employees</caption>
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr>{['Control number', 'Document title', 'Created by', 'Origin station', 'Current station', 'Date created'].map(label => <th key={label} scope="col" className="px-5 py-4 font-semibold">{label}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
                {documents.data.length === 0 ? <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-500">No documents registered yet.</td></tr> : documents.data.map(doc => <tr key={doc.id} className="hover:bg-indigo-50/40">
                    <th scope="row" className="max-w-[180px] break-words px-5 py-4 font-semibold text-indigo-600">{doc.tracking_number}</th>
                    <td className="max-w-xs break-words px-5 py-4 text-gray-900">{doc.title}</td>
                    <td className="px-5 py-4 text-gray-700">{[doc.creator?.first_name, doc.creator?.middle_name, doc.creator?.last_name].filter(Boolean).join(' ') || 'Unavailable'}</td>
                    <td className="px-5 py-4 text-gray-500">{doc.origin_station?.name ?? 'Unavailable'}</td>
                    <td className="px-5 py-4 text-gray-500">{doc.current_station?.name ?? 'Unassigned'}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-gray-500">{new Date(doc.created_at).toLocaleString()}</td>
                </tr>)}
            </tbody>
        </table></div>
        <TablePagination paginator={documents} />
    </section>;
}
