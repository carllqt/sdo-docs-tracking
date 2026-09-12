import { ChevronDown, Check } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const RegisterDocumentForm = ({ employee, sdoOffices = [] }) => {
    const form = useForm({ control_number: "", title: "", to_station_id: "" });
    const [invalidControlNumber, setInvalidControlNumber] = useState(false);

    return (
        <section className="min-w-0 rounded-[22px] border-[3px] border-[#ff3af2] bg-[#191225] p-5 shadow-[5px_5px_0_#7b2fff,9px_9px_0_#ff3af230] min-[601px]:p-[25px] [&_form]:mt-6 [&_form]:grid [&_form]:gap-[19px] [&_form]:grid-cols-1 [&_label]:mb-2 [&_label]:block [&_label]:text-xs [&_label]:font-bold [&_input]:min-h-[54px] [&_input]:w-full [&_input]:rounded-[13px] [&_input]:border-2 [&_input]:border-[#665080] [&_input:hover]:border-[#b388db] [&_input:focus]:border-[#00f5d4] [&_input:focus]:ring-2 [&_input:focus]:ring-[#00f5d440] [&_input]:bg-[#100c1c] [&_input]:p-[13px] [&_input]:text-base sm:[&_input]:text-sm [&_input]:text-white [&_input::placeholder]:text-[#b6a7ca] [&_input[aria-invalid=true]]:border-[#ff9b78]">
            <div className="flex items-center justify-between [&>span:last-child]:text-[30px] [&>span:last-child]:text-[#ffe600] [&>span:first-child]:text-[#ff8df7]">
                <span className="text-[10px] font-extrabold tracking-[2px] text-[#00f5d4]">
                    01 / MAKE IT OFFICIAL
                </span>
                <span aria-hidden="true">↗</span>
            </div>
            <h2>Register a document.</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    if (!form.data.to_station_id) {
                        form.setError(
                            "to_station_id",
                            "Please select an SDO office.",
                        );
                        return;
                    }
                    form.post(route("employeemodule.store"));
                }}
                aria-busy={form.processing}
            >
                <div>
                    <label htmlFor="control_number">Control number</label>
                    <input
                        id="control_number"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]+"
                        required
                        maxLength={7}
                        value={form.data.control_number}
                        onChange={(e) => {
                            const value = e.target.value;

                            if (/^\d*$/.test(value)) {
                                // Valid: digits only
                                form.setData("control_number", value);
                                form.clearErrors("control_number");
                                setInvalidControlNumber(false);
                            } else {
                                setInvalidControlNumber(true);
                            }
                        }}
                        placeholder="e.g. 2026001"
                        aria-invalid={
                            invalidControlNumber || !!form.errors.control_number
                        }
                        aria-describedby="control-help control-error"
                    />
                    <p
                        id="control-help"
                        className={`mt-2 self-center text-[11px] leading-[1.7] ${
                            invalidControlNumber
                                ? "font-semibold text-[#ff6b6b]"
                                : "text-[#cbbbdc]"
                        }`}
                    >
                        {invalidControlNumber
                            ? "Letters and special characters are not allowed."
                            : "Enter digits only. Max length: 7. Example: 2026001"}
                    </p>
                    <p
                        id="control-error"
                        className="mt-[5px] text-xs text-[#ffbca4]"
                        role={form.errors.control_number ? "alert" : undefined}
                    >
                        {form.errors.control_number}
                    </p>
                </div>
                <div>
                    <label htmlFor="title">Document title</label>
                    <input
                        id="title"
                        required
                        maxLength={255}
                        value={form.data.title}
                        onChange={(e) => form.setData("title", e.target.value)}
                        placeholder="What is this document about?"
                        aria-invalid={!!form.errors.title}
                        aria-describedby="title-error"
                    />
                    <p
                        id="title-error"
                        className="mt-[5px] text-xs text-[#ffbca4]"
                        role={form.errors.title ? "alert" : undefined}
                    >
                        {form.errors.title}
                    </p>
                </div>
                <div className="col-span-full min-w-0">
                    <label htmlFor="to_station_id">Route to:</label>
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger
                            id="to_station_id"
                            type="button"
                            disabled={form.processing || !sdoOffices.length}
                            aria-invalid={Boolean(form.errors.to_station_id)}
                            aria-describedby={
                                form.errors.to_station_id
                                    ? "route-to-error"
                                    : undefined
                            }
                            className="flex min-h-[54px] w-full items-center justify-between gap-3 rounded-xl border-2 border-[#665080] bg-[#100c1c] px-4 py-[13px] text-left text-base text-white transition-colors hover:border-[#b388db] data-[popup-open]:border-[#b388db] aria-[invalid=true]:border-[#ff9b78] disabled:opacity-60 sm:text-sm"
                        >
                            <span className="truncate">
                                {sdoOffices.find(
                                    (office) =>
                                        String(office.id) ===
                                        String(form.data.to_station_id),
                                )?.name ||
                                    (sdoOffices.length
                                        ? "Select an SDO office"
                                        : "No SDO offices available")}
                            </span>
                            <ChevronDown
                                size={18}
                                strokeWidth={1.8}
                                className="shrink-0 text-[#c4b6d6]"
                                aria-hidden="true"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            positionerClassName="!z-[80]"
                            sideOffset={8}
                            className="!w-[var(--anchor-width)] max-w-[calc(100vw-32px)] !max-h-[min(300px,var(--available-height,300px))] overflow-y-auto overscroll-contain rounded-lg border border-[#665080] !bg-[#1c1428] p-1 !text-[#f5f0fc] shadow-[0_8px_24px_#0005] [scrollbar-color:#765094_#1c1428]"
                        >
                            {sdoOffices.map((office) => (
                                <DropdownMenuItem
                                    key={office.id}
                                    onClick={() => {
                                        form.setData(
                                            "to_station_id",
                                            String(office.id),
                                        );
                                        form.clearErrors("to_station_id");
                                    }}
                                    className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded px-[10px] py-2 text-sm data-[highlighted]:bg-[#382449]"
                                >
                                    <span className="whitespace-normal break-words">
                                        {office.name}
                                    </span>
                                    {String(form.data.to_station_id) ===
                                        String(office.id) && (
                                        <Check
                                            size={16}
                                            className="shrink-0 text-[#00f5d4]"
                                            aria-hidden="true"
                                        />
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {form.errors.to_station_id && (
                        <p
                            id="route-to-error"
                            role="alert"
                            className="mt-2 text-xs text-[#ffbca4]"
                        >
                            {form.errors.to_station_id}
                        </p>
                    )}
                </div>
                <button
                    disabled={form.processing || !sdoOffices.length}
                    className="col-span-full flex min-h-[54px] items-center justify-between gap-[10px] rounded-[40px] border-[3px] border-[#ffe600] bg-[linear-gradient(110deg,#792395,#5120a4,#124945)] px-[17px] py-[11px] text-[11px] font-extrabold uppercase tracking-[.5px] shadow-[3px_3px_0_#ff3af2,6px_6px_0_#7b2fff] transition-transform enabled:hover:-translate-y-[3px] disabled:cursor-wait disabled:opacity-60 [&_span]:text-2xl"
                >
                    {form.processing
                        ? "Saving document…"
                        : "Save & generate QR"}
                    <span aria-hidden="true">↗</span>
                </button>
                <p className="mt-2 self-center text-[11px] leading-[1.7] text-[#cbbbdc]">
                    Your QR code will appear after the document is saved
                    successfully.
                </p>
            </form>
            <div className="mt-5 flex items-center gap-[10px] border-t-2 border-dashed border-[#7b2fff] pt-[15px] text-[9px] tracking-[1px] [&_span]:text-[28px] [&_span]:text-[#ff6b35]">
                <span aria-hidden="true">✳</span> ONE DOCUMENT. ONE IDENTITY.
            </div>
        </section>
    );
};

export default RegisterDocumentForm;
