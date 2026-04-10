'use client'

import { useState } from 'react'
import type { PostType } from '@/lib/types/database'

// ── Props ─────────────────────────────────────────────────────────────────────

interface ContactRevealProps {
  postType: PostType
  posterFirstName: string
  posterEmail: string
  posterPhone: string | null
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ContactReveal({
  postType,
  posterFirstName,
  posterEmail,
  posterPhone,
}: ContactRevealProps) {
  const [revealed, setRevealed] = useState(false)

  const isLendOrGive = postType === 'lend' || postType === 'give'
  const buttonLabel = isLendOrGive ? "I'm interested" : 'I can help'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
      {!revealed ? (
        <>
          <p className="text-sm text-gray-500">
            Interested? Reach out to {posterFirstName} directly to coordinate.
          </p>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-terracotta text-white text-sm font-semibold px-5 py-3 hover:bg-terracotta/90 active:bg-terracotta/80 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
          >
            {buttonLabel}
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-charcoal">
            Reach out to {posterFirstName} directly:
          </p>

          <div className="flex flex-col gap-2">
            {/* Email */}
            <a
              href={`mailto:${posterEmail}`}
              className="inline-flex items-center gap-2.5 text-sm text-dusty-blue hover:text-dusty-blue/80 transition font-medium group"
            >
              <span className="text-base" aria-hidden>
                📧
              </span>
              <span className="underline underline-offset-2 group-hover:no-underline">
                {posterEmail}
              </span>
            </a>

            {/* Phone (only if set) */}
            {posterPhone && (
              <a
                href={`tel:${posterPhone}`}
                className="inline-flex items-center gap-2.5 text-sm text-dusty-blue hover:text-dusty-blue/80 transition font-medium group"
              >
                <span className="text-base" aria-hidden>
                  📞
                </span>
                <span className="underline underline-offset-2 group-hover:no-underline">
                  {posterPhone}
                </span>
              </a>
            )}
          </div>

          <p className="text-xs text-gray-400 border-t border-gray-100 pt-3">
            Coordination happens directly — CommonGround isn&apos;t involved after this point.
          </p>
        </div>
      )}
    </div>
  )
}
