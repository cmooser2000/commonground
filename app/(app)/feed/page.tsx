import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Post, User } from '@/lib/types/database'
import PostCard from '@/components/PostCard'

// ── Types ─────────────────────────────────────────────────────────────────────

type PostWithUser = Post & {
  user: Pick<User, 'display_name' | 'neighborhood'>
}

type PostType = 'lend' | 'give' | 'request' | 'skill' | 'all'

interface FeedSearchParams {
  community?: string
  type?: string
  active?: string
  q?: string
}

interface FeedPageProps {
  searchParams: Promise<FeedSearchParams>
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function FeedPage({ searchParams }: FeedPageProps) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const params = await searchParams

  const communitySlug = params.community ?? ''
  const typeFilter = (params.type ?? 'all') as PostType
  const activeOnly = params.active === 'true'
  const searchQuery = params.q ?? ''

  // 1. Resolve the community by slug
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: communityRow } = await (supabase as any)
    .from('communities')
    .select('id, name, slug')
    .eq('slug', communitySlug)
    .single()

  if (!communityRow) {
    redirect('/feed')
  }

  // 2. Verify the user is an active member of this community
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: membership } = await (supabase as any)
    .from('community_members')
    .select('id')
    .eq('community_id', communityRow.id)
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  if (!membership) {
    redirect('/feed')
  }

  // 3. Build posts query
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query = (supabase as any)
    .from('posts')
    .select('*, users ( display_name, neighborhood )')
    .eq('community_id', communityRow.id)
    .order('created_at', { ascending: false })

  if (typeFilter !== 'all') {
    query = query.eq('type', typeFilter)
  }

  if (activeOnly) {
    query = query.eq('status', 'active')
  }

  if (searchQuery.trim()) {
    const q = `%${searchQuery.trim()}%`
    query = query.or(`title.ilike.${q},description.ilike.${q}`)
  }

  const { data: postRows } = await query

  const posts: PostWithUser[] = (postRows ?? []).map(
    (row: Post & { users: Pick<User, 'display_name' | 'neighborhood'> | null }) => ({
      ...row,
      user: row.users ?? { display_name: 'Unknown', neighborhood: '' },
    })
  )

  // ── Render ─────────────────────────────────────────────────────────────────

  const filterTabs: { label: string; value: PostType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Lend', value: 'lend' },
    { label: 'Give', value: 'give' },
    { label: 'Request', value: 'request' },
    { label: 'Skill', value: 'skill' },
  ]

  function buildHref(overrides: Partial<FeedSearchParams>) {
    const merged: FeedSearchParams = {
      community: communitySlug,
      type: typeFilter !== 'all' ? typeFilter : undefined,
      active: activeOnly ? 'true' : undefined,
      q: searchQuery || undefined,
      ...overrides,
    }
    const p = new URLSearchParams()
    if (merged.community) p.set('community', merged.community)
    if (merged.type && merged.type !== 'all') p.set('type', merged.type)
    if (merged.active) p.set('active', merged.active)
    if (merged.q) p.set('q', merged.q)
    return `/feed?${p.toString()}`
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ── Filter bar ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Type tabs */}
        <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-xl p-1 flex-wrap">
          {filterTabs.map(({ label, value }) => (
            <Link
              key={value}
              href={buildHref({ type: value })}
              className={[
                'px-3.5 py-1.5 rounded-lg text-sm font-medium transition',
                typeFilter === value
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'text-charcoal hover:bg-gray-50',
              ].join(' ')}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Active toggle */}
        <Link
          href={buildHref({ active: activeOnly ? undefined : 'true' })}
          className={[
            'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition',
            activeOnly
              ? 'bg-sage text-white border-sage'
              : 'bg-white text-charcoal border-gray-200 hover:bg-gray-50',
          ].join(' ')}
        >
          <span
            className={[
              'w-3.5 h-3.5 rounded-full border-2 flex-shrink-0',
              activeOnly
                ? 'bg-white border-white'
                : 'bg-transparent border-current',
            ].join(' ')}
          />
          Active only
        </Link>

        {/* Search */}
        <SearchInput
          defaultValue={searchQuery}
          communitySlug={communitySlug}
          typeFilter={typeFilter !== 'all' ? typeFilter : undefined}
          activeOnly={activeOnly}
        />
      </div>

      {/* ── Post grid ──────────────────────────────────────────────────── */}
      {posts.length === 0 ? (
        <EmptyState communitySlug={communitySlug} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              communitySlug={communitySlug}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Search input (client component boundary via form) ─────────────────────────

function SearchInput({
  defaultValue,
  communitySlug,
  typeFilter,
  activeOnly,
}: {
  defaultValue: string
  communitySlug: string
  typeFilter?: string
  activeOnly: boolean
}) {
  return (
    <form method="GET" action="/feed" className="flex-1 min-w-0">
      <input type="hidden" name="community" value={communitySlug} />
      {typeFilter && <input type="hidden" name="type" value={typeFilter} />}
      {activeOnly && <input type="hidden" name="active" value="true" />}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder="Search posts…"
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition"
        />
      </div>
    </form>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ communitySlug }: { communitySlug: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4">📭</div>
      <h2 className="text-xl font-bold text-charcoal mb-2">
        Nothing here yet
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Be the first to post something for your community!
      </p>
      <Link
        href={`/new-post?community=${communitySlug}`}
        className="inline-flex items-center gap-1.5 rounded-xl bg-terracotta text-white text-sm font-semibold px-5 py-2.5 hover:bg-terracotta/90 transition"
      >
        <span>＋</span> New post
      </Link>
    </div>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="6.5"
        cy="6.5"
        r="4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M9.5 9.5L13.5 13.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
