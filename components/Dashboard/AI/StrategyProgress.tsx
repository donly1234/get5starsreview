import React, { useState, useEffect, useMemo } from 'react';
import { logger } from '../../logger';

interface StrategyProgressProps {
  onLaunchStrategy?: () => void;
}

const StrategyProgress: React.FC<StrategyProgressProps> = ({ onLaunchStrategy }) => {
  const [activeStrategy, setActiveStrategy] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Completed'>('All');
  const [filterPriority, setFilterPriority] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');

  const loadStrategy = () => {
    try {
      const saved = localStorage.getItem('g5sr_active_strategy');
      if (saved) {
        const parsed = JSON.parse(saved);
        setActiveStrategy(parsed);
        setTasks(parsed.tasks || []);
      } else {
        setActiveStrategy(null);
      }
    } catch (e) {
      logger.error("Failed to load strategy", e);
    }
  };

  useEffect(() => {
    loadStrategy();
    window.addEventListener('g5sr_strategy_updated', loadStrategy);
    return () => window.removeEventListener('g5sr_strategy_updated', loadStrategy);
  }, []);

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    
    if (activeStrategy) {
      const newStrategy = { ...activeStrategy, tasks: updatedTasks };
      localStorage.setItem('g5sr_active_strategy', JSON.stringify(newStrategy));
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const statusMatch = filterStatus === 'All' || (filterStatus === 'Completed' ? t.completed : !t.completed);
      const priorityMatch = filterPriority === 'All' || t.priority === filterPriority;
      return statusMatch && priorityMatch;
    });
  }, [tasks, filterStatus, filterPriority]);

  if (!activeStrategy) {
    return (
      <div className="bg-slate-950 rounded-[40px] p-10 text-white shadow-2xl border-b-8 border-emerald-500/50 flex flex-col md:flex-row items-center gap-10">
         <div className="w-24 h-24 bg-emerald-600/20 rounded-[32px] flex items-center justify-center text-5xl shadow-inner border border-emerald-500/10 shrink-0">ðŸ§ </div>
         <div className="flex-1 text-center md:text-left space-y-2">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Intelligence Hub Offline</h3>
            <p className="text-slate-400 font-medium text-lg">Generate a custom 30-day AI Roadmap to dominate your local market pack.</p>
         </div>
         <button 
          onClick={onLaunchStrategy}
          className="px-10 py-5 bg-emerald-600 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-500/20 hover:bg-white hover:text-black transition-all active:scale-95 whitespace-nowrap"
         >
           Get AI Blueprint
         </button>
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;
  const currentWeek = tasks.find(t => !t.completed)?.week || 4;

  return (
    <div className="bg-slate-900 rounded-[48px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden animate-in slide-in-from-top-4 duration-700">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full" />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3 space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] bg-emerald-500/10 px-3 py-1 rounded-full">Mission Active</span>
            <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">30-Day Ranking <br /> <span className="text-emerald-500">Mastery</span></h3>
          </div>
          
          <div className="space-y-4">
             <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-400 uppercase">Strategy Progress</span>
                <span className="text-3xl font-black text-emerald-400">{Math.round(progress)}%</span>
             </div>
             <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-[2s] shadow-[0_0_30px_rgba(16,185,129,0.6)]" 
                  style={{ width: `${progress}%` }}
                />
             </div>
          </div>

          <div className="pt-8 border-t border-white/10 space-y-4">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">ðŸ“…</div>
                <p className="text-sm font-bold">Week {currentWeek} focus active</p>
             </div>
             <button 
              onClick={() => {
                if(confirm("Archive this strategy? Progress will be lost.")) {
                  localStorage.removeItem('g5sr_active_strategy');
                  setActiveStrategy(null);
                  window.dispatchEvent(new Event('g5sr_strategy_updated'));
                }
              }}
              className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-rose-500 transition-colors"
             >
               Archive Campaign
             </button>
          </div>
        </div>

        <div className="flex-1 space-y-6 flex flex-col">
           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex gap-2">
                {(['All', 'Pending', 'Completed'] as const).map(s => (
                  <button 
                    key={s} 
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${filterStatus === s ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white/5 text-slate-400 hover:text-slate-100'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {(['All', 'High', 'Medium', 'Low'] as const).map(p => (
                  <button 
                    key={p} 
                    onClick={() => setFilterPriority(p)}
                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${filterPriority === p ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-slate-400 hover:text-slate-100'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[300px] content-start">
              {filteredTasks.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center opacity-30">
                  <div className="text-4xl mb-4">ðŸ”Ž</div>
                  <p className="text-xs font-black uppercase tracking-widest">No matching objectives found</p>
                </div>
              ) : (
                filteredTasks.map(task => (
                  <button 
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-start gap-4 p-5 rounded-[28px] transition-all border text-left group relative overflow-hidden active:scale-[0.98] ${
                      task.completed 
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-500' 
                      : 'bg-white/5 border-white/10 hover:border-emerald-500/40 text-slate-100'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-xl border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all duration-300 ${
                      task.completed ? 'bg-emerald-500 border-emerald-500 rotate-[360deg] scale-110' : 'border-slate-700 group-hover:border-emerald-500'
                    }`}>
                      {task.completed && <svg className="w-4 h-4 text-white animate-in zoom-in duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>}
                    </div>
                    <div className="flex-1 space-y-2">
                      <span className={`text-sm font-bold leading-tight block transition-all duration-300 ${task.completed ? 'line-through opacity-40 translate-x-1' : ''}`}>
                        {task.text}
                      </span>
                      <div className={`flex items-center gap-3 transition-opacity duration-300 ${task.completed ? 'opacity-30' : 'opacity-100'}`}>
                        {task.priority && (
                          <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded tracking-widest ${
                            task.priority === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/20' :
                            task.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20' :
                            'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                          }`}>
                            {task.priority}
                          </span>
                        )}
                        {task.dueDate && (
                          <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-1">
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3"/></svg>
                            {task.dueDate}
                          </span>
                        )}
                      </div>
                    </div>
                    {task.completed && <div className="absolute right-[-10px] bottom-[-10px] text-5xl opacity-5 select-none pointer-events-none">âœ¨</div>}
                  </button>
                ))
              )}
           </div>
           {tasks.length > 0 && (
             <div className="pt-6 mt-auto border-t border-white/5 flex justify-between items-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Showing {filteredTasks.length} objectives</p>
                <button onClick={onLaunchStrategy} className="text-[10px] font-black uppercase text-emerald-500 hover:underline tracking-widest transition-all">View Full Roadmap â†’</button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default StrategyProgress;
