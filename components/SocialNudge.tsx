
import React, { useState, useEffect } from 'react';

const activities = [
  { name: 'Michael T.', city: 'Richmond, KY', action: 'started a Pro trial' },
  { name: 'Sarah J.', city: 'Harare, ZW', action: 'connected 3 profiles' },
  { name: 'Apex Dental', city: 'Austin, TX', action: 'launched a new campaign' },
  { name: 'The Cake Box', city: 'London, UK', action: 'reached 500 reviews' },
];

const SocialNudge: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % activities.length);
        setVisible(true);
      }, 1000);
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const current = activities[index];

  return (
    <div className={`fixed bottom-8 left-8 z-[100] transition-all duration-700 transform ${visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-90 pointer-events-none'}`}>
      <div className="bg-white p-4 pr-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 flex items-center gap-4 max-w-sm">
        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
           🚀
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-0.5">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Real-time update</span>
          </div>
          <p className="text-xs font-bold text-slate-700 leading-tight">
            <span className="text-green-600 font-black">{current.name}</span> in {current.city} <br />
            {current.action} <span className="text-slate-400">just now</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialNudge;
