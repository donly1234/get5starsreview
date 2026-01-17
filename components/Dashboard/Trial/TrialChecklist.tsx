
import React, { useState } from 'react';

const TrialChecklist: React.FC = () => {
  const [completed, setCompleted] = useState<number[]>([1]); // Default first step complete for demo

  const items = [
    { id: 1, title: 'Complete Business Profile', time: '1 min', icon: '🏢' },
    { id: 2, title: 'Connect Your First Platform', time: '2 min', icon: '🔌' },
    { id: 3, title: 'Send 5 Review Requests', time: '1 min', icon: '📱' },
    { id: 4, title: 'Install Review Widget', time: '3 min', icon: '🎨' },
  ];

  const progress = (completed.length / items.length) * 100;

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <div>
          <h3 className="text-xl font-black text-slate-900">Success Checklist</h3>
          <p className="text-slate-500 text-sm mt-1">Complete these tasks to get the most out of your 14-day trial.</p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
           <div className="flex items-center gap-3">
             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{completed.length} of {items.length} Complete</span>
             <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const isDone = completed.includes(item.id);
          return (
            <button 
              key={item.id}
              onClick={() => {
                if (!isDone) setCompleted([...completed, item.id]);
                else setCompleted(completed.filter(id => id !== item.id));
              }}
              className={`p-6 rounded-3xl border-2 text-left transition-all relative group ${
                isDone ? 'bg-emerald-50/30 border-emerald-200' : 'bg-white border-slate-100 hover:border-slate-200'
              }`}
            >
              {isDone && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
              )}
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h5 className={`font-bold text-sm leading-tight mb-2 ${isDone ? 'text-emerald-700' : 'text-slate-900'}`}>{item.title}</h5>
              <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {item.time}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TrialChecklist;
