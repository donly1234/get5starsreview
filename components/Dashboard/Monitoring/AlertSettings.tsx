
import React, { useState } from 'react';

const AlertSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    emailAll: true,
    emailNegative: true,
    smsNegative: false,
    pushAll: false,
    dailyDigest: true
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Notification Preferences</h3>
          <p className="text-slate-500 text-sm">Stay informed about your online reputation. Choose how and when you want to be alerted.</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Email Alerts */}
          <section className="space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Email Notifications</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-900">All New Reviews</p>
                  <p className="text-xs text-slate-500">Get an email for every single review received.</p>
                </div>
                <button 
                  onClick={() => toggle('emailAll')}
                  className={`w-12 h-6 rounded-full relative transition-all ${settings.emailAll ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.emailAll ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-900 text-rose-600">Priority Negative Alerts</p>
                  <p className="text-xs text-slate-500">Instant email for any review below 3 stars.</p>
                </div>
                <button 
                  onClick={() => toggle('emailNegative')}
                  className={`w-12 h-6 rounded-full relative transition-all ${settings.emailNegative ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.emailNegative ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
          </section>

          {/* SMS Alerts */}
          <section className="space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">SMS & Mobile</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-900">Critical Review SMS</p>
                  <p className="text-xs text-slate-500">SMS alerts for 1-star reviews (SMS credits apply).</p>
                </div>
                <button 
                  onClick={() => toggle('smsNegative')}
                  className={`w-12 h-6 rounded-full relative transition-all ${settings.smsNegative ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.smsNegative ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-900">Daily Digest</p>
                  <p className="text-xs text-slate-500">A summary of the day's activity sent every evening.</p>
                </div>
                <button 
                  onClick={() => toggle('dailyDigest')}
                  className={`w-12 h-6 rounded-full relative transition-all ${settings.dailyDigest ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.dailyDigest ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
          </section>

          <div className="pt-6">
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl">
              Save Notification Settings
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl flex items-center justify-between">
        <div className="space-y-2">
          <h4 className="text-xl font-bold">Need to alert your team?</h4>
          <p className="text-blue-100 text-sm">You can add multiple team members and assign specific platforms to them.</p>
        </div>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all">
          Manage Team
        </button>
      </div>
    </div>
  );
};

export default AlertSettings;
