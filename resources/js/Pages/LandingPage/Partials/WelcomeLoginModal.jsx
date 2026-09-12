import Icon from "@/Components/Icon";
import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

const WelcomeLoginModal = ({ open, onClose, status }) => {
    const emailInput = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm({ email: '', password: '', remember: false });

    const close = () => {
        if (form.processing) return;
        form.reset('password');
        form.clearErrors();
        setShowPassword(false);
        onClose();
    };

    const submit = (event) => {
        event.preventDefault();
        form.post(route('login'), {
            preserveScroll: true,
            onFinish: () => form.reset('password'),
        });
    };

    return <Dialog open={open} onClose={close} initialFocus={emailInput} className="relative z-[60] font-['DM_Sans',sans-serif] text-white [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-60 [&_button:focus-visible]:outline [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[#00f5d4] [&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-[#00f5d4]">
        <div className="fixed inset-0 bg-[#080714dc] backdrop-blur-[8px]" aria-hidden="true" />
        <div className="fixed inset-0 flex items-start overflow-y-auto px-3 pt-3 pb-5 min-[541px]:px-6 min-[541px]:py-8">
            <DialogPanel className="relative m-auto w-full min-w-0 max-w-[480px] rounded-[21px] border-2 border-[#ff3af2] bg-[#171124] bg-[radial-gradient(ellipse_at_100%_0,#7b2fff35,transparent_65%),radial-gradient(circle,#ff3af215_1px,transparent_1px)] [background-size:auto,18px_18px] px-5 pt-[25px] pb-5 shadow-[4px_4px_0_#7b2fff] min-[541px]:rounded-[26px] min-[541px]:border-4 min-[541px]:px-[34px] min-[541px]:pt-[38px] min-[541px]:pb-[26px] min-[541px]:shadow-[7px_7px_0_#00f5d4,13px_13px_0_#7b2fff,0_0_65px_#ff3af225]">
                <div className="absolute -top-1 left-[35px] right-[72px] h-[7px] bg-[linear-gradient(90deg,#ffe600,#ff6b35,#ff3af2,#7b2fff,#00f5d4)]" aria-hidden="true" />
                <button type="button" className="absolute right-3 top-3 h-11 w-11 rounded-full border-2 border-[#00f5d4] bg-[#2d1b4e] text-[28px] leading-none min-[541px]:right-4 min-[541px]:top-4" onClick={close} disabled={form.processing} aria-label="Close login">×</button>
                <div className="flex items-center gap-2 pr-10 font-['Outfit',sans-serif] text-[20px] font-black leading-none min-[541px]:gap-[10px] min-[541px]:text-[24px]">
                        <span className="grid h-[35px] w-8 shrink-0 -rotate-[8deg] place-items-center rounded-xl border-[3px] border-[#ffe600] bg-[#ff3af2] text-[#0d0d1a] shadow-[4px_4px_0_#7b2fff,6px_6px_0_#00f5d4] min-[541px]:h-[41px] min-[541px]:w-[38px]" aria-hidden="true">
                            <Icon className="h-6 w-6" />
                        </span>
                        <span>
                            SDO<span className="text-[#ff3af2]">.</span>DOCS
                            <small className="mt-2 block font-['DM_Sans',sans-serif] text-[6px] tracking-[1px] min-[541px]:text-[8px] min-[541px]:tracking-[2px]">DOCUMENT TRACKING SYSTEM</small>
                        </span>
                    </div>
                <DialogTitle className="relative mt-5 mb-3 font-['Outfit',sans-serif] text-[36px] font-black leading-[.95] tracking-[-1px] [text-shadow:2px_2px_0_#7b2fff,4px_4px_0_#ff3af2] [&>span:first-of-type]:text-[#00f5d4] max-[540px]:[&_br]:hidden max-[540px]:[&>span:first-of-type]:before:content-['_'] min-[541px]:mt-[22px] min-[541px]:mb-[14px] min-[541px]:text-[56px] min-[541px]:tracking-[-2px]">WELCOME<br /><span>BACK.</span><span className="absolute bottom-0 right-5 hidden rotate-[8deg] text-[74px] text-[#ffe600] min-[541px]:block" aria-hidden="true">↗</span></DialogTitle>
                <Description className="max-w-[340px] text-[13px] leading-[1.7] text-[#e3deec] min-[541px]:text-sm">Big ideas. Less paper chasing. Sign in to keep your documents connected.</Description>
                {status && <p role="status" className="max-w-[340px] text-[13px] leading-[1.7] text-[#e3deec] min-[541px]:text-sm">{status}</p>}
                <form onSubmit={submit} className="mt-6 grid gap-[18px] [&_label]:mb-2 [&_label]:block [&_label]:text-xs [&_label]:font-bold [&_label]:tracking-[.3px] [&_label]:text-[#eee6f8] [&_input:not([type=checkbox])]:w-full [&_input:not([type=checkbox])]:min-h-[50px] [&_input:not([type=checkbox])]:rounded-xl [&_input:not([type=checkbox])]:border-2 [&_input:not([type=checkbox])]:border-[#665080] [&_input:not([type=checkbox])]:bg-[#100c1c] [&_input:not([type=checkbox])]:p-3 [&_input:not([type=checkbox])]:text-base [&_input:not([type=checkbox])]:text-white [&_input:not([type=checkbox])]:shadow-[inset_0_2px_5px_#0003] [&_input::placeholder]:text-[#b4a7c7] [&_input:not([type=checkbox]):hover]:border-[#b388db] [&_input:not([type=checkbox]):focus]:border-[#00f5d4] [&_input:not([type=checkbox]):focus]:bg-[#1b132a] [&_input:not([type=checkbox]):focus]:ring-2 [&_input:not([type=checkbox]):focus]:ring-[#00f5d440] [&_input[aria-invalid=true]]:!border-[#ff9b78] min-[541px]:[&_input:not([type=checkbox])]:min-h-[54px] min-[541px]:[&_input:not([type=checkbox])]:px-4 min-[541px]:[&_input:not([type=checkbox])]:py-[14px] min-[541px]:[&_input:not([type=checkbox])]:text-sm" aria-busy={form.processing}>
                    <div>
                        <label htmlFor="welcome-email">Email address</label>
                        <input ref={emailInput} id="welcome-email" name="email" type="email" autoComplete="username" required value={form.data.email} onChange={event => form.setData('email', event.target.value)} placeholder="you@example.com" aria-invalid={Boolean(form.errors.email)} aria-describedby={form.errors.email ? 'welcome-email-error' : undefined} />
                        {form.errors.email && <p role="alert" id="welcome-email-error" className="mt-2 text-xs leading-normal text-[#ffbca4]">{form.errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="welcome-password">Password</label>
                        <div className="relative [&_input]:!pr-[72px] [&_button]:absolute [&_button]:right-[6px] [&_button]:top-[5px] [&_button]:min-h-11 [&_button]:min-w-[54px] [&_button]:rounded-r-lg [&_button]:border-l [&_button]:border-[#665080] [&_button]:text-xs [&_button]:font-bold [&_button]:text-[#00f5d4]">
                            <input id="welcome-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={form.data.password} onChange={event => form.setData('password', event.target.value)} placeholder="Enter your password" aria-invalid={Boolean(form.errors.password)} aria-describedby={form.errors.password ? 'welcome-password-error' : undefined} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>{showPassword ? 'Hide' : 'Show'}</button>
                        </div>
                        {form.errors.password && <p role="alert" id="welcome-password-error" className="mt-2 text-xs leading-normal text-[#ffbca4]">{form.errors.password}</p>}
                    </div>
                    <div className="col-span-full flex items-center justify-between gap-2 [&_label]:!mb-0 [&_label]:!flex [&_label]:min-h-11 [&_label]:items-center [&_label]:gap-2 [&_label]:!font-normal [&_input]:h-[18px] [&_input]:w-[18px] [&_input]:rounded [&_input]:border-2 [&_input]:border-[#00f5d4] [&_input]:bg-[#0d0d1a] [&_input]:text-[#7b2fff] [&_a]:py-[13px] [&_a]:text-xs [&_a]:text-[#00f5d4] [&_a]:underline [&_a]:underline-offset-4"><label><input type="checkbox" name="remember" checked={form.data.remember} onChange={event => form.setData('remember', event.target.checked)} />Remember me</label>{route().has('password.request') && <Link href={route('password.request')}>Forgot password?</Link>}</div>
                    <button type="submit" className="col-span-full flex min-h-[57px] w-full items-center justify-between gap-3 rounded-[40px] border-[3px] border-[#ffe600] bg-[linear-gradient(110deg,#792395,#5120a4,#124945)] px-[23px] py-3 text-[11px] font-extrabold uppercase tracking-[.6px] shadow-[4px_4px_0_#ff3af2,7px_7px_0_#7b2fff] [&_span]:text-2xl min-[541px]:text-xs min-[541px]:tracking-[1px]" disabled={form.processing}>{form.processing ? 'Signing in…' : 'Let’s get connected'}<span aria-hidden="true">↗</span></button>
                    <p className="col-span-full mt-[3px] text-center text-[11px] text-[#c4b6d6]">Your documents. Your next move.</p>
                </form>
            </DialogPanel>
        </div>
    </Dialog>;
};

export default WelcomeLoginModal;
