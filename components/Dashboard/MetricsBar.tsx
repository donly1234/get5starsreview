
import React from 'react';

interface MetricsBarProps {
  isTrial?: boolean;
  profileId?: string;
}

const MetricsBar: React.FC<MetricsBarProps> = ({ isTrial = false }) => {
  const metrics = [
    { 
      label: "Authority Index", 
      value: "4.9", 
      trend: "Sync OK", 
      icon: "🏢", 
      color: "text-emerald-500", 
      progress: 92,
      sub: "G-Maps Rank"
    },
    { 
      label: "Sentiment Score", 
      value: "98%", 
      trend: "+2% MoM", 
      icon: "⭐", 
      color: "text-yellow-500", 
      progress: 98,
      sub: "AI Analyzed"
    },
    { 
      label: "Response Health", 
      value: isTrial ? "Manual" : "100%", 
      trend: isTrial ? "Trial" : "Live", 
      icon: "✉️", 
      color: "text-blue-500", 
      progress: isTrial ? 15 : 100,
      sub: "AI Auto-Pilot"
    },
    { 
      label: "Growth Velocity", 
      value: "+12", 
      trend: "Active", 
      icon: "📈", 
      color: "text-purple-500", 
      progress: 65,
      sub: "Last 7 Days"
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {metrics.map((m, idx) => (
        <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-green-500 transition-all duration-500">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
              {m.icon}
            </div>
            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${m.label === 'Response Health' && isTrial ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}>
              {m.trend}
            </span>
          </div>
          <div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">{m.label}</p>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">{m.value}</h3>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase italic">{m.sub}</p>
          </div>
          <div className="mt-4 w-full h-1 bg-slate-50 rounded-full overflow-hidden">
             <div 
              className="h-full bg-green-500 transition-all duration-[2s] delay-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
              style={{ width: `${m.progress}%` }}
             ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsBar;
