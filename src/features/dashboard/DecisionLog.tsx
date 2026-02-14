import { useAppStore } from "../../store/useAppStore";

export function DecisionLog() {
    const logs = useAppStore((s) => s.decisionLog);

    return (
        <div className="animate-fade">
            <h1 className="text-3xl font-bold mb-8">
                Decision Log
            </h1>

            {logs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="font-medium">No decisions recorded yet.</p>
                    <p className="text-sm mt-1">Run a cycle to populate your history.</p>
                </div>
            )}

            <div className="space-y-4">
                {logs.map((log, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${log.result === "Executed"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}>
                                {log.result}
                            </span>
                            <span className="text-xs font-mono text-gray-400">
                                {log.timestamp}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                            <div>
                                <span className="text-gray-500 block mb-1">Emotion State</span>
                                <span className="font-semibold capitalize text-gray-800">{log.emotion}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 block mb-1">Guard Score</span>
                                <span className="font-mono font-semibold text-gray-800">{log.guardScore.toFixed(2)}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 block mb-1">Market Context</span>
                                <span className={`font-bold uppercase ${log.marketSignal === "strong" ? "text-green-600" :
                                    log.marketSignal === "moderate" ? "text-yellow-600" : "text-gray-400"
                                    }`}>
                                    {log.marketSignal || "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
