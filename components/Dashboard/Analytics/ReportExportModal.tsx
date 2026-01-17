
import React, { useState } from 'react';

interface ReportExportModalProps {
  onClose: () => void;
}

const ReportExportModal: React.FC<ReportExportModalProps> = ({ onClose }) => {
  const [selectedMetrics, setSelectedMetrics] = useState(['rating', 'growth', 'sentiment']);
  const [isScheduling, setIsScheduling] = useState(false);

  const toggleMetric = (id: string) => {
    setSelectedMetrics(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-2xl font-black text-slate-900">Configure Report</h3>
            <p className="text-sm text-slate-500 mt-1">Select data to include in your export.</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white rounded-full text-slate-400 shadow-sm border border-slate-200 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-10 space-y-8">
          <section className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Metrics</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'rating', label: 'Rating Distribution', icon: '⭐' },
                { id: 'growth', label: 'Growth Over Time', icon: '📈' },
                { id: 'sentiment', label: 'Sentiment Analysis', icon: '🧠' },
                { id: 'team', label: 'Team Performance', icon: '👥' },
                { id: 'keywords', label: 'Keyword Clouds', icon: '🏷️' },
                { id: 'platforms', label: 'Platform Comparison', icon: '🏢' },
              ].map(m => (
                <button 
                  key={m.id}
                  onClick={() => toggleMetric(m.id)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedMetrics.includes(m.id) ? 'border-blue-600 bg-blue-50/50' : 'border-slate-50 hover:border-slate-100'
                  }`}
                >
                  <span className="text-xl">{m.icon}</span>
                  <span className="text-xs font-bold text-slate-900">{m.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4 pt-8 border-t border-slate-100">
             <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Schedule Email Report</h4>
                  <p className="text-xs text-slate-500">Automatically send this report every week.</p>
                </div>
                <button 
                  onClick={() => setIsScheduling(!isScheduling)}
                  className={`w-12 h-6 rounded-full relative transition-all ${isScheduling ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isScheduling ? 'right-1 shadow-sm' : 'left-1'}`}></div>
                </button>
             </div>
             {isScheduling && (
               <div className="flex gap-3 animate-in fade-in slide-in-from-top-2">
                 <input type="email" placeholder="manager@example.com" className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                 <select className="bg-slate-50 border border-slate-200 px-4 rounded-xl text-xs font-bold">
                   <option>Weekly</option>
                   <option>Monthly</option>
                 </select>
               </div>
             )}
          </section>

          <div className="flex gap-4 pt-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/></svg>
              Download PDF
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              Export CSV
            </button>
          </div>
        </div>

        <div className="p-6 bg-slate-50 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Powered by Get5StarsReview Engine v4.2
        </div>
      </div>
    </div>
  );
};

export default ReportExportModal;
