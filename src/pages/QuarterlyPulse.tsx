import { useAppStore } from '../store/useAppStore';
import { Calendar, Clock, Target, Shield, TrendingUp, Landmark, Leaf, Bitcoin, IndianRupee } from 'lucide-react';
import { useState } from 'react';

export default function QuarterlyPulse() {
  const { pulse, salary, split, advancePulse } = useAppStore();
  const [showExecutePopup, setShowExecutePopup] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [showMonthPopup, setShowMonthPopup] = useState(false);
  const monthlyInvestment = salary ? (salary * split.investments) / 100 : 0;

  const capital = pulse.stagedCapital;
  // Tax-aware allocation breakdown
  const taxAllocations = [
    { label: 'ELSS Mutual Funds', pct: 0.25, icon: Shield, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/20', taxNote: 'Sec 80C · ₹1.5L deduction · 3yr lock-in', taxSaving: true },
    { label: 'PPF Contribution', pct: 0.15, icon: Landmark, color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20', taxNote: 'Sec 80C · Tax-free returns · EEE status', taxSaving: true },
    { label: 'Large Cap Equities', pct: 0.25, icon: TrendingUp, color: 'text-cyan-400', bgColor: 'bg-cyan-500/10', borderColor: 'border-cyan-500/20', taxNote: 'LTCG > ₹1.25L taxed @ 12.5%', taxSaving: false },
    { label: 'ESG / Green Bonds', pct: 0.15, icon: Leaf, color: 'text-lime-400', bgColor: 'bg-lime-500/10', borderColor: 'border-lime-500/20', taxNote: 'Sec 54EC eligible · Indexed gains', taxSaving: true },
    { label: 'Crypto (BTC/ETH)', pct: 0.10, icon: Bitcoin, color: 'text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/20', taxNote: 'Flat 30% tax · 1% TDS on transfer', taxSaving: false },
    { label: 'NPS Tier-I', pct: 0.10, icon: IndianRupee, color: 'text-violet-400', bgColor: 'bg-violet-500/10', borderColor: 'border-violet-500/20', taxNote: 'Sec 80CCD(1B) · Extra ₹50K deduction', taxSaving: true },
  ];

  const totalTaxSavable = taxAllocations.filter(a => a.taxSaving).reduce((s, a) => s + capital * a.pct, 0);
  const estimatedTaxSaved = Math.round(totalTaxSavable * 0.312); // ~31.2% effective bracket

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

      {/* ── Execute Investment Modal with Tax Awareness ── */}
      {showExecutePopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowExecutePopup(false)}>
          <div className="bg-[#0f172a] rounded-2xl max-w-lg w-full mx-4 shadow-2xl border border-white/10 overflow-hidden" onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center"><Shield className="text-emerald-400" size={16} /></div>
                <div>
                  <h3 className="text-xl font-bold text-white">Execute Investment</h3>
                  <p className="text-[11px] text-slate-500">Tax-optimized allocation by AI</p>
                </div>
              </div>
            </div>

            {/* Capital summary */}
            <div className="px-6 py-3 bg-white/[0.02] border-b border-white/[0.06] flex justify-between items-center">
              <span className="text-sm text-slate-400">Staged Capital</span>
              <span className="text-lg font-bold text-white">₹{capital.toLocaleString()}</span>
            </div>

            {/* Tax-Aware Allocation Breakdown */}
            <div className="px-6 py-4 space-y-2.5 max-h-[340px] overflow-y-auto">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Where your money goes</p>
              {taxAllocations.map((item) => {
                const Icon = item.icon;
                const amount = capital * item.pct;
                return (
                  <div key={item.label} className={`${item.bgColor} border ${item.borderColor} rounded-xl p-3 flex items-start gap-3 transition-all hover:scale-[1.01]`}>
                    <div className="flex-shrink-0 mt-0.5">
                      <Icon className={item.color} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-white truncate">{item.label}</span>
                        <span className="text-sm font-bold text-white ml-2">₹{amount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {item.taxSaving && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">TAX SAVER</span>
                        )}
                        <span className="text-[10px] text-slate-500">{item.taxNote}</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 font-mono flex-shrink-0">{(item.pct * 100).toFixed(0)}%</span>
                  </div>
                );
              })}
            </div>

            {/* Tax savings summary */}
            <div className="mx-6 mb-4 mt-1 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-emerald-400/70 uppercase tracking-wider font-semibold">Estimated Tax Saved</p>
                  <p className="text-xs text-slate-400 mt-0.5">Under Sec 80C, 80CCD & LTCG rules</p>
                </div>
                <p className="text-xl font-bold text-emerald-400">₹{estimatedTaxSaved.toLocaleString()}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button onClick={() => setShowExecutePopup(false)} className="flex-1 px-4 py-3 bg-white/5 text-slate-300 rounded-xl font-semibold hover:bg-white/10 transition-all text-sm border border-white/[0.06]">Cancel</button>
              <button onClick={() => { setExecuted(true); setShowExecutePopup(false); setTimeout(() => setExecuted(false), 3000); }} className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all text-sm">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {showMonthPopup && <div className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-4 rounded-xl shadow-lg text-sm">✓ Month {pulse.currentMonth} added</div>}
      {executed && <div className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-xl shadow-lg text-sm">✓ Investment executed</div>}
    </div>
  );
}
