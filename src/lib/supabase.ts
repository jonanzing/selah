import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. CMS features will be disabled until configured.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

export type SiteSetting = {
  key: string;
  value: string;
};

export type Metric = {
  id: string;
  label: string;
  value: string;
  suffix?: string;
};

export type Asset = {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'svg';
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  status: 'draft' | 'published';
  created_at: string;
};

export type BibleContent = {
  id: string;
  reference: string;
  text: string;
  type: 'verse_of_day' | 'devotional';
  date: string;
};
