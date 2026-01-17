
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Agency Branding</h3>
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
              Save Preferences
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Agency Name</span>
              <input 
                type="text" 
                value={branding.agencyName}
                onChange={(e) => setBranding({...branding, agencyName: e.target.value})}
                className="mt-2 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium" 
              />
            </label>
            <label className="block">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Custom Domain</span>
              <input 
                type="text" 
                value={branding.customDomain}
                className="mt-2 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium" 
                placeholder="e.g. portal.myagency.com"
              />
            </label>
            <div className="md:col-span-2 flex flex-col md:flex-row gap-8 items-start py-4">
              <div className="shrink-0 space-y-4">
                 <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">Agency Logo</span>
                 <div className="w-24 h-24 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-blue-600 font-black cursor-pointer hover:bg-slate-50">
                    <span className="text-2xl">📸</span>
                    <span className="text-[10px]">Upload</span>
                 </div>
              </div>
              <div className="flex-1 space-y-4 w-full">
                 <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">Brand Palette</span>
                 <div className="flex gap-4">
                    <div className="flex-1 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                       <span className="text-xs font-bold text-slate-600">Primary</span>
                       <input 
                        type="color" 
                        value={branding.primaryColor}
                        onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                        className="w-10 h-10 rounded-lg p-1 bg-white border border-slate-200 cursor-pointer" 
                       />
                    </div>
                    <div className="flex-1 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                       <span className="text-xs font-bold text-slate-600">Accent</span>
                       <input 
                        type="color" 
                        value={branding.secondaryColor}
                        onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})}
                        className="w-10 h-10 rounded-lg p-1 bg-white border border-slate-200 cursor-pointer" 
                       />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Communication & Footers</h3>
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Powered By Label</span>
              <input 
                type="text" 
                value={branding.poweredByText}
                onChange={(e) => setBranding({...branding, poweredByText: e.target.value})}
                className="mt-2 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium" 
              />
            </label>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div>
                 <p className="text-sm font-bold text-slate-900">Show Support Link</p>
                 <p className="text-xs text-slate-500">Enable the "Help" beacon in client portals.</p>
               </div>
               <button 
                onClick={() => setBranding({...branding, showSupportLink: !branding.showSupportLink})}
                className={`w-12 h-6 rounded-full relative transition-all ${branding.showSupportLink ? 'bg-blue-600' : 'bg-slate-300'}`}
               >
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${branding.showSupportLink ? 'right-1 shadow-sm' : 'left-1'}`}></div>
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-slate-900 p-8 rounded-[32px] text-white space-y-6">
          <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Portal Preview</h4>
          <div className="bg-white p-4 rounded-2xl border border-slate-800 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[8px] text-slate-400 font-black">LOGO</div>
               <div className="h-2 w-16 bg-slate-100 rounded"></div>
            </div>
            <div className="space-y-3">
               <div className="h-10 w-full rounded-lg" style={{ backgroundColor: branding.primaryColor }}></div>
               <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
               <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
            </div>
            <div className="mt-8 text-center">
               <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{branding.poweredByText}</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed italic text-center">Real-time preview of how your clients will see the dashboard interface.</p>
        </div>

        <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl">
          <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-3">Agency Support</h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-6">Need help setting up your CNAME or custom domain? Our reseller support team is available 24/7 for Enterprise agencies.</p>
          <button className="w-full bg-white border border-blue-200 text-blue-600 py-3 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all">
            Schedule 1-on-1 Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhiteLabelSettings;
