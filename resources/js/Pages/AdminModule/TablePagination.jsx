import { Link } from '@inertiajs/react';

export default function TablePagination({ paginator }) {
    return <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 px-6 py-4 text-sm">
        <p className="text-gray-500">Showing {paginator.from ?? 0}–{paginator.to ?? 0} of {paginator.total}</p>
        {paginator.last_page > 1 && <div className="flex items-center gap-4">
            {paginator.prev_page_url ? <Link preserveScroll href={paginator.prev_page_url} className="font-medium text-indigo-600">← Previous</Link> : <span className="text-gray-300">← Previous</span>}
            <span className="text-gray-500">{paginator.current_page} / {paginator.last_page}</span>
            {paginator.next_page_url ? <Link preserveScroll href={paginator.next_page_url} className="font-medium text-indigo-600">Next →</Link> : <span className="text-gray-300">Next →</span>}
        </div>}
    </div>;
}
