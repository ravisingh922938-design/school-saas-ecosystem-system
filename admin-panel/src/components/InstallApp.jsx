import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

const InstallApp = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowButton(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setShowButton(false);
        }
        setDeferredPrompt(null);
    };

    if (!showButton) return null;

    return (
        <button
            onClick={handleInstall}
            className="fixed bottom-20 right-4 bg-indigo-600 text-white px-4 py-3 rounded-full shadow-xl flex items-center gap-2 z-50 animate-bounce"
        >
            <Download size={20} /> Install App
        </button>
    );
};

export default InstallApp;