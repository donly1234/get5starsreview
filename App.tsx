
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
import ComparisonTable from './components/ComparisonTable.tsx';
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

export type UserType = 'business' | 'agency';
// Added 'loading' as a valid starting view to prevent auth race conditions
export type AppView = 'loading' | 'landing' | 'signup-business' | 'signup-agency' | 'login' | 'dashboard' | 'app-selector' | 'auditor' | 'blog' | 'blog-post';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('loading');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 1. Check for initial session immediately
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

    // 2. Listen for real-time auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setUserType(session.user.user_metadata?.user_type || 'business');
        // Only force dashboard if they are on a gate-keep page
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
  }, []); // Re-run only on mount

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

  // Global Loading State
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
        onUpgradeFlow={() => setView('signup-business')} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {view === 'login' && <Login onCancel={() => setView('landing')} onBusinessSignup={() => setView('signup-business')} onAgencySignup={() => setView('signup-agency')} onLoginSuccess={() => setView('dashboard')} />}
      {view === 'signup-business' && <SignUpBusiness onComplete={() => setView('dashboard')} onCancel={() => setView('landing')} onSwitchToAgency={() => setView('signup-agency')} />}
      {view === 'signup-agency' && <SignUpAgency onComplete={() => setView('dashboard')} onCancel={() => setView('landing')} onSwitchToBusiness={() => setView('signup-business')} />}

      <Header 
        onLogin={() => user ? setView('dashboard') : setView('login')} 
        onToolsClick={() => { setView('app-selector'); window.scrollTo(0, 0); }}
        onBusinessSignup={() => setView('signup-business')} 
        onAgencySignup={() => setView('signup-agency')}
        onHomeClick={() => setView('landing')}
        onBlogClick={() => setView('blog')}
      />
      
      <main className="flex-grow">
        {view === 'app-selector' && <AppSelector onSelect={handleAppSelect} onBack={() => setView('landing')} />}
        {view === 'blog' && <BlogPage onPostClick={(id) => { setSelectedPostId(id); setView('blog-post'); }} />}
        {view === 'blog-post' && selectedPostId && <BlogPostView postId={selectedPostId} onBack={() => setView('blog')} onSignup={() => setView('signup-business')} />}
        {view === 'auditor' && <div className="pt-20"><GBPAuditTool onSignup={() => setView('signup-business')} /></div>}
        
        {view === 'landing' && (
          <>
            <Hero onStartBusiness={() => setView('signup-business')} onStartAgency={() => setView('signup-agency')} />
            <Integrations />
            <AboutUs />
            <InteractiveDemo />
            <MapComparison />
            <HowItWorks onStart={() => setView('signup-business')} />
            <Services onAuditClick={() => setView('app-selector')} />
            <TrustStack />
            <Features />
            <VideoTestimonials />
            <ComparisonTable onBusinessClick={() => setView('signup-business')} onAgencyClick={() => setView('signup-agency')} />
            <Pricing onStartBusiness={() => setView('signup-business')} onStartAgency={() => setView('signup-agency')} />
            <FAQ />
            <Blog onPostClick={(id) => { setSelectedPostId(id); setView('blog-post'); }} onViewAll={() => setView('blog')} />
            <ContactUs />
          </>
        )}
      </main>
      <Footer onBlogClick={() => setView('blog')} onHomeClick={() => setView('landing')} />
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
