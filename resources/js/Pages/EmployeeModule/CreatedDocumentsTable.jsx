import { Link } from '@inertiajs/react';

export default function CreatedDocumentsTable({ documents }) {
    return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-6"><h2 className="text-lg font-semibold text-gray-900">Your registered documents</h2><span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">{documents.total}</span></div>
        <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
                <caption className="sr-only">Documents you have created, newest first</caption>
                <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                        <th scope="col" className="px-5 py-4 font-semibold">Control number</th>
                        <th scope="col" className="px-5 py-4 font-semibold">Document title</th>
                        <th scope="col" className="px-5 py-4 font-semibold">Date created</th>
                        <th scope="col" className="px-5 py-4 text-right font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {documents.data.length === 0 ? <tr><td colSpan={4} className="px-6 py-16 text-center">
                        <p className="font-medium text-gray-800">No documents created yet</p>
                        <p className="mt-2 text-gray-500">Register a document to see it here.</p>
                    </td></tr> : documents.data.map(doc => <tr key={doc.id} className="transition-colors hover:bg-indigo-50/40">
                        <th scope="row" className="max-w-[180px] break-words px-5 py-4 font-semibold text-indigo-600">{doc.tracking_number}</th>
                        <td className="max-w-xs break-words px-5 py-4 text-gray-900">{doc.title}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-gray-500">{new Date(doc.created_at).toLocaleDateString()}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-right">
                            <Link href={route('employeemodule.show', doc.qr_token)} aria-label={`View QR for ${doc.tracking_number}`} className="inline-flex rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 font-medium text-indigo-700 hover:bg-indigo-100">View QR →</Link>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        <p className="border-t border-gray-100 px-6 py-3 text-xs text-gray-500">Showing {documents.from ?? 0}–{documents.to ?? 0} of {documents.total} documents</p>
        {documents.last_page > 1 && <div className="flex items-center justify-between border-t border-gray-100 p-6 text-sm">
            {documents.prev_page_url ? <Link href={documents.prev_page_url}>← Previous</Link> : <span />}
            <span className="text-gray-500">Page {documents.current_page} of {documents.last_page}</span>
            {documents.next_page_url ? <Link href={documents.next_page_url}>Next →</Link> : <span />}
        </div>}
    </section>
    );
}
