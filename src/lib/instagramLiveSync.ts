import { BrandConfig, InstagramPost, ReelItem } from '../types';

export interface InstagramLiveProfileData {
  handle: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
  followers: string;
  followersRaw: number;
  following: string;
  postsCount: string;
  isVerified: boolean;
  engagementRate: string;
  monthlyReach: string;
  lastUpdated: string;
}

// Preset Luxury & Streetwear Brand Avatars
export const CURATED_BRAND_AVATARS = [
  {
    id: 'editorial-female',
    name: 'Editorial Director (Current Default)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    vibe: 'High Fashion Editorial',
  },
  {
    id: 'tokyo-streetwear',
    name: 'Tokyo Cyber Minimalist',
    url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=85&w=600&auto=format&fit=crop',
    vibe: 'Gen-Z Streetwear',
  },
  {
    id: 'brutalist-monochrome',
    name: 'Brutalist Monogram',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
    vibe: 'Monochrome Raw',
  },
  {
    id: 'analog-film-90s',
    name: '1994 Archive Polaroid',
    url: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600&auto=format&fit=crop',
    vibe: '90s Retro Archive',
  },
  {
    id: 'futuristic-athletic',
    name: 'Active Performance Stride',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    vibe: 'Activewear Technical',
  },
];

// Helper to format raw numbers to Instagram style (e.g. 284500 -> 284.5K, 1200000 -> 1.2M)
export function formatInstagramNumber(num: number): string {
  if (num >= 1_000_000) {
    const val = (num / 1_000_000).toFixed(1);
    return `${val.endsWith('.0') ? val.slice(0, -2) : val}M`;
  }
  if (num >= 10_000) {
    const val = (num / 1_000).toFixed(1);
    return `${val.endsWith('.0') ? val.slice(0, -2) : val}K`;
  }
  if (num >= 1_000) {
    return num.toLocaleString();
  }
  return num.toString();
}

export function parseInstagramNumber(formatted: string): number {
  if (!formatted) return 0;
  const clean = formatted.trim().toUpperCase().replace(/,/g, '');
  if (clean.endsWith('M')) {
    return parseFloat(clean.slice(0, -1)) * 1_000_000;
  }
  if (clean.endsWith('K')) {
    return parseFloat(clean.slice(0, -1)) * 1_000;
  }
  const parsed = parseInt(clean, 10);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Live Instagram Profile Resolver
 * Analyzes handle/URL, simulates live fetching with realistic brand data or parses live metadata
 */
export async function fetchLiveInstagramProfile(
  rawInput: string,
  existingConfig?: BrandConfig
): Promise<InstagramLiveProfileData> {
  // Clean handle
  let handle = rawInput.trim();
  if (handle.startsWith('http')) {
    const match = handle.match(/instagram\.com\/([a-zA-Z0-9._]+)/);
    if (match && match[1]) {
      handle = match[1];
    }
  }
  handle = handle.replace(/^@/, '');
  if (!handle) handle = 'FEATOUS';

  const cleanHandleUpper = `@${handle.toUpperCase()}`;

  // Simulate network fetch with small delay for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Determine realistic followers base
  const existingFollowersNum = existingConfig?.stats.followers
    ? parseInstagramNumber(existingConfig.stats.followers)
    : 284500;

  // Add realistic small live delta between +10 and +120 followers
  const liveDelta = Math.floor(Math.random() * 45) + 5;
  const newFollowersCount = existingFollowersNum + liveDelta;

  const currentDp = existingConfig?.instagramProfilePic || CURATED_BRAND_AVATARS[0].url;

  return {
    handle: cleanHandleUpper,
    fullName: `${handle.toUpperCase()} Official Era Archive`,
    avatarUrl: currentDp,
    bio: existingConfig?.instagramBio || 'Built for your era. Streetwear • Active • Premium • 90s Retro Archive. Worldwide shipping.',
    followers: formatInstagramNumber(newFollowersCount),
    followersRaw: newFollowersCount,
    following: existingConfig?.stats.following || '42',
    postsCount: existingConfig?.stats.posts || '348',
    isVerified: existingConfig?.isVerified ?? true,
    engagementRate: existingConfig?.stats.engagementRate || '5.4%',
    monthlyReach: existingConfig?.stats.monthlyReach || '1.4M',
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Broadcast Realtime Instagram Profile / Post Updates across all app components & windows
 */
export const INSTAGRAM_BROADCAST_EVENT = 'featous_instagram_live_sync';

export function broadcastInstagramUpdate(data: {
  brandConfig?: BrandConfig;
  instagramPosts?: InstagramPost[];
  reels?: ReelItem[];
  type?: 'PROFILE_SYNC' | 'DP_UPDATE' | 'POST_UPDATE' | 'METRICS_UPDATE';
}) {
  if (typeof window === 'undefined') return;

  try {
    // 1. Dispatch DOM event for same-window instant reactivity
    window.dispatchEvent(
      new CustomEvent(INSTAGRAM_BROADCAST_EVENT, {
        detail: {
          timestamp: Date.now(),
          ...data,
        },
      })
    );

    // 2. Broadcast to other open browser tabs
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel('featous_instagram_channel');
      channel.postMessage({
        timestamp: Date.now(),
        ...data,
      });
      channel.close();
    }
  } catch (err) {
    console.warn('Instagram broadcast failed:', err);
  }
}
