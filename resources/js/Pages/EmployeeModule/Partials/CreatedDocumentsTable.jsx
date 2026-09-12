import { Link } from '@inertiajs/react';

const CreatedDocumentsTable = ({ documents }) => {
    return <section className="min-w-0 rounded-[22px] border-[3px] border-[#00f5d4] bg-[#191225] shadow-[5px_5px_0_#7b2fff,9px_9px_0_#00f5d420] [&_table]:w-full [&_table]:min-w-[610px] [&_table]:text-left [&_table]:text-[13px] [&_thead]:border-t-2 [&_thead]:border-b-2 [&_thead]:border-[#7b2fff] [&_thead]:bg-[#2a1c40] [&_thead]:text-[9px] [&_thead]:tracking-[1px] [&_thead]:uppercase [&_th]:p-[18px] [&_td]:p-[18px] [&_tbody_tr]:border-b [&_tbody_tr]:border-[#7b2fff55] [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-[#2b1c3c] [&_tbody_th]:w-[26%] [&_tbody_th]:max-w-[200px] [&_tbody_th]:[overflow-wrap:anywhere] [&_tbody_td:nth-child(2)]:max-w-[260px] [&_tbody_td:nth-child(2)]:[overflow-wrap:anywhere]">
        <div className="flex flex-wrap items-center justify-between gap-4 px-[18px] py-[22px] min-[601px]:px-[25px] min-[601px]:py-[27px] [&_h2]:mt-[10px]"><div><p className="text-[10px] font-extrabold tracking-[2px] text-[#00f5d4]">02 / YOUR DOCUMENT COLLECTION</p><h2>Filed. Found. Connected.</h2></div><span className="whitespace-nowrap rounded-[30px] border-2 border-[#ff3af2] px-3 py-[7px] text-[11px] font-bold">{documents.total} total</span></div>
        {documents.data.length === 0 ? <div className="border-t-2 border-dashed border-[#7b2fff] bg-[radial-gradient(circle,#00f5d413_1px,transparent_1px)] [background-size:18px_18px] px-5 py-[35px] text-center min-[601px]:px-[30px] min-[601px]:py-[50px] [&>span]:text-[64px] [&>span]:text-[#ffe600] [&_h3]:mt-3 [&_h3]:font-['Outfit',sans-serif] [&_h3]:text-[25px] [&_h3]:font-extrabold [&_p]:mx-auto [&_p]:my-[14px] [&_p]:max-w-[330px] [&_p]:text-[13px] [&_p]:leading-[1.8] [&_p]:text-[#d4c5e5] [&_label]:inline-block [&_label]:cursor-pointer [&_label]:p-3 [&_label]:text-xs [&_label]:text-[#00f5d4]"><span aria-hidden="true">✦</span><h3>Your next big thing starts here.</h3><p>No documents created yet. Register your first document and its QR label will have a home here.</p><label htmlFor="control_number">Start with a control number ↗</label></div> : <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Registered documents table">
            <table>
                <caption className="sr-only">Documents you have created, newest first</caption>
                <thead><tr><th scope="col">Control number</th><th scope="col">Document title</th><th scope="col">Date created</th><th scope="col">Action</th></tr></thead>
                <tbody>{documents.data.map(doc => <tr key={doc.id}>
                    <th scope="row"><span className="font-bold text-white">{doc.tracking_number}</span></th>
                    <td>{doc.title}</td><td className="whitespace-nowrap text-[11px] text-[#d4c5e5]">{new Date(doc.created_at).toLocaleDateString()}</td>
                    <td><Link href={route('employeemodule.show', doc.qr_token)} aria-label={`View QR for ${doc.tracking_number}`} className="inline-flex min-h-11 items-center justify-center gap-[10px] whitespace-nowrap rounded-xl border-2 border-[#00f5d4] bg-[#2c1b46] px-3 py-2 text-[11px] font-bold transition hover:-translate-y-0.5 hover:bg-[#4e2678] [&_span]:text-lg [&_span]:text-[#00f5d4]">View QR <span aria-hidden="true">↗</span></Link></td>
                </tr>)}</tbody>
            </table>
        </div>}
        <div className="flex justify-between gap-3 px-[22px] py-[18px] text-[10px] text-[#cbbbdc] max-[600px]:flex-wrap [&>span]:tracking-[1px]"><p>Showing {documents.from ?? 0}–{documents.to ?? 0} of {documents.total} documents</p><span>NEWEST FIRST ↓</span></div>
        {documents.last_page > 1 && <nav aria-label="Document pagination" className="flex items-center justify-between gap-3 border-t-2 border-dashed border-[#7b2fff] px-5 py-3 text-[11px] [&_a]:px-[6px] [&_a]:py-[14px] [&_a]:text-[#00f5d4]">
            {documents.prev_page_url ? <Link href={documents.prev_page_url}>← Previous</Link> : <span />}
            <span>Page {documents.current_page} of {documents.last_page}</span>
            {documents.next_page_url ? <Link href={documents.next_page_url}>Next →</Link> : <span />}
        </nav>}
    </section>;
};

export default CreatedDocumentsTable;
