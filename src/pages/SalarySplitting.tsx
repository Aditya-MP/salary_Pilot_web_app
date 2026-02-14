import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Sparkles, Zap } from 'lucide-react';
import { type RiskType } from '../types';

export default function SalarySplitting() {
  const { salary, risk, split, setSplit, setRisk } = useAppStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'ai' | 'manual'>('ai');
  const [showRiskProfile, setShowRiskProfile] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<RiskType | null>(risk);

  const aiRecommendations = {
    conservative: { needs: 60, wants: 25, investments: 15 },
    balanced: { needs: 50, wants: 30, investments: 20 },
    aggressive: { needs: 40, wants: 25, investments: 35 },
  };

  const recommended = risk ? aiRecommendations[risk] : split;

  const handleApply = () => {
    if (mode === 'ai' && !selectedRisk) {
      return;
    }
    if (mode === 'ai') {
      setRisk(selectedRisk!);
      setSplit(recommended);
    }
    navigate('/dashboard/triple-guard');
  };

  const investmentAmount = salary ? (salary * split.investments) / 100 : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Salary Splitting Engine</h1>
        <p className="text-gray-400 mt-1">Your investment DNA starts here</p>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-400">Monthly Salary</p>
            <p className="text-3xl font-bold text-white">₹{salary?.toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('ai')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${mode === 'ai' ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-400'
                }`}
            >
              <Sparkles size={16} />
              AI Mode
            </button>
            <button
              onClick={() => setMode('manual')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${mode === 'manual' ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-400'
                }`}
            >
              <Zap size={16} />
              Manual
            </button>
          </div>
        </div>

        {mode === 'ai' ? (
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-blue-400" size={20} />
                <span className="text-blue-400 font-semibold">AI Recommendation</span>
              </div>
              <p className="text-sm text-gray-300">
                Based on your {selectedRisk || 'selected'} risk profile, we recommend this allocation for optimal growth and stability.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-3">Select Risk Profile</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'conservative' as RiskType, title: 'Conservative' },
                  { id: 'balanced' as RiskType, title: 'Balanced', recommended: true },
                  { id: 'aggressive' as RiskType, title: 'Aggressive' },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRisk(r.id)}
                    className={`p-3 rounded-lg border transition-all text-sm ${selectedRisk === r.id
                        ? 'bg-blue-500/20 border-blue-500 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                  >
                    {r.title}
                    {r.recommended && <div className="text-xs text-blue-400 mt-1">AI Pick</div>}
                  </button>
                ))}
              </div>
            </div>

            <AllocationBar label="Needs (Expenses)" value={recommended.needs} color="red" />
            <AllocationBar label="Wants (Savings)" value={recommended.wants} color="yellow" />
            <AllocationBar label="Investments" value={recommended.investments} color="green" />
          </div>
        ) : (
          <div className="space-y-4">
            <SliderControl
              label="Needs (Expenses)"
              value={split.needs}
              onChange={(v) => setSplit({ ...split, needs: v, investments: 100 - v - split.wants })}
              color="red"
            />
            <SliderControl
              label="Wants (Savings)"
              value={split.wants}
              onChange={(v) => setSplit({ ...split, wants: v, investments: 100 - split.needs - v })}
              color="yellow"
            />
            <AllocationBar label="Investments (Auto)" value={split.investments} color="green" />
          </div>
        )}
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-green-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Investment Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AssetCard label="Indian Equities" percentage={40} amount={investmentAmount * 0.4} />
          <AssetCard label="Crypto Assets" percentage={25} amount={investmentAmount * 0.25} />
          <AssetCard label="ESG Pools" percentage={20} amount={investmentAmount * 0.2} />
          <AssetCard label="Liquid Funds" percentage={15} amount={investmentAmount * 0.15} />
        </div>
      </div>

      <button
        onClick={handleApply}
        disabled={mode === 'ai' && !selectedRisk}
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Approve Investment → Triple Guard
      </button>
    </div>
  );
}

function AllocationBar({ label, value, color }: { label: string; value: number; color: 'red' | 'yellow' | 'green' }) {
  const colors = {
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-300">{label}</span>
        <span className="text-sm font-semibold text-white">{value}%</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${colors[color]} transition-all`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function SliderControl({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-300">{label}</span>
        <span className="text-sm font-semibold text-white">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

function AssetCard({ label, percentage, amount }: { label: string; percentage: number; amount: number }) {
  return (
    <div className="bg-white/5 border border-blue-500/20 rounded-lg p-4">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-lg font-bold text-white mt-1">{percentage}%</p>
      <p className="text-sm text-green-400">₹{amount.toFixed(0)}</p>
    </div>
  );
}
