'use client'

import { useState, useTransition, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { requestToJoin } from './actions'

// We need to fetch community data client-side since this is a client component.
// We fetch via a simple API approach using the supabase client.
import { createClient } from '@/lib/supabase/client'
import type { Community } from '@/lib/types/database'

const textareaClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition resize-none'

const primaryBtn =
  'w-full rounded-xl bg-terracotta text-white font-semibold py-3 px-6 text-sm hover:bg-terracotta/90 active:bg-terracotta/80 transition disabled:opacity-40 disabled:cursor-not-allowed'

export default function RequestToJoinPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  const [community, setCommunity] = useState<Community | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(supabase as any)
      .from('communities')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data, error }: { data: Community | null; error: { message: string } | null }) => {
        if (error || !data) {
          setLoadError('Community not found.')
        } else {
          setCommunity(data)
        }
      })
  }, [slug])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!community) return
    setSubmitError(null)

    startTransition(async () => {
      const result = await requestToJoin(community.id, community.name, note)
      if (result.error) {
        setSubmitError(result.error)
      } else {
        setSubmitted(true)
      }
    })
  }

  // Loading state
  if (!community && !loadError) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading…</p>
      </div>
    )
  }

  // Not found
  if (loadError) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 text-center">
          <div className="text-4xl mb-4">🏘️</div>
          <h1 className="text-xl font-bold text-charcoal mb-2">
            Community not found
          </h1>
          <p className="text-sm text-gray-500">
            We couldn&apos;t find a community with that link.
          </p>
        </div>
      </div>
    )
  }

  // Success state
  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 text-center">
          <div className="text-4xl mb-4">✉️</div>
          <h1 className="text-xl font-bold text-charcoal mb-2">
            Request sent!
          </h1>
          <p className="text-sm text-gray-500">
            Your request has been sent! The admin will review it shortly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Community info */}
        <div className="mb-8">
          <p className="text-sm font-medium text-terracotta uppercase tracking-wide mb-1">
            Join request
          </p>
          <h1 className="text-3xl font-bold text-charcoal leading-snug">
            {community!.name}
          </h1>
          {community!.location_label && (
            <p className="text-sm text-gray-400 mt-1">
              {community!.location_label}
            </p>
          )}
          {community!.description && (
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              {community!.description}
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8 flex flex-col gap-6"
        >
          <div>
            <label
              htmlFor="note"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Add a note about yourself{' '}
              <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <textarea
              id="note"
              rows={4}
              className={textareaClass}
              placeholder="Tell the admin a bit about yourself and why you'd like to join…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {submitError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            className={primaryBtn}
            disabled={isPending}
          >
            {isPending ? 'Sending request…' : `Request to Join ${community!.name}`}
          </button>
        </form>
      </div>
    </div>
  )
}
