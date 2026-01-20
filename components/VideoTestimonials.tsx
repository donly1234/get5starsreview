
import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  summary: string;
  videoUrl: string;
  thumbnail: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 'v1',
    clientName: 'Sarah Johnson',
    company: 'The Bloom Studio',
    role: 'Owner & Founder',
    summary: "Implementing Get5StarsReview changed our business overnight. We went from 10 to 200 reviews in just two months!",
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/21/5361-183769151_tiny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'v2',
    clientName: 'Mark Thompson',
    company: 'Summit Marketing Agency',
    role: 'Director',
    summary: "The white-label features are incredible. Our clients love the branded dashboard, and it's a huge revenue driver for us.",
    videoUrl: 'https://cdn.pixabay.com/video/2020/09/24/50771-463212879_tiny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'v3',
    clientName: 'Dr. Elena Reyes',
    company: 'Reyes Family Dental',
    role: 'Lead Dentist',
    summary: "Patient trust is everything. Seeing our 5-star rating on Google Maps makes booking so much easier for new patients.",
    videoUrl: 'https://cdn.pixabay.com/video/2016/03/31/2539-159670119_tiny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1559839734-2b71f153673f?auto=format&fit=crop&q=80&w=400'
  }
];

const GlowingVideoCard: React.FC<{ testimonial: Testimonial; isActive: boolean }> = ({ testimonial, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [isActive]);

  return (
    <div className={`relative transition-all duration-700 flex flex-col items-center ${isActive ? 'scale-100 opacity-100 z-10' : 'scale-90 opacity-40 grayscale blur-[2px]'}`}>
      
      {/* Moving Glowing Border Effect */}
      {isActive && (
        <div className="absolute -inset-[3px] rounded-[34px] overflow-hidden opacity-100 animate-pulse">
           <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_20%,#16A34A_50%,transparent_80%)] animate-[spin_4s_linear_infinite]" />
        </div>
      )}

      <div className="relative w-[280px] md:w-[320px] aspect-[9/16] bg-black rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/5">
        <video
          ref={videoRef}
          src={testimonial.videoUrl}
          poster={testimonial.thumbnail}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        
        {/* Card Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 space-y-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            ))}
          </div>
          <p className="text-white text-sm font-medium leading-relaxed line-clamp-3">
            "{testimonial.summary}"
          </p>
          <div className="pt-2 border-t border-white/10">
            <h4 className="text-white text-sm font-black uppercase tracking-tight">{testimonial.clientName}</h4>
            <p className="text-green-400 text-[10px] font-bold uppercase tracking-wider">{testimonial.role} @ {testimonial.company}</p>
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
    <section id="testimonials" className="py-24 bg-white overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-[#16A34A] font-black uppercase tracking-widest text-xs">Proof in Action</h2>
          <h3 className="text-4xl md:text-6xl font-black text-black leading-tight uppercase tracking-tighter">
            Real Stories, <span className="text-[#16A34A]">Real Growth</span>
          </h3>
          <p className="text-slate-500 font-bold max-w-xl mx-auto">
            See how Get5StarsReview is helping businesses across the globe dominate their local search and turn feedback into fuel.
          </p>
        </div>

        <div className="relative flex items-center justify-center min-h-[600px]">
          {/* Navigation Controls */}
          <button onClick={prev} className="absolute left-4 md:left-20 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-green-600 transition-all hover:scale-110 active:scale-95">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button onClick={next} className="absolute right-4 md:right-20 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-green-600 transition-all hover:scale-110 active:scale-95">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
          </button>

          {/* Carousel Track */}
          <div className="flex gap-4 md:gap-12 items-center justify-center overflow-visible">
            {testimonialsData.map((t, i) => {
              // Simple logic for showing 3 items with focus
              const diff = i - currentIndex;
              const isCenter = diff === 0;
              const isPrev = diff === -1 || (currentIndex === 0 && i === testimonialsData.length - 1);
              const isNext = diff === 1 || (currentIndex === testimonialsData.length - 1 && i === 0);
              
              if (!isCenter && !isPrev && !isNext) return null;

              return (
                <div key={t.id} className="transition-all duration-500">
                  <GlowingVideoCard testimonial={t} isActive={isCenter} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 text-center">
           <div className="flex justify-center items-center gap-2 mb-8">
              {testimonialsData.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-12 bg-green-600' : 'w-4 bg-slate-200'}`} />
              ))}
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Verified by Get5StarsReview Intelligence Hub</p>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
