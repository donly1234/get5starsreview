import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import TrialSuccessScreen from '../Dashboard/Trial/TrialSuccessScreen';

interface SignUpBusinessProps {
  onComplete: () => void;
  onCancel: () => void;
  onSwitchToAgency: () => void;
  isUpgradeFlow?: boolean;
}

const industries = ['Professional Services', 'Food & Beverage', 'Healthcare', 'Retail', 'Real Estate', 'Other'];

const SignUpBusiness: React.FC<SignUpBusinessProps> = ({ onComplete, onCancel, onSwitchToAgency }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '', password: '', businessName: '', fullName: '', industry: 'Professional Services', website: 'http://'
  });

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            business_name: formData.businessName,
            user_type: 'business',
            industry: formData.industry,
            website: formData.website
          }
        }
      });

      if (signupError) throw signupError;
      setStep(3); // Success Screen
    } catch (err: any) {
      if (err.message?.includes("fetch")) {
        setError("Network Congestion: Our primary sync channel is experiencing high latency. Please click 'Complete Registration' again to retry the secure handshake.");
      } else {
        setError(err.message || "An unexpected error occurred during profile synchronization.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <button onClick={onCancel} className="mb-8 flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-600 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
          Back to Home
        </button>

        <div className="bg-white p-8 md:p-14 rounded-[48px] shadow-2xl border border-slate-100 relative overflow-hidden">
          {error && (
            <div className="mb-8 p-6 bg-rose-50 border border-rose-100 rounded-3xl animate-in slide-in-from-top-4 duration-500">
               <div className="flex items-center gap-3 text-rose-600 font-black text-xs uppercase tracking-widest mb-2">
                 <span>âš ï¸</span> Authentication Protocol Error
               </div>
               <p className="text-rose-900 text-sm font-bold leading-relaxed">{error}</p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 uppercase italic">Create Your Account</h2>
                <p className="text-slate-500 font-bold">Launch your 14-day free trial instantly.</p>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                <input type="text" placeholder="Business Name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} />
                <input type="email" placeholder="Email Address" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <input type="password" placeholder="Password (Min 8 characters)" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Next Protocol</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 uppercase italic">Profile Setup</h2>
                <p className="text-slate-500 font-bold">Tailor your reputation experience.</p>
              </div>
              <div className="space-y-6">
                <label className="block space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry</span>
                  <select value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold">
                    {industries.map(i => <option key={i}>{i}</option>)}
                  </select>
                </label>
                <label className="block space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Website URL</span>
                  <input type="url" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" />
                </label>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-5 bg-slate-100 rounded-2xl font-black uppercase text-xs">Back</button>
                <button onClick={handleSignup} disabled={loading} className="flex-[2] bg-slate-950 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 disabled:opacity-50">
                  {loading ? 'SYCHRONIZING...' : 'COMPLETE REGISTRATION'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <TrialSuccessScreen onProceed={onComplete} businessName={formData.businessName} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpBusiness;
