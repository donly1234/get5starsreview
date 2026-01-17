
import React, { useState } from 'react';
import ProfileSettings from './ProfileSettings';
import TeamSettings from './TeamSettings';
import IntegrationSettings from './IntegrationSettings';
import BillingSettings from './BillingSettings';

type SettingsTab = 'profile' | 'team' | 'integrations' | 'billing';

// added SettingsManagerProps to fix type errors in Dashboard.tsx
interface SettingsManagerProps {
  isTrial: boolean;
}

const SettingsManager: React.FC<SettingsManagerProps> = ({ isTrial }) => {
  const [activeSubTab, setActiveSubTab] = useState<SettingsTab>('profile');

  const tabs = [
    { id: 'profile', label: 'Business Profile', icon: '🏢' },
    { id: 'team', label: 'Team Management', icon: '👥' },
    { id: 'integrations', label: 'Platform Sync', icon: '🔌' },
    { id: 'billing', label: 'Billing & Usage', icon: '💳' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
      {/* Settings Navigation */}
      <div className="w-full lg:w-64 shrink-0 space-y-2">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Settings Hub</h2>
        <div className="flex lg:flex-col bg-white lg:bg-transparent p-1 lg:p-0 rounded-2xl border border-slate-200 lg:border-none overflow-x-auto lg:overflow-visible">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as SettingsTab)}
              className={`flex-1 lg:flex-none flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeSubTab === tab.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'text-slate-500 hover:bg-white lg:hover:bg-slate-200/50'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Settings Content Area */}
      <div className="flex-1">
        {activeSubTab === 'profile' && <ProfileSettings />}
        {activeSubTab === 'team' && <TeamSettings />}
        {activeSubTab === 'integrations' && <IntegrationSettings />}
        {/* passing isTrial to BillingSettings */}
        {activeSubTab === 'billing' && <BillingSettings isTrial={isTrial} />}
      </div>
    </div>
  );
};

export default SettingsManager;
