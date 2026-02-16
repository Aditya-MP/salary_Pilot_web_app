import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Shield, Users, Award, CheckCircle, Zap } from 'lucide-react';

export default function TripleGuard() {
  const navigate = useNavigate();
  const { salary, split, streakCount, incrementStreak, addLog, setHoldings } = useAppStore();
  const [step, setStep] = useState<'emotion' | 'cooldown' | 'peer' | 'streak' | 'complete'>('emotion');
  const [emotion, setEmotion] = useState<'calm' | 'stressed' | 'excited' | null>(null);
  const [countdown, setCountdown] = useState(15);

  const investmentAmount = salary ? (salary * split.investments) / 100 : 0;

  const handleEmotionSelect = (selected: 'calm' | 'stressed' | 'excited') => {
    setEmotion(selected);
    if (selected === 'calm') { setStep('peer'); }
    else {
      setStep('cooldown');
      let count = 15;
      const timer = setInterval(() => { count--; setCountdown(count); if (count === 0) { clearInterval(timer); setStep('peer'); } }, 1000);
    }
  };

  const handleFinalApproval = () => {
    incrementStreak();
    addLog({ emotion: emotion || 'calm', guardScore: 95, marketSignal: 'Strong', result: 'Executed' });
    setHoldings({ equity: investmentAmount * 0.4, crypto: investmentAmount * 0.25, esg: investmentAmount * 0.2 });
    setStep('complete');
  };

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-6 lg:p-8 shadow-lg shadow-purple-500/10">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1"><Shield className="text-white/70" size={16} /><span className="text-purple-200 text-xs font-semibold tracking-wider uppercase">Behavioral Layer</span></div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Triple Guard Approval™</h1>
          <p className="text-purple-200/70 mt-1 text-sm">Behavioral intelligence protects every decision</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 py-2">
        <GuardStep active={step === 'emotion' || step === 'cooldown'} completed={step !== 'emotion' && step !== 'cooldown'} label="Emotional" />
        <div className={`h-0.5 w-10 rounded-full transition-all ${step !== 'emotion' && step !== 'cooldown' ? 'bg-emerald-500' : 'bg-white/10'}`} />
        <GuardStep active={step === 'peer'} completed={step === 'streak' || step === 'complete'} label="Peer" />
        <div className={`h-0.5 w-10 rounded-full transition-all ${step === 'streak' || step === 'complete' ? 'bg-emerald-500' : 'bg-white/10'}`} />
        <GuardStep active={step === 'streak'} completed={step === 'complete'} label="Streak" />
      </div>

      {step === 'emotion' && (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center"><Shield className="text-blue-400" size={14} /></div>
            <h2 className="text-white font-semibold">How are you feeling?</h2>
          </div>
          <div className="p-6 grid grid-cols-3 gap-4">
            <EmotionCard label="Calm" emoji="😌" desc="Clear minded" onClick={() => handleEmotionSelect('calm')} color="emerald" />
            <EmotionCard label="Stressed" emoji="😰" desc="Under pressure" onClick={() => handleEmotionSelect('stressed')} color="amber" />
            <EmotionCard label="Excited" emoji="🤩" desc="FOMO active" onClick={() => handleEmotionSelect('excited')} color="red" />
          </div>
        </div>
      )}

      {step === 'cooldown' && (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20">
            <span className="text-3xl font-bold text-white">{countdown}</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Take a moment to reflect</h2>
          <p className="text-slate-400 text-sm">This pause helps prevent emotional regret trades</p>
          <button onClick={() => navigate('/dashboard/salary-splitting')} className="px-6 py-2.5 bg-white/[0.05] text-slate-300 rounded-xl hover:bg-white/[0.08] transition-all border border-white/[0.06] text-sm font-medium">Cancel & Go Back</button>
        </div>
      )}

      {step === 'peer' && (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center"><Users className="text-cyan-400" size={14} /></div>
            <h2 className="text-white font-semibold">Peer Benchmark</h2>
          </div>
          <div className="p-6 space-y-5">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 text-center">
              <p className="text-5xl font-bold text-blue-400 mb-1">72%</p>
              <p className="text-slate-400 text-sm">of disciplined investors held during similar volatility</p>
            </div>
            <button onClick={() => setStep('streak')} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all text-sm">Continue</button>
          </div>
        </div>
      )}

      {step === 'streak' && (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center"><Award className="text-emerald-400" size={14} /></div>
            <h2 className="text-white font-semibold">Streak Protector</h2>
          </div>
          <div className="p-6 space-y-5">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-emerald-400 mb-1">🔥 Current Streak</p>
              <p className="text-2xl text-white font-semibold">{streakCount} months</p>
              <p className="text-xs text-slate-500 mt-2">Breaking this resets your sustainability multiplier</p>
            </div>
            <button onClick={handleFinalApproval} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm">Confirm & Execute <Zap size={16} /></button>
          </div>
        </div>
      )}

      {step === 'complete' && (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 overflow-hidden">
          <div className="p-6 text-center border-b border-emerald-500/20">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-3">
              <CheckCircle className="text-white" size={28} />
            </div>
            <h2 className="text-xl font-bold text-white">Investment Executed!</h2>
            <p className="text-xs text-slate-400 mt-1">Your investment has been processed successfully.</p>
          </div>

          <div className="p-4 space-y-3">
            <div className="bg-white/[0.03] rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Invested</span>
                <span className="text-white font-semibold">₹{investmentAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Equities</span>
                <span className="text-blue-400">₹{(investmentAmount * 0.4).toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Crypto</span>
                <span className="text-purple-400">₹{(investmentAmount * 0.25).toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">ESG</span>
                <span className="text-emerald-400">₹{(investmentAmount * 0.2).toFixed(0)}</span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <p className="text-xs text-blue-400 font-semibold mb-2">Shares Purchased:</p>
              <div className="space-y-1.5 text-[10px] text-slate-300">
                <div className="flex justify-between">
                  <span>• Reliance Industries</span>
                  <span className="font-mono">{((investmentAmount * 0.4 * 0.3) / 2500).toFixed(2)} shares</span>
                </div>
                <div className="flex justify-between">
                  <span>• TCS</span>
                  <span className="font-mono">{((investmentAmount * 0.4 * 0.25) / 3800).toFixed(2)} shares</span>
                </div>
                <div className="flex justify-between">
                  <span>• HDFC Bank</span>
                  <span className="font-mono">{((investmentAmount * 0.4 * 0.25) / 1650).toFixed(2)} shares</span>
                </div>
                <div className="flex justify-between">
                  <span>• Infosys</span>
                  <span className="font-mono">{((investmentAmount * 0.4 * 0.2) / 1450).toFixed(2)} shares</span>
                </div>
                <div className="flex justify-between">
                  <span>• Bitcoin</span>
                  <span className="font-mono">{((investmentAmount * 0.25 * 0.6) / 3500000).toFixed(6)} BTC</span>
                </div>
                <div className="flex justify-between">
                  <span>• Ethereum</span>
                  <span className="font-mono">{((investmentAmount * 0.25 * 0.4) / 250000).toFixed(4)} ETH</span>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/dashboard')} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all text-sm">Go to Dashboard</button>
          </div>
        </div>
      )}
    </div>
  );
}

function GuardStep({ active, completed, label }: { active: boolean; completed: boolean; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${completed ? 'bg-gradient-to-br from-emerald-500 to-teal-500 border-emerald-500 text-white' : active ? 'bg-gradient-to-br from-blue-500 to-indigo-500 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-slate-600'}`}>
        {completed && <CheckCircle size={18} />}
        {active && !completed && <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />}
      </div>
      <span className="text-[10px] text-slate-500 mt-1.5 font-medium">{label}</span>
    </div>
  );
}

function EmotionCard({ label, emoji, desc, onClick, color }: { label: string; emoji: string; desc: string; onClick: () => void; color: string }) {
  const cfgs: Record<string, string> = { emerald: 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/15', amber: 'bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/15', red: 'bg-red-500/10 border-red-500/20 hover:bg-red-500/15' };
  return (
    <button onClick={onClick} className={`${cfgs[color]} border-2 hover:scale-105 rounded-2xl p-5 transition-all text-center`}>
      <div className="text-4xl mb-2">{emoji}</div>
      <div className="text-sm font-bold text-white">{label}</div>
      <div className="text-[10px] text-slate-500 mt-1">{desc}</div>
    </button>
  );
}
