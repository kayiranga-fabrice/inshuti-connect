-- Run in Supabase SQL Editor to enable SMS tip signups from the website.
create table if not exists public.sms_subscribers (
  id uuid primary key default gen_random_uuid(),
  phone text not null unique,
  language text not null default 'en' check (language in ('en', 'rw')),
  source text default 'web',
  active boolean not null default true,
  subscribed_at timestamptz not null default now()
);

alter table public.sms_subscribers enable row level security;

-- Allow anonymous signups from the public site (insert only).
create policy "sms_subscribers_insert_anon"
  on public.sms_subscribers
  for insert
  to anon, authenticated
  with check (true);

-- Block public reads (admin/service role only).
create policy "sms_subscribers_no_public_select"
  on public.sms_subscribers
  for select
  to anon, authenticated
  using (false);
