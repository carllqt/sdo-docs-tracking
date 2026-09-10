import Icon from '@/Components/Icon';
import { Link, usePage } from '@inertiajs/react';
import '../../css/employee.css';

export default function EmployeeLayout({ children }) {
    const { user, roles = [] } = usePage().props.auth;

    return <div className="employee-theme min-h-screen">
        <header className="border-b border-[#443250] bg-[#171124]">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-6 sm:px-8">
                <Link href={route('employeemodule.index')} className="flex items-center gap-3 font-['Outfit',sans-serif] text-2xl font-black leading-none text-white">
                    <span aria-hidden="true" className="grid h-[41px] w-[38px] -rotate-[8deg] place-items-center rounded-xl border-[3px] border-[#ffe600] bg-[#ff3af2] text-[#0d0d1a] shadow-[4px_4px_0_#7b2fff,6px_6px_0_#00f5d4]"><Icon className="h-6 w-6" /></span>
                    <span>SDO<span className="text-[#ff3af2]">.</span>DOCS<small className="mt-2 block font-['DM_Sans',sans-serif] text-[7px] tracking-[1.5px]">DOCUMENT TRACKING SYSTEM</small></span>
                </Link>
                <div className="flex flex-wrap items-center gap-4 text-xs">
                    <span className="max-w-[220px] truncate text-[#c4b6d6]">{user.name || user.email}</span>
                    {roles.includes('admin') && <Link href={route('adminmodule.index')} className="text-[#00f5d4] hover:underline">Admin</Link>}
                    <Link href={route('profile.edit')} className="text-[#00f5d4] hover:underline">Profile</Link>
                    <Link href={route('logout')} method="post" as="button" className="rounded-lg border border-[#665080] px-4 py-3 text-white hover:bg-[#382449]">Log out</Link>
                </div>
            </div>
        </header>
        <main>{children}</main>
    </div>;
}
