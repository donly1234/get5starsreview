import React from 'react';

interface TopBarProps {
  activeTab: string;
  onToggleNotifications?: () => void;
  onProfileClick?: () => void;
  profile?: any;
}

const TopBar: React.FC<TopBarProps> = ({ activeTab, onToggleNotifications, onProfileClick, profile }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-20 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input 
            type="text" 
            placeholder="Search reviews, customers, keywords..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-bold"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleNotifications}
          className="relative p-2.5 bg-slate-50 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all border border-transparent hover:border-green-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-yellow-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        
        <div 
          onClick={onProfileClick}
          className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 pr-3 rounded-xl transition-all border border-transparent hover:border-slate-100"
        >
          <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center text-white font-black border border-black overflow-hidden">
            {profile?.avatar_url ? <img src={profile.avatar_url} className="w-full h-full object-cover" /> : (profile?.full_name || 'JD').split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-bold text-slate-900 leading-none">{profile?.full_name || 'User'}</p>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{profile?.user_type === 'agency' ? profile?.agency_name : profile?.business_name || 'Member'}</p>
          </div>
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
        </div>
      </div>
    </header>
  );
};

export default TopBar;