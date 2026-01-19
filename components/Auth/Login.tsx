import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

interface LoginProps {
  onCancel: () => void;
  onBusinessSignup: () => void;
  onAgencySignup: () => void;
  onLoginSuccess: (type?: 'business' | 'agency') => void;
}

const Login: React.FC<LoginProps> = ({ onCancel, onBusinessSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError("Email or password is incorrect");
      setLoading(false);
    } else {
      onLoginSuccess();
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    // Fixed: Explicitly using window.location.origin to ensure redirects go to the live site, not localhost
    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (googleError) {
      setError(googleError.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col overflow-y-auto">
      <div className="max-w-xl mx-auto w-full px-6 py-12 md:py-24">
        <div className="flex justify-between items-center mb-12">
          <button onClick={onCancel} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
            Back to Home
          </button>
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 p-1.5 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            </div>
            <span className="font-black text-black">G5SR</span>
          </div>
        </div>

        <div className="bg-white rounded-[48px] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="p-10 md:p-14">
            <h2 className="text-3xl font-black text-black mb-8">
              Welcome back to <span className="text-green-600">Get5StarsReview</span>
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-bold animate-in fade-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="block space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</span>
                <input 
                  type="email" 
                  required 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 outline-none font-bold" 
                  placeholder="name@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </label>

              <label className="block space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</span>
                  <button type="button" className="text-[10px] font-black text-green-600 uppercase">Forgot Password?</button>
                </div>
                <input 
                  type="password" 
                  required
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 outline-none font-bold" 
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </label>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center bg-green-600 hover:bg-green-700 text-white shadow-green-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-100"></div>
              <span className="text-xs font-bold text-slate-400 uppercase">Or continue with</span>
              <div className="flex-1 h-px bg-slate-100"></div>
            </div>

            <div className="mt-6">
              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-4 border-2 border-slate-100 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50"
              >
                <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" className="w-5 h-5" alt="Google" />
                Sign in with Google
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">Don't have an account? <button onClick={onBusinessSignup} className="text-green-600 font-bold hover:underline">Start free trial</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
