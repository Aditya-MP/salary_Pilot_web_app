import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Shield, Users, Award, CheckCircle } from 'lucide-react';

export default function TripleGuard() {
  const navigate = useNavigate();
  const { salary, split, incrementStreak, addLog, setHoldings } = useAppStore();
  const [step, setStep] = useState<'emotion' | 'cooldown' | 'peer' | 'streak' | 'complete'>('emotion');
  const [emotion, setEmotion] = useState<'calm' | 'stressed' | 'excited' | null>(null);
  const [countdown, setCountdown] = useState(15);

  const investmentAmount = salary ? (salary * split.investments) / 100 : 0;

  const handleEmotionSelect = (selected: 'calm' | 'stressed' | 'excited') => {
    setEmotion(selected);
    if (selected === 'calm') {
      setStep('peer');
    } else {
      setStep('cooldown');
      let count = 15;
      const timer = setInterval(() => {
        count--;
        setCountdown(count);
        if (count === 0) {
          clearInterval(timer);
          setStep('peer');
        }
      }, 1000);
    }
  };

  const handleFinalApproval = () => {
    incrementStreak();
    addLog({
      emotion: emotion || 'calm',
      guardScore: 95,
      marketSignal: 'Strong',
      result: 'Executed',
    });

    setHoldings({
      equity: investmentAmount * 0.4,
      crypto: investmentAmount * 0.25,
      esg: investmentAmount * 0.2,
    });

    setStep('complete');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy-900">Triple Guard Approval™</h1>
        <p className="text-slate-500 mt-1">Behavioral intelligence layer</p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-8">
        <GuardStep active={step === 'emotion' || step === 'cooldown'} completed={step !== 'emotion' && step !== 'cooldown'} label="Emotional Guard" />
        <div className="h-0.5 w-12 bg-emerald-200" />
        <GuardStep active={step === 'peer'} completed={step === 'streak' || step === 'complete'} label="Peer Benchmark" />
        <div className="h-0.5 w-12 bg-emerald-200" />
        <GuardStep active={step === 'streak'} completed={step === 'complete'} label="Streak Protector" />
      </div>

      {step === 'emotion' && (
        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-8 space-y-6 shadow-sm">
          <div className="text-center">
            <Shield className="mx-auto text-emerald-500 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-navy-900 mb-2">How are you feeling right now?</h2>
            <p className="text-slate-500">Your emotional state affects investment decisions</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <EmotionCard label="Calm" emoji="😌" description="Clear minded" onClick={() => handleEmotionSelect('calm')} />
            <EmotionCard label="Stressed" emoji="😰" description="Under pressure" onClick={() => handleEmotionSelect('stressed')} />
            <EmotionCard label="Excited" emoji="🤩" description="FOMO active" onClick={() => handleEmotionSelect('excited')} />
          </div>
        </div>
      )}

      {step === 'cooldown' && (
        <div className="bg-white/60 backdrop-blur-xl border border-yellow-200/50 rounded-xl p-8 text-center space-y-6 shadow-sm">
          <div className="text-6xl font-bold text-yellow-500">{countdown}s</div>
          <h2 className="text-2xl font-bold text-navy-900">Take a moment to reflect</h2>
          <p className="text-slate-500">This pause helps prevent emotional regret trades</p>
          <button
            onClick={() => navigate('/dashboard/salary-splitting')}
            className="px-6 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all"
          >
            Cancel & Go Back
          </button>
        </div>
      )}

      {step === 'peer' && (
        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-8 space-y-6 shadow-sm">
          <div className="text-center">
            <Users className="mx-auto text-blue-500 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-navy-900 mb-2">Peer Benchmark</h2>
            <p className="text-slate-500">Social proof from disciplined investors</p>
          </div>

          <div className="bg-blue-50 border border-blue-200/50 rounded-lg p-6 text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">72%</p>
            <p className="text-slate-600">of disciplined investors held during similar volatility</p>
          </div>

          <button
            onClick={() => setStep('streak')}
            className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-all shadow-sm"
          >
            Continue
          </button>
        </div>
      )}

      {step === 'streak' && (
        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-8 space-y-6 shadow-sm">
          <div className="text-center">
            <Award className="mx-auto text-emerald-500 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-navy-900 mb-2">Streak Protector</h2>
            <p className="text-slate-500">Maintain your discipline multiplier</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200/50 rounded-lg p-6 text-center">
            <p className="text-4xl font-bold text-emerald-600 mb-2">🔥 Current Streak</p>
            <p className="text-2xl text-navy-900 font-semibold">5 months</p>
            <p className="text-sm text-slate-500 mt-2">Breaking this resets your sustainability multiplier</p>
          </div>

          <button
            onClick={handleFinalApproval}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
          >
            Confirm & Execute Investment
          </button>
        </div>
      )}

      {step === 'complete' && (
        <div className="bg-white/60 backdrop-blur-xl border border-emerald-200/50 rounded-xl p-8 space-y-6 text-center shadow-sm">
          <CheckCircle className="mx-auto text-emerald-500" size={64} />
          <h2 className="text-3xl font-bold text-navy-900">Investment Executed!</h2>
          <div className="bg-slate-50 rounded-lg p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Total Invested</span>
              <span className="text-navy-900 font-semibold">₹{investmentAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Equities</span>
              <span className="text-blue-600">₹{(investmentAmount * 0.4).toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Crypto</span>
              <span className="text-purple-600">₹{(investmentAmount * 0.25).toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">ESG</span>
              <span className="text-emerald-600">₹{(investmentAmount * 0.2).toFixed(0)}</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200/50 rounded-lg p-4 text-left">
            <p className="text-sm text-blue-600 font-semibold mb-3">Shares Purchased:</p>
            <div className="space-y-2 text-xs text-slate-600">
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

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

function GuardStep({ active, completed, label }: { active: boolean; completed: boolean; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${completed
          ? 'bg-emerald-500 border-emerald-500 text-white'
          : active
            ? 'bg-emerald-500 border-emerald-500 text-white'
            : 'bg-slate-100 border-slate-300'
          }`}
      >
        {completed && <CheckCircle size={20} />}
      </div>
      <span className="text-xs text-slate-500 mt-2">{label}</span>
    </div>
  );
}

function EmotionCard({ label, emoji, description, onClick }: { label: string; emoji: string; description: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl p-6 transition-all text-center shadow-sm"
    >
      <div className="text-4xl mb-2">{emoji}</div>
      <div className="text-lg font-semibold text-navy-900">{label}</div>
      <div className="text-xs text-slate-500 mt-1">{description}</div>
    </button>
  );
}
