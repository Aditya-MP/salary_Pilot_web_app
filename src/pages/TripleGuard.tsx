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
        <h1 className="text-3xl font-bold text-white">Triple Guard Approval™</h1>
        <p className="text-gray-400 mt-1">Behavioral intelligence layer</p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-8">
        <GuardStep active={step === 'emotion' || step === 'cooldown'} completed={step !== 'emotion' && step !== 'cooldown'} label="Emotional Guard" />
        <div className="h-0.5 w-12 bg-blue-500/30" />
        <GuardStep active={step === 'peer'} completed={step === 'streak' || step === 'complete'} label="Peer Benchmark" />
        <div className="h-0.5 w-12 bg-blue-500/30" />
        <GuardStep active={step === 'streak'} completed={step === 'complete'} label="Streak Protector" />
      </div>

      {step === 'emotion' && (
        <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-8 space-y-6">
          <div className="text-center">
            <Shield className="mx-auto text-blue-400 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-white mb-2">How are you feeling right now?</h2>
            <p className="text-gray-400">Your emotional state affects investment decisions</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <EmotionCard
              label="Calm"
              emoji="😌"
              description="Clear minded"
              onClick={() => handleEmotionSelect('calm')}
            />
            <EmotionCard
              label="Stressed"
              emoji="😰"
              description="Under pressure"
              onClick={() => handleEmotionSelect('stressed')}
            />
            <EmotionCard
              label="Excited"
              emoji="🤩"
              description="FOMO active"
              onClick={() => handleEmotionSelect('excited')}
            />
          </div>
        </div>
      )}

      {step === 'cooldown' && (
        <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/20 rounded-xl p-8 text-center space-y-6">
          <div className="text-6xl font-bold text-yellow-400">{countdown}s</div>
          <h2 className="text-2xl font-bold text-white">Take a moment to reflect</h2>
          <p className="text-gray-400">This pause helps prevent emotional regret trades</p>
          <button
            onClick={() => navigate('/dashboard/salary-splitting')}
            className="px-6 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-all"
          >
            Cancel & Go Back
          </button>
        </div>
      )}

      {step === 'peer' && (
        <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-8 space-y-6">
          <div className="text-center">
            <Users className="mx-auto text-blue-400 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-white mb-2">Peer Benchmark</h2>
            <p className="text-gray-400">Social proof from disciplined investors</p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 text-center">
            <p className="text-4xl font-bold text-blue-400 mb-2">72%</p>
            <p className="text-gray-300">of disciplined investors held during similar volatility</p>
          </div>

          <button
            onClick={() => setStep('streak')}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
          >
            Continue
          </button>
        </div>
      )}

      {step === 'streak' && (
        <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-8 space-y-6">
          <div className="text-center">
            <Award className="mx-auto text-green-400 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-white mb-2">Streak Protector</h2>
            <p className="text-gray-400">Maintain your discipline multiplier</p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
            <p className="text-4xl font-bold text-green-400 mb-2">🔥 Current Streak</p>
            <p className="text-2xl text-white font-semibold">5 months</p>
            <p className="text-sm text-gray-400 mt-2">Breaking this resets your sustainability multiplier</p>
          </div>

          <button
            onClick={handleFinalApproval}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all"
          >
            Confirm & Execute Investment
          </button>
        </div>
      )}

      {step === 'complete' && (
        <div className="bg-black/40 backdrop-blur-xl border border-green-500/20 rounded-xl p-8 space-y-6 text-center">
          <CheckCircle className="mx-auto text-green-400" size={64} />
          <h2 className="text-3xl font-bold text-white">Investment Executed!</h2>
          <div className="bg-white/5 rounded-lg p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Invested</span>
              <span className="text-white font-semibold">₹{investmentAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Equities</span>
              <span className="text-blue-400">₹{(investmentAmount * 0.4).toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Crypto</span>
              <span className="text-purple-400">₹{(investmentAmount * 0.25).toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">ESG</span>
              <span className="text-green-400">₹{(investmentAmount * 0.2).toFixed(0)}</span>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-left">
            <p className="text-sm text-blue-400 font-semibold mb-3">Shares Purchased:</p>
            <div className="space-y-2 text-xs text-gray-300">
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
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
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
            ? 'bg-green-500 border-green-500'
            : active
              ? 'bg-blue-500 border-blue-500'
              : 'bg-white/5 border-white/20'
          }`}
      >
        {completed && <CheckCircle size={20} />}
      </div>
      <span className="text-xs text-gray-400 mt-2">{label}</span>
    </div>
  );
}

function EmotionCard({ label, emoji, description, onClick }: { label: string; emoji: string; description: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white/5 hover:bg-white/10 border border-blue-500/20 hover:border-blue-500/50 rounded-xl p-6 transition-all text-center"
    >
      <div className="text-4xl mb-2">{emoji}</div>
      <div className="text-lg font-semibold text-white">{label}</div>
      <div className="text-xs text-gray-400 mt-1">{description}</div>
    </button>
  );
}
