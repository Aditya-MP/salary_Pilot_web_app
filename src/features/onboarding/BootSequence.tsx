import { useState, useEffect } from "react";

export function BootSequence({ onComplete }: { onComplete: () => void }) {
    const [textIndex, setTextIndex] = useState(0);
    const texts = [
        "INITIALIZING SECURE ENVIRONMENT...",
        "LOADING BEHAVIORAL GUARDS...",
        "CONNECTING TO AI MARKET ENGINE...",
        "ESTABLISHING SECURE UPLINK...",
        "SYSTEM READY."
    ];

    useEffect(() => {
        if (textIndex < texts.length) {
            const timeout = setTimeout(() => {
                setTextIndex(prev => prev + 1);
            }, 800);
            return () => clearTimeout(timeout);
        } else {
            setTimeout(onComplete, 500);
        }
    }, [textIndex, onComplete]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-500 font-mono text-sm tracking-wider">
            <div className="w-64">
                {texts.slice(0, textIndex + 1).map((text, i) => (
                    <div key={i} className="mb-2 transition-opacity duration-300">
                        <span className="opacity-50 mr-2">{`>`}</span>
                        {text}
                    </div>
                ))}
                <div className="h-2 w-full bg-gray-900 mt-4 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all duration-300 ease-out"
                        style={{ width: `${Math.min((textIndex / (texts.length - 1)) * 100, 100)}%` }}
                    />
                </div>
            </div>
            <div className="absolute bottom-10 text-xs opacity-50 animate-pulse">
                ENCRYPTED CONNECTION ESTABLISHED
            </div>
        </div>
    );
}
