import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';

const Show = ({ document, qrValue, saved }) => {
    const qr = useRef(null);
    const download = () => {
        const svg = qr.current.querySelector('svg');
        const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' }));
        const link = window.document.createElement('a');
        link.href = url;
        link.download = `${document.tracking_number.replace(/[^a-z0-9_-]/gi, '-')}-qr.svg`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
    return <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Document QR</h2>}>
        <Head title={document.tracking_number} />
        <div className="mx-auto max-w-2xl px-4 py-10">
            <Link href={route('employeemodule.index')} className="text-sm font-medium text-indigo-600">← Employee Module</Link>
            {saved && <p role="status" className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">Document saved. Your QR code is ready.</p>}
            <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Document tracking label</p>
                <h1 className="mt-3 break-all text-2xl font-semibold text-gray-900">{document.tracking_number}</h1>
                <p className="mt-2 break-words text-gray-600">{document.title}</p>
                <div ref={qr} className="mx-auto my-8 w-fit max-w-full rounded-xl border border-gray-100 p-2"><QRCodeSVG value={qrValue} size={240} marginSize={4} level="M" title={`QR for ${document.tracking_number}`} style={{ maxWidth: '100%', height: 'auto' }} /></div>
                <p className="text-sm text-gray-500">{document.origin_station?.name}</p>
                <button onClick={download} className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700">Download QR code</button>
                <p className="mt-4 text-xs leading-relaxed text-gray-500">Attach this QR to your document. Opening its link requires an authorized account.</p>
            </section>
        </div>
    </AuthenticatedLayout>;
};

export default Show;
