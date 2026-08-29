import React, { useState } from 'react';
import { Instagram, Heart, Tag, Sparkles, Plus, MapPin } from 'lucide-react';
import { CommunityLook, BrandConfig } from '../types';
import { BRAND_CONFIG } from '../data/brandData';

interface CommunitySectionProps {
  communityLooks: CommunityLook[];
  onOpenUgcModal: () => void;
  onOpenProductByName: (name: string) => void;
  brandConfig?: BrandConfig;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  communityLooks,
  onOpenUgcModal,
  onOpenProductByName,
  brandConfig,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [likedLooks, setLikedLooks] = useState<Record<string, boolean>>({});

  const hashtags = brandConfig?.hashtags || BRAND_CONFIG.hashtags;
  const handle = brandConfig?.handle || '@FEATOUS';

  const cities = ['ALL', 'London, UK', 'Tokyo, Japan', 'Berlin, Germany', 'New York, USA', 'Seoul, South Korea', 'Milan, Italy'];

  const filteredLooks = selectedCity === 'ALL'
    ? communityLooks
    : communityLooks.filter(look => look.city.toLowerCase().includes(selectedCity.split(',')[0].toLowerCase()));

  const toggleLike = (lookId: string) => {
    setLikedLooks(prev => ({
      ...prev,
      [lookId]: !prev[lookId]
    }));
  };

  return (
    <section id="community-section" className="w-full py-20 sm:py-28 bg-[#0A0A0A] text-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>UGC & STREET STYLING</span>
            </div>
            <h2 className="font-editorial-serif text-3xl sm:text-5xl text-white uppercase tracking-tight">
              WORN BY THE COMMUNITY
            </h2>

            {/* Hashtag List */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono-code text-[#aaa] font-semibold hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Trigger */}
          <button
            onClick={onOpenUgcModal}
            className="self-start md:self-auto px-5 py-2.5 bg-[#151515] hover:bg-white text-[#E5E5E5] hover:text-black border border-[#333] rounded-xl transition-all text-xs font-mono-code uppercase tracking-widest flex items-center space-x-2 shadow-md"
          >
            <Plus size={14} />
            <span>TAG {handle} TO BE FEATURED</span>
          </button>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-6">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 text-[10px] font-mono-code uppercase tracking-wider rounded-xl whitespace-nowrap transition-colors border ${
                selectedCity === city
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-[#151515] text-[#888] border-[#222] hover:text-white hover:border-[#444]'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Community Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {filteredLooks.map((look) => {
            const isLiked = likedLooks[look.id];
            const likesCount = look.likes + (isLiked ? 1 : 0);

            return (
              <div
                key={look.id}
                className="group relative bg-[#151515] border border-[#222] hover:border-[#444] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl"
              >
                {/* Look Photo */}
                <div className="relative aspect-[4/5] bg-black overflow-hidden rounded-t-2xl">
                  <img
                    src={look.image}
                    alt={look.userHandle}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top user handle */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                    <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                      <img
                        src={look.avatar}
                        alt={look.userHandle}
                        className="w-4 h-4 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[10px] font-mono-code text-white">
                        {look.userHandle}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleLike(look.id)}
                      className="p-2 rounded-full bg-black/70 backdrop-blur-md text-white hover:scale-110 transition-transform"
                    >
                      <Heart
                        size={14}
                        className={isLiked ? 'text-red-500 fill-red-500' : 'text-white'}
                      />
                    </button>
                  </div>

                  {/* City Badge */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="flex items-center space-x-1 text-[9px] font-mono-code px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[#ccc] border border-white/10">
                      <MapPin size={10} />
                      <span>{look.city}</span>
                    </span>
                  </div>
                </div>

                {/* Outfit Details & Tagged Pieces */}
                <div className="p-5 space-y-3 bg-[#151515]">
                  <p className="text-xs text-[#ccc] font-sans italic leading-relaxed">
                    "{look.caption}"
                  </p>

                  {/* Tagged Items List */}
                  <div className="space-y-1.5 pt-2 border-t border-[#222]">
                    <span className="text-[9px] font-mono-code uppercase tracking-wider text-[#888] block">
                      FEATURED PIECES:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {look.outfitPieces.map((piece, pIdx) => (
                        <span
                          key={pIdx}
                          onClick={() => onOpenProductByName(piece)}
                          className="px-2 py-0.5 bg-[#1f1f1f] hover:bg-[#2a2a2a] cursor-pointer rounded-md border border-[#333] text-[9px] font-mono-code text-[#ccc] hover:text-white transition-colors"
                        >
                          {piece}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Footer in Bento Container */}
        <div className="mt-16 p-8 sm:p-10 bg-[#151515] border border-[#222] rounded-2xl text-center space-y-4 shadow-xl">
          <Instagram size={24} className="mx-auto text-[#aaa]" />
          <h3 className="font-editorial-serif text-2xl sm:text-3xl text-white uppercase tracking-tight">
            BECOME PART OF THE ARCHIVE
          </h3>
          <p className="text-xs font-mono-code text-[#888] tracking-wider max-w-xl mx-auto leading-relaxed">
            Post your outfit on Instagram with <strong className="text-white">#FEATOUS</strong> and tag <strong className="text-white">@FEATOUS</strong> to be curated on our global campaign grid and receive early private drop codes.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenUgcModal}
              className="px-6 py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#E5E5E5] rounded-xl transition-all shadow-xl"
            >
              SHARE YOUR FIT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
