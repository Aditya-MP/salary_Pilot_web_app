import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Sparkles, Zap } from 'lucide-react';
import { type RiskType } from '../types';

export default function SalarySplitting() {
  const { salary, risk, split, setSplit, setRisk } = useAppStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'ai' | 'manual'>('ai');
  const [selectedRisk, setSelectedRisk] = useState<RiskType | null>(risk);

  const aiRecommendations = {
    conservative: { needs: 60, wants: 25, investments: 15 },
    balanced: { needs: 50, wants: 30, investments: 20 },
    aggressive: { needs: 40, wants: 25, investments: 35 },
  };

  const recommended = selectedRisk ? aiRecommendations[selectedRisk] : (risk ? aiRecommendations[risk] : { needs: 50, wants: 30, investments: 20 });

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
        <h1 className="text-3xl font-bold text-navy-900">Salary Splitting Engine</h1>
        <p className="text-slate-500 mt-1">Your investment DNA starts here</p>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-slate-500">Monthly Salary</p>
            <p className="text-3xl font-bold text-navy-900">₹{salary?.toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('ai')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${mode === 'ai' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-100 text-slate-500'
                }`}
            >
              <Sparkles size={16} />
              AI Mode
            </button>
            <button
              onClick={() => setMode('manual')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${mode === 'manual' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-100 text-slate-500'
                }`}
            >
              <Zap size={16} />
              Manual
            </button>
          </div>
        </div>

        {mode === 'ai' ? (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-emerald-600" size={20} />
                <span className="text-emerald-700 font-semibold">AI Recommendation</span>
              </div>
              <p className="text-sm text-slate-600">
                Based on your {selectedRisk || 'selected'} risk profile, we recommend this allocation for optimal growth and stability.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/50 rounded-lg p-4">
              <p className="text-sm text-slate-500 mb-3">Select Risk Profile</p>
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
                      ? 'bg-emerald-50 border-emerald-400 text-navy-900'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                  >
                    {r.title}
                    {r.recommended && <div className="text-xs text-emerald-600 mt-1">AI Pick</div>}
                  </button>
                ))}
              </div>
            </div>

            <AllocationBar label="Needs (Expenses)" value={recommended?.needs || 50} color="red" />
            <AllocationBar label="Wants (Savings)" value={recommended?.wants || 30} color="yellow" />
            <AllocationBar label="Investments" value={recommended?.investments || 20} color="green" />
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

      <div className="bg-white/60 backdrop-blur-xl border border-emerald-200/50 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-navy-900 mb-4">Investment Breakdown</h3>
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
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Approve Investment → Triple Guard
      </button>
    </div>
  );
}

function AllocationBar({ label, value, color }: { label: string; value: number; color: 'red' | 'yellow' | 'green' }) {
  const colors = { red: 'bg-red-500', yellow: 'bg-yellow-500', green: 'bg-green-500' };
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="text-sm font-semibold text-navy-900">{value}%</span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${colors[color]} transition-all`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function SliderControl({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="text-sm font-semibold text-navy-900">{value}%</span>
      </div>
      <input type="range" min="0" max="100" value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </div>
  );
}

function AssetCard({ label, percentage, amount }: { label: string; percentage: number; amount: number }) {
  return (
    <div className="bg-slate-50 border border-slate-200/50 rounded-lg p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-lg font-bold text-navy-900 mt-1">{percentage}%</p>
      <p className="text-sm text-emerald-600">₹{amount.toFixed(0)}</p>
    </div>
  );
}
