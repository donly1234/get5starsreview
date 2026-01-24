
import React, { useState } from 'react';
import RequestWizard from './RequestWizard';
import { logger } from '../../../utils/logger';
import { isFeatureEnabled } from '../../../config/featureFlags';

interface RequestsManagerProps {
  requestsUsed: number;
  isTrial: boolean;
  onUpgrade?: () => void;
}

const RequestsManager: React.FC<RequestsManagerProps> = ({ requestsUsed: initialRequests, isTrial, onUpgrade }) => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [requestsUsed, setRequestsUsed] = useState(initialRequests);
  const [isAutoEnabled, setIsAutoEnabled] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([
    { id: 1, name: 'Google Review Push', type: 'SMS', status: 'Running', sent: 12, reviews: 3, date: '2 days ago' }
  ]); 

  const handleLaunchCampaign = () => {
    try {
      const newCampaign = {
        id: Date.now(),
        name: `Campaign Batch #${campaigns.length + 1}`,
        type: 'SMS + Email',
        status: 'Active',
        sent: 5,
        reviews: 0,
        date: 'Just now'
      };
      setCampaigns([newCampaign, ...campaigns]);
      setRequestsUsed(prev => prev + 5);
      setIsWizardOpen(false);
    } catch (err) {
      logger.error("Failed to launch campaign", err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Review Requests</h1>
          <p className="text-slate-500 text-sm font-medium">Capture more 5-star reviews on auto-pilot.</p>
        </div>
        <div className="flex gap-3">
          {isFeatureEnabled('REQUEST_AUTOMATION') && (
            <button 
              onClick={() => setIsAutoEnabled(!isAutoEnabled)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all border-2 ${isAutoEnabled ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-400 border-slate-100 hover:border-green-500 hover:text-green-600'}`}
            >
              <div className={`w-2 h-2 rounded-full ${isAutoEnabled ? 'bg-white animate-pulse' : 'bg-slate-300'}`}></div>
              Automation: {isAutoEnabled ? 'ON' : 'OFF'}
            </button>
          )}
          <button 
            onClick={() => setIsWizardOpen(true)}
            className="bg-black text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-green-600 transition-all shadow-xl active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
            New Request
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Requests', value: requestsUsed.toString() },
          { label: 'Conversion Rate', value: '14.2%', color: 'text-green-600' },
          { label: 'SMS Response', value: '28%' },
          { label: 'Email Open', value: '42%' }
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <h3 className={`text-3xl font-black ${stat.color || 'text-slate-900'}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
        <div className="p-8 border-b border-slate-100">
          <h3 className="text-lg font-black uppercase italic text-slate-900">Campaign History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Name</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-center">Invites</th>
                <th className="px-8 py-4 text-center">Stars</th>
                <th className="px-8 py-4 text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-900">{c.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">{c.date}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{c.status}</span>
                  </td>
                  <td className="px-8 py-6 text-center text-sm font-black">{c.sent}</td>
                  <td className="px-8 py-6 text-center text-sm font-black text-green-600">+{c.reviews}</td>
                  <td className="px-8 py-6 text-right pr-8">
                     <button className="text-[10px] font-black uppercase text-slate-400 hover:text-red-500">Stop</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
