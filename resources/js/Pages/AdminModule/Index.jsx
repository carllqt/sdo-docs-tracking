import AdminNavigation from "./Partials/AdminNavigation";
import RegistrationRequestsTable from "./Partials/RegistrationRequestsTable";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Files, Activity, ArrowDownRight } from 'lucide-react';
import DocumentsTable from './Partials/DocumentsTable';
import RecentActivityTable from './Partials/RecentActivityTable';

const AdminModule = ({ documents, activities, registrations, tab, stats }) => {
    const page = usePage();

    useEffect(() => {
        if (import.meta.env.DEV) {
            console.log('[AdminModule] Laravel response', {
                url: page.url,
                props: page.props,
            });
        }
    }, [page.url, page.props]);

    return <AuthenticatedLayout>
        <Head title="Admin Workspace — SDO Docs" />
        <div className="mx-auto max-w-[1440px] space-y-10 px-5 pt-[30px] pb-5 text-white min-[601px]:px-10 min-[601px]:pt-12 min-[601px]:pb-6">
            <header className="grid items-center gap-10 xl:grid-cols-[1fr_auto]">
                <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#00f5d4]">SDO.DOCS / ADMIN WORKSPACE</p>
                    <h1 className="my-[18px] font-['Outfit',sans-serif] text-[43px] font-black uppercase leading-none tracking-[-2px] [text-shadow:2px_2px_0_#7b2fff,4px_4px_0_#ff3af2] min-[601px]:text-[clamp(42px,5vw,70px)]">BIG PICTURE.<br /><span className="text-[#00f5d4]">ALL CONNECTED.</span></h1>
                    <p className="mt-5 max-w-xl text-[15px] leading-[1.8] text-[#e3deec]">Review employee registrations and follow document activity across SDO Ilagan and its schools.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 pb-3 min-[420px]:grid-cols-2 sm:gap-7">
                    {[{ label: 'Registered documents', value: stats.documents, icon: Files, color: 'text-[#00f5d4]' }, { label: 'Recorded events', value: stats.activity, icon: Activity, color: 'text-[#ff8df7]' }].map(({ label, value, icon: MetricIcon, color }) => <div key={label} className="relative min-w-0 rounded-3xl border-4 border-[#ffe600] bg-[#251638] bg-[repeating-linear-gradient(135deg,transparent_0_12px,#ff3af208_12px_24px)] p-5 shadow-[6px_6px_0_#ff3af2,11px_11px_0_#7b2fff] min-[601px]:odd:-rotate-2 min-[601px]:even:rotate-2 sm:min-w-[190px] sm:p-6">
                        <span aria-hidden="true" className="absolute right-4 top-2 text-[38px] text-[#ff6b35]">✦</span><MetricIcon size={24} className={color} aria-hidden="true" />
                        <p className="mt-4 font-['Outfit',sans-serif] text-[54px] font-black leading-none tabular-nums">{value.toLocaleString()}</p>
                        <p className="mt-4 border-t-2 border-dashed border-[#ff3af2] pt-3 text-[10px] font-extrabold uppercase leading-5 tracking-[1px] text-white">{label}</p>
                    </div>)}
                </div>
            </header>
            <div className="flex items-center gap-3 border-t-2 border-dashed border-[#7b2fff] pt-6 text-[10px] font-bold uppercase tracking-[2px] text-[#c4b6d6]"><ArrowDownRight size={16} className="text-[#ff8df7]" aria-hidden="true" />ONE NETWORK. EVERY STATION.</div>
            <AdminNavigation tab={tab} stats={stats} />
            <div key={tab} className="motion-safe:animate-admin-table-enter">
            {tab === "documents" && <DocumentsTable documents={documents} />}
            {tab === "activity" && <RecentActivityTable activities={activities} />}
            {tab === "registrations" && <RegistrationRequestsTable registrations={registrations} />}
            </div>
        </div>
    </AuthenticatedLayout>;
};

export default AdminModule;
