import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Community, CommunityMember, User } from '@/lib/types/database'
import PendingRequestsSection from './_sections/PendingRequestsSection'
import MembersSection from './_sections/MembersSection'
import InviteLinkSection from './_sections/InviteLinkSection'
import CommunitySettingsSection from './_sections/CommunitySettingsSection'

// ── Types ─────────────────────────────────────────────────────────────────────

type MemberWithUser = CommunityMember & { users: Pick<User, 'display_name' | 'neighborhood'> }

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AdminPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // Fetch community
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: community, error: communityError } = await (supabase as any)
    .from('communities')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (communityError || !community) {
    redirect('/feed')
  }

  const communityData = community as Community

  // Check that current user is an admin of this community
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: selfMember } = await (supabase as any)
    .from('community_members')
    .select('id, role, user_id')
    .eq('community_id', communityData.id)
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  if (!selfMember || selfMember.role !== 'admin') {
    redirect('/feed')
  }

  // Fetch all members (active + pending) with user info
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: allMembers } = await (supabase as any)
    .from('community_members')
    .select('*, users ( display_name, neighborhood )')
    .eq('community_id', communityData.id)
    .order('created_at', { ascending: true })

  const members = (allMembers ?? []) as MemberWithUser[]
  const pendingMembers = members.filter((m) => m.status === 'pending')
  const activeMembers = members.filter((m) => m.status === 'active')

  // Fetch current (most recent unexpired, unused) invite token
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: tokenRows } = await (supabase as any)
    .from('invite_tokens')
    .select('token, expires_at')
    .eq('community_id', communityData.id)
    .is('used_at', null)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)

  const currentToken: string | null = tokenRows?.[0]?.token ?? null

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? 'https://commonground.app'

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-8">
        {/* Header */}
        <div>
          <p className="text-sm font-medium text-terracotta uppercase tracking-wide mb-1">
            Admin Panel
          </p>
          <h1 className="text-3xl font-bold text-charcoal">{communityData.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{communityData.location_label}</p>
        </div>

        {/* Sections */}
        <PendingRequestsSection
          pending={pendingMembers}
          communitySlug={params.slug}
        />

        <MembersSection
          members={activeMembers}
          currentUserId={user.id}
          communitySlug={params.slug}
        />

        <InviteLinkSection
          communityId={communityData.id}
          communitySlug={params.slug}
          currentToken={currentToken}
          appUrl={appUrl}
        />

        <CommunitySettingsSection
          community={communityData}
        />

        {/* Danger Zone */}
        <section className="bg-white rounded-2xl border border-red-100 px-6 py-6">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-500">
            Community deletion is not yet available. If you need to remove this
            community, please contact support.
          </p>
        </section>
      </div>
    </div>
  )
}
