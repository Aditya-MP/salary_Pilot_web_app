import { useAppStore } from "../store/useAppStore";
import { calculateSustainabilityImpact } from "../engine/sustainabilityEngine";

export default function Dashboard({ onNavigate }: { onNavigate?: (view: string) => void }) {
    const holdings = useAppStore((s) => s.holdings);
    const streakCount = useAppStore((s) => s.streakCount);
    const pulseState = useAppStore((s) => s.pulse.state);

    const totalInvested =
        holdings.equity + holdings.crypto + holdings.esg;

    // Sustainability Score Calculation
    const sustainabilityScore = calculateSustainabilityImpact(
        totalInvested,
        [
            { asset: "equity", allocation: holdings.equity / totalInvested || 0 },
            { asset: "crypto", allocation: holdings.crypto / totalInvested || 0 },
            { asset: "esg", allocation: holdings.esg / totalInvested || 0 },
        ],
        useAppStore.getState().streakActive
    );

    return (
        <div className="animate-fade space-y-8">

            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-1">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">FINANCIAL COMMAND CENTER</span>
                    </h1>
                    <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="text-xs font-mono text-green-400 uppercase tracking-widest">SYSTEM ONLINE</span>
                        </div>
                        <div className="text-xs text-gray-500 font-mono tracking-widest">
                            v2.1 • SECURE
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => onNavigate && onNavigate("pulse")}
                        className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]"
                    >
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Run Pulse Cycle
                        </span>
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        onClick={() => onNavigate && onNavigate("portfolio")}
                        className="group relative px-5 py-3 bg-gray-800/80 hover:bg-gray-700/80 text-white font-medium text-sm flex items-center gap-2 rounded-xl transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(156,163,175,0.3)] backdrop-blur-sm border border-gray-700"
                    >
                        <span className="text-lg">📊</span> Portfolio
                    </button>

                    <button
                        onClick={() => onNavigate && onNavigate("insights")}
                        className="group relative px-5 py-3 bg-gray-800/80 hover:bg-gray-700/80 text-white font-medium text-sm flex items-center gap-2 rounded-xl transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(156,163,175,0.3)] backdrop-blur-sm border border-gray-700"
                    >
                        <span className="text-lg">📰</span> Insights
                    </button>

                    <button
                        onClick={() => onNavigate && onNavigate("learning")}
                        className="group relative px-5 py-3 bg-gray-800/80 hover:bg-gray-700/80 text-white font-medium text-sm flex items-center gap-2 rounded-xl transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(156,163,175,0.3)] backdrop-blur-sm border border-gray-700"
                    >
                        <span className="text-lg">📚</span> Learning
                    </button>

                    <button
                        onClick={() => onNavigate && onNavigate("log")}
                        className="group relative px-5 py-3 bg-gray-800/80 hover:bg-gray-700/80 text-white font-medium text-sm flex items-center gap-2 rounded-xl transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(156,163,175,0.3)] backdrop-blur-sm border border-gray-700"
                    >
                        <span className="text-lg">🧾</span> Log
                    </button>
                </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-5 h-auto md:h-[700px]">

                {/* Main Chart Area (2x2) */}
                <div className="md:col-span-2 md:row-span-2 glass-panel p-6 relative group overflow-hidden border border-blue-500/30 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl">
                    <div className="absolute top-0 right-0 p-4 opacity-30">
                        <svg className="w-8 h-8 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-1">NET WORTH VELOCITY</h3>
                            <p className="text-4xl font-bold text-white tracking-tight">${totalInvested.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-green-400 font-mono">▲ 12.4% this quarter</p>
                            <p className="text-xs text-gray-500 font-mono">+${(totalInvested * 0.124).toLocaleString()} gain</p>
                        </div>
                    </div>

                    {/* SVG Area Chart */}
                    <div className="h-40 opacity-90 group-hover:opacity-100 transition-opacity mb-4">
                        <AreaChart data={[45, 52, 48, 60, 75, 68, 85, 78, 90, 105, 110, 120]} color="#3b82f6" />
                    </div>
                    
                    {/* Asset Allocation */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700/50">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-xs text-gray-300">Equity: <span className="text-white font-medium">{((holdings.equity / totalInvested) * 100).toFixed(0)}%</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-gray-300">ESG: <span className="text-white font-medium">{((holdings.esg / totalInvested) * 100).toFixed(0)}%</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span className="text-xs text-gray-300">Crypto: <span className="text-white font-medium">{((holdings.crypto / totalInvested) * 100).toFixed(0)}%</span></span>
                        </div>
                    </div>
                </div>

                {/* Metric: Streak (1x1) */}
                <div className="glass-panel p-6 relative overflow-hidden border border-orange-500/30 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-gray-400 text-xs font-mono uppercase tracking-widest">DISCIPLINE STREAK</h3>
                        <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-white">{streakCount}</span>
                        <span className="text-sm text-orange-400">months</span>
                    </div>
                    <p className="text-xs text-gray-500">Consecutive execution cycles</p>
                    <div className="mt-3 w-full bg-gray-700/50 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-full" style={{ width: `${Math.min(streakCount * 20, 100)}%` }}></div>
                    </div>
                </div>

                {/* Metric: ESG (1x1) */}
                <div className="glass-panel p-6 relative overflow-hidden border border-green-500/30 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-gray-400 text-xs font-mono uppercase tracking-widest">ENVIRONMENTAL IMPACT</h3>
                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-bold text-white">{sustainabilityScore}</span>
                        <span className="text-xs text-green-400">tCO₂e</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Carbon offset achieved</p>
                    <div className="w-full bg-gray-700/50 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full" style={{ width: `${Math.min(sustainabilityScore * 10, 100)}%` }}></div>
                    </div>
                    <p className="text-xs text-green-400 mt-2 font-mono">▲ 12% this quarter</p>
                </div>

                {/* Feed: Market Activity (1x3) */}
                <div className="md:col-span-1 md:row-span-3 glass-panel p-0 flex flex-col border border-purple-500/30 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl">
                    <div className="p-4 border-b border-gray-700/50 bg-gray-800/20">
                        <h3 className="text-gray-400 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                            MARKET ACTIVITY FEED
                        </h3>
                    </div>
                    <div className="flex-1 overflow-hidden relative">
                        <div className="absolute inset-0 overflow-y-auto scrollbar-hide p-4 space-y-3">
                            <FeedItem time="10:42" msg="Market volatility detected" type="alert" />
                            <FeedItem time="Yesterday" msg="Salary injected: $12,500" type="success" />
                            <FeedItem time="2d ago" msg="Triple Guard: PASSED" type="success" />
                            <FeedItem time="3d ago" msg="ESG bonds outperforming" type="info" />
                            <FeedItem time="4d ago" msg="Crypto allocation adjusted" type="info" />
                            <FeedItem time="1wk ago" msg="Portfolio rebalanced" type="info" />
                            <FeedItem time="1wk ago" msg="Streak Extended: 3mo" type="info" />
                            <FeedItem time="2wk ago" msg="AI market analysis: Bullish" type="info" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* Metric: Vault (1x1) */}
                <div className="glass-panel p-6 relative border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-gray-400 text-xs font-mono uppercase tracking-widest">VAULT STATUS</h3>
                        <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${pulseState === 'strike' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                        <span className="text-lg font-bold text-white">{pulseState === 'strike' ? 'STRIKE READY' : 'ACCUMULATING'}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Secure staging vault</p>
                </div>

                {/* Metric: Target (1x1) */}
                <div className="glass-panel p-6 relative border border-cyan-500/30 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-gray-400 text-xs font-mono uppercase tracking-widest">NEXT MILESTONE</h3>
                        <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <div>
                            <p className="text-2xl font-bold text-white">$250,000</p>
                            <p className="text-xs text-cyan-400 font-mono mt-1">42% to goal</p>
                        </div>
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 flex items-center justify-center">
                                <span className="text-cyan-500 text-sm font-bold">42%</span>
                            </div>
                            <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-cyan-500/20 animate-ping opacity-0"></div>
                        </div>
                    </div>
                </div>

                {/* Metric: Risk Level (1x1) */}
                <div className="glass-panel p-6 relative border border-amber-500/30 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-gray-400 text-xs font-mono uppercase tracking-widest">RISK PROFILE</h3>
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">Moderate</p>
                            <p className="text-xs text-gray-400">Balanced approach</p>
                        </div>
                    </div>
                </div>

                {/* Metric: Performance (1x1) */}
                <div className="glass-panel p-6 relative border border-emerald-500/30 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-gray-400 text-xs font-mono uppercase tracking-widest">PERFORMANCE</h3>
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                        <p className="text-3xl font-bold text-white">+12.4%</p>
                        <span className="text-sm text-emerald-400 font-mono">YTD</span>
                    </div>
                    <p className="text-xs text-gray-400">Above benchmark</p>
                    <div className="mt-3 w-full bg-gray-700/50 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full" style={{ width: '85%' }}></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

// --- Helper Components ---

function FeedItem({ time, msg, type }: { time: string, msg: string, type: "success" | "alert" | "info" }) {
    const color = type === 'success' ? 'text-green-500 border-green-500/30' :
        type === 'alert' ? 'text-red-500 border-red-500/30' : 'text-blue-500 border-blue-500/30';

    return (
        <div className={`pl-3 border-l-2 ${color}`}>
            <p className="text-[10px] text-gray-500 font-mono mb-0.5">{time}</p>
            <p className="text-sm text-gray-300">{msg}</p>
        </div>
    );
}

function AreaChart({ data, color }: { data: number[], color: string }) {
    // Simple SVG path generation
    const width = 100;
    const height = 100;
    const max = Math.max(...data);
    const min = Math.min(...data);

    // Normalize points
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / (max - min)) * height * 0.8; // utilize 80% height
        return `${x},${y}`;
    }).join(" ");

    return (
        <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
            <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.5" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                d={`M0,100 ${points} L100,100 Z`}
                fill="url(#chartGradient)"
            />
            <path
                d={`M${points}`}
                fill="none"
                stroke={color}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}
