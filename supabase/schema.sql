-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

-- users (mirrors auth.users, populated via trigger)
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  neighborhood text not null,
  phone text,
  bio text,
  notification_preference text not null default 'instant'
    check (notification_preference in ('instant', 'digest', 'never')),
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now()
);

-- communities
create table public.communities (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text not null,
  location_label text not null,
  is_listed boolean not null default true,
  created_by uuid not null references public.users(id) on delete restrict,
  created_at timestamptz not null default now()
);

-- community_members
create table public.community_members (
  id uuid primary key default uuid_generate_v4(),
  community_id uuid not null references public.communities(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role text not null default 'member'
    check (role in ('member', 'admin')),
  status text not null default 'pending'
    check (status in ('pending', 'active')),
  request_note text,
  created_at timestamptz not null default now(),
  unique (community_id, user_id)
);

-- posts
create table public.posts (
  id uuid primary key default uuid_generate_v4(),
  community_id uuid not null references public.communities(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null
    check (type in ('lend', 'give', 'request', 'skill')),
  title text not null,
  description text not null,
  icon_key text not null,
  category text not null,
  condition text,
  urgency text,
  direction text,
  availability_note text,
  status text not null default 'active'
    check (status in ('active', 'claimed', 'fulfilled', 'lent')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- invite_tokens
create table public.invite_tokens (
  id uuid primary key default uuid_generate_v4(),
  token text not null unique,
  community_id uuid not null references public.communities(id) on delete cascade,
  created_by uuid not null references public.users(id) on delete cascade,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

-- ============================================================
-- TRIGGER: auto-create public.users row on auth.users insert
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, display_name, neighborhood)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', ''),
    coalesce(new.raw_user_meta_data->>'neighborhood', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- INDEXES
-- ============================================================

create index on public.community_members (community_id);
create index on public.community_members (user_id);
create index on public.posts (community_id);
create index on public.posts (user_id);
create index on public.posts (created_at desc);
create index on public.invite_tokens (token);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.users enable row level security;
alter table public.communities enable row level security;
alter table public.community_members enable row level security;
alter table public.posts enable row level security;
alter table public.invite_tokens enable row level security;

-- ----------------------------------------
-- users policies
-- ----------------------------------------

-- Anyone can read all user profiles
create policy "users: public read"
  on public.users for select
  using (true);

-- Users can only update their own row
create policy "users: self update"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ----------------------------------------
-- communities policies
-- ----------------------------------------

-- Anyone can read listed communities
create policy "communities: public read listed"
  on public.communities for select
  using (is_listed = true);

-- Members (active) can read unlisted communities they belong to
create policy "communities: members read unlisted"
  on public.communities for select
  using (
    is_listed = false
    and exists (
      select 1 from public.community_members cm
      where cm.community_id = communities.id
        and cm.user_id = auth.uid()
        and cm.status = 'active'
    )
  );

-- Authenticated users can create communities
create policy "communities: authenticated insert"
  on public.communities for insert
  with check (auth.uid() is not null and auth.uid() = created_by);

-- Admins can update their community
create policy "communities: admin update"
  on public.communities for update
  using (
    exists (
      select 1 from public.community_members cm
      where cm.community_id = communities.id
        and cm.user_id = auth.uid()
        and cm.role = 'admin'
        and cm.status = 'active'
    )
  )
  with check (
    exists (
      select 1 from public.community_members cm
      where cm.community_id = communities.id
        and cm.user_id = auth.uid()
        and cm.role = 'admin'
        and cm.status = 'active'
    )
  );

-- ----------------------------------------
-- community_members policies
-- ----------------------------------------

-- Active members can see other members in the same community
create policy "community_members: active members read"
  on public.community_members for select
  using (
    exists (
      select 1 from public.community_members cm
      where cm.community_id = community_members.community_id
        and cm.user_id = auth.uid()
        and cm.status = 'active'
    )
  );

-- Authenticated users can insert (join requests)
create policy "community_members: authenticated insert"
  on public.community_members for insert
  with check (auth.uid() is not null and auth.uid() = user_id);

-- Admins can update membership rows in their community
create policy "community_members: admin update"
  on public.community_members for update
  using (
    exists (
      select 1 from public.community_members cm
      where cm.community_id = community_members.community_id
        and cm.user_id = auth.uid()
        and cm.role = 'admin'
        and cm.status = 'active'
    )
  )
  with check (
    exists (
      select 1 from public.community_members cm
      where cm.community_id = community_members.community_id
        and cm.user_id = auth.uid()
        and cm.role = 'admin'
        and cm.status = 'active'
    )
  );

-- ----------------------------------------
-- posts policies
-- ----------------------------------------

-- Only active community members can see posts
create policy "posts: active members read"
  on public.posts for select
  using (
    exists (
      select 1 from public.community_members cm
      where cm.community_id = posts.community_id
        and cm.user_id = auth.uid()
        and cm.status = 'active'
    )
  );

-- Active members can insert posts in communities they belong to
create policy "posts: active members insert"
  on public.posts for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.community_members cm
      where cm.community_id = posts.community_id
        and cm.user_id = auth.uid()
        and cm.status = 'active'
    )
  );

-- Users can update their own posts
create policy "posts: owner update"
  on public.posts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Users can delete their own posts
create policy "posts: owner delete"
  on public.posts for delete
  using (auth.uid() = user_id);

-- Admins can delete any post in their community
create policy "posts: admin delete"
  on public.posts for delete
  using (
    exists (
      select 1 from public.community_members cm
      where cm.community_id = posts.community_id
        and cm.user_id = auth.uid()
        and cm.role = 'admin'
        and cm.status = 'active'
    )
  );

-- ----------------------------------------
-- invite_tokens policies
-- ----------------------------------------

-- Anyone can read invite tokens (needed for join flow)
create policy "invite_tokens: public read"
  on public.invite_tokens for select
  using (true);

-- Authenticated users can create invite tokens
create policy "invite_tokens: authenticated insert"
  on public.invite_tokens for insert
  with check (auth.uid() is not null and auth.uid() = created_by);

-- Community admins can update invite tokens (e.g. mark as used)
create policy "invite_tokens: admin update"
  on public.invite_tokens for update
  using (
    exists (
      select 1 from public.community_members cm
      where cm.community_id = invite_tokens.community_id
        and cm.user_id = auth.uid()
        and cm.role = 'admin'
        and cm.status = 'active'
    )
  )
  with check (
    exists (
      select 1 from public.community_members cm
      where cm.community_id = invite_tokens.community_id
        and cm.user_id = auth.uid()
        and cm.role = 'admin'
        and cm.status = 'active'
    )
  );
