
import React from 'react';

interface NotificationCenterProps {
  onClose: () => void;
  trialDay: number;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose, trialDay }) => {
  const emails = [
    { 
      day: 14, 
      title: 'Last day of your trial: Action Required', 
      content: 'Your trial ends today. Upgrade now to avoid losing access to your automated systems and review widgets.', 
      status: 'Sent', 
      type: 'Urgent' 
    },
    { 
      day: 11, 
      title: '3 days left: Results Recap & 20% OFF Offer', 
      content: 'Great results so far! Upgrade today and get 20% OFF your first month of Professional plan. Use code: TRIAL20.', 
      status: 'Sent', 
      type: 'Offer' 
    },
    { 
      day: 7, 
      title: "You're halfway through your trial: Success Report", 
      content: 'Usage summary: 14 requests sent, 4 new reviews. See how other bakeries are winning with automated requests.', 
      status: 'Sent', 
      type: 'Report' 
    },
    { 
      day: 1, 
      title: 'Day 1: Connection Checklist & Feature Highlights', 
      content: 'Setup checklist: 1. Connect Google Business, 2. Send your first request, 3. View incoming reviews.', 
      status: 'Sent', 
      type: 'Setup' 
    },
    { 
      day: 0, 
      title: 'Welcome to Get5StarsReview - Your Free Trial Starts Now! 🎉', 
      content: 'Thanks for joining! Your 14-day window to 5-star success has officially started. Quick start guide inside.', 
      status: 'Sent', 
      type: 'Welcome' 
    },
  ].filter(e => e.day <= trialDay);

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[100] flex flex-col border-l border-slate-100 animate-in slide-in-from-right duration-300">
      <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">System Communications</h3>
          <p className="text-xs text-slate-500 font-medium">History of automated trial communications</p>
        </div>
        <button onClick={onClose} className="p-3 hover:bg-white rounded-xl text-slate-400 shadow-sm transition-all border border-transparent hover:border-slate-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {emails.length === 0 ? (
          <div className="text-center py-20 opacity-40">
             <div className="text-5xl mb-4">📭</div>
             <p className="text-sm font-bold">No communications yet.</p>
          </div>
        ) : (
          emails.map((email, i) => (
            <div key={i} className="bg-white border border-slate-100 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
                  email.type === 'Urgent' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                  email.type === 'Offer' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {email.type}
                </span>
                <span className="text-[10px] font-bold text-slate-400">Day {email.day}</span>
              </div>
              <h5 className="font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{email.title}</h5>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{email.content}</p>
              <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                  Email {email.status}
                </span>
                <button className="text-[10px] font-black text-blue-600 uppercase hover:underline tracking-tighter">View Full Message</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-8 border-t border-slate-100 bg-slate-50/50">
        <div className="bg-blue-600 p-6 rounded-[24px] text-white space-y-3 relative overflow-hidden group cursor-pointer shadow-xl shadow-blue-500/20">
          <h6 className="font-black text-sm uppercase tracking-widest">Trial Support</h6>
          <p className="text-xs text-blue-100 leading-relaxed">Need help during your trial? Our agents are online to assist with setup.</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-xl text-[10px] font-black uppercase">Open Chat</button>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all"></div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
