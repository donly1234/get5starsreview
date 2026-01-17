
import React, { useState } from 'react';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessName: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { fullName, email, businessName, message } = formData;
    const subject = `New Inquiry: ${businessName} - ${fullName}`;
    const body = `Full Name: ${fullName}\nEmail Address: ${email}\nBusiness Name: ${businessName}\n\nInquiry:\n${message}`;
    
    const mailtoLink = `mailto:Support@get5starsreview.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the default mail client
    window.location.href = mailtoLink;
    
    // Show success feedback
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white scroll-mt-32 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-green-600/5 blur-3xl rounded-full translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-green-500 font-black uppercase tracking-widest text-xs mb-6">Connect With Us</h2>
            <h3 className="text-5xl md:text-7xl font-black leading-none uppercase tracking-tighter mb-8">
              Let's Talk <br /> <span className="text-green-500">Business.</span>
            </h3>
            
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-green-600/10 border border-green-600/20 text-green-500 rounded-[20px] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Email Our Team</h4>
                  <p className="text-xl font-bold hover:text-green-500 transition-colors cursor-pointer underline decoration-green-600 decoration-2">Support@get5starsreview.com</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-blue-600/10 border border-blue-600/20 text-blue-400 rounded-[20px] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">USA HQ</h4>
                    <p className="text-slate-300 font-medium">
                      212 N. 2nd St. STE 100,<br />
                      Richmond, KY 40475
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Africa Hub</h4>
                    <p className="text-slate-300 font-medium">
                      Harare,<br />
                      Zimbabwe
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[48px] p-8 md:p-12 lg:p-16 shadow-2xl relative max-w-xl mx-auto lg:mx-0">
            {isSent ? (
              <div className="py-20 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-sm">✉️</div>
                <h4 className="text-2xl font-black text-slate-900 uppercase">Opening Mail Client</h4>
                <p className="text-slate-500 font-bold px-4">We've constructed your inquiry. Your default email app will open to send the message to Support@get5starsreview.com</p>
                <button onClick={() => setIsSent(false)} className="text-green-600 font-black uppercase text-xs tracking-widest border-b-2 border-green-600 pb-1">Start New Message</button>
              </div>
            ) : (
              <>
                <h4 className="text-black text-2xl font-black uppercase tracking-tighter mb-8 italic">Send a Message</h4>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      placeholder="Full Name" 
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-[#F8FAFC] border-2 border-slate-100 rounded-2xl p-4 text-black font-bold placeholder:text-slate-400 focus:border-green-600 focus:outline-none transition-all" 
                    />
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="Email Address" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#F8FAFC] border-2 border-slate-100 rounded-2xl p-4 text-black font-bold placeholder:text-slate-400 focus:border-green-600 focus:outline-none transition-all" 
                    />
                  </div>
                  <input 
                    type="text" 
                    name="businessName"
                    required
                    placeholder="Business Name" 
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full bg-[#F8FAFC] border-2 border-slate-100 rounded-2xl p-4 text-black font-bold placeholder:text-slate-400 focus:border-green-600 focus:outline-none transition-all" 
                  />
                  <textarea 
                    name="message"
                    required
                    placeholder="How can we help you?" 
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#F8FAFC] border-2 border-slate-100 rounded-2xl p-4 text-black font-bold placeholder:text-slate-400 focus:border-green-600 focus:outline-none transition-all resize-none"
                  ></textarea>
                  <button 
                    type="submit"
                    className="w-full bg-[#16A34A] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-green-500/20 hover:bg-black transition-all active:scale-95"
                  >
                    Send Inquiry
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
