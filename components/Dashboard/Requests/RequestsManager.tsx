
import React, { useState, useEffect } from 'react';
import RequestWizard from './RequestWizard';
import { logger } from '../../logger';
import { isFeatureEnabled } from '../../featureFlags';

interface RequestsManagerProps {
  requestsUsed: number;
  isTrial: boolean;
  onUpgrade?: () => void;
}

const RequestsManager: React.FC<RequestsManagerProps> = ({ requestsUsed: initialRequests, isTrial, onUpgrade }) => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [requestsUsed, setRequestsUsed] = useState(initialRequests);
  const [isAutoEnabled, setIsAutoEnabled] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('g5sr_campaigns');
    if (saved) setCampaigns(JSON.parse(saved));
  }, []);

  const handleLaunchCampaign = () => {
    try {
      const newCampaign = {
        id: Date.now(),
        name: `Automated Sequence #${campaigns.length + 1}`,
        type: 'SMS Priority',
        status: 'Active',
        sent: Math.floor(Math.random() * 10) + 1,
        reviews: 0,
        date: 'Just now'
      };
      const updated = [newCampaign, ...campaigns];
      setCampaigns(updated);
      localStorage.setItem('g5sr_campaigns', JSON.stringify(updated));
      setRequestsUsed(prev => prev + newCampaign.sent);
      setIsWizardOpen(false);
    } catch (err) {
      logger.error("Failed to launch campaign", err);
    }
  };

  const deleteCampaign = (id: number) => {
    const updated = campaigns.filter(c => c.id !== id);
    setCampaigns(updated);
    localStorage.setItem('g5sr_campaigns', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Review Acquisition</h1>
          <p className="text-slate-500 text-sm font-bold">Automate your path to a 5-star reputation.</p>
        </div>
        <div className="flex gap-3">
          {isFeatureEnabled('REQUEST_AUTOMATION') && (
            <button 
              onClick={() => setIsAutoEnabled(!isAutoEnabled)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all border-2 ${isAutoEnabled ? 'bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-500/20' : 'bg-white text-slate-400 border-slate-100 hover:border-emerald-500 hover:text-emerald-600'}`}
            >
              <div className={`w-2 h-2 rounded-full ${isAutoEnabled ? 'bg-white animate-pulse' : 'bg-slate-300'}`}></div>
              Automation: {isAutoEnabled ? 'RUNNING' : 'PAUSED'}
            </button>
          )}
          <button 
            onClick={() => setIsWizardOpen(true)}
            className="bg-slate-950 text-white px-10 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 transition-all shadow-xl active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
            New Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Invites Sent', value: requestsUsed.toString() },
          { label: 'Conversion', value: '18.4%', color: 'text-emerald-600' },
          { label: 'SMS Reach', value: '98%' },
          { label: 'Email Open', value: '42%' }
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:border-emerald-500 transition-colors">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
            <h3 className={`text-3xl font-black ${stat.color || 'text-slate-900'}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[48px] border border-slate-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        <div className="p-10 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-black uppercase italic text-slate-900">Campaign History</h3>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 text-slate-400 rounded-full border border-slate-100">
             <span className="text-[9px] font-black uppercase tracking-widest">Real-time sync active</span>
          </div>
        </div>
        
        {campaigns.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-6">
            <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center text-5xl">🚀</div>
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-slate-900 uppercase italic">Ready for growth?</h4>
              <p className="text-slate-400 text-sm font-medium max-w-sm mx-auto">Launch your first automated review campaign to start seeing stars today.</p>
            </div>
            <button onClick={() => setIsWizardOpen(true)} className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-600 hover:underline">Start First Flow →</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-10 py-5">Campaign Identity</th>
                  <th className="px-10 py-5">Status</th>
                  <th className="px-10 py-5 text-center">Invites</th>
                  <th className="px-10 py-5 text-center">New Stars</th>
                  <th className="px-10 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-8">
                      <p className="text-sm font-black text-slate-900 uppercase leading-none">{c.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1.5">{c.type} • {c.date}</p>
                    </td>
                    <td className="px-10 py-8">
                      <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">{c.status}</span>
                    </td>
                    <td className="px-10 py-8 text-center text-base font-black text-slate-900">{c.sent}</td>
                    <td className="px-10 py-8 text-center text-base font-black text-emerald-600">+{c.reviews}</td>
                    <td className="px-10 py-8 text-right">
                       <button onClick={() => deleteCampaign(c.id)} className="text-[9px] font-black uppercase text-slate-300 hover:text-rose-500 transition-colors">Terminate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-[#0F172A] p-10 md:p-14 rounded-[64px] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group border-b-8 border-emerald-500">
         <div className="relative z-10 space-y-6 max-w-2xl">
            <span className="text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px]">Zero Friction Integration</span>
            <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-[0.95]">Sync Your <span className="text-emerald-500 underline decoration-white/10 underline-offset-[12px]">Point of Sale</span>.</h3>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">Connect Shopify, Square, or HubSpot to automatically trigger review requests the second a customer makes a purchase.</p>
         </div>
         <button className="relative z-10 bg-white text-slate-900 px-12 py-6 rounded-[32px] font-black uppercase tracking-widest text-xs hover:bg-emerald-600 hover:text-white transition-all active:scale-95 shadow-xl shrink-0">Connect POS System</button>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-1000" />
      </div>

      {isWizardOpen && (
        <RequestWizard 
          onClose={() => setIsWizardOpen(false)} 
          onLaunch={handleLaunchCampaign}
        />
      )}
    </div>
  );
};

export default RequestsManager;
