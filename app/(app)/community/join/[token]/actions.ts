'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function joinViaToken(token: string): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated.' }
  }

  // Fetch and validate the token
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: tokenRow, error: tokenError } = await (supabase as any)
    .from('invite_tokens')
    .select('id, community_id, expires_at, used_at')
    .eq('token', token)
    .single()

  if (tokenError || !tokenRow) {
    return { error: 'Invite link not found or already used.' }
  }

  if (tokenRow.used_at) {
    return { error: 'This invite link has already been used.' }
  }

  if (new Date(tokenRow.expires_at) < new Date()) {
    return { error: 'This invite link has expired.' }
  }

  // Check if already a member
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: existingMember } = await (supabase as any)
    .from('community_members')
    .select('id, status')
    .eq('community_id', tokenRow.community_id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existingMember) {
    // Already a member (active or pending) — just redirect
    redirect('/feed')
  }

  // Add user as active member
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: memberError } = await (supabase as any)
    .from('community_members')
    .insert({
      community_id: tokenRow.community_id,
      user_id: user.id,
      role: 'member',
      status: 'active',
    })

  if (memberError) {
    return { error: memberError.message }
  }

  // Mark token as used
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any)
    .from('invite_tokens')
    .update({ used_at: new Date().toISOString() })
    .eq('id', tokenRow.id)

  redirect('/feed')
}
