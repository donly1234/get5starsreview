
import React, { useState } from 'react';
import AdvancedGrowthChart from './AdvancedGrowthChart';
import SentimentInsights from './SentimentInsights';
import TeamPerformance from './TeamPerformance';
import ReportExportModal from './ReportExportModal';

const AnalyticsManager: React.FC = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [isExportOpen, setIsExportOpen] = useState(false);

  const keyMetrics = [
    { label: 'Avg. Rating', value: '4.85', trend: '+0.12', detail: 'vs Prev. Period', color: 'text-yellow-600' },
    { label: 'Review Velocity', value: '6.4', trend: '+22%', detail: 'Reviews/Day', color: 'text-blue-600' },
    { label: 'Response Time', value: '4.2h', trend: '-1.5h', detail: 'Avg. Turnaround', color: 'text-emerald-600' },
    { label: 'Net Sentiment', value: '92', trend: '+4', detail: 'Scale: 1-100', color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Advanced Analytics</h1>
          <p className="text-slate-500">In-depth data to help you understand customer satisfaction.</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-blue-500/20"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Year to Date</option>
          </select>
          <button 
            onClick={() => setIsExportOpen(true)}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Export Report
          </button>
        </div>
      </div>

      {/* STRATEGIC UPGRADE PROMPT FOR TRIAL USERS */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h3 className="text-2xl font-black">Unlock Advanced Insights</h3>
          <p className="text-blue-100 text-sm max-w-lg">Trial analytics are limited to basic metrics. Upgrade to Professional to see competitor benchmarking, keyword trends, and custom report builders.</p>
        </div>
        <button className="relative z-10 bg-white text-blue-700 px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-50 transition-all shadow-xl whitespace-nowrap active:scale-95">
          Unlock Professional Insights
        </button>
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {keyMetrics.map((m) => (
          <div key={m.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className={`text-2xl font-black ${m.color}`}>{m.value}</h3>
              <span className="text-[10px] font-bold text-emerald-500">{m.trend}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-medium">{m.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AdvancedGrowthChart />
          <SentimentInsights />
        </div>
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
              Rating Distribution
              <span className="text-xs text-slate-400 font-medium">All Sources</span>
            </h3>
            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map((star) => {
                const percentages = { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 };
                const pct = percentages[star as keyof typeof percentages];
                return (
                  <div key={star} className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-500 w-4">{star}★</span>
                    <div className="flex-1 bg-slate-50 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${star >= 4 ? 'bg-emerald-500' : star === 3 ? 'bg-yellow-400' : 'bg-rose-500'}`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 w-8">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <TeamPerformance />

          <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-xl">💡</div>
            <h4 className="font-bold mb-2">AI Recommendation</h4>
            <p className="text-sm text-blue-100 leading-relaxed">
              "You have a peak in Yelp reviews on Saturdays. Consider scheduling your review request campaigns to send on Monday mornings to capture post-weekend excitement."
            </p>
            <button className="mt-4 text-xs font-bold bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
              Optimize Schedule
            </button>
          </div>
        </div>
      </div>

      {isExportOpen && <ReportExportModal onClose={() => setIsExportOpen(false)} />}
    </div>
  );
};

export default AnalyticsManager;
