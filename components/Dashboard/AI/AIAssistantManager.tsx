
import React, { useState } from 'react';

const AIAssistantManager: React.FC = () => {
  const [settings, setSettings] = useState({
    autoRespond5Stars: true,
    brandVoice: 'Professional & Helpful',
    blacklistPhrases: 'refund, sue, legal',
    minConfidence: 85
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            AI Response Assistant
            <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-black">Beta</span>
          </h1>
          <p className="text-slate-500">Master your brand voice and automate customer success.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2">
          Save AI Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-8">
            <h3 className="text-lg font-bold text-slate-900">Automation Rules</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl">⭐</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Auto-Reply to 5-Star Reviews</h4>
                    <p className="text-sm text-slate-500">Automatically post a "Thank You" message for perfect ratings.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSettings({...settings, autoRespond5Stars: !settings.autoRespond5Stars})}
                  className={`w-14 h-7 rounded-full relative transition-all ${settings.autoRespond5Stars ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${settings.autoRespond5Stars ? 'right-1 shadow-sm' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Brand Voice Profile</span>
                  <select 
                    value={settings.brandVoice}
                    onChange={(e) => setSettings({...settings, brandVoice: e.target.value})}
                    className="mt-2 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold"
                  >
                    <option>Professional & Helpful</option>
                    <option>Casual & Friendly</option>
                    <option>Witty & Enthusiastic</option>
                    <option>Empathetic & Serious</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Forbidden Phrases (Comma separated)</span>
                  <input 
                    type="text"
                    value={settings.blacklistPhrases}
                    onChange={(e) => setSettings({...settings, blacklistPhrases: e.target.value})}
                    className="mt-2 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium"
                    placeholder="e.g. refund, lawyer, mistake"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[32px] text-white overflow-hidden relative group">
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-bold">Review Sentiment Engine</h3>
              <p className="text-slate-400 text-sm max-w-lg">Our AI analyzes every review for 8 distinct emotional markers including frustration, urgency, and gratitude.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {['Frustration', 'Gratitude', 'Urgency', 'Disappointment'].map(e => (
                  <div key={e} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center text-center">
                    <span className="text-xs font-black uppercase tracking-widest text-blue-400 mb-1">{e}</span>
                    <span className="text-lg font-bold">Detected</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] group-hover:bg-blue-600/40 transition-all duration-1000"></div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Confidence Threshold</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-widest">Minimum Score</span>
                <span className="text-blue-600 font-black">{settings.minConfidence}%</span>
              </div>
              <input 
                type="range" 
                min="50" max="99" 
                value={settings.minConfidence} 
                onChange={(e) => setSettings({...settings, minConfidence: parseInt(e.target.value)})}
                className="w-full accent-blue-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer" 
              />
              <p className="text-[10px] text-slate-400 italic">Auto-replies will only fire when the AI is {settings.minConfidence}% confident in the response quality.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl">
             <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
             </div>
             <h4 className="font-bold text-slate-900 mb-2">Learning System</h4>
             <p className="text-xs text-slate-600 leading-relaxed mb-4">Every time you edit an AI suggestion, our engine learns your preferences to provide better matches next time.</p>
             <div className="flex gap-2">
               <div className="flex-1 h-1.5 bg-blue-200 rounded-full overflow-hidden"><div className="w-[45%] h-full bg-blue-600"></div></div>
               <span className="text-[10px] font-bold text-blue-600">Level 4</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantManager;
