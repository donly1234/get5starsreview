
import React, { useState } from 'react';

interface RequestWizardProps {
  onClose: () => void;
  onLaunch?: () => void;
}

const templates = [
  { id: 1, name: 'Friendly Post-Purchase', text: "Hi {{name}}, thanks for visiting {{business_name}}! We'd love to hear your thoughts. Could you spare a minute to leave us a review? {{link}}" },
  { id: 2, name: 'Service Completion', text: "Hello {{name}}, your service at {{business_name}} is complete! How did we do? Please share your experience here: {{link}}" },
  { id: 3, name: 'Quick Star Request', text: "Hi {{name}}! Loved having you at {{business_name}} today. Give us a star rating? It helps us grow! {{link}}" },
];

const RequestWizard: React.FC<RequestWizardProps> = ({ onClose, onLaunch }) => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<'single' | 'bulk'>('single');
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [scheduleType, setScheduleType] = useState<'now' | 'later'>('now');
  const [scheduleTime, setScheduleTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-4xl h-[90vh] max-h-[800px] rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-black uppercase italic text-slate-900 tracking-tighter">Campaign Protocol</h2>
          <div className="flex gap-1">
             {[1,2,3,4].map(i => <div key={i} className={`h-1.5 rounded-full transition-all ${step === i ? 'w-8 bg-emerald-600' : 'w-2 bg-slate-200'}`} />)}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10">
          {step === 1 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
              <div className="grid grid-cols-2 gap-6">
                <button onClick={() => setMethod('single')} className={`p-8 rounded-[32px] border-4 text-left transition-all ${method === 'single' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-50 bg-slate-50'}`}>
                  <div className="text-3xl mb-4">👤</div>
                  <h4 className="font-black text-slate-900 uppercase italic">Single Input</h4>
                </button>
                <button onClick={() => setMethod('bulk')} className={`p-8 rounded-[32px] border-4 text-left transition-all ${method === 'bulk' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-50 bg-slate-50'}`}>
                  <div className="text-3xl mb-4">📄</div>
                  <h4 className="font-black text-slate-900 uppercase italic">Bulk Upload</h4>
                </button>
              </div>
              {method === 'single' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                  <input type="text" placeholder="Customer Name" className="w-full p-5 bg-white border border-slate-200 rounded-2xl font-bold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input type="tel" placeholder="Phone Number" className="w-full p-5 bg-white border border-slate-200 rounded-2xl font-bold" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-right-4">
               <div className="space-y-4">
                  <h3 className="font-black uppercase text-slate-400 text-[10px] tracking-widest">Select Narrative</h3>
                  {templates.map(t => (
                    <button key={t.id} onClick={() => setSelectedTemplate(t)} className={`w-full p-6 rounded-3xl border-2 text-left transition-all ${selectedTemplate.id === t.id ? 'border-emerald-600 bg-emerald-50' : 'border-slate-50'}`}>
                      <h5 className="font-black text-slate-900 uppercase text-xs mb-2">{t.name}</h5>
                      <p className="text-xs text-slate-500 font-medium italic">"{t.text}"</p>
                    </button>
                  ))}
               </div>
               <div className="bg-slate-950 p-10 rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                  <p className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.3em] mb-4">Transmission Preview</p>
                  <p className="text-white font-bold leading-relaxed">"{selectedTemplate.text.replace('{{name}}', formData.name || 'Valued Client')}"</p>
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in slide-in-from-right-4">
               <h3 className="text-3xl font-black text-slate-900 uppercase italic text-center">Execution Schedule</h3>
               <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setScheduleType('now')} className={`p-8 rounded-[32px] border-2 flex flex-col items-center gap-4 transition-all ${scheduleType === 'now' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100'}`}>
                    <span className="text-3xl">⚡</span>
                    <span className="font-black uppercase tracking-widest text-xs">Immediate</span>
                  </button>
                  <button onClick={() => setScheduleType('later')} className={`p-8 rounded-[32px] border-2 flex flex-col items-center gap-4 transition-all ${scheduleType === 'later' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100'}`}>
                    <span className="text-3xl">🗓️</span>
                    <span className="font-black uppercase tracking-widest text-xs">Scheduled</span>
                  </button>
               </div>
               {scheduleType === 'later' && (
                  <div className="p-8 bg-slate-50 rounded-[32px] animate-in fade-in slide-in-from-top-4">
                    <input 
                      type="datetime-local" 
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full p-6 bg-white border-2 border-slate-200 rounded-3xl font-black uppercase" 
                    />
                  </div>
               )}
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-8 animate-in zoom-in-95">
               <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[40px] flex items-center justify-center mx-auto text-4xl shadow-sm">🚀</div>
               <h3 className="text-3xl font-black text-slate-900 uppercase italic">Confirm Sequence</h3>
               <div className="bg-slate-50 rounded-[40px] p-10 space-y-4 shadow-inner border border-slate-100 max-w-lg mx-auto">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-black uppercase text-slate-400">Target</span>
                    <span className="text-sm font-bold">{formData.name || 'Bulk Sequence'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400">Time</span>
                    <span className="text-sm font-black text-emerald-600 uppercase">{scheduleType === 'now' ? 'Instant Blast' : `Scheduled: ${new Date(scheduleTime).toLocaleString()}`}</span>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <button onClick={prevStep} disabled={step === 1} className="text-slate-400 font-black uppercase text-[10px] tracking-widest disabled:opacity-30">Back</button>
          <div className="flex gap-4">
            <button onClick={onClose} className="text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-rose-500">Cancel</button>
            <button onClick={step === 4 ? (onLaunch || onClose) : nextStep} className="bg-slate-950 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-emerald-600 transition-all">
              {step === 4 ? 'Initiate sequence' : 'Next Protocol'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestWizard;
