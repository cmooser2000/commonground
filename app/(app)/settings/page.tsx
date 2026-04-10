import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { User } from '@/lib/types/database'
import SettingsClient from './SettingsClient'

// ── Server component: fetch profile then hand off ─────────────────────────────

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !authUser) {
    redirect('/login')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile } = await (supabase as any)
    .from('users')
    .select('id, display_name, neighborhood, bio, phone, notification_preference')
    .eq('id', authUser.id)
    .single()

  if (!profile) {
    redirect('/onboarding')
  }

  return (
    <SettingsClient
      profile={profile as User}
      email={authUser.email ?? ''}
    />
  )
}
