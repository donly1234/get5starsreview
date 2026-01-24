
import React from 'react';

const SentimentInsights: React.FC = () => {
  const keywords: any[] = []; // Empty on fresh start

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col h-full">
        <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
          Keyword Cloud
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Top Topics</span>
        </h3>
        
        {keywords.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 opacity-60">
             <div className="text-2xl mb-2">🏷️</div>
             <p className="text-[9px] font-black uppercase tracking-widest text-slate-900">Scanning Sentiment...</p>
             <p className="text-[8px] font-medium text-slate-500 mt-1">Connect reviews to identify keyword patterns.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {keywords.map(k => (
              <div 
                key={k.word}
                className={`px-4 py-2 rounded-2xl border flex items-center gap-2 transition-all hover:scale-105 cursor-default ${
                  k.score >= 80 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                  k.score >= 60 ? 'bg-blue-50 border-blue-100 text-blue-700' :
                  'bg-rose-50 border-rose-100 text-rose-700'
                }`}
              >
                <span className="text-sm font-bold">{k.word}</span>
                <span className="text-[10px] font-black opacity-50">{k.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6">Sentiment Over Time</h3>
        <div className="space-y-6">
          <div className="relative h-24 w-full flex items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
             <p className="text-[8px] font-black uppercase text-slate-300">Wait for data stream</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Positive</p>
              <p className="text-lg font-black text-slate-200">0%</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Neutral</p>
              <p className="text-lg font-black text-slate-200">0%</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Negative</p>
              <p className="text-lg font-black text-slate-200">0%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentInsights;
