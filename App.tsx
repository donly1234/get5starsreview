
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Header from './components/Header';
import Hero from './components/Hero';
import Integrations from './components/Integrations';
import AboutUs from './components/AboutUs';
import InteractiveDemo from './components/InteractiveDemo';
import MapComparison from './components/MapComparison';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import Features from './components/Features';
import VideoTestimonials from './components/VideoTestimonials';
import ComparisonTable from './components/ComparisonTable';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import BlogPage from './components/BlogPage';
import BlogPostView from './components/BlogPostView';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import SignUpBusiness from './components/Auth/SignUpBusiness';
import SignUpAgency from './components/Auth/SignUpAgency';
import Login from './components/Auth/Login';
import AppSelector from './components/Auth/AppSelector';
import GBPAuditTool from './components/GBPAuditTool';

export type UserType = 'business' | 'agency';
export type AppView = 'landing' | 'signup-business' | 'signup-agency' | 'login' | 'dashboard' | 'app-selector' | 'auditor' | 'blog' | 'blog-post';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
          setUserType(session.user.user_metadata?.user_type || 'business');
          // Optional: Auto-redirect logged in users to app selector
          // setView('app-selector'); 
        }
      } catch (err) {
        console.error("Supabase Auth Init Failed:", err);
      } finally {
        setLoading(false);
      }
    };
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setUserType(session.user.user_metadata?.user_type || 'business');
        if (event === 'SIGNED_IN') setView('app-selector');
      } else {
        setUser(null);
        setUserType(null);
        if (event === 'SIGNED_OUT') setView('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('landing');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-slate-100 border-t-[#16A34A] rounded-full animate-spin"></div>
        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">
          Get5StarsReview Intelligence Hub...
        </p>
      </div>
    );
  }

  if (view === 'dashboard') {
    return <Dashboard onLogout={handleLogout} userType={userType || 'business'} user={user} onUpgradeFlow={() => setView('signup-business')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {view === 'login' && <Login onCancel={() => setView('landing')} onBusinessSignup={() => setView('signup-business')} onAgencySignup={() => setView('signup-agency')} onLoginSuccess={() => setView('app-selector')} />}
      {view === 'signup-business' && <SignUpBusiness onComplete={() => setView('app-selector')} onCancel={() => setView('landing')} onSwitchToAgency={() => setView('signup-agency')} />}
      {view === 'signup-agency' && <SignUpAgency onComplete={() => setView('app-selector')} onCancel={() => setView('landing')} onSwitchToBusiness={() => setView('signup-business')} />}
      {view === 'app-selector' && <AppSelector onSelect={(id) => id === 'gbp-auditor' ? setView('auditor') : setView('dashboard')} onBack={() => setView('landing')} />}

      <Header 
        onLogin={() => setView('login')} 
        onToolsClick={() => setView('app-selector')}
        onBusinessSignup={() => setView('signup-business')} 
        onAgencySignup={() => setView('signup-agency')}
        onHomeClick={() => setView('landing')}
        onBlogClick={() => setView('blog')}
      />
      
      <main className="flex-grow">
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
            <Services onAuditClick={() => setView('auditor')} />
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

export default App;
