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
  const [error, setError] = useState<string | null>(null);
  const [verificationRequired, setVerificationRequired] = useState(false);
  const [formData, setFormData] = useState({
    email: '', password: '', businessName: '', fullName: '', phone: '',
    industry: 'Food & Beverage', website: '', address: '', platforms: [] as string[]
  });

  const updateForm = (updates: Partial<typeof formData>) => setFormData(prev => ({ ...prev, ...updates }));

  const handleSignupComplete = async () => {
    if (!formData.email || !formData.password || !formData.fullName || !formData.businessName) {
      setStep(1);
      setError("Please ensure Name, Business, Email, and Password are filled out.");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Explicitly use production URL for verification link redirects
      const redirectUrl = window.location.hostname === 'localhost' 
        ? window.location.origin 
        : 'https://get5starsreview.com';

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

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const redirectUrl = window.location.hostname === 'localhost' 
        ? window.location.origin 
        : 'https://get5starsreview.com';

      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
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
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-sm">✉️</div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Verify Your Email</h2>
          <p className="text-slate-500 font-bold max-w-md mx-auto">
            We've sent a confirmation link to <span className="text-slate-900 font-black">{formData.email}</span>. 
            Please check your inbox and click the link to activate your account.
          </p>
          <div className="pt-6">
            <button 
              onClick={onCancel}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all"
            >
              Return to Homepage
            </button>
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
              className="w-full py-4 border-2 border-slate-100 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-95 mb-6 group"
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
              <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</span>
                <input type="text" value={formData.fullName} onChange={e => updateForm({fullName: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all font-bold" placeholder="John Doe" />
              </label>
              <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Business Name</span>
                <input type="text" value={formData.businessName} onChange={e => updateForm({businessName: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all font-bold" placeholder="The Downtown Bakery" />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</span>
                <input type="email" value={formData.email} onChange={e => updateForm({email: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all font-bold" placeholder="john@example.com" />
              </label>
              <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone (Optional)</span>
                <input type="tel" value={formData.phone} onChange={e => updateForm({phone: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all font-bold" placeholder="+1..." />
              </label>
            </div>
            <div className="space-y-2">
              <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</span>
                <input type="password" value={formData.password} onChange={e => updateForm({password: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all font-bold" placeholder="••••••••" />
              </label>
            </div>
            <button 
              onClick={() => {
                setError(null);
                setStep(2);
              }}
              className="w-full bg-green-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-500/20 hover:bg-green-700 transition-all active:scale-[0.98] uppercase tracking-widest"
            >
              Continue to Setup
            </button>
            <div className="text-center">
              <button onClick={onSwitchToAgency} className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest underline">Are you an Agency? Click here</button>
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
                <select value={formData.industry} onChange={e => updateForm({industry: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 outline-none font-bold">
                  {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </label>
              <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Website URL</span>
                <input type="url" value={formData.website} onChange={e => updateForm({website: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all font-bold" placeholder="https://..." />
              </label>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  setError(null);
                  setStep(1);
                }}
                className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all uppercase tracking-widest"
              >
                Back
              </button>
              <button 
                onClick={handleSignupComplete} 
                disabled={loading}
                className="flex-[2] bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-50 uppercase tracking-widest"
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
    <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full px-6 py-12 md:py-24">
        <div className="flex justify-between items-center mb-12 shrink-0">
           <button onClick={onCancel} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-black transition-all uppercase text-xs tracking-widest">
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
