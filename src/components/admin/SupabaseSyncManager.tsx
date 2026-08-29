import React, { useState, useEffect } from 'react';
import {
  Database,
  Key,
  Globe,
  Check,
  AlertCircle,
  Copy,
  RefreshCw,
  UploadCloud,
  DownloadCloud,
  Code,
  ShieldCheck,
  Zap,
  ExternalLink
} from 'lucide-react';
import {
  isSupabaseConfigured,
  getSupabaseUrl,
  getSupabaseAnonKey,
  saveSupabaseCredentials,
  getSupabase
} from '../../lib/supabase';
import {
  SUPABASE_SQL_SCHEMA,
  syncBatchToSupabase,
  fetchFromSupabase,
  upsertToSupabase
} from '../../lib/supabaseSync';
import { Product, InstagramPost, ReelItem, Campaign, CommunityLook, BrandConfig } from '../../types';

interface SupabaseSyncManagerProps {
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
  onShowToast: (msg: string) => void;
}

export const SupabaseSyncManager: React.FC<SupabaseSyncManagerProps> = ({
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
  onShowToast,
}) => {
  const [supabaseUrl, setSupabaseUrl] = useState(getSupabaseUrl());
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(getSupabaseAnonKey());
  const [isConnected, setIsConnected] = useState(isSupabaseConfigured());
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    setIsConnected(isSupabaseConfigured());
  }, [supabaseUrl, supabaseAnonKey]);

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseCredentials(supabaseUrl, supabaseAnonKey);
    setIsConnected(isSupabaseConfigured());
    onShowToast('Supabase settings updated');
    handleTestConnection();
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    const client = getSupabase();
    if (!client) {
      setTestResult({
        success: false,
        message: 'Invalid URL or Key. Please check the credentials format.',
      });
      setIsTesting(false);
      return;
    }

    try {
      // Test querying or verifying connection
      const { data, error } = await client.from('products').select('count', { count: 'exact', head: true });
      if (error) {
        if (error.code === '42P01') {
          // Table doesn't exist yet
          setTestResult({
            success: true,
            message: 'Connected to Supabase! (Note: Run the SQL Schema below to create tables).',
          });
        } else {
          setTestResult({
            success: false,
            message: `Supabase returned: ${error.message} (Code: ${error.code})`,
          });
        }
      } else {
        setTestResult({
          success: true,
          message: 'Connection verified! Supabase database is online and reachable.',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Failed to reach Supabase project.',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handlePushAllToSupabase = async () => {
    if (!isSupabaseConfigured()) {
      alert('Please configure your Supabase URL and Anon Key first.');
      return;
    }

    setIsSyncing(true);
    try {
      await syncBatchToSupabase('products', products);
      await syncBatchToSupabase('reels', reels);
      await syncBatchToSupabase('campaigns', campaigns);
      await syncBatchToSupabase('community_looks', communityLooks);
      await syncBatchToSupabase('instagram_posts', instagramPosts);
      await upsertToSupabase('brand_config', { id: 'default-config', ...brandConfig });

      onShowToast('Successfully synced all brand data to Supabase!');
      setTestResult({
        success: true,
        message: `Synced ${products.length} products, ${reels.length} reels, ${campaigns.length} campaigns to Supabase.`,
      });
    } catch (err: any) {
      console.error(err);
      onShowToast('Failed to push data to Supabase.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handlePullAllFromSupabase = async () => {
    if (!isSupabaseConfigured()) {
      alert('Please configure your Supabase URL and Anon Key first.');
      return;
    }

    setIsSyncing(true);
    try {
      const dbProducts = await fetchFromSupabase<Product>('products');
      const dbReels = await fetchFromSupabase<ReelItem>('reels');
      const dbCampaigns = await fetchFromSupabase<Campaign>('campaigns');
      const dbLooks = await fetchFromSupabase<CommunityLook>('community_looks');
      const dbPosts = await fetchFromSupabase<InstagramPost>('instagram_posts');

      let pulledCount = 0;
      if (dbProducts && dbProducts.length > 0) {
        onUpdateProducts(dbProducts);
        pulledCount += dbProducts.length;
      }
      if (dbReels && dbReels.length > 0) {
        onUpdateReels(dbReels);
      }
      if (dbCampaigns && dbCampaigns.length > 0) {
        onUpdateCampaigns(dbCampaigns);
      }
      if (dbLooks && dbLooks.length > 0) {
        onUpdateCommunityLooks(dbLooks);
      }
      if (dbPosts && dbPosts.length > 0) {
        onUpdateInstagramPosts(dbPosts);
      }

      onShowToast('Successfully pulled latest data from Supabase!');
      setTestResult({
        success: true,
        message: `Pulled latest records from Supabase into application state.`,
      });
    } catch (err: any) {
      console.error(err);
      onShowToast('Failed to pull from Supabase.');
    } finally {
      setIsSyncing(false);
    }
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    onShowToast('Copied Supabase SQL schema to clipboard');
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#151515] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
              <Database size={24} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-editorial-serif text-2xl text-white uppercase">
                  SUPABASE CLOUD DATABASE
                </h3>
                {isConnected ? (
                  <span className="px-2.5 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 rounded-full text-[10px] font-mono-code flex items-center space-x-1">
                    <ShieldCheck size={11} />
                    <span>CONNECTED</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 bg-[#222] text-[#888] rounded-full text-[10px] font-mono-code">
                    OFFLINE / LOCAL STORAGE
                  </span>
                )}
              </div>
              <p className="text-xs font-mono-code text-[#888] mt-1">
                Real-time PostgreSQL persistence for Products, Reels, Orders, and Campaigns.
              </p>
            </div>
          </div>

          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#202020] hover:bg-[#2a2a2a] text-white rounded-xl text-xs font-mono-code uppercase tracking-wider flex items-center space-x-2 border border-[#333] transition-colors self-start sm:self-auto"
          >
            <span>SUPABASE DASHBOARD</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Credentials Configuration Form */}
      <div className="bg-[#151515] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h4 className="font-editorial-serif text-lg text-white uppercase flex items-center space-x-2">
            <Key size={18} className="text-emerald-400" />
            <span>PROJECT CREDENTIALS & API CONNECTION</span>
          </h4>
          <p className="text-xs font-mono-code text-[#888]">
            Configure your Supabase Project URL and public Anon Key. Credentials are securely stored and utilized for real-time cloud sync.
          </p>
        </div>

        <form onSubmit={handleSaveCredentials} className="space-y-4">
          <div>
            <label className="text-[10px] font-mono-code uppercase text-[#aaa] block mb-1.5 flex items-center space-x-1.5">
              <Globe size={12} />
              <span>SUPABASE PROJECT URL (e.g. https://xxxx.supabase.co)</span>
            </label>
            <input
              type="url"
              placeholder="https://your-project-id.supabase.co"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              className="w-full bg-[#0c0c0c] border border-[#2a2a2a] rounded-xl px-4 py-3 text-xs font-mono-code text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono-code uppercase text-[#aaa] block mb-1.5 flex items-center space-x-1.5">
              <Key size={12} />
              <span>SUPABASE PUBLIC / ANON API KEY</span>
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={supabaseAnonKey}
              onChange={(e) => setSupabaseAnonKey(e.target.value)}
              className="w-full bg-[#0c0c0c] border border-[#2a2a2a] rounded-xl px-4 py-3 text-xs font-mono-code text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono-code uppercase tracking-wider font-semibold transition-all shadow-lg"
              >
                SAVE CREDENTIALS
              </button>

              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting || !supabaseUrl || !supabaseAnonKey}
                className="px-5 py-2.5 bg-[#222] hover:bg-[#333] disabled:opacity-50 text-[#E5E5E5] rounded-xl text-xs font-mono-code uppercase tracking-wider transition-colors flex items-center space-x-1.5 border border-[#333]"
              >
                {isTesting ? <RefreshCw size={13} className="animate-spin" /> : <Zap size={13} />}
                <span>TEST CONNECTION</span>
              </button>
            </div>

            {testResult && (
              <div
                className={`px-4 py-2 rounded-xl text-xs font-mono-code flex items-center space-x-2 ${
                  testResult.success
                    ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300'
                    : 'bg-red-950/50 border border-red-500/40 text-red-300'
                }`}
              >
                {testResult.success ? <Check size={14} /> : <AlertCircle size={14} />}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Real-time Cloud Sync Actions */}
      <div className="bg-[#151515] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="space-y-1">
          <h4 className="font-editorial-serif text-lg text-white uppercase flex items-center space-x-2">
            <RefreshCw size={18} className="text-emerald-400" />
            <span>DATA SYNCHRONIZATION</span>
          </h4>
          <p className="text-xs font-mono-code text-[#888]">
            Push current live store products and reels into your Supabase Postgres database, or pull the latest cloud snapshot.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-[#0c0c0c] border border-[#222] rounded-2xl space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono-code uppercase text-emerald-400 font-semibold">
                UPLOAD LOCAL TO SUPABASE
              </span>
              <h5 className="font-editorial-serif text-base text-white uppercase">
                PUSH CURRENT STORE STATE
              </h5>
              <p className="text-[11px] font-mono-code text-[#888] leading-relaxed">
                Sends {products.length} products, {reels.length} reels, and all brand settings directly into your Supabase database.
              </p>
            </div>
            <button
              type="button"
              onClick={handlePushAllToSupabase}
              disabled={isSyncing}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono-code uppercase tracking-wider font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg"
            >
              <UploadCloud size={15} />
              <span>{isSyncing ? 'SYNCING...' : 'PUSH STORE TO SUPABASE'}</span>
            </button>
          </div>

          <div className="p-5 bg-[#0c0c0c] border border-[#222] rounded-2xl space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono-code uppercase text-blue-400 font-semibold">
                DOWNLOAD SUPABASE TO LOCAL
              </span>
              <h5 className="font-editorial-serif text-base text-white uppercase">
                PULL CLOUD STATE
              </h5>
              <p className="text-[11px] font-mono-code text-[#888] leading-relaxed">
                Fetches latest products, reels, and orders stored in Supabase and replaces local state.
              </p>
            </div>
            <button
              type="button"
              onClick={handlePullAllFromSupabase}
              disabled={isSyncing}
              className="w-full py-3 bg-[#222] hover:bg-[#333] text-white border border-[#333] rounded-xl text-xs font-mono-code uppercase tracking-wider font-semibold transition-all flex items-center justify-center space-x-2 shadow"
            >
              <DownloadCloud size={15} />
              <span>{isSyncing ? 'SYNCING...' : 'PULL FROM SUPABASE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* SQL Table Creation Script */}
      <div className="bg-[#151515] border border-[#222] rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="font-editorial-serif text-lg text-white uppercase flex items-center space-x-2">
              <Code size={18} className="text-emerald-400" />
              <span>AUTOMATIC SUPABASE SQL SCHEMA</span>
            </h4>
            <p className="text-xs font-mono-code text-[#888]">
              Copy and execute this script in your Supabase SQL Editor to set up all tables and security policies with 1 click.
            </p>
          </div>

          <button
            type="button"
            onClick={copySqlToClipboard}
            className="px-4 py-2 bg-[#222] hover:bg-white hover:text-black border border-[#333] text-[#E5E5E5] rounded-xl text-xs font-mono-code uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow"
          >
            {copiedSql ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copiedSql ? 'COPIED SQL!' : 'COPY SQL'}</span>
          </button>
        </div>

        <div className="relative bg-[#090909] border border-[#222] rounded-2xl p-4 overflow-x-auto max-h-64 font-mono text-[11px] text-[#ccc] leading-relaxed">
          <pre>{SUPABASE_SQL_SCHEMA}</pre>
        </div>
      </div>
    </div>
  );
};
