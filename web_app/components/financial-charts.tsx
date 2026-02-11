'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';

// Sample data for charts
const investmentData = [
  { name: 'Jan', investment: 4000, profit: 2400 },
  { name: 'Feb', investment: 3000, profit: 1398 },
  { name: 'Mar', investment: 2000, profit: 9800 },
  { name: 'Apr', investment: 2780, profit: 3908 },
  { name: 'May', investment: 1890, profit: 4800 },
  { name: 'Jun', investment: 2390, profit: 3800 },
  { name: 'Jul', investment: 3490, profit: 4300 },
];

const assetAllocationData = [
  { name: 'Stocks', value: 45 },
  { name: 'Bonds', value: 25 },
  { name: 'Real Estate', value: 15 },
  { name: 'Crypto', value: 10 },
  { name: 'Cash', value: 5 },
];

const COLORS = ['#7C3AED', '#EC4899', '#F59E0B', '#22C55E', '#0EA5E9'];

interface FinancialChartsProps {
  className?: string;
}

const FinancialCharts = ({ className }: FinancialChartsProps) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investment Growth Chart */}
        <div className="bg-gradient-to-br from-[#0a0d20] to-[#1a1d30] p-6 rounded-2xl border border-white/10 glass depth-2">
          <h3 className="text-white text-lg font-bold mb-4">Investment Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={investmentData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 13, 32, 0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }} 
                  itemStyle={{ color: 'white' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.8)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="investment" 
                  stroke="#7C3AED" 
                  fill="url(#investmentGradient)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#22C55E" 
                  fill="url(#profitGradient)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Allocation Chart */}
        <div className="bg-gradient-to-br from-[#0a0d20] to-[#1a1d30] p-6 rounded-2xl border border-white/10 glass depth-2">
          <h3 className="text-white text-lg font-bold mb-4">Asset Allocation</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetAllocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {assetAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 13, 32, 0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Performance Chart */}
        <div className="bg-gradient-to-br from-[#0a0d20] to-[#1a1d30] p-6 rounded-2xl border border-white/10 glass depth-2 lg:col-span-2">
          <h3 className="text-white text-lg font-bold mb-4">Monthly Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={investmentData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 13, 32, 0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }} 
                  itemStyle={{ color: 'white' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.8)' }}
                />
                <Legend />
                <Bar dataKey="investment" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="#22C55E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCharts;