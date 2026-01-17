import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import ContactUs from './components/ContactUs';
import MapComparison from './components/MapComparison';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Blog from './components/Blog';
import Integrations from './components/Integrations';
import VideoTestimonials from './components/VideoTestimonials';
import Dashboard from './components/Dashboard/Dashboard';
import SignUpBusiness from './components/Auth/SignUpBusiness';
import SignUpAgency from './components/Auth/SignUpAgency';
import Login from './components/Auth/Login';
import AppSelector from './components/Auth/AppSelector';
import GBPAuditTool from './components/GBPAuditTool';

export type UserType = 'business' | 'agency';
export type AppView = 'landing' | 'signup-business' | 'signup-agency' | 'login' | 'dashboard' | 'app-selector' | 'auditor';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        // Handle metadata from both manual and OAuth providers
        const type = session.user.user_metadata?.user_type || 'business';
        setUserType(type as UserType);
        setView('dashboard');
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        const type = session.user.user_metadata?.user_type || 'business';
        setUserType(type as UserType);
        
        if (pendingAction === 'gbp-auditor') {
          setView('auditor');
          setPendingAction(null);
        } else if (view !== 'auditor') {
          setView('dashboard');
        }
      } else {
        setUser(null);
        setUserType(null);
        if (view === 'dashboard' || view === 'auditor') {
          setView('landing');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [pendingAction, view]);

  const handleStartBusinessSignup = (action?: string) => {
    if (action) setPendingAction(action);
    setView('signup-business');
  };

  const handleStartAgencySignup = () => {
    setView('signup-agency');
  };

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setUserType(null);
    setView('landing');
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (view === 'dashboard') {
    return <Dashboard onLogout={handleLogout} userType={userType || 'business'} user={user} />;
  }

  if (view === 'auditor') {
    return (
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50 print:hidden">
          <div className="flex items-center gap-4">
            <button onClick={() => setView(userType ? 'dashboard' : 'landing')} className="text-slate-400 hover:text-slate-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <h1 className="text-lg font-black text-slate-900 uppercase tracking-tighter italic">GBP SEO Auditor</h1>
          </div>
          <button onClick={() => setView(userType ? 'dashboard' : 'landing')} className="bg-black text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg hover:bg-green-600 transition-all">
            {userType ? 'Return to Dashboard' : 'Back to Home'}
          </button>
        </nav>
        <GBPAuditTool onSignup={() => handleStartBusinessSignup()} />
      </div>
    );
  }

  if (view === 'app-selector') {
    return (
      <AppSelector 
        onSelect={(appId) => {
          if (appId === 'gbp-auditor') {
             handleStartBusinessSignup('gbp-auditor');
          } else {
             setView('login');
          }
        }} 
        onBack={() => setView('landing')} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-white">
      {view === 'login' && (
        <Login 
          onCancel={() => setView('landing')} 
          onBusinessSignup={() => handleStartBusinessSignup()} 
          onAgencySignup={handleStartAgencySignup} 
          onLoginSuccess={() => setView('dashboard')}
        />
      )}
      {view === 'signup-business' && (
        <SignUpBusiness 
          onComplete={() => setView('dashboard')}
          onCancel={() => setView('landing')} 
          onSwitchToAgency={handleStartAgencySignup} 
          skipSuccessScreen={pendingAction === 'gbp-auditor'}
        />
      )}
      {view === 'signup-agency' && (
        <SignUpAgency 
          onComplete={() => setView('dashboard')}
          onCancel={() => setView('landing')} 
          onSwitchToBusiness={() => handleStartBusinessSignup()} 
        />
      )}

      <Header 
        onLogin={() => setView('app-selector')} 
        onToolsClick={() => setView('app-selector')}
        onBusinessSignup={() => handleStartBusinessSignup()} 
        onAgencySignup={handleStartAgencySignup} 
      />
      
      <main className="flex-grow">
        <Hero onStartBusiness={() => handleStartBusinessSignup()} onStartAgency={handleStartAgencySignup} />
        <Integrations />
        <MapComparison />
        <Pricing onStartBusiness={() => handleStartBusinessSignup()} onStartAgency={handleStartAgencySignup} />
        <Features />
        <VideoTestimonials />
        <FAQ />
        <Blog />
        <ContactUs />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;