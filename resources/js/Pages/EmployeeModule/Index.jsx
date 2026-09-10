import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head, useForm } from '@inertiajs/react';
import CreatedDocumentsTable from './CreatedDocumentsTable';
import '../../../css/employee.css';

export default function EmployeeModule({ employee, documents }) {
    const form = useForm({ control_number: '', title: '' });

    return <EmployeeLayout>
        <Head title="Employee Workspace — SDO Docs">
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet" />
        </Head>
        <div className="employee-workspace">
            <header className="employee-hero">
                <div><p className="employee-kicker">SDO.DOCS / EMPLOYEE WORKSPACE</p><h1>BIG IDEAS.<br /><span>TRACKED HERE.</span></h1><p>Give every document a digital identity.<br />Register it, generate a QR label, and keep it close.</p></div>
                <div className="employee-total"><span aria-hidden="true">✦</span><strong>{documents?.total ?? 0}</strong><p>YOUR REGISTERED<br />DOCUMENTS</p><span className="employee-total-note">Every document. Connected. ↗</span></div>
            </header>
            {!employee ? <div role="alert" className="employee-notice"><strong>LET’S CONNECT YOUR PROFILE.</strong><p>Your account needs an employee profile and station before you can register documents. Contact your administrator.</p></div> : <div className="employee-grid">
                <section className="employee-create">
                    <div className="employee-panel-heading"><span className="employee-kicker">01 / MAKE IT OFFICIAL</span><span aria-hidden="true">↗</span></div>
                    <h2>Register a document.</h2>
                    <div className="employee-profile"><span className="employee-avatar" aria-hidden="true">{employee.first_name?.[0]}{employee.last_name?.[0]}</span><div><strong>{employee.first_name} {employee.last_name}</strong><p>{employee.station?.name || 'No station assigned'}</p></div></div>
                    <form onSubmit={event => { event.preventDefault(); form.post(route('employeemodule.store')); }} aria-busy={form.processing}>
                        <div><label htmlFor="control_number">Control number</label>
                            <input id="control_number" required maxLength={100} value={form.data.control_number} onChange={e => form.setData('control_number', e.target.value)} placeholder="e.g. SDO-2026-0001" aria-invalid={!!form.errors.control_number} aria-describedby="control-help control-error" />
                            <p id="control-help" className="employee-help">Use your document’s existing number. Letters are saved in uppercase.</p>
                            <p id="control-error" className="employee-error" role={form.errors.control_number ? 'alert' : undefined}>{form.errors.control_number}</p></div>
                        <div><label htmlFor="title">Document title</label>
                            <input id="title" required maxLength={255} value={form.data.title} onChange={e => form.setData('title', e.target.value)} placeholder="What is this document about?" aria-invalid={!!form.errors.title} aria-describedby="title-error" />
                            <p id="title-error" className="employee-error" role={form.errors.title ? 'alert' : undefined}>{form.errors.title}</p></div>
                        <button disabled={form.processing} className="employee-submit">{form.processing ? 'Saving document…' : 'Save & generate QR'}<span aria-hidden="true">↗</span></button>
                        <p className="employee-help">Your QR code will appear after the document is saved successfully.</p>
                    </form>
                    <div className="employee-create-footer"><span aria-hidden="true">✳</span> ONE DOCUMENT. ONE IDENTITY.</div>
                </section>
                <CreatedDocumentsTable documents={documents} />
            </div>}
            <footer className="employee-footer"><strong>SDO<span>.</span>DOCS</strong><span>A little structure. A lot of possibility.</span></footer>
        </div>
    </EmployeeLayout>;
}
