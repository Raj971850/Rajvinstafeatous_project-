import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CollectionCategories } from './components/CollectionCategories';
import { FeaturedDropSection } from './components/FeaturedDropSection';
import { ProductShowcase } from './components/ProductShowcase';
import { InstagramExperience } from './components/InstagramExperience';
import { InstagramReelsSection } from './components/InstagramReelsSection';
import { CampaignsSection } from './components/CampaignsSection';
import { BrandManifesto } from './components/BrandManifesto';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';

// Admin Panel
import { AdminPanel } from './components/admin/AdminPanel';
import { Sliders } from 'lucide-react';

// Modals
import { ProductModal } from './components/ProductModal';
import { InstagramPostModal } from './components/InstagramPostModal';
import { ReelPlayerModal } from './components/ReelPlayerModal';
import { CampaignModal } from './components/CampaignModal';
import { MoodboardDrawer } from './components/MoodboardDrawer';
import { SearchModal } from './components/SearchModal';
import { UgcModal } from './components/UgcModal';
import { DropModal } from './components/DropModal';

// Data Defaults
import {
  PRODUCTS as DEFAULT_PRODUCTS,
  INSTAGRAM_POSTS as DEFAULT_INSTAGRAM_POSTS,
  REELS_DATA as DEFAULT_REELS_DATA,
  CAMPAIGNS as DEFAULT_CAMPAIGNS,
  COMMUNITY_LOOKS as DEFAULT_COMMUNITY_LOOKS,
  BRAND_CONFIG as DEFAULT_BRAND_CONFIG,
} from './data/brandData';
import {
  Product,
  InstagramPost,
  ReelItem,
  Campaign,
  CollectionCategory,
  CommunityLook,
  BrandConfig,
} from './types';
import { isSupabaseConfigured } from './lib/supabase';
import { fetchFromSupabase } from './lib/supabaseSync';
import { INSTAGRAM_BROADCAST_EVENT } from './lib/instagramLiveSync';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CollectionCategory>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Drawers & Modals
  const [moodboardOpen, setMoodboardOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [ugcModalOpen, setUgcModalOpen] = useState(false);
  const [dropModalOpen, setDropModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Dynamic Site State with Persistence
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(() => {
    try {
      const stored = localStorage.getItem('featous_brand_config');
      return stored ? JSON.parse(stored) : DEFAULT_BRAND_CONFIG;
    } catch {
      return DEFAULT_BRAND_CONFIG;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('featous_products');
      return stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>(() => {
    try {
      const stored = localStorage.getItem('featous_instagram_posts');
      return stored ? JSON.parse(stored) : DEFAULT_INSTAGRAM_POSTS;
    } catch {
      return DEFAULT_INSTAGRAM_POSTS;
    }
  });

  const [reels, setReels] = useState<ReelItem[]>(() => {
    try {
      const stored = localStorage.getItem('featous_reels');
      return stored ? JSON.parse(stored) : DEFAULT_REELS_DATA;
    } catch {
      return DEFAULT_REELS_DATA;
    }
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    try {
      const stored = localStorage.getItem('featous_campaigns');
      return stored ? JSON.parse(stored) : DEFAULT_CAMPAIGNS;
    } catch {
      return DEFAULT_CAMPAIGNS;
    }
  });

  const [communityLooks, setCommunityLooks] = useState<CommunityLook[]>(() => {
    try {
      const stored = localStorage.getItem('featous_community_looks');
      return stored ? JSON.parse(stored) : DEFAULT_COMMUNITY_LOOKS;
    } catch {
      return DEFAULT_COMMUNITY_LOOKS;
    }
  });

  // Saved Capsule / Moodboard IDs with initial curated items
  const [savedProductIds, setSavedProductIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('featous_saved_moodboard');
      return stored ? JSON.parse(stored) : ['prod-heavy-tee', 'prod-retro-runner'];
    } catch {
      return ['prod-heavy-tee', 'prod-retro-runner'];
    }
  });

  // Persist state updates to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('featous_brand_config', JSON.stringify(brandConfig));
    } catch {}
  }, [brandConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('featous_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('featous_instagram_posts', JSON.stringify(instagramPosts));
    } catch {}
  }, [instagramPosts]);

  useEffect(() => {
    try {
      localStorage.setItem('featous_reels', JSON.stringify(reels));
    } catch {}
  }, [reels]);

  useEffect(() => {
    try {
      localStorage.setItem('featous_campaigns', JSON.stringify(campaigns));
    } catch {}
  }, [campaigns]);

  useEffect(() => {
    try {
      localStorage.setItem('featous_community_looks', JSON.stringify(communityLooks));
    } catch {}
  }, [communityLooks]);

  useEffect(() => {
    try {
      localStorage.setItem('featous_saved_moodboard', JSON.stringify(savedProductIds));
    } catch {}
  }, [savedProductIds]);

  // If Supabase is configured, auto-hydrate latest cloud dataset
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    let isMounted = true;
    const loadFromSupabase = async () => {
      try {
        const [cloudProducts, cloudReels, cloudCampaigns, cloudPosts, cloudLooks] = await Promise.all([
          fetchFromSupabase<Product>('products'),
          fetchFromSupabase<ReelItem>('reels'),
          fetchFromSupabase<Campaign>('campaigns'),
          fetchFromSupabase<InstagramPost>('instagram_posts'),
          fetchFromSupabase<CommunityLook>('community_looks'),
        ]);

        if (!isMounted) return;

        if (cloudProducts && cloudProducts.length > 0) setProducts(cloudProducts);
        if (cloudReels && cloudReels.length > 0) setReels(cloudReels);
        if (cloudCampaigns && cloudCampaigns.length > 0) setCampaigns(cloudCampaigns);
        if (cloudPosts && cloudPosts.length > 0) setInstagramPosts(cloudPosts);
        if (cloudLooks && cloudLooks.length > 0) setCommunityLooks(cloudLooks);
      } catch (err) {
        console.warn('Supabase initial fetch bypassed, using local state:', err);
      }
    };

    loadFromSupabase();
    return () => {
      isMounted = false;
    };
  }, []);

  // Real-time Instagram Live Sync Event Listener (cross-component and cross-tab)
  useEffect(() => {
    const handleLiveSyncEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{
        type: string;
        brandConfig?: BrandConfig;
        post?: InstagramPost;
        posts?: InstagramPost[];
      }>;
      if (!customEvent.detail) return;

      if (customEvent.detail.brandConfig) {
        setBrandConfig(customEvent.detail.brandConfig);
      }
      if (customEvent.detail.post) {
        setInstagramPosts((prev) => [customEvent.detail.post!, ...prev]);
      }
      if (customEvent.detail.posts) {
        setInstagramPosts(customEvent.detail.posts);
      }
    };

    window.addEventListener(INSTAGRAM_BROADCAST_EVENT, handleLiveSyncEvent);

    let bc: BroadcastChannel | null = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        bc = new BroadcastChannel('featous_instagram_channel');
        bc.onmessage = (e) => {
          if (e.data?.brandConfig) setBrandConfig(e.data.brandConfig);
          if (e.data?.post) setInstagramPosts((prev) => [e.data.post, ...prev]);
          if (e.data?.posts) setInstagramPosts(e.data.posts);
        };
      }
    } catch {}

    return () => {
      window.removeEventListener(INSTAGRAM_BROADCAST_EVENT, handleLiveSyncEvent);
      if (bc) bc.close();
    };
  }, []);

  // Keyboard shortcut to open admin panel (Alt+A or Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSave = (productId: string) => {
    setSavedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleOpenProductById = (id: string) => {
    const p = products.find((item) => item.id === id);
    if (p) {
      setSelectedProduct(p);
    }
  };

  const handleOpenProductByName = (name: string) => {
    const p = products.find(
      (item) =>
        item.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(item.name.toLowerCase())
    );
    if (p) {
      setSelectedProduct(p);
    } else if (products.length > 0) {
      setSelectedProduct(products[0]);
    }
  };

  const handleAddCommunityLook = (look: { handle: string; city: string; pieces: string; caption: string }) => {
    const newLook: CommunityLook = {
      id: `com-user-${Date.now()}`,
      userHandle: look.handle,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop',
      city: look.city,
      likes: 1,
      tags: ['#FEATOUS', '#WEARFEATOUS'],
      outfitPieces: [look.pieces],
      caption: look.caption,
    };
    setCommunityLooks([newLook, ...communityLooks]);
  };

  const handleResetToDefaults = () => {
    localStorage.removeItem('featous_brand_config');
    localStorage.removeItem('featous_products');
    localStorage.removeItem('featous_instagram_posts');
    localStorage.removeItem('featous_reels');
    localStorage.removeItem('featous_campaigns');
    localStorage.removeItem('featous_community_looks');
    localStorage.removeItem('featous_saved_moodboard');

    setBrandConfig(DEFAULT_BRAND_CONFIG);
    setProducts(DEFAULT_PRODUCTS);
    setInstagramPosts(DEFAULT_INSTAGRAM_POSTS);
    setReels(DEFAULT_REELS_DATA);
    setCampaigns(DEFAULT_CAMPAIGNS);
    setCommunityLooks(DEFAULT_COMMUNITY_LOOKS);
    setSavedProductIds(['prod-heavy-tee', 'prod-retro-runner']);
  };

  const handleExploreScroll = () => {
    const el = document.getElementById('collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenStory = () => {
    const el = document.getElementById('read-manifesto-btn');
    if (el) {
      el.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] selection:bg-white selection:text-black font-sans">
      {/* Fixed Luxury Navigation Header */}
      <Navbar
        onOpenMoodboard={() => setMoodboardOpen(true)}
        savedCount={savedProductIds.length}
        onOpenSearch={() => setSearchOpen(true)}
        onSelectCollection={(cat) => {
          setSelectedCategory(cat);
        }}
        onOpenStory={handleOpenStory}
        brandConfig={brandConfig}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      <main className="w-full">
        {/* 1. Cinematic Hero Section */}
        <HeroSection
          onExploreClick={handleExploreScroll}
          onOpenDropModal={() => setDropModalOpen(true)}
          brandConfig={brandConfig}
        />

        {/* 2. Collection Showcase (Active, Premium, Retro Polaroid) */}
        <CollectionCategories
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onOpenProductById={handleOpenProductById}
          brandConfig={brandConfig}
        />

        {/* 3. The New Drop (Featured 4-Tile Collage & Countdown) */}
        <FeaturedDropSection
          products={products}
          onOpenProduct={(prod) => setSelectedProduct(prod)}
          onExploreDrops={() => {
            setSelectedCategory('ALL');
            document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
          brandConfig={brandConfig}
        />

        {/* 4. Editorial Product Showcase Grid */}
        <ProductShowcase
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenProduct={(prod) => setSelectedProduct(prod)}
          onToggleSave={handleToggleSave}
          savedProductIds={savedProductIds}
        />

        {/* 5. Instagram-First Experience (@FEATOUS 3x3 Grid) */}
        <InstagramExperience
          posts={instagramPosts}
          onOpenPostModal={(post) => setSelectedPost(post)}
          brandConfig={brandConfig}
        />

        {/* 6. Instagram Reels Horizontal Carousel */}
        <InstagramReelsSection
          reels={reels}
          onOpenReel={(reel) => setSelectedReel(reel)}
          brandConfig={brandConfig}
        />

        {/* 7. Brand Fashion Campaigns */}
        <CampaignsSection
          campaigns={campaigns}
          onOpenCampaign={(camp) => setSelectedCampaign(camp)}
        />

        {/* 8. Brand Manifesto (Dark Editorial Statement) */}
        <BrandManifesto brandConfig={brandConfig} />

        {/* 9. Social Proof / Community UGC Styling */}
        <CommunitySection
          communityLooks={communityLooks}
          onOpenUgcModal={() => setUgcModalOpen(true)}
          onOpenProductByName={handleOpenProductByName}
          brandConfig={brandConfig}
        />
      </main>

      {/* 10. Final Brand Call to Action & Luxury Footer */}
      <Footer
        onExploreClick={handleExploreScroll}
        onOpenStory={handleOpenStory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        brandConfig={brandConfig}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* FLOATING ADMIN QUICK LAUNCH BUTTON */}
      <button
        id="floating-admin-btn"
        onClick={() => setAdminOpen(true)}
        title="Open Brand & Content Admin Panel (Shortcut: Alt+A)"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-[#151515]/95 hover:bg-white text-white hover:text-black border border-[#333] hover:border-white rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-300 group flex items-center space-x-2.5 hover:scale-105"
      >
        <Sliders size={18} className="text-emerald-400 group-hover:text-black transition-colors" />
        <span className="hidden sm:inline font-mono-code text-[11px] uppercase tracking-wider font-semibold">
          ADMIN PANEL
        </span>
      </button>

      {/* ADMIN CONTROL PANEL MODAL / DRAWER */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        brandConfig={brandConfig}
        onUpdateBrandConfig={setBrandConfig}
        products={products}
        onUpdateProducts={setProducts}
        instagramPosts={instagramPosts}
        onUpdateInstagramPosts={setInstagramPosts}
        reels={reels}
        onUpdateReels={setReels}
        campaigns={campaigns}
        onUpdateCampaigns={setCampaigns}
        communityLooks={communityLooks}
        onUpdateCommunityLooks={setCommunityLooks}
        onResetToDefaults={handleResetToDefaults}
        onOpenProductModal={(p) => setSelectedProduct(p)}
      />

      {/* MODALS & OVERLAYS */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onToggleSave={handleToggleSave}
        isSaved={selectedProduct ? savedProductIds.includes(selectedProduct.id) : false}
      />

      <InstagramPostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onOpenProductById={handleOpenProductById}
        products={products}
      />

      <ReelPlayerModal
        reel={selectedReel}
        onClose={() => setSelectedReel(null)}
        onOpenProductById={handleOpenProductById}
        products={products}
        brandConfig={brandConfig}
      />

      <CampaignModal
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        onExploreProducts={() => {
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <MoodboardDrawer
        isOpen={moodboardOpen}
        onClose={() => setMoodboardOpen(false)}
        savedProductIds={savedProductIds}
        products={products}
        onRemoveSave={handleToggleSave}
        onOpenProduct={(prod) => setSelectedProduct(prod)}
        onClearAll={() => setSavedProductIds([])}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={products}
        onOpenProduct={(prod) => setSelectedProduct(prod)}
      />

      <UgcModal
        isOpen={ugcModalOpen}
        onClose={() => setUgcModalOpen(false)}
        onSubmitLook={handleAddCommunityLook}
      />

      <DropModal
        isOpen={dropModalOpen}
        onClose={() => setDropModalOpen(false)}
      />
    </div>
  );
}
