import React from 'react';
import { X, MapPin, Palette, ArrowRight, Share2, Compass } from 'lucide-react';
import { Campaign, Product } from '../types';
import { BRAND_CONFIG } from '../data/brandData';

interface CampaignModalProps {
  campaign: Campaign | null;
  onClose: () => void;
  onExploreProducts: () => void;
}

export const CampaignModal: React.FC<CampaignModalProps> = ({
  campaign,
  onClose,
  onExploreProducts,
}) => {
  if (!campaign) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#151515] border border-[#222] rounded-3xl my-auto shadow-2xl overflow-hidden text-[#E5E5E5]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 bg-[#1a1a1a] hover:bg-white hover:text-black rounded-full border border-[#333] text-[#aaa] transition-colors"
          aria-label="Close Campaign Modal"
        >
          <X size={20} />
        </button>

        <div className="max-h-[88vh] overflow-y-auto">
          {/* Hero Banner */}
          <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full bg-[#101010] overflow-hidden">
            <img
              src={campaign.heroImage}
              alt={campaign.title}
              className="w-full h-full object-cover object-center brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 space-y-2">
              <span className="text-[10px] font-mono-code tracking-[0.3em] uppercase text-[#888]">
                {campaign.season} // {campaign.subtitle}
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-5xl text-white uppercase tracking-tight">
                {campaign.title}
              </h2>
            </div>
          </div>

          {/* Campaign Narrative & Spec */}
          <div className="p-6 sm:p-10 space-y-10">
            {/* Meta Grid in Bento Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl text-xs font-mono-code">
              <div>
                <span className="text-[#888] mb-1 flex items-center space-x-1">
                  <MapPin size={12} />
                  <span>LOCATION ARCHIVE:</span>
                </span>
                <span className="text-white font-semibold">{campaign.location}</span>
              </div>

              <div>
                <span className="text-[#888] mb-1 flex items-center space-x-1">
                  <Compass size={12} />
                  <span>AESTHETIC VIBE:</span>
                </span>
                <span className="text-white font-semibold">{campaign.vibe}</span>
              </div>

              <div>
                <span className="text-[#888] mb-1 flex items-center space-x-1">
                  <Palette size={12} />
                  <span>COLOR SPECTRUM:</span>
                </span>
                <div className="flex items-center space-x-2 pt-1">
                  {campaign.palette.map((color, idx) => (
                    <span
                      key={idx}
                      className="w-4 h-4 rounded-full border border-white/40 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Editorial Story */}
            <div className="space-y-4 max-w-3xl">
              <h4 className="font-editorial-serif text-2xl text-white uppercase tracking-wide">
                "{campaign.tagline}"
              </h4>
              <p className="text-sm font-sans text-[#ccc] leading-relaxed">
                {campaign.description} Every frame was captured with analog medium-format lenses on location, embracing the unscripted energy of city nightlife and high-output physical movement.
              </p>
            </div>

            {/* Editorial Image Gallery Collage */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono-code tracking-[0.25em] text-[#888] uppercase block">
                LOOKBOOK SPREADS // 35MM
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {campaign.secondaryImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] bg-black overflow-hidden rounded-2xl border border-[#2a2a2a]">
                    <img
                      src={img}
                      alt={`Look ${idx + 1}`}
                      className="w-full h-full object-cover object-center brightness-90 hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#222] flex flex-col sm:flex-row justify-between items-center gap-4">
              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono-code text-[#888] hover:text-white uppercase tracking-wider underline"
              >
                VIEW FULL CAMPAIGN ON INSTAGRAM →
              </a>

              <button
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#E5E5E5] rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>EXPLORE PIECES</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
