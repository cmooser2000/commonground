'use server'

import { createClient, createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function requestToJoin(
  communityId: string,
  communityName: string,
  note: string
): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const serviceClient = await createServiceClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated. Please log in first.' }
  }

  // Check if already a member or has a pending request
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: existing } = await (supabase as any)
    .from('community_members')
    .select('id, status')
    .eq('community_id', communityId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) {
    if (existing.status === 'active') {
      return { error: 'You are already a member of this community.' }
    }
    if (existing.status === 'pending') {
      return { error: 'You already have a pending request for this community.' }
    }
  }

  // Fetch current user profile for the notification email
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: userProfile } = await (supabase as any)
    .from('users')
    .select('display_name, neighborhood')
    .eq('id', user.id)
    .single()

  // Insert pending membership
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: insertError } = await (supabase as any)
    .from('community_members')
    .insert({
      community_id: communityId,
      user_id: user.id,
      role: 'member',
      status: 'pending',
      request_note: note.trim() || null,
    })

  if (insertError) {
    return { error: insertError.message }
  }

  // Notify all admins via email
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: adminMembers } = await (supabase as any)
      .from('community_members')
      .select('user_id')
      .eq('community_id', communityId)
      .eq('role', 'admin')
      .eq('status', 'active')

    if (adminMembers && adminMembers.length > 0) {
      const adminIds: string[] = adminMembers.map(
        (m: { user_id: string }) => m.user_id
      )

      // Look up each admin's email via the service client
      const emailPromises = adminIds.map(async (adminId) => {
        const { data: adminAuth } =
          await serviceClient.auth.admin.getUserById(adminId)
        return adminAuth?.user?.email ?? null
      })

      const adminEmails = (await Promise.all(emailPromises)).filter(
        Boolean
      ) as string[]

      const displayName = userProfile?.display_name ?? 'Someone'
      const neighborhood = userProfile?.neighborhood
        ? ` from ${userProfile.neighborhood}`
        : ''
      const trimmedNote = note.trim()
      const noteText = trimmedNote
        ? `\n\nTheir note: "${trimmedNote}"`
        : ''

      for (const email of adminEmails) {
        await resend.emails.send({
          from: 'CommonGround <noreply@commonground.app>',
          to: email,
          subject: `Someone wants to join ${communityName}`,
          text: `Hi,\n\n${displayName}${neighborhood} has requested to join ${communityName} on CommonGround.${noteText}\n\nHead to your admin panel to approve or deny the request.\n\n— The CommonGround team`,
        })
      }
    }
  } catch {
    // Email failure should not block the request submission
  }

  return { error: null }
}
