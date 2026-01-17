
import React from 'react';

const AdvancedGrowthChart: React.FC = () => {
  // Mock trend data
  const data = [12, 18, 15, 25, 32, 28, 45, 42, 38, 55, 62, 58];
  const prevData = [8, 12, 22, 18, 20, 24, 22, 28, 30, 32, 35, 30];
  const max = 70;

  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Review Growth Trend</h3>
          <p className="text-sm text-slate-500">Daily reviews collected vs previous 30 days.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600"></span>
            <span className="text-xs font-bold text-slate-600">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-200"></span>
            <span className="text-xs font-bold text-slate-600">Previous</span>
          </div>
        </div>
      </div>

      <div className="h-64 flex items-end gap-3 px-2 relative">
        {/* Background Grid */}
        <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full border-t border-slate-50"></div>
          ))}
        </div>

        {data.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-1 group/bar relative">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 bg-slate-900 text-white px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10">
              {val} reviews (+{val - prevData[i]})
            </div>

            {/* Previous Period Bar (Faded) */}
            <div 
              className="w-1.5 bg-slate-200/50 rounded-full transition-all duration-700 absolute left-1/4"
              style={{ height: `${(prevData[i] / max) * 100}%` }}
            ></div>

            {/* Current Period Bar */}
            <div 
              className="w-2.5 bg-blue-600 rounded-full transition-all duration-1000 delay-100 group-hover/bar:bg-blue-500 shadow-lg shadow-blue-500/10 z-[1]"
              style={{ height: `${(val / max) * 100}%` }}
            ></div>
            
            <span className="text-[9px] font-black text-slate-400 mt-2">W{i + 1}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
        <div className="flex gap-8">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Peak Day</p>
            <p className="text-sm font-black text-slate-900">Saturday (Avg. 12)</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Weekly Goal</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-black text-slate-900">45 / 50</p>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
            </div>
          </div>
        </div>
        <button className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all">
          View Raw Data
        </button>
      </div>
    </div>
  );
};

export default AdvancedGrowthChart;
