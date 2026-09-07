import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import CreatedDocumentsTable from './CreatedDocumentsTable';

export default function EmployeeModule({ employee, documents }) {
    const form = useForm({ control_number: '', title: '' });
    const inputClass = 'mt-2 block w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500';

    return <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Employee Module</h2>}>
        <Head title="Employee Module" />
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Employee workspace</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">Give your document a tracking identity.</h1>
                <p className="mt-3 text-gray-500">Register its control number and keep a QR label ready for your document.</p>
            </div>
            {!employee ? <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-900">Your account needs an employee profile and station before you can register documents. Contact your administrator.</div> : <div className="space-y-8">
                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900">Register a document</h2>
                    <div className="mt-4 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-900">
                        <p className="font-medium">{employee.first_name} {employee.last_name}</p>
                        <p className="mt-1 text-indigo-700">{employee.station?.name}</p>
                    </div>
                    <form className="mt-6 space-y-5" onSubmit={event => { event.preventDefault(); form.post(route('employeemodule.store')); }}>
                        <div><label htmlFor="control_number" className="text-sm font-medium text-gray-700">Control number</label>
                            <input id="control_number" required maxLength={100} value={form.data.control_number} onChange={e => form.setData('control_number', e.target.value)} placeholder="e.g. SDO-2026-0001" className={inputClass} aria-invalid={!!form.errors.control_number} aria-describedby="control-help control-error" />
                            <p id="control-help" className="mt-2 text-xs text-gray-500">Use your document’s existing number. Letters are saved in uppercase.</p>
                            <p id="control-error" className="mt-1 text-sm text-red-600">{form.errors.control_number}</p></div>
                        <div><label htmlFor="title" className="text-sm font-medium text-gray-700">Document title</label>
                            <input id="title" required maxLength={255} value={form.data.title} onChange={e => form.setData('title', e.target.value)} placeholder="What is this document about?" className={inputClass} aria-invalid={!!form.errors.title} aria-describedby="title-error" />
                            <p id="title-error" className="mt-1 text-sm text-red-600">{form.errors.title}</p></div>
                        <button disabled={form.processing} className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">{form.processing ? 'Saving document…' : 'Save & generate QR'}</button>
                        <p className="text-xs leading-relaxed text-gray-500">Your QR code will appear after the document is saved successfully.</p>
                    </form>
                </section>
                <CreatedDocumentsTable documents={documents} />
            </div>}
        </div>
    </AuthenticatedLayout>;
}
