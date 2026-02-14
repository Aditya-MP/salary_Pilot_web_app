import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { type RiskType } from '../types';

export default function RiskProfile() {
  const { risk, setRisk } = useAppStore();
  const [selected, setSelected] = useState<RiskType | null>(risk);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (selected) {
      setRisk(selected);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const risks: { id: RiskType; title: string; desc: string; icon: any; recommended?: boolean }[] = [
    {
      id: 'conservative',
      title: 'Conservative',
      desc: 'Capital preservation focused. Low volatility.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 'balanced',
      title: 'Balanced',
      desc: 'Balanced growth and standard stability.',
      recommended: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
    },
    {
      id: 'aggressive',
      title: 'Aggressive',
      desc: 'Maximum growth potential. Higher volatility.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Risk Profile</h1>
        <p className="text-gray-400 mt-1">Select your preferred volatility tolerance</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {risks.map((riskItem) => (
          <button
            key={riskItem.id}
            onClick={() => setSelected(riskItem.id)}
            className={`relative text-left border rounded-2xl p-6 transition-all duration-300 ${
              selected === riskItem.id
                ? 'bg-blue-500/20 border-blue-500 scale-105'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className={`mb-4 p-3 rounded-full w-fit ${selected === riskItem.id ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white'}`}>
              {riskItem.icon}
            </div>

            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-white">{riskItem.title}</h3>
              {riskItem.recommended && (
                <span className="bg-blue-600 text-[10px] font-bold px-2 py-0.5 rounded text-white tracking-wide uppercase">AI Pick</span>
              )}
            </div>

            <p className="text-sm text-gray-400">{riskItem.desc}</p>

            {selected === riskItem.id && (
              <div className="absolute top-4 right-4 text-blue-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <button
        disabled={!selected}
        onClick={handleSave}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
          selected
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-800 text-gray-600 cursor-not-allowed'
        }`}
      >
        Save Risk Profile
      </button>

      {saved && (
        <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg animate-fade-in-up">
          ✓ Risk profile updated successfully
        </div>
      )}
    </div>
  );
}
