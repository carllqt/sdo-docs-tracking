import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import CreatedDocumentsTable from "./Partials/CreatedDocumentsTable";

export default function EmployeeModule({ employee, documents }) {
    const form = useForm({ control_number: "", title: "" });

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
                        <section className="min-w-0 rounded-[22px] border-[3px] border-[#ff3af2] bg-[#191225] p-5 shadow-[5px_5px_0_#7b2fff,9px_9px_0_#ff3af230] min-[601px]:p-[25px] [&_form]:grid [&_form]:gap-[19px] min-[601px]:max-[1000px]:[&_form]:grid-cols-2 [&_label]:mb-2 [&_label]:block [&_label]:text-xs [&_label]:font-bold [&_input]:min-h-[49px] [&_input]:w-full [&_input]:rounded-[13px] [&_input]:border-2 [&_input]:border-[#7b2fff] [&_input]:bg-[#0d0d1a] [&_input]:p-[13px] [&_input]:text-[13px] [&_input]:text-white [&_input::placeholder]:text-[#b6a7ca] [&_input[aria-invalid=true]]:border-[#ff9b78]">
                            <div className="flex items-center justify-between [&>span:last-child]:text-[30px] [&>span:last-child]:text-[#ffe600] [&>span:first-child]:text-[#ff8df7]">
                                <span className="text-[10px] font-extrabold tracking-[2px] text-[#00f5d4]">
                                    01 / MAKE IT OFFICIAL
                                </span>
                                <span aria-hidden="true">↗</span>
                            </div>
                            <h2>Register a document.</h2>
                            <div className="mt-[19px] mb-[22px] flex items-center gap-3 border-y-2 border-dashed border-[#7b2fff] py-[15px] [&_strong]:text-[13px] [&_p]:mt-1 [&_p]:text-[11px] [&_p]:text-[#d4c5e5] [&_p]:[overflow-wrap:anywhere]">
                                <span
                                    className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] border-2 border-[#ffe600] bg-[#7b2fff] text-[15px] font-extrabold"
                                    aria-hidden="true"
                                >
                                    {employee.first_name?.[0]}
                                    {employee.last_name?.[0]}
                                </span>
                                <div>
                                    <strong>
                                        {employee.first_name}{" "}
                                        {employee.last_name}
                                    </strong>
                                    <p>
                                        {employee.station?.name ||
                                            "No station assigned"}
                                    </p>
                                </div>
                            </div>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    form.post(route("employeemodule.store"));
                                }}
                                aria-busy={form.processing}
                            >
                                <div>
                                    <label htmlFor="control_number">
                                        Control number
                                    </label>
                                    <input
                                        id="control_number"
                                        required
                                        maxLength={100}
                                        value={form.data.control_number}
                                        onChange={(e) =>
                                            form.setData(
                                                "control_number",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g. SDO-2026-0001"
                                        aria-invalid={
                                            !!form.errors.control_number
                                        }
                                        aria-describedby="control-help control-error"
                                    />
                                    <p
                                        id="control-help"
                                        className="mt-2 self-center text-[11px] leading-[1.7] text-[#cbbbdc]"
                                    >
                                        Use your document’s existing number.
                                        Letters are saved in uppercase.
                                    </p>
                                    <p
                                        id="control-error"
                                        className="mt-[5px] text-xs text-[#ffbca4]"
                                        role={
                                            form.errors.control_number
                                                ? "alert"
                                                : undefined
                                        }
                                    >
                                        {form.errors.control_number}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="title">
                                        Document title
                                    </label>
                                    <input
                                        id="title"
                                        required
                                        maxLength={255}
                                        value={form.data.title}
                                        onChange={(e) =>
                                            form.setData(
                                                "title",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="What is this document about?"
                                        aria-invalid={!!form.errors.title}
                                        aria-describedby="title-error"
                                    />
                                    <p
                                        id="title-error"
                                        className="mt-[5px] text-xs text-[#ffbca4]"
                                        role={
                                            form.errors.title
                                                ? "alert"
                                                : undefined
                                        }
                                    >
                                        {form.errors.title}
                                    </p>
                                </div>
                                <button
                                    disabled={form.processing}
                                    className="flex min-h-[54px] items-center justify-between gap-[10px] rounded-[40px] border-[3px] border-[#ffe600] bg-[linear-gradient(110deg,#792395,#5120a4,#124945)] px-[17px] py-[11px] text-[11px] font-extrabold uppercase tracking-[.5px] shadow-[3px_3px_0_#ff3af2,6px_6px_0_#7b2fff] transition-transform enabled:hover:-translate-y-[3px] disabled:cursor-wait disabled:opacity-60 [&_span]:text-2xl"
                                >
                                    {form.processing
                                        ? "Saving document…"
                                        : "Save & generate QR"}
                                    <span aria-hidden="true">↗</span>
                                </button>
                                <p className="mt-2 self-center text-[11px] leading-[1.7] text-[#cbbbdc]">
                                    Your QR code will appear after the document
                                    is saved successfully.
                                </p>
                            </form>
                            <div className="mt-5 flex items-center gap-[10px] border-t-2 border-dashed border-[#7b2fff] pt-[15px] text-[9px] tracking-[1px] [&_span]:text-[28px] [&_span]:text-[#ff6b35]">
                                <span aria-hidden="true">✳</span> ONE DOCUMENT.
                                ONE IDENTITY.
                            </div>
                        </section>
                        <CreatedDocumentsTable documents={documents} />
                    </div>
                )}
                <footer className="mt-[55px] flex justify-between gap-5 border-t-2 border-dashed border-[#7b2fff] pt-5 text-[11px] text-[#cbbbdc] max-[600px]:flex-wrap [&_strong]:font-['Outfit',sans-serif] [&_strong]:text-xl [&_strong]:text-white [&_strong_span]:text-[#ff3af2]">
                    <strong>
                        SDO<span>.</span>DOCS
                    </strong>
                    <span>A little structure. A lot of possibility.</span>
                </footer>
            </div>
        </AuthenticatedLayout>
    );
}
