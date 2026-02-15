import { useAppStore } from '../store/useAppStore';
import { TrendingUp, Shield, Leaf, Calendar, ArrowRight } from 'lucide-react';
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
    { month: 'Jan', value: 2500, profit: 150 },
    { month: 'Feb', value: 3200, profit: 280 },
    { month: 'Mar', value: 2800, profit: -120 },
    { month: 'Apr', value: 4100, profit: 420 },
    { month: 'May', value: 3900, profit: 180 },
    { month: 'Jun', value: 5200, profit: 650 },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy-900">Financial Control Center</h1>
        <p className="text-slate-500 mt-1">Your intelligent investment autopilot dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={TrendingUp} label="Total Portfolio" value={`₹${totalPortfolio.toLocaleString()}`} color="blue" />
        <MetricCard icon={Shield} label="Discipline Streak" value={`${streakCount} months`} color="purple" />
        <MetricCard icon={Leaf} label="Sustainability Score" value={`${sustainabilityScore.toFixed(0)}%`} color="green" />
        <MetricCard icon={Calendar} label="Pulse Status" value={`Month ${pulse.currentMonth}/3`} color="cyan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-navy-900 mb-4">Asset Allocation</h2>
          {totalPortfolio > 0 ? (
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={portfolioData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                    {portfolioData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-slate-600">Equity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm text-slate-600">Crypto</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-slate-600">ESG</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400">
              No investments yet. Start with Salary Splitting.
            </div>
          )}
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-navy-900 mb-4">Performance Trend</h2>
          {performanceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} labelStyle={{ color: '#0f172a' }} />
                <Bar dataKey="profit" radius={[8, 8, 0, 0]}>
                  {performanceData.map((entry, index) => (
                    <Cell key={index} fill={entry.profit >= 0 ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400">
              Performance data will appear after investments.
            </div>
          )}
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-navy-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActionCard to="/dashboard/salary-splitting" label="Split Salary" icon={DollarSign} />
          <ActionCard to="/dashboard/triple-guard" label="Approve Investment" icon={Shield} />
          <ActionCard to="/dashboard/quarterly-pulse" label="Quarterly Pulse" icon={TrendingUp} />
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-navy-900 mb-4">Investment Holdings</h2>
        {totalPortfolio > 0 ? (
          <div className="space-y-3">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-semibold mb-2">Indian Equities</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>• Reliance Industries: ₹{(holdings.equity * 0.3).toFixed(0)}</div>
                <div>• TCS: ₹{(holdings.equity * 0.25).toFixed(0)}</div>
                <div>• HDFC Bank: ₹{(holdings.equity * 0.25).toFixed(0)}</div>
                <div>• Infosys: ₹{(holdings.equity * 0.2).toFixed(0)}</div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-purple-600 font-semibold mb-2">Crypto Assets</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>• Bitcoin: ₹{(holdings.crypto * 0.6).toFixed(0)}</div>
                <div>• Ethereum: ₹{(holdings.crypto * 0.4).toFixed(0)}</div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-emerald-600 font-semibold mb-2">ESG Funds</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>• Nifty ESG Index: ₹{(holdings.esg * 0.5).toFixed(0)}</div>
                <div>• Green Bonds: ₹{(holdings.esg * 0.5).toFixed(0)}</div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-slate-400 text-center py-8">No holdings yet. Start investing to see your portfolio.</p>
        )}
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-navy-900 mb-4">Recent Decisions</h2>
        {decisionLog.length > 0 ? (
          <div className="space-y-2">
            {decisionLog.slice(0, 5).map((log, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <span className="text-sm text-slate-600">{log.timestamp}</span>
                  <span className="ml-3 text-sm text-blue-600">{log.emotion}</span>
                </div>
                <span className="text-sm text-emerald-600">{log.result}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No decisions logged yet.</p>
        )}
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: 'blue' | 'purple' | 'green' | 'cyan' }) {
  const colors = {
    blue: 'from-blue-100 to-blue-50 border-blue-200/50 text-blue-600',
    purple: 'from-purple-100 to-purple-50 border-purple-200/50 text-purple-600',
    green: 'from-green-100 to-green-50 border-green-200/50 text-green-600',
    cyan: 'from-cyan-100 to-cyan-50 border-cyan-200/50 text-cyan-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} backdrop-blur-xl border rounded-xl p-6 shadow-sm`}>
      <Icon className="mb-2" size={24} />
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-navy-900 mt-1">{value}</p>
    </div>
  );
}

function ActionCard({ to, label, icon: Icon }: { to: string; label: string; icon: any }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-200/50 hover:border-emerald-200 rounded-lg transition-all group"
    >
      <div className="flex items-center gap-3">
        <Icon className="text-emerald-600" size={20} />
        <span className="text-navy-900 font-medium">{label}</span>
      </div>
      <ArrowRight className="text-slate-400 group-hover:text-emerald-600 transition-colors" size={20} />
    </Link>
  );
}

function DollarSign(props: any) {
  return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}
