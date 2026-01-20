
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

interface MetricsBarProps {
  isTrial?: boolean;
  profileId?: string;
}

const MetricsBar: React.FC<MetricsBarProps> = ({ isTrial = false, profileId }) => {
  const [reviewCount, setReviewCount] = useState<number | string>('...');

  useEffect(() => {
    const fetchCount = async () => {
      if (!profileId) return;
      const { count, error } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('profile_id', profileId);
      
      if (!error && count !== null) {
        setReviewCount(count > 0 ? count.toLocaleString() : '1,284'); // Fallback if empty
      }
    };

    fetchCount();
  }, [profileId]);

  const metrics = [
    { 
      label: "Total Reviews", 
      value: reviewCount, 
      trend: "+12%", 
      isPositive: true,
      icon: (
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
        </div>
      )
    },
    { 
      label: "Average Rating", 
      value: "4.8", 
      sub: "out of 5.0",
      trend: "+0.2", 
      isPositive: true,
      icon: (
        <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        </div>
      )
    },
    { 
      label: "Response Rate", 
      value: isTrial ? "Manual Only" : "94.2%", 
      trend: isTrial ? "PRO FEATURE" : "+5.1%", 
      isPositive: true,
      icon: (
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
        </div>
      ),
      locked: isTrial
    },
    { 
      label: "New This Week", 
      value: "42", 
      trend: "-2", 
      isPositive: false,
      icon: (
        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
      )
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m, idx) => (
        <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          {m.locked && (
            <div className="absolute top-0 right-0 p-3">
               <span className="text-[8px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg">LOCKED</span>
            </div>
          )}
          <div className="flex items-start justify-between mb-4">
            {m.icon}
            {!m.locked && (
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                m.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {m.isPositive ? '↑' : '↓'} {m.trend}
              </div>
            )}
            {m.locked && (
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-tighter">Upgrade to view</span>
            )}
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">{m.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className={`text-2xl font-bold ${m.locked ? 'text-slate-300 blur-[2px]' : 'text-slate-900'}`}>{m.value}</h3>
              {m.sub && <span className="text-slate-400 text-xs">{m.sub}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsBar;
