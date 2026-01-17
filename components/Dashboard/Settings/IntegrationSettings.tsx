
import React from 'react';

const IntegrationSettings: React.FC = () => {
  const integrations = [
    { id: 'google', name: 'Google Business Profile', connected: true, lastSync: '10m ago', icon: 'https://www.vectorlogo.zone/logos/google/google-icon.svg' },
    { id: 'facebook', name: 'Facebook Pages', connected: true, lastSync: '1h ago', icon: 'https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg' },
    { id: 'yelp', name: 'Yelp', connected: false, lastSync: 'Never', icon: 'https://www.vectorlogo.zone/logos/yelp/yelp-icon.svg' },
    { id: 'trustpilot', name: 'Trustpilot', connected: false, lastSync: 'Never', icon: 'https://www.vectorlogo.zone/logos/trustpilot/trustpilot-icon.svg' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900">Platform Sync</h3>
          <p className="text-slate-500 text-sm">Connect your profiles to automatically pull in reviews and metrics.</p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((platform) => (
            <div key={platform.id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between group">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-2">
                    <img src={platform.icon} alt={platform.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{platform.name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">
                      {platform.connected ? `Synced ${platform.lastSync}` : 'Disconnected'}
                    </p>
                  </div>
                </div>
                {platform.connected ? (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">Active</span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">Inactive</span>
                )}
              </div>

              <div className="flex gap-2">
                {platform.connected ? (
                  <>
                    <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">Re-Sync</button>
                    <button className="px-3 bg-white border border-slate-200 text-rose-500 py-2 rounded-lg text-xs font-bold hover:bg-rose-50 transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </>
                ) : (
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10">
                    Connect Account
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-[32px] p-8 text-white flex items-center justify-between shadow-2xl">
        <div className="space-y-2">
          <h4 className="text-lg font-bold">Need a custom integration?</h4>
          <p className="text-slate-400 text-sm">We provide full API access for Enterprise customers to connect custom review sources.</p>
        </div>
        <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all shrink-0">
          View API Docs
        </button>
      </div>
    </div>
  );
};

export default IntegrationSettings;
