'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, PieChart as PieIcon, AlertTriangle, CheckCircle, Receipt, ArrowRight, Wallet, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import DashboardLayout from '@/components/dashboard-layout';
import MotionWrapper from '@/components/motion-wrapper';

// Mock data
const pieData = [
  { name: 'Spending', value: 50, color: '#64748B' }, // Slate 500
  { name: 'Savings', value: 20, color: '#3B82F6' }, // Blue 500
  { name: 'Investing', value: 30, color: '#10B981' }, // Emerald 500
];

const barData = [
  { name: 'Rel', value: 5000, color: '#10B981' },
  { name: 'Sol', value: 3500, color: '#3B82F6' },
  { name: 'Ada', value: 2800, color: '#F59E0B' },
  { name: 'SBI', value: 2000, color: '#6366F1' },
  { name: 'Gold', value: 300, color: '#EAB308' },
];

const alerts = [
  {
    title: 'Tax Harvesting Opportunity',
    desc: 'Save ₹12,500 in LTCG taxes by booking profit in \'Reliance Green\' before March 31.',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    icon: <Receipt size={18} className="text-blue-400" />
  },
  {
    title: 'Portfolio Risk Alert',
    desc: 'Solar sector volatility is high (VIX > 24). Recommended: Hold current positions.',
    color: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
    icon: <AlertTriangle size={18} className="text-orange-400" />
  },
  {
    title: 'SEBI Compliance',
    desc: 'Your portfolio is 100% compliant with new SEBI mid-cap rules.',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    icon: <CheckCircle size={18} className="text-emerald-400" />
  }
];

export default function Dashboard() {
  const [totalValue, setTotalValue] = useState(1250000); // 1.25M Base
  const [totalChange, setTotalChange] = useState(11.6);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalValue(prev => prev + Math.random() * 500 - 250);
      setTotalChange(prev => Math.max(0, prev + (Math.random() - 0.5) * 0.1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-white text-3xl font-semibold tracking-tight">Portfolio Overview</h1>
            <p className="text-slate-400 text-sm mt-1">Real-time wealth tracking</p>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-xs font-bold">LIVE MARKET</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Stat Card */}
          <MotionWrapper type="slide-in" delay={0.1}>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Wallet size={100} className="text-white" />
              </div>
              <p className="text-slate-400 text-sm font-medium uppercase">Net Worth</p>
              <h2 className="text-white text-4xl font-bold mt-2">₹{Math.round(totalValue).toLocaleString()}</h2>
              <div className="flex items-center mt-2">
                <TrendingUp size={16} className="text-emerald-400 mr-1" />
                <span className="text-emerald-400 font-bold text-sm">+{totalChange.toFixed(2)}%</span>
                <span className="text-slate-500 text-xs ml-2">vs last month</span>
              </div>
            </div>
          </MotionWrapper>

          {/* Secondary Stat */}
          <MotionWrapper type="slide-in" delay={0.2}>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 h-full flex flex-col justify-center">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg mr-3">
                  <Activity size={20} className="text-blue-400" />
                </div>
                <p className="text-slate-300 font-medium">Monthly Growth</p>
              </div>
              <p className="text-white text-3xl font-bold">₹42,500</p>
              <p className="text-slate-500 text-xs mt-1">Projected for this month</p>
            </div>
          </MotionWrapper>

          {/* Allocation Mini Chart */}
          <MotionWrapper type="slide-in" delay={0.3}>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 h-full flex items-center justify-between">
              <div>
                <p className="text-slate-300 font-medium mb-1">Asset Allocation</p>
                <div className="space-y-1">
                  <LegendItem label="Equity" color="bg-emerald-500" />
                  <LegendItem label="Debt" color="bg-blue-500" />
                  <LegendItem label="Liquidity" color="bg-slate-500" />
                </div>
              </div>
              <div className="h-24 w-24">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={30} outerRadius={45} paddingAngle={2} dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            <MotionWrapper type="slide-in" delay={0.4}>
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-semibold">Portfolio Performance</h3>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                      <Tooltip
                        cursor={{ fill: '#1e293b' }}
                        contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#F8FAFC' }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Alerts Section */}
          <div className="space-y-6">
            <MotionWrapper type="slide-in" delay={0.5}>
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">AI Insights</h3>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${alert.borderColor} ${alert.bg}`}>
                      <div className="flex items-start">
                        <div className="mt-0.5 mr-3">{alert.icon}</div>
                        <div>
                          <p className={`${alert.color} text-sm font-bold mb-1`}>{alert.title}</p>
                          <p className="text-slate-300 text-xs leading-relaxed">{alert.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center transition-colors group">
                    <span className="text-white font-medium text-sm">Run Optimization</span>
                    <ArrowRight size={16} className="ml-2 text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function LegendItem({ label, color }: { label: string, color: string }) {
  return (
    <div className="flex items-center">
      <div className={`w-2 h-2 rounded-full mr-2 ${color}`} />
      <span className="text-slate-400 text-xs">{label}</span>
    </div>
  );
}