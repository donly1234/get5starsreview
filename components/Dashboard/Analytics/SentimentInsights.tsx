
import React from 'react';

const SentimentInsights: React.FC = () => {
  const keywords = [
    { word: 'Fresh', score: 95, count: 142 },
    { word: 'Service', score: 88, count: 98 },
    { word: 'Price', score: 72, count: 65 },
    { word: 'Waiting', score: 35, count: 42 },
    { word: 'Waitstaff', score: 92, count: 38 },
    { word: 'Atmosphere', score: 98, count: 35 },
    { word: 'Parking', score: 45, count: 28 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
          Keyword Cloud
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Top 7 Topics</span>
        </h3>
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
        <div className="mt-8 pt-6 border-t border-slate-50">
          <p className="text-xs text-slate-500 leading-relaxed italic">
            "Fresh" and "Service" are driving your 5-star reviews. "Waiting" is the most frequent keyword in your 2-3 star reviews.
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6">Sentiment Over Time</h3>
        <div className="space-y-6">
          <div className="relative h-24 w-full flex items-end gap-1">
            {[...Array(20)].map((_, i) => {
              const h = 20 + Math.random() * 80;
              return (
                <div 
                  key={i} 
                  className={`flex-1 rounded-t-sm transition-all duration-1000 ${h > 60 ? 'bg-emerald-400' : h > 40 ? 'bg-blue-400' : 'bg-rose-400'}`}
                  style={{ height: `${h}%` }}
                ></div>
              );
            })}
            <div className="absolute inset-0 border-b border-slate-100"></div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
              <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Positive</p>
              <p className="text-lg font-black text-emerald-700">82%</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Neutral</p>
              <p className="text-lg font-black text-slate-600">12%</p>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
              <p className="text-[10px] font-black text-rose-600 uppercase mb-1">Negative</p>
              <p className="text-lg font-black text-rose-700">6%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentInsights;
