import { Newspaper, TrendingUp, Globe } from 'lucide-react';
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
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-6 lg:p-8 shadow-lg shadow-orange-500/10">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1"><Newspaper className="text-white/70" size={16} /><span className="text-amber-200 text-xs font-semibold tracking-wider uppercase">Live Feed</span></div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Market News</h1>
          <p className="text-amber-200/70 mt-1 text-sm">Stay informed about your investments</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center"><TrendingUp className="text-blue-400" size={14} /></div>
          <h2 className="text-white font-semibold">Portfolio Impact News</h2>
        </div>
        <div className="p-4 space-y-2">
          {portfolioNews.map((news, i) => (
            <div key={i} className={`p-4 rounded-xl border transition-all hover:bg-white/[0.02] ${news.type === 'positive' ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
              <div className="flex justify-between items-start">
                <div><span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase">{news.category}</span><p className="text-white font-medium text-sm mt-0.5">{news.title}</p></div>
                <div className={`text-right ml-4 ${news.type === 'positive' ? 'text-emerald-400' : 'text-red-400'}`}><p className="text-lg font-bold">{news.impact}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center"><Globe className="text-cyan-400" size={14} /></div>
          <h2 className="text-white font-semibold">Global Financial News</h2>
        </div>
        <div className="p-4 space-y-2">
          {globalNews.map((news, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all">
              <p className="text-white font-medium text-sm">{news.title}</p>
              <div className="flex gap-2 mt-1.5 text-[10px] text-slate-500">
                <span className="px-2 py-0.5 rounded-full bg-white/[0.05] font-medium text-slate-400">{news.source}</span>
                <span>{news.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
