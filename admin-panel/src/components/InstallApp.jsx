import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

const InstallButton = () => {
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

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                setDeferredPrompt(null);
                setShowButton(false);
            });
        }
    };

    if (!showButton) return null;

    return (
        <button
            onClick={handleInstallClick}
            className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-full shadow-xl flex items-center gap-2 z-50 animate-bounce cursor-pointer"
        >
            <Download size={20} /> Install App
        </button>
    );
};

export default InstallButton;