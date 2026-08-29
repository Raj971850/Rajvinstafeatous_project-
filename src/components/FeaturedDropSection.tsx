import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Plus, Sparkles, ExternalLink } from 'lucide-react';
import { Product, BrandConfig } from '../types';

interface FeaturedDropSectionProps {
  onOpenProduct: (product: Product) => void;
  products: Product[];
  onExploreDrops: () => void;
  brandConfig?: BrandConfig;
}

export const FeaturedDropSection: React.FC<FeaturedDropSectionProps> = ({
  onOpenProduct,
  products,
  onExploreDrops,
  brandConfig,
}) => {
  // Live ticking countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: '02',
    hours: '14',
    minutes: '36',
    seconds: '48'
  });

  useEffect(() => {
    let totalSeconds = 2 * 86400 + 14 * 3600 + 36 * 60 + 48;
    const interval = setInterval(() => {
      totalSeconds = Math.max(0, totalSeconds - 1);
      const d = Math.floor(totalSeconds / 86400);
      const h = Math.floor((totalSeconds % 86400) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const bomberProduct = products.find(p => p.id === 'prod-cyber-shell') || products[0];
  const ringProduct = products.find(p => p.id === 'prod-silver-signet') || products[1];
  const denimProduct = products.find(p => p.id === 'prod-acid-wash-denim') || products[2];
  const teeProduct = products.find(p => p.id === 'prod-heavy-tee') || products[3];

  return (
    <section id="new-drop" className="w-full py-16 sm:py-24 bg-[#0A0A0A] text-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Live Countdown Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#222]">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-mono-code tracking-[0.3em] text-[#888] uppercase mb-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span>LIMITED RELEASE // DROP 04</span>
            </div>
            <h2 className="font-editorial-serif text-3xl sm:text-5xl lg:text-6xl text-[#E5E5E5] uppercase tracking-tight">
              {brandConfig?.nextDropTitle || 'THE NEW DROP'}
            </h2>
            <p className="text-xs font-mono-code tracking-[0.2em] text-[#888] uppercase pt-2">
              {brandConfig?.nextDropSubtitle || 'NEW SEASON. NEW ENERGY.'}
            </p>
          </div>

          {/* Countdown Pill matching Bento styling */}
          <div className="flex items-center space-x-3 px-5 py-3 bg-[#151515] border border-[#2a2a2a] rounded-xl backdrop-blur-md self-start md:self-auto shadow-xl">
            <span className="text-[10px] font-mono-code tracking-[0.25em] text-[#888] uppercase">
              DROP IN
            </span>
            <div className="font-mono-code text-sm sm:text-base font-bold tracking-widest text-white flex items-center space-x-1.5">
              <span>{timeLeft.days}</span>
              <span className="text-[#666]">:</span>
              <span>{timeLeft.hours}</span>
              <span className="text-[#666]">:</span>
              <span>{timeLeft.minutes}</span>
              <span className="text-[#666]">:</span>
              <span className="text-white">{timeLeft.seconds}</span>
            </div>
          </div>
        </div>

        {/* 4-Tile Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 pt-8">
          {/* Tile 1: Tactical Bomber / Jacket (Large Horizontal Top Left) */}
          <div
            onClick={() => onOpenProduct(bomberProduct)}
            className="md:col-span-7 group relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#151515] rounded-2xl cursor-pointer border border-[#222] hover:border-[#444] transition-all duration-300 shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop"
              alt="FEATOUS Metallic Parachute Bomber"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

            {/* Content overlay */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-end">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#888] block mb-1">
                  CORE DROP // 01
                </span>
                <h4 className="font-editorial-serif text-lg sm:text-2xl text-white uppercase tracking-wide">
                  METALLIC PARACHUTE BOMBER
                </h4>
                <p className="text-xs font-mono-code text-[#aaa] hidden sm:block pt-1">
                  Liquid-metal sheen memory nylon with RiRi dual-zip
                </p>
              </div>

              <div className="p-2.5 bg-white text-black rounded-xl group-hover:bg-[#E5E5E5] transition-colors shadow-md">
                <Plus size={16} />
              </div>
            </div>
          </div>

          {/* Tile 2: Macro Ring Close-up (Top Right) */}
          <div
            onClick={() => onOpenProduct(ringProduct)}
            className="md:col-span-5 group relative aspect-square sm:aspect-auto overflow-hidden bg-[#151515] rounded-2xl cursor-pointer border border-[#222] hover:border-[#444] transition-all duration-300 shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop"
              alt="FEATOUS Monolith 925 Signet Ring"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Macro Stamp Overlay */}
            <div className="absolute top-4 left-4 text-[9px] font-mono-code tracking-[0.2em] bg-[#151515]/80 backdrop-blur-sm px-2.5 py-1 border border-[#2a2a2a] uppercase text-[#aaa] rounded-full">
              STERLING 925 // 18.4G
            </div>

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-end">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#888] block mb-1">
                  ACCESSORY // 02
                </span>
                <h4 className="font-editorial-serif text-lg sm:text-xl text-white uppercase tracking-wide">
                  MONOLITH 925 SIGNET
                </h4>
              </div>
              <div className="p-2 bg-white text-black rounded-xl group-hover:bg-[#E5E5E5] transition-colors shadow-md">
                <Plus size={14} />
              </div>
            </div>
          </div>

          {/* Tile 3: Flat-Lay Acid Wash Denim (Bottom Left) */}
          <div
            onClick={() => onOpenProduct(denimProduct)}
            className="md:col-span-4 group relative aspect-square sm:aspect-[4/5] overflow-hidden bg-[#151515] rounded-2xl cursor-pointer border border-[#222] hover:border-[#444] transition-all duration-300 shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop"
              alt="FEATOUS 1994 Raw-Edge Paneled Denim"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-end">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#888] block mb-1">
                  ARCHIVE // 03
                </span>
                <h4 className="font-editorial-serif text-base sm:text-lg text-white uppercase tracking-wide">
                  1994 RAW-EDGE DENIM
                </h4>
              </div>
              <div className="p-2 bg-white text-black rounded-xl group-hover:bg-[#E5E5E5] transition-colors shadow-md">
                <Plus size={14} />
              </div>
            </div>
          </div>

          {/* Tile 4: Street Night Model with Bag (Bottom Right) */}
          <div
            onClick={() => onOpenProduct(teeProduct)}
            className="md:col-span-8 group relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden bg-[#151515] rounded-2xl cursor-pointer border border-[#222] hover:border-[#444] transition-all duration-300 shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop"
              alt="FEATOUS Street Night Look"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-end">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#888] block mb-1">
                  STYLING // 04
                </span>
                <h4 className="font-editorial-serif text-lg sm:text-2xl text-white uppercase tracking-wide">
                  SHIBUYA AFTER-HOURS FIT
                </h4>
                <p className="text-xs font-mono-code text-[#aaa] hidden sm:block pt-1">
                  Oversized 320 GSM Box Tee styled with modular tactical accessories
                </p>
              </div>

              <div className="p-2.5 bg-white text-black rounded-xl group-hover:bg-[#E5E5E5] transition-colors shadow-md">
                <Plus size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* View All Drops Button */}
        <div className="text-center pt-10">
          <button
            onClick={onExploreDrops}
            className="inline-flex items-center space-x-3 text-xs font-mono-code uppercase tracking-[0.25em] text-[#aaa] hover:text-white transition-colors border-b border-[#333] hover:border-white pb-1 group"
          >
            <span>VIEW ALL DROPS & ARCHIVE</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
