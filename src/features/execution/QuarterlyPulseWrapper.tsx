import { useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { analyzeMarket } from "../../engine/trendEngine";

export function QuarterlyPulseWrapper({
    stageAmount,
    onNext,
}: {
    stageAmount: number;
    onNext: () => void;
}) {
    const [pulseActive, setPulseActive] = useState(true);
    const pulseData = useAppStore((s) => s.pulse);
    const advancePulse = useAppStore((s) => s.advancePulse);

    const [trend, setTrend] = useState<null | any>(null);

    const progress = (pulseData.month / 3) * 100;

    return (
        <div className="min-h-screen bg-white text-black flex items-center justify-center px-6 font-sans animate-fade">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold mb-2">Quarterly Pulse</h2>
                <p className="text-gray-500 mb-6 font-light">
                    Stage your capital for 90 days before strategic market entry.
                </p>

                {/* Toggle */}
                <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                    <span className="font-medium">Activate Pulse</span>
                    <button
                        onClick={() => setPulseActive(!pulseActive)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${pulseActive ? "bg-black text-white" : "bg-gray-300 text-gray-500"
                            }`}
                    >
                        {pulseActive ? "ON" : "OFF"}
                    </button>
                </div>

                <div className="border border-gray-200 rounded-xl p-6 mb-6 shadow-md hover:shadow-lg transition bg-white">
                    <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-semibold">Staging Vault</p>
                    <p className="text-3xl font-bold tracking-tight">
                        ${pulseData.totalStaged.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        Accumulating low-risk liquid ESG assets
                    </p>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between text-xs text-gray-500 mb-2 font-medium">
                        <span>Month {pulseData.month} / 3</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-black h-full rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    {pulseData.state === "strike" && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in-up">
                            <p className="text-green-700 font-medium flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Strike Window Active
                            </p>
                            <p className="text-sm text-green-600 mt-1">
                                Capital ready for bulk market execution. AI Trend Analysis Complete using local NPU.
                            </p>
                        </div>
                    )}

                    {trend && (
                        <div className="mt-4 p-4 bg-gray-50 border rounded-xl animate-fade-in-up">
                            <p className="font-semibold mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                Market Analysis Result
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="text-gray-600">Confidence:</div>
                                <div className="font-mono">{trend.confidence}%</div>
                                <div className="text-gray-600">Volatility:</div>
                                <div className="font-mono">{trend.volatility}</div>
                                <div className="text-gray-600">Signal:</div>
                                <div className={`font-bold ${trend.entrySignal === "strong" ? "text-green-600" : trend.entrySignal === "moderate" ? "text-yellow-600" : "text-red-500"}`}>
                                    {trend.entrySignal.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Simulate Month Progress */}
                <button
                    onClick={() => {
                        advancePulse(stageAmount);

                        if (pulseData.month === 2) {
                            setTrend(analyzeMarket());
                        } else if (pulseData.state === "strike") {
                            setTrend(analyzeMarket());
                        }
                    }}
                    disabled={pulseData.state === "strike"}
                    className={`w-full py-3 mb-3 border rounded-xl font-medium transition-all ${pulseData.state === "strike"
                        ? "bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed"
                        : "border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600"
                        }`}
                >
                    {pulseData.state === "strike" ? "Cycle Complete - Ready to Strike" : "Advance Month (Simulation)"}
                </button>

                <button
                    onClick={onNext}
                    className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-900 transition-all duration-150 hover:scale-[1.02] shadow-lg shadow-gray-200/50 tracking-wide"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
