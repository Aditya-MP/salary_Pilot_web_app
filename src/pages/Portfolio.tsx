import { useAppStore } from '../store/useAppStore';
import { TrendingUp, TrendingDown, Briefcase, PieChart } from 'lucide-react';
import { useLivePrices } from '../hooks/useLivePrices';

export default function Portfolio() {
  const { holdings, streakCount } = useAppStore();
  const { changes } = useLivePrices();

  const totalValue = holdings.equity + holdings.crypto + holdings.esg;
  const overallReturn = ((holdings.equity * changes.equity / 100) + (holdings.crypto * changes.crypto / 100) + (holdings.esg * changes.esg / 100)) / (totalValue || 1) * 100;

  const portfolioItems: Array<{ name: string; value: number; change: number; color: 'blue' | 'purple' | 'green' }> = [
    { name: 'Indian Equities', value: holdings.equity, change: changes.equity, color: 'blue' },
    { name: 'Crypto Assets', value: holdings.crypto, change: changes.crypto, color: 'purple' },
    { name: 'ESG Pools', value: holdings.esg, change: changes.esg, color: 'green' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy-900">Portfolio</h1>
        <p className="text-slate-500 mt-1">Your investment holdings and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={Briefcase} label="Total Portfolio Value" value={`₹${totalValue.toLocaleString()}`} color="blue" />
        <StatCard icon={TrendingUp} label="Overall Return" value={`${overallReturn >= 0 ? '+' : ''}${overallReturn.toFixed(1)}%`} color="green" />
        <StatCard icon={PieChart} label="Discipline Streak" value={`${streakCount} months`} color="purple" />
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-navy-900 mb-6">Holdings Breakdown</h2>
        <div className="space-y-4">
          {portfolioItems.map((item) => (
            <HoldingRow key={item.name} {...item} total={totalValue} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-navy-900 mb-4">Risk Exposure</h3>
          <div className="space-y-3">
            <RiskBar label="High Risk" percentage={30} color="red" />
            <RiskBar label="Medium Risk" percentage={45} color="yellow" />
            <RiskBar label="Low Risk" percentage={25} color="green" />
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-navy-900 mb-4">Performance Metrics</h3>
          <div className="space-y-3">
            <MetricRow label="1 Month Return" value="+5.2%" positive />
            <MetricRow label="3 Month Return" value="+12.8%" positive />
            <MetricRow label="6 Month Return" value="+18.5%" positive />
            <MetricRow label="YTD Return" value="+15.2%" positive />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: 'blue' | 'green' | 'purple' }) {
  const colors = {
    blue: 'from-blue-100 to-blue-50 border-blue-200/50 text-blue-600',
    green: 'from-green-100 to-green-50 border-green-200/50 text-green-600',
    purple: 'from-purple-100 to-purple-50 border-purple-200/50 text-purple-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} backdrop-blur-xl border rounded-xl p-6 shadow-sm`}>
      <Icon className="mb-2" size={24} />
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-navy-900 mt-1">{value}</p>
    </div>
  );
}

function HoldingRow({ name, value, change, color, total }: { name: string; value: number; change: number; color: 'blue' | 'purple' | 'green'; total: number }) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  const colors = { blue: 'bg-blue-500', purple: 'bg-purple-500', green: 'bg-green-500' };

  return (
    <div className="bg-slate-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-navy-900 font-medium">{name}</span>
        <div className="flex items-center gap-2">
          <span className="text-navy-900 font-semibold">₹{value.toLocaleString()}</span>
          <span className={`text-sm flex items-center gap-1 ${change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className={`h-full ${colors[color]}`} style={{ width: `${percentage}%` }} />
      </div>
      <p className="text-xs text-slate-500 mt-1">{percentage.toFixed(1)}% of portfolio</p>
    </div>
  );
}

function RiskBar({ label, percentage, color }: { label: string; percentage: number; color: 'red' | 'yellow' | 'green' }) {
  const colors = { red: 'bg-red-500', yellow: 'bg-yellow-500', green: 'bg-green-500' };
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="text-sm text-navy-900">{percentage}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${colors[color]}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function MetricRow({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`text-sm font-semibold ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
        {value}
      </span>
    </div>
  );
}
