
import React, { useState } from 'react';
import WidgetBuilder from './WidgetBuilder';

const WidgetsManager: React.FC = () => {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const existingWidgets = [
    { id: 'w-1', name: 'Main Homepage Carousel', type: 'Carousel', views: '12.4k', ctr: '3.2%', active: true },
    { id: 'w-2', name: 'Checkout Sidebar Badge', type: 'Badge', views: '5.1k', ctr: '1.8%', active: true },
    { id: 'w-3', name: 'Landing Page Grid', type: 'Grid', views: '2.9k', ctr: '4.5%', active: false },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Review Widgets</h1>
          <p className="text-slate-500">Display your social proof anywhere on your website.</p>
        </div>
        <button 
          onClick={() => setIsBuilderOpen(true)}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          Create New Widget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Total Widget Views</p>
          <h3 className="text-2xl font-black text-slate-900">20.4k</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Avg. Conversion Rate</p>
          <h3 className="text-2xl font-black text-emerald-600">3.1%</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Active Widgets</p>
          <h3 className="text-2xl font-black text-blue-600">2</h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Your Widgets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Widget Name</th>
                <th className="px-6 py-4">Layout</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Views</th>
                <th className="px-6 py-4 text-center">CTR</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {existingWidgets.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{w.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{w.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${w.active ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${w.active ? 'bg-emerald-600 animate-pulse' : 'bg-slate-300'}`}></span>
                      {w.active ? 'Active' : 'Paused'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-slate-600">{w.views}</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-600">{w.ctr}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-blue-600 text-xs font-bold hover:underline">Embed Code</button>
                    <button className="text-slate-400 hover:text-slate-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isBuilderOpen && <WidgetBuilder onClose={() => setIsBuilderOpen(false)} />}
    </div>
  );
};

export default WidgetsManager;
