
import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  summary: string;
  videoUrl: string;
  thumbnail: string;
  metric: string;
  metricLabel: string;
  industry: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 'v1',
    clientName: 'Sarah Johnson',
    company: 'The Bloom Studio',
    role: 'Owner & Founder',
    summary: "Implementing Get5StarsReview changed our business overnight. We went from 10 to 200 reviews in just two months and our phone hasn't stopped ringing!",
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/21/5361-183769151_tiny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    metric: '+184%',
    metricLabel: 'Visibility Lift',
    industry: 'Hospitality'
  },
  {
    id: 'v2',
    clientName: 'Mark Thompson',
    company: 'Summit Marketing',
    role: 'Agency Director',
    summary: "The white-label features allowed me to scale to 40 clients in 6 months. It's the highest margin service in my agency by far.",
    videoUrl: 'https://cdn.pixabay.com/video/2020/09/24/50771-463212879_tiny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
    metric: '$12k',
    metricLabel: 'Added MRR',
    industry: 'Marketing Agency'
  },
  {
    id: 'v3',
    clientName: 'Dr. Elena Reyes',
    company: 'Reyes Family Dental',
    role: 'Lead Dentist',
    summary: "We used to struggle with 1-star spam. The automated filtering helped us recover our 4.9-star reputation in weeks.",
    videoUrl: 'https://cdn.pixabay.com/video/2017/08/04/10931-224855909_tiny.mp4', // More robust video link
    thumbnail: 'https://images.unsplash.com/photo-1559839734-2b71f153673f?auto=format&fit=crop&q=80&w=600',
    metric: '4.9★',
    metricLabel: 'Average Rating',
    industry: 'Healthcare'
  }
];

const GlowingVideoCard: React.FC<{ testimonial: Testimonial; isActive: boolean }> = ({ testimonial, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive) {
      const playPromise = videoRef.current?.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play might be blocked, silent fail is okay as poster shows
        });
      }
    } else {
      videoRef.current?.pause();
    }
  }, [isActive]);

  return (
    <div className={`relative transition-all duration-700 flex flex-col items-center ${isActive ? 'scale-100 opacity-100 z-10' : 'scale-90 opacity-40 grayscale blur-[2px]'}`}>
      
      {/* Moving Glowing Border Effect */}
      {isActive && (
        <div className="absolute -inset-[4px] rounded-[34px] overflow-hidden opacity-100">
           <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_20%,#16A34A_50%,transparent_80%)] animate-[spin_4s_linear_infinite]" />
        </div>
      )}

      <div className="relative w-[280px] md:w-[320px] aspect-[9/16] bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/5 group">
        {/* Poster Image as a Background Fallback */}
        <img 
          src={testimonial.thumbnail} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isActive ? 'opacity-20' : 'opacity-100'}`} 
          alt="background fallback"
        />
        
        <video
          ref={videoRef}
          src={testimonial.videoUrl}
          poster={testimonial.thumbnail}
          loop
          muted
          playsInline
          className="relative z-10 w-full h-full object-cover"
        />
        
        {/* Floating ROI Badge */}
        <div className={`absolute top-6 right-6 z-20 transition-all duration-700 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
           <div className="bg-white p-3 rounded-2xl shadow-2xl border border-slate-100 flex flex-col items-center min-w-[100px] animate-bounce">
              <span className="text-xl font-black text-emerald-600 leading-none">{testimonial.metric}</span>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">{testimonial.metricLabel}</span>
           </div>
        </div>

        {/* Industry Tag */}
        <div className="absolute top-6 left-6 z-20">
           <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20">
             {testimonial.industry}
           </span>
        </div>
        
        {/* Card Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/40 to-transparent p-8 space-y-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            ))}
          </div>
          <p className="text-white text-sm font-bold leading-relaxed italic">
            "{testimonial.summary}"
          </p>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <h4 className="text-white text-sm font-black uppercase tracking-tight leading-none">{testimonial.clientName}</h4>
              <p className="text-emerald-400 text-[9px] font-black uppercase tracking-[0.2em] mt-1">{testimonial.company}</p>
            </div>
            <div className="flex items-center gap-1">
               <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Verified</span>
               <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);

  return (
    <section id="testimonials" className="py-32 bg-white overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px]">Actual Partner Results</span>
          <h3 className="text-5xl md:text-7xl font-black text-slate-900 leading-none uppercase tracking-tighter italic">
            Real Proof. <br /> <span className="text-emerald-600">Zero Fluff.</span>
          </h3>
          <p className="text-slate-500 text-lg font-bold max-w-xl mx-auto">
            We don't just collect stars. We build authority. Watch how our AI-powered systems transformed these businesses.
          </p>
        </div>

        <div className="relative flex items-center justify-center min-h-[700px]">
          {/* Navigation Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-20 z-30 pointer-events-none">
            <button onClick={prev} className="pointer-events-auto w-14 h-14 rounded-full bg-white shadow-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-all hover:scale-110 active:scale-95">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={next} className="pointer-events-auto w-14 h-14 rounded-full bg-white shadow-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-all hover:scale-110 active:scale-95">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

          {/* Carousel Track */}
          <div className="flex gap-4 md:gap-12 items-center justify-center overflow-visible">
            {testimonialsData.map((t, i) => {
              const diff = i - currentIndex;
              const isCenter = diff === 0;
              const isPrev = diff === -1 || (currentIndex === 0 && i === testimonialsData.length - 1);
              const isNext = diff === 1 || (currentIndex === testimonialsData.length - 1 && i === 0);
              
              // Ensure we show surrounding items in the small loop
              if (!isCenter && !isPrev && !isNext) return null;

              return (
                <div key={t.id} className="transition-all duration-700">
                  <GlowingVideoCard testimonial={t} isActive={isCenter} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 text-center space-y-12">
           <div className="flex justify-center items-center gap-3">
              {testimonialsData.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-16 bg-emerald-600' : 'w-4 bg-slate-200 hover:bg-slate-300'}`} 
                />
              ))}
           </div>
           
           <div className="bg-slate-50 inline-flex items-center gap-6 px-10 py-6 rounded-[32px] border border-slate-100 shadow-sm">
              <div className="flex -space-x-3">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden"><img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" /></div>)}
              </div>
              <div className="text-left">
                 <p className="text-sm font-black text-slate-900 leading-none">Ready to be our next success story?</p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Average user rating lift: 1.2 stars in 90 days</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
