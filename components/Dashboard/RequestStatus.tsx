
import React from 'react';

interface RequestStatusProps {
  requestsUsed?: number;
  isTrial?: boolean;
  onUpgrade?: () => void;
}

const RequestStatus: React.FC<RequestStatusProps> = ({ requestsUsed = 14, isTrial = false, onUpgrade }) => {
  const limit = isTrial ? 20 : 1000;
  const percentage = Math.min((requestsUsed / limit) * 100, 100);
  
  const getStatusColor = () => {
    if (percentage >= 100) return 'bg-rose-500';
    if (percentage >= 75) return 'bg-amber-400';
    return 'bg-blue-600';
  };

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Review Requests</h3>
          <p className="text-xs text-slate-500">Your monthly campaign usage.</p>
        </div>
        {isTrial && (
          <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-full uppercase border border-blue-100">Trial Plan</span>
        )}
      </div>
      
      <div className="space-y-8">
        <div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-slate-600 font-bold">Usage Balance</span>
            <span className={`font-black ${percentage >= 100 ? 'text-rose-600' : 'text-slate-900'}`}>
              {requestsUsed} / {limit}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
            <div className={`h-full transition-all duration-1000 ${getStatusColor()}`} style={{ width: `${percentage}%` }}></div>
          </div>
          
          {isTrial && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
               {percentage >= 100 ? (
                 <div className="space-y-3">
                    <p className="text-xs font-black text-rose-600 uppercase tracking-tighter">LIMIT REACHED</p>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">You've hit your trial limit of 20 requests. Upgrade to Professional for unlimited requests.</p>
                    <button onClick={onUpgrade} className="w-full py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-all">Unlock Unlimited</button>
                 </div>
               ) : requestsUsed >= 10 ? (
                <div className="space-y-3">
                  <p className="text-xs font-black text-blue-600 uppercase tracking-tighter">MILESTONE REACHED! 🚀</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">You've sent 10 requests! Businesses at this stage usually upgrade for unlimited growth.</p>
                  <button onClick={onUpgrade} className="w-full py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">Upgrade for Unlimited</button>
                </div>
               ) : percentage >= 75 ? (
                 <div className="space-y-1">
                    <p className="text-xs font-black text-amber-600 uppercase tracking-tighter">RUNNING LOW</p>
                    <p className="text-xs text-slate-500 font-medium">{limit - requestsUsed} requests remaining in your trial.</p>
                 </div>
               ) : (
                 <p className="text-xs text-slate-400 font-medium leading-relaxed italic">Trial tip: Send requests via SMS to get a 3x higher response rate compared to email.</p>
               )}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-slate-50 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900">Email Requests</p>
              <p className="text-[10px] text-slate-400">Unlimited on all plans</p>
            </div>
            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
               <div className="bg-emerald-500 h-full w-[100%]"></div>
            </div>
          </div>

          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-xs font-bold text-slate-900">SMS Requests</p>
                <p className="text-[10px] text-slate-400">Require Professional Plan</p>
              </div>
              {isTrial && <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>}
            </div>
            <button onClick={onUpgrade} className={`text-[10px] font-black uppercase text-blue-600 hover:underline transition-all ${isTrial ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>Unlock SMS</button>
          </div>
        </div>
      </div>

      {!isTrial && (
        <button className="w-full mt-8 py-3.5 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
          View Detailed Reports
        </button>
      )}
    </div>
  );
};

export default RequestStatus;
