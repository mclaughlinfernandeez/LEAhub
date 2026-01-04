
import React, { useState, useRef, useEffect } from 'react';
import { Send, Shield, ExternalLink, Scale, MapPin } from 'lucide-react';
import { chatWithLegalAIStream, findNearbyLegalResources } from '../services/geminiService';

const LegalChat: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { 
      role: 'model', 
      text: 'Hello. I am your specialized Disability Rights AI Advisor. I am trained on Section 504, IDEA, ADA, and recent federal cases. How can I help you build your case today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleNearbySearch = async () => {
    if (!navigator.geolocation) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const result = await findNearbyLegalResources(pos.coords.latitude, pos.coords.longitude);
        setMessages(prev => [...prev, { role: 'model', text: result.text }]);
      } catch (e) {
        setMessages(prev => [...prev, { role: 'model', text: "Could not retrieve nearby resources." }]);
      } finally {
        setLoading(false);
      }
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    // Add a placeholder for the model response
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
      const responseStream = await chatWithLegalAIStream(userText);
      let fullText = '';
      
      for await (const chunk of responseStream) {
        if (chunk.text) {
          fullText += chunk.text;
          setMessages(prev => {
            const last = prev[prev.length - 1];
            const updated = [...prev];
            updated[prev.length - 1] = { ...last, text: fullText };
            return updated;
          });
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Error: Connection lost.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Scale size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Legal Advisor AI</h3>
            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Streaming Enabled</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleNearbySearch}
            className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <MapPin size={14} /> <span>Find Nearby Aid</span>
          </button>
          <div className="w-px h-6 bg-slate-200 mx-2"></div>
          <Shield size={16} className="text-slate-400" />
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/20">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text || (isLoading && i === messages.length - 1 ? '...' : '')}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex items-center space-x-4 bg-slate-100 p-2 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Describe your legal situation..."
            className="flex-1 bg-transparent border-none outline-none text-sm p-2 resize-none max-h-32"
            rows={1}
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalChat;
