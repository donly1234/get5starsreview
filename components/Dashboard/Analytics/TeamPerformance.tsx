
import React from 'react';

const TeamPerformance: React.FC = () => {
  const team = [
    { name: 'Sarah J.', responses: 142, avgTime: '2.1h', satisfaction: 4.9, avatar: 'SJ' },
    { name: 'Marcus C.', responses: 98, avgTime: '3.5h', satisfaction: 4.7, avatar: 'MC' },
    { name: 'Elena R.', responses: 85, avgTime: '4.8h', satisfaction: 4.8, avatar: 'ER' },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <h3 className="font-bold text-slate-900 mb-6">Team Performance</h3>
      <div className="space-y-4">
        {team.map((member) => (
          <div key={member.name} className="flex items-center justify-between p-3 border border-slate-50 rounded-2xl hover:bg-slate-50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-black border border-blue-200 group-hover:scale-110 transition-transform">
                {member.avatar}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                <p className="text-[10px] text-slate-500">{member.responses} responses</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-black text-slate-900">{member.avgTime}</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                {member.satisfaction}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
        Manage Team Access
      </button>
    </div>
  );
};

export default TeamPerformance;
