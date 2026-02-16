import { Bot, Scale, AlertTriangle, FileText, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function AICoach() {
  const [showPopup, setShowPopup] = useState(false);
  const [applied, setApplied] = useState(false);
  const agents: Array<{ name: string; icon: any; description: string; color: string; insights: string[] }> = [
    { name: 'Tax Expert Agent', icon: Scale, description: 'Legal tax optimization suggestions', color: 'blue', insights: ['Consider ELSS funds for 80C deduction', 'Long-term capital gains tax optimization available', 'Tax-loss harvesting opportunity in crypto holdings'] },
    { name: 'Risk Alert Agent', icon: AlertTriangle, description: 'Monitor potential volatility', color: 'amber', insights: ['Tech sector showing increased volatility', 'Crypto market entering correction phase', 'Consider rebalancing to reduce risk exposure'] },
    { name: 'Market Rules Agent', icon: FileText, description: 'Regulatory change summaries', color: 'purple', insights: ['New SEBI guidelines for mutual funds', 'Updated KYC requirements effective next month', 'Crypto taxation framework clarified'] },
    { name: 'Portfolio Planner', icon: TrendingUp, description: 'Next-month strategy recommendations', color: 'emerald', insights: ['Increase ESG allocation by 5% for better sustainability score', 'Market signals suggest strong entry point next month', 'Projected 1-2 year growth: 18-22% CAGR'] },
  ];

  const iconCfg: Record<string, { bg: string; text: string; card: string }> = {
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', card: 'bg-blue-500/5 border-blue-500/10' },
    amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', card: 'bg-amber-500/5 border-amber-500/10' },
    purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', card: 'bg-purple-500/5 border-purple-500/10' },
    emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', card: 'bg-emerald-500/5 border-emerald-500/10' },
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-6 lg:p-8 shadow-lg shadow-purple-500/10">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1"><Bot className="text-white/70" size={16} /><span className="text-violet-200 text-xs font-semibold tracking-wider uppercase">AI Agents</span></div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">AI Coach Agents</h1>
          <p className="text-violet-200/70 mt-1 text-sm">Advanced assistance for smarter decisions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent, i) => {
          const c = iconCfg[agent.color] || iconCfg.blue;
          return (
            <div key={i} className={`${c.card} border rounded-2xl p-5`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`${c.bg} p-3 rounded-xl`}><agent.icon className={c.text} size={22} /></div>
                <div><h3 className="text-white font-semibold">{agent.name}</h3><p className="text-xs text-slate-500">{agent.description}</p></div>
              </div>
              <div className="space-y-2">
                {agent.insights.map((insight, j) => (
                  <div key={j} className="flex items-start gap-2 text-sm text-slate-400">
                    <Bot className={`${c.text} flex-shrink-0 mt-0.5`} size={14} />
                    <p>{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center"><TrendingUp className="text-emerald-400" size={14} /></div>
          <h2 className="text-white font-semibold">Next Month Recommendation</h2>
        </div>
        <div className="p-6">
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-500/20 p-3 rounded-xl"><TrendingUp className="text-emerald-400" size={28} /></div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Optimized Allocation Strategy</h3>
                <div className="space-y-1.5 text-sm text-slate-400">
                  <p>• Increase equity exposure to 45% (from 40%)</p>
                  <p>• Reduce crypto to 20% (from 25%) due to volatility</p>
                  <p>• Boost ESG to 25% (from 20%) for sustainability multiplier</p>
                  <p>• Maintain liquid funds at 10%</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <p className="text-sm text-slate-500">Projected Growth (1-2 years)</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">18-22% CAGR</p>
                </div>
                <button onClick={() => setShowPopup(true)} className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all text-sm">
                  Apply Recommendation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06]"><h2 className="text-white font-semibold">AI Processing Architecture</h2></div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4"><p className="font-semibold text-blue-400 mb-2 text-sm">Cloud-Side Processing</p><p className="text-sm text-slate-400">Heavy market analysis, trend detection, and fundamental research executed on cloud infrastructure</p></div>
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4"><p className="font-semibold text-emerald-400 mb-2 text-sm">Local Decision Control</p><p className="text-sm text-slate-400">Final approval and execution permissions remain with user, ensuring data sovereignty</p></div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowPopup(false)}>
          <div className="bg-[#1e293b] rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Strategy</h3>
            <div className="space-y-3 mb-6 text-sm text-slate-400">
              <div className="flex justify-between"><span>Equity:</span><span className="font-semibold text-white">45%</span></div>
              <div className="flex justify-between"><span>Crypto:</span><span className="font-semibold text-white">20%</span></div>
              <div className="flex justify-between"><span>ESG:</span><span className="font-semibold text-white">25%</span></div>
              <div className="flex justify-between"><span>Liquid:</span><span className="font-semibold text-white">10%</span></div>
              <div className="border-t border-white/10 pt-3 mt-3">
                <div className="flex justify-between"><span>AI Confidence:</span><span className="font-semibold text-emerald-400">87%</span></div>
                <div className="flex justify-between"><span>Risk Level:</span><span className="font-semibold text-white">Moderate</span></div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowPopup(false)} className="flex-1 px-4 py-3 bg-white/5 text-slate-300 rounded-xl font-semibold hover:bg-white/10 transition-all text-sm">Cancel</button>
              <button onClick={() => { setApplied(true); setShowPopup(false); setTimeout(() => setApplied(false), 3000); }} className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {applied && <div className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-xl shadow-lg text-sm">✓ Strategy applied for next month</div>}
    </div>
  );
}
