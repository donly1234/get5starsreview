
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MetricsBar from './MetricsBar';
import ReviewFeed from './ReviewFeed';
import PerformanceGraph from './PerformanceGraph';
import RequestStatus from './RequestStatus';
import PlatformBreakdown from './PlatformBreakdown';
import RequestsManager from './Requests/RequestsManager';
import MonitoringManager from './Monitoring/MonitoringManager';
import MediaManager from './Media/MediaManager';
import WidgetsManager from './Widgets/WidgetsManager';
import AnalyticsManager from './Analytics/AnalyticsManager';
import SettingsManager from './Settings/SettingsManager';
import AIAssistantManager from './AI/AIAssistantManager';
import AIStrategyManager from './AI/AIStrategyManager';
import StrategyProgress from './AI/StrategyProgress';
import AgencyManager from './Agency/AgencyManager';
import GBPAuditTool from '../GBPAuditTool';
import BottomNav from './BottomNav';
import UpgradeModal from './Trial/UpgradeModal';
import ExpiredOverlay from './Trial/ExpiredOverlay';
import TrialChecklist from './Trial/TrialChecklist';
import NotificationCenter from './Notifications/NotificationCenter';
import { UserType } from '../../App';

interface DashboardProps {
  onLogout: () => void;
  userType: UserType;
  user: any;
  justUpgraded?: boolean;
  onUpgradeFlow?: () => void;
  onDismissUpgradeMessage?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  onLogout, 
  userType: initialUserType,
  user,
  justUpgraded = false,
  onUpgradeFlow,
  onDismissUpgradeMessage 
}) => {
  const [userType, setUserType] = useState<UserType>(initialUserType);
  const [activeTab, setActiveTab] = useState(initialUserType === 'agency' ? 'Agency Panel' : 'Dashboard');
  const [impersonatedClient, setImpersonatedClient] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [trialDaysElapsed, setTrialDaysElapsed] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setProfile(data);
          setUserType(data.user_type || initialUserType);
          
          const created = new Date(data.created_at || user.created_at);
          const now = new Date();
          const diffTime = Math.max(0, now.getTime() - created.getTime());
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          setTrialDaysElapsed(diffDays);
        }
      } catch (e) {
        console.error("Dashboard profile load error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, initialUserType]);

  const handleResendVerification = async () => {
    if (!user?.email) return;
    setResendingEmail(true);
    await supabase.auth.resend({
      type: 'signup',
      email: user.email,
      options: { emailRedirectTo: window.location.origin }
    });
    setResendingEmail(false);
    alert("Verification email resent!");
  };

  const isTrialAccount = profile?.status !== 'paid';
  const isExpired = isTrialAccount && trialDaysElapsed >= 14;
  const trialDaysLeft = Math.max(0, 14 - trialDaysElapsed);
  const emailUnconfirmed = !user?.email_confirmed_at;

  const handleFeatureClick = (tab: string) => {
    if (isExpired) {
      setShowUpgradeModal('Expired');
      return;
    }
    if (userType === 'business' && isTrialAccount) {
      const proFeatures = ['AI Assistant', 'Analytics', 'GBP Media'];
      if (proFeatures.includes(tab)) {
        setShowUpgradeModal(tab);
        return;
      }
    }
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (isExpired) {
      return <ExpiredOverlay onUpgrade={onUpgradeFlow || (() => {})} />;
    }

    switch (activeTab) {
      case 'Dashboard':
        return (
          <>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[24px] bg-white shadow-sm flex items-center justify-center text-3xl border border-slate-100">🏢</div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic leading-none">
                    {impersonatedClient ? `${impersonatedClient} Portal` : profile?.business_name || profile?.agency_name || 'My Business Hub'}
                  </h1>
                  <p className="text-slate-500 text-xs font-bold flex items-center gap-2 mt-1 uppercase tracking-widest">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${isTrialAccount ? 'bg-[#FACC15]' : 'bg-[#16A34A]'}`}></span>
                    {isTrialAccount ? `Free Trial • ${trialDaysLeft} days left` : 'Professional Enterprise Account'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleFeatureClick('SEO Auditor')}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm active:scale-95"
                >
                  SEO Audit
                </button>
                <button 
                  onClick={() => handleFeatureClick('Requests')}
                  className="flex items-center gap-2 px-8 py-3 bg-[#16A34A] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-xl active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
                  Collect Reviews
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <StrategyProgress onLaunchStrategy={() => setActiveTab('AI Strategy')} />
                {isTrialAccount && <TrialChecklist />}
                <MetricsBar isTrial={isTrialAccount} profileId={user?.id} />
                <PerformanceGraph isTrial={isTrialAccount} profileId={user?.id} />
                <ReviewFeed 
                  isTrial={isTrialAccount} 
                  profileId={user?.id} 
                  onConnectClick={() => setActiveTab('Settings')}
                />
              </div>
              <div className="space-y-8">
                <RequestStatus requestsUsed={0} isTrial={isTrialAccount} onUpgrade={onUpgradeFlow} />
                <PlatformBreakdown isTrial={isTrialAccount} onUpgrade={() => setActiveTab('Settings')} />
              </div>
            </div>
          </>
        );
      case 'Requests':
        return <RequestsManager requestsUsed={0} isTrial={isTrialAccount} onUpgrade={onUpgradeFlow} />;
      case 'Monitoring':
      case 'All Reviews':
        return <MonitoringManager isTrial={isTrialAccount} onShowUpgrade={() => setShowUpgradeModal('AI Assistant')} />;
      case 'SEO Auditor':
        return <GBPAuditTool onSignup={onUpgradeFlow || (() => {})} />;
      case 'GBP Media':
        return <MediaManager />;
      case 'Widgets':
        return <WidgetsManager />;
      case 'Analytics':
        return <AnalyticsManager />;
      case 'AI Assistant':
        return <AIAssistantManager />;
      case 'AI Strategy':
        return <AIStrategyManager profile={profile} />;
      case 'Agency Panel':
        return <AgencyManager onSwitchClient={(name) => { setImpersonatedClient(name); setActiveTab('Dashboard'); }} />;
      case 'Settings':
        return <SettingsManager isTrial={isTrialAccount} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white flex-col gap-4">
        <div className="w-12 h-12 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Establishing GSR Core Link...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-inter select-none">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleFeatureClick} 
        onLogout={onLogout} 
        userType={userType} 
        isTrial={isTrialAccount}
        onUpgrade={onUpgradeFlow}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {emailUnconfirmed && (
          <div className="bg-[#FACC15] text-[#0F172A] px-8 py-2.5 text-center text-xs font-black uppercase tracking-widest flex items-center justify-center gap-4 shrink-0 shadow-lg relative z-[70]">
             <span>⚠️ ACCOUNT UNVERIFIED: Please confirm your email to fully unlock GSR capabilities</span>
             <button 
              onClick={handleResendVerification} 
              disabled={resendingEmail}
              className="px-4 py-1 bg-white/30 hover:bg-white/50 rounded-lg transition-all text-[10px]"
             >
               {resendingEmail ? "SENDING..." : "RESEND LINK"}
             </button>
          </div>
        )}

        <TopBar 
          activeTab={activeTab} 
          onToggleNotifications={() => setShowNotifications(!showNotifications)} 
          onProfileClick={() => setActiveTab('Settings')}
          profile={profile}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 space-y-8 scroll-smooth">
          {impersonatedClient && (
            <div className="bg-[#0F172A] text-white px-6 py-2.5 text-center text-[10px] font-black uppercase tracking-[0.3em] rounded-xl border-b-4 border-emerald-500 animate-in slide-in-from-top-4">
              ACTIVE IMPERSONATION: <span className="text-[#16A34A] underline">{impersonatedClient}</span> • <button onClick={() => setImpersonatedClient(null)} className="ml-4 text-slate-400 hover:text-white uppercase tracking-widest">[ EXIT SESSION ]</button>
            </div>
          )}
          {renderContent()}
        </main>
        <BottomNav activeTab={activeTab} setActiveTab={handleFeatureClick} />
      </div>

      {showUpgradeModal && (
        <UpgradeModal feature={showUpgradeModal} onClose={() => setShowUpgradeModal(null)} onUpgrade={onUpgradeFlow || (() => {})} />
      )}

      {showNotifications && (
        <NotificationCenter onClose={() => setShowNotifications(false)} trialDay={trialDaysElapsed} />
      )}
    </div>
  );
};

export default Dashboard;
