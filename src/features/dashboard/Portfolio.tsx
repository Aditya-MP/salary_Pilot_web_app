
import { useAppStore } from "../../store/useAppStore";

export function Portfolio() {
    const holdings = useAppStore((s) => s.holdings);
    const salary = useAppStore((s) => s.salary) || 0;
    const streakCount = useAppStore((s) => s.streakCount);
    const risk = useAppStore((s) => s.risk) || "balanced";

    const total = holdings.equity + holdings.crypto + holdings.esg;

    const equityPercent = total
        ? ((holdings.equity / total) * 100).toFixed(1)
        : "0.0";

    const cryptoPercent = total
        ? ((holdings.crypto / total) * 100).toFixed(1)
        : "0.0";

    const esgPercent = total
        ? ((holdings.esg / total) * 100).toFixed(1)
        : "0.0";

    return (
        <div className="animate-fade">
            <h1 className="text-3xl font-bold mb-8">
                Portfolio Overview
            </h1>

            <div className="grid md:grid-cols-2 gap-6">

                {/* Total Value */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                    <h2 className="font-semibold mb-2 text-gray-600">
                        Total Invested
                    </h2>
                    <p className="text-4xl font-bold tracking-tight">
                        ₹{total.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-mono text-gray-400 uppercase">Base Salary: ₹{salary.toLocaleString()}</span>
                        {total > 0 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">+{(total / salary * 100).toFixed(0)}% Utilized</span>}
                    </div>
                </div>

                {/* Asset Allocation */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                    <h2 className="font-semibold mb-4 text-gray-600">
                        Asset Allocation
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">Equity</span>
                                <span className="text-gray-500">{equityPercent}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${equityPercent}%` }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">ESG Bonds</span>
                                <span className="text-gray-500">{esgPercent}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full transition-all duration-1000" style={{ width: `${esgPercent}%` }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">Crypto Assets</span>
                                <span className="text-gray-500">{cryptoPercent}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full transition-all duration-1000" style={{ width: `${cryptoPercent}%` }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk Indicator */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                    <h2 className="font-semibold mb-2 text-gray-600">
                        Risk Profile
                    </h2>
                    <div className="flex items-center gap-3 mt-1">
                        <span className={`w-3 h-3 rounded-full ${risk === "conservative" ? "bg-blue-500" :
                            risk === "balanced" ? "bg-purple-500" : "bg-orange-500"
                            }`} />
                        <p className="text-xl font-bold capitalize">
                            {risk} Model
                        </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Automatic rebalancing active based on your {risk} tolerance.
                    </p>
                </div>

                {/* Discipline Streak */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                    <h2 className="font-semibold mb-2 text-gray-600">
                        Discipline Streak
                    </h2>
                    <p className="text-xl font-bold text-blue-600">
                        {streakCount} Cycles Completed
                    </p>
                    <div className="flex gap-1 mt-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`h-2 flex-1 rounded-full ${i < streakCount ? "bg-blue-500" : "bg-gray-100"}`} />
                        ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Consistent execution unlocks premium tiers.</p>
                </div>

            </div>
        </div>
    );
}
