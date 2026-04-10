'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import NotificationPrefPicker from '@/components/NotificationPrefPicker'
import { completeOnboarding } from './actions'

type NotificationPref = 'instant' | 'digest' | 'never'

interface FormData {
  display_name: string
  neighborhood: string
  bio: string
  phone: string
  notification_preference: NotificationPref
}

// ── Progress dots ────────────────────────────────────────────────────────────

function ProgressDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={[
            'rounded-full transition-all duration-300',
            i + 1 === step
              ? 'w-6 h-2.5 bg-terracotta'
              : i + 1 < step
              ? 'w-2.5 h-2.5 bg-terracotta/40'
              : 'w-2.5 h-2.5 bg-gray-300',
          ].join(' ')}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">
        Step {step} of {total}
      </span>
    </div>
  )
}

// ── Shared input styles ───────────────────────────────────────────────────────

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition'

const textareaClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition resize-none'

const primaryBtn =
  'w-full rounded-xl bg-terracotta text-white font-semibold py-3 px-6 text-sm hover:bg-terracotta/90 active:bg-terracotta/80 transition disabled:opacity-40 disabled:cursor-not-allowed'

const outlineBtn =
  'w-full rounded-xl border-2 border-terracotta text-terracotta font-semibold py-3 px-6 text-sm hover:bg-terracotta/5 active:bg-terracotta/10 transition'

const ghostBtn =
  'w-full rounded-xl border border-gray-200 text-gray-500 font-medium py-3 px-6 text-sm hover:bg-gray-50 transition'

// ── Step 1 — Welcome + Name + Neighborhood ───────────────────────────────────

function Step1({
  data,
  onChange,
  onNext,
}: {
  data: Pick<FormData, 'display_name' | 'neighborhood'>
  onChange: (field: keyof FormData, value: string) => void
  onNext: () => void
}) {
  const canContinue =
    data.display_name.trim().length > 0 && data.neighborhood.trim().length > 0

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal leading-snug">
          Welcome to CommonGround 👋
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Let&apos;s set up your profile so neighbors know who you are.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="display_name"
            className="block text-sm font-medium text-charcoal mb-1.5"
          >
            Display name <span className="text-terracotta">*</span>
          </label>
          <input
            id="display_name"
            type="text"
            className={inputClass}
            placeholder="What should we call you?"
            value={data.display_name}
            onChange={(e) => onChange('display_name', e.target.value)}
            autoFocus
            autoComplete="name"
          />
        </div>

        <div>
          <label
            htmlFor="neighborhood"
            className="block text-sm font-medium text-charcoal mb-1.5"
          >
            Neighborhood / area <span className="text-terracotta">*</span>
          </label>
          <input
            id="neighborhood"
            type="text"
            className={inputClass}
            placeholder="e.g. East Side, Oak Park, Downtown"
            value={data.neighborhood}
            onChange={(e) => onChange('neighborhood', e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <button
        type="button"
        className={primaryBtn}
        disabled={!canContinue}
        onClick={onNext}
      >
        Continue →
      </button>
    </div>
  )
}

// ── Step 2 — Bio + Phone ─────────────────────────────────────────────────────

function Step2({
  data,
  onChange,
  onNext,
  onSkip,
}: {
  data: Pick<FormData, 'bio' | 'phone'>
  onChange: (field: keyof FormData, value: string) => void
  onNext: () => void
  onSkip: () => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal leading-snug">
          A little more about you
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Both optional — you can always add these later in Settings.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-charcoal mb-1.5"
          >
            Short bio
          </label>
          <textarea
            id="bio"
            rows={3}
            className={textareaClass}
            placeholder="e.g. Parent of 3, hobby carpenter, loves to cook"
            value={data.bio}
            onChange={(e) => onChange('bio', e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-charcoal mb-1.5"
          >
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            className={inputClass}
            placeholder="For direct contact when someone wants your stuff"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            autoComplete="tel"
          />
          <p className="mt-2 text-xs text-gray-400">
            Your phone is only shared when someone clicks &lsquo;I&apos;m
            interested&rsquo; on your post.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button type="button" className={primaryBtn} onClick={onNext}>
          Continue →
        </button>
        <button type="button" className={ghostBtn} onClick={onSkip}>
          Skip →
        </button>
      </div>
    </div>
  )
}

// ── Step 3 — Notification Preference ────────────────────────────────────────

function Step3({
  value,
  onChange,
  onNext,
  isPending,
  error,
}: {
  value: NotificationPref
  onChange: (v: NotificationPref) => void
  onNext: () => void
  isPending: boolean
  error: string | null
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal leading-snug">
          How should we notify you?
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          You can change this anytime in Settings.
        </p>
      </div>

      <NotificationPrefPicker value={value} onChange={onChange} />

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <button
        type="button"
        className={primaryBtn}
        onClick={onNext}
        disabled={isPending}
      >
        {isPending ? 'Saving…' : 'Continue →'}
      </button>
    </div>
  )
}

// ── Step 4 — All Set ─────────────────────────────────────────────────────────

function Step4() {
  return (
    <div className="flex flex-col gap-6 text-center">
      <div>
        <div className="text-5xl mb-4" aria-hidden="true">
          🎉
        </div>
        <h1 className="text-2xl font-bold text-charcoal leading-snug">
          You&apos;re all set!
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Welcome to CommonGround. Ready to find your people?
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Link href="/" className={primaryBtn + ' text-center block'}>
          Find a community to join
        </Link>
        <Link
          href="/community/new"
          className={outlineBtn + ' text-center block'}
        >
          Start your own community
        </Link>
      </div>
    </div>
  )
}

// ── Main onboarding page ─────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    display_name: '',
    neighborhood: '',
    bio: '',
    phone: '',
    notification_preference: 'instant',
  })
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function handleNotifChange(value: NotificationPref) {
    setFormData((prev) => ({ ...prev, notification_preference: value }))
  }

  function goToStep(n: number) {
    setStep(n)
  }

  async function handleCompleteOnboarding() {
    setServerError(null)
    startTransition(async () => {
      const result = await completeOnboarding({
        display_name: formData.display_name,
        neighborhood: formData.neighborhood,
        bio: formData.bio || undefined,
        phone: formData.phone || undefined,
        notification_preference: formData.notification_preference,
      })
      if (result.error) {
        setServerError(result.error)
      } else {
        setStep(4)
      }
    })
  }

  const TOTAL_STEPS = 4

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Progress dots — hidden on final "all set" screen */}
        {step < 4 && <ProgressDots step={step} total={TOTAL_STEPS - 1} />}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8">
          {step === 1 && (
            <Step1
              data={formData}
              onChange={handleChange}
              onNext={() => goToStep(2)}
            />
          )}

          {step === 2 && (
            <Step2
              data={formData}
              onChange={handleChange}
              onNext={() => goToStep(3)}
              onSkip={() => goToStep(3)}
            />
          )}

          {step === 3 && (
            <Step3
              value={formData.notification_preference}
              onChange={handleNotifChange}
              onNext={handleCompleteOnboarding}
              isPending={isPending}
              error={serverError}
            />
          )}

          {step === 4 && <Step4 />}
        </div>

        {/* Back link for steps 2 and 3 */}
        {step > 1 && step < 4 && (
          <button
            type="button"
            onClick={() => goToStep(step - 1)}
            className="mt-4 w-full text-center text-sm text-gray-400 hover:text-gray-600 transition"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  )
}
