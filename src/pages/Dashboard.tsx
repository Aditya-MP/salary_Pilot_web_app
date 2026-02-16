import { useAppStore } from '../store/useAppStore';
import { TrendingUp, Shield, Leaf, Calendar, ArrowRight, Wallet, Activity, Sparkles, ChevronRight, BarChart3, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { useLivePrices, calculatePortfolioValue } from '../hooks/useLivePrices';

export default function Dashboard() {
  const { holdings, streakCount, pulse, decisionLog } = useAppStore();
  const { prices } = useLivePrices();
  const totalPortfolio = calculatePortfolioValue(holdings, prices);
  const sustainabilityScore = Math.min(100, streakCount * 5 + (holdings.esg / totalPortfolio) * 50);

  const portfolioData = [
    { name: 'Equity', value: holdings.equity, color: '#3b82f6' },
    { name: 'Crypto', value: holdings.crypto, color: '#8b5cf6' },
    { name: 'ESG', value: holdings.esg, color: '#10b981' },
  ];
  const performanceData = [
    { month: 'Jan', profit: 150 }, { month: 'Feb', profit: 280 }, { month: 'Mar', profit: -120 },
    { month: 'Apr', profit: 420 }, { month: 'May', profit: 180 }, { month: 'Jun', profit: 650 },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 lg:p-8 shadow-lg shadow-emerald-500/10">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1"><Activity className="text-white/70" size={16} /><span className="text-emerald-100 text-xs font-semibold tracking-wider uppercase">Live Dashboard</span></div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Financial Control Center</h1>
          <p className="text-emerald-100/70 mt-1 text-sm">Your intelligent investment autopilot</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={TrendingUp} label="Total Portfolio" value={`₹${totalPortfolio.toLocaleString()}`} color="blue" trend="+12.5%" />
        <MetricCard icon={Shield} label="Discipline Streak" value={`${streakCount} months`} color="purple" trend="Active" />
        <MetricCard icon={Leaf} label="Sustainability" value={`${sustainabilityScore.toFixed(0)}%`} color="green" trend="+5%" />
        <MetricCard icon={Calendar} label="Pulse Status" value={`Month ${pulse.currentMonth}/3`} color="cyan" trend={pulse.state} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center"><BarChart3 className="text-blue-400" size={14} /></div>
            <h2 className="text-white font-semibold">Asset Allocation</h2>
          </div>
          <div className="p-6">
            {totalPortfolio > 0 ? (
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart><Pie data={portfolioData} cx="50%" cy="50%" outerRadius={75} innerRadius={45} dataKey="value" strokeWidth={0}>{portfolioData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} /></PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-5">{[{ l: 'Equity', c: 'bg-blue-500' }, { l: 'Crypto', c: 'bg-purple-500' }, { l: 'ESG', c: 'bg-emerald-500' }].map(i => <div key={i.l} className="flex items-center gap-2"><div className={`w-2.5 h-2.5 rounded-full ${i.c}`} /><span className="text-xs text-slate-400">{i.l}</span></div>)}</div>
              </div>
            ) : <div className="h-56 flex flex-col items-center justify-center text-slate-500"><Target className="mb-2 text-slate-600" size={32} /><p className="text-sm">No investments yet.</p></div>}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center"><TrendingUp className="text-emerald-400" size={14} /></div>
            <h2 className="text-white font-semibold">Performance Trend</h2>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={performanceData}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="profit" radius={[8, 8, 0, 0]}>{performanceData.map((e, i) => <Cell key={i} fill={e.profit >= 0 ? '#10b981' : '#ef4444'} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center"><Sparkles className="text-amber-400" size={14} /></div>
          <h2 className="text-white font-semibold">Quick Actions</h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <ActionCard to="/dashboard/salary-splitting" label="Split Salary" desc="Configure allocation" icon={DollarSign} color="from-blue-500 to-cyan-500" />
          <ActionCard to="/dashboard/triple-guard" label="Approve Investment" desc="Triple Guard check" icon={Shield} color="from-emerald-500 to-teal-500" />
          <ActionCard to="/dashboard/quarterly-pulse" label="Quarterly Pulse" desc="3-month strategy" icon={TrendingUp} color="from-purple-500 to-violet-500" />
        </div>
      </div>

      {/* Holdings */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center"><Wallet className="text-blue-400" size={14} /></div>
          <h2 className="text-white font-semibold">Investment Holdings</h2>
        </div>
        <div className="p-4">
          {totalPortfolio > 0 ? (
            <div className="grid md:grid-cols-3 gap-3">
              <HoldingCard title="Indian Equities" color="blue" items={[{ n: 'Reliance', v: holdings.equity * 0.3 }, { n: 'TCS', v: holdings.equity * 0.25 }, { n: 'HDFC Bank', v: holdings.equity * 0.25 }, { n: 'Infosys', v: holdings.equity * 0.2 }]} />
              <HoldingCard title="Crypto Assets" color="purple" items={[{ n: 'Bitcoin', v: holdings.crypto * 0.6 }, { n: 'Ethereum', v: holdings.crypto * 0.4 }]} />
              <HoldingCard title="ESG Funds" color="green" items={[{ n: 'Nifty ESG Index', v: holdings.esg * 0.5 }, { n: 'Green Bonds', v: holdings.esg * 0.5 }]} />
            </div>
          ) : <p className="text-slate-500 text-center py-8 text-sm">No holdings yet.</p>}
        </div>
      </div>

      {/* Decisions */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center"><Shield className="text-violet-400" size={14} /></div>
          <h2 className="text-white font-semibold">Recent Decisions</h2>
        </div>
        <div className="p-4">
          {decisionLog.length > 0 ? <div className="space-y-2">{decisionLog.slice(0, 5).map((log, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">{i + 1}</div>
                <div><span className="text-sm text-slate-300">{log.timestamp}</span><span className="ml-3 text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium">{log.emotion}</span></div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400">{log.result}</span>
            </div>
          ))}</div> : <p className="text-slate-500 text-sm text-center py-6">No decisions logged yet.</p>}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, color, trend }: { icon: any; label: string; value: string; color: string; trend: string }) {
  const c: Record<string, { bg: string; icon: string; text: string }> = {
    blue: { bg: 'bg-blue-500/10', icon: 'from-blue-500 to-blue-600', text: 'text-blue-400' },
    purple: { bg: 'bg-purple-500/10', icon: 'from-purple-500 to-violet-600', text: 'text-purple-400' },
    green: { bg: 'bg-emerald-500/10', icon: 'from-emerald-500 to-green-600', text: 'text-emerald-400' },
    cyan: { bg: 'bg-cyan-500/10', icon: 'from-cyan-500 to-blue-500', text: 'text-cyan-400' },
  };
  const cfg = c[color] || c.blue;
  return (
    <div className={`rounded-2xl ${cfg.bg} border border-white/[0.06] p-5 hover:bg-white/[0.05] transition-all`}>
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cfg.icon} flex items-center justify-center mb-3 shadow-lg`}><Icon className="text-white" size={18} /></div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-xl font-bold text-white mt-0.5">{value}</p>
      <p className={`text-xs ${cfg.text} font-medium mt-1`}>{trend}</p>
    </div>
  );
}

function ActionCard({ to, label, desc, icon: Icon, color }: { to: string; label: string; desc: string; icon: any; color: string }) {
  return (
    <Link to={to} className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-emerald-500/20 transition-all">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}><Icon className="text-white" size={18} /></div>
      <div className="flex-1"><p className="text-white font-semibold text-sm">{label}</p><p className="text-xs text-slate-500">{desc}</p></div>
      <ChevronRight className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" size={18} />
    </Link>
  );
}

function HoldingCard({ title, color, items }: { title: string; color: string; items: { n: string; v: number }[] }) {
  const cfg: Record<string, { text: string; dot: string }> = { blue: { text: 'text-blue-400', dot: 'bg-blue-500' }, purple: { text: 'text-purple-400', dot: 'bg-purple-500' }, green: { text: 'text-emerald-400', dot: 'bg-emerald-500' } };
  const c = cfg[color] || cfg.blue;
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
      <p className={`text-sm ${c.text} font-semibold mb-3`}>{title}</p>
      <div className="space-y-2">{items.map(i => <div key={i.n} className="flex items-center justify-between text-xs"><div className="flex items-center gap-2"><div className={`w-1.5 h-1.5 rounded-full ${c.dot}`} /><span className="text-slate-400">{i.n}</span></div><span className="font-semibold text-white">₹{i.v.toFixed(0)}</span></div>)}</div>
    </div>
  );
}

function DollarSign(props: any) {
  return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}
