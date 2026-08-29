import { getSupabase, isSupabaseConfigured } from './supabase';
import { Product, InstagramPost, ReelItem, Campaign, CommunityLook, BrandConfig } from '../types';

/**
 * SQL table definitions reference for users configuring their Supabase DB:
 * 
 * CREATE TABLE IF NOT EXISTS products (
 *   id TEXT PRIMARY KEY,
 *   data JSONB NOT NULL,
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
 * );
 * 
 * CREATE TABLE IF NOT EXISTS reels (
 *   id TEXT PRIMARY KEY,
 *   data JSONB NOT NULL,
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
 * );
 * 
 * CREATE TABLE IF NOT EXISTS campaigns (
 *   id TEXT PRIMARY KEY,
 *   data JSONB NOT NULL,
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
 * );
 * 
 * CREATE TABLE IF NOT EXISTS community_looks (
 *   id TEXT PRIMARY KEY,
 *   data JSONB NOT NULL,
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
 * );
 * 
 * CREATE TABLE IF NOT EXISTS instagram_posts (
 *   id TEXT PRIMARY KEY,
 *   data JSONB NOT NULL,
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
 * );
 * 
 * CREATE TABLE IF NOT EXISTS brand_config (
 *   id TEXT PRIMARY KEY,
 *   data JSONB NOT NULL,
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
 * );
 * 
 * CREATE TABLE IF NOT EXISTS orders (
 *   id TEXT PRIMARY KEY,
 *   data JSONB NOT NULL,
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
 * );
 */

export const SUPABASE_SQL_SCHEMA = `-- FEATOUS Database Schema for Supabase
-- Run this in your Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS reels (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS community_looks (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS instagram_posts (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS brand_config (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) and allow public read/write for demo client
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_looks ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public full access products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access reels" ON reels FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access campaigns" ON campaigns FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access community_looks" ON community_looks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access instagram_posts" ON instagram_posts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access brand_config" ON brand_config FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access orders" ON orders FOR ALL USING (true) WITH CHECK (true);
`;

export async function fetchFromSupabase<T>(table: string): Promise<T[] | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from(table)
      .select('data')
      .order('updated_at', { ascending: false });

    if (error) {
      console.warn(`Supabase fetch warning for [${table}]:`, error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data.map((item) => item.data as T);
    }
    return [];
  } catch (err) {
    console.error(`Supabase error on ${table}:`, err);
    return null;
  }
}

export async function fetchSingleFromSupabase<T>(table: string, id: string): Promise<T | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from(table)
      .select('data')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.warn(`Supabase single fetch warning [${table}/${id}]:`, error.message);
      return null;
    }

    return data ? (data.data as T) : null;
  } catch (err) {
    console.error(`Supabase error on ${table}/${id}:`, err);
    return null;
  }
}

export async function upsertToSupabase<T extends { id: string }>(table: string, item: T): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from(table)
      .upsert({
        id: item.id,
        data: item,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    if (error) {
      console.error(`Supabase upsert error on [${table}]:`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`Supabase upsert exception [${table}]:`, err);
    return false;
  }
}

export async function syncBatchToSupabase<T extends { id: string }>(table: string, items: T[]): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const payload = items.map((item) => ({
      id: item.id,
      data: item,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from(table)
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.error(`Supabase batch sync error on [${table}]:`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`Supabase batch sync exception [${table}]:`, err);
    return false;
  }
}

export async function deleteFromSupabase(table: string, id: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Supabase delete error on [${table}/${id}]:`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`Supabase delete exception [${table}/${id}]:`, err);
    return false;
  }
}
