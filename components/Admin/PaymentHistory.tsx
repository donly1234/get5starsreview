
import React from 'react';

const PaymentHistory: React.FC = () => {
  const transactions = [
    { id: 'INV-4921', client: 'Sarah Miller (Agency)', amount: '$250.00', status: 'Success', date: 'Oct 14, 2024', method: 'Card •••• 4242' },
    { id: 'INV-4920', client: 'James Wilson (Business)', amount: '$99.00', status: 'Success', date: 'Oct 14, 2024', method: 'Stripe' },
    { id: 'INV-4919', client: 'Elena Reyes (Agency)', amount: '$250.00', status: 'Failed', date: 'Oct 13, 2024', method: 'Card •••• 1111' },
    { id: 'INV-4918', client: 'Dr. Michael Chen', amount: '$49.00', status: 'Success', date: 'Oct 12, 2024', method: 'EcoCash' },
    { id: 'INV-4917', client: 'Alex Rivera', amount: '$99.00', status: 'Refunded', date: 'Oct 10, 2024', method: 'Stripe' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-black text-black uppercase tracking-tighter">Transaction Ledger</h3>
          <div className="flex gap-4">
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Net Revenue (24h)</p>
                <p className="text-xl font-black text-green-600 mt-1">$1,480.00</p>
             </div>
             <button className="bg-slate-50 border border-slate-200 p-3 rounded-2xl hover:bg-slate-100 transition-all">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Invoice ID</th>
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5 text-right">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <p className="text-xs font-black text-black">{t.id}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-black">{t.client}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-black">{t.amount}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      t.status === 'Success' ? 'bg-green-100 text-green-700' :
                      t.status === 'Failed' ? 'bg-rose-100 text-rose-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-500">{t.date}</td>
                  <td className="px-8 py-6 text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{t.method}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-slate-50 text-center">
           <button className="text-xs font-black text-black uppercase tracking-[0.2em] hover:text-green-600 transition-colors">Load Older Transactions</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black rounded-[40px] p-8 text-white">
           <h4 className="text-sm font-black text-green-500 uppercase tracking-widest mb-6">Payment Method Split</h4>
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Stripe Payments</span>
                <span className="text-xs font-black">72%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="bg-green-600 h-full w-[72%]"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Manual EcoCash</span>
                <span className="text-xs font-black">18%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="bg-yellow-400 h-full w-[18%]"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Other (Bank/Payoneer)</span>
                <span className="text-xs font-black">10%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="bg-white/40 h-full w-[10%]"></div>
              </div>
           </div>
        </div>

        <div className="bg-white border-2 border-slate-100 rounded-[40px] p-8 flex flex-col justify-center items-center text-center">
           <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-xl shadow-yellow-500/10">📈</div>
           <h4 className="text-lg font-black text-black uppercase tracking-tighter">Projected Next Payout</h4>
           <p className="text-3xl font-black text-black mt-2">$12,450.00</p>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Expected Transfer: Monday, Oct 21</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
