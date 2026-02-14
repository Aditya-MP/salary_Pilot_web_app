

export function LearningHub() {
    return (
        <div className="animate-fade">
            <h1 className="text-3xl font-bold mb-8">
                Learning Hub
            </h1>

            <div className="space-y-6">

                <Section
                    title="What is Quarterly Pulse?"
                    content="Quarterly Pulse stages your salary for 90 days before bulk execution. This reduces decision fatigue and improves capital efficiency by lowering transaction frequency."
                />

                <Section
                    title="Why 15-Second Cooldown?"
                    content="High emotional momentum (FOMO or stress) increases regret trades. A short enforced pause introduces behavioral friction without removing user control."
                />

                <Section
                    title="Tax-Aware Investing"
                    content="Before execution, Salary Pilot estimates post-tax returns using rule-based calculations. This improves transparency and reduces regulatory anxiety."
                />

                <Section
                    title="Sustainability Multiplier"
                    content="Each completed Pulse cycle increases your sustainability multiplier. Discipline compounds environmental impact over time."
                />

                <Section
                    title="Market Confidence Score"
                    content="Our AI Market Engine evaluates volatility and trend stability to recommend strong, moderate, or weak entry signals."
                />

            </div>
        </div>
    );
}

function Section({
    title,
    content,
}: {
    title: string;
    content: string;
}) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition duration-200">
            <h2 className="font-semibold text-lg mb-2 text-gray-800">
                {title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
                {content}
            </p>
        </div>
    );
}
