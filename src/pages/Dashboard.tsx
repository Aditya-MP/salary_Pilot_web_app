import { useAppStore } from '../store/useAppStore';
import { TrendingUp, Shield, Leaf, Calendar, Wallet, Activity, Sparkles, ChevronRight, BarChart3, Target, Flame, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, AreaChart, Area, CartesianGrid } from 'recharts';
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
    { month: 'Jan', profit: 150, cumulative: 150 },
    { month: 'Feb', profit: 280, cumulative: 430 },
    { month: 'Mar', profit: -120, cumulative: 310 },
    { month: 'Apr', profit: 420, cumulative: 730 },
    { month: 'May', profit: 180, cumulative: 910 },
    { month: 'Jun', profit: 650, cumulative: 1560 },
    { month: 'Jul', profit: -80, cumulative: 1480 },
    { month: 'Aug', profit: 320, cumulative: 1800 },
    { month: 'Sep', profit: 510, cumulative: 2310 },
    { month: 'Oct', profit: -200, cumulative: 2110 },
    { month: 'Nov', profit: 380, cumulative: 2490 },
    { month: 'Dec', profit: 720, cumulative: 3210 },
  ];
  const totalReturn = performanceData.reduce((s, d) => s + d.profit, 0);
  const bestMonth = performanceData.reduce((best, d) => d.profit > best.profit ? d : best, performanceData[0]);
  const avgMonthly = Math.round(totalReturn / performanceData.length);
  const winRate = Math.round((performanceData.filter(d => d.profit > 0).length / performanceData.length) * 100);

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
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20"><BarChart3 className="text-white" size={14} /></div>
              <div>
                <h2 className="text-white font-semibold">Asset Allocation</h2>
                <p className="text-[10px] text-slate-500">Portfolio distribution</p>
              </div>
            </div>
            <Link to="/dashboard/portfolio" className="text-[10px] text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors">
              View All <ChevronRight size={12} />
            </Link>
          </div>
          <div className="p-6">
            {totalPortfolio > 0 ? (
              <div className="flex flex-col items-center gap-5">
                {/* Donut with center stats */}
                <div className="relative w-[200px] h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={portfolioData} cx="50%" cy="50%" outerRadius={85} innerRadius={55} dataKey="value" strokeWidth={0} startAngle={90} endAngle={-270}>
                        {portfolioData.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} formatter={(v: number | undefined) => [`₹${(v ?? 0).toLocaleString()}`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">Total</p>
                    <p className="text-lg font-bold text-white">₹{totalPortfolio.toLocaleString()}</p>
                    <p className="text-[10px] text-emerald-400 font-medium">+12.5%</p>
                  </div>
                </div>

                {/* Per-asset detail rows */}
                <div className="w-full space-y-2.5">
                  {[
                    { name: 'Indian Equities', value: holdings.equity, color: '#3b82f6', dotClass: 'bg-blue-500', iconBg: 'bg-blue-500/15 text-blue-400 border-blue-500/20', change: '+8.2%', changeUp: true },
                    { name: 'Crypto Assets', value: holdings.crypto, color: '#8b5cf6', dotClass: 'bg-purple-500', iconBg: 'bg-purple-500/15 text-purple-400 border-purple-500/20', change: '+18.7%', changeUp: true },
                    { name: 'ESG Funds', value: holdings.esg, color: '#10b981', dotClass: 'bg-emerald-500', iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20', change: '+4.1%', changeUp: true },
                  ].map(asset => {
                    const pct = totalPortfolio > 0 ? ((asset.value / totalPortfolio) * 100) : 0;
                    return (
                      <div key={asset.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-all group">
                        {/* Color dot icon */}
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center border flex-shrink-0 ${asset.iconBg}`}>
                          <div className={`w-3 h-3 rounded-full ${asset.dotClass}`} />
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-white font-semibold">{asset.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-500">{pct.toFixed(1)}%</span>
                              <span className="text-xs text-white font-bold">₹{asset.value.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: asset.color }} />
                            </div>
                            <span className={`text-[10px] font-semibold ${asset.changeUp ? 'text-emerald-400' : 'text-red-400'}`}>{asset.change}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : <div className="h-56 flex flex-col items-center justify-center text-slate-500"><Target className="mb-2 text-slate-600" size={32} /><p className="text-sm">No investments yet.</p></div>}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20"><TrendingUp className="text-white" size={14} /></div>
              <div>
                <h2 className="text-white font-semibold">Performance Trend</h2>
                <p className="text-[10px] text-slate-500">12-month returns overview</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <TrendingUp size={12} className="text-emerald-400" />
              <span className="text-[11px] text-emerald-400 font-bold">+₹{totalReturn.toLocaleString()}</span>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 border-b border-white/[0.06]">
            {[
              { label: 'Total Return', value: `₹${totalReturn.toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-400' },
              { label: 'Best Month', value: `${bestMonth.month} (₹${bestMonth.profit})`, icon: Trophy, color: 'text-amber-400' },
              { label: 'Avg Monthly', value: `₹${avgMonthly.toLocaleString()}`, icon: Flame, color: 'text-orange-400' },
              { label: 'Win Rate', value: `${winRate}%`, icon: Target, color: 'text-cyan-400' },
            ].map(stat => (
              <div key={stat.label} className="px-4 py-3 border-r border-white/[0.04] last:border-r-0 hover:bg-white/[0.02] transition-all">
                <div className="flex items-center gap-1.5 mb-1">
                  <stat.icon size={11} className={stat.color} />
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider">{stat.label}</span>
                </div>
                <p className="text-xs text-white font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Chart Area */}
          <div className="p-6 pb-4">
            {/* Area Chart — Cumulative Growth */}
            <div className="mb-5">
              <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">Cumulative Growth</p>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="perfGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} formatter={(v: number | undefined) => [`₹${(v ?? 0).toLocaleString()}`, 'Growth']} />
                  <Area type="monotone" dataKey="cumulative" stroke="#10b981" strokeWidth={2} fill="url(#perfGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart — Monthly P&L */}
            <div>
              <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">Monthly P&L</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={performanceData} barSize={14} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} formatter={(v: number | undefined) => [`₹${(v ?? 0).toLocaleString()}`, 'P&L']} />
                  <Bar dataKey="profit" radius={[6, 6, 0, 0]}>{performanceData.map((e, i) => <Cell key={i} fill={e.profit >= 0 ? '#10b981' : '#ef4444'} />)}</Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
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
