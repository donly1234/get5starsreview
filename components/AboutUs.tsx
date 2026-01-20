
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white scroll-mt-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-green-600/5 -rotate-6 rounded-[64px] -z-10 scale-105"></div>
            <div className="bg-black p-12 rounded-[48px] shadow-2xl">
              <div className="space-y-6">
                <div className="h-1 w-20 bg-green-600"></div>
                <h3 className="text-4xl font-black text-white leading-none uppercase tracking-tighter italic">
                  Helping Local <br /> Businesses Win.
                </h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  Founded with a single mission: to level the playing field for local businesses. We believe that a great reputation shouldn't be a luxury reserved for giant corporations.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10">
                  <div>
                    <p className="text-3xl font-black text-green-500">2K+</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Clients</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-green-500">1M+</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reviews Sent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-green-600 font-black uppercase tracking-widest text-xs">Our Identity</h2>
            <h3 className="text-4xl md:text-5xl font-black text-black leading-none uppercase tracking-tighter">
              Global Presence. <br /> <span className="text-green-600 italic">Local Expertise.</span>
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Get5Starsreview is a premium Google Business Profile agency operating across two continents. With headquarters in Richmond, Kentucky and a regional operational hub in Harare, Zimbabwe, we provide round-the-clock support and global perspective to local reputation management.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 bg-green-100 text-green-700 rounded-xl flex items-center justify-center font-black">01</div>
                <p className="text-sm font-bold text-black uppercase tracking-tight">Data-Driven Automation</p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 bg-green-100 text-green-700 rounded-xl flex items-center justify-center font-black">02</div>
                <p className="text-sm font-bold text-black uppercase tracking-tight">White-Label Scalability</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
