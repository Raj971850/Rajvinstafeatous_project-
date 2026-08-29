import React, { useState } from 'react';
import { Instagram, Heart, MessageCircle, Play, Layers, ArrowUpRight, CheckCircle2, Share2 } from 'lucide-react';
import { InstagramPost, BrandConfig } from '../types';

interface InstagramExperienceProps {
  posts: InstagramPost[];
  onOpenPostModal: (post: InstagramPost) => void;
  brandConfig?: BrandConfig;
}

export const InstagramExperience: React.FC<InstagramExperienceProps> = ({
  posts,
  onOpenPostModal,
  brandConfig,
}) => {
  const [filterType, setFilterType] = useState<'ALL' | 'REELS' | 'STYLING' | 'BEHIND THE SCENES'>('ALL');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleLikeQuick = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    setLikedMap(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const filteredPosts = posts.filter(post => {
    if (filterType === 'ALL') return true;
    if (filterType === 'REELS') return post.type === 'reel';
    if (filterType === 'STYLING') return post.caption.toLowerCase().includes('style') || post.caption.toLowerCase().includes('fit');
    if (filterType === 'BEHIND THE SCENES') return post.caption.toLowerCase().includes('campaign') || post.caption.toLowerCase().includes('35mm');
    return true;
  });

  const handle = brandConfig?.handle || '@FEATOUS';
  const instagramUrl = brandConfig?.instagramUrl || 'https://instagram.com/featous';
  const stats = brandConfig?.stats || { followers: '148K', following: '210', posts: '184' };

  return (
    <section id="instagram-hub" className="w-full py-16 sm:py-24 bg-[#0A0A0A] text-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Instagram Profile Header Bento Card */}
        <div className="bg-[#151515] border border-[#222] rounded-2xl p-6 sm:p-10 mb-12 relative overflow-hidden shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Profile Avatar & Info */}
            <div className="flex items-center space-x-5 sm:space-x-6">
              <div className="relative">
                {/* Gradient ring */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shadow-xl">
                  <div className="w-full h-full rounded-full bg-black p-[2px]">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
                      alt="FEATOUS Instagram Avatar"
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-black">
                  <CheckCircle2 size={12} className="text-white" />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-editorial-serif text-xl sm:text-2xl font-bold tracking-wider text-white">
                    {handle}
                  </h3>
                  <span className="px-2 py-0.5 bg-[#222] text-[9px] font-mono-code rounded-full text-[#aaa]">
                    OFFICIAL
                  </span>
                </div>
                <p className="text-xs font-mono-code text-[#888] pt-1">
                  Built for your era. Streetwear • Active • Premium • 90s Retro
                </p>

                {/* Follower Stats */}
                <div className="flex items-center space-x-6 pt-3 text-xs font-mono-code">
                  <div>
                    <span className="font-bold text-white">{stats.posts}</span>{' '}
                    <span className="text-[#888]">posts</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">{stats.followers}</span>{' '}
                    <span className="text-[#888]">followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">{stats.following}</span>{' '}
                    <span className="text-[#888]">following</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial px-6 py-3 bg-white text-black hover:bg-[#E5E5E5] transition-all font-semibold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 rounded-xl shadow-lg group"
              >
                <Instagram size={14} />
                <span>FOLLOW ON INSTAGRAM</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-[#1a1a1a] hover:bg-[#222] text-white border border-[#2a2a2a] rounded-xl transition-all text-xs font-mono-code uppercase tracking-wider flex items-center justify-center space-x-1.5"
              >
                <span>OPEN APP</span>
              </a>
            </div>
          </div>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#222] mb-8">
          <div>
            <span className="text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase block mb-1">
              {handle} // SOCIAL FEED
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-5xl text-[#E5E5E5] uppercase tracking-tight leading-tight">
              MORE THAN CLOTHES. <br className="hidden sm:inline" />
              <span className="italic text-[#aaa] font-light">IT'S A CULTURE.</span>
            </h2>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center space-x-2">
            {(['ALL', 'REELS', 'STYLING', 'BEHIND THE SCENES'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-3.5 py-1.5 text-[10px] font-mono-code uppercase tracking-wider transition-colors border rounded-full ${
                  filterType === tab
                    ? 'bg-white text-black border-white font-semibold'
                    : 'bg-[#151515] text-[#888] border-[#2a2a2a] hover:text-white hover:border-[#444]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 3×3 Authentic Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredPosts.slice(0, 9).map((post) => {
            const isLiked = likedMap[post.id];
            const displayLikes = post.likes + (isLiked ? 1 : 0);

            return (
              <div
                key={post.id}
                onClick={() => onOpenPostModal(post)}
                className="group relative aspect-square bg-[#151515] rounded-2xl overflow-hidden cursor-pointer border border-[#222] hover:border-[#444] transition-all duration-300 shadow-xl"
              >
                {/* Media Image */}
                <img
                  src={post.images[0]}
                  alt={post.caption}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95"
                  referrerPolicy="no-referrer"
                />

                {/* Top Corner Type Indicator */}
                <div className="absolute top-3 right-3 z-10">
                  {post.type === 'reel' && (
                    <div className="p-2 bg-[#151515]/80 backdrop-blur-md rounded-full text-white shadow-md border border-[#2a2a2a]">
                      <Play size={12} fill="white" />
                    </div>
                  )}
                  {post.type === 'carousel' && (
                    <div className="p-2 bg-[#151515]/80 backdrop-blur-md rounded-full text-white shadow-md border border-[#2a2a2a]">
                      <Layers size={12} />
                    </div>
                  )}
                </div>

                {/* Location badge */}
                {post.location && (
                  <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-mono-code px-2.5 py-1 bg-[#151515]/90 backdrop-blur-md text-[#E5E5E5] border border-[#2a2a2a] rounded-full">
                      {post.location}
                    </span>
                  </div>
                )}

                {/* Hover Overlay with Likes, Comments, and Caption */}
                <div className="absolute inset-0 bg-[#0A0A0A]/85 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-5 text-white">
                  {/* Top quick audio / tag */}
                  <div className="text-[9px] font-mono-code text-[#888] line-clamp-1">
                    {post.audioTrack || `${handle} OFFICIAL CAMPAIGN`}
                  </div>

                  {/* Center Stats */}
                  <div className="flex items-center justify-center space-x-6 text-sm font-semibold">
                    <button
                      onClick={(e) => handleLikeQuick(e, post.id)}
                      className="flex items-center space-x-1.5 hover:scale-110 transition-transform"
                    >
                      <Heart
                        size={18}
                        className={isLiked ? 'text-red-500 fill-red-500' : 'text-white'}
                      />
                      <span className="font-mono-code text-xs">
                        {displayLikes > 999 ? `${(displayLikes / 1000).toFixed(1)}k` : displayLikes}
                      </span>
                    </button>

                    <div className="flex items-center space-x-1.5">
                      <MessageCircle size={18} />
                      <span className="font-mono-code text-xs">{post.commentsCount}</span>
                    </div>
                  </div>

                  {/* Bottom caption preview */}
                  <div className="text-left">
                    <p className="text-xs text-[#E5E5E5] line-clamp-2 font-sans leading-snug">
                      {post.caption}
                    </p>
                    <span className="text-[9px] font-mono-code text-[#888] block pt-1.5">
                      TAP TO VIEW POST →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instagram CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12">
          <a
            id="ig-grid-follow-btn"
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-[#E5E5E5] transition-all text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center space-x-2 rounded-xl shadow-2xl"
          >
            <Instagram size={16} />
            <span>FOLLOW {handle} ON INSTAGRAM →</span>
          </a>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#151515] border border-[#2a2a2a] hover:border-[#444] text-[#E5E5E5] hover:bg-[#1a1a1a] transition-all text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center space-x-2 rounded-xl shadow-md"
          >
            <span>SEE MORE ON INSTAGRAM</span>
          </a>
        </div>
      </div>
    </section>
  );
};
