import React, { useState, useEffect } from 'react';

const StrategyProgress: React.FC = () => {
  const [activeStrategy, setActiveStrategy] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  const loadStrategy = () => {
    const saved = localStorage.getItem('g5sr_active_strategy');
    if (saved) {
      const parsed = JSON.parse(saved);
      setActiveStrategy(parsed);
      setTasks(parsed.tasks || []);
    } else {
      setActiveStrategy(null);
      setTasks([]);
    }
  };

  useEffect(() => {
    loadStrategy();
    
    // Listen for custom activation event
    window.addEventListener('g5sr_strategy_updated', loadStrategy);
    return () => window.removeEventListener('g5sr_strategy_updated', loadStrategy);
  }, []);

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    
    if (activeStrategy) {
      localStorage.setItem('g5sr_active_strategy', JSON.stringify({
        ...activeStrategy,
        tasks: updatedTasks
      }));
    }
  };

  if (!activeStrategy) return null;

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  // Group tasks by week for better UI
  const weeks = Array.from(new Set(tasks.map(t => t.week))).sort((a, b) => (a as number) - (b as number));

  return (
    <div className="bg-slate-900 rounded-[40px] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden animate-in slide-in-from-left-4 duration-500">
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Active Campaign</span>
            <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">30-Day Ranking <br /> <span className="text-emerald-500">Blueprint</span></h3>
          </div>
          
          <div className="space-y-4">
             <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-400 uppercase">Overall Completion</span>
                <span className="text-2xl font-black text-emerald-400">{Math.round(progress)}%</span>
             </div>
             <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-1000 shadow-[0_0_20px_rgba(16,185,129,0.5)]" 
                  style={{ width: `${progress}%` }}
                ></div>
             </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-4">
             <p className="text-xs text-slate-400 leading-relaxed font-medium italic">"{activeStrategy.summary}"</p>
             <button 
              onClick={() => {
                if(confirm("Are you sure you want to archive this strategy? Your progress will be reset.")) {
                  localStorage.removeItem('g5sr_active_strategy');
                  setActiveStrategy(null);
                }
              }}
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-rose-400 transition-colors"
             >
               Archive Strategy
             </button>
          </div>
        </div>

        <div className="flex-1 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {weeks.map(weekNum => (
                <div key={weekNum as number} className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-xs font-black border border-white/10">W{weekNum as number}</div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Week {weekNum as number} Focus</h4>
                   </div>
                   <div className="space-y-3">
                      {tasks.filter(t => t.week === weekNum).map(task => (
                        <button 
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          className={`w-full flex items-start gap-3 p-3 rounded-2xl transition-all border text-left group ${
                            task.completed 
                            ? 'bg-emerald-50/5 border-emerald-500/20 text-slate-500' 
                            : 'bg-white/5 border-white/5 hover:border-emerald-500/40 text-slate-100'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-lg border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                            task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-700 group-hover:border-emerald-500'
                          }`}>
                            {task.completed && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>}
                          </div>
                          <span className={`text-xs font-bold leading-relaxed ${task.completed ? 'line-through' : ''}`}>
                            {task.text}
                          </span>
                        </button>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyProgress;
