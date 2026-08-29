import React, { useState } from 'react';
import { ArrowRight, X, Sparkles, Shield, Compass, Scissors } from 'lucide-react';
import { BrandConfig } from '../types';

interface BrandManifestoProps {
  brandConfig?: BrandConfig;
}

export const BrandManifesto: React.FC<BrandManifestoProps> = ({ brandConfig }) => {
  const [manifestoModalOpen, setManifestoModalOpen] = useState(false);
  const brandName = brandConfig?.name || 'FEATOUS';
  const manifestoLead =
    brandConfig?.manifestoLead ||
    'FEATOUS IS BUILT FOR A GENERATION THAT REFUSES TO FOLLOW ONE STYLE.';
  const manifestoBody =
    brandConfig?.manifestoBody ||
    "WE EXIST AT THE INTERSECTION OF HIGH FASHION AND STREET CULTURE. RADICAL LUXURY IS NOT A PRICE TAG; IT'S AN ATTITUDE.";

  return (
    <>
      <section className="relative w-full py-20 sm:py-28 bg-[#0A0A0A] text-[#E5E5E5] overflow-hidden film-grain">
        {/* Gritty Dark Background Texture */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=2000&auto=format&fit=crop"
            alt="FEATOUS Atmosphere Background"
            className="w-full h-full object-cover object-center brightness-[0.2] contrast-150 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Brand Tag */}
          <div className="flex flex-col items-center space-y-1">
            <span className="font-cinzel text-lg tracking-[0.3em] text-[#888] uppercase font-bold">
              {brandName}
            </span>
            <span className="text-[10px] font-mono-code tracking-[0.25em] text-[#666] uppercase">
              Official Home // Manifesto
            </span>
          </div>

          {/* Large Editorial Headline */}
          <h2 className="font-editorial-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#E5E5E5] uppercase tracking-[0.03em] leading-[1.05] max-w-4xl mx-auto font-light">
            {manifestoLead}
          </h2>

          {/* Subtitle statement */}
          <p className="font-mono-code text-xs sm:text-sm md:text-base tracking-[0.2em] text-[#aaa] uppercase max-w-3xl mx-auto leading-relaxed">
            {manifestoBody}
          </p>

          {/* Action CTA */}
          <div className="pt-4">
            <button
              id="read-manifesto-btn"
              onClick={() => setManifestoModalOpen(true)}
              className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-[0.25em] text-white hover:text-[#aaa] transition-colors border-b border-[#444] hover:border-white pb-1 group"
            >
              <span>READ THE MANIFESTO</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Manifesto Deep Dive Modal */}
      {manifestoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#151515] border border-[#222] rounded-2xl p-8 sm:p-12 text-left space-y-8 my-8 shadow-2xl">
            <button
              onClick={() => setManifestoModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#1a1a1a] text-[#888] hover:text-white border border-[#2a2a2a] transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase">
                THE {brandName} CREED // 2026 ARCHIVE
              </span>
              <h3 className="font-editorial-serif text-3xl sm:text-4xl text-white uppercase tracking-tight">
                WE DON'T FOLLOW TRENDS. WE CREATE OUR ERA.
              </h3>
            </div>

            <div className="space-y-6 text-sm font-sans text-[#ccc] leading-relaxed border-t border-b border-[#222] py-6">
              <p>
                Fashion today moves too fast and says too little. Algorithms manufacture trends that vanish before the ink dries. <strong>{brandName}</strong> was born out of a rebellion against disposable aesthetic homogeny.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="space-y-2 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl">
                  <Scissors size={20} className="text-[#aaa]" />
                  <h4 className="font-editorial-serif text-base text-white uppercase">MATERIAL TRUTH</h4>
                  <p className="text-xs text-[#888] font-mono-code">
                    320+ GSM custom French Terry, Okayama Kurabo selvedge, and Mulberry silk blends.
                  </p>
                </div>

                <div className="space-y-2 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl">
                  <Shield size={20} className="text-[#aaa]" />
                  <h4 className="font-editorial-serif text-base text-white uppercase">NO SEASONAL WASTE</h4>
                  <p className="text-xs text-[#888] font-mono-code">
                    Limited drop mechanics designed to protect garment longevity and provenance.
                  </p>
                </div>

                <div className="space-y-2 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl">
                  <Compass size={20} className="text-[#aaa]" />
                  <h4 className="font-editorial-serif text-base text-white uppercase">DUAL CITIZENSHIP</h4>
                  <p className="text-xs text-[#888] font-mono-code">
                    Seamless translation between high-output athletic training and elevated nightlife.
                  </p>
                </div>
              </div>

              <p>
                Whether you are wearing a 90s stone-washed denim on the Tokyo metro or an architectural Milanese knit polo in London, you belong to an era defined by intention, discipline, and uncompromising self-expression.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="font-cinzel text-lg tracking-widest text-[#888] font-bold">
                {brandName} // BUILT FOR YOUR ERA
              </span>

              <button
                onClick={() => setManifestoModalOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 bg-white text-black font-mono-code text-xs uppercase tracking-widest font-semibold hover:bg-[#E5E5E5] rounded-xl transition-colors"
              >
                RETURN TO CAMPAIGN
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
