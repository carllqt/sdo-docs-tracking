import { Head, Link, router } from '@inertiajs/react';
import '../../css/welcome.css';
import { useEffect, useRef } from 'react';
import WelcomeLoginModal from '@/Components/WelcomeLoginModal';
import WelcomeRegisterModal from '@/Components/WelcomeRegisterModal';

const accents = ['#FF3AF2', '#00F5D4', '#FFE600', '#FF6B35', '#7B2FFF'];
const steps = [
    { title: 'Make it official.', label: 'REGISTER', text: 'Add your document title and control number in your employee workspace.', icon: 'file' },
    { title: 'Give it an identity.', label: 'GENERATE', text: 'Create a unique QR label that connects your paper to its digital record.', icon: 'qr' },
    { title: 'Find it. Open it.', label: 'ACCESS', text: 'Scan the QR code and sign in to view the document details in one place.', icon: 'arrow' },
];

function Icon({ name = 'file', ...props }) {
    const paths = {
        file: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></>,
        arrow: <><path d="M5 12h14M12 5l7 7-7 7" /></>,
        qr: <><path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h2v2h-2zM21 14v3M14 21h3M20 20h1v1h-1" /></>,
    };
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

function Decorations() {
    return <div className="welcome-decorations" aria-hidden="true">
        <span className="deco deco-star">✦</span><span className="deco deco-ring" />
        <span className="deco deco-spark">✳</span><span className="deco deco-plus">+</span>
        <span className="deco deco-dot" /><span className="deco deco-zig">〰</span>
    </div>;
}

function DocumentArtwork() {
    return <div className="document-art" role="img" aria-label="Illustration of a document with a QR label. Register, generate, and access.">
        <div className="art-orbit" />
        <span className="art-sticker sticker-top">LESS PAPER CHASING. <span>MORE DOING.</span></span>
        <div className="art-folder"><span>THE GOOD STUFF ↗</span></div>
        <div className="art-document">
            <div className="document-top"><span>SDO / DOCUMENTS</span><Icon name="file" /></div>
            <span className="document-caption">EVERY DOCUMENT HAS A STORY.</span>
            <strong>LET’S GET<br />YOURS MOVING.</strong>
            <div className="document-lines"><i /><i /><i /></div>
            <div className="document-bottom"><div className="decorative-qr"><Icon name="qr" /></div><div><b>ONE DOCUMENT.<br />ONE IDENTITY.</b><span>QR-powered access</span></div></div>
            <span className="document-stamp">READY<br />TO GO! ↗</span>
        </div>
        <span className="art-sticker sticker-bottom"><span>✦</span> BIG IDEAS.<br /> ORGANIZED.</span>
        <span className="art-spark">✦</span>
        <div className="art-caption">A little structure. A lot of possibility. <span>↗</span></div>
    </div>;
}

export default function Welcome({ auth, canLogin = true, canRegister = true, authModal = null, status }) {
    const pageRef = useRef(null);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.add('welcome-smooth-scroll');
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        let observer;
        const elements = pageRef.current.querySelectorAll('.hero-copy, .document-art, .section-heading, .welcome-step, .benefit-callout, .benefit-copy, .welcome-footer');
        const setupReveals = () => {
            observer?.disconnect();
            elements.forEach(element => element.classList.remove('welcome-reveal-pending', 'welcome-reveal-visible'));
            if (motionPreference.matches || !('IntersectionObserver' in window)) return;
            observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('welcome-reveal-pending');
                        entry.target.classList.add('welcome-reveal-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });
            elements.forEach(element => {
                element.classList.add('welcome-reveal-pending');
                observer.observe(element);
            });
        };
        setupReveals();
        motionPreference.addEventListener('change', setupReveals);
        return () => {
            root.classList.remove('welcome-smooth-scroll');
            observer?.disconnect();
            motionPreference.removeEventListener('change', setupReveals);
        };
    }, []);
    const closeAuthModal = () => router.get(route('welcome'), {}, { preserveScroll: true, preserveState: true });
    const signedIn = Boolean(auth?.user);
    const destination = signedIn ? route('dashboard') : canLogin ? route('login') : '#how-it-works';
    const action = signedIn ? 'Open dashboard' : 'Get started';

    return <>
        <Head title="SDO Docs — Every document. Connected.">
            <meta name="description" content="Give every SDO document a digital identity. Register documents, generate QR labels, and access records in your workspace." />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet" />
        </Head>
        <div ref={pageRef} id="welcome-top" className="welcome-page">
            <a href="#main" className="welcome-skip">Skip to content</a>
            <div className="welcome-announcement">A NEW CHAPTER FOR YOUR DOCUMENTS <span aria-hidden="true">✦</span> LESS CHASING. MORE CONNECTING.</div>
            <header className="welcome-header welcome-container">
                <a href="#welcome-top" className="welcome-brand" aria-label="SDO Docs home"><span className="brand-mark"><Icon /></span><span>SDO<span className="brand-dot">.</span>DOCS<small>DOCUMENT TRACKING SYSTEM</small></span></a>
                <nav aria-label="Main navigation" className="welcome-nav"><a href="#how-it-works">How it works <span aria-hidden="true">↙</span></a><a href="#why-docs">Why SDO Docs?</a></nav>
                <div className="welcome-account">{signedIn ? <Link href={destination} className="welcome-nav-button">Dashboard <Icon name="arrow" /></Link> : <>{canLogin && <Link href={route('login')} preserveScroll preserveState className="welcome-login">Log in</Link>}{canRegister && <Link href={route('register')} preserveScroll preserveState className="welcome-nav-button">Register <Icon name="arrow" /></Link>}</>}</div>
            </header>
            <main id="main">
                <section className="welcome-hero welcome-container" aria-labelledby="hero-title">
                    <span className="hero-backdrop" aria-hidden="true">CONNECTED</span><Decorations />
                    <div className="hero-copy"><div className="welcome-eyebrow"><span /> SMALL QR. BIG POSSIBILITIES.</div>
                        <h1 id="hero-title">EVERY<br />DOCUMENT.<br /><span className="hero-gradient">CONNECTED.</span></h1>
                        <p>Your documents have places to be. Give them a digital identity and keep the details together—one QR code at a time.</p>
                        <div className="hero-actions"><Link href={destination} preserveScroll preserveState className="welcome-button">{action}<Icon name="arrow" /></Link><a href="#how-it-works" className="welcome-secondary">See how it works <span aria-hidden="true">↘</span></a></div>
                        <div className="hero-note"><span aria-hidden="true">✳</span> Made for the people behind the paperwork.</div>
                    </div>
                    <DocumentArtwork />
                    <div className="hero-index"><span>01 / A BETTER WAY TO DOCUMENT</span><a href="#how-it-works">KEEP EXPLORING <span aria-hidden="true">↓</span></a></div>
                </section>
                <div className="welcome-ticker" aria-hidden="true">
                    <div className="welcome-ticker-track">
                        {[0, 1].map(copy => <div className="welcome-ticker-group" key={copy}>
                            {['REGISTER IT', '✦', 'QR IT', '✦', 'CONNECT IT', '✦', 'FIND IT', '✦', 'REGISTER IT', '✦', 'QR IT', '✦'].map((word, i) => <span key={i}>{word}</span>)}
                        </div>)}
                    </div>
                </div>
                <section id="how-it-works" className="welcome-workflow welcome-container" aria-labelledby="workflow-title">
                    <Decorations /><div className="section-heading"><div><span className="section-label">02 / FROM PAPER TO POSSIBILITY</span><h2 id="workflow-title">THREE STEPS.<br /><span>LET’S MAKE MOVES.</span></h2></div><p>No complicated introduction needed.{' '}<br />Just your document, a QR code,{' '}<br />and a place to bring it all together.</p></div>
                    <div className="welcome-steps">{steps.map((step, i) => <article className="welcome-step" key={step.label} style={{ '--card-accent': accents[i % accents.length], '--card-shadow': accents[(i + 2) % accents.length] }}><div className="step-top"><span className="step-icon"><Icon name={step.icon} /></span><span className="step-number">0{i + 1}</span></div><span className="step-label">{step.label}</span><h3>{step.title}</h3><p>{step.text}</p><span className="step-arrow" aria-hidden="true">↗</span></article>)}</div>
                </section>
                <section id="why-docs" className="welcome-benefits welcome-container" aria-labelledby="benefits-title"><div className="benefit-callout"><span aria-hidden="true">⚡</span><span>LESS<br /><b>“WHERE’S<br />THAT FILE?”</b></span></div><div className="benefit-copy"><span className="section-label">03 / KEEP THE IMPORTANT THINGS CLOSE</span><h2 id="benefits-title">PAPERWORK.<br />WITH A <span>PURPOSE.</span></h2><p>A control number. A clear title. A QR label that opens the right record. Bring your document details into one workspace, so you can get on with what matters.</p><Link href={destination} preserveScroll preserveState className="welcome-button">{signedIn ? 'Back to your workspace' : 'Enter your workspace'}<Icon name="arrow" /></Link></div><span className="benefit-star" aria-hidden="true">✳</span></section>
            </main>
            <footer className="welcome-footer welcome-container"><a href="#welcome-top" className="footer-brand">SDO<span>.</span>DOCS <span aria-hidden="true">↗</span></a><p>Every document. Connected.</p><a href="#welcome-top">BACK TO TOP ↑</a></footer>
        </div>
        {authModal === 'login' && <WelcomeLoginModal open onClose={closeAuthModal} status={status} />}
        {authModal === 'register' && <WelcomeRegisterModal open onClose={closeAuthModal} onLogin={canLogin ? () => router.get(route('login'), {}, { preserveScroll: true, preserveState: true }) : undefined} />}
    </>;
}
