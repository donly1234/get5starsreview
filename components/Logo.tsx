import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Professional Speech Bubble Icon with Star */}
      <div className="relative shrink-0">
        <svg width="42" height="38" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
          <path d="M43.2 0H4.8C2.14903 0 0 2.14903 0 4.8V28.8C0 31.451 2.14903 33.6 4.8 33.6H12L12 40.8L21.6 33.6H43.2C45.851 33.6 48 31.451 48 28.8V4.8C48 2.14903 45.851 0 43.2 0Z" fill="#16A34A"/>
          <path d="M24 8L27.24 14.56L34.48 15.61L29.24 20.71L30.48 27.92L24 24.51L17.52 27.92L18.76 20.71L13.52 15.61L20.76 14.56L24 8Z" fill="#FACC15"/>
        </svg>
      </div>
      
      {variant === 'full' && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tight text-black uppercase leading-[0.9]">Get5Stars</span>
            <div className="flex items-center gap-2">
               <span className="text-xl md:text-2xl font-black tracking-tight text-black uppercase leading-[0.9]">Review</span>
               <div className="h-[3px] flex-grow min-w-[30px] bg-[#16A34A] rounded-full mt-1"></div>
            </div>
          </div>
          <span className="text-[7px] md:text-[9px] font-bold text-black uppercase tracking-[0.1em] mt-1 whitespace-nowrap">Google Business Profile Agency</span>
        </div>
      )}
    </div>
  );
};

export default Logo;