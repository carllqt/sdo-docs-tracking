import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function WelcomeLoginModal({ open, onClose, status }) {
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

    return <Dialog open={open} onClose={close} initialFocus={emailInput} className="welcome-login-dialog">
        <div className="login-modal-backdrop" aria-hidden="true" />
        <div className="login-modal-scroll">
            <DialogPanel className="login-modal-panel">
                <div className="login-modal-stripe" aria-hidden="true" />
                <button type="button" className="login-modal-close" onClick={close} disabled={form.processing} aria-label="Close login">×</button>
                <div className="login-modal-brand"><span aria-hidden="true">✦</span> SDO.DOCS <span className="login-modal-badge">YOUR WORKSPACE AWAITS</span></div>
                <DialogTitle className="login-modal-title">WELCOME<br /><span>BACK.</span><span className="login-modal-spark" aria-hidden="true">↗</span></DialogTitle>
                <Description className="login-modal-description">Big ideas. Less paper chasing. Sign in to keep your documents connected.</Description>
                {status && <p role="status" className="login-modal-description">{status}</p>}
                <form onSubmit={submit} className="login-modal-form" aria-busy={form.processing}>
                    <div>
                        <label htmlFor="welcome-email">Email address</label>
                        <input ref={emailInput} id="welcome-email" name="email" type="email" autoComplete="username" required value={form.data.email} onChange={event => form.setData('email', event.target.value)} placeholder="you@example.com" aria-invalid={Boolean(form.errors.email)} aria-describedby={form.errors.email ? 'welcome-email-error' : undefined} />
                        {form.errors.email && <p role="alert" id="welcome-email-error" className="login-modal-error">{form.errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="welcome-password">Password</label>
                        <div className="login-password-field">
                            <input id="welcome-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={form.data.password} onChange={event => form.setData('password', event.target.value)} placeholder="Enter your password" aria-invalid={Boolean(form.errors.password)} aria-describedby={form.errors.password ? 'welcome-password-error' : undefined} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>{showPassword ? 'Hide' : 'Show'}</button>
                        </div>
                        {form.errors.password && <p role="alert" id="welcome-password-error" className="login-modal-error">{form.errors.password}</p>}
                    </div>
                    <div className="login-modal-options"><label><input type="checkbox" name="remember" checked={form.data.remember} onChange={event => form.setData('remember', event.target.checked)} />Remember me</label>{route().has('password.request') && <Link href={route('password.request')}>Forgot password?</Link>}</div>
                    <button type="submit" className="login-modal-submit" disabled={form.processing}>{form.processing ? 'Signing in…' : 'Let’s get connected'}<span aria-hidden="true">↗</span></button>
                    <p className="login-modal-footnote">Your documents. Your next move.</p>
                </form>
            </DialogPanel>
        </div>
    </Dialog>;
}
