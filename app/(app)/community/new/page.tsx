'use client'

import { useState, useTransition } from 'react'
import { createCommunity } from './actions'
import type { CreateCommunityData } from './actions'

// ── Shared styles ─────────────────────────────────────────────────────────────

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition'

const textareaClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition resize-none'

const labelClass = 'block text-sm font-medium text-charcoal mb-1.5'

const primaryBtn =
  'w-full rounded-xl bg-terracotta text-white font-semibold py-3 px-6 text-sm hover:bg-terracotta/90 active:bg-terracotta/80 transition disabled:opacity-40 disabled:cursor-not-allowed'

// ── Slug generator ────────────────────────────────────────────────────────────

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// ── Privacy toggle ────────────────────────────────────────────────────────────

function PrivacyToggle({
  isListed,
  onChange,
}: {
  isListed: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex rounded-xl border border-gray-200 overflow-hidden text-sm font-medium">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={[
          'flex-1 py-3 px-4 transition',
          isListed
            ? 'bg-sage text-white'
            : 'bg-white text-gray-500 hover:bg-gray-50',
        ].join(' ')}
      >
        Listed in directory
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={[
          'flex-1 py-3 px-4 transition border-l border-gray-200',
          !isListed
            ? 'bg-charcoal text-white'
            : 'bg-white text-gray-500 hover:bg-gray-50',
        ].join(' ')}
      >
        Unlisted (invite only)
      </button>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function NewCommunityPage() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugEdited, setSlugEdited] = useState(false)
  const [description, setDescription] = useState('')
  const [locationLabel, setLocationLabel] = useState('')
  const [isListed, setIsListed] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleNameChange(value: string) {
    setName(value)
    if (!slugEdited) {
      setSlug(toSlug(value))
    }
  }

  function handleSlugChange(value: string) {
    setSlugEdited(true)
    setSlug(toSlug(value))
  }

  const isValid =
    name.trim().length > 0 &&
    slug.length > 0 &&
    description.trim().length > 0 &&
    locationLabel.trim().length > 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return

    setError(null)
    const data: CreateCommunityData = {
      name: name.trim(),
      slug,
      description: description.trim(),
      location_label: locationLabel.trim(),
      is_listed: isListed,
    }

    startTransition(async () => {
      const result = await createCommunity(data)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="min-h-screen bg-cream flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-charcoal leading-snug">
            Start a community
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Create a space for your neighborhood, building, or group to share
            and support each other.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8 flex flex-col gap-6"
        >
          {/* Community name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Community name <span className="text-terracotta">*</span>
            </label>
            <input
              id="name"
              type="text"
              className={inputClass}
              placeholder="e.g. Riverside Neighbors, Elm Street Block"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              autoFocus
              autoComplete="off"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className={labelClass}>
              Community URL <span className="text-terracotta">*</span>
            </label>
            <div className="flex items-center gap-0 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-terracotta/40 focus-within:border-terracotta transition overflow-hidden">
              <span className="bg-gray-50 text-gray-400 text-sm px-3 py-3 border-r border-gray-200 whitespace-nowrap select-none">
                commonground.app/community/
              </span>
              <input
                id="slug"
                type="text"
                className="flex-1 bg-white px-3 py-3 text-sm text-charcoal placeholder-gray-400 focus:outline-none"
                placeholder="your-slug"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <p className="mt-1.5 text-xs text-gray-400">
              Only lowercase letters, numbers, and hyphens.
            </p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={labelClass}>
              Description <span className="text-terracotta">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              className={textareaClass}
              placeholder="What is this community about? Who should join?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Location label */}
          <div>
            <label htmlFor="location_label" className={labelClass}>
              Location / area <span className="text-terracotta">*</span>
            </label>
            <input
              id="location_label"
              type="text"
              className={inputClass}
              placeholder="e.g. East Nashville, TN"
              value={locationLabel}
              onChange={(e) => setLocationLabel(e.target.value)}
              autoComplete="off"
              required
            />
            <p className="mt-1.5 text-xs text-gray-400">
              Shown to members so they know where this community is based.
            </p>
          </div>

          {/* Privacy */}
          <div>
            <span className={labelClass}>Visibility</span>
            <PrivacyToggle isListed={isListed} onChange={setIsListed} />
            <p className="mt-1.5 text-xs text-gray-400">
              {isListed
                ? 'Anyone can find and request to join this community.'
                : 'Only people with an invite link can join.'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={primaryBtn}
            disabled={!isValid || isPending}
          >
            {isPending ? 'Creating…' : 'Create community →'}
          </button>
        </form>
      </div>
    </div>
  )
}
