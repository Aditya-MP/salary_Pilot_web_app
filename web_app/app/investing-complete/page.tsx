'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Link as LinkIcon, ArrowRight, ShieldCheck, Leaf, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard-layout';
import MotionWrapper from '@/components/motion-wrapper';

export default function InvestingCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const monthlyInvestAmount = searchParams.get('monthlyInvestAmount');
  const amount = Number(monthlyInvestAmount ?? 0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading/processing
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8 max-w-7xl h-full flex flex-col justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-6"></div>
            <p className="text-slate-400 animate-pulse">Verifying blockchain transactions...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column: Success Message */}
            <MotionWrapper type="slide-in" delay={0.1}>
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full mb-6 border border-emerald-500/20">
                  <CheckCircle size={48} className="text-emerald-400" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Investment <br /> <span className="text-emerald-400">Successfully Executed</span></h1>
                <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
                  Your funds have been securely allocated across verified assets. Smart contracts were executed on-chain with <span className="text-white font-medium">Zero-Knowledge Proof</span> privacy.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] flex items-center justify-center"
                  >
                    View Portfolio
                    <ArrowRight size={20} className="ml-2" />
                  </button>
                  <button
                    onClick={() => router.push('/')}
                    className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold border border-slate-700 transition-all hover:scale-[1.02]"
                  >
                    Back to Planning
                  </button>
                </div>
              </div>
            </MotionWrapper>

            {/* Right Column: Transaction Details Card */}
            <MotionWrapper type="slide-in" delay={0.1} className="w-full">
              <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Deployed</p>
                    <p className="text-white text-4xl font-bold mt-1">₹{amount.toLocaleString()}</p>
                  </div>
                  <div className="bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 flex items-center">
                    <ShieldCheck size={16} className="text-emerald-400 mr-2" />
                    <span className="text-emerald-400 text-xs font-bold">VERIFIED</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8 relative z-10">
                  <TransactionRow network="Cardano" asset="ESG Bond Pool" amount="6,000" color="text-blue-400" bg="bg-blue-500/10" border="border-blue-500/20" />
                  <TransactionRow network="Solana" asset="Green Lending" amount="4,650" color="text-purple-400" bg="bg-purple-500/10" border="border-purple-500/20" />
                  <TransactionRow network="Masumi" asset="AI Agent Fees" amount="45" color="text-orange-400" bg="bg-orange-500/10" border="border-orange-500/20" />
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-emerald-400">
                      <Leaf size={16} className="mr-2" />
                      <span className="text-sm font-semibold">Impact Score</span>
                    </div>
                    <span className="text-white font-bold">92/100</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <p className="text-slate-500 text-xs mt-3">
                    Your allocation contributes to <span className="text-slate-300">0.9 tons</span> of CO₂ reduction annually.
                  </p>
                </div>
              </div>
            </MotionWrapper>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function TransactionRow({ network, asset, amount, color, bg, border }: any) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border ${border} ${bg} transition-transform hover:scale-[1.01]`}>
      <div className="flex items-center">
        <div className={`p-2 rounded-lg bg-slate-900/40 border border-white/5`}>
          <LinkIcon size={16} className={color.replace('text-', 'text-opacity-80 text-')} />
        </div>
        <div className="ml-4">
          <p className="text-white font-medium text-sm">{asset}</p>
          <p className="text-slate-400 text-xs">{network} Network</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-bold">₹{amount}</p>
        <p className={`text-[10px] font-medium ${color}`}>Processing</p>
      </div>
    </div>
  );
}