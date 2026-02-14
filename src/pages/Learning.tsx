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
        <h1 className="text-3xl font-bold text-white">Learning Hub</h1>
        <p className="text-gray-400 mt-1">Master financial concepts at your own pace</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="text-blue-400" size={24} />
            Learning Modules
          </h2>
          <div className="space-y-3">
            {modules.map((module, i) => (
              <ModuleCard key={i} {...module} />
            ))}
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <MessageCircle className="text-cyan-400" size={24} />
            AI Learning Assistant
          </h2>
          
          <div className="flex-1 bg-white/5 rounded-lg p-4 mb-4 overflow-y-auto max-h-96 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/10 text-gray-200'
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
              className="flex-1 bg-white/10 border border-blue-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Youtube className="text-red-400" size={24} />
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
    <div className="bg-white/5 hover:bg-white/10 border border-blue-500/20 rounded-lg p-4 transition-all cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            completed ? 'bg-green-500' : 'bg-blue-500/20'
          }`}>
            {completed ? '✓' : <GraduationCap size={16} className="text-blue-400" />}
          </div>
          <div>
            <p className="text-white font-medium">{title}</p>
            <p className="text-xs text-gray-400">{duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ title, channel, views }: { title: string; channel: string; views: string }) {
  return (
    <div className="bg-white/5 hover:bg-white/10 border border-blue-500/20 rounded-lg p-4 transition-all cursor-pointer">
      <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg h-32 mb-3 flex items-center justify-center">
        <Youtube className="text-red-400" size={48} />
      </div>
      <p className="text-white font-medium text-sm mb-1">{title}</p>
      <p className="text-xs text-gray-400">{channel} • {views} views</p>
    </div>
  );
}
