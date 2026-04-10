import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import type { Database, Community } from '@/lib/types/database'
import Footer from '@/components/Footer'

type CommunityWithCount = Community & { member_count: number }

async function getListedCommunities(): Promise<CommunityWithCount[]> {
  try {
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: communities } = await (supabase as any)
      .from('communities')
      .select('*')
      .eq('is_listed', true)
      .order('created_at', { ascending: false })

    if (!communities || communities.length === 0) return []

    const withCounts = await Promise.all(
      communities.map(async (community: Community) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { count } = await (supabase as any)
          .from('community_members')
          .select('id', { count: 'exact', head: true })
          .eq('community_id', community.id)
          .eq('status', 'active')

        return { ...community, member_count: count ?? 0 }
      })
    )

    return withCounts
  } catch {
    return []
  }
}

const EXAMPLE_TILES = [
  { emoji: '🔨', label: 'Borrow a tool' },
  { emoji: '💡', label: 'Share a skill' },
  { emoji: '📦', label: 'Give it away' },
  { emoji: '🙋', label: 'Ask for help' },
]

function CommunityCard({ community }: { community: CommunityWithCount }) {
  const excerpt =
    community.description.length > 120
      ? community.description.slice(0, 117) + '…'
      : community.description

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div>
        <h3 className="font-bold text-charcoal text-base leading-tight">
          {community.name}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          📍 {community.location_label}
          {' · '}
          {community.member_count}{' '}
          {community.member_count === 1 ? 'member' : 'members'}
        </p>
      </div>
      {excerpt && (
        <p className="text-sm text-gray-600 leading-relaxed flex-1">{excerpt}</p>
      )}
      <Link
        href={`/community/request/${community.slug}`}
        className="inline-flex items-center justify-center rounded-xl bg-terracotta text-white font-semibold text-sm px-5 py-2.5 hover:bg-terracotta/90 transition w-full"
      >
        Request to join
      </Link>
    </div>
  )
}

export default async function PublicHomePage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; error?: string }>
}) {
  const params = await searchParams
  if (params.code) {
    redirect(`/auth/callback?code=${params.code}`)
  }

  const communities = await getListedCommunities()

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-terracotta tracking-tight hover:opacity-80 transition-opacity">
            CommonGround
          </Link>
          <Link href="/login" className="inline-flex items-center rounded-xl border border-gray-200 bg-white text-charcoal text-sm font-semibold px-4 py-2 hover:bg-gray-50 transition">
            Sign in
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full">
        <section className="max-w-6xl mx-auto px-4 pt-16 pb-20 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal leading-tight tracking-tight max-w-3xl mx-auto">
            Share more.{' '}
            <span className="text-terracotta">Need less.</span>{' '}
            Know your neighbors.
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            CommonGround lets you lend tools, share skills, offer free stuff, and
            ask for help — right in your neighborhood, school, or community group.
            No ads. No algorithm. Just neighbors.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#communities" className="inline-flex items-center justify-center rounded-xl bg-terracotta text-white font-semibold text-base px-7 py-3.5 hover:bg-terracotta/90 transition w-full sm:w-auto">
              Find a community near you
            </a>
            <Link href="/login" className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white text-charcoal font-semibold text-base px-7 py-3.5 hover:bg-gray-50 transition w-full sm:w-auto">
              Start your own group
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            {EXAMPLE_TILES.map(({ emoji, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-5">
                <span className="text-3xl" aria-hidden="true">{emoji}</span>
                <span className="text-xs font-semibold text-charcoal text-center leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-gray-100" />

        <section id="communities" className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-charcoal">Communities near you</h2>
            <p className="text-gray-500 mt-2 text-base">Find a group in your neighborhood and start sharing.</p>
          </div>
          {communities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-5xl mb-4">🏘️</div>
              <p className="text-charcoal font-semibold text-lg mb-2">No communities yet — be the first to start one!</p>
              <p className="text-gray-500 text-sm max-w-sm mb-6">It only takes a minute to create a CommonGround for your block, school, or community.</p>
              <Link href="/login" className="inline-flex items-center rounded-xl bg-terracotta text-white font-semibold px-6 py-3 hover:bg-terracotta/90 transition">
                Create a community
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {communities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          )}
        </section>

        <div className="border-t border-gray-100" />

        <section className="max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="max-w-xl mx-auto">
            <div className="text-5xl mb-4">🌱</div>
            <h2 className="text-3xl font-extrabold text-charcoal leading-tight">Start your own CommonGround</h2>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              Create a private, invite-only community for your block, apartment building, school, faith group — anywhere neighbors know each other. It&apos;s free, takes two minutes, and makes a real difference.
            </p>
            <div className="mt-8">
              <Link href="/login" className="inline-flex items-center justify-center rounded-xl bg-terracotta text-white font-bold text-base px-8 py-3.5 hover:bg-terracotta/90 transition">
                Create a community
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
