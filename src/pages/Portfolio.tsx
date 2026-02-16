import { useAppStore } from '../store/useAppStore';
import { TrendingUp, TrendingDown, Briefcase, PieChart, BarChart3, Target } from 'lucide-react';
import { useLivePrices } from '../hooks/useLivePrices';

export default function Portfolio() {
  const { holdings, streakCount } = useAppStore();
  const { changes } = useLivePrices();

  const totalValue = holdings.equity + holdings.crypto + holdings.esg;
  const overallReturn = ((holdings.equity * changes.equity / 100) + (holdings.crypto * changes.crypto / 100) + (holdings.esg * changes.esg / 100)) / (totalValue || 1) * 100;

  const items: Array<{ name: string; value: number; change: number; color: string }> = [
    { name: 'Indian Equities', value: holdings.equity, change: changes.equity, color: 'blue' },
    { name: 'Crypto Assets', value: holdings.crypto, change: changes.crypto, color: 'purple' },
    { name: 'ESG Pools', value: holdings.esg, change: changes.esg, color: 'emerald' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 lg:p-8 shadow-lg shadow-emerald-500/10">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1"><Briefcase className="text-white/70" size={16} /><span className="text-emerald-200 text-xs font-semibold tracking-wider uppercase">Holdings</span></div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Portfolio</h1>
          <p className="text-emerald-200/70 mt-1 text-sm">Your investment holdings and performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={Briefcase} label="Total Portfolio" value={`₹${totalValue.toLocaleString()}`} color="blue" />
        <StatCard icon={TrendingUp} label="Overall Return" value={`${overallReturn >= 0 ? '+' : ''}${overallReturn.toFixed(1)}%`} color="green" />
        <StatCard icon={PieChart} label="Discipline Streak" value={`${streakCount} months`} color="purple" />
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center"><BarChart3 className="text-blue-400" size={14} /></div>
          <h2 className="text-white font-semibold">Holdings Breakdown</h2>
        </div>
        <div className="p-4 space-y-3">
          {items.map((item) => {
            const pct = totalValue > 0 ? (item.value / totalValue) * 100 : 0;
            const cfg: Record<string, { bar: string; bg: string }> = {
              blue: { bar: 'from-blue-500 to-indigo-500', bg: 'bg-blue-500/10 border-blue-500/20' },
              purple: { bar: 'from-purple-500 to-violet-500', bg: 'bg-purple-500/10 border-purple-500/20' },
              emerald: { bar: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            };
            const c = cfg[item.color] || cfg.blue;
            return (
              <div key={item.name} className={`${c.bg} border rounded-xl p-4`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold text-sm">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">₹{item.value.toLocaleString()}</span>
                    <span className={`text-xs flex items-center gap-0.5 font-medium ${item.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {item.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{Math.abs(item.change)}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${c.bar} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">{pct.toFixed(1)}% of portfolio</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center"><Target className="text-amber-400" size={14} /></div>
            <h3 className="text-white font-semibold">Risk Exposure</h3>
          </div>
          <div className="p-5 space-y-3">
            {[{ l: 'High Risk', p: 30, c: 'from-red-500 to-rose-500', b: 'bg-red-500/10' }, { l: 'Medium Risk', p: 45, c: 'from-amber-500 to-yellow-500', b: 'bg-amber-500/10' }, { l: 'Low Risk', p: 25, c: 'from-emerald-500 to-green-500', b: 'bg-emerald-500/10' }].map(r => (
              <div key={r.l}><div className="flex justify-between mb-1"><span className="text-sm text-slate-400">{r.l}</span><span className="text-sm text-white font-bold">{r.p}%</span></div><div className={`h-2.5 ${r.b} rounded-full overflow-hidden`}><div className={`h-full bg-gradient-to-r ${r.c} rounded-full`} style={{ width: `${r.p}%` }} /></div></div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center"><TrendingUp className="text-emerald-400" size={14} /></div>
            <h3 className="text-white font-semibold">Performance</h3>
          </div>
          <div className="p-5 space-y-2">
            {[{ l: '1 Month', v: '+5.2%' }, { l: '3 Month', v: '+12.8%' }, { l: '6 Month', v: '+18.5%' }, { l: 'YTD', v: '+15.2%' }].map(m => (
              <div key={m.l} className="flex justify-between items-center p-2 rounded-lg hover:bg-white/[0.03] transition-all"><span className="text-sm text-slate-400">{m.l}</span><span className="text-sm font-bold text-emerald-400">{m.v}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  const cfg: Record<string, { bg: string; grad: string }> = {
    blue: { bg: 'bg-blue-500/10', grad: 'from-blue-500 to-blue-600' },
    green: { bg: 'bg-emerald-500/10', grad: 'from-emerald-500 to-green-600' },
    purple: { bg: 'bg-purple-500/10', grad: 'from-purple-500 to-violet-600' },
  };
  const c = cfg[color] || cfg.blue;
  return (
    <div className={`${c.bg} border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-all`}>
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center mb-3 shadow-lg`}><Icon className="text-white" size={18} /></div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-xl font-bold text-white mt-0.5">{value}</p>
    </div>
  );
}
