import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DocumentsTable from './DocumentsTable';
import RecentActivityTable from './RecentActivityTable';

export default function AdminModule({ documents, activities }) {
    return <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Admin Module</h2>}>
        <Head title="Admin Module" />
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Administrative overview</p>
                <h1 className="mt-3 text-3xl font-semibold text-gray-900">Document requests & activity</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">Review documents registered by employees across SDO Ilagan and its schools, and follow their recorded activity.</p>
                <div className="mt-6 flex gap-10"><div><p className="text-3xl font-semibold text-indigo-600">{documents.total}</p><p className="mt-1 text-sm text-gray-600">Registered documents</p></div><div><p className="text-3xl font-semibold text-indigo-600">{activities.total}</p><p className="mt-1 text-sm text-gray-600">Recorded events</p></div></div>
            </div>
            <DocumentsTable documents={documents} />
            <RecentActivityTable activities={activities} />
        </div>
    </AuthenticatedLayout>;
}
