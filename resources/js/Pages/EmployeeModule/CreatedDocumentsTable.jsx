import { Link } from '@inertiajs/react';

export default function CreatedDocumentsTable({ documents }) {
    return <section className="employee-documents">
        <div className="employee-documents-heading"><div><p className="employee-kicker">02 / YOUR DOCUMENT COLLECTION</p><h2>Filed. Found. Connected.</h2></div><span className="employee-count">{documents.total} total</span></div>
        {documents.data.length === 0 ? <div className="employee-empty"><span aria-hidden="true">✦</span><h3>Your next big thing starts here.</h3><p>No documents created yet. Register your first document and its QR label will have a home here.</p><label htmlFor="control_number">Start with a control number ↗</label></div> : <div className="employee-table-scroll" tabIndex={0} role="region" aria-label="Registered documents table">
            <table>
                <caption className="sr-only">Documents you have created, newest first</caption>
                <thead><tr><th scope="col">Control number</th><th scope="col">Document title</th><th scope="col">Date created</th><th scope="col">Action</th></tr></thead>
                <tbody>{documents.data.map(doc => <tr key={doc.id}>
                    <th scope="row"><span className="employee-document-id">{doc.tracking_number}</span></th>
                    <td>{doc.title}</td><td className="employee-date">{new Date(doc.created_at).toLocaleDateString()}</td>
                    <td><Link href={route('employeemodule.show', doc.qr_token)} aria-label={`View QR for ${doc.tracking_number}`} className="employee-qr-link">View QR <span aria-hidden="true">↗</span></Link></td>
                </tr>)}</tbody>
            </table>
        </div>}
        <div className="employee-table-footer"><p>Showing {documents.from ?? 0}–{documents.to ?? 0} of {documents.total} documents</p><span>NEWEST FIRST ↓</span></div>
        {documents.last_page > 1 && <nav aria-label="Document pagination" className="employee-pagination">
            {documents.prev_page_url ? <Link href={documents.prev_page_url}>← Previous</Link> : <span />}
            <span>Page {documents.current_page} of {documents.last_page}</span>
            {documents.next_page_url ? <Link href={documents.next_page_url}>Next →</Link> : <span />}
        </nav>}
    </section>;
}
