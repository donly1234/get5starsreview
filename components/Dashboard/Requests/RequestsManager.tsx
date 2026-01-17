
import React, { useState } from 'react';
import RequestWizard from './RequestWizard';

// added RequestsManagerProps to fix type errors in Dashboard.tsx
interface RequestsManagerProps {
  requestsUsed: number;
  isTrial: boolean;
  onUpgrade?: () => void;
}

const RequestsManager: React.FC<RequestsManagerProps> = ({ requestsUsed, isTrial, onUpgrade }) => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const stats = [
    { label: 'Total Sent', value: '1,402', color: 'text-blue-600' },
    { label: 'Open Rate', value: '60.1%', color: 'text-indigo-600' },
    { label: 'Click Rate', value: '42.5%', color: 'text-purple-600' },
    { label: 'Conversion', value: '38.5%', color: 'text-emerald-600' },
  ];

  const recentCampaigns = [
    { id: 1, name: 'October Post-Purchase', type: 'Email/SMS', status: 'Running', sent: 450, reviews: 120 },
    { id: 2, name: 'Dormant Customers Re-engagement', type: 'SMS', status: 'Completed', sent: 800, reviews: 45 },
    { id: 3, name: 'VIP Weekend Special', type: 'Email', status: 'Scheduled', sent: 0, reviews: 0 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Review Request System</h1>
          <p className="text-slate-500">Automate your review generation and monitor performance.</p>
        </div>
        <button 
          onClick={() => setIsWizardOpen(true)}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
            <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Recent Campaigns</h3>
          <button className="text-sm text-blue-600 font-semibold hover:underline">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Campaign Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Sent</th>
                <th className="px-6 py-4 text-center">Reviews</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{campaign.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{campaign.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                      campaign.status === 'Running' ? 'text-emerald-600' : campaign.status === 'Completed' ? 'text-slate-500' : 'text-blue-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        campaign.status === 'Running' ? 'bg-emerald-600 animate-pulse' : campaign.status === 'Completed' ? 'bg-slate-500' : 'bg-blue-600'
                      }`}></span>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-slate-600">{campaign.sent}</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-600">{campaign.reviews}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isWizardOpen && (
        <RequestWizard onClose={() => setIsWizardOpen(false)} />
      )}
    </div>
  );
};

export default RequestsManager;
