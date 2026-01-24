
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import TrialSuccessScreen from '../Dashboard/Trial/TrialSuccessScreen';

interface SignUpBusinessProps {
  onComplete: () => void;
  onCancel: () => void;
  onSwitchToAgency: () => void;
  isUpgradeFlow?: boolean;
  skipSuccessScreen?: boolean;
}

const industries = [
  'Food & Beverage', 'Professional Services', 'Healthcare', 'Retail', 'Hospitality', 'Real Estate', 'E-commerce', 'Other'
];

const SignUpBusiness: React.FC<SignUpBusinessProps> = ({ onComplete, onCancel, onSwitchToAgency, isUpgradeFlow = false, skipSuccessScreen = false }) => {
  const [step, setStep] = useState(isUpgradeFlow ? 4 : 1);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [verificationRequired, setVerificationRequired] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '', password: '', businessName: '', fullName: '', phone: '',
    industry: 'Food & Beverage', website: '', address: '', platforms: [] as string[]
  });

  const updateForm = (updates: Partial<typeof formData>) => setFormData(prev => ({ ...prev, ...updates }));

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName) errors.fullName = "Name is required";
    if (!formData.businessName) errors.businessName = "Business name is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid format";
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 8) errors.password = "Min 8 characters required";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!formData.website) errors.website = "Website URL is required";
    else if (!/^https?:\/\//.test(formData.website)) errors.website = "Must start with http:// or https://";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignupComplete = async () => {
    if (!validateStep2()) return;

    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    
    try {
      const redirectUrl = window.location.origin;

      const { data, error: signupError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: formData.fullName,
            business_name: formData.businessName,
            user_type: 'business',
            industry: formData.industry,
            website: formData.website
          }
        }
      });

      if (signupError) {
        setError(signupError.message);
        setLoading(false);
      } else {
        if (!data.session) {
          setVerificationRequired(true);
          setLoading(false);
        } else {
          setLoading(false);
          if (skipSuccessScreen) {
            onComplete();
          } else {
            setStep(6); 
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!formData.email) return;
    setResending(true);
    setError(null);
    setSuccessMsg(null);
    
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: formData.email,
      options: {
        emailRedirectTo: window.location.origin
      }
    });

    if (resendError) {
      setError(resendError.message);
    } else {
      setSuccessMsg("Verification email sent! Please check your inbox.");
    }
    setResending(false);
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });
      if (googleError) throw googleError;
    } catch (err: any) {
      setError(err.message || "Failed to initialize Google login.");
      setLoading(false);
    }
  };

  const renderStep = () => {
    if (verificationRequired) {
      return (
        <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-300 py-8">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-sm animate-pulse">✉️</div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Check Your Inbox</h2>
          <p className="text-slate-500 font-bold max-w-md mx-auto leading-relaxed">
            Almost there! We've sent a verification link to <br /> <span className="text-slate-900 font-black px-2 py-1 bg-slate-100 rounded">{formData.email}</span>. 
            Click the link in that email to activate your account.
          </p>

          {successMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl text-sm font-bold animate-bounce">
              {successMsg}
            </div>
          )}

          <div className="pt-6 flex flex-col gap-4">
            <button 
              onClick={handleResendVerification}
              disabled={resending}
              className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline disabled:opacity-50 cursor-pointer"
            >
              {resending ? "Sending..." : "Didn't get the email? Resend link"}
            </button>
            <button 
              onClick={onCancel}
              className="px-8 py-4 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl cursor-pointer"
            >
              Return to Homepage
            </button>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tip: Check your spam folder if you don't see it.</p>
          </div>
        </div>
      );
    }

    switch(step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Create Your Account</h2>
              <p className="text-slate-500 mt-2 font-bold">Start your 14-day free trial. No credit card required.</p>
            </div>

            <button 
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full py-4 border-2 border-slate-100 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-95 mb-6 group cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-300 border-t-green-600 rounded-full animate-spin"></div>
              ) : (
                <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
              )}
              Sign up with Google
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-slate-100"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Or with email</span>
              <div className="flex-1 h-px bg-slate-100"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</span>
                  <input type="text" value={formData.fullName} onChange={e => updateForm({fullName: e.target.value})} className={`w-full p-4 bg-slate-50 border ${fieldErrors.fullName ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all font-bold`} placeholder="John Doe" />
                </label>
                {fieldErrors.fullName && <p className="text-[9px] font-black text-rose-500 uppercase px-2">{fieldErrors.fullName}</p>}
              </div>
              <div className="space-y-2">
                <label className="block space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Business Name</span>
                  <input type="text" value={formData.businessName} onChange={e => updateForm({businessName: e.target.value})} className={`w-full p-4 bg-slate-50 border ${fieldErrors.businessName ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all font-bold`} placeholder="The Downtown Bakery" />
                </label>
                {fieldErrors.businessName && <p className="text-[9px] font-black text-rose-500 uppercase px-2">{fieldErrors.businessName}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
               <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</span>
                <input type="email" value={formData.email} onChange={e => updateForm({email: e.target.value})} className={`w-full p-4 bg-slate-50 border ${fieldErrors.email ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all font-bold`} placeholder="john@example.com" />
              </label>
              {fieldErrors.email && <p className="text-[9px] font-black text-rose-500 uppercase px-2">{fieldErrors.email}</p>}
              </div>
              <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone (Optional)</span>
                <input type="tel" value={formData.phone} onChange={e => updateForm({phone: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all font-bold" placeholder="+1..." />
              </label>
            </div>
            <div className="space-y-2">
              <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</span>
                <input type="password" value={formData.password} onChange={e => updateForm({password: e.target.value})} className={`w-full p-4 bg-slate-50 border ${fieldErrors.password ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all font-bold`} placeholder="••••••••" />
              </label>
              {fieldErrors.password && <p className="text-[9px] font-black text-rose-500 uppercase px-2">{fieldErrors.password}</p>}
            </div>
            <button 
              onClick={() => {
                if (validateStep1()) {
                  setError(null);
                  setStep(2);
                }
              }}
              className="w-full bg-green-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-500/20 hover:bg-green-700 transition-all active:scale-[0.98] uppercase tracking-widest cursor-pointer"
            >
              Continue to Setup
            </button>
            <div className="text-center">
              <button onClick={onSwitchToAgency} className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest underline cursor-pointer">Are you an Agency? Click here</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Business Profile Setup</h2>
              <p className="text-slate-500 mt-2 font-bold">Tailor your reputation experience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Industry</span>
                <select value={formData.industry} onChange={e => updateForm({industry: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 outline-none font-bold cursor-pointer">
                  {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </label>
              <div className="space-y-2">
                <label className="block space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Website URL</span>
                  <input type="url" value={formData.website} onChange={e => updateForm({website: e.target.value})} className={`w-full p-4 bg-slate-50 border ${fieldErrors.website ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all font-bold`} placeholder="https://..." />
                </label>
                {fieldErrors.website && <p className="text-[9px] font-black text-rose-500 uppercase px-2">{fieldErrors.website}</p>}
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  setError(null);
                  setStep(1);
                }}
                className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all uppercase tracking-widest cursor-pointer"
              >
                Back
              </button>
              <button 
                onClick={handleSignupComplete} 
                disabled={loading}
                className="flex-[2] bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-50 uppercase tracking-widest cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : 'Complete Registration'}
              </button>
            </div>
          </div>
        );
      case 6:
        return (
          <TrialSuccessScreen onProceed={onComplete} businessName={formData.businessName || 'your business'} />
        );
      default: return null;
    }
  };

  return (
    <div className="bg-slate-50 min-h-full flex flex-col py-12 md:py-24">
      <div className="max-w-4xl mx-auto w-full px-6">
        <div className="flex justify-between items-center mb-12">
           <button onClick={onCancel} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-black transition-all uppercase text-xs tracking-widest cursor-pointer">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
             Back to Home
           </button>
        </div>
        <div className="bg-white p-8 md:p-12 rounded-[48px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 relative">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold mb-6 animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default SignUpBusiness;
