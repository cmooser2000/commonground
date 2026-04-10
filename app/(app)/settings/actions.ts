'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { NotificationPreference } from '@/lib/types/database'

// ── Update profile ────────────────────────────────────────────────────────────

export async function updateProfile(data: {
  display_name: string
  neighborhood: string
  bio?: string
  phone?: string
}) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Not authenticated')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('users')
    .update({
      display_name: data.display_name.trim(),
      neighborhood: data.neighborhood.trim(),
      bio: data.bio?.trim() || null,
      phone: data.phone?.trim() || null,
    })
    .eq('id', user.id)

  if (error) {
    throw new Error(error.message)
  }
}

// ── Update notification preference ───────────────────────────────────────────

export async function updateNotificationPreference(
  pref: NotificationPreference
) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Not authenticated')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('users')
    .update({ notification_preference: pref })
    .eq('id', user.id)

  if (error) {
    throw new Error(error.message)
  }
}

// ── Sign out ──────────────────────────────────────────────────────────────────

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
