'use server'

import { revalidatePath } from 'next/cache'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// ── Approve a pending join request ────────────────────────────────────────────

export async function approveRequest(
  memberId: string,
  communitySlug: string
): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const serviceClient = await createServiceClient()

  // Fetch the member row with user and community info
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: member, error: fetchError } = await (supabase as any)
    .from('community_members')
    .select(
      `id, user_id,
       communities ( name ),
       users ( display_name )`
    )
    .eq('id', memberId)
    .single()

  if (fetchError || !member) {
    return { error: fetchError?.message ?? 'Member not found.' }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: updateError } = await (supabase as any)
    .from('community_members')
    .update({ status: 'active' })
    .eq('id', memberId)

  if (updateError) {
    return { error: updateError.message }
  }

  // Look up the user's auth email for the approval notification
  try {
    const { data: authUser } = await serviceClient.auth.admin.getUserById(
      member.user_id
    )
    const email = authUser?.user?.email
    const communityName = member.communities?.name ?? 'the community'
    const displayName = member.users?.display_name ?? 'there'

    if (email) {
      await resend.emails.send({
        from: 'CommonGround <noreply@commonground.app>',
        to: email,
        subject: `You've been approved to join ${communityName}!`,
        text: `Hi ${displayName},\n\nGreat news — you've been approved to join ${communityName} on CommonGround!\n\nHead over to the app to start connecting with your neighbors.\n\nWelcome to the community,\nThe CommonGround team`,
      })
    }
  } catch {
    // Email failure shouldn't block the approval
  }

  revalidatePath(`/community/${communitySlug}/admin`)
  return { error: null }
}

// ── Deny a pending join request ───────────────────────────────────────────────

export async function denyRequest(
  memberId: string,
  communitySlug: string
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('community_members')
    .delete()
    .eq('id', memberId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/community/${communitySlug}/admin`)
  return { error: null }
}

// ── Remove an active member ───────────────────────────────────────────────────

export async function removeMember(
  memberId: string,
  communitySlug: string
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('community_members')
    .delete()
    .eq('id', memberId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/community/${communitySlug}/admin`)
  return { error: null }
}

// ── Promote a member to admin ─────────────────────────────────────────────────

export async function promoteToAdmin(
  memberId: string,
  communitySlug: string
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('community_members')
    .update({ role: 'admin' })
    .eq('id', memberId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/community/${communitySlug}/admin`)
  return { error: null }
}

// ── Update community settings ─────────────────────────────────────────────────

export async function updateCommunity(
  communityId: string,
  data: {
    name: string
    description: string
    location_label: string
    is_listed: boolean
  },
  communitySlug: string
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('communities')
    .update({
      name: data.name.trim(),
      description: data.description.trim(),
      location_label: data.location_label.trim(),
      is_listed: data.is_listed,
    })
    .eq('id', communityId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/community/${communitySlug}/admin`)
  return { error: null }
}

// ── Generate a new invite token ───────────────────────────────────────────────

export async function generateNewInviteToken(
  communityId: string,
  communitySlug: string
): Promise<{ token: string | null; error: string | null }> {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { token: null, error: 'Not authenticated.' }
  }

  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any).from('invite_tokens').insert({
    token,
    community_id: communityId,
    created_by: user.id,
    expires_at: expiresAt,
  })

  if (error) {
    return { token: null, error: error.message }
  }

  revalidatePath(`/community/${communitySlug}/admin`)
  return { token, error: null }
}
