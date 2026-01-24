
import React from 'react';
import { UserType } from '../../App';
import Logo from '../Logo';
import { isFeatureEnabled } from '../../config/featureFlags';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  userType: UserType;
  isTrial: boolean;
  onUpgrade?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, userType, isTrial, onUpgrade }) => {
  const baseItems = [
    { name: 'Dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg> },
    { name: 'Requests', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
    { name: 'All Reviews', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg> },
  ];

  const tools = [
    { name: 'Ranking Heatmap', flag: 'HEATMAP_TOOL', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>, locked: isTrial },
    { name: 'AI Strategy', flag: 'AI_STRATEGY', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg> },
    { name: 'SEO Auditor', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
    { name: 'GBP Media', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>, locked: isTrial },
    { name: 'AI Assistant', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>, locked: isTrial },
    { name: 'Widgets', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg> },
    { name: 'Analytics', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>, locked: isTrial },
  ];

  const agencyItems = userType === 'agency' ? [
    { name: 'Agency Panel', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> }
  ] : [];

  const visibleTools = tools.filter(t => !t.flag || isFeatureEnabled(t.flag as any));

  return (
    <aside className="w-64 bg-slate-950 text-slate-400 flex flex-col hidden md:flex shrink-0 border-r border-slate-900">
      <div className="p-6 flex items-center gap-3">
        <Logo variant="icon" className="scale-75 -ml-1" />
        <span className="text-xl font-black text-white tracking-tighter uppercase whitespace-nowrap">{userType === 'agency' ? 'AgencyHub' : 'Get5Starsreview'}</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
        <div className="pb-4 border-b border-white/5 space-y-1">
          {baseItems.map((item) => (
            <SidebarButton key={item.name} item={item} activeTab={activeTab} setActiveTab={setActiveTab} />
          ))}
        </div>
        
        <div className="py-4 space-y-1">
          <p className="px-4 text-[9px] font-black uppercase text-slate-600 tracking-widest mb-2">Growth Tools</p>
          {visibleTools.map((item) => (
            <SidebarButton key={item.name} item={item} activeTab={activeTab} setActiveTab={setActiveTab} />
          ))}
        </div>

        {agencyItems.length > 0 && (
          <div className="py-4 border-t border-white/5 space-y-1">
            <p className="px-4 text-[9px] font-black uppercase text-slate-600 tracking-widest mb-2">Agency Admin</p>
            {agencyItems.map((item) => (
              <SidebarButton key={item.name} item={item} activeTab={activeTab} setActiveTab={setActiveTab} />
            ))}
          </div>
        )}

        {isTrial && userType === 'business' && (
          <div className="mt-8 pt-8 border-t border-slate-900">
            <button 
              onClick={onUpgrade}
              className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-xs font-black bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl hover:scale-[1.02] transition-all uppercase tracking-widest"
            >
              <span className="text-lg">⭐</span>
              Upgrade Now
            </button>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-900 space-y-1">
        <button onClick={() => setActiveTab('Settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'Settings' ? 'bg-green-600 text-white' : 'hover:bg-slate-900 hover:text-slate-200'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          Settings Hub
        </button>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-500/10 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Log out
        </button>
      </div>
    </aside>
  );
};

const SidebarButton: React.FC<{ item: any, activeTab: string, setActiveTab: (t: string) => void }> = ({ item, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(item.name)}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all group ${
      activeTab === item.name 
      ? 'bg-green-600 text-white shadow-xl shadow-green-600/20' 
      : 'hover:bg-slate-900 hover:text-slate-200'
    }`}
  >
    <div className="flex items-center gap-3">
      {item.icon}
      {item.name}
    </div>
    {item.locked && (
      <span className="text-[9px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded flex items-center gap-1 group-hover:bg-green-700 group-hover:text-white">
        PRO
      </span>
    )}
  </button>
);

export default Sidebar;
