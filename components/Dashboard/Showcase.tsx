
import React from 'react';

const DashboardShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">The Command Center</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-none uppercase tracking-tighter italic">
            Your Growth <span className="text-blue-600">Nerve Center.</span>
          </h2>
          <p className="text-slate-500 text-lg font-bold">
            Complexity made simple. Manage your entire local reputation from a single, high-performance dashboard designed for speed and clarity.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Dashboard Mockup Container */}
          <div className="relative z-10 bg-slate-900 rounded-[40px] p-2 md:p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden transform lg:rotate-[-1deg] transition-transform hover:rotate-0 duration-700">
            {/* Browser Frame Header */}
            <div className="bg-slate-800/50 px-6 py-4 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
              </div>
              <div className="bg-black/20 rounded-full px-4 py-1 text-[10px] text-slate-500 font-black uppercase tracking-widest border border-white/5">
                dashboard.get5starsreview.com
              </div>
              <div className="w-10"></div>
            </div>

            {/* Dashboard Content Mock */}
            <div className="bg-[#0B0F1A] aspect-[16/10] w-full p-6 md:p-10 flex gap-6">
              {/* Sidebar Mock */}
              <div className="hidden md:flex w-48 flex-col gap-4">
                 <div className="h-10 w-full bg-white/5 rounded-xl border border-white/5"></div>
                 <div className="space-y-2 pt-4">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`h-8 w-full rounded-lg ${i === 1 ? 'bg-blue-600' : 'bg-white/5 border border-white/5'}`}></div>
                    ))}
                 </div>
              </div>

              {/* Main Feed Mock */}
              <div className="flex-1 space-y-6">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4">
                   {[1,2,3].map(i => (
                     <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-2">
                        <div className="h-2 w-12 bg-white/10 rounded-full"></div>
                        <div className="h-6 w-20 bg-white/20 rounded-lg"></div>
                     </div>
                   ))}
                </div>
                {/* Visual Chart Area */}
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5 h-48 relative overflow-hidden">
                   <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-blue-600/10 to-transparent"></div>
                   <div className="flex items-end justify-between h-full gap-2">
                      {[40, 60, 45, 90, 65, 80, 70, 95, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-500/40 rounded-t-lg transition-all duration-1000" style={{ height: `${h}%` }}></div>
                      ))}
                   </div>
                </div>
                {/* Review Feed Area */}
                <div className="space-y-3">
                   {[1,2].map(i => (
                     <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5 flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 shrink-0"></div>
                        <div className="space-y-2 flex-1">
                           <div className="h-2 w-1/4 bg-white/20 rounded-full"></div>
                           <div className="h-2 w-full bg-white/10 rounded-full"></div>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Callouts */}
          <div className="absolute top-[20%] -right-10 md:-right-20 z-20 animate-in slide-in-from-right-12 duration-1000">
             <div className="bg-white p-6 rounded-[32px] shadow-2xl border border-slate-100 max-w-[240px] space-y-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-xl">✨</div>
                <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">AI Smart Compose</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Draft 100% human-perfect responses in 2 seconds tailored to your specific brand voice.</p>
             </div>
          </div>

          <div className="absolute bottom-[15%] -left-10 md:-left-20 z-20 animate-in slide-in-from-left-12 duration-1000 delay-300">
             <div className="bg-white p-6 rounded-[32px] shadow-2xl border border-slate-100 max-w-[240px] space-y-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">📍</div>
                <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">Local Ranking Pulse</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Monitor your map pack position for your top keywords across every neighborhood you serve.</p>
             </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px] -z-10"></div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-40">
           {['Security First', 'Real-time Sync', 'Multi-user Access', 'Enterprise Scale'].map(text => (
             <div key={text} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-xs font-black uppercase tracking-widest text-slate-900">{text}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcase;
