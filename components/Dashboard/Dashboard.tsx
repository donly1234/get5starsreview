import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { logger } from '../logger';
import { isFeatureEnabled } from '../featureFlags';

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
import AgencyManager from '../Auth/Agency/AgencyManager';
import GBPAuditTool from '../GBPAuditTool';
import HeatmapTool from '../HeatmapTool';
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
  onUpgradeFlow?: () => void;
}

const DashboardHeader: React.FC<{ 
  profile: any, 
  isTrial: boolean, 
  trialDaysLeft: number, 
  impersonatedClient: string | null,
  onFeatureClick: (tab: string) => void
}> = ({ profile, isTrial, trialDaysLeft, impersonatedClient, onFeatureClick }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-[24px] bg-white shadow-sm flex items-center justify-center text-3xl border border-slate-100">ðŸ¢</div>
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic leading-none">
          {impersonatedClient ? `${impersonatedClient} Portal` : profile?.business_name || profile?.agency_name || 'My Business Hub'}
        </h1>
        <p className="text-slate-500 text-xs font-bold flex items-center gap-2 mt-1 uppercase tracking-widest">
          <span className={`w-2 h-2 rounded-full animate-pulse ${isTrial ? 'bg-[#FACC15]' : 'bg-[#16A34A]'}`}></span>
          {isTrial ? `Free Trial â€¢ ${trialDaysLeft} days left` : 'Professional Enterprise Account'}
        </p>
      </div>
    </div>
    <div className="flex gap-3">
      <button 
        onClick={() => onFeatureClick('SEO Auditor')}
        className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
      >
        SEO Audit
      </button>
      <button 
        onClick={() => onFeatureClick('Requests')}
        className="flex items-center gap-2 px-8 py-3 bg-[#16A34A] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-xl"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
        Collect Reviews
      </button>
    </div>
  </div>
);

const DashboardContentRouter: React.FC<{
  activeTab: string;
  isTrial: boolean;
  userType: UserType;
  user: any;
  profile: any;
  trialDaysLeft: number;
  impersonatedClient: string | null;
  onFeatureClick: (tab: string) => void;
  onUpgradeFlow?: () => void;
  onShowUpgrade: (feat: string) => void;
  onSetActiveTab: (tab: string) => void;
  onSwitchClient: (name: string) => void;
}> = ({ activeTab, isTrial, userType, user, profile, trialDaysLeft, impersonatedClient, onFeatureClick, onUpgradeFlow, onShowUpgrade, onSetActiveTab, onSwitchClient }) => {
  
  switch (activeTab) {
    case 'Dashboard':
      return (
        <>
          <DashboardHeader 
            profile={profile} 
            isTrial={isTrial} 
            trialDaysLeft={trialDaysLeft} 
            impersonatedClient={impersonatedClient} 
            onFeatureClick={onFeatureClick} 
          />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              {isFeatureEnabled('AI_STRATEGY') && <StrategyProgress onLaunchStrategy={() => onSetActiveTab('AI Strategy')} />}
              {isTrial && <TrialChecklist />}
              <MetricsBar isTrial={isTrial} profileId={user?.id} />
              <PerformanceGraph isTrial={isTrial} profileId={user?.id} />
              <ReviewFeed 
                isTrial={isTrial} 
                profileId={user?.id} 
                onConnectClick={() => onSetActiveTab('Settings')}
              />
            </div>
            <div className="space-y-8">
              <RequestStatus requestsUsed={0} isTrial={isTrial} onUpgrade={onUpgradeFlow} />
              <PlatformBreakdown isTrial={isTrial} onUpgrade={() => onSetActiveTab('Settings')} />
            </div>
          </div>
        </>
      );
    case 'Requests':
      return <RequestsManager requestsUsed={0} isTrial={isTrial} onUpgrade={onUpgradeFlow} />;
    case 'Monitoring':
    case 'All Reviews':
      return <MonitoringManager isTrial={isTrial} onShowUpgrade={() => onShowUpgrade('AI Assistant')} />;
    case 'SEO Auditor':
      return <GBPAuditTool onSignup={onUpgradeFlow || (() => {})} />;
    case 'Ranking Heatmap':
      return isFeatureEnabled('HEATMAP_TOOL') ? <HeatmapTool onSignup={onUpgradeFlow || (() => {})} /> : <div>Feature Disabled</div>;
    case 'GBP Media':
      return <MediaManager />;
    case 'Widgets':
      return <WidgetsManager />;
    case 'Analytics':
      return <AnalyticsManager />;
    case 'AI Assistant':
      return <AIAssistantManager />;
    case 'AI Strategy':
      return isFeatureEnabled('AI_STRATEGY') ? <AIStrategyManager profile={profile} /> : <div>Feature Disabled</div>;
    case 'Agency Panel':
      return <AgencyManager onSwitchClient={onSwitchClient} />;
    case 'Settings':
      return <SettingsManager isTrial={isTrial} />;
    default:
      return null;
  }
};

const Dashboard: React.FC<DashboardProps> = ({ 
  onLogout, 
  userType: initialUserType,
  user,
  onUpgradeFlow
}) => {
  const [userType, setUserType] = useState<UserType>(initialUserType);
  const [activeTab, setActiveTab] = useState(initialUserType === 'agency' ? 'Agency Panel' : 'Dashboard');
  const [impersonatedClient, setImpersonatedClient] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [trialDaysElapsed, setTrialDaysElapsed] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;

        if (data) {
          setProfile(data);
          setUserType(data.user_type || initialUserType);
          const created = new Date(data.created_at || user.created_at);
          const diffDays = Math.floor((new Date().getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
          setTrialDaysElapsed(Math.max(0, diffDays));
        }
      } catch (e) {
        logger.error("Failed to load dashboard profile", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, initialUserType]);

  const isTrialAccount = profile?.status !== 'paid';
  const isExpired = isTrialAccount && trialDaysElapsed >= 14;
  const trialDaysLeft = Math.max(0, 14 - trialDaysElapsed);

  const handleFeatureClick = (tab: string) => {
    if (isExpired) {
      setShowUpgradeModal('Expired');
      return;
    }
    if (userType === 'business' && isTrialAccount) {
      const proFeatures = ['AI Assistant', 'Analytics', 'GBP Media', 'Ranking Heatmap'];
      if (proFeatures.includes(tab)) {
        setShowUpgradeModal(tab);
        return;
      }
    }
    setActiveTab(tab);
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
        <TopBar 
          activeTab={activeTab} 
          onToggleNotifications={() => setShowNotifications(!showNotifications)} 
          onProfileClick={() => setActiveTab('Settings')}
          profile={profile}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 space-y-8 scroll-smooth">
          {impersonatedClient && (
            <div className="bg-[#0F172A] text-white px-6 py-2.5 text-center text-[10px] font-black uppercase tracking-[0.3em] rounded-xl border-b-4 border-emerald-500">
              ACTIVE IMPERSONATION: <span className="text-[#16A34A] underline">{impersonatedClient}</span> â€¢ <button onClick={() => setImpersonatedClient(null)} className="ml-4 text-slate-400 hover:text-white uppercase">[ EXIT ]</button>
            </div>
          )}
          
          {isExpired ? (
            <ExpiredOverlay onUpgrade={onUpgradeFlow || (() => {})} />
          ) : (
            <DashboardContentRouter 
              activeTab={activeTab}
              isTrial={isTrialAccount}
              userType={userType}
              user={user}
              profile={profile}
              trialDaysLeft={trialDaysLeft}
              impersonatedClient={impersonatedClient}
              onFeatureClick={handleFeatureClick}
              onUpgradeFlow={onUpgradeFlow}
              onShowUpgrade={setShowUpgradeModal}
              onSetActiveTab={setActiveTab}
              onSwitchClient={(name) => { setImpersonatedClient(name); setActiveTab('Dashboard'); }}
            />
          )}
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
