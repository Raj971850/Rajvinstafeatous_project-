import React from 'react';
import { ArrowRight, Sparkles, Layers, Disc3 } from 'lucide-react';
import { CollectionCategory, BrandConfig } from '../types';

interface CollectionCategoriesProps {
  onSelectCategory: (category: CollectionCategory) => void;
  onOpenProductById: (id: string) => void;
  brandConfig?: BrandConfig;
}

export const CollectionCategories: React.FC<CollectionCategoriesProps> = ({
  onSelectCategory,
  onOpenProductById,
  brandConfig,
}) => {
  return (
    <section id="collections" className="w-full bg-[#0A0A0A] text-[#E5E5E5] py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 2-Column Bento Split: ACTIVE and PREMIUM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Category 1: FEATOUS ACTIVE */}
        <div className="relative group min-h-[520px] sm:min-h-[600px] flex flex-col justify-end p-6 sm:p-10 overflow-hidden rounded-2xl bg-[#151515] border border-[#222] hover:border-[#333] transition-all duration-300">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop"
              alt="FEATOUS Activewear Campaign"
              className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
          </div>

          {/* Foreground Editorial Card */}
          <div className="relative z-10 p-6 sm:p-8 bg-[#151515]/85 backdrop-blur-md border border-[#2a2a2a] rounded-xl max-w-lg transition-all duration-300 group-hover:border-[#444] shadow-2xl">
            <div className="flex items-center space-x-2 text-[10px] font-mono-code tracking-[0.25em] text-[#888] uppercase mb-3">
              <span className="text-white">01</span>
              <span>//</span>
              <span>ACTIVE DIVISION</span>
            </div>

            <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#E5E5E5] uppercase tracking-wider mb-4 leading-snug">
              FEATOUS ACTIVE: MOVE. TRAIN. CONQUER.
            </h3>

            {/* Pill tags */}
            <div className="flex flex-wrap gap-2 mb-6 text-[10px] font-mono-code tracking-wider uppercase">
              <span className="px-3 py-1 bg-[#1A1A1A] text-[#aaa] border border-[#2a2a2a] rounded-full">
                OVERSIZED TEES
              </span>
              <span className="px-3 py-1 bg-[#1A1A1A] text-[#aaa] border border-[#2a2a2a] rounded-full">
                TRACK PANTS
              </span>
              <span className="px-3 py-1 bg-[#1A1A1A] text-[#aaa] border border-[#2a2a2a] rounded-full">
                SWEATSHIRTS
              </span>
            </div>

            <button
              onClick={() => {
                onSelectCategory('ACTIVE');
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-[0.2em] text-white hover:text-zinc-300 transition-colors group/btn"
            >
              <span className="border-b border-white pb-0.5">EXPLORE ACTIVE</span>
              <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Category 2: FEATOUS PREMIUM */}
        <div className="relative group min-h-[520px] sm:min-h-[600px] flex flex-col justify-end p-6 sm:p-10 overflow-hidden rounded-2xl bg-[#151515] border border-[#222] hover:border-[#333] transition-all duration-300">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop"
              alt="FEATOUS Premium Menswear"
              className="w-full h-full object-cover object-center grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
          </div>

          {/* Foreground Editorial Card */}
          <div className="relative z-10 p-6 sm:p-8 bg-[#151515]/85 backdrop-blur-md border border-[#2a2a2a] rounded-xl max-w-lg transition-all duration-300 group-hover:border-[#444] shadow-2xl">
            <div className="flex items-center space-x-2 text-[10px] font-mono-code tracking-[0.25em] text-[#888] uppercase mb-3">
              <span className="text-white">02</span>
              <span>//</span>
              <span>PREMIUM ELEVATION</span>
            </div>

            <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#E5E5E5] uppercase tracking-wider mb-4 leading-snug">
              FEATOUS PREMIUM: EVERYDAY, ELEVATED.
            </h3>

            {/* Pill tags */}
            <div className="flex flex-wrap gap-2 mb-6 text-[10px] font-mono-code tracking-wider uppercase">
              <span className="px-3 py-1 bg-[#1A1A1A] text-[#aaa] border border-[#2a2a2a] rounded-full">
                POLO SHIRTS
              </span>
              <span className="px-3 py-1 bg-[#1A1A1A] text-[#aaa] border border-[#2a2a2a] rounded-full">
                TROUSERS
              </span>
              <span className="px-3 py-1 bg-[#1A1A1A] text-[#aaa] border border-[#2a2a2a] rounded-full">
                TAILORED JACKETS
              </span>
            </div>

            <button
              onClick={() => {
                onSelectCategory('PREMIUM');
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-[0.2em] text-white hover:text-zinc-300 transition-colors group/btn"
            >
              <span className="border-b border-white pb-0.5">EXPLORE PREMIUM</span>
              <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Category 3: FEATOUS RETRO (Bento Box Archival Showcase) */}
      <div id="retro-section" className="relative w-full mt-4 lg:mt-6 p-8 sm:p-12 lg:p-16 overflow-hidden bg-[#151515] rounded-2xl border border-[#222]">
        {/* Subtle background ambient blur */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text / Story */}
          <div className="lg:col-span-5 space-y-6 lg:pr-8">
            <div className="flex items-center space-x-2 text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400/80"></span>
              <span>RETRO ARCHIVE // 1994 - 2026</span>
            </div>

            <h2 className="font-editorial-serif text-3xl sm:text-5xl lg:text-6xl text-[#E5E5E5] uppercase tracking-tight leading-[1.05]">
              {brandConfig?.retroStoryTitle ? (
                brandConfig.retroStoryTitle
              ) : (
                <>
                  OLD SCHOOL. <br />
                  <span className="italic text-[#aaa] font-light">NEW ENERGY.</span>
                </>
              )}
            </h2>

            <p className="text-sm font-mono-code tracking-wider text-[#888] leading-relaxed max-w-md">
              {brandConfig?.retroStoryBody ||
                'Archival silhouettes reimagined through a modern lens. The Retro collection bridges the gap between 90s warehouse nostalgia and next-generation street velocity.'}
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  onSelectCategory('RETRO');
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-[0.25em] text-white hover:text-zinc-300 transition-colors group/retro"
              >
                <span className="border-b border-white pb-1 font-semibold">DISCOVER RETRO</span>
                <ArrowRight size={14} className="group-hover/retro:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* Vintage Details List */}
            <div className="pt-6 border-t border-[#222] grid grid-cols-2 gap-4 text-[11px] font-mono-code text-[#888]">
              <div>
                <span className="block text-[#E5E5E5] font-semibold">ANALOG FINISH</span>
                <span>Enzyme stone-washed denim</span>
              </div>
              <div>
                <span className="block text-[#E5E5E5] font-semibold">ARCHIVAL SHAPE</span>
                <span>Layered suede FEAT.01</span>
              </div>
            </div>
          </div>

          {/* Right Polaroid & Sneaker Archival Collage */}
          <div className="lg:col-span-7 relative flex items-center justify-center py-6">
            {/* Background Polaroid Card */}
            <div className="relative w-full max-w-md sm:max-w-lg bg-[#ded8ce] text-[#121214] p-5 pb-8 shadow-2xl rounded-sm transform -rotate-1 border border-zinc-400/30">
              {/* Polaroid Header Tape Stamping */}
              <div className="flex justify-between items-center text-[11px] font-mono-code tracking-[0.25em] uppercase font-bold text-zinc-800 pb-3 border-b border-zinc-400/50 mb-4">
                <span>{brandConfig?.name || 'FEATOUS'} | Official Home</span>
                <span>REC // '94</span>
              </div>

              {/* Polaroid Image Frame */}
              <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden film-grain rounded-xs">
                <img
                  src={
                    brandConfig?.retroPolaroidImage ||
                    'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop'
                  }
                  alt="Retro Rave Atmosphere"
                  className="w-full h-full object-cover contrast-125 sepia-[0.2]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 text-[9px] font-mono-code bg-black/70 text-zinc-200 px-2 py-0.5 rounded-sm">
                  SHIBUYA CAMPAIGN // 35MM
                </div>
              </div>

              {/* Polaroid Bottom Notes */}
              <div className="flex justify-between items-center pt-4 text-[10px] font-mono-code uppercase font-semibold text-zinc-700 tracking-wider">
                <span>RAVE '94 // WAREHOUSE // MCR</span>
                <span className="text-zinc-500">SERIAL #0994</span>
              </div>
            </div>

            {/* Overlapping Sneaker Cutout Card (FEAT.01 Archival Runner) */}
            <div
              onClick={() => onOpenProductById('prod-retro-runner')}
              className="absolute -bottom-6 -right-2 sm:right-6 w-60 sm:w-72 bg-[#1A1A1A] p-3 border border-[#2a2a2a] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] rounded-xl transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative aspect-square overflow-hidden bg-black/50 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop"
                  alt="FEAT.01 Archival Runner"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-white text-black text-[9px] font-mono-code font-bold uppercase rounded-full">
                  FEAT.01
                </div>
              </div>

              <div className="pt-2 text-[10px] font-mono-code tracking-wider uppercase flex justify-between items-center text-[#888]">
                <span className="font-semibold text-white">FEAT.01 // DARK MODE // ACTIVE</span>
                <span className="text-[#888] group-hover:text-white transition-colors">VIEW →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
