'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { PostStatus } from '@/lib/types/database'

// ── updatePostStatus ──────────────────────────────────────────────────────────

export async function updatePostStatus(
  postId: string,
  status: PostStatus,
): Promise<{ error: string } | { success: true }> {
  const supabase = await createClient()

  // 1. Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // 2. Fetch the post to verify ownership
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: post, error: fetchError } = await (supabase as any)
    .from('posts')
    .select('id, user_id, status')
    .eq('id', postId)
    .single()

  if (fetchError || !post) {
    return { error: 'Post not found.' }
  }

  if (post.user_id !== user.id) {
    return { error: 'You do not have permission to update this post.' }
  }

  // 3. Update the status
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: updateError } = await (supabase as any)
    .from('posts')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', postId)

  if (updateError) {
    return { error: 'Failed to update post status. Please try again.' }
  }

  return { success: true }
}
