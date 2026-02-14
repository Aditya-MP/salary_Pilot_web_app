

export function ExecutedView({ onDashboard }: { onDashboard: () => void }) {
    return (
        <div className="min-h-full flex items-center justify-center bg-white rounded-2xl animate-fade p-10 shadow-sm border border-gray-100">
            <div className="text-center max-w-md">
                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-green-50 rounded-full">
                        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                </div>
                <h2 className="text-3xl font-bold mb-4 tracking-tight">
                    Investment Successful
                </h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Funds allocated strategically using <span className="font-semibold text-black">Quarterly Pulse</span> and behavioral safeguards.
                </p>

                <button
                    onClick={onDashboard}
                    className="group bg-black text-white font-medium tracking-wide px-8 py-4 rounded-xl hover:scale-[1.02] transition-all duration-150 shadow-lg hover:shadow-black/20 flex items-center gap-2 mx-auto"
                >
                    Return to Dashboard
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
            </div>
        </div>
    );
}
