
import { useAppStore } from "../../store/useAppStore";

export function MarketInsights() {
    const trend = useAppStore(s => s.marketTrend);

    if (!trend) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center animate-fade">
                <div className="p-4 bg-gray-50 rounded-full mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h1 className="text-xl font-bold mb-2 text-gray-900">
                    Awaiting Data
                </h1>
                <p className="text-gray-500 max-w-xs">
                    No active analysis yet. Complete a standard Pulse cycle to generate AI insights.
                </p>
            </div>
        );
    }

    return (
        <div className="animate-fade">
            <h1 className="text-3xl font-bold mb-8">
                AI Market Analysis
            </h1>

            <div className="grid md:grid-cols-2 gap-6">

                {/* Confidence Score */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
                        </div>
                        <span className="text-xs font-mono text-gray-400 uppercase">AI Confidence</span>
                    </div>
                    <h2 className="font-semibold text-lg mb-1 text-gray-600">
                        Confidence Score
                    </h2>
                    <div className="flex items-end gap-2">
                        <p className="text-4xl font-bold tracking-tight">
                            {trend.confidence}%
                        </p>
                        <span className={`mb-1 text-sm font-bold ${trend.confidence > 80 ? "text-green-500" : "text-yellow-500"}`}>
                            {trend.confidence > 80 ? "HIGH" : "MODERATE"}
                        </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${trend.confidence}%` }} />
                    </div>
                </div>

                {/* Volatility Index */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </div>
                        <span className="text-xs font-mono text-gray-400 uppercase">VIX Monitor</span>
                    </div>
                    <h2 className="font-semibold text-lg mb-1 text-gray-600">
                        Volatility Index
                    </h2>
                    <p className="text-4xl font-bold tracking-tight">
                        {trend.volatility}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Standard deviation of returns (30-day window).
                    </p>
                </div>

                {/* Entry Signal */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 col-span-1 md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${trend.entrySignal === "strong" ? "bg-green-500" :
                            trend.entrySignal === "moderate" ? "bg-yellow-500" : "bg-red-500"
                            }`} />
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Live Signal Generated</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:items-center">
                        <div>
                            <h2 className="font-semibold text-sm text-gray-500 mb-1">
                                Entry Signal
                            </h2>
                            <p className={`text-3xl font-bold uppercase ${trend.entrySignal === "strong" ? "text-green-600" :
                                trend.entrySignal === "moderate" ? "text-yellow-600" : "text-red-600"
                                }`}>
                                {trend.entrySignal}
                            </p>
                        </div>
                        <div className="h-10 w-px bg-gray-200 hidden md:block" />
                        <div>
                            <h2 className="font-semibold text-sm text-gray-500 mb-1">
                                AI Commentary
                            </h2>
                            <p className="text-lg text-gray-800 leading-relaxed max-w-2xl">
                                "{trend.commentary}"
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
