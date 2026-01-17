
import React from 'react';

interface PerformanceGraphProps {
  isTrial?: boolean;
}

const PerformanceGraph: React.FC<PerformanceGraphProps> = ({ isTrial = false }) => {
  // Mock data for simplified visual representation
  const points = [40, 65, 55, 85, 75, 95, 80, 110, 105, 130];
  const max = Math.max(...points);
  const height = 150;
  
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8 relative group">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Review Performance</h3>
          <p className="text-sm text-slate-500">
            {isTrial ? "Trial Mode: Showing last 7 days of activity only." : "Reviews collected over the last 30 days."}
          </p>
        </div>
        <select disabled={isTrial} className={`bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-3 py-2 focus:outline-none ${isTrial ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
          <option>Year to Date</option>
        </select>
      </div>

      <div className={`relative h-[200px] w-full mt-4 flex items-end justify-between px-2 ${isTrial ? 'mask-right' : ''}`}>
        {points.map((p, idx) => (
          <div key={idx} className={`flex flex-col items-center gap-2 group flex-1 max-w-[40px] transition-all ${isTrial && idx < 3 ? 'opacity-20 blur-[1px]' : ''}`}>
            <div className="w-full relative">
               <div 
                className={`w-full ${isTrial && idx < 3 ? 'bg-slate-100' : 'bg-blue-100 group-hover:bg-blue-600'} rounded-t-lg transition-all duration-300 relative group`}
                style={{ height: `${(p / max) * height}px` }}
              >
                {!isTrial && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {p} reviews
                  </div>
                )}
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-400">Oct {idx + 1}</span>
          </div>
        ))}

        {isTrial && (
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent flex items-center justify-center pointer-events-none">
             <div className="bg-slate-900/10 backdrop-blur-[2px] p-4 rounded-2xl border border-white/20 translate-x-[-150px]">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Historical Data Locked</p>
             </div>
          </div>
        )}

        {/* Background grid lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-slate-50"></div>
        <div className="absolute inset-x-0 top-1/4 h-px bg-slate-50"></div>
        <div className="absolute inset-x-0 top-2/4 h-px bg-slate-50"></div>
        <div className="absolute inset-x-0 top-3/4 h-px bg-slate-50"></div>
      </div>
    </div>
  );
};

export default PerformanceGraph;
