
import React from 'react';

interface ClientsTableProps {
  onImpersonate: (name: string) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ onImpersonate }) => {
  const clients = [
    { name: 'The Downtown Bakery', owner: 'John Doe', rating: 4.8, reviews: 1284, status: 'Active', plan: 'Pro' },
    { name: 'Sunset Dental Care', owner: 'Dr. Sarah Wilson', rating: 4.9, reviews: 842, status: 'Active', plan: 'Pro' },
    { name: 'Lakeside Hardware', owner: 'Mike Miller', rating: 4.2, reviews: 312, status: 'Trialing', plan: 'Starter' },
    { name: 'Blue Ridge Cafe', owner: 'Chris Evans', rating: 4.6, reviews: 156, status: 'Paused', plan: 'Pro' },
    { name: 'Elevate Gym', owner: 'Amanda Key', rating: 4.9, reviews: 240, status: 'Active', plan: 'Enterprise' },
  ];

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">Managed Businesses</h3>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
          + Add New Client
        </button>
      </div>

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
                    <span className="text-yellow-500">★</span>
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
    </div>
  );
};

export default ClientsTable;
