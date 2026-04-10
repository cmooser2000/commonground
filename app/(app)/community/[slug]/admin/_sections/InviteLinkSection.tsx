'use client'

import { useState, useTransition } from 'react'
import { generateNewInviteToken } from '../actions'

export default function InviteLinkSection({
  communityId,
  communitySlug,
  currentToken,
  appUrl,
}: {
  communityId: string
  communitySlug: string
  currentToken: string | null
  appUrl: string
}) {
  const [token, setToken] = useState<string | null>(currentToken)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const inviteUrl = token ? `${appUrl}/community/join/${token}` : null

  function handleCopy() {
    if (!inviteUrl) return
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleGenerate() {
    setError(null)
    startTransition(async () => {
      const result = await generateNewInviteToken(communityId, communitySlug)
      if (result.error) {
        setError(result.error)
      } else if (result.token) {
        setToken(result.token)
      }
    })
  }

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-6">
      <h2 className="text-lg font-semibold text-charcoal mb-1">Invite Link</h2>
      <p className="text-sm text-gray-400 mb-4">
        Share this link to invite people directly. Links expire after 7 days and
        can only be used once.
      </p>

      {inviteUrl ? (
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200 mb-3">
          <p className="flex-1 text-sm text-charcoal font-mono truncate">
            {inviteUrl}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="flex-shrink-0 rounded-lg bg-dusty-blue text-white text-xs font-semibold px-3 py-2 hover:bg-dusty-blue/90 transition"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-400 mb-3">
          No active invite link. Generate one below.
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-3">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleGenerate}
        disabled={isPending}
        className="rounded-xl border-2 border-terracotta text-terracotta font-semibold text-sm px-4 py-2.5 hover:bg-terracotta/5 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isPending ? 'Generating…' : 'Generate new link'}
      </button>
    </section>
  )
}
