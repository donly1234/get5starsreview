
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient.ts';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Integrations from './components/Integrations.tsx';
import AboutUs from './components/AboutUs.tsx';
import InteractiveDemo from './components/InteractiveDemo.tsx';
import MapComparison from './components/MapComparison.tsx';
import HowItWorks from './components/HowItWorks.tsx';
import Services from './components/Services.tsx';
import Features from './components/Features.tsx';
import VideoTestimonials from './components/VideoTestimonials.tsx';
import Pricing from './components/Pricing.tsx';
import FAQ from './components/FAQ.tsx';
import Blog from './components/Blog.tsx';
import BlogPage from './components/BlogPage.tsx';
import BlogPostView from './components/BlogPostView.tsx';
import ContactUs from './components/ContactUs.tsx';
import Footer from './components/Footer.tsx';
import Dashboard from './components/Dashboard/Dashboard.tsx';
import SignUpBusiness from './components/Auth/SignUpBusiness.tsx';
import SignUpAgency from './components/Auth/SignUpAgency.tsx';
import Login from './components/Auth/Login.tsx';
import AppSelector from './components/Auth/AppSelector.tsx';
import GBPAuditTool from './components/GBPAuditTool.tsx';
import LegalView from './components/LegalView.tsx';
import SocialNudge from './components/SocialNudge.tsx';
import Newsletter from './components/Newsletter.tsx';

export type UserType = 'business' | 'agency';
export type AppView = 'loading' | 'landing' | 'signup-business' | 'signup-agency' | 'login' | 'dashboard' | 'app-selector' | 'auditor' | 'blog' | 'blog-post' | 'privacy' | 'terms';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('loading');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setUserType(session.user.user_metadata?.user_type || 'business');
        setView('dashboard');
      } else {
        setView('landing');
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setUserType(session.user.user_metadata?.user_type || 'business');
        if (['landing', 'login', 'signup-business', 'signup-agency', 'loading'].includes(view)) {
          setView('dashboard');
        }
      } else {
        setUser(null);
        setUserType(null);
        if (event === 'SIGNED_OUT') {
          setView('landing');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('landing');
  };

  const handleAppSelect = (id: string) => {
    if (id === 'gbp-auditor') {
      setView('auditor');
    } else {
      setView(user ? 'dashboard' : 'login');
    }
  };

  const navigate = (newView: AppView) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  if (view === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Initializing Secure Session...</p>
      </div>
    );
  }

  if (user && view === 'dashboard') {
    return (
      <Dashboard 
        onLogout={handleLogout} 
        userType={userType || 'business'} 
        user={user} 
        onUpgradeFlow={() => navigate('signup-business')} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {view === 'login' && <Login onCancel={() => navigate('landing')} onBusinessSignup={() => navigate('signup-business')} onAgencySignup={() => navigate('signup-agency')} onLoginSuccess={() => navigate('dashboard')} />}
      {view === 'signup-business' && <SignUpBusiness onComplete={() => navigate('dashboard')} onCancel={() => navigate('landing')} onSwitchToAgency={() => navigate('signup-agency')} />}
      {view === 'signup-agency' && <SignUpAgency onComplete={() => navigate('dashboard')} onCancel={() => navigate('landing')} onSwitchToBusiness={() => navigate('signup-business')} />}

      <Header 
        onLogin={() => user ? navigate('dashboard') : navigate('login')} 
        onToolsClick={() => navigate('app-selector')}
        onBusinessSignup={() => navigate('signup-business')} 
        onAgencySignup={() => navigate('signup-agency')}
        onHomeClick={() => navigate('landing')}
        onBlogClick={() => navigate('blog')}
      />
      
      <main className="flex-grow">
        {view === 'app-selector' && <AppSelector onSelect={handleAppSelect} onBack={() => navigate('landing')} />}
        {view === 'blog' && <BlogPage onPostClick={(id) => { setSelectedPostId(id); navigate('blog-post'); }} />}
        {view === 'blog-post' && selectedPostId && <BlogPostView postId={selectedPostId} onBack={() => navigate('blog')} onSignup={() => navigate('signup-business')} />}
        {view === 'auditor' && <div className="pt-20"><GBPAuditTool onSignup={() => navigate('signup-business')} /></div>}
        {(view === 'privacy' || view === 'terms') && <LegalView type={view} onBack={() => navigate('landing')} />}
        
        {view === 'landing' && (
          <>
            <Hero onStartBusiness={() => navigate('signup-business')} onStartAgency={() => navigate('signup-agency')} />
            <Integrations />
            <AboutUs />
            <InteractiveDemo />
            <MapComparison />
            <HowItWorks onStart={() => navigate('signup-business')} />
            <Services onAuditClick={() => navigate('app-selector')} />
            <TrustStack />
            <Features />
            <VideoTestimonials />
            <Pricing onStartBusiness={() => navigate('signup-business')} onStartAgency={() => navigate('signup-agency')} />
            <FAQ />
            <Blog onPostClick={(id) => { setSelectedPostId(id); navigate('blog-post'); }} onViewAll={() => navigate('blog')} />
            <ContactUs />
            <Newsletter />
            <SocialNudge />
          </>
        )}
      </main>
      <Footer 
        onBlogClick={() => navigate('blog')} 
        onHomeClick={() => navigate('landing')} 
        onPrivacyClick={() => navigate('privacy')}
        onTermsClick={() => navigate('terms')}
      />
    </div>
  );
};

const TrustStack = () => (
  <div className="container mx-auto px-6 py-12">
     <div className="bg-slate-950 rounded-[48px] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 border-b-4 border-emerald-600 shadow-2xl">
        <div className="space-y-4">
           <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em]">Market Authority</span>
           <h3 className="text-3xl font-black uppercase italic tracking-tight leading-none">The Trusted Choice for <br />Local Domination.</h3>
           <p className="text-slate-400 font-medium max-w-sm">Join 2,000+ brands automating their path to Google Maps perfection.</p>
        </div>
        <div className="flex gap-10">
           <div className="text-center">
             <p className="text-4xl font-black text-emerald-500">98%</p>
             <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Retention</p>
           </div>
           <div className="text-center">
             <p className="text-4xl font-black text-emerald-500">1.2M</p>
             <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Requests</p>
           </div>
           <div className="text-center">
             <p className="text-4xl font-black text-emerald-500">24/7</p>
             <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">AI Logic</p>
           </div>
        </div>
     </div>
  </div>
);

export default App;
