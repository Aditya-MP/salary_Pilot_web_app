import { useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { type RiskType } from "../../types";

export function RiskStep({ onNext }: { onNext: () => void; }) {
    const setStoreRisk = useAppStore((s) => s.setRisk);
    const completeOnboarding = useAppStore((s) => s.completeOnboarding);
    const [selected, setSelected] = useState<RiskType | null>(null);

    const handleConfirm = () => {
        if (selected) {
            setStoreRisk(selected);
            completeOnboarding();
            onNext();
        }
    };

    const risks: { id: RiskType; title: string; desc: string; icon: any; recommended?: boolean }[] = [
        {
            id: "conservative",
            title: "Conservative",
            desc: "Capital preservation focused. Low volatility.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            id: "balanced",
            title: "Balanced",
            desc: "Balanced growth and standard stability.",
            recommended: true,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
            )
        },
        {
            id: "aggressive",
            title: "Aggressive",
            desc: "Maximum growth potential. Higher volatility.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6 animate-fade">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-3xl relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 text-white">Risk Profile</h2>
                    <p className="text-gray-400">Select your preferred <span className="text-white font-medium">volatility tolerance</span>.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-12">
                    {risks.map((risk) => (
                        <button
                            key={risk.id}
                            onClick={() => setSelected(risk.id)}
                            className={`relative group text-left border rounded-2xl p-6 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 ${selected === risk.id
                                ? "bg-white text-black border-white ring-2 ring-white/50 ring-offset-2 ring-offset-black scale-105 z-10"
                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white"
                                }`}
                        >
                            <div className={`mb-4 p-3 rounded-full w-fit ${selected === risk.id ? "bg-black/10 text-black" : "bg-white/10 text-white"}`}>
                                {risk.icon}
                            </div>

                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg mb-2">{risk.title}</h3>
                                {risk.recommended && (
                                    <span className="bg-blue-600 text-[10px] font-bold px-2 py-0.5 rounded text-white tracking-wide uppercase shadow-lg shadow-blue-500/50">AI Pick</span>
                                )}
                            </div>

                            <p className={`text-sm leading-relaxed ${selected === risk.id ? "text-gray-700" : "text-gray-500"}`}>{risk.desc}</p>

                            {selected === risk.id && (
                                <div className="absolute top-4 right-4 text-black animate-fade-in-up">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <button
                    disabled={!selected}
                    onClick={handleConfirm}
                    className={`w-full py-5 rounded-full font-bold text-lg transition-all duration-300 max-w-md mx-auto block ${selected
                        ? "bg-white text-black hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        : "bg-gray-900 text-gray-600 cursor-not-allowed"
                        }`}
                >
                    Confirm Risk Profile
                </button>
            </div>
        </div>
    );
}
