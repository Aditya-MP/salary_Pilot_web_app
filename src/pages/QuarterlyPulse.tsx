import { useAppStore } from '../store/useAppStore';
import { Calendar, Zap, Clock, Target } from 'lucide-react';
import { useState } from 'react';

export default function QuarterlyPulse() {
  const { pulse, salary, split, advancePulse, marketTrend } = useAppStore();
  const [showExecutePopup, setShowExecutePopup] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [showMonthPopup, setShowMonthPopup] = useState(false);
  const monthlyInvestment = salary ? (salary * split.investments) / 100 : 0;

  const handleAdvanceMonth = () => { advancePulse(monthlyInvestment); setShowMonthPopup(true); setTimeout(() => setShowMonthPopup(false), 2000); };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 p-6 lg:p-8 shadow-lg shadow-blue-500/10">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1"><Clock className="text-white/70" size={16} /><span className="text-blue-200 text-xs font-semibold tracking-wider uppercase">3-Month Strategy</span></div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Quarterly Pulse</h1>
          <p className="text-blue-200/70 mt-1 text-sm">Staged wealth accumulation strategy</p>
        </div>
      </div>

      {/* Status */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex justify-between items-center">
          <div><p className="text-xs text-slate-500">Status</p><p className="text-xl font-bold text-white capitalize">{pulse.state}</p></div>
          <div className="text-right"><p className="text-xs text-slate-500">Progress</p><p className="text-xl font-bold text-blue-400">{pulse.currentMonth} / 3</p></div>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map(m => (
              <div key={m} className={`p-4 rounded-xl border-2 text-center transition-all ${pulse.currentMonth >= m ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/[0.02] border-white/[0.06]'}`}>
                <Calendar className={`mx-auto mb-2 ${pulse.currentMonth >= m ? 'text-blue-400' : 'text-slate-600'}`} size={22} />
                <p className={`font-semibold text-sm ${pulse.currentMonth >= m ? 'text-white' : 'text-slate-600'}`}>Month {m}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{m < 3 ? 'Accumulate' : 'Execute'}</p>
              </div>
            ))}
          </div>
          <div className="bg-white/[0.03] rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-slate-400">Staged Capital</span><span className="font-bold text-white">₹{pulse.stagedCapital.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-400">Monthly Contribution</span><span className="font-semibold text-blue-400">₹{monthlyInvestment.toLocaleString()}</span></div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center"><Target className="text-violet-400" size={14} /></div>
          <h3 className="text-white font-semibold">How It Works</h3>
        </div>
        <div className="p-5 space-y-3">
          {[
            { num: '01', text: 'Month 1 & 2: Capital accumulates in low-risk staging pool', clr: 'bg-blue-500' },
            { num: '02', text: 'Month 3: AI analyzes market and executes bulk investment', clr: 'bg-emerald-500' },
            { num: '03', text: 'Benefits: Lower fees, reduced emotional trading, optimal timing', clr: 'bg-violet-500' },
          ].map(i => (
            <div key={i.num} className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-lg ${i.clr} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>{i.num}</div>
              <p className="text-sm text-slate-400 pt-0.5">{i.text}</p>
            </div>
          ))}
        </div>
      </div>

      {pulse.state !== 'strike' ? (
        <button onClick={handleAdvanceMonth} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all text-sm">Advance to Month {pulse.currentMonth + 1}</button>
      ) : (
        <button onClick={() => setShowExecutePopup(true)} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all text-sm">Execute Bulk Investment</button>
      )}

      {showExecutePopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowExecutePopup(false)}>
          <div className="bg-[#1e293b] rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-white mb-4">Execute Investment</h3>
            <div className="space-y-3 mb-6 text-sm text-slate-400">
              <div className="flex justify-between"><span>Staged Capital:</span><span className="font-semibold text-white">₹{pulse.stagedCapital.toLocaleString()}</span></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowExecutePopup(false)} className="flex-1 px-4 py-3 bg-white/5 text-slate-300 rounded-xl font-semibold hover:bg-white/10 transition-all text-sm">Cancel</button>
              <button onClick={() => { setExecuted(true); setShowExecutePopup(false); setTimeout(() => setExecuted(false), 3000); }} className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {showMonthPopup && <div className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-4 rounded-xl shadow-lg text-sm">✓ Month {pulse.currentMonth} added</div>}
      {executed && <div className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-xl shadow-lg text-sm">✓ Investment executed</div>}
    </div>
  );
}
