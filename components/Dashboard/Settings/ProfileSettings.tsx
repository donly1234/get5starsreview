
import React, { useState } from 'react';

const ProfileSettings: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    businessName: 'The Downtown Bakery',
    industry: 'Food & Beverage',
    website: 'https://downtownbakery.com',
    email: 'hello@downtownbakery.com',
    phone: '+1 (555) 123-4567',
    timezone: '(GMT-08:00) Pacific Time'
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {showToast && (
        <div className="fixed top-8 right-8 z-[120] bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-[10px]">✓</div>
          <span className="font-bold text-sm">Changes saved successfully!</span>
        </div>
      )}

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Business Profile</h3>
            <p className="text-slate-500 text-sm">Manage your brand identity and contact details.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-black text-white px-8 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-green-600 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : 'Save Changes'}
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="shrink-0 space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Brand Logo</label>
              <div className="w-32 h-32 rounded-[32px] bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group cursor-pointer hover:border-green-600 transition-all">
                <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">🍞</span>
                <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Update Logo</span>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <label className="block">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Business Name</span>
                <input 
                  type="text" 
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="mt-2 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Industry</span>
                <select 
                  className="mt-2 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none cursor-pointer"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                >
                  <option>Food & Beverage</option>
                  <option>Professional Services</option>
                  <option>Healthcare</option>
                  <option>Retail</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Website URL</span>
                <input 
                  type="url" 
                  value={formData.website} 
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="mt-2 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Timezone</span>
                <select className="mt-2 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none cursor-pointer">
                  <option>(GMT-08:00) Pacific Time</option>
                  <option>(GMT-05:00) Eastern Time</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Manage Locations</h3>
          <button className="text-green-600 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:underline">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
            Add New Location
          </button>
        </div>
        <div className="p-8 space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50/50 rounded-2xl border border-green-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">📍</div>
              <div>
                <p className="text-sm font-bold text-slate-900">Downtown Flagship</p>
                <p className="text-xs text-slate-500">123 Baker Street, City Center</p>
              </div>
            </div>
            <span className="text-[10px] font-black text-green-600 bg-white px-3 py-1 rounded-full uppercase border border-green-200">Primary</span>
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl group hover:bg-slate-50 transition-all cursor-pointer">
            <div className="flex items-center gap-4 opacity-60">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xl">📍</div>
              <div>
                <p className="text-sm font-bold text-slate-900">East Side Branch</p>
                <p className="text-xs text-slate-500">456 Sunrise Blvd, East Side</p>
              </div>
            </div>
            <button className="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors">Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
