import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import TemplatePreview from './TemplatePreview';

const templates = [
  { id: 't1', name: 'The Growth Pro', style: 'Modern & Bold', image: 'ðŸ“ˆ', accent: '#16a34a' },
  { id: 't2', name: 'Corporate Trust', style: 'Professional & Clean', image: 'ðŸ¢', accent: '#2563eb' },
  { id: 't3', name: 'Dark Mode SaaS', style: 'High-Tech & Sleek', image: 'ðŸŒ‘', accent: '#9333ea' },
];

const MarketingKit: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [config, setConfig] = useState({
    headline: "Automate Your Google Maps Dominance",
    subheadline: "The #1 AI-powered reputation management platform for local businesses.",
    primaryColor: '#16a34a',
    niche: 'Local Businesses'
  });

  const [deployedSites] = useState([
    { domain: 'growth.myagency.com', template: 'The Growth Pro', status: 'Live', visitors: '1,284' },
    { domain: 'sales.myagency.com', template: 'Dark Mode SaaS', status: 'Pending DNS', visitors: '0' },
  ]);

  const generateAIContent = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Write a high-converting SaaS landing page headline and subheadline for an agency selling Get5StarsReview software to ${config.niche}. 
      Make it punchy, professional, and focus on ROI. Return JSON with 'h' and 's' keys.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      
      const data = JSON.parse(response.text);
      setConfig({ ...config, headline: data.h, subheadline: data.s });
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isBuilding) {
    return (
      <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-right-4 duration-500 min-h-[700px]">
        <div className="w-full lg:w-80 space-y-6 shrink-0">
           <button onClick={() => setIsBuilding(false)} className="flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
             Back to Kit
           </button>
           
           <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm space-y-8">
              <h3 className="font-black text-slate-900 uppercase italic">Editor</h3>
              
              <div className="space-y-4">
                 <label className="block space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Niche Focus</span>
                    <input 
                      type="text" 
                      value={config.niche} 
                      onChange={(e) => setConfig({...config, niche: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold" 
                    />
                 </label>

                 <button 
                  onClick={generateAIContent}
                  disabled={isGenerating}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
                 >
                   {isGenerating ? 'AI Thinking...' : 'âœ¨ Rewrite with AI'}
                 </button>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100">
                <label className="block space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Headline</span>
                    <textarea 
                      value={config.headline} 
                      onChange={(e) => setConfig({...config, headline: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold h-24 resize-none" 
                    />
                 </label>
                 <label className="block space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand Color</span>
                    <input 
                      type="color" 
                      value={config.primaryColor} 
                      onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                      className="w-full h-10 p-1 bg-white border border-slate-200 rounded-xl cursor-pointer" 
                    />
                 </label>
              </div>

              <button className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-emerald-600 transition-all">
                Publish Website
              </button>
           </div>
        </div>

        <div className="flex-1 bg-slate-200 rounded-[48px] p-4 md:p-8 overflow-hidden relative shadow-inner">
           <div className="w-full h-full bg-white rounded-[32px] shadow-2xl overflow-y-auto scrollbar-hide border-[8px] border-slate-900">
              <TemplatePreview templateId={selectedTemplate.id} config={config} />
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="bg-slate-900 p-10 md:p-16 rounded-[48px] text-white relative overflow-hidden group">
        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-[10px]">Sales Acceleration</span>
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">Your White-Label <br /> <span className="text-blue-500">Sales Funnel.</span></h2>
          <p className="text-slate-400 font-medium">Every Agency account includes a ready-made website to market your services. Choose a template, customize your colors, and launch your own SaaS brand today.</p>
        </div>
        <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {templates.map(t => (
          <div key={t.id} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group flex flex-col items-center text-center">
             <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
               {t.image}
             </div>
             <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{t.name}</h4>
             <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest">{t.style}</p>
             
             <div className="w-full pt-8 mt-auto">
                <button 
                  onClick={() => { setSelectedTemplate(t); setIsBuilding(true); }}
                  className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all active:scale-95"
                >
                  Use This Template
                </button>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100">
           <h3 className="text-lg font-black uppercase tracking-tight italic">Deployed Funnels</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Custom Domain</th>
                <th className="px-8 py-4">Template</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-center">Visitors</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deployedSites.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">{s.domain}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-medium text-slate-600">{s.template}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${s.status === 'Live' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center text-sm font-bold text-slate-900">{s.visitors}</td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-slate-400 hover:text-slate-900 transition-colors">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-emerald-50 p-8 rounded-[40px] border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">ðŸ“‘</div>
            <div>
               <h4 className="text-lg font-black text-slate-900 uppercase italic">Marketing Assets Kit</h4>
               <p className="text-slate-600 text-sm font-medium">Download sales decks, social media templates, and one-pagers.</p>
            </div>
         </div>
         <button className="px-8 py-3 bg-white border border-emerald-200 text-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all">Download Pack (.zip)</button>
      </div>
    </div>
  );
};

export default MarketingKit;
