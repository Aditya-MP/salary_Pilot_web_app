import { useState } from 'react';
import { GraduationCap, BookOpen, MessageCircle, Send, Youtube } from 'lucide-react';

export default function Learning() {
  const [chatMessages, setChatMessages] = useState<any[]>([
    { type: 'bot', text: 'Hi! I can help you understand financial concepts. Ask me anything!' },
  ]);
  const [input, setInput] = useState('');

  const modules = [
    { title: 'What is Quarterly Pulse?', duration: '5 min', completed: false },
    { title: 'Why 15-second cooldown works?', duration: '8 min', completed: true },
    { title: 'How tax impacts compounding?', duration: '12 min', completed: false },
    { title: 'Understanding ESG investing', duration: '10 min', completed: false },
    { title: 'Crypto basics for beginners', duration: '15 min', completed: false },
    { title: 'Risk profiling explained', duration: '7 min', completed: true },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    setChatMessages([...chatMessages,
    { type: 'user', text: input },
    { type: 'bot', text: 'Great question! Quarterly Pulse reduces transaction frequency and emotional overtrading by staging investments over 3 months. This approach lowers fees and optimizes market entry timing.' }
    ]);
    setInput('');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy-900">Learning Hub</h1>
        <p className="text-slate-500 mt-1">Master financial concepts at your own pace</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-navy-900 mb-4 flex items-center gap-2">
            <BookOpen className="text-blue-600" size={24} />
            Learning Modules
          </h2>
          <div className="space-y-3">
            {modules.map((module, i) => (
              <ModuleCard key={i} {...module} />
            ))}
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 flex flex-col shadow-sm">
          <h2 className="text-xl font-semibold text-navy-900 mb-4 flex items-center gap-2">
            <MessageCircle className="text-emerald-600" size={24} />
            AI Learning Assistant
          </h2>

          <div className="flex-1 bg-slate-50 rounded-lg p-4 mb-4 overflow-y-auto max-h-96 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.type === 'user'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white border border-slate-200 text-slate-600'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about financial concepts..."
              className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2 text-navy-900 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            />
            <button
              onClick={handleSend}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-navy-900 mb-4 flex items-center gap-2">
          <Youtube className="text-red-500" size={24} />
          Recommended Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <VideoCard title="Understanding Market Volatility" channel="Finance Basics" views="125K" />
          <VideoCard title="Tax-Efficient Investing" channel="Money Matters" views="89K" />
          <VideoCard title="ESG Investing Guide" channel="Sustainable Finance" views="67K" />
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ title, duration, completed }: { title: string; duration: string; completed: boolean }) {
  return (
    <div className="bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/50 rounded-lg p-4 transition-all cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${completed ? 'bg-emerald-500' : 'bg-slate-300'
            }`}>
            {completed ? '✓' : <GraduationCap size={16} className="text-white" />}
          </div>
          <div>
            <p className="text-navy-900 font-medium">{title}</p>
            <p className="text-xs text-slate-500">{duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ title, channel, views }: { title: string; channel: string; views: string }) {
  return (
    <div className="bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/50 rounded-lg p-4 transition-all cursor-pointer">
      <div className="bg-gradient-to-br from-red-100 to-pink-50 rounded-lg h-32 mb-3 flex items-center justify-center border border-red-200/30">
        <Youtube className="text-red-400" size={48} />
      </div>
      <p className="text-navy-900 font-medium text-sm mb-1">{title}</p>
      <p className="text-xs text-slate-500">{channel} • {views} views</p>
    </div>
  );
}
