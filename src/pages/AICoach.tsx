import { Bot, Scale, AlertTriangle, FileText, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function AICoach() {
  const [showPopup, setShowPopup] = useState(false);
  const [applied, setApplied] = useState(false);
  const agents: Array<{
    name: string;
    icon: any;
    description: string;
    color: 'blue' | 'yellow' | 'purple' | 'green';
    insights: string[];
  }> = [
    {
      name: 'Tax Expert Agent',
      icon: Scale,
      description: 'Legal tax optimization suggestions',
      color: 'blue',
      insights: [
        'Consider ELSS funds for 80C deduction',
        'Long-term capital gains tax optimization available',
        'Tax-loss harvesting opportunity in crypto holdings',
      ],
    },
    {
      name: 'Risk Alert Agent',
      icon: AlertTriangle,
      description: 'Monitor potential volatility',
      color: 'yellow',
      insights: [
        'Tech sector showing increased volatility',
        'Crypto market entering correction phase',
        'Consider rebalancing to reduce risk exposure',
      ],
    },
    {
      name: 'Market Rules Agent',
      icon: FileText,
      description: 'Regulatory change summaries',
      color: 'purple',
      insights: [
        'New SEBI guidelines for mutual funds',
        'Updated KYC requirements effective next month',
        'Crypto taxation framework clarified',
      ],
    },
    {
      name: 'Portfolio Planner',
      icon: TrendingUp,
      description: 'Next-month strategy recommendations',
      color: 'green',
      insights: [
        'Increase ESG allocation by 5% for better sustainability score',
        'Market signals suggest strong entry point next month',
        'Projected 1-2 year growth: 18-22% CAGR',
      ],
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">AI Coach Agents</h1>
        <p className="text-gray-400 mt-1">Advanced assistance for smarter decisions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent, i) => (
          <AgentCard key={i} {...agent} />
        ))}
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Next Month Recommendation</h2>
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <TrendingUp className="text-green-400" size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">Optimized Allocation Strategy</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Increase equity exposure to 45% (from 40%)</p>
                <p>• Reduce crypto to 20% (from 25%) due to volatility</p>
                <p>• Boost ESG to 25% (from 20%) for sustainability multiplier</p>
                <p>• Maintain liquid funds at 10%</p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-gray-400">Projected Growth (1-2 years)</p>
                <p className="text-2xl font-bold text-green-400 mt-1">18-22% CAGR</p>
              </div>
              <button 
                onClick={() => setShowPopup(true)}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-all">
                Apply Recommendation
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowPopup(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Confirm Strategy</h3>
            <div className="space-y-3 mb-6 text-sm text-gray-700">
              <div className="flex justify-between"><span>Equity:</span><span className="font-semibold">45%</span></div>
              <div className="flex justify-between"><span>Crypto:</span><span className="font-semibold">20%</span></div>
              <div className="flex justify-between"><span>ESG:</span><span className="font-semibold">25%</span></div>
              <div className="flex justify-between"><span>Liquid:</span><span className="font-semibold">10%</span></div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between"><span>AI Confidence:</span><span className="font-semibold text-green-600">87%</span></div>
                <div className="flex justify-between"><span>Risk Level:</span><span className="font-semibold">Moderate</span></div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowPopup(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all">
                Cancel
              </button>
              <button 
                onClick={() => {
                  setApplied(true);
                  setShowPopup(false);
                  setTimeout(() => setApplied(false), 3000);
                }}
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {applied && (
        <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg animate-fade-in-up">
          ✓ Strategy applied for next month
        </div>
      )}

      <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">AI Processing Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="font-semibold text-blue-400 mb-2">Cloud-Side Processing</p>
            <p>Heavy market analysis, trend detection, and fundamental research executed on cloud infrastructure</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="font-semibold text-green-400 mb-2">Local Decision Control</p>
            <p>Final approval and execution permissions remain with user, ensuring data sovereignty</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentCard({ name, icon: Icon, description, color, insights }: { name: string; icon: any; description: string; color: 'blue' | 'yellow' | 'purple' | 'green'; insights: string[] }) {
  const colors = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
  };

  const iconColors = {
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} backdrop-blur-xl border rounded-xl p-6`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-white/10 p-3 rounded-lg">
          <Icon className={iconColors[color]} size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
      <div className="space-y-2">
        {insights.map((insight: string, i: number) => (
          <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
            <Bot className={`${iconColors[color]} flex-shrink-0 mt-0.5`} size={16} />
            <p>{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
