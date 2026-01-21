
import React, { useState } from 'react';

const WhiteLabelSettings: React.FC = () => {
  const [branding, setBranding] = useState({
    agencyName: 'Pixel Perfect Marketing',
    customDomain: 'reviews.pixelperfect.com',
    primaryColor: '#3b82f6',
    secondaryColor: '#1e293b',
    poweredByText: 'Powered by Pixel Perfect',
    showSupportLink: true
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white p-8 md:p-10 rounded-[48px] border border-slate-200 shadow-sm space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase italic">Agency Identity</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Configure your brand assets</p>
            </div>
            <button className="bg-black text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 transition-all shadow-xl shadow-black/10 active:scale-95">
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <label className="block space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Agency Brand Name</span>
              <input 
                type="text" 
                value={branding.agencyName}
                onChange={(e) => setBranding({...branding, agencyName: e.target.value})}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all" 
              />
            </label>
            <label className="block space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Custom Portal Domain</span>
              <div className="flex">
                <div className="bg-slate-100 border border-r-0 border-slate-200 rounded-l-2xl flex items-center px-4 text-xs font-black text-slate-400">HTTPS://</div>
                <input 
                  type="text" 
                  value={branding.customDomain}
                  className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-r-2xl text-sm font-bold outline-none" 
                  placeholder="reviews.myagency.com"
                />
              </div>
            </label>
          </div>

          <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-slate-50 rounded-[28px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-blue-600 group cursor-pointer hover:bg-white hover:border-blue-500 transition-all">
                  <span className="text-xl">📸</span>
                  <span className="text-[8px] font-black uppercase mt-1">Logo</span>
                </div>
                <div className="space-y-1">
                   <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">Dashboard Logo</p>
                   <p className="text-[10px] text-slate-400 font-medium">Recommended: 400x120px PNG with transparency.</p>
                </div>
             </div>
             
             <div className="space-y-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand Accent Color</span>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                   <input 
                    type="color" 
                    value={branding.primaryColor}
                    onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent" 
                   />
                   <span className="text-xs font-black text-slate-900 uppercase">{branding.primaryColor}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-slate-950 p-10 rounded-[48px] text-white overflow-hidden relative group">
           <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-emerald-500/30">🛡️</div>
                 <h3 className="text-xl font-black uppercase italic tracking-tighter">Compliance & Transparency</h3>
              </div>
              <p className="text-slate-400 text-sm font-medium max-w-lg leading-relaxed">Ensure your clients feel safe. We adhere to CASA Grade 2 security standards. These badges will appear on your login and billing pages.</p>
              
              <div className="flex flex-wrap gap-4">
                 {['CASA Certified', 'GDPR Compliant', 'Google Dev Approved', 'SSL Secure'].map(b => (
                   <div key={b} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{b}</span>
                   </div>
                 ))}
              </div>
           </div>
           <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] group-hover:bg-emerald-500/20 transition-all duration-1000"></div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment Guide</h4>
          <div className="space-y-6">
             <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs shrink-0">1</div>
                <div>
                   <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">DNS Setup</p>
                   <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">Point your CNAME record to <code className="bg-slate-100 px-1 rounded">portal.g5sr.io</code></p>
                </div>
             </div>
             <div className="flex gap-4 opacity-50">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center font-black text-xs shrink-0">2</div>
                <div>
                   <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">SSL Validation</p>
                   <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">Automatic verification usually takes 2-4 hours.</p>
                </div>
             </div>
          </div>
          <button className="w-full py-4 bg-blue-50 text-blue-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all">Check DNS Health</button>
        </div>

        <div className="bg-blue-600 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
           <h4 className="text-lg font-black uppercase italic leading-none mb-4">Enterprise <br /> White-Labeling</h4>
           <p className="text-blue-100 text-[11px] font-medium leading-relaxed mb-6">Need custom CSS or mobile app white-labeling? Our Enterprise tier offers source-code access for larger firms.</p>
           <button className="bg-white text-blue-600 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Talk to a Partner Manager</button>
           <div className="absolute bottom-[-20px] right-[-20px] text-6xl opacity-10 group-hover:rotate-12 transition-transform select-none">💎</div>
        </div>
      </div>
    </div>
  );
};

export default WhiteLabelSettings;
