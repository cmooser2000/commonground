'use client'

import { useState, useTransition } from 'react'
import { updateCommunity } from '../actions'
import type { Community } from '@/lib/types/database'

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition'

const textareaClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition resize-none'

const labelClass = 'block text-sm font-medium text-charcoal mb-1.5'

export default function CommunitySettingsSection({
  community,
}: {
  community: Community
}) {
  const [name, setName] = useState(community.name)
  const [description, setDescription] = useState(community.description)
  const [locationLabel, setLocationLabel] = useState(community.location_label)
  const [isListed, setIsListed] = useState(community.is_listed)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const isValid =
    name.trim().length > 0 &&
    description.trim().length > 0 &&
    locationLabel.trim().length > 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    setError(null)
    setSuccess(false)

    startTransition(async () => {
      const result = await updateCommunity(
        community.id,
        {
          name: name.trim(),
          description: description.trim(),
          location_label: locationLabel.trim(),
          is_listed: isListed,
        },
        community.slug
      )
      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    })
  }

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-6">
      <h2 className="text-lg font-semibold text-charcoal mb-4">
        Community Settings
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="settings-name" className={labelClass}>
            Community name <span className="text-terracotta">*</span>
          </label>
          <input
            id="settings-name"
            type="text"
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="settings-description" className={labelClass}>
            Description <span className="text-terracotta">*</span>
          </label>
          <textarea
            id="settings-description"
            rows={4}
            className={textareaClass}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="settings-location" className={labelClass}>
            Location / area <span className="text-terracotta">*</span>
          </label>
          <input
            id="settings-location"
            type="text"
            className={inputClass}
            value={locationLabel}
            onChange={(e) => setLocationLabel(e.target.value)}
            required
          />
        </div>

        <div>
          <span className={labelClass}>Visibility</span>
          <div className="flex rounded-xl border border-gray-200 overflow-hidden text-sm font-medium">
            <button
              type="button"
              onClick={() => setIsListed(true)}
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
              onClick={() => setIsListed(false)}
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
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        {success && (
          <p className="text-sm text-sage bg-sage/10 border border-sage/20 rounded-lg px-4 py-2">
            Settings saved successfully.
          </p>
        )}

        <button
          type="submit"
          disabled={!isValid || isPending}
          className="self-start rounded-xl bg-terracotta text-white font-semibold py-2.5 px-6 text-sm hover:bg-terracotta/90 active:bg-terracotta/80 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isPending ? 'Saving…' : 'Save settings'}
        </button>
      </form>
    </section>
  )
}
