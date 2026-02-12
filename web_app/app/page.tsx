'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, PiggyBank, Bolt, Hourglass, ArrowRight, Wallet, ShieldCheck, PieChart } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/dashboard-layout';
import MotionWrapper from '@/components/motion-wrapper';

export default function SalarySplitPage() {
  const router = useRouter();
  const [spending, setSpending] = useState(50);
  const [savings, setSavings] = useState(20);
  const [investing, setInvesting] = useState(30);
  const [isStagingActive, setIsStagingActive] = useState(false);
  const [selectedRiskProfile, setSelectedRiskProfile] = useState('Balanced');
  const [isLoading, setIsLoading] = useState(true);
  const salary = 50000;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const normalize = () => {
    const total = spending + savings + investing;
    if (total === 0) return;
    if (investing >= 45) setSelectedRiskProfile('Aggressive');
    else if (investing >= 25) setSelectedRiskProfile('Balanced');
    else setSelectedRiskProfile('Conservative');
  };

  const updateProfile = (profile: string) => {
    setSelectedRiskProfile(profile);
    if (profile === 'Conservative') {
      setSpending(50); setSavings(40); setInvesting(10);
    } else if (profile === 'Balanced') {
      setSpending(40); setSavings(30); setInvesting(30);
    } else if (profile === 'Aggressive') {
      setSpending(30); setSavings(20); setInvesting(50);
    }
  };

  const handleApprove = () => {
    router.push(`/triple-guard?monthlyInvestAmount=${Math.round(salary * investing / 100)}&isStagingActive=${isStagingActive}`);
  };

  const spendingAmt = Math.round(salary * spending / 100);
  const savingsAmt = Math.round(salary * savings / 100);
  const investingAmt = Math.round(salary * investing / 100);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {isLoading && (
          <div className="fixed inset-0 bg-[#0F172A] z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {!isLoading && (
          <MotionWrapper type="slide-in" delay={0.1}>
            <header className="mb-10">
              <h1 className="text-white text-3xl font-semibold tracking-tight">Salary Allocation</h1>
              <p className="text-slate-400 text-sm mt-1">Configure your monthly distribution plan</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Wealth Overview (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <MotionWrapper type="slide-in" delay={0.2}>
                  <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Wallet size={120} className="text-white" />
                    </div>

                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Detected Income</p>
                    <h2 className="text-white text-5xl font-bold mt-2 tracking-tight">₹{salary.toLocaleString()}</h2>

                    <div className="mt-8 space-y-4">
                      <SummaryRow label="Expenses" amount={spendingAmt} color="text-slate-300" />
                      <SummaryRow label="Savings" amount={savingsAmt} color="text-blue-400" />
                      <SummaryRow label="Investment" amount={investingAmt} color="text-emerald-400" isBold />
                    </div>
                  </div>
                </MotionWrapper>

                <MotionWrapper type="slide-in" delay={0.3}>
                  <div className="grid grid-cols-2 gap-4">
                    <StrategyCard
                      title="Monthly"
                      sub="Standard SIP"
                      icon={<Bolt size={24} className={!isStagingActive ? "text-blue-500" : "text-slate-500"} />}
                      selected={!isStagingActive}
                      onClick={() => setIsStagingActive(false)}
                    />
                    <StrategyCard
                      title="Quarterly"
                      sub="Lump Sum"
                      icon={<Hourglass size={24} className={isStagingActive ? "text-blue-500" : "text-slate-500"} />}
                      selected={isStagingActive}
                      onClick={() => setIsStagingActive(true)}
                    />
                  </div>
                </MotionWrapper>
              </div>

              {/* Right Column: Controls (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <MotionWrapper type="slide-in" delay={0.4}>
                  <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-white font-semibold text-lg flex items-center">
                        <ShieldCheck size={20} className="mr-2 text-blue-500" />
                        Risk Profile
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-slate-800 border ${selectedRiskProfile === "Conservative" ? "text-blue-400 border-blue-500/30" :
                          selectedRiskProfile === "Balanced" ? "text-emerald-400 border-emerald-500/30" :
                            "text-orange-400 border-orange-500/30"
                        }`}>
                        {selectedRiskProfile}
                      </span>
                    </div>

                    <div className="flex gap-3 mb-10">
                      {['Conservative', 'Balanced', 'Aggressive'].map((profile) => (
                        <RiskChip
                          key={profile}
                          label={profile}
                          selected={selectedRiskProfile === profile}
                          onClick={() => updateProfile(profile)}
                        />
                      ))}
                    </div>

                    <div className="space-y-8">
                      <SplitControl
                        label="Spending Needs"
                        icon={<TrendingUp size={18} />}
                        color="bg-slate-500"
                        thumbColor="bg-slate-200"
                        percentage={spending}
                        amount={spendingAmt}
                        onValueChange={(v) => { setSpending(v[0]); normalize(); }}
                      />
                      <SplitControl
                        label="Savings Goals"
                        icon={<PiggyBank size={18} />}
                        color="bg-blue-600"
                        thumbColor="bg-blue-400"
                        percentage={savings}
                        amount={savingsAmt}
                        onValueChange={(v) => { setSavings(v[0]); normalize(); }}
                      />
                      <SplitControl
                        label="Wealth Creation"
                        icon={<PieChart size={18} />}
                        color="bg-emerald-600"
                        thumbColor="bg-emerald-400"
                        percentage={investing}
                        amount={investingAmt}
                        onValueChange={(v) => { setInvesting(v[0]); normalize(); }}
                      />
                    </div>

                    <div className="mt-12">
                      <Button
                        className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-lg font-medium shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01]"
                        onClick={handleApprove}
                      >
                        Confirm Allocation
                        <ArrowRight size={20} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </MotionWrapper>
              </div>
            </div>
          </MotionWrapper>
        )}
      </div>
    </DashboardLayout>
  );
}

function SummaryRow({ label, amount, color, isBold }: { label: string, amount: number, color: string, isBold?: boolean }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-700/30 last:border-0">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className={`${color} ${isBold ? 'text-2xl font-bold' : 'text-lg font-medium'}`}>₹{amount.toLocaleString()}</span>
    </div>
  );
}

function StrategyCard({ title, sub, icon, selected, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl border transition-all text-left ${selected ? 'bg-blue-500/10 border-blue-500/50' : 'bg-slate-800/30 border-slate-700 hover:bg-slate-800/50'
        }`}
    >
      <div className="mb-3">{icon}</div>
      <div className="text-white font-medium">{title}</div>
      <div className="text-slate-500 text-xs">{sub}</div>
    </button>
  );
}

function RiskChip({ label, selected, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${selected ? 'bg-slate-100 text-slate-900' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
        }`}
    >
      {label}
    </button>
  );
}

function SplitControl({ label, icon, color, thumbColor, percentage, amount, onValueChange }: any) {
  return (
    <div>
      <div className="flex justify-between items-end mb-3">
        <label className="flex items-center text-slate-300 font-medium">
          <span className="p-1.5 bg-slate-800 rounded-lg mr-2 text-slate-400">{icon}</span>
          {label}
        </label>
        <div className="text-right">
          <span className="text-white font-mono font-medium block">₹{amount.toLocaleString()}</span>
          <span className="text-slate-500 text-xs">{percentage.toFixed(0)}%</span>
        </div>
      </div>
      <Slider
        className={`w-full ${color}`}
        value={[percentage]}
        onValueChange={onValueChange}
        max={100}
        step={1}
      />
    </div>
  );
}