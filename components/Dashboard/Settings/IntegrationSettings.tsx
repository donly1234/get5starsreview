
import React, { useState } from 'react';

const IntegrationSettings: React.FC = () => {
  const [platforms, setPlatforms] = useState([
    { id: 'google', name: 'Google Business Profile', connected: false, lastSync: 'Never', icon: 'https://www.vectorlogo.zone/logos/google/google-icon.svg', loading: false },
    { id: 'facebook', name: 'Facebook Pages', connected: false, lastSync: 'Never', icon: 'https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg', loading: false },
    { id: 'yelp', name: 'Yelp', connected: false, lastSync: 'Never', icon: 'https://www.vectorlogo.zone/logos/yelp/yelp-icon.svg', loading: false },
    { id: 'trustpilot', name: 'Trustpilot', connected: false, lastSync: 'Never', icon: 'https://www.vectorlogo.zone/logos/trustpilot/trustpilot-icon.svg', loading: false },
  ]);

  const handleConnect = (id: string) => {
    setPlatforms(prev => prev.map(p => p.id === id ? { ...p, loading: true } : p));
    
    // Simulate connection flow
    setTimeout(() => {
      setPlatforms(prev => prev.map(p => p.id === id ? { ...p, connected: true, loading: false, lastSync: 'Just now' } : p));
    }, 2000);
  };

  const handleDisconnect = (id: string) => {
    if (confirm(`Are you sure you want to disconnect ${id}? This will stop review automation.`)) {
      setPlatforms(prev => prev.map(p => p.id === id ? { ...p, connected: false, lastSync: 'Never' } : p));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 uppercase italic tracking-tight">Platform Sync</h3>
          <p className="text-slate-500 text-sm font-medium">Connect your business profiles to automatically sync reviews, ratings, and Google Maps performance data.</p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((platform) => (
            <div key={platform.id} className={`p-6 rounded-[28px] border transition-all flex flex-col justify-between group ${platform.connected ? 'bg-emerald-50/30 border-emerald-100 shadow-sm' : 'bg-slate-50/50 border-slate-100'}`}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-[20px] shadow-sm border border-slate-100 flex items-center justify-center p-3">
                    <img src={platform.icon} alt={platform.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{platform.name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">
                      {platform.connected ? `Synced: ${platform.lastSync}` : 'Status: Disconnected'}
                    </p>
                  </div>
                </div>
                {platform.connected ? (
                  <span className="text-[9px] font-black text-emerald-600 bg-white px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">Active</span>
                ) : (
                  <span className="text-[9px] font-black text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 uppercase tracking-widest">Ready</span>
                )}
              </div>

              <div className="flex gap-2">
                {platform.connected ? (
                  <>
                    <button className="flex-1 bg-white border border-slate-200 text-slate-900 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all shadow-sm">Force Re-Sync</button>
                    <button 
                      onClick={() => handleDisconnect(platform.id)}
                      className="px-4 bg-white border border-slate-100 text-rose-500 py-3 rounded-xl text-xs font-bold hover:bg-rose-50 transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleConnect(platform.id)}
                    disabled={platform.loading}
                    className="w-full bg-[#0F172A] text-white py-4 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#16A34A] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {platform.loading ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                        Secure OAuth Connect
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-[48px] p-10 md:p-14 text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group border-b-8 border-[#16A34A]">
        <div className="relative z-10 space-y-4 max-w-2xl text-center lg:text-left">
          <h4 className="text-3xl md:text-4xl font-[900] uppercase italic tracking-tighter">Enterprise API Access</h4>
          <p className="text-slate-400 font-medium leading-relaxed">Need to connect custom software, proprietary POS systems, or high-volume agency networks? We provide full API documentation and sandbox access for Pro+ accounts.</p>
        </div>
        <button className="relative z-10 bg-white text-slate-950 px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-[#16A34A] hover:text-white transition-all shadow-2xl shrink-0 active:scale-95">
          Generate API Key
        </button>
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
      </div>
    </div>
  );
};

export default IntegrationSettings;
