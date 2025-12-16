import React from 'react';

interface IntroAnimationProps {
  onComplete?: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#010a05] animate-[fade-out_0.5s_ease-out_3.5s_forwards]">
      <div className="relative w-full flex items-center justify-center">
        
        {/* Glow Effect behind text */}
        <div className="absolute inset-0 bg-emerald-500/10 blur-[120px] animate-pulse rounded-full opacity-60" />

        {/* Text Container */}
        {/* We separate the letters to animate the middle part collapsing */}
        <div className="relative z-10 flex items-center justify-center text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter animate-[scale-reveal_1.5s_ease-out_backwards]">
            
            {/* The parent holds the gradient so it looks cohesive before splitting */}
            <div className="flex items-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-yellow-200 to-blue-400 drop-shadow-2xl">
                <span>P</span>
                
                {/* Collapsing Middle Section */}
                <span className="overflow-hidden whitespace-nowrap animate-[collapse-text_3s_ease-in-out_forwards]">
                    INDORAMA
                </span>

                {/* The plus sign will slide left as the middle collapses */}
                <span>+</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;