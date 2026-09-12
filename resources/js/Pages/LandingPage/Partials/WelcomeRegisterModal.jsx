import Icon from "@/Components/Icon";
import RegistrationStationPicker from "./RegistrationStationPicker";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Description,
} from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

const fields = [
    {
        name: "first_name",
        label: "First name",
        autocomplete: "given-name",
        placeholder: "Your first name",
    },
    {
        name: "middle_name",
        label: "Middle name (optional)",
        autocomplete: "additional-name",
        placeholder: "Your middle name",
        optional: true,
    },
    {
        name: "last_name",
        label: "Last name",
        autocomplete: "family-name",
        placeholder: "Your last name",
    },
    {
        name: "email",
        label: "Email address",
        autocomplete: "username",
        placeholder: "you@example.com",
        type: "email",
    },
    {
        name: "password",
        label: "Password",
        autocomplete: "new-password",
        placeholder: "Create a password",
        secret: true,
    },
    {
        name: "password_confirmation",
        label: "Confirm password",
        autocomplete: "new-password",
        placeholder: "Repeat your password",
        secret: true,
    },
];

const WelcomeRegisterModal = ({
    open,
    onClose,
    onLogin,
    stations = [],
    submitted = false,
}) => {
    const nameInput = useRef(null);
    const [showPasswords, setShowPasswords] = useState(false);
    const form = useForm({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        station_id: "",
        password: "",
        password_confirmation: "",
    });

    const close = () => {
        if (form.processing) return;
        form.reset("password", "password_confirmation");
        form.clearErrors();
        setShowPasswords(false);
        onClose();
    };

    const submit = (event) => {
        event.preventDefault();
        if (!form.data.station_id) {
            form.setError(
                "station_id",
                "Please choose a station from the results.",
            );
            return;
        }
        form.post(route("register"), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
            onFinish: () => form.reset("password", "password_confirmation"),
        });
    };

    return (
        <Dialog
            open={open}
            onClose={close}
            initialFocus={nameInput}
            className="relative z-[60] font-['DM_Sans',sans-serif] text-white [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-60 [&_button:focus-visible]:outline [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[#00f5d4] [&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-[#00f5d4]"
        >
            <div
                className="fixed inset-0 bg-[#080714dc] backdrop-blur-[8px]"
                aria-hidden="true"
            />
            <div className="fixed inset-0 flex items-start overflow-y-auto px-3 pt-3 pb-5 min-[541px]:px-6 min-[541px]:py-8">
                <DialogPanel className="relative m-auto w-full min-w-0 max-w-[600px] rounded-[21px] border-2 border-[#00f5d4] bg-[#171124] bg-[radial-gradient(ellipse_at_100%_0,#7b2fff35,transparent_65%),radial-gradient(circle,#ff3af215_1px,transparent_1px)] [background-size:auto,18px_18px] px-5 pt-[25px] pb-5 shadow-[4px_4px_0_#ff3af2] min-[541px]:rounded-[26px] min-[541px]:border-4 min-[541px]:px-[34px] min-[541px]:pt-[38px] min-[541px]:pb-[26px] min-[541px]:shadow-[7px_7px_0_#ff3af2,13px_13px_0_#7b2fff,0_0_65px_#ff3af225]">
                    <div
                        className="absolute -top-1 left-[35px] right-[72px] h-[7px] bg-[linear-gradient(90deg,#ffe600,#ff6b35,#ff3af2,#7b2fff,#00f5d4)]"
                        aria-hidden="true"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 h-11 w-11 rounded-full border-2 border-[#00f5d4] bg-[#2d1b4e] text-[28px] leading-none min-[541px]:right-4 min-[541px]:top-4"
                        onClick={close}
                        disabled={form.processing}
                        aria-label="Close registration"
                    >
                        ×
                    </button>
                    <div className="flex items-center gap-2 pr-10 font-['Outfit',sans-serif] text-[20px] font-black leading-none min-[541px]:gap-[10px] min-[541px]:text-[24px]">
                        <span
                            className="grid h-[35px] w-8 shrink-0 -rotate-[8deg] place-items-center rounded-xl border-[3px] border-[#ffe600] bg-[#ff3af2] text-[#0d0d1a] shadow-[4px_4px_0_#7b2fff,6px_6px_0_#00f5d4] min-[541px]:h-[41px] min-[541px]:w-[38px]"
                            aria-hidden="true"
                        >
                            <Icon className="h-6 w-6" />
                        </span>
                        <span>
                            SDO<span className="text-[#ff3af2]">.</span>DOCS
                            <small className="mt-2 block font-['DM_Sans',sans-serif] text-[6px] tracking-[1px] min-[541px]:text-[8px] min-[541px]:tracking-[2px]">
                                DOCUMENT TRACKING SYSTEM
                            </small>
                        </span>
                    </div>
                    <DialogTitle className="relative mt-5 mb-3 font-['Outfit',sans-serif] text-[36px] font-black leading-[.95] tracking-[-1px] [text-shadow:2px_2px_0_#7b2fff,4px_4px_0_#ff3af2] [&>span:first-of-type]:text-[#00f5d4] max-[540px]:[&_br]:hidden max-[540px]:[&>span:first-of-type]:before:content-['_'] min-[541px]:mt-[22px] min-[541px]:mb-[14px] min-[541px]:text-[46px] min-[541px]:tracking-[-2px]">
                        LET’S GET
                        <br />
                        <span>STARTED.</span>
                    </DialogTitle>
                    <Description className="max-w-[340px] text-[13px] leading-[1.7] text-[#e3deec] min-[541px]:text-sm">
                        Choose your school or SDO unit and submit your details
                        for administrator review.
                    </Description>
                    {submitted ? (
                        <div
                            className="mt-[25px] rounded-2xl border-2 border-dashed border-[#00f5d4] bg-[#00f5d409] p-[22px] [&>span]:inline-grid [&>span]:h-11 [&>span]:w-11 [&>span]:place-items-center [&>span]:rounded-full [&>span]:bg-[#00f5d4] [&>span]:text-2xl [&>span]:text-[#0d0d1a] [&_h3]:mt-[14px] [&_h3]:font-['Outfit',sans-serif] [&_h3]:text-[26px] [&_h3]:font-extrabold [&_p]:mt-3 [&_p]:mb-[22px] [&_p]:text-sm [&_p]:leading-[1.8] [&_p]:text-[#e3deec]"
                            role="status"
                        >
                            <span aria-hidden="true">✓</span>
                            <h3>Request submitted.</h3>
                            <p>
                                Your registration is pending administrator
                                review. You can sign in once your account is
                                approved.
                            </p>
                            <button
                                type="button"
                                className="col-span-full flex min-h-[57px] w-full items-center justify-between gap-3 rounded-[40px] border-[3px] border-[#ffe600] bg-[linear-gradient(110deg,#792395,#5120a4,#124945)] px-[23px] py-3 text-[11px] font-extrabold uppercase tracking-[.6px] shadow-[4px_4px_0_#ff3af2,7px_7px_0_#7b2fff] [&_span]:text-2xl min-[541px]:text-xs min-[541px]:tracking-[1px]"
                                onClick={close}
                            >
                                Back to Welcome ↗
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={submit}
                            className="mt-6 grid gap-[18px] [&_label]:mb-2 [&_label]:block [&_label]:text-xs [&_label]:font-bold [&_label]:tracking-[.3px] [&_label]:text-[#eee6f8] [&_input:not([type=checkbox])]:w-full [&_input:not([type=checkbox])]:min-h-[50px] [&_input:not([type=checkbox])]:rounded-xl [&_input:not([type=checkbox])]:border-2 [&_input:not([type=checkbox])]:border-[#665080] [&_input:not([type=checkbox])]:bg-[#100c1c] [&_input:not([type=checkbox])]:p-3 [&_input:not([type=checkbox])]:text-base [&_input:not([type=checkbox])]:text-white [&_input:not([type=checkbox])]:shadow-[inset_0_2px_5px_#0003] [&_input::placeholder]:text-[#b4a7c7] [&_input:not([type=checkbox]):hover]:border-[#b388db] [&_input:not([type=checkbox]):focus]:border-[#00f5d4] [&_input:not([type=checkbox]):focus]:bg-[#1b132a] [&_input:not([type=checkbox]):focus]:ring-2 [&_input:not([type=checkbox]):focus]:ring-[#00f5d440] [&_input[aria-invalid=true]]:!border-[#ff9b78] min-[541px]:[&_input:not([type=checkbox])]:min-h-[54px] min-[541px]:[&_input:not([type=checkbox])]:px-4 min-[541px]:[&_input:not([type=checkbox])]:py-[14px] min-[541px]:[&_input:not([type=checkbox])]:text-sm grid-cols-1 max-[540px]:mt-5 max-[540px]:gap-[15px] min-[541px]:grid-cols-2"
                            aria-busy={form.processing}
                        >
                            {fields.map((field) => (
                                <div key={field.name}>
                                    <label htmlFor={`register-${field.name}`}>
                                        {field.label}
                                    </label>
                                    <input
                                        ref={
                                            field.name === "first_name"
                                                ? nameInput
                                                : undefined
                                        }
                                        id={`register-${field.name}`}
                                        name={field.name}
                                        type={
                                            field.secret
                                                ? showPasswords
                                                    ? "text"
                                                    : "password"
                                                : field.type || "text"
                                        }
                                        autoComplete={field.autocomplete}
                                        required={!field.optional}
                                        maxLength={
                                            field.secret ? undefined : 255
                                        }
                                        value={form.data[field.name]}
                                        onChange={(event) =>
                                            form.setData(
                                                field.name,
                                                event.target.value,
                                            )
                                        }
                                        placeholder={field.placeholder}
                                        aria-invalid={Boolean(
                                            form.errors[field.name],
                                        )}
                                        aria-describedby={
                                            form.errors[field.name]
                                                ? `register-${field.name}-error`
                                                : undefined
                                        }
                                    />
                                    {form.errors[field.name] && (
                                        <p
                                            role="alert"
                                            id={`register-${field.name}-error`}
                                            className="mt-2 text-xs leading-normal text-[#ffbca4]"
                                        >
                                            {form.errors[field.name]}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <div className="w-full col-span-full ">
                                <label htmlFor="register-station">
                                    Choose your school or SDO unit
                                </label>
                                <RegistrationStationPicker
                                    stations={stations}
                                    value={form.data.station_id}
                                    onChange={(value) => {
                                        form.setData("station_id", value);
                                        form.clearErrors("station_id");
                                    }}
                                    error={form.errors.station_id}
                                />
                            </div>
                            <div className="col-span-full flex items-center justify-between gap-2 [&_label]:!mb-0 [&_label]:!flex [&_label]:min-h-11 [&_label]:items-center [&_label]:gap-2 [&_label]:!font-normal [&_input]:h-[18px] [&_input]:w-[18px] [&_input]:rounded [&_input]:border-2 [&_input]:border-[#00f5d4] [&_input]:bg-[#0d0d1a] [&_input]:text-[#7b2fff] [&_a]:py-[13px] [&_a]:text-xs [&_a]:text-[#00f5d4] [&_a]:underline [&_a]:underline-offset-4">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={showPasswords}
                                        onChange={(event) =>
                                            setShowPasswords(
                                                event.target.checked,
                                            )
                                        }
                                    />
                                    Show passwords
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="col-span-full flex min-h-[57px] w-full items-center justify-between gap-3 rounded-[40px] border-[3px] border-[#ffe600] bg-[linear-gradient(110deg,#792395,#5120a4,#124945)] px-[23px] py-3 text-[11px] font-extrabold uppercase tracking-[.6px] shadow-[4px_4px_0_#ff3af2,7px_7px_0_#7b2fff] [&_span]:text-2xl min-[541px]:text-xs min-[541px]:tracking-[1px]"
                                disabled={
                                    form.processing || stations.length === 0
                                }
                            >
                                {form.processing
                                    ? "Submitting request…"
                                    : "Submit for review"}
                                <span aria-hidden="true">↗</span>
                            </button>
                            {onLogin && (
                                <p className="col-span-full mt-[3px] text-center text-[11px] text-[#c4b6d6]">
                                    Already have an account?{" "}
                                    <button
                                        type="button"
                                        className="min-h-11 p-2 font-bold text-[#00f5d4] underline underline-offset-4"
                                        disabled={form.processing}
                                        onClick={onLogin}
                                    >
                                        Log in
                                    </button>
                                </p>
                            )}
                        </form>
                    )}
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default WelcomeRegisterModal;
