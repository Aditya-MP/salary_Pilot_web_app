import { useState } from "react";
import DashboardComponent from "../../components/Dashboard";
import { Portfolio } from "../../features/dashboard/Portfolio";
import { MarketInsights } from "../../features/dashboard/MarketInsights";
import { LearningHub } from "../../features/dashboard/LearningHub";
import { DecisionLog } from "../../features/dashboard/DecisionLog";
import { QuarterlyPulseWrapper } from "../../features/execution/QuarterlyPulseWrapper";
import { ApproveInvestment } from "../../features/execution/ApproveInvestment";
import { ExecutedView } from "../../features/execution/ExecutedView";
import { useAppStore } from "../../store/useAppStore";

export function MainLayout() {
    const [active, setActive] = useState("dashboard");
    const salary = useAppStore(s => s.salary) || 0;
    const split = useAppStore(s => s.split);

    // Calculate monthly stage amount based on "Investments" split
    // Default to 20% if split not set (fallback)
    const investmentPercent = split?.investments || 20;
    const stageAmount = (salary * investmentPercent) / 100;

    const handlePulseNext = () => {
        setActive("approve");
    };

    const handleExecute = () => {
        const state = useAppStore.getState();
        const trend = state.marketTrend;

        // Log the decision
        if (state.addLog) {
            state.addLog({
                emotion: "calm", // We could pass this from ApproveInvestment if we lifted state
                guardScore: 0.85, // Placeholder/Simulation
                marketSignal: trend?.entrySignal || "moderate",
                result: "Executed"
            });
        }

        // Reset pulse for next cycle
        if (state.resetPulse) {
            state.resetPulse();
        }

        setActive("executed");
    };

    return (
        <div className="flex min-h-screen bg-gray-950 font-sans text-white overflow-hidden">

            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
            </div>

            {/* Sidebar */}
            <div className="w-72 bg-black/40 backdrop-blur-2xl border-r border-white/5 p-6 flex flex-col z-10 relative">
                <div className="mb-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-white">Salary Pilot</h2>
                        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Terminal v2.1</p>
                    </div>
                </div>

                <div className="space-y-2">
                    {[
                        { id: "dashboard", label: "Dashboard", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
                        { id: "portfolio", label: "Portfolio Live", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                        { id: "insights", label: "Market Intelligence", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
                        { id: "learning", label: "Learning Hub", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
                        { id: "log", label: "Decision Log", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className={`group w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-medium relative overflow-hidden ${active === item.id
                                ? "text-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {active === item.id && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-50" />
                            )}
                            <svg className={`w-5 h-5 transition-colors ${active === item.id ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                            <span className="relative z-10">{item.label}</span>
                            {active === item.id && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />}
                        </button>
                    ))}
                </div>

                <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
                    <div className="flex items-center gap-3 px-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border border-white/10 relative">
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors">Aditya M.</p>
                            <p className="text-xs text-gray-500 font-mono">PRO • INVESTOR</p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            // Clear Zustand storage and reset state
                            useAppStore.getState().resetOnboarding();
                            // Optional: window.location.reload() if needed, but state change should trigger re-render
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2 text-xs font-mono text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        RESET SYSTEM
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 lg:p-12 overflow-y-auto h-screen relative z-10 scrollbar-hide">
                {active === "dashboard" && <DashboardComponent onNavigate={setActive} />}
                {active === "portfolio" && <Portfolio />}
                {active === "insights" && <MarketInsights />}
                {active === "learning" && <LearningHub />}
                {active === "log" && <DecisionLog />}

                {/* Execution Flow */}
                {active === "pulse" && (
                    <QuarterlyPulseWrapper
                        stageAmount={stageAmount}
                        onNext={handlePulseNext}
                    />
                )}
                {active === "approve" && (
                    <ApproveInvestment
                        onExecute={handleExecute}
                    />
                )}
                {active === "executed" && (
                    <ExecutedView
                        onDashboard={() => setActive("dashboard")}
                    />
                )}

            </div>
        </div>
    );
}
