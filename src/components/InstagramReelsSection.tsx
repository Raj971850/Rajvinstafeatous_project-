import React, { useRef } from 'react';
import { Play, Instagram, ChevronLeft, ChevronRight, Volume2, Eye, Heart, Sparkles, Mic, Film } from 'lucide-react';
import { ReelItem, BrandConfig } from '../types';

interface InstagramReelsSectionProps {
  reels: ReelItem[];
  onOpenReel: (reel: ReelItem) => void;
  brandConfig?: BrandConfig;
}

export const InstagramReelsSection: React.FC<InstagramReelsSectionProps> = ({
  reels,
  onOpenReel,
  brandConfig,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const instagramUrl = brandConfig?.instagramUrl || 'https://instagram.com/featous';
  const brandName = brandConfig?.name || 'FEATOUS';

  return (
    <section className="w-full py-20 sm:py-28 bg-[#0A0A0A] text-[#E5E5E5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>INSTAGRAM REELS & MOTION ARCHIVE</span>
            </div>
            <h2 className="font-editorial-serif text-3xl sm:text-5xl text-white uppercase tracking-tight">
              WATCH THE {brandName} WORLD
            </h2>
            <p className="text-xs font-mono-code tracking-[0.2em] text-[#888] uppercase pt-1">
              STYLING TRANSITIONS • STREET CULTURE • BEHIND THE SCENES
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 bg-[#151515] hover:bg-white hover:text-black rounded-xl border border-[#333] transition-colors text-white"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 bg-[#151515] hover:bg-white hover:text-black rounded-xl border border-[#333] transition-colors text-white"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Reels Carousel in Bento Cards */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-5 overflow-x-auto no-scrollbar pb-6 pt-2 snap-x snap-mandatory"
        >
          {reels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => onOpenReel(reel)}
              className="group flex-none w-[260px] sm:w-[300px] aspect-[9/16] bg-[#151515] relative overflow-hidden cursor-pointer border border-[#222] hover:border-[#444] rounded-2xl transition-all duration-300 snap-start shadow-xl"
            >
              {/* Reel Thumbnail */}
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Scrims */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/20 to-black/60 opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Top Header Tag */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 gap-2">
                <div className="flex items-center space-x-1.5 overflow-hidden">
                  <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/20 text-[9px] font-mono-code text-[#E5E5E5] uppercase tracking-wider shrink-0">
                    {reel.category}
                  </span>
                  {reel.videoUrl && (
                    <span className="px-2 py-0.5 bg-blue-950/80 text-blue-300 border border-blue-500/40 rounded-full text-[8px] font-mono-code flex items-center space-x-1 shrink-0">
                      <Film size={9} />
                      <span>HD</span>
                    </span>
                  )}
                  {reel.voiceAudioUrl && reel.voiceEnabled !== false && (
                    <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 rounded-full text-[8px] font-mono-code flex items-center space-x-1 shrink-0 animate-pulse">
                      <Mic size={9} />
                      <span>VOICE</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-1 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full text-[9px] font-mono-code text-[#ccc] shrink-0">
                  <Eye size={10} />
                  <span>{reel.views}</span>
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-2xl text-white">
                  <Play size={22} className="ml-1 fill-current" />
                </div>
              </div>

              {/* Bottom Metadata */}
              <div className="absolute bottom-4 left-4 right-4 space-y-2 z-10">
                <div className="flex items-center space-x-2 text-[10px] font-mono-code text-[#aaa]">
                  <span className="font-semibold text-white">{reel.creator}</span>
                  <span>•</span>
                  <span>{reel.duration}</span>
                </div>

                <h4 className="font-editorial-serif text-base text-white uppercase tracking-wide leading-snug line-clamp-2">
                  {reel.title}
                </h4>

                <div className="flex items-center space-x-1.5 text-[9px] font-mono-code text-[#888] pt-1">
                  <Volume2 size={11} className="text-[#ccc]" />
                  <span className="truncate">{reel.audioTrack}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="text-center pt-8">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-[0.25em] text-[#aaa] hover:text-white transition-colors border-b border-[#333] hover:border-white pb-1 group"
          >
            <Instagram size={14} />
            <span>WATCH MORE REELS ON INSTAGRAM →</span>
          </a>
        </div>
      </div>
    </section>
  );
};
