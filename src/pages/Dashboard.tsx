import { useAppStore } from '../store/useAppStore';
import { TrendingUp, Shield, Leaf, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { useLivePrices, calculatePortfolioValue } from '../hooks/useLivePrices';

export default function Dashboard() {
  const { holdings, streakCount, pulse, decisionLog } = useAppStore();
  const { prices, changes } = useLivePrices();

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
        <h1 className="text-3xl font-bold text-white">Financial Control Center</h1>
        <p className="text-gray-400 mt-1">Your intelligent investment autopilot dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={TrendingUp}
          label="Total Portfolio"
          value={`₹${totalPortfolio.toLocaleString()}`}
          color="blue"
        />
        <MetricCard
          icon={Shield}
          label="Discipline Streak"
          value={`${streakCount} months`}
          color="purple"
        />
        <MetricCard
          icon={Leaf}
          label="Sustainability Score"
          value={`${sustainabilityScore.toFixed(0)}%`}
          color="green"
        />
        <MetricCard
          icon={Calendar}
          label="Pulse Status"
          value={`Month ${pulse.currentMonth}/3`}
          color="cyan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Asset Allocation</h2>
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
                  <span className="text-sm text-gray-300">Equity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm text-gray-300">Crypto</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-300">ESG</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No investments yet. Start with Salary Splitting.
            </div>
          )}
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Performance Trend</h2>
          {performanceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="profit" radius={[8, 8, 0, 0]}>
                  {performanceData.map((entry, index) => (
                    <Cell key={index} fill={entry.profit >= 0 ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              Performance data will appear after investments.
            </div>
          )}
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActionCard to="/salary-splitting" label="Split Salary" icon={DollarSign} />
          <ActionCard to="/triple-guard" label="Approve Investment" icon={Shield} />
          <ActionCard to="/quarterly-pulse" label="Quarterly Pulse" icon={TrendingUp} />
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Investment Holdings</h2>
        {totalPortfolio > 0 ? (
          <div className="space-y-3">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-blue-400 font-semibold mb-2">Indian Equities</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                <div>• Reliance Industries: ₹{(holdings.equity * 0.3).toFixed(0)}</div>
                <div>• TCS: ₹{(holdings.equity * 0.25).toFixed(0)}</div>
                <div>• HDFC Bank: ₹{(holdings.equity * 0.25).toFixed(0)}</div>
                <div>• Infosys: ₹{(holdings.equity * 0.2).toFixed(0)}</div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-purple-400 font-semibold mb-2">Crypto Assets</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                <div>• Bitcoin: ₹{(holdings.crypto * 0.6).toFixed(0)}</div>
                <div>• Ethereum: ₹{(holdings.crypto * 0.4).toFixed(0)}</div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-green-400 font-semibold mb-2">ESG Funds</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                <div>• Nifty ESG Index: ₹{(holdings.esg * 0.5).toFixed(0)}</div>
                <div>• Green Bonds: ₹{(holdings.esg * 0.5).toFixed(0)}</div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No holdings yet. Start investing to see your portfolio.</p>
        )}
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Decisions</h2>
        {decisionLog.length > 0 ? (
          <div className="space-y-2">
            {decisionLog.slice(0, 5).map((log, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <span className="text-sm text-gray-300">{log.timestamp}</span>
                  <span className="ml-3 text-sm text-blue-400">{log.emotion}</span>
                </div>
                <span className="text-sm text-green-400">{log.result}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No decisions logged yet.</p>
        )}
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: 'blue' | 'purple' | 'green' | 'cyan' }) {
  const colors = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} backdrop-blur-xl border rounded-xl p-6`}>
      <Icon className="text-white mb-2" size={24} />
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}

function ActionCard({ to, label, icon: Icon }: { to: string; label: string; icon: any }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-blue-500/20 rounded-lg transition-all group"
    >
      <div className="flex items-center gap-3">
        <Icon className="text-blue-400" size={20} />
        <span className="text-white font-medium">{label}</span>
      </div>
      <ArrowRight className="text-gray-400 group-hover:text-blue-400 transition-colors" size={20} />
    </Link>
  );
}

function DollarSign(props: any) {
  return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}
