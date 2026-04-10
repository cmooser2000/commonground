'use server'

import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/types/database'

type UserInsert = Database['public']['Tables']['users']['Insert']

export async function completeOnboarding(data: {
  display_name: string
  neighborhood: string
  bio?: string
  phone?: string
  notification_preference: 'instant' | 'digest' | 'never'
}): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated. Please log in again.' }
  }

  const payload: UserInsert = {
    id: user.id,
    display_name: data.display_name,
    neighborhood: data.neighborhood,
    bio: data.bio ?? null,
    phone: data.phone ?? null,
    notification_preference: data.notification_preference,
    onboarding_complete: true,
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: upsertError } = await (supabase as any)
    .from('users')
    .upsert(payload, { onConflict: 'id' })

  if (upsertError) {
    return { error: upsertError.message }
  }

  return { error: null }
}
