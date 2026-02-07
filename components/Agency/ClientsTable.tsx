import React, { useState } from 'react';

interface ClientsTableProps {
  onImpersonate: (name: string) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ onImpersonate }) => {
  const [clients, setClients] = useState<any[]>([]); // Fresh agency start

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
      <div className="p-8 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-xl font-black uppercase italic text-slate-900">Managed Businesses</h3>
        <button className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
          + Onboard New Client
        </button>
      </div>

      {clients.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
          <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center text-5xl">ðŸ’¼</div>
          <div className="space-y-2">
            <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">No Managed Clients</h4>
            <p className="text-slate-400 text-sm font-medium max-w-sm mx-auto">Your client list is currently empty. Start growing your agency revenue by onboarding your first business account.</p>
          </div>
          <button className="px-10 py-4 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all active:scale-95">Launch Onboarding Wizard</button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Business Name</th>
                <th className="px-8 py-4">Plan</th>
                <th className="px-8 py-4">Rating</th>
                <th className="px-8 py-4 text-center">Reviews</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((c) => (
                <tr key={c.name} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.owner}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 px-2 py-1 rounded">{c.plan}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1.5 font-black text-slate-900 text-sm">
                      <span className="text-yellow-500">â˜…</span>
                      {c.rating}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center text-sm font-medium text-slate-600">{c.reviews}</td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${
                      c.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                      c.status === 'Trialing' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onImpersonate(c.name)}
                        className="text-[10px] font-black uppercase text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        Login to Portal
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientsTable;
