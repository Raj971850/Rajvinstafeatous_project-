import React, { useState } from 'react';
import {
  X,
  Sliders,
  Sparkles,
  ShoppingBag,
  Instagram,
  Video,
  Layers,
  Users,
  Database,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Save,
  RotateCcw,
  Download,
  Upload,
  Check,
  Eye,
  Search,
  CheckCircle2,
  Copy,
  Flame,
  ArrowRight,
  Mic,
  Film,
  Radio
} from 'lucide-react';
import { Product, InstagramPost, ReelItem, Campaign, CommunityLook, BrandConfig, CollectionCategory } from '../../types';
import { ImageLinkInput } from './ImageLinkInput';
import { InstagramLinkInput } from './InstagramLinkInput';
import { VideoVoiceStudio } from './VideoVoiceStudio';
import { SupabaseSyncManager } from './SupabaseSyncManager';
import { InstagramRealtimeStudio } from './InstagramRealtimeStudio';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  brandConfig: BrandConfig;
  onUpdateBrandConfig: (config: BrandConfig) => void;
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  instagramPosts: InstagramPost[];
  onUpdateInstagramPosts: (posts: InstagramPost[]) => void;
  reels: ReelItem[];
  onUpdateReels: (reels: ReelItem[]) => void;
  campaigns: Campaign[];
  onUpdateCampaigns: (campaigns: Campaign[]) => void;
  communityLooks: CommunityLook[];
  onUpdateCommunityLooks: (looks: CommunityLook[]) => void;
  onResetToDefaults: () => void;
  onOpenProductModal?: (product: Product) => void;
}

type AdminTab =
  | 'OVERVIEW'
  | 'INSTAGRAM_LIVE'
  | 'BRAND'
  | 'HERO_DROPS'
  | 'PRODUCTS'
  | 'INSTAGRAM'
  | 'REELS'
  | 'CAMPAIGNS'
  | 'COMMUNITY'
  | 'SUPABASE'
  | 'DATA';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  brandConfig,
  onUpdateBrandConfig,
  products,
  onUpdateProducts,
  instagramPosts,
  onUpdateInstagramPosts,
  reels,
  onUpdateReels,
  campaigns,
  onUpdateCampaigns,
  communityLooks,
  onUpdateCommunityLooks,
  onResetToDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('OVERVIEW');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Product Editing state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<'ALL' | 'ACTIVE' | 'PREMIUM' | 'RETRO'>('ALL');

  // Instagram Post Editing state
  const [editingPost, setEditingPost] = useState<InstagramPost | null>(null);

  // Reel Editing state
  const [editingReel, setEditingReel] = useState<ReelItem | null>(null);

  // Campaign Editing state
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  // Community Look Editing state
  const [editingLook, setEditingLook] = useState<CommunityLook | null>(null);

  // Reset confirmation modal
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // JSON view/editor
  const [rawJsonText, setRawJsonText] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // PRODUCT CRUD
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (products.some((p) => p.id === editingProduct.id)) {
      onUpdateProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
      showToast(`Updated product "${editingProduct.name}"`);
    } else {
      onUpdateProducts([editingProduct, ...products]);
      showToast(`Created new product "${editingProduct.name}"`);
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      onUpdateProducts(products.filter((p) => p.id !== id));
      showToast('Product deleted');
    }
  };

  const handleDuplicateProduct = (product: Product) => {
    const duplicate: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      name: `${product.name} (COPY)`,
    };
    onUpdateProducts([duplicate, ...products]);
    showToast(`Duplicated ${product.name}`);
  };

  const createBlankProduct = (): Product => ({
    id: `prod-${Date.now()}`,
    name: 'NEW FEATOUS SILHOUETTE',
    collection: 'ACTIVE',
    tagline: 'BUILT FOR MODERN MOVEMENT.',
    description: 'Constructed from premium heavyweight textiles with reinforced seam integrity and architectural silhouette drape.',
    price: '$85',
    colors: [
      { name: 'Onyx Black', hex: '#0a0a0c' },
      { name: 'Washed Charcoal', hex: '#262629' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: '100% French Terry Heavyweight Cotton',
    weightGsm: '320 GSM',
    fit: 'Signature Boxy Relaxed Cut',
    images: {
      main: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop',
      editorial: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1200&auto=format&fit=crop'
    },
    tags: ['320 GSM', 'Carbon Wash', 'Signature Drop'],
    inStock: true,
    dropStatus: 'LIVE NOW',
    instagramTag: '#FEATOUS'
  });

  // INSTAGRAM POST CRUD
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    if (instagramPosts.some((p) => p.id === editingPost.id)) {
      onUpdateInstagramPosts(instagramPosts.map((p) => (p.id === editingPost.id ? editingPost : p)));
      showToast('Updated Instagram Post');
    } else {
      onUpdateInstagramPosts([editingPost, ...instagramPosts]);
      showToast('Created new Instagram Post');
    }
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Delete this Instagram post from feed?')) {
      onUpdateInstagramPosts(instagramPosts.filter((p) => p.id !== id));
      showToast('Post deleted');
    }
  };

  const createBlankPost = (): InstagramPost => ({
    id: `ig-${Date.now()}`,
    type: 'image',
    handle: brandConfig.handle.replace('@', '').toLowerCase(),
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    isVerified: true,
    images: ['https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop'],
    likes: 12500,
    commentsCount: 180,
    comments: [
      {
        id: `c-${Date.now()}`,
        user: 'streetwear.insider',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        text: 'Cleanest silhouette of the season! 🔥',
        timeAgo: '1h',
        likes: 14,
        isVerified: true
      }
    ],
    caption: 'FEATOUS CAMPAIGN // Architectural proportions built for the new era.',
    tags: ['#FEATOUS', '#StreetwearSociety', '#GenZStyle'],
    location: 'Shibuya, Tokyo',
    timestamp: 'JUST NOW',
    audioTrack: 'FEATOUS SOUNDS • Original Audio',
    taggedProductIds: products.slice(0, 2).map((p) => p.id)
  });

  // REEL CRUD
  const handleSaveReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReel) return;
    if (reels.some((r) => r.id === editingReel.id)) {
      onUpdateReels(reels.map((r) => (r.id === editingReel.id ? editingReel : r)));
      showToast('Updated Reel');
    } else {
      onUpdateReels([editingReel, ...reels]);
      showToast('Created new Reel');
    }
    setEditingReel(null);
  };

  const handleDeleteReel = (id: string) => {
    if (confirm('Delete this Reel?')) {
      onUpdateReels(reels.filter((r) => r.id !== id));
      showToast('Reel deleted');
    }
  };

  const createBlankReel = (): ReelItem => ({
    id: `reel-${Date.now()}`,
    title: 'STYLING FEATOUS SILHOUETTES',
    creator: brandConfig.handle,
    views: '450K',
    likes: '52K',
    duration: '0:30',
    thumbnail: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop',
    category: 'STYLING',
    audioTrack: 'Original Sound — FEATOUS Tokyo Night Drive',
    taggedProductIds: products.slice(0, 1).map((p) => p.id),
    caption: 'Lookbook styling session on analog 35mm film.'
  });

  // CAMPAIGN CRUD
  const handleSaveCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampaign) return;
    if (campaigns.some((c) => c.id === editingCampaign.id)) {
      onUpdateCampaigns(campaigns.map((c) => (c.id === editingCampaign.id ? editingCampaign : c)));
      showToast('Updated Campaign');
    } else {
      onUpdateCampaigns([editingCampaign, ...campaigns]);
      showToast('Created new Campaign');
    }
    setEditingCampaign(null);
  };

  const handleDeleteCampaign = (id: string) => {
    if (confirm('Delete this Campaign?')) {
      onUpdateCampaigns(campaigns.filter((c) => c.id !== id));
      showToast('Campaign deleted');
    }
  };

  // COMMUNITY LOOK CRUD
  const handleSaveLook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLook) return;
    if (communityLooks.some((l) => l.id === editingLook.id)) {
      onUpdateCommunityLooks(communityLooks.map((l) => (l.id === editingLook.id ? editingLook : l)));
      showToast('Updated Community Look');
    } else {
      onUpdateCommunityLooks([editingLook, ...communityLooks]);
      showToast('Created new Community Look');
    }
    setEditingLook(null);
  };

  const handleDeleteLook = (id: string) => {
    if (confirm('Delete this Community Look?')) {
      onUpdateCommunityLooks(communityLooks.filter((l) => l.id !== id));
      showToast('Community look deleted');
    }
  };

  // BACKUP / EXPORT / IMPORT
  const handleExportJson = () => {
    const fullBackup = {
      brandConfig,
      products,
      instagramPosts,
      reels,
      campaigns,
      communityLooks,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `featous-brand-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported backup file successfully!');
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.brandConfig) onUpdateBrandConfig(parsed.brandConfig);
        if (parsed.products) onUpdateProducts(parsed.products);
        if (parsed.instagramPosts) onUpdateInstagramPosts(parsed.instagramPosts);
        if (parsed.reels) onUpdateReels(parsed.reels);
        if (parsed.campaigns) onUpdateCampaigns(parsed.campaigns);
        if (parsed.communityLooks) onUpdateCommunityLooks(parsed.communityLooks);
        showToast('Backup imported successfully!');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const navTabs: { id: AdminTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'OVERVIEW', label: 'OVERVIEW', icon: <Flame size={15} /> },
    { id: 'INSTAGRAM_LIVE', label: 'INSTA LIVE & DP', icon: <Instagram size={15} className="text-pink-400" /> },
    { id: 'BRAND', label: 'BRAND CONFIG', icon: <Sliders size={15} /> },
    { id: 'HERO_DROPS', label: 'HERO & DROPS', icon: <Flame size={15} /> },
    { id: 'PRODUCTS', label: 'PRODUCTS CATALOG', icon: <ShoppingBag size={15} />, count: products.length },
    { id: 'INSTAGRAM', label: 'INSTAGRAM POSTS', icon: <Layers size={15} />, count: instagramPosts.length },
    { id: 'REELS', label: 'REELS & VIDEO', icon: <Video size={15} />, count: reels.length },
    { id: 'CAMPAIGNS', label: 'CAMPAIGNS', icon: <Sparkles size={15} />, count: campaigns.length },
    { id: 'COMMUNITY', label: 'COMMUNITY UGC', icon: <Users size={15} />, count: communityLooks.length },
    { id: 'SUPABASE', label: 'SUPABASE CLOUD', icon: <Database size={15} /> },
    { id: 'DATA', label: 'DATA & BACKUP', icon: <RotateCcw size={15} /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex flex-col text-[#E5E5E5] overflow-hidden animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[120] bg-white text-black font-mono-code text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-white/20 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Luxury Admin Bar */}
      <header className="w-full bg-[#151515] border-b border-[#222] px-4 sm:px-8 py-3.5 flex items-center justify-between shrink-0 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-cinzel text-xl font-extrabold tracking-[0.2em] text-white">
              {brandConfig.name}
            </span>
            <span className="px-2.5 py-0.5 bg-[#222] text-[10px] font-mono-code rounded-full text-emerald-400 border border-emerald-500/20 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>ADMIN CONTROL SUITE</span>
            </span>
          </div>

          <span className="hidden lg:inline text-[11px] font-mono-code text-[#777] border-l border-[#2a2a2a] pl-4">
            Live Changes Auto-Persist to Local Storage
          </span>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={handleExportJson}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#222] border border-[#2a2a2a] text-[#aaa] hover:text-white rounded-xl text-xs font-mono-code uppercase transition-colors"
            title="Download JSON Backup"
          >
            <Download size={13} />
            <span>EXPORT</span>
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 hover:text-red-300 rounded-xl text-xs font-mono-code uppercase transition-colors"
            title="Reset Everything to Default"
          >
            <RotateCcw size={13} />
            <span>RESET</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-black hover:bg-[#E5E5E5] font-semibold rounded-xl text-xs font-mono-code uppercase tracking-wider transition-all flex items-center space-x-1.5 shadow-lg"
          >
            <Eye size={14} />
            <span>EXIT / PREVIEW WEBSITE</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 bg-[#1A1A1A] hover:bg-[#222] text-[#888] hover:text-white rounded-xl border border-[#2a2a2a] transition-colors"
            aria-label="Close Admin Panel"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar Navigation (Bento Tab Column) */}
        <aside className="w-full md:w-64 lg:w-72 bg-[#101010] border-r border-[#222] p-4 flex md:flex-col justify-start space-y-1 overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0">
          <div className="hidden md:block pb-3 mb-2 border-b border-[#222] text-[10px] font-mono-code uppercase tracking-[0.25em] text-[#666] px-3">
            WORKSPACE MODULES
          </div>

          <div className="flex md:flex-col gap-1 w-full">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingProduct(null);
                  setEditingPost(null);
                  setEditingReel(null);
                  setEditingCampaign(null);
                  setEditingLook(null);
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono-code uppercase tracking-wider transition-all text-left whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-[#888] hover:text-[#E5E5E5] hover:bg-[#181818]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      activeTab === tab.id ? 'bg-black text-white' : 'bg-[#202020] text-[#888]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Instagram Link Widget at sidebar bottom */}
          <div className="hidden md:block mt-auto pt-4 border-t border-[#222]">
            <div className="p-3 bg-[#151515] border border-[#222] rounded-xl space-y-2">
              <span className="text-[9px] font-mono-code text-[#777] uppercase block">
                ACTIVE INSTAGRAM LINK:
              </span>
              <a
                href={brandConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono-code text-pink-300 hover:text-white flex items-center space-x-1 truncate"
              >
                <Instagram size={12} className="shrink-0" />
                <span className="truncate">{brandConfig.instagramUrl}</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#0A0A0A]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-200">
              {/* Header */}
              <div>
                <span className="text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase block mb-1">
                  ADMIN DASHBOARD // SUMMARY
                </span>
                <h2 className="font-editorial-serif text-3xl sm:text-4xl text-white uppercase tracking-tight">
                  FEATOUS WEBSITE MANAGEMENT
                </h2>
                <p className="text-xs font-mono-code text-[#888] pt-1">
                  Change copy, paste image links, update Instagram account links, manage products, and customize live drops.
                </p>
              </div>

              {/* Bento Counter Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div
                  onClick={() => setActiveTab('PRODUCTS')}
                  className="p-4 bg-[#151515] border border-[#222] hover:border-[#444] rounded-2xl cursor-pointer transition-all shadow-lg"
                >
                  <ShoppingBag size={18} className="text-[#888] mb-2" />
                  <div className="font-mono-code text-2xl font-bold text-white">{products.length}</div>
                  <div className="text-[10px] font-mono-code text-[#888] uppercase">PRODUCTS</div>
                </div>

                <div
                  onClick={() => setActiveTab('INSTAGRAM')}
                  className="p-4 bg-[#151515] border border-[#222] hover:border-[#444] rounded-2xl cursor-pointer transition-all shadow-lg"
                >
                  <Layers size={18} className="text-pink-400 mb-2" />
                  <div className="font-mono-code text-2xl font-bold text-white">{instagramPosts.length}</div>
                  <div className="text-[10px] font-mono-code text-[#888] uppercase">IG POSTS</div>
                </div>

                <div
                  onClick={() => setActiveTab('REELS')}
                  className="p-4 bg-[#151515] border border-[#222] hover:border-[#444] rounded-2xl cursor-pointer transition-all shadow-lg"
                >
                  <Video size={18} className="text-purple-400 mb-2" />
                  <div className="font-mono-code text-2xl font-bold text-white">{reels.length}</div>
                  <div className="text-[10px] font-mono-code text-[#888] uppercase">REELS</div>
                </div>

                <div
                  onClick={() => setActiveTab('CAMPAIGNS')}
                  className="p-4 bg-[#151515] border border-[#222] hover:border-[#444] rounded-2xl cursor-pointer transition-all shadow-lg"
                >
                  <Sparkles size={18} className="text-amber-400 mb-2" />
                  <div className="font-mono-code text-2xl font-bold text-white">{campaigns.length}</div>
                  <div className="text-[10px] font-mono-code text-[#888] uppercase">CAMPAIGNS</div>
                </div>

                <div
                  onClick={() => setActiveTab('COMMUNITY')}
                  className="p-4 bg-[#151515] border border-[#222] hover:border-[#444] rounded-2xl cursor-pointer transition-all shadow-lg"
                >
                  <Users size={18} className="text-blue-400 mb-2" />
                  <div className="font-mono-code text-2xl font-bold text-white">{communityLooks.length}</div>
                  <div className="text-[10px] font-mono-code text-[#888] uppercase">UGC LOOKS</div>
                </div>

                <div
                  onClick={() => setActiveTab('INSTAGRAM_LIVE')}
                  className="p-4 bg-[#151515] border border-pink-500/30 hover:border-pink-500/60 rounded-2xl cursor-pointer transition-all shadow-lg group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Instagram size={18} className="text-pink-400" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="font-mono-code text-2xl font-bold text-white">{brandConfig.stats.followers}</div>
                  <div className="text-[10px] font-mono-code text-pink-400 uppercase font-semibold">LIVE IG & DP</div>
                </div>
              </div>

              {/* Instagram Realtime Banner */}
              <div className="p-6 bg-gradient-to-r from-[#181818] via-[#1a141c] to-[#161616] border border-[#2a2a2a] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="relative w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shadow-md shrink-0">
                    <img
                      src={brandConfig.instagramProfilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'}
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-black" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono-code text-sm font-bold text-white">{brandConfig.handle}</span>
                      {brandConfig.isVerified && <CheckCircle2 size={14} className="text-blue-400" />}
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono-code rounded-full">
                        REALTIME SYNC ON
                      </span>
                    </div>
                    <p className="text-xs font-mono-code text-[#888] pt-0.5">
                      {brandConfig.stats.followers} Followers • {brandConfig.stats.posts} Posts • {brandConfig.stats.following} Following • {brandConfig.stats.engagementRate || '4.8%'} Engagement
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('INSTAGRAM_LIVE')}
                  className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white rounded-xl font-mono-code text-xs font-semibold uppercase tracking-wider shadow-lg flex items-center space-x-2 transition-all hover:scale-105 shrink-0"
                >
                  <Instagram size={14} />
                  <span>OPEN LIVE DP & POST STUDIO</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Dedicated Instagram Link Paste Widget */}
              <InstagramLinkInput
                url={brandConfig.instagramUrl}
                handle={brandConfig.handle}
                onUrlChange={(url) => onUpdateBrandConfig({ ...brandConfig, instagramUrl: url })}
                onHandleChange={(handle) => onUpdateBrandConfig({ ...brandConfig, handle })}
                followers={brandConfig.stats.followers}
                posts={brandConfig.stats.posts}
                following={brandConfig.stats.following}
                onFollowersChange={(followers) =>
                  onUpdateBrandConfig({
                    ...brandConfig,
                    stats: { ...brandConfig.stats, followers }
                  })
                }
                onPostsChange={(posts) =>
                  onUpdateBrandConfig({
                    ...brandConfig,
                    stats: { ...brandConfig.stats, posts }
                  })
                }
                onFollowingChange={(following) =>
                  onUpdateBrandConfig({
                    ...brandConfig,
                    stats: { ...brandConfig.stats, following }
                  })
                }
              />

              {/* Quick Jump Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hero & Banner Quick Box */}
                <div className="p-6 bg-[#151515] border border-[#222] rounded-2xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial-serif text-xl text-white uppercase">
                      HERO & ACTIVE DROPS
                    </h3>
                    <button
                      onClick={() => setActiveTab('HERO_DROPS')}
                      className="text-xs font-mono-code text-[#888] hover:text-white flex items-center space-x-1"
                    >
                      <span>EDIT HERO</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  <div className="relative aspect-video rounded-xl overflow-hidden border border-[#2a2a2a]">
                    <img
                      src={brandConfig.heroImage}
                      alt="Hero Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 p-4 flex flex-col justify-between">
                      <span className="text-[9px] font-mono-code px-2 py-0.5 bg-black/80 rounded text-emerald-400 self-start">
                        {brandConfig.heroBadge}
                      </span>
                      <h4 className="font-editorial-serif text-lg text-white uppercase">
                        {brandConfig.heroHeadline}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Catalog Quick Box */}
                <div className="p-6 bg-[#151515] border border-[#222] rounded-2xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial-serif text-xl text-white uppercase">
                      RECENT SILHOUETTES
                    </h3>
                    <button
                      onClick={() => setActiveTab('PRODUCTS')}
                      className="text-xs font-mono-code text-[#888] hover:text-white flex items-center space-x-1"
                    >
                      <span>VIEW ALL ({products.length})</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {products.slice(0, 3).map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setEditingProduct(prod);
                          setActiveTab('PRODUCTS');
                        }}
                        className="flex items-center justify-between p-2.5 bg-[#1a1a1a] hover:bg-[#202020] border border-[#2a2a2a] rounded-xl cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={prod.images.main}
                            alt={prod.name}
                            className="w-10 h-10 object-cover rounded-lg border border-[#333]"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="text-xs font-editorial-serif text-white uppercase">
                              {prod.name}
                            </div>
                            <div className="text-[10px] font-mono-code text-[#888]">
                              {prod.collection} • {prod.fabric}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-mono-code text-white">{prod.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REALTIME INSTAGRAM LIVE & DP STUDIO */}
          {activeTab === 'INSTAGRAM_LIVE' && (
            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
              <InstagramRealtimeStudio
                brandConfig={brandConfig}
                onUpdateBrandConfig={onUpdateBrandConfig}
                instagramPosts={instagramPosts}
                onUpdateInstagramPosts={onUpdateInstagramPosts}
                products={products}
              />
            </div>
          )}

          {/* TAB 3: BRAND CONFIG */}
          {activeTab === 'BRAND' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase block mb-1">
                  BRAND IDENTITY // SOCIAL SYNC
                </span>
                <h2 className="font-editorial-serif text-3xl text-white uppercase tracking-tight">
                  BRAND CORE SETTINGS & INSTAGRAM LINK
                </h2>
              </div>

              {/* Instagram URL Paste Component */}
              <InstagramLinkInput
                url={brandConfig.instagramUrl}
                handle={brandConfig.handle}
                onUrlChange={(url) => onUpdateBrandConfig({ ...brandConfig, instagramUrl: url })}
                onHandleChange={(handle) => onUpdateBrandConfig({ ...brandConfig, handle })}
                followers={brandConfig.stats.followers}
                posts={brandConfig.stats.posts}
                following={brandConfig.stats.following}
                onFollowersChange={(followers) =>
                  onUpdateBrandConfig({
                    ...brandConfig,
                    stats: { ...brandConfig.stats, followers }
                  })
                }
                onPostsChange={(posts) =>
                  onUpdateBrandConfig({
                    ...brandConfig,
                    stats: { ...brandConfig.stats, posts }
                  })
                }
                onFollowingChange={(following) =>
                  onUpdateBrandConfig({
                    ...brandConfig,
                    stats: { ...brandConfig.stats, following }
                  })
                }
              />

              {/* General Brand Details Form in Bento Card */}
              <div className="p-6 bg-[#151515] border border-[#222] rounded-2xl space-y-5 shadow-xl">
                <h4 className="font-editorial-serif text-lg text-white uppercase border-b border-[#222] pb-3">
                  BRAND MESSAGING & HEADLINES
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
                      BRAND NAME
                    </label>
                    <input
                      type="text"
                      value={brandConfig.name}
                      onChange={(e) => onUpdateBrandConfig({ ...brandConfig, name: e.target.value })}
                      className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
                      MAIN TAGLINE
                    </label>
                    <input
                      type="text"
                      value={brandConfig.tagline}
                      onChange={(e) => onUpdateBrandConfig({ ...brandConfig, tagline: e.target.value })}
                      className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
                    SUBHEADING STATEMENT
                  </label>
                  <input
                    type="text"
                    value={brandConfig.subheading}
                    onChange={(e) => onUpdateBrandConfig({ ...brandConfig, subheading: e.target.value })}
                    className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
                    MANIFESTO LEAD HEADLINE
                  </label>
                  <input
                    type="text"
                    value={brandConfig.manifestoLead}
                    onChange={(e) => onUpdateBrandConfig({ ...brandConfig, manifestoLead: e.target.value })}
                    className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-editorial-serif uppercase text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
                    MANIFESTO FULL COPY
                  </label>
                  <textarea
                    rows={4}
                    value={brandConfig.manifestoBody}
                    onChange={(e) => onUpdateBrandConfig({ ...brandConfig, manifestoBody: e.target.value })}
                    className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl p-3 text-xs font-sans text-white resize-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
                    HASHTAGS (COMMA SEPARATED)
                  </label>
                  <input
                    type="text"
                    value={brandConfig.hashtags.join(', ')}
                    onChange={(e) =>
                      onUpdateBrandConfig({
                        ...brandConfig,
                        hashtags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      })
                    }
                    className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HERO & DROPS */}
          {activeTab === 'HERO_DROPS' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase block mb-1">
                  HOMEPAGE VISUALS // COUNTDOWNS
                </span>
                <h2 className="font-editorial-serif text-3xl text-white uppercase tracking-tight">
                  HERO BANNER & DROP COUNTDOWN
                </h2>
              </div>

              {/* Hero Section Visuals */}
              <div className="p-6 bg-[#151515] border border-[#222] rounded-2xl space-y-5 shadow-xl">
                <h4 className="font-editorial-serif text-lg text-white uppercase border-b border-[#222] pb-3">
                  CINEMATIC HERO SECTION
                </h4>

                {/* Hero Image Link Paste Area */}
                <ImageLinkInput
                  label="HERO BACKGROUND IMAGE LINK (PASTE URL)"
                  value={brandConfig.heroImage}
                  onChange={(url) => onUpdateBrandConfig({ ...brandConfig, heroImage: url })}
                  aspect="landscape"
                  helpText="High-res vertical or landscape 2000px photo for background parallax."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
                      HERO BADGE PILL TEXT
                    </label>
                    <input
                      type="text"
                      value={brandConfig.heroBadge}
                      onChange={(e) => onUpdateBrandConfig({ ...brandConfig, heroBadge: e.target.value })}
                      className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
                      HERO MAIN DISPLAY TITLE
                    </label>
                    <input
                      type="text"
                      value={brandConfig.heroHeadline}
                      onChange={(e) => onUpdateBrandConfig({ ...brandConfig, heroHeadline: e.target.value })}
                      className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-editorial-serif uppercase text-white"
                    />
                  </div>
                </div>
              </div>

              {/* The New Drop Countdown Section */}
              <div className="p-6 bg-[#151515] border border-[#222] rounded-2xl space-y-5 shadow-xl">
                <h4 className="font-editorial-serif text-lg text-white uppercase border-b border-[#222] pb-3">
                  THE NEW DROP BANNER & COUNTDOWN
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
                      DROP SECTION TITLE
                    </label>
                    <input
                      type="text"
                      value={brandConfig.nextDropTitle}
                      onChange={(e) => onUpdateBrandConfig({ ...brandConfig, nextDropTitle: e.target.value })}
                      className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-editorial-serif uppercase text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
                      DROP SUBTITLE
                    </label>
                    <input
                      type="text"
                      value={brandConfig.nextDropSubtitle}
                      onChange={(e) => onUpdateBrandConfig({ ...brandConfig, nextDropSubtitle: e.target.value })}
                      className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
                      COUNTDOWN DISPLAY FORMAT
                    </label>
                    <input
                      type="text"
                      value={brandConfig.nextDropCountdownText}
                      onChange={(e) => onUpdateBrandConfig({ ...brandConfig, nextDropCountdownText: e.target.value })}
                      placeholder="02 : 14 : 36 : 48"
                      className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Retro Archive Showcase Section */}
              <div className="p-6 bg-[#151515] border border-[#222] rounded-2xl space-y-5 shadow-xl">
                <h4 className="font-editorial-serif text-lg text-white uppercase border-b border-[#222] pb-3">
                  RETRO 1994 POLAROID ARCHIVE
                </h4>

                <ImageLinkInput
                  label="RETRO POLAROID IMAGE LINK (PASTE URL)"
                  value={brandConfig.retroPolaroidImage}
                  onChange={(url) => onUpdateBrandConfig({ ...brandConfig, retroPolaroidImage: url })}
                  aspect="landscape"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
                      RETRO STORY TITLE
                    </label>
                    <input
                      type="text"
                      value={brandConfig.retroStoryTitle}
                      onChange={(e) => onUpdateBrandConfig({ ...brandConfig, retroStoryTitle: e.target.value })}
                      className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-editorial-serif uppercase text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
                      RETRO STORY DESCRIPTION
                    </label>
                    <input
                      type="text"
                      value={brandConfig.retroStoryBody}
                      onChange={(e) => onUpdateBrandConfig({ ...brandConfig, retroStoryBody: e.target.value })}
                      className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-sans text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCTS CATALOG */}
          {activeTab === 'PRODUCTS' && (
            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
              {/* Top Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase block mb-1">
                    CATALOG MANAGEMENT // {products.length} SILHOUETTES
                  </span>
                  <h2 className="font-editorial-serif text-3xl text-white uppercase tracking-tight">
                    PRODUCTS & DROPS
                  </h2>
                </div>

                <button
                  onClick={() => setEditingProduct(createBlankProduct())}
                  className="px-5 py-3 bg-white text-black hover:bg-[#E5E5E5] font-semibold rounded-xl text-xs font-mono-code uppercase tracking-wider flex items-center space-x-2 shadow-xl self-start sm:self-auto"
                >
                  <Plus size={16} />
                  <span>ADD NEW PRODUCT</span>
                </button>
              </div>

              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#151515] p-3 rounded-2xl border border-[#222]">
                <div className="relative flex-1 w-full">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777]" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by name, fabric, or ID..."
                    className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl pl-10 pr-4 py-2 text-xs font-mono-code text-white placeholder-[#555]"
                  />
                </div>

                <div className="flex items-center space-x-1.5 w-full sm:w-auto">
                  {(['ALL', 'ACTIVE', 'PREMIUM', 'RETRO'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setProductCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-mono-code uppercase tracking-wider transition-colors ${
                        productCategoryFilter === cat
                          ? 'bg-white text-black font-semibold'
                          : 'bg-[#1A1A1A] text-[#888] hover:text-white border border-[#2a2a2a]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Table/Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products
                  .filter((p) => {
                    const matchCat = productCategoryFilter === 'ALL' || p.collection === productCategoryFilter;
                    const matchSearch =
                      !productSearch ||
                      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.fabric.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.id.toLowerCase().includes(productSearch.toLowerCase());
                    return matchCat && matchSearch;
                  })
                  .map((product) => (
                    <div
                      key={product.id}
                      className="bg-[#151515] border border-[#222] hover:border-[#333] rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-xl group transition-all"
                    >
                      <div className="space-y-3">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#101010] border border-[#2a2a2a]">
                          <img
                            src={product.images.main}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-black/80 backdrop-blur-sm rounded-full text-[9px] font-mono-code uppercase text-[#aaa] border border-[#333]">
                            {product.collection}
                          </div>
                          <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-white text-black font-mono-code font-bold text-[10px] rounded-full shadow-md">
                            {product.price || 'INQUIRE'}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-editorial-serif text-base text-white uppercase tracking-tight">
                            {product.name}
                          </h4>
                          <p className="text-[11px] font-mono-code text-[#888] line-clamp-1 pt-0.5">
                            {product.fabric} • {product.weightGsm || product.fit}
                          </p>
                        </div>

                        {/* Colors & Sizes summary */}
                        <div className="flex items-center justify-between text-[10px] font-mono-code text-[#777] pt-1">
                          <div className="flex items-center space-x-1.5">
                            {product.colors.map((c, i) => (
                              <span
                                key={i}
                                className="w-3 h-3 rounded-full border border-[#444]"
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                              />
                            ))}
                          </div>
                          <span>{product.sizes.join(', ')}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#222] gap-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="flex-1 py-2 bg-[#1A1A1A] hover:bg-white hover:text-black border border-[#2a2a2a] text-[#E5E5E5] rounded-xl text-[11px] font-mono-code uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5"
                        >
                          <Edit size={12} />
                          <span>EDIT</span>
                        </button>

                        <button
                          onClick={() => handleDuplicateProduct(product)}
                          className="p-2 bg-[#1A1A1A] hover:bg-[#222] border border-[#2a2a2a] text-[#aaa] hover:text-white rounded-xl transition-colors"
                          title="Duplicate Product"
                        >
                          <Copy size={13} />
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 hover:text-red-300 rounded-xl transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Product Edit Modal Drawer */}
              {editingProduct && (
                <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
                  <div className="relative w-full max-w-3xl bg-[#151515] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-6 my-auto shadow-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-4 border-b border-[#222]">
                      <div>
                        <span className="text-[10px] font-mono-code tracking-[0.25em] text-[#888] uppercase block">
                          PRODUCT EDITOR // ID: {editingProduct.id}
                        </span>
                        <h3 className="font-editorial-serif text-2xl text-white uppercase">
                          {editingProduct.name || 'NEW PRODUCT'}
                        </h3>
                      </div>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="p-2 bg-[#1A1A1A] hover:bg-white hover:text-black rounded-full border border-[#2a2a2a] text-[#888] transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleSaveProduct} className="space-y-6">
                      {/* Name, Price, Collection */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1">
                            PRODUCT NAME *
                          </label>
                          <input
                            type="text"
                            required
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs font-editorial-serif uppercase text-white focus:outline-none focus:border-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1">
                            PRICE ($)
                          </label>
                          <input
                            type="text"
                            value={editingProduct.price || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                            placeholder="$120"
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white focus:outline-none focus:border-white"
                          />
                        </div>
                      </div>

                      {/* Collection & Drop Status */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1">
                            COLLECTION *
                          </label>
                          <select
                            value={editingProduct.collection}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                collection: e.target.value as 'ACTIVE' | 'PREMIUM' | 'RETRO'
                              })
                            }
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white focus:outline-none focus:border-white"
                          >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="PREMIUM">PREMIUM</option>
                            <option value="RETRO">RETRO</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1">
                            DROP STATUS
                          </label>
                          <select
                            value={editingProduct.dropStatus || 'LIVE NOW'}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                dropStatus: e.target.value as 'LIVE NOW' | 'UPCOMING' | 'ARCHIVE'
                              })
                            }
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white focus:outline-none focus:border-white"
                          >
                            <option value="LIVE NOW">LIVE NOW</option>
                            <option value="UPCOMING">UPCOMING</option>
                            <option value="ARCHIVE">ARCHIVE</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1">
                            INSTAGRAM TAG
                          </label>
                          <input
                            type="text"
                            value={editingProduct.instagramTag || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, instagramTag: e.target.value })}
                            placeholder="#FeatousPiece"
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white focus:outline-none focus:border-white"
                          />
                        </div>
                      </div>

                      {/* IMAGE LINK PASTE FEATURES */}
                      <div className="space-y-4 p-4 bg-[#101010] rounded-2xl border border-[#222]">
                        <span className="text-[10px] font-mono-code tracking-[0.25em] text-[#888] uppercase block">
                          PRODUCT IMAGERY // LINK PASTE AREA
                        </span>

                        <ImageLinkInput
                          label="1. MAIN CATALOG IMAGE URL *"
                          value={editingProduct.images.main}
                          onChange={(url) =>
                            setEditingProduct({
                              ...editingProduct,
                              images: { ...editingProduct.images, main: url }
                            })
                          }
                          aspect="portrait"
                          helpText="Primary photo shown on product cards and catalog grid."
                        />

                        <ImageLinkInput
                          label="2. EDITORIAL LOOKBOOK IMAGE URL"
                          value={editingProduct.images.editorial}
                          onChange={(url) =>
                            setEditingProduct({
                              ...editingProduct,
                              images: { ...editingProduct.images, editorial: url }
                            })
                          }
                          aspect="portrait"
                          helpText="Model wearing the piece on location / in motion."
                        />

                        <ImageLinkInput
                          label="3. DETAIL / MACRO FABRIC IMAGE URL"
                          value={editingProduct.images.detail || ''}
                          onChange={(url) =>
                            setEditingProduct({
                              ...editingProduct,
                              images: { ...editingProduct.images, detail: url }
                            })
                          }
                          aspect="square"
                          helpText="Close-up macro photo of fabric grain, zipper, or hardware."
                        />
                      </div>

                      {/* Fabrication, Weight, Fit */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1">
                            FABRIC COMPOSITION
                          </label>
                          <input
                            type="text"
                            value={editingProduct.fabric}
                            onChange={(e) => setEditingProduct({ ...editingProduct, fabric: e.target.value })}
                            placeholder="320 GSM Carbon Wash Cotton"
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1">
                            WEIGHT (GSM)
                          </label>
                          <input
                            type="text"
                            value={editingProduct.weightGsm || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, weightGsm: e.target.value })}
                            placeholder="320 GSM"
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1">
                            FIT STYLE
                          </label>
                          <input
                            type="text"
                            value={editingProduct.fit}
                            onChange={(e) => setEditingProduct({ ...editingProduct, fit: e.target.value })}
                            placeholder="Signature Boxy Relaxed Drop"
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Tagline & Description */}
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1">
                            PRODUCT TAGLINE
                          </label>
                          <input
                            type="text"
                            value={editingProduct.tagline}
                            onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1">
                            DESCRIPTION
                          </label>
                          <textarea
                            rows={3}
                            value={editingProduct.description}
                            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl p-3 text-xs font-sans text-white focus:outline-none resize-none"
                          />
                        </div>
                      </div>

                      {/* Sizes & Tags */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1">
                            SIZES (COMMA SEPARATED)
                          </label>
                          <input
                            type="text"
                            value={editingProduct.sizes.join(', ')}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                sizes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                              })
                            }
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1">
                            FEATURE TAGS (COMMA SEPARATED)
                          </label>
                          <input
                            type="text"
                            value={editingProduct.tags.join(', ')}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                              })
                            }
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Color swatches manager */}
                      <div className="space-y-3 p-4 bg-[#101010] rounded-2xl border border-[#222]">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888]">
                            COLORWAYS ({editingProduct.colors.length})
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingProduct({
                                ...editingProduct,
                                colors: [...editingProduct.colors, { name: 'New Color', hex: '#111111' }]
                              })
                            }
                            className="text-[10px] font-mono-code text-white hover:text-zinc-300 flex items-center space-x-1"
                          >
                            <Plus size={12} />
                            <span>Add Color</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {editingProduct.colors.map((c, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <input
                                type="color"
                                value={c.hex}
                                onChange={(e) => {
                                  const newColors = [...editingProduct.colors];
                                  newColors[idx].hex = e.target.value;
                                  setEditingProduct({ ...editingProduct, colors: newColors });
                                }}
                                className="w-8 h-8 rounded-lg bg-transparent cursor-pointer border border-[#333]"
                              />
                              <input
                                type="text"
                                value={c.name}
                                onChange={(e) => {
                                  const newColors = [...editingProduct.colors];
                                  newColors[idx].name = e.target.value;
                                  setEditingProduct({ ...editingProduct, colors: newColors });
                                }}
                                placeholder="Color Name"
                                className="flex-1 bg-[#151515] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-xs font-mono-code text-white"
                              />
                              <input
                                type="text"
                                value={c.hex}
                                onChange={(e) => {
                                  const newColors = [...editingProduct.colors];
                                  newColors[idx].hex = e.target.value;
                                  setEditingProduct({ ...editingProduct, colors: newColors });
                                }}
                                placeholder="#hex"
                                className="w-24 bg-[#151515] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-xs font-mono-code text-[#aaa]"
                              />
                              {editingProduct.colors.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingProduct({
                                      ...editingProduct,
                                      colors: editingProduct.colors.filter((_, i) => i !== idx)
                                    });
                                  }}
                                  className="p-2 text-[#777] hover:text-red-400"
                                >
                                  <Trash2 size={13} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Modal Bottom Actions */}
                      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#222]">
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#222] border border-[#2a2a2a] text-[#aaa] rounded-xl text-xs font-mono-code uppercase transition-colors"
                        >
                          CANCEL
                        </button>
                        <button
                          type="submit"
                          className="px-7 py-2.5 bg-white text-black font-semibold hover:bg-[#E5E5E5] rounded-xl text-xs font-mono-code uppercase tracking-wider transition-all shadow-xl flex items-center space-x-1.5"
                        >
                          <Save size={14} />
                          <span>SAVE PRODUCT</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: INSTAGRAM POSTS & GRID */}
          {activeTab === 'INSTAGRAM' && (
            <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase block mb-1">
                    FEED CURATION // {instagramPosts.length} POSTS
                  </span>
                  <h2 className="font-editorial-serif text-3xl text-white uppercase tracking-tight">
                    INSTAGRAM 3X3 GRID & POSTS
                  </h2>
                </div>

                <button
                  onClick={() => setEditingPost(createBlankPost())}
                  className="px-5 py-3 bg-white text-black hover:bg-[#E5E5E5] font-semibold rounded-xl text-xs font-mono-code uppercase tracking-wider flex items-center space-x-2 shadow-xl self-start sm:self-auto"
                >
                  <Plus size={16} />
                  <span>ADD INSTAGRAM POST</span>
                </button>
              </div>

              {/* Grid of posts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {instagramPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#151515] border border-[#222] hover:border-[#333] rounded-2xl overflow-hidden p-3 space-y-3 shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-[#101010]">
                        <img
                          src={post.images[0]}
                          alt={post.caption}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[9px] font-mono-code uppercase rounded-full text-white">
                          {post.type} {post.images.length > 1 ? `(${post.images.length})` : ''}
                        </div>
                      </div>

                      <p className="text-xs font-sans text-[#ccc] line-clamp-2 leading-snug">
                        {post.caption}
                      </p>

                      <div className="flex items-center justify-between text-[10px] font-mono-code text-[#888]">
                        <span>{post.likes.toLocaleString()} likes</span>
                        <span>{post.commentsCount} comments</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#222] gap-2">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="flex-1 py-1.5 bg-[#1A1A1A] hover:bg-white hover:text-black border border-[#2a2a2a] text-[#E5E5E5] rounded-xl text-[11px] font-mono-code uppercase tracking-wider transition-all flex items-center justify-center space-x-1"
                      >
                        <Edit size={11} />
                        <span>EDIT</span>
                      </button>

                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 rounded-xl transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Post Modal */}
              {editingPost && (
                <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
                  <div className="relative w-full max-w-2xl bg-[#151515] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-6 my-auto shadow-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-4 border-b border-[#222]">
                      <h3 className="font-editorial-serif text-2xl text-white uppercase">
                        EDIT INSTAGRAM POST
                      </h3>
                      <button
                        onClick={() => setEditingPost(null)}
                        className="p-2 bg-[#1A1A1A] hover:bg-white hover:text-black rounded-full border border-[#2a2a2a] text-[#888] transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleSavePost} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                            POST TYPE
                          </label>
                          <select
                            value={editingPost.type}
                            onChange={(e) =>
                              setEditingPost({
                                ...editingPost,
                                type: e.target.value as 'image' | 'reel' | 'carousel'
                              })
                            }
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white focus:outline-none"
                          >
                            <option value="image">Single Image</option>
                            <option value="carousel">Carousel (Multi-photo)</option>
                            <option value="reel">Reel Video Simulation</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                            LOCATION TAG
                          </label>
                          <input
                            type="text"
                            value={editingPost.location || ''}
                            onChange={(e) => setEditingPost({ ...editingPost, location: e.target.value })}
                            placeholder="Shibuya, Tokyo"
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Image Links Paste */}
                      <div className="space-y-3 p-4 bg-[#101010] rounded-2xl border border-[#222]">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-mono-code uppercase text-[#888]">
                            MEDIA PHOTO URLS ({editingPost.images.length})
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingPost({
                                ...editingPost,
                                images: [
                                  ...editingPost.images,
                                  'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop'
                                ]
                              })
                            }
                            className="text-[10px] font-mono-code text-white hover:text-zinc-300 flex items-center space-x-1"
                          >
                            <Plus size={12} />
                            <span>Add Photo Link</span>
                          </button>
                        </div>

                        {editingPost.images.map((imgUrl, idx) => (
                          <div key={idx} className="space-y-1">
                            <ImageLinkInput
                              label={`PHOTO #${idx + 1} LINK`}
                              value={imgUrl}
                              onChange={(url) => {
                                const newImgs = [...editingPost.images];
                                newImgs[idx] = url;
                                setEditingPost({ ...editingPost, images: newImgs });
                              }}
                              aspect="square"
                            />
                            {editingPost.images.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  setEditingPost({
                                    ...editingPost,
                                    images: editingPost.images.filter((_, i) => i !== idx)
                                  })
                                }
                                className="text-[10px] font-mono-code text-red-400 hover:text-red-300 pt-0.5 block"
                              >
                                Remove this photo
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                          CAPTION
                        </label>
                        <textarea
                          rows={3}
                          value={editingPost.caption}
                          onChange={(e) => setEditingPost({ ...editingPost, caption: e.target.value })}
                          className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl p-3 text-xs font-sans text-white focus:outline-none resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                            LIKES COUNT
                          </label>
                          <input
                            type="number"
                            value={editingPost.likes}
                            onChange={(e) => setEditingPost({ ...editingPost, likes: parseInt(e.target.value) || 0 })}
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                            AUDIO TRACK NAME
                          </label>
                          <input
                            type="text"
                            value={editingPost.audioTrack || ''}
                            onChange={(e) => setEditingPost({ ...editingPost, audioTrack: e.target.value })}
                            placeholder="FEATOUS • Tokyo Midnight Echo"
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#222]">
                        <button
                          type="button"
                          onClick={() => setEditingPost(null)}
                          className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#222] border border-[#2a2a2a] text-[#aaa] rounded-xl text-xs font-mono-code uppercase"
                        >
                          CANCEL
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-white text-black font-semibold hover:bg-[#E5E5E5] rounded-xl text-xs font-mono-code uppercase tracking-wider shadow-xl"
                        >
                          SAVE POST
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: REELS */}
          {activeTab === 'REELS' && (
            <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase block mb-1">
                    SHORT-FORM VIDEO // {reels.length} REELS
                  </span>
                  <h2 className="font-editorial-serif text-3xl text-white uppercase tracking-tight">
                    INSTAGRAM REELS
                  </h2>
                </div>

                <button
                  onClick={() => setEditingReel(createBlankReel())}
                  className="px-5 py-3 bg-white text-black hover:bg-[#E5E5E5] font-semibold rounded-xl text-xs font-mono-code uppercase tracking-wider flex items-center space-x-2 shadow-xl self-start sm:self-auto"
                >
                  <Plus size={16} />
                  <span>ADD REEL</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {reels.map((reel) => (
                  <div
                    key={reel.id}
                    className="bg-[#151515] border border-[#222] hover:border-[#333] rounded-2xl overflow-hidden p-3 space-y-3 shadow-xl flex flex-col justify-between transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-[#101010] group">
                        <img
                          src={reel.thumbnail}
                          alt={reel.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Status Badges Overlay */}
                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1">
                          <span className="px-2 py-0.5 bg-black/80 rounded-full text-[9px] font-mono-code uppercase text-[#aaa] border border-white/10">
                            {reel.category}
                          </span>
                          
                          <div className="flex items-center space-x-1">
                            {reel.videoUrl && (
                              <span className="px-1.5 py-0.5 bg-blue-950/90 text-blue-300 border border-blue-500/40 rounded-md text-[8px] font-mono-code flex items-center space-x-0.5" title="Video attached">
                                <Film size={8} />
                                <span>HD</span>
                              </span>
                            )}
                            {reel.voiceAudioUrl && reel.voiceEnabled !== false && (
                              <span className="px-1.5 py-0.5 bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 rounded-md text-[8px] font-mono-code flex items-center space-x-0.5" title="Voiceover attached">
                                <Mic size={8} />
                                <span>VOICE</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="absolute bottom-2 left-2 right-2 text-white p-2.5 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 space-y-1">
                          <h5 className="font-editorial-serif text-xs uppercase line-clamp-1 font-bold">{reel.title}</h5>
                          <div className="flex items-center justify-between text-[9px] font-mono-code text-[#aaa]">
                            <span>{reel.views} views</span>
                            {reel.voiceTitle && (
                              <span className="text-emerald-400 truncate max-w-[110px]">🎙️ {reel.voiceTitle}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#222] gap-2">
                      <button
                        onClick={() => setEditingReel(reel)}
                        className="flex-1 py-2 bg-[#1A1A1A] hover:bg-white hover:text-black border border-[#2a2a2a] text-[#E5E5E5] rounded-xl text-[11px] font-mono-code uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow"
                      >
                        <Edit size={12} />
                        <span>EDIT & STUDIO</span>
                      </button>
                      <button
                        onClick={() => handleDeleteReel(reel.id)}
                        className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 rounded-xl transition-colors"
                        title="Delete Reel"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Reel Modal with Video & Voice Studio */}
              {editingReel && (
                <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
                  <div className="relative w-full max-w-3xl bg-[#151515] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-5 my-auto shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
                    <div className="flex items-center justify-between pb-4 border-b border-[#222]">
                      <div>
                        <span className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-blue-400 block mb-0.5">
                          REEL & MOTION STUDIO
                        </span>
                        <h3 className="font-editorial-serif text-2xl text-white uppercase">
                          EDIT REEL, VIDEO & VOICEOVER
                        </h3>
                      </div>
                      <button
                        onClick={() => setEditingReel(null)}
                        className="p-2 bg-[#1A1A1A] hover:bg-white hover:text-black rounded-full border border-[#2a2a2a] text-[#888] transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleSaveReel} className="space-y-5">
                      <div>
                        <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                          REEL TITLE *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingReel.title}
                          onChange={(e) => setEditingReel({ ...editingReel, title: e.target.value })}
                          className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs font-editorial-serif uppercase text-white focus:outline-none"
                        />
                      </div>

                      <ImageLinkInput
                        label="VIDEO POSTER / THUMBNAIL IMAGE URL (PASTE LINK) *"
                        value={editingReel.thumbnail}
                        onChange={(url) => setEditingReel({ ...editingReel, thumbnail: url })}
                        aspect="video"
                      />

                      {/* EMBEDDED VIDEO & VOICEOVER STUDIO */}
                      <VideoVoiceStudio
                        reel={editingReel}
                        onChange={(updated) => setEditingReel(updated)}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                            CREATOR HANDLE
                          </label>
                          <input
                            type="text"
                            value={editingReel.creator}
                            onChange={(e) => setEditingReel({ ...editingReel, creator: e.target.value })}
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                            CATEGORY
                          </label>
                          <select
                            value={editingReel.category}
                            onChange={(e) =>
                              setEditingReel({
                                ...editingReel,
                                category: e.target.value as any
                              })
                            }
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                          >
                            <option value="STYLING">STYLING</option>
                            <option value="BEHIND THE SCENES">BEHIND THE SCENES</option>
                            <option value="CAMPAIGN">CAMPAIGN</option>
                            <option value="STREET STYLE">STREET STYLE</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                          AUDIO TRACK / SOUNDTRACK TICKER
                        </label>
                        <input
                          type="text"
                          value={editingReel.audioTrack}
                          onChange={(e) => setEditingReel({ ...editingReel, audioTrack: e.target.value })}
                          className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                          CAPTION
                        </label>
                        <textarea
                          rows={2}
                          value={editingReel.caption}
                          onChange={(e) => setEditingReel({ ...editingReel, caption: e.target.value })}
                          className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl p-3 text-xs font-sans text-white focus:outline-none resize-none"
                        />
                      </div>

                      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#222]">
                        <button
                          type="button"
                          onClick={() => setEditingReel(null)}
                          className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#222] border border-[#2a2a2a] text-[#aaa] rounded-xl text-xs font-mono-code uppercase"
                        >
                          CANCEL
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-white text-black font-semibold hover:bg-[#E5E5E5] rounded-xl text-xs font-mono-code uppercase tracking-wider shadow-xl flex items-center space-x-2"
                        >
                          <Save size={14} />
                          <span>SAVE REEL & MEDIA</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: CAMPAIGNS */}
          {activeTab === 'CAMPAIGNS' && (
            <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase block mb-1">
                    SEASONAL STORYTELLING // {campaigns.length} CAMPAIGNS
                  </span>
                  <h2 className="font-editorial-serif text-3xl text-white uppercase tracking-tight">
                    FASHION CAMPAIGNS
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {campaigns.map((camp) => (
                  <div
                    key={camp.id}
                    className="bg-[#151515] border border-[#222] rounded-2xl overflow-hidden p-4 space-y-4 shadow-xl flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#101010]">
                        <img
                          src={camp.heroImage}
                          alt={camp.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 px-2.5 py-0.5 bg-black/80 text-[9px] font-mono-code uppercase rounded-full text-[#aaa]">
                          {camp.season}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-editorial-serif text-lg text-white uppercase">
                          {camp.title}
                        </h4>
                        <p className="text-xs font-mono-code text-[#888]">{camp.subtitle}</p>
                        <p className="text-xs font-sans text-[#aaa] line-clamp-2 pt-1">
                          {camp.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#222]">
                      <button
                        onClick={() => setEditingCampaign(camp)}
                        className="w-full py-2 bg-[#1A1A1A] hover:bg-white hover:text-black border border-[#2a2a2a] text-[#E5E5E5] rounded-xl text-xs font-mono-code uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5"
                      >
                        <Edit size={13} />
                        <span>EDIT CAMPAIGN LOOKS & STORY</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Campaign Modal */}
              {editingCampaign && (
                <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
                  <div className="relative w-full max-w-2xl bg-[#151515] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-5 my-auto shadow-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-4 border-b border-[#222]">
                      <h3 className="font-editorial-serif text-2xl text-white uppercase">
                        EDIT CAMPAIGN // {editingCampaign.title}
                      </h3>
                      <button
                        onClick={() => setEditingCampaign(null)}
                        className="p-2 bg-[#1A1A1A] hover:bg-white hover:text-black rounded-full border border-[#2a2a2a] text-[#888] transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleSaveCampaign} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                            CAMPAIGN TITLE
                          </label>
                          <input
                            type="text"
                            value={editingCampaign.title}
                            onChange={(e) => setEditingCampaign({ ...editingCampaign, title: e.target.value })}
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs font-editorial-serif uppercase text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                            SEASON / CAPSULE
                          </label>
                          <input
                            type="text"
                            value={editingCampaign.season}
                            onChange={(e) => setEditingCampaign({ ...editingCampaign, season: e.target.value })}
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <ImageLinkInput
                        label="HERO BANNER PHOTO (PASTE LINK)"
                        value={editingCampaign.heroImage}
                        onChange={(url) => setEditingCampaign({ ...editingCampaign, heroImage: url })}
                        aspect="landscape"
                      />

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono-code uppercase text-[#888] block">
                          LOOKBOOK SPREAD PHOTO 1 (PASTE LINK)
                        </label>
                        <input
                          type="url"
                          value={editingCampaign.secondaryImages[0] || ''}
                          onChange={(e) => {
                            const newSec = [...editingCampaign.secondaryImages];
                            newSec[0] = e.target.value;
                            setEditingCampaign({ ...editingCampaign, secondaryImages: newSec });
                          }}
                          className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono-code uppercase text-[#888] block">
                          LOOKBOOK SPREAD PHOTO 2 (PASTE LINK)
                        </label>
                        <input
                          type="url"
                          value={editingCampaign.secondaryImages[1] || ''}
                          onChange={(e) => {
                            const newSec = [...editingCampaign.secondaryImages];
                            newSec[1] = e.target.value;
                            setEditingCampaign({ ...editingCampaign, secondaryImages: newSec });
                          }}
                          className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                          NARRATIVE / DESCRIPTION
                        </label>
                        <textarea
                          rows={3}
                          value={editingCampaign.description}
                          onChange={(e) => setEditingCampaign({ ...editingCampaign, description: e.target.value })}
                          className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl p-3 text-xs font-sans text-white focus:outline-none resize-none"
                        />
                      </div>

                      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#222]">
                        <button
                          type="button"
                          onClick={() => setEditingCampaign(null)}
                          className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#222] border border-[#2a2a2a] text-[#aaa] rounded-xl text-xs font-mono-code uppercase"
                        >
                          CANCEL
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-white text-black font-semibold hover:bg-[#E5E5E5] rounded-xl text-xs font-mono-code uppercase tracking-wider shadow-xl"
                        >
                          SAVE CAMPAIGN
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 8: COMMUNITY UGC */}
          {activeTab === 'COMMUNITY' && (
            <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase block mb-1">
                    COMMUNITY CURATION // {communityLooks.length} LOOKS
                  </span>
                  <h2 className="font-editorial-serif text-3xl text-white uppercase tracking-tight">
                    COMMUNITY UGC STYLING
                  </h2>
                </div>

                <button
                  onClick={() =>
                    setEditingLook({
                      id: `com-${Date.now()}`,
                      userHandle: '@yourhandle',
                      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
                      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop',
                      city: 'Tokyo, Japan',
                      likes: 1200,
                      tags: ['#FEATOUS', '#WEARFEATOUS'],
                      outfitPieces: ['320 GSM Box Tee'],
                      caption: 'Styling for Shibuya street.'
                    })
                  }
                  className="px-5 py-3 bg-white text-black hover:bg-[#E5E5E5] font-semibold rounded-xl text-xs font-mono-code uppercase tracking-wider flex items-center space-x-2 shadow-xl self-start sm:self-auto"
                >
                  <Plus size={16} />
                  <span>ADD COMMUNITY FIT</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {communityLooks.map((look) => (
                  <div
                    key={look.id}
                    className="bg-[#151515] border border-[#222] rounded-2xl overflow-hidden p-3 space-y-3 shadow-xl flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-[#101010]">
                        <img
                          src={look.image}
                          alt={look.caption}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-black/80 rounded-full text-[9px] font-mono-code text-white">
                          {look.userHandle} • {look.city}
                        </div>
                      </div>

                      <p className="text-xs font-sans text-[#ccc] line-clamp-2 leading-tight">
                        {look.caption}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#222] gap-2">
                      <button
                        onClick={() => setEditingLook(look)}
                        className="flex-1 py-1.5 bg-[#1A1A1A] hover:bg-white hover:text-black border border-[#2a2a2a] text-[#E5E5E5] rounded-xl text-[11px] font-mono-code uppercase tracking-wider transition-all flex items-center justify-center space-x-1"
                      >
                        <Edit size={11} />
                        <span>EDIT</span>
                      </button>
                      <button
                        onClick={() => handleDeleteLook(look.id)}
                        className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 rounded-xl"
                        title="Delete Look"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Look Modal */}
              {editingLook && (
                <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
                  <div className="relative w-full max-w-lg bg-[#151515] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-5 my-auto shadow-2xl">
                    <div className="flex items-center justify-between pb-4 border-b border-[#222]">
                      <h3 className="font-editorial-serif text-2xl text-white uppercase">
                        EDIT COMMUNITY FIT
                      </h3>
                      <button
                        onClick={() => setEditingLook(null)}
                        className="p-2 bg-[#1A1A1A] hover:bg-white hover:text-black rounded-full border border-[#2a2a2a] text-[#888] transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <form onSubmit={handleSaveLook} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                            INSTAGRAM HANDLE
                          </label>
                          <input
                            type="text"
                            value={editingLook.userHandle}
                            onChange={(e) => setEditingLook({ ...editingLook, userHandle: e.target.value })}
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                            CITY / REGION
                          </label>
                          <input
                            type="text"
                            value={editingLook.city}
                            onChange={(e) => setEditingLook({ ...editingLook, city: e.target.value })}
                            className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <ImageLinkInput
                        label="LOOK PHOTO URL (PASTE LINK)"
                        value={editingLook.image}
                        onChange={(url) => setEditingLook({ ...editingLook, image: url })}
                        aspect="portrait"
                      />

                      <div>
                        <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                          TAGGED PIECES
                        </label>
                        <input
                          type="text"
                          value={editingLook.outfitPieces.join(', ')}
                          onChange={(e) =>
                            setEditingLook({
                              ...editingLook,
                              outfitPieces: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                            })
                          }
                          className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-3.5 py-2 text-xs font-mono-code text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                          STYLING CAPTION
                        </label>
                        <textarea
                          rows={2}
                          value={editingLook.caption}
                          onChange={(e) => setEditingLook({ ...editingLook, caption: e.target.value })}
                          className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl p-3 text-xs font-sans text-white focus:outline-none resize-none"
                        />
                      </div>

                      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#222]">
                        <button
                          type="button"
                          onClick={() => setEditingLook(null)}
                          className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#222] border border-[#2a2a2a] text-[#aaa] rounded-xl text-xs font-mono-code uppercase"
                        >
                          CANCEL
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-white text-black font-semibold hover:bg-[#E5E5E5] rounded-xl text-xs font-mono-code uppercase tracking-wider shadow-xl"
                        >
                          SAVE LOOK
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 9: SUPABASE CLOUD DATABASE */}
          {activeTab === 'SUPABASE' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-[10px] font-mono-code tracking-[0.3em] text-emerald-400 uppercase block mb-1">
                  SUPABASE POSTGRESQL INTEGRATION
                </span>
                <h2 className="font-editorial-serif text-3xl text-white uppercase tracking-tight">
                  CLOUD PERSISTENCE & DATABASE MANAGER
                </h2>
              </div>

              <SupabaseSyncManager
                brandConfig={brandConfig}
                onUpdateBrandConfig={onUpdateBrandConfig}
                products={products}
                onUpdateProducts={onUpdateProducts}
                instagramPosts={instagramPosts}
                onUpdateInstagramPosts={onUpdateInstagramPosts}
                reels={reels}
                onUpdateReels={onUpdateReels}
                campaigns={campaigns}
                onUpdateCampaigns={onUpdateCampaigns}
                communityLooks={communityLooks}
                onUpdateCommunityLooks={onUpdateCommunityLooks}
                onShowToast={showToast}
              />
            </div>
          )}

          {/* TAB 10: DATA & BACKUP */}
          {activeTab === 'DATA' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase block mb-1">
                  PERSISTENCE & SYSTEM STATE
                </span>
                <h2 className="font-editorial-serif text-3xl text-white uppercase tracking-tight">
                  EXPORT, IMPORT & FACTORY RESET
                </h2>
              </div>

              {/* Action Bento Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Export Card */}
                <div className="p-6 bg-[#151515] border border-[#222] rounded-2xl space-y-4 shadow-xl">
                  <Download size={24} className="text-white" />
                  <div>
                    <h4 className="font-editorial-serif text-lg text-white uppercase">
                      EXPORT COMPLETE BRAND BACKUP
                    </h4>
                    <p className="text-xs font-mono-code text-[#888] pt-1">
                      Download all current products, Instagram posts, images, and config as a JSON file.
                    </p>
                  </div>
                  <button
                    onClick={handleExportJson}
                    className="w-full py-3 bg-white text-black hover:bg-[#E5E5E5] font-semibold text-xs font-mono-code uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <Download size={14} />
                    <span>DOWNLOAD JSON BACKUP</span>
                  </button>
                </div>

                {/* Import Card */}
                <div className="p-6 bg-[#151515] border border-[#222] rounded-2xl space-y-4 shadow-xl">
                  <Upload size={24} className="text-white" />
                  <div>
                    <h4 className="font-editorial-serif text-lg text-white uppercase">
                      RESTORE FROM JSON BACKUP
                    </h4>
                    <p className="text-xs font-mono-code text-[#888] pt-1">
                      Upload a previously exported backup file to restore website content instantly.
                    </p>
                  </div>

                  <label className="w-full py-3 bg-[#1A1A1A] hover:bg-[#222] border border-[#2a2a2a] text-[#E5E5E5] hover:text-white font-semibold text-xs font-mono-code uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer">
                    <Upload size={14} />
                    <span>UPLOAD BACKUP FILE</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJsonFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Reset Card */}
              <div className="p-6 bg-red-950/10 border border-red-900/30 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <RotateCcw size={20} className="text-red-400" />
                  <div>
                    <h4 className="font-editorial-serif text-lg text-red-300 uppercase">
                      FACTORY RESET TO INITIAL STATE
                    </h4>
                    <p className="text-xs font-mono-code text-[#aaa]">
                      Wipes all custom changes from browser storage and restores the default FEATOUS brand archive.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="px-6 py-2.5 bg-red-900/40 hover:bg-red-900/60 border border-red-700/50 text-red-200 font-semibold text-xs font-mono-code uppercase tracking-wider rounded-xl transition-all"
                >
                  RESTORE FACTORY DEFAULTS
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Confirmation Modal for Reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[130] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#151515] border border-red-900/40 rounded-3xl p-6 sm:p-8 space-y-5 text-center shadow-2xl">
            <RotateCcw size={32} className="text-red-400 mx-auto" />
            <h3 className="font-editorial-serif text-2xl text-white uppercase">
              RESTORE BRAND FACTORY DEFAULTS?
            </h3>
            <p className="text-xs font-mono-code text-[#888] leading-relaxed">
              This will erase all custom products, custom Instagram links, and uploaded image links stored in this browser session.
            </p>

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#222] border border-[#2a2a2a] text-[#aaa] rounded-xl text-xs font-mono-code uppercase"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  onResetToDefaults();
                  setShowResetConfirm(false);
                  showToast('Restored brand factory defaults');
                }}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-xs font-mono-code uppercase tracking-wider shadow-xl"
              >
                YES, RESET ALL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
