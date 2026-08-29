import React, { useState, useEffect, useRef } from 'react';
import {
  Instagram,
  RefreshCw,
  Upload,
  Link,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Radio,
  Eye,
  TrendingUp,
  UserCheck,
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  Sliders,
  Clock,
  Zap,
  Globe,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { BrandConfig, InstagramPost, Product } from '../../types';
import {
  CURATED_BRAND_AVATARS,
  fetchLiveInstagramProfile,
  formatInstagramNumber,
  parseInstagramNumber,
  broadcastInstagramUpdate
} from '../../lib/instagramLiveSync';
import { ImageLinkInput } from './ImageLinkInput';

interface InstagramRealtimeStudioProps {
  brandConfig: BrandConfig;
  onUpdateBrandConfig: (config: BrandConfig) => void;
  instagramPosts: InstagramPost[];
  onUpdateInstagramPosts: (posts: InstagramPost[]) => void;
  products: Product[];
}

export const InstagramRealtimeStudio: React.FC<InstagramRealtimeStudioProps> = ({
  brandConfig,
  onUpdateBrandConfig,
  instagramPosts,
  onUpdateInstagramPosts,
  products,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'IDLE' | 'SYNCING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [statusMessage, setStatusMessage] = useState('');
  const [customDpUrl, setCustomDpUrl] = useState(brandConfig.instagramProfilePic || CURATED_BRAND_AVATARS[0].url);
  const [copiedLink, setCopiedLink] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto Sync Interval Timer
  const [autoSync, setAutoSync] = useState(brandConfig.autoSyncInstagram ?? true);
  const [syncInterval, setSyncInterval] = useState(brandConfig.syncIntervalMinutes ?? 5);

  // Live Stats Inputs
  const [handle, setHandle] = useState(brandConfig.handle);
  const [instagramUrl, setInstagramUrl] = useState(brandConfig.instagramUrl);
  const [followers, setFollowers] = useState(brandConfig.stats.followers);
  const [following, setFollowing] = useState(brandConfig.stats.following);
  const [postsCount, setPostsCount] = useState(brandConfig.stats.posts);
  const [bio, setBio] = useState(brandConfig.instagramBio || 'Built for your era. Streetwear • Active • Premium • 90s Retro Archive. Worldwide shipping.');
  const [isVerified, setIsVerified] = useState(brandConfig.isVerified ?? true);
  const [engagementRate, setEngagementRate] = useState(brandConfig.stats.engagementRate || '5.2%');
  const [monthlyReach, setMonthlyReach] = useState(brandConfig.stats.monthlyReach || '1.4M');

  // New Post Form State
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostImageUrl, setNewPostImageUrl] = useState('');
  const [newPostCaption, setNewPostCaption] = useState('');
  const [newPostType, setNewPostType] = useState<'image' | 'reel' | 'carousel'>('image');
  const [newPostTaggedProduct, setNewPostTaggedProduct] = useState('');

  // Keep local state in sync when brandConfig updates from outside
  useEffect(() => {
    setHandle(brandConfig.handle);
    setInstagramUrl(brandConfig.instagramUrl);
    setFollowers(brandConfig.stats.followers);
    setFollowing(brandConfig.stats.following);
    setPostsCount(brandConfig.stats.posts);
    if (brandConfig.instagramBio) setBio(brandConfig.instagramBio);
    if (brandConfig.instagramProfilePic) setCustomDpUrl(brandConfig.instagramProfilePic);
    if (brandConfig.isVerified !== undefined) setIsVerified(brandConfig.isVerified);
    if (brandConfig.stats.engagementRate) setEngagementRate(brandConfig.stats.engagementRate);
    if (brandConfig.stats.monthlyReach) setMonthlyReach(brandConfig.stats.monthlyReach);
    if (brandConfig.autoSyncInstagram !== undefined) setAutoSync(brandConfig.autoSyncInstagram);
    if (brandConfig.syncIntervalMinutes !== undefined) setSyncInterval(brandConfig.syncIntervalMinutes);
  }, [brandConfig]);

  // Handle Manual Live Sync
  const handleLiveSyncNow = async () => {
    setIsSyncing(true);
    setSyncStatus('SYNCING');
    setStatusMessage('Querying Instagram profile and live follower metrics...');

    try {
      const liveData = await fetchLiveInstagramProfile(instagramUrl || handle, brandConfig);
      
      const updatedConfig: BrandConfig = {
        ...brandConfig,
        handle: liveData.handle,
        instagramBio: liveData.bio,
        instagramProfilePic: customDpUrl || liveData.avatarUrl,
        isVerified: liveData.isVerified,
        stats: {
          ...brandConfig.stats,
          followers: liveData.followers,
          following: liveData.following,
          posts: liveData.postsCount,
          engagementRate: liveData.engagementRate,
          monthlyReach: liveData.monthlyReach,
        },
        lastSyncedAt: liveData.lastUpdated,
      };

      onUpdateBrandConfig(updatedConfig);
      setFollowers(liveData.followers);
      setFollowing(liveData.following);
      setPostsCount(liveData.postsCount);
      setBio(liveData.bio);
      setHandle(liveData.handle);
      setEngagementRate(liveData.engagementRate);
      setMonthlyReach(liveData.monthlyReach);

      // Broadcast real-time update
      broadcastInstagramUpdate({
        brandConfig: updatedConfig,
        type: 'PROFILE_SYNC',
      });

      setSyncStatus('SUCCESS');
      setStatusMessage(`Successfully synced with Instagram! Followers updated to ${liveData.followers}`);
      setTimeout(() => setSyncStatus('IDLE'), 4000);
    } catch (err) {
      setSyncStatus('ERROR');
      setStatusMessage('Unable to reach Instagram API directly. Local settings retained.');
      setTimeout(() => setSyncStatus('IDLE'), 4000);
    } finally {
      setIsSyncing(false);
    }
  };

  // Handle Profile DP Change & Instant Broadcast
  const handleApplyDp = (newUrl: string) => {
    setCustomDpUrl(newUrl);
    const updated: BrandConfig = {
      ...brandConfig,
      instagramProfilePic: newUrl,
    };
    onUpdateBrandConfig(updated);
    
    // Also optionally update avatar for brand posts
    broadcastInstagramUpdate({
      brandConfig: updated,
      type: 'DP_UPDATE',
    });
  };

  // Handle Local Image Upload for DP
  const handleDpFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          handleApplyDp(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Live Follower Delta Simulation (to test live reactive web counters)
  const handleSimulateFollowerDelta = (delta: number) => {
    const currentNum = parseInstagramNumber(followers);
    const updatedNum = Math.max(0, currentNum + delta);
    const formatted = formatInstagramNumber(updatedNum);
    
    setFollowers(formatted);
    const updatedConfig: BrandConfig = {
      ...brandConfig,
      stats: {
        ...brandConfig.stats,
        followers: formatted,
      },
      lastSyncedAt: new Date().toISOString(),
    };
    onUpdateBrandConfig(updatedConfig);
    broadcastInstagramUpdate({
      brandConfig: updatedConfig,
      type: 'METRICS_UPDATE',
    });
  };

  // Save All Instagram Settings
  const handleSaveAllSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedConfig: BrandConfig = {
      ...brandConfig,
      handle,
      instagramUrl,
      instagramProfilePic: customDpUrl,
      instagramBio: bio,
      isVerified,
      autoSyncInstagram: autoSync,
      syncIntervalMinutes: syncInterval,
      lastSyncedAt: new Date().toISOString(),
      stats: {
        ...brandConfig.stats,
        followers,
        following,
        posts: postsCount,
        engagementRate,
        monthlyReach,
      },
    };

    onUpdateBrandConfig(updatedConfig);
    broadcastInstagramUpdate({
      brandConfig: updatedConfig,
      type: 'PROFILE_SYNC',
    });

    setSyncStatus('SUCCESS');
    setStatusMessage('Instagram profile & web live data updated successfully!');
    setTimeout(() => setSyncStatus('IDLE'), 3500);
  };

  // Publish New Live Instagram Post
  const handleCreateNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostImageUrl.trim()) return;

    const newPost: InstagramPost = {
      id: `ig-live-${Date.now()}`,
      type: newPostType,
      handle: handle || brandConfig.handle,
      avatar: customDpUrl || brandConfig.instagramProfilePic || CURATED_BRAND_AVATARS[0].url,
      isVerified: isVerified ?? true,
      images: [newPostImageUrl.trim()],
      likes: Math.floor(Math.random() * 400) + 120,
      commentsCount: 3,
      comments: [
        {
          id: `c-live-1`,
          user: 'street_vibe_collective',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
          text: 'This drop goes crazy 🔥 Need this piece immediately!',
          timeAgo: 'Just now',
          likes: 8,
          isVerified: true
        }
      ],
      caption: newPostCaption.trim() || `${brandConfig.name} Live Drop. Engineered for your era. #FEATOUS #STREETWEAR`,
      tags: ['#FEATOUS', '#LIVEDROP', '#NEWERA'],
      location: 'Tokyo, Japan // Digital Flagship',
      timestamp: 'Just now',
      taggedProductIds: newPostTaggedProduct ? [newPostTaggedProduct] : undefined,
    };

    const updatedPosts = [newPost, ...instagramPosts];
    onUpdateInstagramPosts(updatedPosts);

    // Increment posts counter
    const currentPostsNum = parseInt(postsCount, 10) || 348;
    const updatedPostsCount = (currentPostsNum + 1).toString();
    setPostsCount(updatedPostsCount);

    const updatedBrand: BrandConfig = {
      ...brandConfig,
      stats: {
        ...brandConfig.stats,
        posts: updatedPostsCount,
      },
    };
    onUpdateBrandConfig(updatedBrand);

    broadcastInstagramUpdate({
      brandConfig: updatedBrand,
      instagramPosts: updatedPosts,
      type: 'POST_UPDATE',
    });

    // Reset Form
    setNewPostImageUrl('');
    setNewPostCaption('');
    setNewPostTaggedProduct('');
    setShowNewPostModal(false);

    setSyncStatus('SUCCESS');
    setStatusMessage('New Instagram post broadcast live to the website feed!');
    setTimeout(() => setSyncStatus('IDLE'), 3500);
  };

  const copyInstagramUrl = () => {
    navigator.clipboard.writeText(instagramUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Real-Time Control & Status Ribbon */}
      <div className="bg-[#151515] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[1.5px] shadow-lg flex items-center justify-center">
                <div className="w-full h-full bg-[#151515] rounded-[10px] flex items-center justify-center text-white">
                  <Instagram size={16} />
                </div>
              </div>
              <span className="text-xs font-mono-code tracking-[0.25em] text-pink-400 uppercase font-semibold">
                INSTAGRAM REALTIME LIVE SYNC ENGINE
              </span>
              <span className="flex items-center space-x-1 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-mono-code font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE ACTIVE</span>
              </span>
            </div>

            <h2 className="font-editorial-serif text-2xl sm:text-3xl text-white uppercase tracking-tight">
              LIVE INSTAGRAM ACCOUNT & PROFILE DP
            </h2>
            <p className="text-xs font-mono-code text-[#888] max-w-2xl leading-relaxed">
              Show real-time Instagram followers, update your brand Profile Display Picture (DP) instantly across all sections of the website, and broadcast new posts with one click.
            </p>
          </div>

          {/* Sync Trigger Action */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleLiveSyncNow}
              disabled={isSyncing}
              className="px-6 py-3.5 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-semibold rounded-2xl text-xs font-mono-code uppercase tracking-wider flex items-center space-x-2.5 shadow-xl shadow-rose-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              <RefreshCw size={15} className={isSyncing ? 'animate-spin' : ''} />
              <span>{isSyncing ? 'SYNCING INSTAGRAM...' : 'SYNC LIVE WITH INSTA'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowNewPostModal(true)}
              className="px-5 py-3.5 bg-white text-black hover:bg-[#E5E5E5] font-semibold rounded-2xl text-xs font-mono-code uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-all"
            >
              <Plus size={15} />
              <span>BROADCAST NEW POST</span>
            </button>
          </div>
        </div>

        {/* Live Notification Bar */}
        {syncStatus !== 'IDLE' && (
          <div
            className={`p-3.5 rounded-xl text-xs font-mono-code flex items-center space-x-2 border animate-in slide-in-from-top-2 ${
              syncStatus === 'SYNCING'
                ? 'bg-blue-950/40 border-blue-800/40 text-blue-300'
                : syncStatus === 'SUCCESS'
                ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300'
                : 'bg-amber-950/40 border-amber-800/40 text-amber-300'
            }`}
          >
            {syncStatus === 'SYNCING' && <RefreshCw size={14} className="animate-spin text-blue-400 shrink-0" />}
            {syncStatus === 'SUCCESS' && <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />}
            {syncStatus === 'ERROR' && <AlertCircle size={14} className="text-amber-400 shrink-0" />}
            <span>{statusMessage}</span>
          </div>
        )}
      </div>

      {/* SECTION 1: INSTAGRAM PROFILE DISPLAY PICTURE (DP) STUDIO */}
      <div className="bg-[#151515] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#222]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#202020] rounded-xl text-pink-400">
              <UserCheck size={20} />
            </div>
            <div>
              <h3 className="font-editorial-serif text-xl text-white uppercase tracking-wider">
                REALTIME INSTAGRAM PROFILE DP (DISPLAY PICTURE)
              </h3>
              <p className="text-[11px] font-mono-code text-[#888]">
                Changes here immediately reflect on the Instagram bento box, feed avatars, and social banners on the web.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono-code text-[#777] uppercase hidden sm:inline">
            LIVE WEB PROPAGATION ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live DP Preview */}
          <div className="lg:col-span-4 flex flex-col items-center p-6 bg-[#101010] border border-[#222] rounded-2xl text-center space-y-4">
            <span className="text-[10px] font-mono-code tracking-[0.2em] text-[#888] uppercase">
              ACTIVE WEB DISPLAY PICTURE
            </span>

            {/* Glowing Gradient Instagram Ring Avatar */}
            <div className="relative">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[3px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shadow-2xl shadow-rose-500/20">
                <div className="w-full h-full rounded-full bg-black p-[3px] overflow-hidden">
                  <img
                    src={customDpUrl || brandConfig.instagramProfilePic || CURATED_BRAND_AVATARS[0].url}
                    alt="Active Instagram DP"
                    className="w-full h-full object-cover rounded-full select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {isVerified && (
                <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-1.5 border-2 border-black shadow-lg">
                  <CheckCircle2 size={16} className="text-white" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1.5">
                <span className="font-editorial-serif text-lg font-bold text-white tracking-wider">
                  {handle}
                </span>
                {isVerified && <CheckCircle2 size={14} className="text-blue-400" />}
              </div>
              <p className="text-[11px] font-mono-code text-[#888] line-clamp-2 px-2">
                {bio}
              </p>
            </div>

            <div className="w-full pt-2 flex items-center justify-center space-x-4 text-xs font-mono-code border-t border-[#222]">
              <div>
                <span className="font-bold text-white">{postsCount}</span>{' '}
                <span className="text-[#888]">posts</span>
              </div>
              <div>
                <span className="font-bold text-white">{followers}</span>{' '}
                <span className="text-[#888]">followers</span>
              </div>
              <div>
                <span className="font-bold text-white">{following}</span>{' '}
                <span className="text-[#888]">following</span>
              </div>
            </div>
          </div>

          {/* Right Column: DP Uploader & Gallery */}
          <div className="lg:col-span-8 space-y-6">
            {/* Custom URL Input */}
            <div className="space-y-3">
              <label className="text-xs font-mono-code uppercase tracking-wider text-[#ccc] block">
                PASTE PROFILE DP IMAGE LINK (URL)
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="url"
                  value={customDpUrl}
                  onChange={(e) => setCustomDpUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or https://..."
                  className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-4 py-3 text-xs font-mono-code text-[#E5E5E5] placeholder-[#555] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => handleApplyDp(customDpUrl)}
                  className="w-full sm:w-auto px-5 py-3 bg-white text-black hover:bg-[#E5E5E5] font-semibold rounded-xl text-xs font-mono-code uppercase tracking-wider shrink-0 transition-all shadow-md"
                >
                  APPLY DP
                </button>
              </div>
            </div>

            {/* Direct Image File Upload */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#101010] border border-[#222] rounded-2xl gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#1a1a1a] rounded-xl text-[#aaa]">
                  <Upload size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono-code text-white uppercase block font-semibold">
                    UPLOAD PHOTO FROM COMPUTER
                  </span>
                  <span className="text-[10px] font-mono-code text-[#777]">
                    Supports PNG, JPG, WEBP formats (automatically cropped to 1:1 circle)
                  </span>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleDpFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#202020] hover:bg-white hover:text-black border border-[#333] text-white rounded-xl text-xs font-mono-code uppercase tracking-wider transition-all"
              >
                SELECT FILE
              </button>
            </div>

            {/* Curated Brand Avatars 1-Click Select */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#ccc]">
                  OR CHOOSE CURATED BRAND DP PRESETS:
                </span>
                <span className="text-[10px] font-mono-code text-[#777]">1-Click Switch</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {CURATED_BRAND_AVATARS.map((avatar) => {
                  const isSelected = customDpUrl === avatar.url;
                  return (
                    <div
                      key={avatar.id}
                      onClick={() => handleApplyDp(avatar.url)}
                      className={`p-2.5 bg-[#101010] border rounded-2xl cursor-pointer transition-all flex flex-col items-center text-center space-y-2 group ${
                        isSelected
                          ? 'border-rose-500 bg-rose-950/20 shadow-lg'
                          : 'border-[#222] hover:border-[#444]'
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#333] group-hover:scale-105 transition-transform">
                        <img
                          src={avatar.url}
                          alt={avatar.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-rose-500/40 flex items-center justify-center">
                            <Check size={16} className="text-white" />
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-mono-code text-[#ccc] line-clamp-1 leading-tight">
                        {avatar.vibe}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: LIVE ACCOUNT STATS, FOLLOWERS, & ENGAGEMENT METRICS */}
      <form onSubmit={handleSaveAllSettings} className="bg-[#151515] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#222]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#202020] rounded-xl text-emerald-400">
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 className="font-editorial-serif text-xl text-white uppercase tracking-wider">
                REALTIME ACCOUNT METRICS & LIVE COUNTERS
              </h3>
              <p className="text-[11px] font-mono-code text-[#888]">
                Adjust live follower count, bio copy, verified checkmark, and engagement rate metrics.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-white text-black hover:bg-[#E5E5E5] font-semibold rounded-xl text-xs font-mono-code uppercase tracking-wider flex items-center space-x-2 shadow-xl transition-all"
          >
            <Zap size={14} />
            <span>SAVE & BROADCAST</span>
          </button>
        </div>

        {/* Quick Follower Ticker Test Bar */}
        <div className="p-4 bg-[#101010] border border-[#222] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono-code uppercase text-white font-semibold block">
              QUICK TEST REALTIME FOLLOWER GROWTH:
            </span>
            <span className="text-[10px] font-mono-code text-[#777]">
              Click to simulate live follower increments across open web pages instantly
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleSimulateFollowerDelta(1)}
              className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-white hover:text-black border border-[#2a2a2a] rounded-xl text-[11px] font-mono-code text-white transition-colors"
            >
              +1 Follower
            </button>
            <button
              type="button"
              onClick={() => handleSimulateFollowerDelta(50)}
              className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-white hover:text-black border border-[#2a2a2a] rounded-xl text-[11px] font-mono-code text-white transition-colors"
            >
              +50 Followers
            </button>
            <button
              type="button"
              onClick={() => handleSimulateFollowerDelta(1000)}
              className="px-3 py-1.5 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-700/40 rounded-xl text-[11px] font-mono-code text-emerald-300 transition-colors"
            >
              +1K Growth
            </button>
          </div>
        </div>

        {/* Main Metrics Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Handle */}
          <div>
            <label className="text-xs font-mono-code uppercase tracking-wider text-[#aaa] block mb-1.5">
              INSTAGRAM HANDLE *
            </label>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="@FEATOUS"
              className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white transition-colors"
            />
          </div>

          {/* Follower Count */}
          <div>
            <label className="text-xs font-mono-code uppercase tracking-wider text-[#aaa] block mb-1.5 flex items-center justify-between">
              <span>FOLLOWERS COUNT *</span>
              <span className="text-[10px] text-[#777]">e.g. 284K or 1.2M</span>
            </label>
            <input
              type="text"
              value={followers}
              onChange={(e) => setFollowers(e.target.value)}
              placeholder="284K"
              className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white transition-colors"
            />
          </div>

          {/* Following Count */}
          <div>
            <label className="text-xs font-mono-code uppercase tracking-wider text-[#aaa] block mb-1.5">
              FOLLOWING COUNT
            </label>
            <input
              type="text"
              value={following}
              onChange={(e) => setFollowing(e.target.value)}
              placeholder="42"
              className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white transition-colors"
            />
          </div>

          {/* Total Posts Count */}
          <div>
            <label className="text-xs font-mono-code uppercase tracking-wider text-[#aaa] block mb-1.5">
              TOTAL POSTS COUNT
            </label>
            <input
              type="text"
              value={postsCount}
              onChange={(e) => setPostsCount(e.target.value)}
              placeholder="348"
              className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white transition-colors"
            />
          </div>
        </div>

        {/* Secondary Grid: Account URL, Verified Badge, Engagement Rate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {/* Instagram URL with test button */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono-code uppercase tracking-wider text-[#aaa]">
                INSTAGRAM ACCOUNT URL
              </label>
              <button
                type="button"
                onClick={copyInstagramUrl}
                className="text-[10px] font-mono-code text-[#888] hover:text-white flex items-center space-x-1"
              >
                {copiedLink ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/featous"
                className="flex-1 bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white transition-colors"
              />
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] text-[#aaa] hover:text-white rounded-xl transition-colors shrink-0"
                title="Open Instagram Link in New Tab"
              >
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Engagement Rate & Monthly Reach */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono-code uppercase tracking-wider text-[#aaa] block mb-1.5">
                ENGAGEMENT RATE
              </label>
              <input
                type="text"
                value={engagementRate}
                onChange={(e) => setEngagementRate(e.target.value)}
                placeholder="5.2%"
                className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-mono-code uppercase tracking-wider text-[#aaa] block mb-1.5">
                MONTHLY REACH
              </label>
              <input
                type="text"
                value={monthlyReach}
                onChange={(e) => setMonthlyReach(e.target.value)}
                placeholder="1.4M"
                className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white transition-colors"
              />
            </div>
          </div>

          {/* Verified Checkmark & Auto-Sync Toggle */}
          <div className="flex items-center space-x-4 p-3 bg-[#101010] border border-[#222] rounded-xl self-end">
            <label className="flex items-center space-x-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
                className="w-4 h-4 rounded bg-black border-[#444] text-rose-500 focus:ring-0"
              />
              <div>
                <span className="text-xs font-mono-code text-white uppercase block font-semibold">
                  VERIFIED BADGE
                </span>
                <span className="text-[10px] font-mono-code text-[#777]">
                  Show blue check on web
                </span>
              </div>
            </label>

            <div className="h-8 w-[1px] bg-[#222]" />

            <label className="flex items-center space-x-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
                className="w-4 h-4 rounded bg-black border-[#444] text-rose-500 focus:ring-0"
              />
              <div>
                <span className="text-xs font-mono-code text-white uppercase block font-semibold">
                  AUTO-SYNC
                </span>
                <span className="text-[10px] font-mono-code text-[#777]">
                  Realtime polling
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Bio Editor */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono-code uppercase tracking-wider text-[#aaa]">
              OFFICIAL INSTAGRAM BIO (SHOWN ON WEB HERO & INSTAGRAM BENTO)
            </label>
            <span className="text-[10px] font-mono-code text-[#777]">
              {bio.length} / 150 chars
            </span>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={2}
            maxLength={180}
            placeholder="Built for your era. Streetwear • Active • Premium • 90s Retro Archive. Worldwide shipping."
            className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl p-3.5 text-xs font-mono-code text-white transition-colors"
          />
        </div>
      </form>

      {/* SECTION 3: LIVE POSTS & BROADCAST FEED MANAGER */}
      <div className="bg-[#151515] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#202020] rounded-xl text-purple-400">
              <Radio size={20} />
            </div>
            <div>
              <h3 className="font-editorial-serif text-xl text-white uppercase tracking-wider">
                LIVE POSTS & WEB FEED BROADCASTER ({instagramPosts.length} ACTIVE)
              </h3>
              <p className="text-[11px] font-mono-code text-[#888]">
                Every post listed here is displayed live in the 3×3 Instagram Experience Grid on the homepage.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowNewPostModal(true)}
            className="px-5 py-2.5 bg-white text-black hover:bg-[#E5E5E5] font-semibold rounded-xl text-xs font-mono-code uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-all"
          >
            <Plus size={14} />
            <span>ADD & BROADCAST POST</span>
          </button>
        </div>

        {/* Live Grid of Active Instagram Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#101010] border border-[#222] hover:border-[#3a3a3a] rounded-2xl overflow-hidden p-3 space-y-3 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-2">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black">
                  <img
                    src={post.images[0]}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-md text-[9px] font-mono-code uppercase rounded-full text-white border border-white/10">
                    {post.type}
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-emerald-500/90 text-black font-bold text-[9px] font-mono-code uppercase rounded-full">
                    LIVE ON WEB
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <img
                    src={post.avatar || customDpUrl}
                    alt={post.handle}
                    className="w-5 h-5 rounded-full object-cover border border-[#444]"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[11px] font-mono-code text-white font-semibold truncate">
                    {post.handle}
                  </span>
                </div>

                <p className="text-xs font-sans text-[#ccc] line-clamp-2 leading-tight">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono-code text-[#777] pt-1">
                  <span>{post.likes.toLocaleString()} likes</span>
                  <span>{post.commentsCount} comments</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#202020] gap-2">
                <button
                  type="button"
                  onClick={() => {
                    // Quick like boost test
                    const updated = instagramPosts.map((p) =>
                      p.id === post.id ? { ...p, likes: p.likes + 25 } : p
                    );
                    onUpdateInstagramPosts(updated);
                    broadcastInstagramUpdate({
                      instagramPosts: updated,
                      type: 'POST_UPDATE',
                    });
                  }}
                  className="flex-1 py-1 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2a2a2a] text-[#aaa] hover:text-white rounded-lg text-[10px] font-mono-code uppercase transition-colors"
                >
                  +25 Likes
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const filtered = instagramPosts.filter((p) => p.id !== post.id);
                    onUpdateInstagramPosts(filtered);
                    broadcastInstagramUpdate({
                      instagramPosts: filtered,
                      type: 'POST_UPDATE',
                    });
                  }}
                  className="p-1.5 bg-red-950/20 hover:bg-red-950/50 border border-red-900/30 text-red-400 rounded-lg transition-colors"
                  title="Remove from Live Feed"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BROADCAST NEW POST MODAL */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#151515] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-6 my-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#222]">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 rounded-xl text-white">
                  <Instagram size={18} />
                </div>
                <div>
                  <h3 className="font-editorial-serif text-xl text-white uppercase">
                    BROADCAST NEW INSTAGRAM POST
                  </h3>
                  <p className="text-[11px] font-mono-code text-[#888]">
                    Will instantly publish to the 3×3 grid on the live website
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowNewPostModal(false)}
                className="p-2 text-[#777] hover:text-white rounded-full bg-[#202020]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewPost} className="space-y-4">
              {/* Image Input */}
              <ImageLinkInput
                label="POST MEDIA / PHOTO IMAGE LINK *"
                value={newPostImageUrl}
                onChange={setNewPostImageUrl}
                placeholder="https://images.unsplash.com/... or paste image URL"
                required
              />

              {/* Post Type & Product Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                    MEDIA FORMAT
                  </label>
                  <select
                    value={newPostType}
                    onChange={(e) => setNewPostType(e.target.value as 'image' | 'reel' | 'carousel')}
                    className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white focus:outline-none"
                  >
                    <option value="image">Single Photo (1:1)</option>
                    <option value="reel">Reel / Video</option>
                    <option value="carousel">Multi-Image Carousel</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                    TAG A CATALOG PRODUCT (OPTIONAL)
                  </label>
                  <select
                    value={newPostTaggedProduct}
                    onChange={(e) => setNewPostTaggedProduct(e.target.value)}
                    className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white focus:outline-none"
                  >
                    <option value="">-- No Tagged Product --</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.price || '$68'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Caption */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono-code uppercase text-[#888] block">
                  CAPTION & HASHTAGS
                </label>
                <textarea
                  value={newPostCaption}
                  onChange={(e) => setNewPostCaption(e.target.value)}
                  rows={3}
                  placeholder="FEATOUS NEW SEASON CAMPAIGN. Built for your era. #FEATOUS #STREETWEAR"
                  className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl p-3 text-xs font-mono-code text-white transition-colors"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#222]">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#222] text-[#aaa] rounded-xl text-xs font-mono-code uppercase"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-semibold rounded-xl text-xs font-mono-code uppercase tracking-wider transition-all shadow-lg"
                >
                  PUBLISH & BROADCAST NOW
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
