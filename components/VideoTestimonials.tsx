import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  summary: string;
  videoUrl: string;
  thumbnail: string;
  featured?: boolean;
}

const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Sarah Johnson',
    company: 'The Bloom Studio',
    role: 'Owner & Founder',
    summary: "Implementing Get5Stars changed our business overnight. We went from 10 to 200 reviews in just two months!",
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/21/5361-183769151_tiny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    featured: true
  },
  {
    id: 't2',
    clientName: 'Mark Thompson',
    company: 'Summit Marketing Agency',
    role: 'Director',
    summary: "The white-label features are incredible. Our clients love the branded dashboard, and it's a huge revenue driver for us.",
    videoUrl: 'https://cdn.pixabay.com/video/2020/09/24/50771-463212879_tiny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 't3',
    clientName: 'Dr. Elena Reyes',
    company: 'Reyes Family Dental',
    role: 'Lead Dentist',
    summary: "Patient trust is everything. Seeing our 5-star rating right on the homepage makes booking so much easier for new patients.",
    videoUrl: 'https://cdn.pixabay.com/video/2016/03/31/2539-159670119_tiny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1559839734-2b71f153673f?auto=format&fit=crop&q=80&w=400'
  }
];

const VideoCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <div className={`flex flex-col bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-[#16A34A]/30 group`}>
      <div className="relative aspect-video bg-black overflow-hidden cursor-pointer">
        <video
          ref={videoRef}
          src={testimonial.videoUrl}
          poster={testimonial.thumbnail}
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {!isPlaying && (
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
               <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          )}
        </div>

        <button 
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full border border-white/20 transition-all text-white"
        >
          {isMuted ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5.586 15H4a1 1 0 01-1-1V10a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1V10a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          )}
        </button>

        <div className="absolute top-4 left-4">
           <span className="bg-[#16A34A] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Verified Success</span>
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex gap-0.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-[#16A34A] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            ))}
          </div>
          <p className="text-slate-600 text-sm italic leading-relaxed mb-6 font-medium">
            "{testimonial.summary}"
          </p>
        </div>
        
        <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
          <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0 border-2 border-[#16A34A]/20">
             <img src={testimonial.thumbnail} alt={testimonial.clientName} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="text-sm font-black text-black uppercase tracking-tight leading-none">{testimonial.clientName}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{testimonial.role} @ {testimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoTestimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-[#16A34A] font-black uppercase tracking-widest text-xs">Real Results</h2>
          <h3 className="text-4xl md:text-6xl font-black text-black leading-tight uppercase tracking-tighter">
            What Our <span className="text-[#16A34A]">Clients</span> Say
          </h3>
          <p className="text-slate-500 font-bold max-w-xl mx-auto">
            Join 2,000+ businesses and agencies using Get5StarsReview to scale their social proof automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((t) => (
            <VideoCard key={t.id} testimonial={t} />
          ))}
        </div>

        <div className="mt-20 text-center">
           <div className="inline-block p-1 bg-slate-50 rounded-[32px] border border-slate-100">
             <button className="bg-black text-white px-10 py-5 rounded-[28px] font-black uppercase tracking-widest text-sm hover:bg-[#16A34A] transition-all shadow-2xl active:scale-95 flex items-center gap-3">
               Start Building Your Reputation
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
             </button>
           </div>
           <div className="flex justify-center items-center gap-8 mt-10 grayscale opacity-40">
             <div className="font-black text-xl tracking-tighter">TRUSTPILOT</div>
             <div className="font-black text-xl tracking-tighter text-[#16A34A] opacity-80">GOOGLE</div>
             <div className="font-black text-xl tracking-tighter">FACEBOOK</div>
             <div className="font-black text-xl tracking-tighter">YELP</div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;