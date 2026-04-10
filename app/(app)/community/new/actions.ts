'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/types/database'

type CommunityInsert = Database['public']['Tables']['communities']['Insert']

export interface CreateCommunityData {
  name: string
  slug: string
  description: string
  location_label: string
  is_listed: boolean
}

export async function createCommunity(
  data: CreateCommunityData
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated. Please log in again.' }
  }

  const communityPayload: CommunityInsert = {
    name: data.name.trim(),
    slug: data.slug.trim(),
    description: data.description.trim(),
    location_label: data.location_label.trim(),
    is_listed: data.is_listed,
    created_by: user.id,
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: community, error: communityError } = await (supabase as any)
    .from('communities')
    .insert(communityPayload)
    .select('id, slug')
    .single()

  if (communityError) {
    if (communityError.code === '23505') {
      return { error: 'That slug is already taken. Please choose a different one.' }
    }
    return { error: communityError.message }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: memberError } = await (supabase as any)
    .from('community_members')
    .insert({
      community_id: community.id,
      user_id: user.id,
      role: 'admin',
      status: 'active',
    })

  if (memberError) {
    return { error: memberError.message }
  }

  redirect(`/community/${community.slug}/admin`)
}

export async function generateInviteToken(
  communityId: string
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

  return { token, error: null }
}
