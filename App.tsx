
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
import HeatmapTool from './components/HeatmapTool.tsx';
import LegalView from './components/LegalView.tsx';
import SocialNudge from './components/SocialNudge.tsx';
import Newsletter from './components/Newsletter.tsx';

export type UserType = 'business' | 'agency';
export type AppView = 'loading' | 'landing' | 'signup-business' | 'signup-agency' | 'login' | 'dashboard' | 'app-selector' | 'auditor' | 'heatmap' | 'blog' | 'blog-post' | 'privacy' | 'terms';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('loading');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showCookieConsent, setShowCookieConsent] = useState(false);

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

    const consent = localStorage.getItem('g5sr_cookies');
    if (!consent) setShowCookieConsent(true);

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
    } else if (id === 'heatmap') {
      setView('heatmap');
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
      <SystemStatus />
      
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
        {view === 'heatmap' && <div className="pt-20"><HeatmapTool onSignup={() => navigate('signup-business')} /></div>}
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

      {showCookieConsent && <CookieConsent onClose={() => { localStorage.setItem('g5sr_cookies', 'true'); setShowCookieConsent(false); }} />}
    </div>
  );
};

const SystemStatus = () => (
  <div className="bg-slate-950 py-2 border-b border-white/5 relative z-[60]">
     <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
           <span className="flex h-2 w-2 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
           </span>
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">GSR Core v5.2: All Systems Operational</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
           <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Live Traffic: 2,142 Req/m</span>
           <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">API Latency: 42ms</span>
        </div>
     </div>
  </div>
);

const CookieConsent = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed bottom-0 inset-x-0 z-[120] p-6 animate-in slide-in-from-bottom-full duration-500">
     <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-4">
           <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shrink-0">🍪</div>
           <div>
              <p className="text-sm font-bold text-slate-900 leading-tight">We value your privacy.</p>
              <p className="text-xs text-slate-500 mt-1">We use cookies to enhance your ranking experience and analyze platform performance. By clicking "Accept", you agree to our usage of cookies.</p>
           </div>
        </div>
        <div className="flex gap-3 shrink-0">
           <button onClick={onClose} className="px-6 py-3 rounded-xl text-xs font-black uppercase text-slate-400 hover:text-slate-900 transition-all tracking-widest">Settings</button>
           <button onClick={onClose} className="px-8 py-3 bg-black text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl">Accept All</button>
        </div>
     </div>
  </div>
);

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
