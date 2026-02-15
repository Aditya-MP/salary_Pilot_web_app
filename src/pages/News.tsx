import { Newspaper, TrendingUp, AlertCircle, Globe } from 'lucide-react';
import { useLivePrices } from '../hooks/useLivePrices';

export default function News() {
  const { changes } = useLivePrices();

  const portfolioNews = [
    { title: 'Tech stocks rally on AI optimism', impact: `${changes.equity > 0 ? '+' : ''}${changes.equity.toFixed(1)}%`, type: changes.equity > 0 ? 'positive' : 'negative', category: 'Equities' },
    { title: 'Bitcoin volatility increases amid regulatory concerns', impact: `${changes.crypto > 0 ? '+' : ''}${changes.crypto.toFixed(1)}%`, type: changes.crypto > 0 ? 'positive' : 'negative', category: 'Crypto' },
    { title: 'ESG funds outperform traditional indices', impact: `${changes.esg > 0 ? '+' : ''}${changes.esg.toFixed(1)}%`, type: changes.esg > 0 ? 'positive' : 'negative', category: 'ESG' },
  ];

  const globalNews = [
    { title: 'SEBI introduces new mutual fund regulations', date: '2 hours ago', source: 'Economic Times' },
    { title: 'RBI maintains repo rate at 6.5%', date: '5 hours ago', source: 'Mint' },
    { title: 'New crypto tax guidelines announced', date: '1 day ago', source: 'Bloomberg' },
    { title: 'Green bonds see record issuance in Q1', date: '2 days ago', source: 'Reuters' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy-900">Market News</h1>
        <p className="text-slate-500 mt-1">Stay informed about your investments</p>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-navy-900 mb-4 flex items-center gap-2">
          <TrendingUp className="text-blue-600" size={24} />
          Portfolio Impact News
        </h2>
        <div className="space-y-3">
          {portfolioNews.map((news, i) => (
            <PortfolioNewsCard key={i} {...news} />
          ))}
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-navy-900 mb-4 flex items-center gap-2">
          <Globe className="text-cyan-600" size={24} />
          Global Financial News
        </h2>
        <div className="space-y-3">
          {globalNews.map((news, i) => (
            <GlobalNewsCard key={i} {...news} />
          ))}
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-yellow-200/50 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-navy-900 mb-4 flex items-center gap-2">
          <AlertCircle className="text-yellow-500" size={24} />
          Regulatory Updates
        </h2>
        <div className="space-y-3 text-sm text-slate-600">
          <div className="bg-yellow-50 border border-yellow-200/50 rounded-lg p-4">
            <p className="font-semibold text-yellow-600 mb-1">Tax Filing Deadline Extended</p>
            <p>ITR filing deadline extended to July 31, 2024 for AY 2024-25</p>
          </div>
          <div className="bg-blue-50 border border-blue-200/50 rounded-lg p-4">
            <p className="font-semibold text-blue-600 mb-1">New KYC Norms</p>
            <p>SEBI mandates periodic KYC updates for all investors every 2 years</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioNewsCard({ title, impact, type, category }: { title: string; impact: string; type: string; category: string }) {
  return (
    <div className="bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/50 rounded-lg p-4 transition-all cursor-pointer">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <span className="text-xs text-blue-600 font-semibold">{category}</span>
          <p className="text-navy-900 font-medium mt-1">{title}</p>
        </div>
        <div className={`text-right ml-4 ${type === 'positive' ? 'text-emerald-600' : 'text-red-500'}`}>
          <p className="text-lg font-bold">{impact}</p>
          <p className="text-xs">Impact</p>
        </div>
      </div>
    </div>
  );
}

function GlobalNewsCard({ title, date, source }: { title: string; date: string; source: string }) {
  return (
    <div className="bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/50 rounded-lg p-4 transition-all cursor-pointer">
      <div className="flex items-start gap-3">
        <Newspaper className="text-slate-400 flex-shrink-0 mt-1" size={20} />
        <div className="flex-1">
          <p className="text-navy-900 font-medium">{title}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <span>{source}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
