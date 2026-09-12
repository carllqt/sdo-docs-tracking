import { Link } from '@inertiajs/react';

const TablePagination = ({ paginator }) => {
    return <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-dashed border-[#7b2fff] px-6 py-4 text-sm">
        <p className="text-[#bcaecc]">Showing {paginator.from ?? 0}–{paginator.to ?? 0} of {paginator.total}</p>
        {paginator.last_page > 1 && <div className="flex flex-wrap items-center gap-3">
            {paginator.prev_page_url ? <Link preserveScroll href={paginator.prev_page_url} className="inline-flex min-h-11 items-center rounded-xl border-2 border-[#00f5d4] bg-[#2c1b46] px-3 text-xs font-bold text-[#00f5d4] transition-colors hover:bg-[#382449]">← Previous</Link> : <span className="text-[#746383]">← Previous</span>}
            <span className="text-[#bcaecc]">{paginator.current_page} / {paginator.last_page}</span>
            {paginator.next_page_url ? <Link preserveScroll href={paginator.next_page_url} className="inline-flex min-h-11 items-center rounded-xl border-2 border-[#00f5d4] bg-[#2c1b46] px-3 text-xs font-bold text-[#00f5d4] transition-colors hover:bg-[#382449]">Next →</Link> : <span className="text-[#746383]">Next →</span>}
        </div>}
    </div>;
};

export default TablePagination;
