
import React, { useState } from 'react';
import ReviewInbox from './ReviewInbox';
import AlertSettings from './AlertSettings';

// added MonitoringManagerProps to fix error in Dashboard.tsx
interface MonitoringManagerProps {
  isTrial: boolean;
}

const MonitoringManager: React.FC<MonitoringManagerProps> = ({ isTrial }) => {
  const [subTab, setSubTab] = useState<'inbox' | 'alerts'>('inbox');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Review Monitoring</h1>
          <p className="text-slate-500">Track and respond to feedback across all platforms in real-time.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setSubTab('inbox')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${subTab === 'inbox' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Review Inbox
          </button>
          <button 
            onClick={() => setSubTab('alerts')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${subTab === 'alerts' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Alert Rules
          </button>
        </div>
      </div>

      {/* passing isTrial to ReviewInbox */}
      {subTab === 'inbox' ? <ReviewInbox isTrial={isTrial} /> : <AlertSettings />}
    </div>
  );
};

export default MonitoringManager;
