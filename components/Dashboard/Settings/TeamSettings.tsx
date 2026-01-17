
import React from 'react';

const TeamSettings: React.FC = () => {
  const members = [
    { name: 'John Doe', email: 'john@bakery.com', role: 'Owner', lastActive: 'Now', avatar: 'JD' },
    { name: 'Sarah Smith', email: 'sarah@bakery.com', role: 'Manager', lastActive: '2h ago', avatar: 'SS' },
    { name: 'Alex Rivera', email: 'alex@bakery.com', role: 'Responder', lastActive: 'Yesterday', avatar: 'AR' },
  ];

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-8 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Team Management</h3>
          <p className="text-slate-500 text-sm">Control who can access and respond to reviews.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
          Invite Member
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
            <tr>
              <th className="px-8 py-4">User</th>
              <th className="px-8 py-4">Role</th>
              <th className="px-8 py-4">Last Active</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map((m) => (
              <tr key={m.email} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold border border-blue-200">
                      {m.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{m.name}</p>
                      <p className="text-xs text-slate-400">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                   <select className="bg-slate-100 border-none text-[10px] font-black uppercase tracking-wider rounded-lg px-2 py-1 focus:ring-0 cursor-pointer">
                     <option>{m.role}</option>
                     <option>Admin</option>
                     <option>Viewer</option>
                   </select>
                </td>
                <td className="px-8 py-6 text-sm text-slate-500">{m.lastActive}</td>
                <td className="px-8 py-6 text-right">
                  <button className="text-slate-400 hover:text-rose-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamSettings;
