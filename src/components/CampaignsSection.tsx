import React from 'react';
import { ArrowRight, Compass, Eye, Sparkles } from 'lucide-react';
import { Campaign } from '../types';

interface CampaignsSectionProps {
  campaigns: Campaign[];
  onOpenCampaign: (campaign: Campaign) => void;
}

export const CampaignsSection: React.FC<CampaignsSectionProps> = ({
  campaigns,
  onOpenCampaign,
}) => {
  return (
    <section id="campaigns" className="w-full py-20 sm:py-28 bg-[#0A0A0A] text-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span>EDITORIAL VISUAL CAMPAIGNS</span>
            </div>
            <h2 className="font-editorial-serif text-3xl sm:text-5xl text-white uppercase tracking-tight">
              BRAND CAMPAIGNS
            </h2>
            <p className="text-xs font-mono-code tracking-[0.2em] text-[#888] uppercase pt-1">
              CINEMATIC VISUAL NARRATIVES FROM TOKYO, LONDON, BERLIN & MILAN
            </p>
          </div>
        </div>

        {/* 2x2 Bento Grid Editorial Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {campaigns.map((camp, idx) => (
            <div
              key={camp.id}
              onClick={() => onOpenCampaign(camp)}
              className="group relative min-h-[460px] sm:min-h-[500px] bg-[#151515] flex flex-col justify-between p-8 sm:p-10 overflow-hidden cursor-pointer border border-[#222] hover:border-[#444] rounded-2xl transition-all duration-300 shadow-xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={camp.heroImage}
                  alt={camp.title}
                  className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 brightness-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/70 opacity-90 group-hover:opacity-80 transition-opacity" />
              </div>

              {/* Top Header Information */}
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono-code tracking-[0.3em] uppercase text-[#888] block mb-1">
                    {camp.season} // 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono-code text-[#ccc] uppercase tracking-wider">
                    {camp.subtitle}
                  </span>
                </div>

                <div className="p-2.5 bg-black/60 backdrop-blur-md rounded-full border border-white/15 text-[#ccc] group-hover:text-white group-hover:border-white transition-colors">
                  <Eye size={16} />
                </div>
              </div>

              {/* Bottom Content & CTA */}
              <div className="relative z-10 space-y-4">
                {/* Palette preview */}
                <div className="flex items-center space-x-1.5 mb-2">
                  {camp.palette.map((color, cIdx) => (
                    <span
                      key={cIdx}
                      className="w-3 h-3 rounded-full border border-white/30"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <span className="text-[9px] font-mono-code text-[#888] pl-2 uppercase">
                    {camp.location}
                  </span>
                </div>

                <h3 className="font-editorial-serif text-3xl sm:text-4xl text-white uppercase tracking-tight leading-none group-hover:text-[#E5E5E5] transition-colors">
                  {camp.title}
                </h3>

                <p className="text-xs font-mono-code text-[#aaa] tracking-wider leading-relaxed line-clamp-2">
                  {camp.description}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-[0.25em] text-white group-hover:text-[#aaa] transition-colors">
                    <span className="border-b border-white pb-0.5 font-semibold">EXPLORE CAMPAIGN</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
