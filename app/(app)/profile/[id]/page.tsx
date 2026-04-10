import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Post, User } from '@/lib/types/database'
import PostCard from '@/components/PostCard'

// ── Types ─────────────────────────────────────────────────────────────────────

type PostWithUser = Post & {
  user: Pick<User, 'display_name' | 'neighborhood'>
}

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

// ── Month helper ──────────────────────────────────────────────────────────────

function formatMemberSince(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

// ── Avatar initial tile ───────────────────────────────────────────────────────

function AvatarTile({ name }: { name: string }) {
  const letter = name?.charAt(0).toUpperCase() || '?'
  return (
    <div className="w-20 h-20 rounded-full bg-terracotta/10 border-2 border-terracotta/20 flex items-center justify-center text-3xl font-bold text-terracotta flex-shrink-0">
      {letter}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id: profileUserId } = await params

  const supabase = await createClient()

  // Get viewing user
  const {
    data: { user: viewingAuthUser },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !viewingAuthUser) {
    redirect('/login')
  }

  const isOwnProfile = viewingAuthUser.id === profileUserId

  // Fetch the profile being viewed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile } = await (supabase as any)
    .from('users')
    .select('id, display_name, neighborhood, bio, created_at')
    .eq('id', profileUserId)
    .single()

  if (!profile) {
    notFound()
  }

  // Get communities the VIEWING user is an active member of
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: viewerMemberships } = await (supabase as any)
    .from('community_members')
    .select('community_id')
    .eq('user_id', viewingAuthUser.id)
    .eq('status', 'active')

  const viewerCommunityIds: string[] = (viewerMemberships ?? []).map(
    (m: { community_id: string }) => m.community_id
  )

  // Get communities the PROFILE user is an active member of (for slug resolution)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profileMemberships } = await (supabase as any)
    .from('community_members')
    .select('community_id, communities ( slug )')
    .eq('user_id', profileUserId)
    .eq('status', 'active')

  // Communities visible to the viewer = intersection of both users' memberships
  const sharedCommunityIds = (profileMemberships ?? [])
    .map((m: { community_id: string }) => m.community_id)
    .filter((id: string) => viewerCommunityIds.includes(id))

  // Build a community_id → slug map
  const communitySlugMap = new Map<string, string>()
  for (const m of profileMemberships ?? []) {
    const slug = m.communities?.slug
    if (slug) communitySlugMap.set(m.community_id, slug)
  }

  // Fetch the profile user's active posts from shared communities
  let posts: PostWithUser[] = []

  if (sharedCommunityIds.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: postRows } = await (supabase as any)
      .from('posts')
      .select('*, users ( display_name, neighborhood )')
      .eq('user_id', profileUserId)
      .eq('status', 'active')
      .in('community_id', sharedCommunityIds)
      .order('created_at', { ascending: false })

    posts = (postRows ?? []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (row: any) => ({
        ...row,
        user: row.users ?? { display_name: profile.display_name, neighborhood: profile.neighborhood },
      })
    )
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8 pb-12">

      {/* ── Profile header ────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-start gap-5">
          <AvatarTile name={profile.display_name} />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold text-charcoal leading-tight">
                  {profile.display_name}
                </h1>
                {profile.neighborhood && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    📍 {profile.neighborhood}
                  </p>
                )}
              </div>

              {isOwnProfile && (
                <Link
                  href="/settings"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white text-charcoal text-sm font-semibold px-4 py-2 hover:bg-gray-50 transition flex-shrink-0"
                >
                  Edit profile
                </Link>
              )}
            </div>

            {profile.bio && (
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {profile.bio}
              </p>
            )}

            <p className="text-xs text-gray-400 mt-3">
              Member since {formatMemberSince(profile.created_at)}
            </p>
          </div>
        </div>
      </div>

      {/* ── Posts ─────────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-lg font-bold text-charcoal mb-4">
          {isOwnProfile ? 'Your posts' : 'Posts'}
        </h2>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-charcoal font-semibold mb-1">
              {isOwnProfile ? "You haven't posted anything yet" : 'No posts yet'}
            </p>
            {sharedCommunityIds.length === 0 && !isOwnProfile && (
              <p className="text-sm text-gray-400 max-w-xs mt-1">
                You can only see posts from communities you both belong to.
              </p>
            )}
            {isOwnProfile && (
              <Link
                href="/new-post"
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-terracotta text-white font-semibold text-sm px-5 py-2.5 hover:bg-terracotta/90 transition"
              >
                <span>＋</span> New post
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">
            {posts.map((post) => {
              const slug = communitySlugMap.get(post.community_id) ?? ''
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  communitySlug={slug}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
