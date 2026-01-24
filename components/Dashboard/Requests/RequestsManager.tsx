
import React, { useState } from 'react';
import RequestWizard from './RequestWizard';

interface RequestsManagerProps {
  requestsUsed: number;
  isTrial: boolean;
  onUpgrade?: () => void;
}

const RequestsManager: React.FC<RequestsManagerProps> = ({ requestsUsed, isTrial, onUpgrade }) => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]); // Fresh start

  const stats = [
    { label: 'Total Sent', value: '0', color: 'text-slate-900' },
    { label: 'Open Rate', value: '0%', color: 'text-slate-400' },
    { label: 'Click Rate', value: '0%', color: 'text-slate-400' },
    { label: 'Conversion', value: '0%', color: 'text-slate-400' },
  ];

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
                  <th className="px-8 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-slate-900">{campaign.name}</p>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-600">{campaign.type}</td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{campaign.status}</span>
                    </td>
                    <td className="px-8 py-6 text-center text-sm font-bold">{campaign.sent}</td>
                    <td className="px-8 py-6 text-center text-sm font-bold text-[#16A34A]">{campaign.reviews}</td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-slate-400 hover:text-slate-900 transition-colors p-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isWizardOpen && (
        <RequestWizard onClose={() => setIsWizardOpen(false)} />
      )}
    </div>
  );
};

export default RequestsManager;
