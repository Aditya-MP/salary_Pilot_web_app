import { useLivePrices } from '../../hooks/useLivePrices';

export function UltraSplash({ onStart }: { onStart: () => void }) {
    const { changes } = useLivePrices();

    return (
        <div className="relative min-h-screen bg-black selection:bg-white/20 overflow-hidden flex flex-col justify-between font-sans">

            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Gradient */}
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px] animate-pulse-slow" />

                {/* Bottom Gradient */}
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] animate-float" />

                {/* Perspective Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-50 transform perspective-1000 rotate-x-12 scale-150" />
            </div>

            {/* Top Ticker */}
            <div className="relative w-full overflow-hidden border-b border-white/5 bg-black/50 backdrop-blur-sm z-20">
                <div className="flex whitespace-nowrap animate-marquee py-2">
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="mx-4 text-xs font-mono tracking-[0.2em] text-gray-500 uppercase">
                            AI-DRIVEN WEALTH • AUTOMATED SAVINGS • INTELLIGENT ALLOCATION • MARKET ANALYSIS •
                        </span>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 mt-10 md:mt-20">

                {/* Animated Badge */}
                <div className="mb-10 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
                    <div className="relative group cursor-default">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                        <div className="relative px-6 py-2 bg-black rounded-full border border-white/10 ring-1 ring-white/10 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-blink" />
                            <span className="text-xs font-medium tracking-widest text-gray-300 uppercase">
                                System Online
                            </span>
                        </div>
                    </div>
                </div>

                {/* Hero Text */}
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-6 animate-fade-in-up opacity-0 mix-blend-overlay" style={{ animationDelay: "0.4s" }}>
                    SALARY
                    <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40"> PILOT</span>
                </h1>

                <p className="text-gray-400 max-w-2xl text-xl md:text-2xl font-light tracking-wide leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: "0.6s" }}>
                    The operating system for your
                    <span className="text-white font-normal mx-2 relative inline-block">
                        financial future
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500/50" />
                    </span>
                    powered by advanced AI.
                </p>

                {/* CTA Section */}
                <div className="mt-16 animate-fade-in-up opacity-0" style={{ animationDelay: "0.8s" }}>
                    <button
                        onClick={onStart}
                        className="group relative px-12 py-5 bg-white text-black text-lg font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)]"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                        <span className="relative flex items-center gap-3">
                            INITIALIZE
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </button>
                    <p className="mt-6 text-[10px] text-gray-600 font-mono uppercase tracking-widest opacity-60">
                        v2.0 • Build 2409 • Secure
                    </p>
                </div>
            </div>

            {/* Bottom Ticker */}
            <div className="relative w-full overflow-hidden border-t border-white/5 bg-black/50 backdrop-blur-sm z-20 mt-10">
                <div className="flex whitespace-nowrap animate-marquee-reverse py-3">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-12 mx-6">
                            <span className="text-xs font-mono text-gray-500">BTC <span className={changes.btc >= 0 ? 'text-green-500' : 'text-red-500'}>{changes.btc >= 0 ? '▲' : '▼'} {Math.abs(changes.btc).toFixed(1)}%</span></span>
                            <span className="text-xs font-mono text-gray-500">ETH <span className={changes.eth >= 0 ? 'text-green-500' : 'text-red-500'}>{changes.eth >= 0 ? '▲' : '▼'} {Math.abs(changes.eth).toFixed(1)}%</span></span>
                            <span className="text-xs font-mono text-gray-500">S&P 500 <span className={changes.sp500 >= 0 ? 'text-green-500' : 'text-red-500'}>{changes.sp500 >= 0 ? '▲' : '▼'} {Math.abs(changes.sp500).toFixed(1)}%</span></span>
                            <span className="text-xs font-mono text-gray-500">NASDAQ <span className={changes.nasdaq >= 0 ? 'text-green-500' : 'text-red-500'}>{changes.nasdaq >= 0 ? '▲' : '▼'} {Math.abs(changes.nasdaq).toFixed(1)}%</span></span>
                            <span className="text-xs font-mono text-gray-500">GOLD <span className={changes.gold >= 0 ? 'text-green-500' : 'text-red-500'}>{changes.gold >= 0 ? '▲' : '▼'} {Math.abs(changes.gold).toFixed(1)}%</span></span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
