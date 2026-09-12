import { Link } from '@inertiajs/react';
import { Files, Activity, UserRoundCheck } from 'lucide-react';

const AdminNavigation = ({ tab, stats }) => (
    <nav aria-label="Admin tables" className="flex flex-wrap gap-3 rounded-2xl border-2 border-[#7b2fff] bg-[#191225] p-3 shadow-[4px_4px_0_#7b2fff]">
        {[{ key: 'documents', label: 'Documents', icon: Files }, { key: 'activity', label: 'Activity', icon: Activity }, { key: 'registrations', label: 'Registration requests', icon: UserRoundCheck }].map(({ key, label, icon: NavIcon }) => (
            <Link key={key} href={route('adminmodule.index', { tab: key })} preserveScroll preserveState aria-current={tab === key ? 'page' : undefined} className={'flex min-h-12 flex-1 items-center justify-center gap-3 whitespace-nowrap rounded-xl border-2 px-4 py-3 text-xs font-bold transition-[color,background-color,border-color,transform] duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] ' + (tab === key ? 'border-[#00f5d4] bg-[#382449] text-[#00f5d4]' : 'border-transparent text-[#c4b6d6] hover:bg-[#2b1c3c] hover:text-white')}>
                <NavIcon size={18} aria-hidden="true" />{label}<span className="rounded-full bg-[#0d0d1a] px-2 py-1 text-[10px] tabular-nums">{stats[key]}</span>
            </Link>
        ))}
    </nav>
);

export default AdminNavigation;
