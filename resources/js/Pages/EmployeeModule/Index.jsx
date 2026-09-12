import RegisterDocumentForm from "./Partials/RegisterDocumentForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreatedDocumentsTable from "./Partials/CreatedDocumentsTable";

const EmployeeModule = ({ employee, documents, sdoOffices = [] }) => {


    return (
        <AuthenticatedLayout>
            <Head title="Employee Workspace — SDO Docs">
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="mx-auto max-w-[1440px] px-5 pt-[30px] pb-5 text-white min-[601px]:px-10 min-[601px]:pt-12 min-[601px]:pb-6 [&_h2]:font-['Outfit',sans-serif] [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-[-.8px] [&_h2]:leading-[1.15] [&_h2]:[text-shadow:2px_2px_0_#7b2fff] min-[601px]:[&_h2]:text-[26px]">
                <header className="mb-[35px] flex flex-col items-stretch justify-between gap-[25px] min-[601px]:mb-12 min-[601px]:flex-row min-[601px]:items-center min-[601px]:gap-10 [&_h1]:my-[18px] [&_h1]:font-['Outfit',sans-serif] [&_h1]:text-[43px] min-[601px]:[&_h1]:text-[clamp(42px,5vw,70px)] [&_h1]:font-black [&_h1]:leading-none [&_h1]:tracking-[-2px] [&_h1]:[text-shadow:2px_2px_0_#7b2fff,4px_4px_0_#ff3af2] [&_h1_span]:text-[#00f5d4] [&>div>p:last-child]:text-[15px] [&>div>p:last-child]:leading-[1.8] [&>div>p:last-child]:text-[#e3deec]">
                    <div>
                        <p className="text-[10px] font-extrabold tracking-[2px] text-[#00f5d4]">
                            SDO.DOCS / EMPLOYEE WORKSPACE
                        </p>
                        <h1>
                            BIG IDEAS.
                            <br />
                            <span>TRACKED HERE.</span>
                        </h1>
                        <p>
                            Give every document a digital identity.
                            <br />
                            Register it, generate a QR label, and keep it close.
                        </p>
                    </div>
                    <div className="relative min-w-[200px] shrink-0 rotate-1 rounded-3xl border-4 border-[#ffe600] bg-[#251638] bg-[repeating-linear-gradient(135deg,transparent_0_12px,#ff3af208_12px_24px)] p-5 shadow-[6px_6px_0_#ff3af2,11px_11px_0_#7b2fff] min-[601px]:rotate-3 min-[601px]:px-[30px] min-[601px]:py-6 min-[1001px]:min-w-[235px] [&>span:first-child]:absolute [&>span:first-child]:right-5 [&>span:first-child]:top-3 [&>span:first-child]:text-[46px] [&>span:first-child]:text-[#ff6b35] [&_strong]:font-['Outfit',sans-serif] [&_strong]:text-[44px] min-[601px]:[&_strong]:text-[60px] [&_strong]:font-black [&_strong]:leading-[1.1] [&_p]:mt-2 [&_p]:mb-[18px] [&_p]:text-[11px] [&_p]:font-extrabold [&_p]:tracking-[1px]">
                        <span aria-hidden="true">✦</span>
                        <strong>{documents?.total ?? 0}</strong>
                        <p>
                            YOUR REGISTERED
                            <br />
                            DOCUMENTS
                        </p>
                        <span className="block border-t-2 border-dashed border-[#ff3af2] pt-3 text-[10px] max-[600px]:mt-[10px]">
                            Every document. Connected. ↗
                        </span>
                    </div>
                </header>
                {!employee ? (
                    <div
                        role="alert"
                        className="rounded-[20px] border-[3px] border-[#ff6b35] bg-[#251638] p-7 [&_p]:mt-3 [&_p]:leading-[1.8]"
                    >
                        <strong>LET’S CONNECT YOUR PROFILE.</strong>
                        <p>
                            Your account needs an employee profile and station
                            before you can register documents. Contact your
                            administrator.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 items-start gap-[30px] min-[1001px]:grid-cols-[minmax(290px,380px)_minmax(0,1fr)]">
                        <RegisterDocumentForm employee={employee} sdoOffices={sdoOffices} />
                        <CreatedDocumentsTable documents={documents} />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default EmployeeModule;
