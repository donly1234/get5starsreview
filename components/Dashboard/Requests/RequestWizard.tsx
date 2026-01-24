
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
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', schedule: 'now' });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const steps = [
    { title: 'Audience', icon: '👤' },
    { title: 'Message', icon: '✉️' },
    { title: 'Automation', icon: '⚙️' },
    { title: 'Review', icon: '✅' },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl h-[90vh] max-h-[800px] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-900">Create Campaign</h2>
            <div className="flex gap-2">
              {steps.map((s, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    step === i + 1 ? 'bg-blue-600 text-white' : i + 1 < step ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <span className="hidden sm:inline">{s.title}</span>
                  {i + 1 < step && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                </div>
              ))}
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button 
                  onClick={() => setMethod('single')}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${method === 'single' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <div className="text-2xl mb-4">👤</div>
                  <h4 className="font-bold text-slate-900 mb-1">Single Customer</h4>
                  <p className="text-sm text-slate-500">Perfect for desk-side requests after service.</p>
                </button>
                <button 
                  onClick={() => setMethod('bulk')}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${method === 'bulk' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <div className="text-2xl mb-4">📄</div>
                  <h4 className="font-bold text-slate-900 mb-1">Bulk Upload (CSV)</h4>
                  <p className="text-sm text-slate-500">Import hundreds of customers at once.</p>
                </button>
              </div>

              {method === 'single' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Name</span>
                      <input 
                        type="text" 
                        className="mt-1 w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20" 
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email (Optional)</span>
                      <input type="email" className="mt-1 w-full p-3 bg-white border border-slate-200 rounded-xl" placeholder="john@example.com" />
                    </label>
                  </div>
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</span>
                      <input 
                        type="tel" 
                        className="mt-1 w-full p-3 bg-white border border-slate-200 rounded-xl" 
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </label>
                    <div className="pt-6">
                      <p className="text-xs text-slate-400 italic">By continuing, you confirm you have marketing consent from this customer.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Drop your CSV file here</h4>
                  <p className="text-sm text-slate-500 mb-6">Max file size 5MB (Up to 10,000 rows)</p>
                  <button className="bg-white border border-slate-200 px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">Choose File</button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="font-bold text-slate-900">Select Template</h3>
                  <div className="space-y-3">
                    {templates.map(t => (
                      <button 
                        key={t.id}
                        onClick={() => setSelectedTemplate(t)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedTemplate.id === t.id ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                      >
                        <h5 className="font-bold text-slate-900 text-sm">{t.name}</h5>
                        <p className="text-xs text-slate-500 line-clamp-1">{t.text}</p>
                      </button>
                    ))}
                  </div>
                  <button className="text-blue-600 text-sm font-bold flex items-center gap-2 hover:underline">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                    Create Custom Template
                  </button>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bold text-slate-900">Message Preview</h3>
                  <div className="bg-slate-900 p-6 rounded-3xl relative overflow-hidden shadow-xl">
                    <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-bl-none text-sm leading-relaxed mb-4">
                      {selectedTemplate.text
                        .replace('{{name}}', formData.name || 'John')
                        .replace('{{business_name}}', 'The Downtown Bakery')
                        .replace('{{link}}', 'g5sr.io/xyz789')}
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 px-1 font-bold">
                      <span>SMS PREVIEW</span>
                      <span>160 Characters • 1 Segment</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    Spam check: This template is 98% likely to be delivered.
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-6 rounded-2xl space-y-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">🗓️</span>
                    Scheduling
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 cursor-pointer">
                      <input type="radio" name="sched" defaultChecked className="w-4 h-4 text-blue-600" />
                      <div className="text-sm">
                        <p className="font-bold text-slate-900">Send Immediately</p>
                        <p className="text-slate-500">As soon as campaign is confirmed.</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 cursor-pointer">
                      <input type="radio" name="sched" className="w-4 h-4 text-blue-600" />
                      <div className="text-sm">
                        <p className="font-bold text-slate-900">Scheduled Time</p>
                        <p className="text-slate-500">Choose a specific date and time.</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl space-y-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm">🛡️</span>
                    Review Funneling
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-slate-900">Feedback Filtering</p>
                        <p className="text-xs text-slate-500">Redirect unhappy customers.</p>
                      </div>
                      <div className="w-10 h-6 bg-blue-600 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-slate-900">Smart Follow-up</p>
                        <p className="text-xs text-slate-500">Send reminder after 3 days.</p>
                      </div>
                      <div className="w-10 h-6 bg-slate-200 rounded-full relative">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="max-w-xl mx-auto space-y-8 animate-in fade-in zoom-in-95">
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to launch?</h3>
                <p className="text-slate-500">Review your campaign details before sending.</p>
              </div>

              <div className="bg-slate-50 rounded-3xl p-8 space-y-4">
                <div className="flex justify-between py-2 border-b border-slate-200/50">
                  <span className="text-slate-500 font-medium">Audience</span>
                  <span className="text-slate-900 font-bold">{method === 'single' ? `1 Customer (${formData.name})` : 'Bulk (CSV Upload)'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200/50">
                  <span className="text-slate-500 font-medium">Template</span>
                  <span className="text-slate-900 font-bold">{selectedTemplate.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200/50">
                  <span className="text-slate-500 font-medium">Channels</span>
                  <span className="text-slate-900 font-bold">SMS only</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">Scheduled For</span>
                  <span className="text-emerald-600 font-bold">Immediately</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-2.5 font-bold rounded-xl transition-all ${step === 1 ? 'text-slate-300 pointer-events-none' : 'text-slate-600 hover:bg-white'}`}
          >
            Back
          </button>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 font-bold text-slate-500 hover:text-slate-700 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={step === 4 ? (onLaunch || onClose) : nextStep}
              className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              {step === 4 ? 'Confirm & Send' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestWizard;
