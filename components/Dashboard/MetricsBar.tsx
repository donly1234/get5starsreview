import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

interface MetricsBarProps {
  isTrial?: boolean;
  profileId?: string;
}

const MetricsBar: React.FC<MetricsBarProps> = ({ isTrial = false, profileId }) => {
  const [metrics, setMetrics] = useState({
    reviewCount: 0,
    avgRating: 0,
    responseRate: 0,
    newThisWeek: 0,
    loading: true
  });

  useEffect(() => {
    const fetchRealData = async () => {
      if (!profileId) return;
      
      const { data: reviews, error } = await supabase
        .from('reviews')
        .select('rating, responded, created_at')
        .eq('profile_id', profileId);
      
      if (!error && reviews) {
        const count = reviews.length;
        const avg = count > 0 ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / count : 0;
        const respondedCount = reviews.filter(r => r.responded).length;
        const rate = count > 0 ? (respondedCount / count) * 100 : 0;
        
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const recentCount = reviews.filter(r => new Date(r.created_at) > oneWeekAgo).length;

        setMetrics({
          reviewCount: count,
          avgRating: Number(avg.toFixed(1)),
          responseRate: Math.round(rate),
          newThisWeek: recentCount,
          loading: false
        });
      } else {
        setMetrics(prev => ({ ...prev, loading: false }));
      }
    };

    fetchRealData();
  }, [profileId]);

  const displayMetrics = [
    { 
      label: "Total Reviews", 
      value: metrics.loading ? "..." : metrics.reviewCount.toLocaleString(), 
      trend: metrics.reviewCount > 0 ? "+1" : "0", 
      isPositive: true,
      icon: (
        <div className="p-1.5 md:p-2 bg-blue-50 text-blue-600 rounded-lg">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
        </div>
      )
    },
    { 
      label: "Avg. Rating", 
      value: metrics.loading ? "..." : metrics.avgRating > 0 ? metrics.avgRating : "0.0", 
      sub: "out of 5",
      trend: "0.0", 
      isPositive: true,
      icon: (
        <div className="p-1.5 md:p-2 bg-yellow-50 text-yellow-600 rounded-lg">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        </div>
      )
    },
    { 
      label: "Response Rate", 
      value: isTrial ? "Locked" : metrics.loading ? "..." : `${metrics.responseRate}%`, 
      trend: isTrial ? "PRO" : "Live", 
      isPositive: true,
      icon: (
        <div className="p-1.5 md:p-2 bg-emerald-50 text-emerald-600 rounded-lg">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
        </div>
      ),
      locked: isTrial
    },
    { 
      label: "New This Week", 
      value: metrics.loading ? "..." : metrics.newThisWeek.toString(), 
      trend: "Live", 
      isPositive: true,
      icon: (
        <div className="p-1.5 md:p-2 bg-purple-50 text-purple-600 rounded-lg">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
      )
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      {displayMetrics.map((m, idx) => (
        <div key={idx} className="bg-white p-4 sm:p-6 rounded-[24px] sm:rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            {m.icon}
            {!isTrial && !metrics.loading && (
              <div className={`hidden sm:flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full bg-slate-50 text-slate-400 uppercase tracking-widest`}>
                {m.trend}
              </div>
            )}
            {isTrial && m.label === "Response Rate" && (
              <span className="text-[7px] md:text-[8px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded uppercase tracking-widest">LOCKED</span>
            )}
          </div>
          <div>
            <p className="text-slate-500 text-[8px] sm:text-xs font-black uppercase tracking-widest mb-0.5 sm:mb-1">{m.label}</p>
            <div className="flex items-baseline gap-1 sm:gap-2">
              <h3 className={`text-lg sm:text-2xl font-black text-slate-900`}>{m.value}</h3>
              {m.sub && <span className="text-slate-400 text-[8px] font-bold uppercase hidden sm:inline">{m.sub}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsBar;
