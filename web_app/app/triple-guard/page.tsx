'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldAlert, Users, Leaf, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TripleGuardModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const monthlyInvestAmount = searchParams.get('monthlyInvestAmount');
  const isStagingActiveParam = searchParams.get('isStagingActive');
  
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(15);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [peerData, setPeerData] = useState('');

  const investAmount = Number(monthlyInvestAmount ?? 0);
  const staging = isStagingActiveParam === 'true';

  useEffect(() => {
    generatePeerData();
  }, []);

  const generatePeerData = () => {
    const scenarios = [
      "72% of 'Wealth Builders' in your segment are locking this ESG split today.",
      "85% of investors with your risk profile held their position during similar volatility.",
      "Top 10% of 'Green Growth' portolios are accumulating this asset right now.",
    ];
    setPeerData(scenarios[Math.floor(Math.random() * scenarios.length)]);
  };

  const startTimer = () => {
    setIsCoolingDown(true);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCoolingDown(false);
          setStep(2);
          generatePeerData();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push(`/investing-complete?monthlyInvestAmount=${investAmount}&isStagingActive=${staging}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={() => router.back()}
      />
      
      <motion.div
        initial={{ y: '100vh' }}
        animate={{ y: 0 }}
        className="w-full max-w-2xl bg-[#111827] rounded-t-[32px] overflow-hidden z-10"
      >
        {/* Header Progress */}
        <div className="flex justify-center mb-8 space-x-2 pt-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 w-10 rounded-full ${step >= i ? 'bg-[#7C3AED]' : 'bg-white/10'}`}
            />
          ))}
        </div>

        <div className="min-h-[300px] flex flex-col justify-center items-center p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="items-center text-center"
              >
                <ShieldAlert size={64} color="#F59E0B" />
                <h2 className="text-white text-xl font-bold mt-4 mb-2">Mental Safeguard</h2>
                <p className="text-white/60 mb-6">
                  {staging
                    ? `You are deploying a bulk sum of ₹${(investAmount * 3).toLocaleString()}. High-stakes monitoring active.`
                    : "Protecting your salary from decision fatigue and workplace stress."
                  }
                </p>

                {!isCoolingDown ? (
                  <div>
                    <p className="text-white/70 mb-4">How are you feeling?</p>
                    <div className="flex justify-center space-x-4">
                      <FeelingButton label="😫 Stressed" color="#EF4444" onClick={startTimer} />
                      <FeelingButton label="🧘 Calm" color="#10B981" onClick={() => { setStep(2); generatePeerData(); }} />
                      <FeelingButton label="🚀 FOMO" color="#F97316" onClick={startTimer} />
                    </div>
                  </div>
                ) : (
                  <div className="items-center">
                    <p className="text-[#F59E0B] font-bold text-lg mb-2">Cooling Down: {countdown}s</p>
                    <p className="text-white/40 text-xs">Taking a mindful pause...</p>
                  </div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="items-center text-center"
              >
                <Users size={64} color="#3B82F6" />
                <h2 className="text-white text-xl font-bold mt-4 mb-2">Peer Benchmark</h2>
                <div className="bg-blue-500/10 p-4 rounded-xl mt-4 border border-blue-500/20 max-w-md">
                  <p className="text-blue-400 font-semibold">{peerData}</p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="items-center text-center"
              >
                <Leaf size={64} color="#10B981" />
                <h2 className="text-white text-xl font-bold mt-4 mb-2">Bio-Financial Streak</h2>
                <p className="text-white/70 mb-4">
                  {staging
                    ? "Completing this awards you the 'Diamond Streak'. Only 5 peers attempting."
                    : "You have a 5-month Gold Streak. Don't break the habit!"
                  }
                </p>
                <p className={`text-xl font-black ${staging ? 'text-cyan-400' : 'text-green-500'}`}>
                  {staging ? "💎 DIAMOND TIER IMMINENT" : "🔥 DON'T BREAK THE HABIT"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          className={`w-full h-14 rounded-2xl flex items-center justify-center mt-8 ${
            isCoolingDown ? 'bg-white/10' : 'bg-[#7C3AED]'
          }`}
          disabled={isCoolingDown}
          onClick={handleNext}
        >
          <span className="text-white text-lg font-bold">
            {isCoolingDown ? "Wait for Clarity..." : (step < 3 ? "Analyze Next Guard" : (staging ? "Verify Bulk Execution" : "Secure Sustainable Wealth"))}
          </span>
        </button>
      </motion.div>
    </div>
  );
}

function FeelingButton({ label, color, onClick }: { label: string, color: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
      style={{ color }}
    >
      {label}
    </button>
  );
}