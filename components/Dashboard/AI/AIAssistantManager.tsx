
import React, { useState } from 'react';

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

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12 relative">
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-24 right-8 z-[120] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300 border border-white/10">
          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-[10px]">✓</div>
          <span className="font-bold text-sm">AI Configuration Updated</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
            AI Response Assistant
            <span className="bg-emerald-100 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-black">Pro Feature</span>
          </h1>
          <p className="text-slate-500 text-sm font-bold">Configure how Gemini handles incoming customer feedback on autopilot.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-black text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-black/10 active:scale-95 flex items-center gap-2"
        >
          {isSaving ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Controls */}
          <div className="bg-white p-8 md:p-10 rounded-[48px] border border-slate-200 shadow-sm space-y-10">
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tight">Automation Engine</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-emerald-200 transition-all">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">⭐</div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm uppercase">Auto-Reply (5 Stars)</h4>
                      <p className="text-xs text-slate-500 font-medium">Post instant "Thank You" messages for perfect reviews.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSettings({...settings, autoRespond5Stars: !settings.autoRespond5Stars})}
                    className={`w-14 h-7 rounded-full relative transition-all ${settings.autoRespond5Stars ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${settings.autoRespond5Stars ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-blue-200 transition-all">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">✨</div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm uppercase">Auto-Reply (4 Stars)</h4>
                      <p className="text-xs text-slate-500 font-medium">Acknowledge positive feedback with minor suggestions.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSettings({...settings, autoRespond4Stars: !settings.autoRespond4Stars})}
                    className={`w-14 h-7 rounded-full relative transition-all ${settings.autoRespond4Stars ? 'bg-blue-500 shadow-lg shadow-blue-500/20' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${settings.autoRespond4Stars ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
              <label className="block space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Brand Voice Profile</span>
                <select 
                  value={settings.brandVoice}
                  onChange={(e) => setSettings({...settings, brandVoice: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all cursor-pointer"
                >
                  <option>Professional & Helpful</option>
                  <option>Casual & Friendly</option>
                  <option>Witty & Enthusiastic</option>
                  <option>Empathetic & Serious</option>
                </select>
              </label>

              <label className="block space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Natural Delay</span>
                <select 
                  value={settings.delayResponse}
                  onChange={(e) => setSettings({...settings, delayResponse: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none cursor-pointer"
                >
                  <option value="instant">Instant (Under 1m)</option>
                  <option value="30m">Short Wait (30m)</option>
                  <option value="2h">Human-Like (2h)</option>
                  <option value="24h">Review Cycle (24h)</option>
                </select>
              </label>
            </div>
          </div>

          {/* Negative Filter Card */}
          <div className="bg-slate-900 p-8 md:p-12 rounded-[48px] text-white overflow-hidden relative group shadow-2xl">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-rose-500/40">🛡️</div>
                 <h3 className="text-xl font-black uppercase italic tracking-tighter">Reputation Safety Net</h3>
              </div>
              <p className="text-slate-400 text-sm font-medium max-w-lg leading-relaxed">AI will NEVER respond to reviews containing these keywords. These will be flagged for your manual review immediately.</p>
              
              <div className="space-y-4">
                <input 
                  type="text"
                  value={settings.blacklistPhrases}
                  onChange={(e) => setSettings({...settings, blacklistPhrases: e.target.value})}
                  className="w-full p-5 bg-white/5 border border-white/10 rounded-3xl text-sm font-bold focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                  placeholder="Enter forbidden words..."
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
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-rose-500/10 rounded-full blur-[100px] group-hover:bg-rose-500/20 transition-all duration-1000"></div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
            <h3 className="font-black text-slate-900 uppercase italic tracking-tight text-base">Intelligence Logic</h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confidence Threshold</span>
                  <span className="text-xl font-black text-emerald-600">{settings.minConfidence}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" max="99" 
                  value={settings.minConfidence} 
                  onChange={(e) => setSettings({...settings, minConfidence: parseInt(e.target.value)})}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer" 
                />
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed italic">
                  Lowering this increases automation speed but may reduce accuracy. We recommend 85%+.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Active Sentiment Models</h4>
                <div className="space-y-2">
                  {['Frustration Detection', 'Sarcasm Analysis', 'Urgency Score', 'Keyword Enrichment'].map(m => (
                    <div key={m} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[40px] relative overflow-hidden group">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:rotate-12 transition-transform">
               <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
               </svg>
             </div>
             <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight italic mb-2">Self-Learning Core</h4>
             <p className="text-xs text-slate-600 leading-relaxed font-medium mb-6">Gemini analyzes your manual edits to perfect your future auto-responses.</p>
             <div className="flex items-center gap-3">
               <div className="flex-1 h-2 bg-white rounded-full overflow-hidden border border-emerald-100">
                 <div className="w-[68%] h-full bg-emerald-500 transition-all duration-1000"></div>
               </div>
               <span className="text-[10px] font-black text-emerald-600 uppercase">LVL 8</span>
             </div>
             <div className="absolute -bottom-8 -right-8 text-8xl opacity-[0.03] group-hover:opacity-[0.08] transition-opacity select-none pointer-events-none">🧠</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantManager;
