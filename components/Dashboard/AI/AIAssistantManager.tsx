
import React, { useState, useEffect } from 'react';
import { logger } from '../../../utils/logger';

const AIAssistantManager: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [settings, setSettings] = useState({
    autoRespond5Stars: true,
    autoRespond4Stars: false,
    brandVoice: 'Professional & Helpful',
    blacklistPhrases: 'refund, sue, legal, court, fake',
    minConfidence: 85,
    delayResponse: '30m'
  });

  useEffect(() => {
    const saved = localStorage.getItem('g5sr_ai_config');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        logger.error("Failed to parse settings", e);
      }
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('g5sr_ai_config', JSON.stringify(settings));
    window.dispatchEvent(new Event('g5sr_ai_updated'));
    
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12 relative">
      {showToast && (
        <div className="fixed top-24 right-8 z-[120] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300 border border-white/10">
          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-[10px]">✓</div>
          <span className="font-bold text-sm">AI Logic Core Updated</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
            AI Assistant Configuration
            <span className="bg-emerald-100 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-black">Online</span>
          </h1>
          <p className="text-slate-500 text-sm font-bold">Control how Gemini interacts with your customers and manages your brand voice.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-emerald-600 text-white px-10 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl active:scale-95 flex items-center gap-2"
        >
          {isSaving ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : 'Save Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm space-y-10">
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-900 uppercase italic">Automation Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'autoRespond5Stars', label: 'Auto-Reply (5 Stars)', icon: '⭐', desc: 'Instant acknowledgement of perfect feedback.' },
                  { key: 'autoRespond4Stars', label: 'Auto-Reply (4 Stars)', icon: '✨', desc: 'Warm response to positive suggestions.' },
                ].map(rule => (
                  <div key={rule.key} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-black text-slate-900 text-sm uppercase">{rule.label}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">{rule.desc}</p>
                    </div>
                    <button 
                      onClick={() => setSettings({...settings, [rule.key]: !settings[rule.key as keyof typeof settings]})}
                      className={`w-12 h-6 rounded-full relative transition-all ${settings[rule.key as keyof typeof settings] ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings[rule.key as keyof typeof settings] ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
              <label className="block space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Primary Brand Voice</span>
                <select 
                  value={settings.brandVoice}
                  onChange={(e) => setSettings({...settings, brandVoice: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none cursor-pointer hover:border-emerald-500 transition-colors"
                >
                  <option>Professional & Helpful</option>
                  <option>Casual & Friendly</option>
                  <option>Witty & Energetic</option>
                  <option>Empathetic & Serious</option>
                </select>
              </label>

              <label className="block space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Response Timing</span>
                <select 
                  value={settings.delayResponse}
                  onChange={(e) => setSettings({...settings, delayResponse: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none cursor-pointer"
                >
                  <option value="instant">Instant (Real-time)</option>
                  <option value="30m">Short Delay (30m)</option>
                  <option value="2h">Human Pulse (2h)</option>
                  <option value="24h">Daily Cycle (24h)</option>
                </select>
              </label>
            </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl space-y-8">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-rose-500/20 text-rose-500 rounded-2xl flex items-center justify-center text-2xl border border-rose-500/20">🛡️</div>
               <h3 className="text-xl font-black uppercase italic tracking-tighter">Reputation Safety Net</h3>
            </div>
            <p className="text-slate-400 text-sm font-medium">Any review containing these keywords will bypass automation and be sent to your manual review inbox immediately.</p>
            <div className="space-y-4">
               <input 
                type="text"
                value={settings.blacklistPhrases}
                onChange={(e) => setSettings({...settings, blacklistPhrases: e.target.value})}
                className="w-full p-5 bg-white/5 border border-white/10 rounded-3xl text-sm font-bold outline-none focus:border-rose-500 transition-all"
                placeholder="refund, legal, sue..."
               />
               <div className="flex flex-wrap gap-2">
                  {settings.blacklistPhrases.split(',').map(tag => tag.trim() && (
                    <span key={tag} className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase rounded-lg">
                      {tag.trim()}
                    </span>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">AI Confidence Score</h4>
            <div className="space-y-4">
               <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-600">Min. Accuracy</span>
                  <span className="text-2xl font-black text-emerald-600">{settings.minConfidence}%</span>
               </div>
               <input 
                type="range" min="60" max="99" 
                value={settings.minConfidence} 
                onChange={(e) => setSettings({...settings, minConfidence: parseInt(e.target.value)})}
                className="w-full accent-emerald-500 h-2 bg-slate-100 rounded-full appearance-none cursor-pointer" 
               />
               <p className="text-[10px] text-slate-400 leading-relaxed font-medium">Gemini will only auto-respond if its internal confidence score exceeds this threshold.</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[40px] relative overflow-hidden group">
             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:rotate-6 transition-transform">🧠</div>
             <h4 className="font-black text-slate-900 text-lg uppercase italic mb-2 leading-none">Context Learning</h4>
             <p className="text-xs text-slate-600 leading-relaxed font-medium">Our AI analyzes your manual edits to perfect your unique brand voice over time.</p>
             <div className="mt-6 flex items-center gap-3">
                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden border border-emerald-100 shadow-inner">
                   <div className="w-3/4 h-full bg-emerald-500 animate-pulse" />
                </div>
                <span className="text-[10px] font-black text-emerald-600">75% Trained</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantManager;
