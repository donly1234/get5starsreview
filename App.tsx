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
export type AppView = 'landing' | 'signup-business' | 'signup-agency' | 'login' | 'dashboard' | 'app-selector' | 'auditor' | 'blog' | 'blog-post';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
          setUserType(session.user.user_metadata?.user_type || 'business');
          if (view === 'landing') {
            setView('dashboard');
          }
        }
      } catch (err) {
        console.error("Auth Background Check Error:", err);
      }
    };
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setUserType(session.user.user_metadata?.user_type || 'business');
        if (event === 'SIGNED_IN') setView('dashboard');
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

  if (view === 'dashboard') {
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
