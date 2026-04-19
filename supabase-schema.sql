-- SELAH CMS DATABASE SCHEMA
-- Run this in your Supabase SQL Editor

-- 1. Site Settings (Global Text)
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Metrics (Waitlist numbers, etc)
create table if not exists public.metrics (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  suffix text,
  icon text,
  display_order int default 0
);

-- 3. Assets (Image URLs)
create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  url text not null,
  type text check (type in ('image', 'video', 'svg')),
  description text
);

-- 4. Blog Posts
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  cover_image text,
  status text check (status in ('draft', 'published')) default 'draft',
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  author_id uuid references auth.users(id)
);

-- 5. Bible & Content (Verses, Devotionals)
create table if not exists public.bible_content (
  id uuid primary key default gen_random_uuid(),
  reference text not null, -- e.g. "Psalm 23:1"
  text text not null,
  type text check (type in ('verse_of_day', 'devotional')) default 'verse_of_day',
  date date default current_date
);

-- Enable RLS (Row Level Security)
alter table public.site_settings enable row level security;
alter table public.metrics enable row level security;
alter table public.assets enable row level security;
alter table public.blog_posts enable row level security;
alter table public.bible_content enable row level security;

-- Policies: Anonymous read, Authenticated write for Admin
create policy "Public Read" on public.site_settings for select using (true);
create policy "Admin Write" on public.site_settings for all using (auth.role() = 'authenticated');

create policy "Public Read" on public.metrics for select using (true);
create policy "Admin Write" on public.metrics for all using (auth.role() = 'authenticated');

create policy "Public Read" on public.assets for select using (true);
create policy "Admin Write" on public.assets for all using (auth.role() = 'authenticated');

create policy "Public Read" on public.blog_posts for select using (true);
create policy "Admin Write" on public.blog_posts for all using (auth.role() = 'authenticated');

create policy "Public Read" on public.bible_content for select using (true);
-- 6. Hero Mockups (iPhone Screens)
create table if not exists public.mockups (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  url text not null,
  display_order int default 0,
  is_active boolean default true
);

-- Enable RLS
alter table public.mockups enable row level security;
alter table public.bible_content enable row level security;

-- Policies
create policy "Public Read" on public.mockups for select using (true);
create policy "Admin Write" on public.mockups for all using (auth.role() = 'authenticated');

create policy "Admin Write" on public.bible_content for all using (auth.role() = 'authenticated');

-- Seed Data for Global Settings
insert into public.site_settings (key, value) values 
('hero_title_part_1', 'The Word,'),
('hero_title_accent', 'alive in your'),
('hero_title_part_2', 'hands.'),
('hero_description', 'Selah is a bible app built for daily encounter to Transform your daily study into a shared journey. Track your streaks, join live prayer rooms, and unlock deeper scriptural insights with a beautifully designed, modern study workspace.');

-- Seed Data for Mockups
insert into public.mockups (label, url, display_order) values 
('Verse of the day', 'https://picsum.photos/seed/selah-1/800/1600', 1),
('Character study', 'https://picsum.photos/seed/selah-2/800/1600', 2),
('Reading habit', 'https://picsum.photos/seed/selah-3/800/1600', 3),
('Community feed', 'https://picsum.photos/seed/selah-4/800/1600', 4);

-- Seed Data for Metrics
insert into public.metrics (label, value, suffix, display_order) values 
('On the waitlist', '5', 'K+', 1),
('Verses in the Bible', '31', 'k', 2),
('To do it all', '1', 'app', 3);
