import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve Supabase credentials from environment or runtime config
const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseInstance: SupabaseClient | null = null;

export const isSupabaseConfigured = (): boolean => {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  return Boolean(url && key && url.startsWith('http') && key.length > 10);
};

export const getSupabaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const localUrl = localStorage.getItem('featous_supabase_url');
    if (localUrl) return localUrl;
  }
  return envUrl;
};

export const getSupabaseAnonKey = (): string => {
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('featous_supabase_anon_key');
    if (localKey) return localKey;
  }
  return envAnonKey;
};

export const saveSupabaseCredentials = (url: string, key: string) => {
  if (typeof window !== 'undefined') {
    if (url) localStorage.setItem('featous_supabase_url', url.trim());
    else localStorage.removeItem('featous_supabase_url');

    if (key) localStorage.setItem('featous_supabase_anon_key', key.trim());
    else localStorage.removeItem('featous_supabase_anon_key');
    
    // Invalidate client instance
    supabaseInstance = null;
  }
};

export const getSupabase = (): SupabaseClient | null => {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();

  if (!url || !key || !url.startsWith('http')) {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  return supabaseInstance;
};
