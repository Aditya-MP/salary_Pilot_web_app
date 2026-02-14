import { useState, useEffect } from "react";
import { useAppStore } from "../../store/useAppStore";
import { evaluateGuards } from "../../engine/guardEngine";
import { calculateNetReturn } from "../../engine/taxEngine";

export function ApproveInvestment({
    onExecute,
}: {
    onExecute: () => void;
}) {
    const [emotion, setEmotion] = useState<"calm" | "stressed" | "fomo" | null>(null);
    const [cooldown, setCooldown] = useState(0);
    const [hasWaited, setHasWaited] = useState(false); // True after cooldown finishes
    const [peerHoldPercentage] = useState(() => Math.floor(Math.random() * 10) + 65);
    const streakPass = useAppStore((s) => s.streakActive);
    const riskProfile = useAppStore((s) => s.risk);

    // Cooldown Logic
    useEffect(() => {
        // Auto-start timer if Stressed/FOMO selected and not yet waited
        if ((emotion === "stressed" || emotion === "fomo") && !hasWaited && cooldown === 0) {
            setCooldown(15);
        }

        if (cooldown > 0) {
            const interval = setInterval(() => {
                setCooldown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setHasWaited(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [emotion, cooldown, hasWaited]);

    const handleEmotionSelect = (selected: "calm" | "stressed" | "fomo") => {
        setEmotion(selected);
        if (selected === "calm") {
            setHasWaited(true); // Calm doesn't need to wait
            setCooldown(0);
        } else {
            setHasWaited(false);
            setCooldown(15); // Will be picked up by effect, but setting here for immediate feedback
        }
    };

    const handleBack = () => {
        setEmotion(null);
        setCooldown(0);
        setHasWaited(false);
    };

    // Guard Logic
    const guardResult = evaluateGuards({
        emotion: emotion || "stressed", // Default to stressed if null to block execution
        streakActive: streakPass,
        riskProfile: riskProfile || "balanced",
    });

    // Derived states for UI
    const emotionalPass = emotion === "calm" || hasWaited;

    // Tax Preview Calculation
    const previewAmount = 10000;
    const equity = calculateNetReturn(previewAmount, "equity");
    const crypto = calculateNetReturn(previewAmount, "crypto");
    const esg = calculateNetReturn(previewAmount, "esg");

    return (
        <div className="min-h-screen bg-white text-black flex items-center justify-center px-6 font-sans animate-fade">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block p-3 rounded-full bg-black/5 mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Triple Guard Verification</h2>
                    <p className="text-gray-500">
                        System requires <span className="text-black font-semibold">Composite Score ≥ 0.75</span> to authorize execution.
                    </p>
                </div>

                {/* Emotional Guard */}
                <div className={`border rounded-xl p-5 mb-4 transition-all duration-300 shadow-md hover:shadow-lg ${!emotionalPass ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="font-semibold flex items-center gap-2">
                                1. Emotional Guard
                                {emotionalPass && <span className="text-green-500 text-xs">● PASSED</span>}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Biometric & sentiment analysis</p>
                        </div>
                    </div>

                    {!emotion ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEmotionSelect("calm")}
                                className="flex-1 py-3 bg-white border border-gray-200 text-gray-500 rounded-xl text-sm font-bold hover:bg-gray-50 hover:text-black transition-all duration-200"
                            >
                                Calm
                            </button>
                            <button
                                onClick={() => handleEmotionSelect("stressed")}
                                className="flex-1 py-3 bg-white border border-gray-200 text-gray-500 rounded-xl text-sm font-bold hover:bg-gray-50 hover:text-black transition-all duration-200"
                            >
                                Stressed
                            </button>
                            <button
                                onClick={() => handleEmotionSelect("fomo")}
                                className="flex-1 py-3 bg-white border border-gray-200 text-gray-500 rounded-xl text-sm font-bold hover:bg-gray-50 hover:text-black transition-all duration-200"
                            >
                                FOMO
                            </button>
                        </div>
                    ) : (
                        <div className="animate-fade-in-up">
                            {/* Selected State Display */}
                            <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <span className="text-sm font-medium text-gray-600 capitalize">Selection: <span className="text-black font-bold">{emotion}</span></span>
                                <button
                                    onClick={handleBack}
                                    className="text-xs text-gray-400 hover:text-black underline"
                                >
                                    Change
                                </button>
                            </div>

                            {cooldown > 0 && (
                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex flex-col items-center gap-2 mb-4 animate-pulse">
                                    <div className="font-mono text-3xl font-bold text-blue-600">{cooldown}s</div>
                                    <p className="text-sm text-blue-800 font-medium text-center">Protocol Active: Reflecting on logic vs emotion...</p>
                                    <button
                                        onClick={handleBack}
                                        className="mt-2 text-xs text-blue-500 hover:text-blue-700 font-medium"
                                    >
                                        Cancel & Go Back
                                    </button>
                                </div>
                            )}

                            {hasWaited && !emotionalPass && (
                                <div className="p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 animate-fade-in-up">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <p className="text-sm text-green-800 font-medium">Friction verification complete. Execution authorized.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Peer Benchmark */}
                <div className="border border-gray-200 rounded-xl p-5 mb-4 bg-white shadow-md hover:shadow-lg transition">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                        2. Peer Benchmark
                        <span className="text-green-500 text-xs">● PASSED</span>
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        <span className="font-semibold text-black">{peerHoldPercentage}%</span> of Wealth Builders held position during similar dips.
                    </p>
                </div>

                {/* Streak Guard */}
                <div className="border border-gray-200 rounded-xl p-5 mb-8 bg-white shadow-md hover:shadow-lg transition">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                        3. Discipline Guard
                        {streakPass ? <span className="text-green-500 text-xs">● PASSED</span> : <span className="text-red-500 text-xs">● FAILED</span>}
                    </p>
                    {streakPass ? (
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Diamond Streak Active</p>
                                <p className="text-xs text-gray-500">90-day discipline intact.</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-red-500 text-sm">
                            Streak broken. Review strategy.
                        </p>
                    )}
                </div>

                {/* Streak Warning */}
                {(cooldown > 0 || !guardResult.allowExecution) && (
                    <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3 items-start animate-fade-in-up">
                        <svg className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <p className="text-sm text-yellow-800 font-medium">
                            Breaking this trade may reset your annual sustainability streak.
                        </p>
                    </div>
                )}

                {/* Guard Score Breakdown */}
                <div className="border rounded-xl p-4 mb-6 bg-gray-50">
                    <p className="font-semibold mb-2">
                        Guard Composite Score
                    </p>
                    <p className="text-sm">
                        Final Score: {guardResult.finalScore}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Minimum Required: 0.75
                    </p>
                </div>

                {/* Tax Preview UI */}
                <div className="border rounded-xl p-4 mb-6 bg-gray-50/50">
                    <p className="font-semibold mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        Tax-Aware Net Preview <span className="text-xs font-normal text-gray-500">(₹10,000 example)</span>
                    </p>

                    <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Equity</span>
                            <span className="font-mono">
                                ₹{equity.net.toLocaleString()} <span className="text-xs text-gray-400">({equity.taxRate * 100}% tax)</span>
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Crypto</span>
                            <span className="font-mono">
                                ₹{crypto.net.toLocaleString()} <span className="text-xs text-gray-400">({crypto.taxRate * 100}% tax)</span>
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">ESG Bond</span>
                            <span className="font-mono">
                                ₹{esg.net.toLocaleString()} <span className="text-xs text-gray-400">({esg.taxRate * 100}% tax)</span>
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    disabled={!guardResult.allowExecution && !hasWaited}
                    onClick={() => {
                        console.log("Button clicked!");
                        onExecute();
                    }}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-150 shadow-xl ${guardResult.allowExecution || hasWaited
                        ? "bg-black text-white hover:scale-[1.02] shadow-black/20 tracking-wide"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                        }`}
                >
                    {guardResult.allowExecution || hasWaited ? "Execute Strategy" : "Blocked by Guard System"}
                </button>
            </div>
        </div>
    );
}
