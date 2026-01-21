
import React from 'react';

interface LegalViewProps {
  type: 'privacy' | 'terms';
  onBack: () => void;
}

const LegalView: React.FC<LegalViewProps> = ({ type, onBack }) => {
  const content = {
    privacy: {
      title: "Privacy Policy",
      updated: "October 16, 2024",
      body: [
        { h: "1. Data Collection", p: "We collect information you provide directly to us when you create an account, connect your Google Business Profile, or communicate with our support team. This includes your name, email, and business details." },
        { h: "2. How We Use Data", p: "Your data is used to provide, maintain, and improve our services, including generating AI review responses and providing ranking analytics. We do not sell your personal data to third parties." },
        { h: "3. Third-Party Integrations", p: "By connecting your GBP or social accounts, you authorize Get5StarsReview to access data as required for automation. We adhere to the Google Developer Service terms and CASA security standards." },
        { h: "4. Security", p: "We implement industry-standard encryption and security protocols to protect your information. However, no method of transmission over the internet is 100% secure." }
      ]
    },
    terms: {
      title: "Terms of Service",
      updated: "October 16, 2024",
      body: [
        { h: "1. Acceptance of Terms", p: "By accessing Get5StarsReview.com, you agree to be bound by these terms. If you do not agree, please do not use our services." },
        { h: "2. Service Usage", p: "You are responsible for maintaining the confidentiality of your account. You agree not to use the service for any illegal or unauthorized purpose." },
        { h: "3. Subscription & Billing", p: "Subscriptions are billed in advance on a recurring monthly or annual basis. You may cancel at any time, but no refunds are provided for partial months of service unless required by law." },
        { h: "4. Limitation of Liability", p: "Get5StarsReview shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the service." }
      ]
    }
  };

  const data = content[type];

  return (
    <div className="pt-40 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">
        <button onClick={onBack} className="mb-12 flex items-center gap-2 text-slate-400 hover:text-green-600 font-black uppercase text-[10px] tracking-[0.3em] transition-all group">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          Return to App
        </button>

        <header className="space-y-4 mb-16 border-b border-slate-100 pb-12">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">{data.title}</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Last Updated: {data.updated}</p>
        </header>

        <div className="space-y-12">
          {data.body.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight italic">{section.h}</h2>
              <p className="text-slate-600 leading-relaxed font-medium">{section.p}</p>
            </section>
          ))}
        </div>

        <div className="mt-20 p-8 bg-slate-50 rounded-[32px] border border-slate-100 text-center">
           <p className="text-sm font-bold text-slate-500">Questions about our {data.title.toLowerCase()}?</p>
           <a href="mailto:Support@get5starsreview.com" className="text-green-600 font-black uppercase text-xs tracking-widest mt-2 block hover:underline">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default LegalView;
