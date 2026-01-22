import React from 'react';

const DashboardShowcase: React.FC = () => {
  const tools = [
    { name: 'Dashboard', icon: '🏠', active: true },
    { name: 'AI Inbox', icon: '✉️', active: false },
    { name: 'SEO Auditor', icon: '🛡️', active: false },
    { name: 'Heatmaps', icon: '📍', active: false },
    { name: 'Requests', icon: '📱', active: false },
  ];

  return (
    <section className="py-24 md:py-32 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24 space-y-6">
          <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[11px]">The Command Center</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-none uppercase tracking-tighter italic">
            Your Growth <span className="text-emerald-600">Nerve Center.</span>
          </h2>
          <p className="text-slate-500 text-base md:text-xl font-bold max-w-2xl mx-auto leading-relaxed">
            Complexity made simple. Manage your entire local reputation from a single, high-performance dashboard designed for total business clarity.
          </p>
        </div>

        <div className="relative max-w-[1200px] mx-auto group">
          {/* Main Dashboard Mockup Container */}
          <div className="relative z-10 bg-slate-950 rounded-[32px] md:rounded-[56px] p-2 md:p-6 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden lg:rotate-[-1.5deg] transition-all duration-1000 group-hover:rotate-0 group-hover:scale-[1.02]">
            {/* Browser Frame Header */}
            <div className="bg-slate-900 px-6 md:px-8 py-4 md:py-5 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/60"></div>
              </div>
              <div className="bg-black/40 rounded-full px-5 py-2 text-[9px] md:text-[11px] text-slate-500 font-black uppercase tracking-widest border border-white/5 truncate max-w-[180px] md:max-w-none">
                dashboard.get5starsreview.com/analytics
              </div>
              <div className="flex gap-2">
                 <div className="w-4 h-4 rounded bg-white/5"></div>
                 <div className="w-4 h-4 rounded bg-white/5"></div>
              </div>
            </div>

            {/* Dashboard Content Mock */}
            <div className="bg-[#0B0F1A] aspect-[16/9] w-full flex overflow-hidden">
              {/* Sidebar Mock */}
              <div className="hidden md:flex w-56 lg:w-64 flex-col border-r border-white/5 p-6 lg:p-8 bg-slate-950/50">
                 <div className="flex items-center gap-3 mb-10 lg:mb-14">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-[12px] font-black text-white shadow-[0_0_20px_rgba(16,185,74,0.4)]">G</div>
                    <span className="text-[11px] lg:text-xs font-black text-white uppercase tracking-widest">G5SR v5.6</span>
                 </div>
                 <div className="space-y-2">
                    {tools.map(tool => (
                      <div key={tool.name} className={`flex items-center gap-4 px-4 lg:px-5 py-3 rounded-2xl text-[10px] lg:text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${tool.active ? 'bg-emerald-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}>
                        <span className="text-sm">{tool.icon}</span>
                        <span className="hidden lg:inline">{tool.name}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Main Content Mock */}
              <div className="flex-1 p-6 md:p-10 lg:p-14 space-y-6 md:space-y-10 overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-3 gap-4 md:gap-8">
                   {[
                     { l: 'Avg Rating', v: '4.9★', c: 'text-emerald-500' },
                     { l: 'New Reviews', v: '+42', c: 'text-blue-500' },
                     { l: 'Success Rate', v: '98%', c: 'text-purple-500' }
                   ].map(stat => (
                     <div key={stat.l} className="bg-white/5 rounded-2xl p-4 md:p-6 border border-white/5 hover:bg-white/10 transition-colors">
                        <p className="text-[6px] md:text-[8px] lg:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.l}</p>
                        <p className={`text-sm md:text-2xl lg:text-4xl font-black ${stat.c} tracking-tighter`}>{stat.v}</p>
                     </div>
                   ))}
                </div>

                <div className="bg-white/5 rounded-3xl md:rounded-[40px] p-6 lg:p-10 border border-white/5 h-40 md:h-64 lg:h-80 relative overflow-hidden group/chart">
                   <div className="flex items-end justify-between h-full gap-2 md:gap-3">
                      {[30, 65, 45, 90, 65, 80, 70, 95, 100, 85, 110, 130, 90, 115, 140].map((h, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-gradient-to-t from-emerald-600/60 to-emerald-400/20 rounded-t-lg transition-all duration-700 hover:from-emerald-500" 
                          style={{ height: `${(h/140)*100}%` }}
                        ></div>
                      ))}
                   </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                   <h4 className="text-[8px] lg:text-[12px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-3">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                     Live Interaction Feed
                   </h4>
                   {[
                     { name: 'Sarah M.', text: 'The bakery was amazing, the sourdough is perfect!', time: '2m', platform: 'Google' },
                     { name: 'David L.', text: 'Service was a bit slow on Sunday but food made up...', time: '1h', platform: 'Yelp' }
                   ].map((rev, i) => (
                     <div key={i} className="bg-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-all cursor-default">
                        <div className="flex gap-4 lg:gap-6 items-center">
                           <div className="w-10 lg:w-14 h-10 lg:h-14 rounded-2xl bg-white/5 flex items-center justify-center font-black text-slate-400 text-xs lg:text-base">{rev.name[0]}</div>
                           <div>
                              <p className="text-[11px] lg:text-sm font-black text-white">{rev.name}</p>
                              <p className="text-[9px] lg:text-xs text-slate-500 font-medium line-clamp-1">{rev.text}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <span className="text-[7px] lg:text-[10px] font-black text-slate-600 uppercase block">{rev.time} ago</span>
                           <span className="text-[6px] lg:text-[9px] font-bold text-blue-500 uppercase mt-1">{rev.platform}</span>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Callouts - Scaled for Desktop Mastery */}
          <div className="hidden lg:block absolute top-[15%] -right-16 lg:-right-24 z-20 animate-in slide-in-from-right-16 duration-1000 group-hover:translate-x-4">
             <div className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[48px] shadow-[0_40px_80px_rgba(0,0,0,0.15)] border border-slate-100 max-w-[280px] lg:max-w-[340px] space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl">✨</div>
                  <h4 className="font-black text-slate-900 text-sm lg:text-lg uppercase tracking-tight italic">AI Smart Compose</h4>
                </div>
                <p className="text-[11px] lg:text-sm text-slate-500 font-medium leading-relaxed">Instantly draft human-perfect, keyword-rich replies to every customer review on autopilot.</p>
             </div>
          </div>

          <div className="hidden lg:block absolute bottom-[25%] -left-16 lg:-left-24 z-20 animate-in slide-in-from-left-16 duration-1000 delay-300 group-hover:-translate-x-4">
             <div className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[48px] shadow-[0_40px_80px_rgba(0,0,0,0.15)] border border-slate-100 max-w-[280px] lg:max-w-[340px] space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">📍</div>
                  <h4 className="font-black text-slate-900 text-sm lg:text-lg uppercase tracking-tight italic">Market Heatmaps</h4>
                </div>
                <p className="text-[11px] lg:text-sm text-slate-500 font-medium leading-relaxed">Visualize your ranking dominance across the entire city and spot untapped revenue opportunities.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcase;
