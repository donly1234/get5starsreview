import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import PaymentSection from './PaymentSection';

interface SignUpAgencyProps {
  onComplete: () => void;
  onCancel: () => void;
  onSwitchToBusiness: () => void;
}

const SignUpAgency: React.FC<SignUpAgencyProps> = ({ onComplete, onCancel, onSwitchToBusiness }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '', password: '', agencyName: '', fullName: '', website: '', phone: '', clientCount: '0-5'
  });

  const agencyPlan = {
    id: 'agency',
    name: 'White Label Agency License',
    price: 250,
    requests: 'Unlimited Clients',
    features: [
      'Unlimited client accounts',
      'Full white-label branding',
      'Custom domain support (CNAME)',
      'Agency reseller dashboard',
      'Priority agency support',
      'Training & onboarding materials'
    ]
  };

  const updateForm = (updates: Partial<typeof formData>) => setFormData(prev => ({ ...prev, ...updates }));

  const handleAgencySignup = async () => {
    if (!formData.email || !formData.password || !formData.fullName) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError(null);
    
    const { data, error: signupError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: formData.fullName,
          agency_name: formData.agencyName,
          user_type: 'agency',
          website: formData.website,
          client_count: formData.clientCount
        }
      }
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
    } else {
      setLoading(false);
      setStep(3); 
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-slate-900">Launch Your Agency</h2>
              <p className="text-slate-500 mt-2">Scale your services with a fully branded platform.</p>
            </div>
            {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 mb-4">{error}</div>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Agency Name</span>
                <input type="text" value={formData.agencyName} onChange={e => updateForm({agencyName: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 font-bold" placeholder="Pixel Perfect Marketing" />
              </label>
              <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Full Name</span>
                <input type="text" value={formData.fullName} onChange={e => updateForm({fullName: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 font-bold" placeholder="John Doe" />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Agency Email</span>
                <input type="email" value={formData.email} onChange={e => updateForm({email: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 font-bold" placeholder="hello@myagency.com" />
              </label>
              <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</span>
                <input type="tel" value={formData.phone} onChange={e => updateForm({phone: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 font-bold" placeholder="+1..." />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</span>
                <input type="password" value={formData.password} onChange={e => updateForm({password: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 font-bold" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
              </label>
               <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Clients</span>
                <select value={formData.clientCount} onChange={e => updateForm({clientCount: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none">
                   <option>0-5</option>
                   <option>6-10</option>
                   <option>11-25</option>
                   <option>26-50</option>
                   <option>50+</option>
                </select>
              </label>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-green-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-500/20 hover:bg-green-700 transition-all uppercase tracking-widest cursor-pointer"
            >
              Continue to Preview
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-slate-900">White Label Preview</h2>
              <p className="text-slate-500 mt-2">You'll customize your branding fully after activation.</p>
            </div>

            <div className="bg-slate-900 rounded-[32px] p-8 text-white flex flex-col md:flex-row gap-12 items-center">
               <div className="flex-1 space-y-6">
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-[10px] font-black">LOGO</div>
                        <div className="h-2 w-16 bg-white/20 rounded"></div>
                     </div>
                     <div className="space-y-2">
                        <div className="h-10 w-full bg-white/5 rounded-lg border border-white/10"></div>
                        <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                     </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">The dashboard will be mapped to <span className="text-green-400 font-bold">reviews.{formData.agencyName.toLowerCase().replace(/\s/g, '') || 'youragency'}.com</span></p>
               </div>
               <div className="flex-1 space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-green-400">Included Features</h4>
                  <ul className="space-y-2">
                    {agencyPlan.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm font-medium">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all uppercase tracking-widest cursor-pointer"
              >
                Back
              </button>
              <button 
                onClick={handleAgencySignup}
                disabled={loading}
                className="flex-[2] bg-green-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-500/20 hover:bg-green-700 transition-all disabled:opacity-50 uppercase tracking-widest cursor-pointer"
              >
                {loading ? "Creating Account..." : "Confirm & Proceed to Payment"}
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <PaymentSection 
            plan={agencyPlan} 
            cycle="monthly" 
            onBack={() => setStep(2)} 
            onSuccess={onComplete} 
            theme="emerald"
          />
        );
      default: return null;
    }
  };

  return (
    <div className="bg-white min-h-full flex flex-col">
      <div className="max-w-4xl mx-auto w-full px-6 py-12 md:py-24">
        <div className="flex justify-between items-center mb-12">
           <button onClick={onCancel} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold transition-all uppercase text-xs tracking-widest cursor-pointer">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
             Back to Home
           </button>
        </div>
        <div className="bg-white p-8 md:p-12 rounded-[48px] shadow-2xl border border-slate-100">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default SignUpAgency;
