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
    loading: true,
    hasConnected: false
  });

  useEffect(() => {
    const fetchRealData = async () => {
      if (!profileId) {
        setMetrics(prev => ({ ...prev, loading: false }));
        return;
      }
      
      const { data: reviews, error } = await supabase
        .from('reviews')
        .select('rating, responded, created_at')
        .eq('profile_id', profileId);
      
      if (!error && reviews && reviews.length > 0) {
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
          loading: false,
          hasConnected: true
        });
      } else {
        setMetrics(prev => ({ ...prev, loading: false, hasConnected: false }));
      }
    };

    fetchRealData();
  }, [profileId]);

  const displayMetrics = [
    { 
      label: "Profile Authority", 
      value: metrics.loading ? "..." : !metrics.hasConnected ? "0" : metrics.reviewCount.toLocaleString(), 
      trend: metrics.hasConnected ? "G-Sync" : "No Sync", 
      icon: "🏢"
    },
    { 
      label: "Customer Sentiment", 
      value: metrics.loading ? "..." : !metrics.hasConnected ? "0.0" : metrics.avgRating, 
      sub: "/ 5.0",
      trend: "Real-time", 
      icon: "⭐"
    },
    { 
      label: "Response Health", 
      value: isTrial ? "Locked" : metrics.loading ? "..." : !metrics.hasConnected ? "0%" : `${metrics.responseRate}%`, 
      trend: isTrial ? "Pro" : "Active", 
      icon: "✉️",
      locked: isTrial
    },
    { 
      label: "Growth Velocity", 
      value: metrics.loading ? "..." : !metrics.hasConnected ? "0" : metrics.newThisWeek.toString(), 
      trend: "Last 7d", 
      icon: "📈"
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {displayMetrics.map((m, idx) => (
        <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#16A34A] transition-all">
          <div className="flex items-start justify-between mb-4">
            <span className="text-2xl">{m.icon}</span>
            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${!metrics.hasConnected && m.trend !== 'Active' ? 'bg-rose-50 text-rose-500' : m.label === 'Response Health' && isTrial ? 'bg-[#0F172A] text-white' : 'bg-slate-50 text-slate-400'}`}>
              {m.trend}
            </span>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{m.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className={`text-2xl md:text-3xl font-black ${metrics.loading ? 'text-slate-200' : 'text-[#0F172A]'}`}>{m.value}</h3>
              {m.sub && <span className="text-slate-300 text-xs font-black">{m.sub}</span>}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50">
             <div className="h-full bg-[#16A34A] opacity-20 transition-all duration-1000" style={{ width: metrics.hasConnected ? '100%' : '0%' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsBar;
