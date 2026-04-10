import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { Community } from '@/lib/types/database'
import CommunityNav from '@/components/CommunityNav'
import NewPostButton from '@/components/NewPostButton'
import Footer from '@/components/Footer'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // 1. Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // 2. Check onboarding_complete
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile } = await (supabase as any)
    .from('users')
    .select('id, display_name, neighborhood, onboarding_complete')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.onboarding_complete) {
    redirect('/onboarding')
  }

  // 3. Fetch communities the user is an active member of
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: memberRows } = await (supabase as any)
    .from('community_members')
    .select('communities ( id, name, slug, description, location_label, is_listed, created_by, created_at )')
    .eq('user_id', user.id)
    .eq('status', 'active')

  const communities: Community[] = (memberRows ?? [])
    .map((row: { communities: Community | null }) => row.communities)
    .filter((c: Community | null): c is Community => c !== null)

  const displayName: string = profile.display_name ?? ''
  const avatarLetter = displayName.charAt(0).toUpperCase() || '?'
  const defaultSlug = communities[0]?.slug ?? ''

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* ── Top nav ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
          {/* Wordmark */}
          <Link
            href="/feed"
            className="flex-shrink-0 text-lg font-bold text-terracotta tracking-tight hover:opacity-80 transition-opacity"
          >
            CommonGround
          </Link>

          {/* Community switcher */}
          <div className="flex-1 flex items-center">
            <Suspense fallback={<div className="h-9 w-40 rounded-xl bg-gray-100 animate-pulse" />}>
              <CommunityNav
                communities={communities.map((c) => ({
                  id: c.id,
                  name: c.name,
                  slug: c.slug,
                }))}
                defaultSlug={defaultSlug}
              />
            </Suspense>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Suspense fallback={
              <div className="rounded-xl bg-terracotta text-white text-sm font-semibold px-4 py-2 opacity-80">
                ＋ New post
              </div>
            }>
              <NewPostButton />
            </Suspense>

            {/* Avatar / profile link */}
            <Link
              href={`/profile/${user.id}`}
              className="w-8 h-8 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-sm font-bold text-terracotta hover:bg-terracotta/20 transition"
              aria-label="Your profile"
            >
              {avatarLetter}
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        {communities.length === 0 ? (
          <NoCommunities />
        ) : (
          children
        )}
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  )
}

function NoCommunities() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-5xl mb-4">🏘️</div>
      <h2 className="text-2xl font-bold text-charcoal mb-2">
        You&apos;re not in any communities yet
      </h2>
      <p className="text-gray-500 text-sm max-w-sm mb-6">
        Join a neighborhood group to start sharing and borrowing with your
        community.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/community/new"
          className="rounded-xl bg-terracotta text-white font-semibold px-6 py-3 text-sm hover:bg-terracotta/90 transition"
        >
          Start a community
        </Link>
        <Link
          href="/"
          className="rounded-xl border border-gray-200 bg-white text-charcoal font-semibold px-6 py-3 text-sm hover:bg-gray-50 transition"
        >
          Find a community
        </Link>
      </div>
    </div>
  )
}
