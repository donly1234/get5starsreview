
import React from 'react';

const AgencyMetrics: React.FC = () => {
  const stats = [
    { label: 'Total Clients', value: '24', detail: '3 pending onboarding', color: 'text-blue-600', icon: '🏢' },
    { label: 'Reseller Profit', value: '$4,280', detail: '32% margin', color: 'text-emerald-600', icon: '💰' },
    { label: 'Network Avg. Rating', value: '4.72', detail: 'Across 12k reviews', color: 'text-yellow-600', icon: '⭐' },
    { label: 'Active SMS Flows', value: '142', detail: '8.2k sent this month', color: 'text-purple-600', icon: '📱' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm group hover:border-blue-200 transition-all">
            <div className="flex items-start justify-between mb-4">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</span>
            </div>
            <h3 className={`text-3xl font-black ${s.color}`}>{s.value}</h3>
            <p className="text-[11px] font-bold text-slate-500 mt-2">{s.detail}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 p-8 rounded-[40px] text-white relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-black leading-tight">Quarterly Growth Analytics</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Your network has seen a 14% increase in reviews since July. Clients in the "Hospitality" sector are currently your highest-performing niche.</p>
            <div className="flex gap-4">
               <div className="bg-white/10 px-4 py-3 rounded-2xl border border-white/10">
                 <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">New Clients</p>
                 <p className="text-xl font-bold">+5</p>
               </div>
               <div className="bg-white/10 px-4 py-3 rounded-2xl border border-white/10">
                 <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Churn Rate</p>
                 <p className="text-xl font-bold">1.2%</p>
               </div>
            </div>
          </div>
          <div className="h-48 flex items-end gap-2">
            {[30, 45, 35, 60, 55, 80, 75, 90, 85, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-600/50 rounded-t-lg transition-all hover:bg-blue-500" style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </div>
        <div className="absolute top-[-100px] right-[-100px] w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
};

export default AgencyMetrics;
