'use client'

import { useState, useTransition } from 'react'
import type { User, NotificationPreference } from '@/lib/types/database'
import NotificationPrefPicker from '@/components/NotificationPrefPicker'
import { updateProfile, updateNotificationPreference, signOut } from './actions'

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  profile: User
  email: string
}

// ── Saved confirmation ────────────────────────────────────────────────────────

function SavedBadge({ visible }: { visible: boolean }) {
  return (
    <span
      className={[
        'text-sm font-medium text-sage transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0',
      ].join(' ')}
      aria-live="polite"
    >
      Saved!
    </span>
  )
}

// ── Section wrapper ───────────────────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-lg font-bold text-charcoal mb-5">{title}</h2>
      {children}
    </section>
  )
}

// ── Label + input helper ──────────────────────────────────────────────────────

function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-charcoal">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  )
}

const inputCls =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition'

// ── Main client component ─────────────────────────────────────────────────────

export default function SettingsClient({ profile, email }: Props) {
  // Personal info state
  const [displayName, setDisplayName] = useState(profile.display_name ?? '')
  const [neighborhood, setNeighborhood] = useState(profile.neighborhood ?? '')
  const [bio, setBio] = useState(profile.bio ?? '')
  const [phone, setPhone] = useState(profile.phone ?? '')
  const [profileSaved, setProfileSaved] = useState(false)

  // Notification pref state
  const [notifPref, setNotifPref] = useState<NotificationPreference>(
    profile.notification_preference ?? 'instant'
  )
  const [notifSaved, setNotifSaved] = useState(false)

  const [isPending, startTransition] = useTransition()

  // ── Handlers ────────────────────────────────────────────────────────────────

  function flashSaved(setter: (v: boolean) => void) {
    setter(true)
    setTimeout(() => setter(false), 2000)
  }

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      try {
        await updateProfile({ display_name: displayName, neighborhood, bio, phone })
        flashSaved(setProfileSaved)
      } catch (err) {
        console.error(err)
      }
    })
  }

  function handleNotifChange(pref: NotificationPreference) {
    setNotifPref(pref)
    startTransition(async () => {
      try {
        await updateNotificationPreference(pref)
        flashSaved(setNotifSaved)
      } catch (err) {
        console.error(err)
      }
    })
  }

  function handleSignOut() {
    startTransition(async () => {
      await signOut()
    })
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6 pb-12">
      <h1 className="text-2xl font-bold text-charcoal">Settings</h1>

      {/* ── Section 1: Personal Info ────────────────────────────────────── */}
      <Section title="Personal info">
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
          <Field label="Display name">
            <input
              type="text"
              className={inputCls}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              required
            />
          </Field>

          <Field label="Neighborhood / area">
            <input
              type="text"
              className={inputCls}
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder="e.g. North Portland"
              required
            />
          </Field>

          <Field label="Bio" hint="Optional — introduce yourself to your community.">
            <textarea
              className={`${inputCls} resize-none`}
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A little about yourself…"
            />
          </Field>

          <Field
            label="Phone number"
            hint="Optional — only shared with neighbors you choose to connect with."
          >
            <input
              type="tel"
              className={inputCls}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. (503) 555-0100"
            />
          </Field>

          <div className="flex items-center gap-4 pt-1">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-terracotta text-white font-semibold text-sm px-6 py-2.5 hover:bg-terracotta/90 active:bg-terracotta/80 disabled:opacity-60 transition"
            >
              Save changes
            </button>
            <SavedBadge visible={profileSaved} />
          </div>
        </form>
      </Section>

      {/* ── Section 2: Notification Preferences ─────────────────────────── */}
      <Section title="Notifications">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">
            How would you like to hear about new posts?
          </p>
          <NotificationPrefPicker
            value={notifPref}
            onChange={handleNotifChange}
          />
          <div className="h-5 flex items-center">
            <SavedBadge visible={notifSaved} />
          </div>
        </div>
      </Section>

      {/* ── Section 3: Account ───────────────────────────────────────────── */}
      <Section title="Account">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-charcoal">
              Email address
            </span>
            <div className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed select-none">
              {email}
            </div>
            <p className="text-xs text-gray-400">
              Email address cannot be changed here.
            </p>
          </div>

          <div className="pt-1 border-t border-gray-100">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isPending}
              className="rounded-xl border border-gray-200 bg-white text-charcoal font-semibold text-sm px-6 py-2.5 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-60 transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </Section>
    </div>
  )
}
