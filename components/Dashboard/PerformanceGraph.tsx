import React from 'react';

interface PerformanceGraphProps {
  isTrial?: boolean;
  profileId?: string;
}

const PerformanceGraph: React.FC<PerformanceGraphProps> = ({ isTrial = false, profileId }) => {
  // Logic to show empty state if no profileId or data is found
  const hasData = profileId ? false : false; // For now strictly showing empty for setup
  
  const points = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const max = 100;
  const height = 150;
  
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8 relative group">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 uppercase italic">Review Velocity</h3>
          <p className="text-sm text-slate-500 font-medium">
            {isTrial ? "Trial Mode: Real-time sync active." : "Historical performance tracking."}
          </p>
        </div>
        <div className="bg-[#0F172A] px-3 py-1 rounded-lg text-white text-[10px] font-black uppercase tracking-widest">
           Live Feed
        </div>
      </div>

      <div className={`relative h-[200px] w-full mt-4 flex items-end justify-between px-2 ${!hasData ? 'opacity-20 grayscale' : ''}`}>
        {points.map((p, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 group flex-1 max-w-[40px] transition-all">
            <div className="w-full relative">
               <div 
                className="w-full bg-slate-100 rounded-t-lg transition-all duration-300 relative group"
                style={{ height: `4px` }}
              >
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-400">Day {idx + 1}</span>
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-slate-100 shadow-xl text-center space-y-2">
              <p className="text-sm font-black text-[#0F172A] uppercase tracking-widest">Awaiting Sync</p>
              <p className="text-[10px] text-slate-500 font-bold max-w-[200px]">Connect your Google Business Profile to populate performance trends.</p>
           </div>
        </div>

        <div className="absolute inset-x-0 top-0 h-px bg-slate-50"></div>
        <div className="absolute inset-x-0 top-1/4 h-px bg-slate-50"></div>
        <div className="absolute inset-x-0 top-2/4 h-px bg-slate-50"></div>
        <div className="absolute inset-x-0 top-3/4 h-px bg-slate-50"></div>
      </div>
    </div>
  );
};

export default PerformanceGraph;
