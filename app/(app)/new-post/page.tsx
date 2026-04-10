'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import IconPicker from '@/components/IconPicker'
import { createPost } from './actions'
import type { PostType } from '@/lib/types/database'

// ── Post type config ──────────────────────────────────────────────────────────

type TypeOption = {
  value: PostType
  emoji: string
  label: string
  tagline: string
}

const TYPE_OPTIONS: TypeOption[] = [
  { value: 'lend', emoji: '📦', label: 'LEND', tagline: 'I have this, you can borrow it' },
  { value: 'give', emoji: '🎁', label: 'GIVE', tagline: 'Free, come get it' },
  { value: 'request', emoji: '🙋', label: 'REQUEST', tagline: 'Does anyone have this?' },
  { value: 'skill', emoji: '⭐', label: 'SKILL', tagline: 'I can help or I need help' },
]

const CONDITION_OPTIONS = [
  { value: 'great', label: 'Great — like new' },
  { value: 'good', label: 'Good — normal wear' },
  { value: 'worn', label: 'Worn — but works' },
]

const URGENCY_OPTIONS = [
  { value: 'flexible', label: 'Flexible — no rush' },
  { value: 'within-a-week', label: 'Within a week' },
  { value: 'urgent', label: 'Urgent 🔴' },
]

const DIRECTION_OPTIONS = [
  { value: 'offered', label: "I'm offering this" },
  { value: 'needed', label: 'I need this' },
]

// ── Form state ────────────────────────────────────────────────────────────────

type IconValue = { category: string; iconKey: string } | null

type FormState = {
  type: PostType | null
  icon: IconValue
  title: string
  description: string
  condition: string
  urgency: string
  direction: string
  availabilityNote: string
  pickupNotes: string
}

type FieldErrors = Partial<Record<
  'type' | 'icon' | 'title' | 'description' | 'condition' | 'urgency' | 'direction',
  string
>>

// ── Validation ────────────────────────────────────────────────────────────────

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {}

  if (!form.type) {
    errors.type = 'Please choose a post type.'
  }

  if (!form.icon || !form.icon.iconKey) {
    errors.icon = 'Please choose an icon.'
  }

  if (!form.title.trim()) {
    errors.title = 'Title is required.'
  } else if (form.title.trim().length > 120) {
    errors.title = 'Title must be 120 characters or less.'
  }

  if (!form.description.trim()) {
    errors.description = 'Description is required.'
  }

  if ((form.type === 'lend' || form.type === 'give') && !form.condition) {
    errors.condition = 'Please select a condition.'
  }

  if (form.type === 'request' && !form.urgency) {
    errors.urgency = 'Please select an urgency level.'
  }

  if (form.type === 'skill' && !form.direction) {
    errors.direction = 'Please indicate whether you are offering or need this skill.'
  }

  return errors
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-terracotta font-medium">{message}</p>
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-charcoal mb-1.5">
      {children}
      {required && <span className="text-terracotta ml-0.5">*</span>}
    </label>
  )
}

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-charcoal text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition placeholder:text-gray-400'

const selectClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-charcoal text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition'

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NewPostPage() {
  const searchParams = useSearchParams()
  const communitySlug = searchParams.get('community') ?? ''

  const [form, setForm] = useState<FormState>({
    type: null,
    icon: null,
    title: '',
    description: '',
    condition: '',
    urgency: '',
    direction: '',
    availabilityNote: '',
    pickupNotes: '',
  })

  const [errors, setErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: val }))
    // Clear the error for this field on change
    if (key in errors) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key as keyof FieldErrors]
        return next
      })
    }
  }

  function handleTypeSelect(type: PostType) {
    set('type', type)
    // Reset type-specific fields when switching type
    setForm((prev) => ({
      ...prev,
      type,
      condition: '',
      urgency: '',
      direction: '',
      availabilityNote: '',
      pickupNotes: '',
    }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next.type
      delete next.condition
      delete next.urgency
      delete next.direction
      return next
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fieldErrors = validate(form)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      // Scroll to first error
      const firstKey = Object.keys(fieldErrors)[0]
      const el = document.getElementById(firstKey)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setErrors({})
    setServerError(null)

    startTransition(async () => {
      const result = await createPost({
        community_slug: communitySlug,
        type: form.type!,
        title: form.title,
        description: form.description,
        icon_key: form.icon!.iconKey,
        category: form.icon!.category,
        condition: form.condition || undefined,
        urgency: form.urgency || undefined,
        direction: form.direction || undefined,
        availability_note: form.availabilityNote || undefined,
        pickup_notes: form.pickupNotes || undefined,
      })

      // createPost redirects on success; if we get here, it returned an error
      if (result && 'error' in result) {
        setServerError(result.error)
      }
    })
  }

  const showForm = form.type !== null

  return (
    <div className="max-w-lg mx-auto py-2 px-0 sm:px-0">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6 px-1">
        <Link
          href={communitySlug ? `/feed?community=${communitySlug}` : '/feed'}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white text-charcoal hover:bg-gray-50 transition flex-shrink-0"
          aria-label="Back to feed"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-charcoal">Share something</h1>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">

        {/* ── Type selector ────────────────────────────────────────────── */}
        <div id="type">
          <p className="text-sm font-semibold text-charcoal mb-3">
            What kind of post is this?<span className="text-terracotta ml-0.5">*</span>
          </p>
          <div className="grid grid-cols-2 gap-3">
            {TYPE_OPTIONS.map((opt) => {
              const isSelected = form.type === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleTypeSelect(opt.value)}
                  className={[
                    'flex flex-col items-start gap-1 rounded-2xl border px-4 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta',
                    isSelected
                      ? 'bg-terracotta border-terracotta text-white shadow-md'
                      : 'bg-white border-gray-200 text-charcoal hover:border-terracotta/40 hover:shadow-sm',
                  ].join(' ')}
                >
                  <span className="text-2xl leading-none">{opt.emoji}</span>
                  <span className="font-bold text-sm tracking-wide">{opt.label}</span>
                  <span
                    className={[
                      'text-xs leading-snug',
                      isSelected ? 'text-white/80' : 'text-gray-400',
                    ].join(' ')}
                  >
                    {opt.tagline}
                  </span>
                </button>
              )
            })}
          </div>
          <FieldError message={errors.type} />
        </div>

        {/* ── Form fields (shown once type is selected) ────────────────── */}
        {showForm && (
          <>
            {/* Icon picker */}
            <div id="icon">
              <Label htmlFor="icon" required>Icon</Label>
              <IconPicker
                value={form.icon}
                onChange={(val) => set('icon', val)}
              />
              <FieldError message={errors.icon} />
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title" required>Title</Label>
              <input
                id="title"
                type="text"
                placeholder={
                  form.type === 'lend' ? 'e.g. Circular saw'
                  : form.type === 'give' ? 'e.g. Box of mason jars'
                  : form.type === 'request' ? 'e.g. Pressure washer'
                  : 'e.g. Help with moving furniture'
                }
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                maxLength={120}
                className={inputClass}
              />
              <FieldError message={errors.title} />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" required>Description</Label>
              <textarea
                id="description"
                rows={4}
                placeholder={
                  form.type === 'lend' ? 'Describe the item — any quirks, what it comes with, how to return it...'
                  : form.type === 'give' ? 'Describe what you are giving away...'
                  : form.type === 'request' ? 'Tell neighbors what you need and why...'
                  : 'Describe the skill you are offering or need...'
                }
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                className={`${inputClass} resize-none`}
              />
              <FieldError message={errors.description} />
            </div>

            {/* ── Type-specific fields ─────────────────────────────────── */}

            {/* LEND: condition */}
            {form.type === 'lend' && (
              <div id="condition">
                <Label htmlFor="condition-select" required>Condition</Label>
                <select
                  id="condition-select"
                  value={form.condition}
                  onChange={(e) => set('condition', e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select condition…</option>
                  {CONDITION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <FieldError message={errors.condition} />
              </div>
            )}

            {/* GIVE: condition + pickup notes */}
            {form.type === 'give' && (
              <>
                <div id="condition">
                  <Label htmlFor="condition-select" required>Condition</Label>
                  <select
                    id="condition-select"
                    value={form.condition}
                    onChange={(e) => set('condition', e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select condition…</option>
                    {CONDITION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <FieldError message={errors.condition} />
                </div>

                <div>
                  <Label htmlFor="pickup-notes">Pickup notes</Label>
                  <textarea
                    id="pickup-notes"
                    rows={3}
                    placeholder="e.g. Available weekends, message me first, on my porch…"
                    value={form.pickupNotes}
                    onChange={(e) => set('pickupNotes', e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </>
            )}

            {/* REQUEST: urgency */}
            {form.type === 'request' && (
              <div id="urgency">
                <Label htmlFor="urgency-select" required>Urgency</Label>
                <select
                  id="urgency-select"
                  value={form.urgency}
                  onChange={(e) => set('urgency', e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select urgency…</option>
                  {URGENCY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <FieldError message={errors.urgency} />
              </div>
            )}

            {/* SKILL: direction + availability */}
            {form.type === 'skill' && (
              <>
                <div id="direction">
                  <Label htmlFor="direction-select" required>Direction</Label>
                  <select
                    id="direction-select"
                    value={form.direction}
                    onChange={(e) => set('direction', e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select…</option>
                    {DIRECTION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <FieldError message={errors.direction} />
                </div>

                <div>
                  <Label htmlFor="availability-note">Availability notes</Label>
                  <textarea
                    id="availability-note"
                    rows={3}
                    placeholder="e.g. Evenings and weekends work best for me…"
                    value={form.availabilityNote}
                    onChange={(e) => set('availabilityNote', e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </>
            )}

            {/* Server error */}
            {serverError && (
              <div className="rounded-xl bg-terracotta/10 border border-terracotta/20 px-4 py-3 text-sm text-terracotta font-medium">
                {serverError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-terracotta text-white font-bold text-base py-4 shadow-sm hover:bg-terracotta/90 active:bg-terracotta/80 disabled:opacity-60 disabled:cursor-not-allowed transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
            >
              {isPending ? 'Posting…' : 'Post it'}
            </button>
          </>
        )}
      </form>
    </div>
  )
}
