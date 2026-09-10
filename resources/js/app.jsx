import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const isPublicEntry = () => ['welcome', 'login', 'register'].some((name) =>
    new URL(route(name), window.location.origin).pathname === window.location.pathname,
);

// History snapshots can contain guest props after the session has signed in.
const recheckHistorySession = (event) => {
    if (!isPublicEntry()) return;
    event.stopImmediatePropagation();
    window.location.reload();
};
window.addEventListener('popstate', recheckHistorySession, true);
const recheckRestoredSession = (event) => {
    if (event.persisted) recheckHistorySession(event);
};
window.addEventListener('pageshow', recheckRestoredSession, true);

if (import.meta.hot) {
    import.meta.hot.dispose(() => {
        window.removeEventListener('popstate', recheckHistorySession, true);
        window.removeEventListener('pageshow', recheckRestoredSession, true);
    });
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
