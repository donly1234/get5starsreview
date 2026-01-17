
import React, { useState } from 'react';
import ClientsTable from './ClientsTable';
import WhiteLabelSettings from './WhiteLabelSettings';
import AgencyMetrics from './AgencyMetrics';

interface AgencyManagerProps {
  onSwitchClient: (name: string) => void;
}

const AgencyManager: React.FC<AgencyManagerProps> = ({ onSwitchClient }) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'clients' | 'whitelabel'>('overview');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Agency Control Panel</h1>
          <p className="text-slate-500">Manage your reseller network and white-label preferences.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'clients', label: 'Managed Clients', icon: '💼' },
            { id: 'whitelabel', label: 'White-Labeling', icon: '🎨' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeSubTab === tab.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="text-base leading-none">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {activeSubTab === 'overview' && <AgencyMetrics />}
        {activeSubTab === 'clients' && <ClientsTable onImpersonate={onSwitchClient} />}
        {activeSubTab === 'whitelabel' && <WhiteLabelSettings />}
      </div>
    </div>
  );
};

export default AgencyManager;
