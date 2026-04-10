'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// ── Types ─────────────────────────────────────────────────────────────────────

export type CreatePostData = {
  community_slug: string
  type: 'lend' | 'give' | 'request' | 'skill'
  title: string
  description: string
  icon_key: string
  category: string
  condition?: string
  urgency?: string
  direction?: string
  availability_note?: string
  pickup_notes?: string // stored in availability_note for GIVE type
}

// ── Action ────────────────────────────────────────────────────────────────────

export async function createPost(data: CreatePostData): Promise<{ error: string } | never> {
  const supabase = await createClient()

  // 1. Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'You must be signed in to post.' }
  }

  // 2. Find community_id from slug
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: community, error: communityError } = await (supabase as any)
    .from('communities')
    .select('id, slug')
    .eq('slug', data.community_slug)
    .single()

  if (communityError || !community) {
    return { error: 'Community not found.' }
  }

  // 3. Verify user is an active member
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: membership, error: memberError } = await (supabase as any)
    .from('community_members')
    .select('id, status')
    .eq('community_id', community.id)
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  if (memberError || !membership) {
    return { error: 'You are not an active member of this community.' }
  }

  // 4. Build availability_note: GIVE uses pickup_notes, SKILL uses availability_note
  const availabilityNote =
    data.type === 'give'
      ? (data.pickup_notes ?? null)
      : (data.availability_note ?? null)

  // 5. Insert post
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: post, error: insertError } = await (supabase as any)
    .from('posts')
    .insert({
      community_id: community.id,
      user_id: user.id,
      type: data.type,
      title: data.title.trim(),
      description: data.description.trim(),
      icon_key: data.icon_key,
      category: data.category,
      condition: data.condition ?? null,
      urgency: data.urgency ?? null,
      direction: data.direction ?? null,
      availability_note: availabilityNote,
      status: 'active',
    })
    .select('id')
    .single()

  if (insertError || !post) {
    return { error: 'Something went wrong. Please try again.' }
  }

  // 5. Fire-and-forget notification trigger
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL
    if (appUrl) {
      fetch(`${appUrl}/api/notify/new-post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: post.id, community_id: community.id }),
      }).catch(() => {
        // Intentionally ignored — notification failure must not block the user
      })
    }
  } catch {
    // Intentionally ignored
  }

  // 6. Redirect to feed
  redirect(`/feed?community=${data.community_slug}`)
}
