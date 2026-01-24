
import React from 'react';

const AdvancedGrowthChart: React.FC = () => {
  // Fresh account has no trend data
  const data: number[] = [];
  const prevData: number[] = [];
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

      <div className="h-64 flex items-center justify-center relative bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100">
         <div className="text-center space-y-2 opacity-40">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">No Historical Data</p>
            <p className="text-[9px] font-medium text-slate-500 max-w-[200px]">Data will populate automatically once your first 5 reviews are recorded.</p>
         </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
        <div className="flex gap-8">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Peak Day</p>
            <p className="text-sm font-black text-slate-200">Awaiting Data</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Weekly Goal</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-black text-slate-200">0 / 50</p>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-100"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedGrowthChart;
