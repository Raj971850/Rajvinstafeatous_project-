import React from 'react';
import { Instagram, ArrowDown, Sparkles, ChevronRight } from 'lucide-react';
import { BrandConfig } from '../types';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenDropModal: () => void;
  brandConfig: BrandConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenDropModal,
  brandConfig,
}) => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-between items-center text-center overflow-hidden bg-[#0A0A0A] film-grain pt-24 pb-10"
    >
      {/* Background Cinematic Image with Subtle Zoom / Parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src={brandConfig.heroImage}
          alt="FEATOUS Campaign Hero Model"
          className="w-full h-full object-cover object-center brightness-75 scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Editorial Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.85)_100%)]" />
      </div>

      {/* Top Banner Tag */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex justify-between items-center pt-2">
        <div className="hidden sm:flex items-center space-x-2 text-[10px] font-mono-code tracking-[0.25em] text-[#888] uppercase bg-[#151515]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#222] rounded-full shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{brandConfig.heroBadge}</span>
        </div>

        <button
          onClick={onOpenDropModal}
          className="flex items-center space-x-2 text-[10px] font-mono-code tracking-[0.2em] text-[#E5E5E5] uppercase bg-[#151515]/90 hover:bg-[#1A1A1A] hover:border-[#444] transition-all backdrop-blur-md px-3.5 py-1.5 border border-[#2a2a2a] rounded-full cursor-pointer ml-auto shadow-lg"
        >
          <span className="text-[#888]">NEXT DROP IN</span>
          <span className="text-white font-bold">{brandConfig.nextDropCountdownText.slice(0, 12)}</span>
          <ChevronRight size={12} className="text-[#888]" />
        </button>
      </div>

      {/* Center Main Hero Typography & Brand Statement */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:py-20 flex flex-col items-center justify-center">
        {/* Brand Name & Headline */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="font-editorial-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.04em] leading-[0.95] text-[#E5E5E5] uppercase max-w-4xl mx-auto glow-subtle font-light">
            {brandConfig.heroHeadline}
          </h1>

          {/* Subheading */}
          <p className="text-xs sm:text-sm md:text-base font-mono-code tracking-[0.22em] text-[#888] uppercase max-w-2xl mx-auto leading-relaxed pt-2">
            {brandConfig.subheading}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-10 sm:pt-12 w-full max-w-md">
          {/* Explore Collection */}
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-black hover:bg-[#E5E5E5] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.25em] flex items-center justify-center space-x-2 rounded-xl shadow-2xl hover:shadow-white/20 active:scale-95 group"
          >
            <span>EXPLORE COLLECTION</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Follow Us On Instagram */}
          <a
            id="hero-instagram-btn"
            href={brandConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#151515]/90 hover:bg-[#1A1A1A] text-white border border-[#2a2a2a] hover:border-[#444] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.22em] flex items-center justify-center space-x-2.5 rounded-xl backdrop-blur-sm group"
          >
            <Instagram size={15} className="group-hover:scale-110 transition-transform text-pink-300" />
            <span>FOLLOW {brandConfig.handle}</span>
          </a>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center space-y-2 cursor-pointer pt-4 opacity-70 hover:opacity-100 transition-opacity" onClick={onExploreClick}>
        <span className="text-[10px] font-mono-code tracking-[0.3em] uppercase text-[#888]">
          SCROLL ↓
        </span>
        <ArrowDown size={14} className="text-[#888] animate-bounce" />
      </div>
    </section>
  );
};

