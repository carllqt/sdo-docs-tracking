import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

const fields = [
    { name: 'name', label: 'Full name', autocomplete: 'name', placeholder: 'Your full name' },
    { name: 'email', label: 'Email address', autocomplete: 'username', placeholder: 'you@example.com', type: 'email' },
    { name: 'password', label: 'Password', autocomplete: 'new-password', placeholder: 'Create a password', secret: true },
    { name: 'password_confirmation', label: 'Confirm password', autocomplete: 'new-password', placeholder: 'Repeat your password', secret: true },
];

export default function WelcomeRegisterModal({ open, onClose, onLogin }) {
    const nameInput = useRef(null);
    const [showPasswords, setShowPasswords] = useState(false);
    const form = useForm({ name: '', email: '', password: '', password_confirmation: '' });

    const close = () => {
        if (form.processing) return;
        form.reset('password', 'password_confirmation');
        form.clearErrors();
        setShowPasswords(false);
        onClose();
    };

    const submit = (event) => {
        event.preventDefault();
        form.post(route('register'), {
            preserveScroll: true,
            onFinish: () => form.reset('password', 'password_confirmation'),
        });
    };

    return <Dialog open={open} onClose={close} initialFocus={nameInput} className="welcome-login-dialog">
        <div className="login-modal-backdrop" aria-hidden="true" />
        <div className="login-modal-scroll">
            <DialogPanel className="login-modal-panel register-modal-panel">
                <div className="login-modal-stripe" aria-hidden="true" />
                <button type="button" className="login-modal-close" onClick={close} disabled={form.processing} aria-label="Close registration">×</button>
                <div className="login-modal-brand"><span aria-hidden="true">✦</span> SDO.DOCS <span className="login-modal-badge">YOUR NEXT CHAPTER STARTS HERE</span></div>
                <DialogTitle className="login-modal-title">LET’S GET<br /><span>STARTED.</span></DialogTitle>
                <Description className="login-modal-description">Create your account. Bring your documents together and make your next move.</Description>
                <form onSubmit={submit} className="login-modal-form" aria-busy={form.processing}>
                    {fields.map(field => <div key={field.name}>
                        <label htmlFor={`register-${field.name}`}>{field.label}</label>
                        <input ref={field.name === 'name' ? nameInput : undefined} id={`register-${field.name}`} name={field.name} type={field.secret ? (showPasswords ? 'text' : 'password') : (field.type || 'text')} autoComplete={field.autocomplete} required maxLength={field.secret ? undefined : 255} value={form.data[field.name]} onChange={event => form.setData(field.name, event.target.value)} placeholder={field.placeholder} aria-invalid={Boolean(form.errors[field.name])} aria-describedby={form.errors[field.name] ? `register-${field.name}-error` : undefined} />
                        {form.errors[field.name] && <p role="alert" id={`register-${field.name}-error`} className="login-modal-error">{form.errors[field.name]}</p>}
                    </div>)}
                    <div className="login-modal-options"><label><input type="checkbox" checked={showPasswords} onChange={event => setShowPasswords(event.target.checked)} />Show passwords</label></div>
                    <button type="submit" className="login-modal-submit" disabled={form.processing}>{form.processing ? 'Creating account…' : 'Create account'}<span aria-hidden="true">↗</span></button>
                    {onLogin && <p className="login-modal-footnote">Already have an account? <button type="button" className="register-login-switch" disabled={form.processing} onClick={onLogin}>Log in</button></p>}
                </form>
            </DialogPanel>
        </div>
    </Dialog>;
}
