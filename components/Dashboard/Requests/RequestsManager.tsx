
import React, { useState } from 'react';
import RequestWizard from './RequestWizard';

interface RequestsManagerProps {
  requestsUsed: number;
  isTrial: boolean;
  onUpgrade?: () => void;
}

const RequestsManager: React.FC<RequestsManagerProps> = ({ requestsUsed: initialRequests, isTrial, onUpgrade }) => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [requestsUsed, setRequestsUsed] = useState(initialRequests);
  const [campaigns, setCampaigns] = useState<any[]>([]); 

  const stats = [
    { label: 'Total Sent', value: requestsUsed.toString(), color: 'text-slate-900' },
    { label: 'Open Rate', value: campaigns.length > 0 ? '92%' : '0%', color: 'text-slate-900' },
    { label: 'Click Rate', value: campaigns.length > 0 ? '48%' : '0%', color: 'text-slate-900' },
    { label: 'Conversion', value: campaigns.length > 0 ? '12%' : '0%', color: 'text-[#16A34A]' },
  ];

  const handleLaunchCampaign = () => {
    const newCampaign = {
      id: Date.now(),
      name: `Automation Batch #${campaigns.length + 1}`,
      type: 'SMS + Email',
      status: 'Active',
      sent: 5,
      reviews: 2,
      date: 'Just now'
    };
    setCampaigns([newCampaign, ...campaigns]);
    setRequestsUsed(prev => prev + 5);
    setIsWizardOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Review Requests</h1>
          <p className="text-slate-500 text-sm font-medium">Launch automated SMS and email campaigns to collect 5-star reviews.</p>
        </div>
        <button 
          onClick={() => setIsWizardOpen(true)}
          className="bg-[#16A34A] text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-xl active:scale-95 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm group hover:border-[#16A34A] transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <h3 className={`text-3xl font-black ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-black uppercase italic text-slate-900">Active Campaigns</h3>
          {campaigns.length > 0 && (
             <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[9px] font-black uppercase tracking-widest">Automation Online</span>
             </div>
          )}
        </div>
        
        {campaigns.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-6">🚀</div>
            <h4 className="text-xl font-black text-slate-900 uppercase italic mb-2">No Campaigns Active</h4>
            <p className="text-slate-400 text-sm font-medium max-w-sm">Launch your first review request campaign to start building your 5-star reputation on Google Maps.</p>
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="mt-8 text-[10px] font-black uppercase tracking-widest text-[#16A34A] hover:underline"
            >
              Start My First Campaign →
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">Campaign Name</th>
                  <th className="px-8 py-4">Type</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-center">Sent</th>
                  <th className="px-8 py-4 text-center">Reviews</th>
                  <th className="px-8 py-4 text-right pr-12">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-slate-900">{campaign.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{campaign.date}</p>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-1 rounded">{campaign.type}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">{campaign.status}</span>
                    </td>
                    <td className="px-8 py-6 text-center text-sm font-bold">{campaign.sent}</td>
                    <td className="px-8 py-6 text-center text-sm font-bold text-[#16A34A]">{campaign.reviews}</td>
                    <td className="px-8 py-6 text-right pr-8">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="text-[9px] font-black uppercase text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">Edit</button>
                         <button className="text-[9px] font-black uppercase text-slate-400 hover:text-rose-500 px-3 py-1.5 rounded-lg">Pause</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-[#0F172A] p-8 md:p-12 rounded-[48px] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
         <div className="relative z-10 space-y-4 max-w-xl">
            <span className="text-[#16A34A] font-black uppercase tracking-[0.3em] text-[10px]">Integration Hub</span>
            <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-tight">Sync With Your POS</h3>
            <p className="text-slate-400 text-sm font-medium">Connect Square, Shopify, or Jobber to automatically trigger review requests the moment a transaction is closed.</p>
         </div>
         <button className="relative z-10 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#16A34A] hover:text-white transition-all active:scale-95 shadow-xl">Connect POS System</button>
         <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
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
