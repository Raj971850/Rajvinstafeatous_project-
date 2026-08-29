import React from 'react';
import { Instagram, ArrowUpRight, Sparkles, ChevronRight, Sliders } from 'lucide-react';
import { BrandConfig } from '../types';

interface FooterProps {
  onExploreClick: () => void;
  onOpenStory: () => void;
  onSelectCategory: (category: 'ALL' | 'ACTIVE' | 'PREMIUM' | 'RETRO') => void;
  brandConfig?: BrandConfig;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onExploreClick,
  onOpenStory,
  onSelectCategory,
  brandConfig,
  onOpenAdmin,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const name = brandConfig?.name || 'FEATOUS';
  const instagramUrl = brandConfig?.instagramUrl || 'https://instagram.com/featous';
  const subheading = brandConfig?.subheading || 'BUILT FOR YOUR ERA • URBAN • RETRO • ACTIVE';

  return (
    <footer className="w-full bg-[#0A0A0A] text-[#E5E5E5] border-t border-[#222]">
      {/* FINAL CALL TO ACTION SECTION in Bento Grid Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="relative w-full py-16 sm:py-24 px-6 sm:px-12 text-center bg-[#151515] border border-[#222] rounded-3xl overflow-hidden shadow-2xl">
          {/* Subtle background ambient light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <span className="text-[10px] sm:text-xs font-mono-code tracking-[0.35em] text-[#888] uppercase block">
              THE DIGITAL CAMPAIGN CONTINUES
            </span>

            <h2 className="font-editorial-serif text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight leading-none font-light">
              READY FOR YOUR ERA? <br />
              <span className="italic font-normal text-white">WEAR {name}.</span>
            </h2>

            <p className="text-xs sm:text-sm font-mono-code tracking-[0.2em] text-[#aaa] uppercase max-w-xl mx-auto leading-relaxed">
              {subheading}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-[#E5E5E5] transition-all font-semibold text-xs uppercase tracking-[0.25em] flex items-center justify-center space-x-2 rounded-xl shadow-2xl"
              >
                <span>EXPLORE {name}</span>
                <ChevronRight size={14} />
              </button>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-[#1a1a1a] border border-[#333] hover:border-white text-white hover:bg-[#222] transition-all font-semibold text-xs uppercase tracking-[0.22em] flex items-center justify-center space-x-2.5 rounded-xl shadow-md"
              >
                <Instagram size={15} className="text-pink-300" />
                <span>FOLLOW ON INSTAGRAM</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 space-y-12">
        {/* Brand Headline & Quick Navigation Links */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-12 border-b border-[#222]">
          {/* FEATOUS Large Display Typography */}
          <div>
            <span className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[0.15em] text-[#E5E5E5] uppercase block">
              {name}
            </span>
            <span className="text-[10px] font-mono-code tracking-[0.3em] text-[#666] uppercase block pt-1">
              BUILT FOR YOUR ERA // DIGITAL ARCHIVE
            </span>
          </div>

          {/* Quick Links Menu */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono-code tracking-widest uppercase text-[#888]">
            <button
              onClick={() => {
                onSelectCategory('ALL');
                scrollTo('catalog');
              }}
              className="hover:text-white transition-colors"
            >
              CATALOG
            </button>
            <button
              onClick={() => {
                onSelectCategory('ACTIVE');
                scrollTo('collections');
              }}
              className="hover:text-white transition-colors"
            >
              ACTIVE
            </button>
            <button
              onClick={() => {
                onSelectCategory('PREMIUM');
                scrollTo('collections');
              }}
              className="hover:text-white transition-colors"
            >
              PREMIUM
            </button>
            <button
              onClick={() => {
                onSelectCategory('RETRO');
                scrollTo('retro-section');
              }}
              className="hover:text-white transition-colors"
            >
              RETRO
            </button>
            <button
              onClick={() => scrollTo('new-drop')}
              className="hover:text-white transition-colors"
            >
              NEW DROPS
            </button>
            <button
              onClick={onOpenStory}
              className="hover:text-white transition-colors"
            >
              OUR STORY
            </button>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>INSTAGRAM</span>
              <ArrowUpRight size={12} />
            </a>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-emerald-400 text-zinc-400 transition-colors flex items-center space-x-1 border-l border-[#333] pl-4"
              >
                <Sliders size={12} className="text-emerald-400" />
                <span>ADMIN PANEL</span>
              </button>
            )}
          </nav>
        </div>

        {/* Footer Sub-Grid (Hashtags, Socials, Copyright) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-mono-code text-[#888]">
          {/* Left: Copyright */}
          <div className="flex items-center space-x-3">
            <span>© 2026 {name}. RADICAL LUXURY FOR THE NEW AGE.</span>
          </div>

          {/* Center: Hashtags */}
          <div className="flex items-center space-x-4 text-[#888]">
            <span className="hover:text-white transition-colors">#{name.toUpperCase()}</span>
            <span className="text-[#444]">//</span>
            <span className="hover:text-white transition-colors">#WEAR{name.toUpperCase()}</span>
            <span className="text-[#444]">//</span>
            <span className="hover:text-white transition-colors">#{name.toUpperCase()}ERA</span>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center space-x-6 uppercase tracking-wider text-[11px]">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              TIKTOK
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              TWITTER
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              YOUTUBE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
