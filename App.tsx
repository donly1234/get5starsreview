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
import InteractiveDemo from './components/InteractiveDemo';

export type UserType = 'business' | 'agency';
export type AppView = 'landing' | 'signup-business' | 'signup-agency' | 'login' | 'dashboard' | 'app-selector' | 'auditor';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial session check
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setUserType(session.user.user_metadata?.user_type || 'business');
        setView('dashboard');
      }
      setLoading(false);
    };

    checkSession();

    // Listen for auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setUserType(session.user.user_metadata?.user_type || 'business');
        setView('dashboard');
      } else {
        setUser(null);
        setUserType(null);
        if (view === 'dashboard') setView('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, [view]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-100 border-t-[#16A34A] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">
          Securing Session...
        </p>
      </div>
    );
  }

  if (view === 'dashboard') {
    return <Dashboard onLogout={() => setView('landing')} userType={userType || 'business'} user={user} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {view === 'login' && <Login onCancel={() => setView('landing')} onBusinessSignup={() => setView('signup-business')} onAgencySignup={() => setView('signup-agency')} onLoginSuccess={() => setView('dashboard')} />}
      {view === 'signup-business' && <SignUpBusiness onComplete={() => setView('dashboard')} onCancel={() => setView('landing')} onSwitchToAgency={() => setView('signup-agency')} />}
      {view === 'signup-agency' && <SignUpAgency onComplete={() => setView('dashboard')} onCancel={() => setView('landing')} onSwitchToBusiness={() => setView('signup-business')} />}
      {view === 'app-selector' && <AppSelector onSelect={(id) => id === 'gbp-auditor' ? setView('auditor') : setView('login')} onBack={() => setView('landing')} />}

      <Header 
        onLogin={() => setView('app-selector')} 
        onToolsClick={() => setView('app-selector')}
        onBusinessSignup={() => setView('signup-business')} 
        onAgencySignup={() => setView('signup-agency')} 
      />
      
      <main className="flex-grow">
        {view === 'auditor' ? (
          <div className="pt-20"><GBPAuditTool onSignup={() => setView('signup-business')} /></div>
        ) : (
          <>
            <Hero onStartBusiness={() => setView('signup-business')} onStartAgency={() => setView('signup-agency')} />
            <Integrations />
            <InteractiveDemo />
            <MapComparison />
            <Services />
            <Features />
            <VideoTestimonials />
            <Pricing onStartBusiness={() => setView('signup-business')} onStartAgency={() => setView('signup-agency')} />
            <FAQ />
            <Blog />
            <ContactUs />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
