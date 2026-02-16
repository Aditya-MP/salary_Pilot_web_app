import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { DollarSign, Sparkles, Sliders, Shield, TrendingUp, Coins, Wallet, ArrowRight } from 'lucide-react';

export default function SalarySplitting() {
  const { salary, risk, split, setSplit, setSalary, setRisk } = useAppStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'ai' | 'manual'>('ai');
  const [localSalary, setLocalSalary] = useState(salary || 100000);


  // profiles map to store keys: needs, wants, investments
  const profiles: Record<string, { needs: number; wants: number; investments: number }> = {
    conservative: { investments: 20, needs: 50, wants: 30 },
    balanced: { investments: 35, needs: 35, wants: 30 },
    aggressive: { investments: 50, needs: 25, wants: 25 },
  };

  const currentProfile = (risk && profiles[risk]) ? profiles[risk] : profiles.balanced;

  const handleApplyAI = () => {
    setSalary(localSalary);
    setSplit(currentProfile);
    navigate('/dashboard/triple-guard');
  };

  const handleManualChange = (key: 'investments' | 'needs' | 'wants', val: number) => {
    const remainder = 100 - val;
    const half = Math.round(remainder / 2);
    const rest = remainder - half;
    let newSplit = { ...split };
    newSplit[key] = val;
    if (key === 'investments') { newSplit.needs = half; newSplit.wants = rest; }
    else if (key === 'needs') { newSplit.investments = half; newSplit.wants = rest; }
    else { newSplit.investments = half; newSplit.needs = rest; }
    setSplit(newSplit);
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-6 lg:p-8 shadow-lg shadow-blue-500/10">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1"><DollarSign className="text-white/70" size={16} /><span className="text-blue-200 text-xs font-semibold tracking-wider uppercase">AI Allocation</span></div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Salary Splitting</h1>
          <p className="text-blue-200/70 mt-1 text-sm">Optimize your income distribution</p>
        </div>
      </div>

      {/* Salary Input */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center"><Wallet className="text-blue-400" size={14} /></div>
          <h2 className="text-white font-semibold">Monthly Salary</h2>
        </div>
        <div className="p-6">
          <input type="number" value={localSalary} onChange={(e) => setLocalSalary(Number(e.target.value))}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20 placeholder-slate-600" placeholder="Enter salary" />
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 gap-1">
        <button onClick={() => setMode('ai')} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${mode === 'ai' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25' : 'text-slate-400 hover:text-white'}`}>
          <Sparkles size={16} /> AI Mode
        </button>
        <button onClick={() => setMode('manual')} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${mode === 'manual' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:text-white'}`}>
          <Sliders size={16} /> Manual
        </button>
      </div>

      {mode === 'ai' ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center"><Shield className="text-purple-400" size={14} /></div>
              <h2 className="text-white font-semibold">Risk Profile: <span className="capitalize text-emerald-400">{risk}</span></h2>
            </div>
            <div className="p-5 grid grid-cols-3 gap-3">
              {[
                { k: 'conservative' as const, emoji: '🛡️', desc: 'Safety first' },
                { k: 'balanced' as const, emoji: '⚖️', desc: 'Best of both' },
                { k: 'aggressive' as const, emoji: '⚡', desc: 'Max growth' },
              ].map(p => (
                <div key={p.k} onClick={() => setRisk(p.k)} className={`text-center p-4 rounded-xl border-2 transition-all cursor-pointer ${risk === p.k ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'}`}>
                  <div className="text-3xl mb-2">{p.emoji}</div>
                  <p className="text-white font-semibold text-sm capitalize">{p.k}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Allocation Bars */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center"><TrendingUp className="text-emerald-400" size={14} /></div>
              <h2 className="text-white font-semibold">AI-Recommended Split</h2>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: 'Investments', value: currentProfile.investments, clr: 'from-emerald-500 to-teal-500', amount: localSalary * currentProfile.investments / 100 },
                { label: 'Needs', value: currentProfile.needs, clr: 'from-blue-500 to-indigo-500', amount: localSalary * currentProfile.needs / 100 },
                { label: 'Wants', value: currentProfile.wants, clr: 'from-purple-500 to-violet-500', amount: localSalary * currentProfile.wants / 100 },
              ].map(b => (
                <div key={b.label}>
                  <div className="flex justify-between mb-1.5"><span className="text-sm text-slate-300 font-medium">{b.label}</span><span className="text-sm text-white font-bold">{b.value}% <span className="text-slate-500 font-normal">· ₹{b.amount.toLocaleString()}</span></span></div>
                  <div className="h-3 bg-white/[0.05] rounded-full overflow-hidden"><div className={`h-full bg-gradient-to-r ${b.clr} rounded-full`} style={{ width: `${b.value}%` }} /></div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleApplyAI} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all text-sm flex items-center justify-center gap-2">
            Approve Investment → Triple Guard <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center"><Sliders className="text-blue-400" size={14} /></div>
            <h2 className="text-white font-semibold">Manual Allocation</h2>
          </div>
          <div className="p-5 space-y-5">
            {[
              { key: 'investments' as const, label: 'Investments', clr: 'accent-emerald-500' },
              { key: 'needs' as const, label: 'Needs', clr: 'accent-blue-500' },
              { key: 'wants' as const, label: 'Wants', clr: 'accent-purple-500' },
            ].map(s => (
              <div key={s.key}>
                <div className="flex justify-between mb-1.5"><span className="text-sm text-slate-300">{s.label}</span><span className="text-sm text-white font-bold">{split[s.key]}%</span></div>
                <input type="range" min="0" max="100" value={split[s.key]} onChange={(e) => handleManualChange(s.key, Number(e.target.value))} className={`w-full ${s.clr} bg-white/10`} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Asset Cards */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center"><Coins className="text-cyan-400" size={14} /></div>
          <h2 className="text-white font-semibold">Where Your Money Goes</h2>
        </div>
        <div className="p-4 grid grid-cols-3 gap-3">
          {[
            { name: 'Equities', emoji: '📈', value: `₹${(localSalary * (split.investments || 0) / 100 * 0.4).toFixed(0)}`, color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
            { name: 'Crypto', emoji: '₿', value: `₹${(localSalary * (split.investments || 0) / 100 * 0.25).toFixed(0)}`, color: 'bg-purple-500/10 border-purple-500/20 text-purple-400' },
            { name: 'ESG', emoji: '🌱', value: `₹${(localSalary * (split.investments || 0) / 100 * 0.2).toFixed(0)}`, color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
          ].map(a => (
            <div key={a.name} className={`${a.color} border rounded-xl p-4 text-center`}>
              <div className="text-2xl mb-2">{a.emoji}</div>
              <p className="font-bold text-sm text-white">{a.name}</p>
              <p className="text-xs mt-1 font-medium">{a.value}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
