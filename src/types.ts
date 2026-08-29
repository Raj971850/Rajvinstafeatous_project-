export type CollectionCategory = 'ALL' | 'ACTIVE' | 'PREMIUM' | 'RETRO';

export interface BrandConfig {
  name: string;
  handle: string;
  instagramUrl: string;
  tagline: string;
  subheading: string;
  manifestoLead: string;
  manifestoBody: string;
  hashtags: string[];
  stats: {
    posts: string;
    followers: string;
    following: string;
    dropsCompleted: string;
  };
  heroImage: string;
  heroHeadline: string;
  heroBadge: string;
  nextDropTitle: string;
  nextDropSubtitle: string;
  nextDropCountdownText: string;
  retroStoryTitle: string;
  retroStoryBody: string;
  retroPolaroidImage: string;
}

export interface Product {
  id: string;
  name: string;
  collection: 'ACTIVE' | 'PREMIUM' | 'RETRO';
  tagline: string;
  description: string;
  price?: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  fabric: string;
  weightGsm?: string;
  fit: string;
  images: {
    main: string;
    editorial: string;
    detail?: string;
  };
  tags: string[];
  inStock?: boolean;
  dropStatus?: 'LIVE NOW' | 'UPCOMING' | 'ARCHIVE';
  instagramTag?: string;
}

export interface InstagramComment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timeAgo: string;
  likes: number;
  isVerified?: boolean;
}

export interface InstagramPost {
  id: string;
  type: 'image' | 'reel' | 'carousel';
  handle: string;
  avatar: string;
  isVerified: boolean;
  images: string[];
  likes: number;
  commentsCount: number;
  comments: InstagramComment[];
  caption: string;
  tags: string[];
  location?: string;
  timestamp: string;
  audioTrack?: string;
  taggedProductIds?: string[];
  reelDuration?: string;
}

export interface ReelItem {
  id: string;
  title: string;
  creator: string;
  views: string;
  likes: string;
  duration: string;
  thumbnail: string;
  category: 'STYLING' | 'BEHIND THE SCENES' | 'CAMPAIGN' | 'STREET STYLE';
  audioTrack: string;
  taggedProductIds: string[];
  caption: string;
  videoUrl?: string;
  videoType?: 'upload' | 'url' | 'preset';
  voiceAudioUrl?: string;
  voiceTitle?: string;
  voiceEnabled?: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  season: string;
  subtitle: string;
  tagline: string;
  description: string;
  heroImage: string;
  secondaryImages: string[];
  palette: string[];
  vibe: string;
  location: string;
}

export interface CommunityLook {
  id: string;
  userHandle: string;
  avatar: string;
  image: string;
  city: string;
  likes: number;
  tags: string[];
  outfitPieces: string[];
  caption: string;
}
