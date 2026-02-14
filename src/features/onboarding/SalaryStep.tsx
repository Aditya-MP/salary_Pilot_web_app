import { useState } from "react";
import { useAppStore } from "../../store/useAppStore";

export function SalaryStep({ onNext }: { onNext: () => void; }) {
    const setStoreSalary = useAppStore((s) => s.setSalary);
    const [localSalary, setLocalSalary] = useState<number | null>(null);

    const handleSalaryConfirm = () => {
        if (localSalary && localSalary > 0) {
            setStoreSalary(localSalary);
            useAppStore.getState().completeOnboarding();
            onNext();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6 animate-fade relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-lg relative z-10 text-center">
                <div className="animate-fade-in-up">
                    <div className="mb-8 p-3 rounded-full bg-white/5 border border-white/10 w-fit mx-auto backdrop-blur-sm shadow-lg">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">Monthly Input</h2>
                    <p className="text-gray-400 mb-10 text-lg font-light">
                        Enter your <span className="text-white font-medium">monthly take-home</span> salary to calibrate the engine.
                    </p>

                    <div className="relative mb-12 group">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-light text-gray-500 transition-colors group-focus-within:text-white">₹</span>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={localSalary ?? ""}
                            onChange={(e) => setLocalSalary(Number(e.target.value))}
                            className="w-full bg-transparent border-b-2 border-gray-800 text-5xl md:text-6xl font-bold py-4 pl-12 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-800 text-white"
                            autoFocus
                        />
                    </div>

                    <button
                        disabled={!localSalary}
                        onClick={handleSalaryConfirm}
                        className={`w-full py-5 rounded-full font-bold text-lg transition-all duration-300 ${
                            localSalary
                                ? "bg-white text-black hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                : "bg-gray-900 text-gray-600 cursor-not-allowed"
                        }`}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
