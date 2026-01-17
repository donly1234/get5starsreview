
import React, { useState } from 'react';
import UserManagement from './UserManagement';
import PaymentHistory from './PaymentHistory';
import Logo from '../Logo';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'payments' | 'settings'>('overview');

  const stats = [
    { label: 'Total MRR', value: '$42,850', trend: '+14%', icon: '💰' },
    { label: 'Active Users', value: '2,142', trend: '+85', icon: '👥' },
    { label: 'Pending Audits', value: '12', trend: 'High Load', icon: '⚡' },
    { label: 'Failed Payments', value: '3', trend: '-2', icon: '⚠️' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-inter select-none">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-black text-slate-400 flex flex-col shrink-0 border-r border-slate-900">
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <Logo variant="icon" className="scale-75 -ml-1" />
          <span className="text-xl font-black text-white tracking-tighter uppercase">AdminPanel</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-6">
          {[
            { id: 'overview', label: 'Dashboard', icon: '📊' },
            { id: 'users', label: 'User Management', icon: '💼' },
            { id: 'payments', label: 'Payment Ledger', icon: '💳' },
            { id: 'settings', label: 'System Config', icon: '⚙️' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === item.id 
                ? 'bg-green-600 text-white shadow-xl shadow-green-900/40' 
                : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase text-rose-500 hover:bg-rose-500/10 transition-all"
          >
            <span>🚪</span>
            Log Out System
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-black uppercase tracking-tighter italic">
              {activeTab === 'overview' && 'System Overview'}
              {activeTab === 'users' && 'Account Directory'}
              {activeTab === 'payments' && 'Financial Ledger'}
              {activeTab === 'settings' && 'Global Configuration'}
            </h2>
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <span className="bg-yellow-400 text-black text-[9px] font-black uppercase px-2 py-1 rounded-lg">Master Admin Access</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs font-black text-black leading-none">System Admin</p>
              <p className="text-[10px] text-green-600 font-bold mt-1 uppercase">Root Access</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white font-bold">SA</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{s.icon}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{s.label}</span>
                    </div>
                    <h3 className="text-3xl font-black text-black">{s.value}</h3>
                    <div className="mt-4 flex items-center gap-2">
                       <span className={`text-[10px] font-black px-2 py-0.5 rounded ${s.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-700'}`}>
                         {s.trend}
                       </span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase">vs Last Month</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-black uppercase tracking-tighter mb-8">Revenue Stream</h3>
                    <div className="h-64 flex items-end gap-2 px-2">
                      {[60, 45, 75, 55, 90, 80, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-black rounded-t-xl hover:bg-green-600 transition-all cursor-pointer relative group">
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Day {i+1}: ${(h*100).toLocaleString()}</div>
                          <div className="w-full" style={{ height: `${h}%` }}></div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                      <span>Mon</span>
                      <span>Sun</span>
                    </div>
                 </div>

                 <div className="bg-green-600 p-8 rounded-[40px] shadow-xl text-white relative overflow-hidden">
                    <div className="relative z-10 space-y-6">
                       <h3 className="text-xl font-black uppercase tracking-tight italic">Global Health Monitor</h3>
                       <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10">
                            <span className="text-xs font-black uppercase">Review Engine API</span>
                            <span className="text-[9px] font-black bg-emerald-400 text-black px-2 py-0.5 rounded">99.9% Online</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10">
                            <span className="text-xs font-black uppercase">SMS Gateway</span>
                            <span className="text-[9px] font-black bg-emerald-400 text-black px-2 py-0.5 rounded">Stable</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10">
                            <span className="text-xs font-black uppercase">Database Latency</span>
                            <span className="text-[9px] font-black bg-yellow-400 text-black px-2 py-0.5 rounded">34ms (High Traffic)</span>
                          </div>
                       </div>
                    </div>
                    <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'payments' && <PaymentHistory />}
          
          {activeTab === 'settings' && (
            <div className="bg-white p-12 rounded-[40px] border border-slate-200 text-center space-y-6">
               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-4xl">🛠️</div>
               <h3 className="text-2xl font-black text-black">System Configuration</h3>
               <p className="text-slate-500 max-w-md mx-auto font-medium">Control global pricing, trial durations, and platform-wide API keys for Get5StarsReview.</p>
               <button className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-600 transition-all">Launch Settings Wizard</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
