import { useAppStore } from '../store/useAppStore';
import { Calendar, Zap } from 'lucide-react';
import { useState } from 'react';

export default function QuarterlyPulse() {
  const { pulse, salary, split, advancePulse, marketTrend } = useAppStore();
  const [showExecutePopup, setShowExecutePopup] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [showMonthPopup, setShowMonthPopup] = useState(false);

  const monthlyInvestment = salary ? (salary * split.investments) / 100 : 0;

  const handleAdvanceMonth = () => {
    advancePulse(monthlyInvestment);
    setShowMonthPopup(true);
    setTimeout(() => setShowMonthPopup(false), 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Quarterly Pulse</h1>
        <p className="text-gray-400 mt-1">3-month wealth staging strategy</p>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-400">Current Status</p>
            <p className="text-2xl font-bold text-white capitalize">{pulse.state}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Month</p>
            <p className="text-2xl font-bold text-blue-400">{pulse.currentMonth} / 3</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <MonthCard month={1} active={pulse.currentMonth >= 1} label="Accumulate" />
          <MonthCard month={2} active={pulse.currentMonth >= 2} label="Accumulate" />
          <MonthCard month={3} active={pulse.currentMonth >= 3} label="Execute" />
        </div>

        <div className="bg-white/5 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Staged Capital</span>
            <span className="text-white font-semibold">₹{pulse.stagedCapital.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Monthly Contribution</span>
            <span className="text-blue-400">₹{monthlyInvestment.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {pulse.state === 'strike' && marketTrend && (
        <div className="bg-black/40 backdrop-blur-xl border border-green-500/20 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="text-yellow-400" size={24} />
            Market Trend Analysis
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <MetricBox label="Volatility Index" value={marketTrend.volatilityIndex} />
            <MetricBox label="Confidence Score" value={`${marketTrend.confidenceScore}%`} />
            <MetricBox label="Entry Signal" value={marketTrend.entrySignal} color="green" />
            <MetricBox label="Recommendation" value="Execute Now" color="blue" />
          </div>
        </div>
      )}

      <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">How Quarterly Pulse Works</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex gap-3">
            <div className="text-blue-400 font-bold">1.</div>
            <p>Month 1 & 2: Capital accumulates in low-risk staging pool</p>
          </div>
          <div className="flex gap-3">
            <div className="text-blue-400 font-bold">2.</div>
            <p>Month 3: AI analyzes market conditions and executes bulk investment</p>
          </div>
          <div className="flex gap-3">
            <div className="text-blue-400 font-bold">3.</div>
            <p>Benefits: Lower fees, reduced emotional trading, optimized entry timing</p>
          </div>
        </div>
      </div>

      {pulse.state !== 'strike' && (
        <button
          onClick={handleAdvanceMonth}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          Advance to Month {pulse.currentMonth + 1}
        </button>
      )}

      {pulse.state === 'strike' && (
        <button
          onClick={() => setShowExecutePopup(true)}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all"
        >
          Execute Bulk Investment
        </button>
      )}

      {showExecutePopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowExecutePopup(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Execute Investment</h3>
            <div className="space-y-3 mb-6 text-sm text-gray-700">
              <div className="flex justify-between"><span>Staged Capital:</span><span className="font-semibold">₹{pulse.stagedCapital.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Market Signal:</span><span className="font-semibold text-green-600">{marketTrend?.entrySignal || 'Strong'}</span></div>
              <div className="flex justify-between"><span>Confidence:</span><span className="font-semibold">{marketTrend?.confidenceScore || 85}%</span></div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowExecutePopup(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all">
                Cancel
              </button>
              <button 
                onClick={() => {
                  setExecuted(true);
                  setShowExecutePopup(false);
                  setTimeout(() => setExecuted(false), 3000);
                }}
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showMonthPopup && (
        <div className="fixed bottom-8 right-8 bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg animate-fade-in-up">
          ✓ Month {pulse.currentMonth} added successfully
        </div>
      )}

      {executed && (
        <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg animate-fade-in-up">
          ✓ Bulk investment executed successfully
        </div>
      )}
    </div>
  );
}

function MonthCard({ month, active, label }: { month: number; active: boolean; label: string }) {
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all ${
        active
          ? 'bg-blue-500/20 border-blue-500'
          : 'bg-white/5 border-white/10'
      }`}
    >
      <div className="text-center">
        <Calendar className={`mx-auto mb-2 ${active ? 'text-blue-400' : 'text-gray-500'}`} size={24} />
        <p className={`font-semibold ${active ? 'text-white' : 'text-gray-500'}`}>Month {month}</p>
        <p className="text-xs text-gray-400 mt-1">{label}</p>
      </div>
    </div>
  );
}

function MetricBox({ label, value, color = 'white' }: { label: string; value: string | number; color?: 'white' | 'green' | 'blue' }) {
  const colors = {
    white: 'text-white',
    green: 'text-green-400',
    blue: 'text-blue-400',
  };

  return (
    <div className="bg-white/5 rounded-lg p-4">
      <p className="text-xs text-gray-400">{label}</p>
      <p className={`text-lg font-bold ${colors[color]} mt-1`}>{value}</p>
    </div>
  );
}
