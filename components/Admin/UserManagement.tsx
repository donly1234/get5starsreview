
import React, { useState } from 'react';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { id: 'u1', name: 'James Wilson', business: 'Sunshine Bakery', type: 'Business', plan: 'Professional', status: 'Active', joined: 'Oct 12, 2024' },
    { id: 'u2', name: 'Sarah Miller', business: 'Pixel Perfect', type: 'Agency', plan: 'Agency', status: 'Active', joined: 'Oct 10, 2024' },
    { id: 'u3', name: 'Robert Brown', business: 'Brown & Co', type: 'Business', plan: 'Starter', status: 'Trial', joined: 'Oct 14, 2024' },
    { id: 'u4', name: 'Michael Chen', business: 'Tech Dental', type: 'Business', plan: 'Professional', status: 'Active', joined: 'Sept 22, 2024' },
    { id: 'u5', name: 'Elena Reyes', business: 'Global Health', type: 'Agency', plan: 'Agency', status: 'Expired', joined: 'Aug 15, 2024' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full max-w-md">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input 
              type="text" 
              placeholder="Search by name, email, or business..." 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-600/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs font-black uppercase text-slate-500">Filters</button>
            <button className="bg-black text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-green-600 transition-all">Add User</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">User & Business</th>
                <th className="px-8 py-5">Tier</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Joined</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-xs">
                        {u.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black text-black">{u.name}</p>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">{u.business}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{u.type}</span>
                      <span className="text-xs font-bold text-black">{u.plan}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      u.status === 'Active' ? 'bg-green-100 text-green-700' :
                      u.status === 'Trial' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-slate-200 text-slate-500'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-500">{u.joined}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white rounded-lg shadow-sm border border-slate-100 text-slate-400 hover:text-black">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg shadow-sm border border-slate-100 text-slate-400 hover:text-rose-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
