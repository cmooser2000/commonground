'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export interface CommunityNavCommunity {
  id: string
  name: string
  slug: string
}

interface CommunityNavProps {
  communities: CommunityNavCommunity[]
  defaultSlug?: string
}

export default function CommunityNav({
  communities,
  defaultSlug,
}: CommunityNavProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentSlug = searchParams.get('community') ?? defaultSlug ?? communities[0]?.slug ?? ''
  const current = communities.find((c) => c.slug === currentSlug)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  function handleSelect(slug: string) {
    setOpen(false)
    router.push(`/feed?community=${slug}`)
  }

  function handleNew() {
    setOpen(false)
    router.push('/community/new')
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-charcoal hover:bg-gray-50 transition max-w-[220px]"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate flex-1 text-left">
          {current?.name ?? 'Select community'}
        </span>
        <ChevronIcon open={open} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-64 bg-white border border-gray-100 rounded-2xl shadow-lg py-1.5 z-50">
          {communities.length === 0 && (
            <p className="px-4 py-3 text-sm text-gray-400">
              No communities yet.
            </p>
          )}

          {communities.map((community) => (
            <button
              key={community.id}
              type="button"
              onClick={() => handleSelect(community.slug)}
              className={[
                'w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm transition',
                community.slug === currentSlug
                  ? 'bg-cream text-terracotta font-semibold'
                  : 'text-charcoal hover:bg-gray-50',
              ].join(' ')}
            >
              {/* Avatar dot */}
              <span
                className={[
                  'w-2 h-2 rounded-full flex-shrink-0',
                  community.slug === currentSlug
                    ? 'bg-terracotta'
                    : 'bg-gray-300',
                ].join(' ')}
              />
              <span className="truncate">{community.name}</span>
              {community.slug === currentSlug && (
                <CheckIcon className="ml-auto flex-shrink-0 text-terracotta" />
              )}
            </button>
          ))}

          {/* Divider */}
          {communities.length > 0 && (
            <div className="my-1.5 border-t border-gray-100" />
          )}

          {/* New community */}
          <button
            type="button"
            onClick={handleNew}
            className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm text-sage font-medium hover:bg-gray-50 transition"
          >
            <span className="text-lg leading-none">＋</span>
            <span>New community</span>
          </button>
        </div>
      )}
    </div>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={[
        'flex-shrink-0 text-gray-400 transition-transform',
        open ? 'rotate-180' : '',
      ].join(' ')}
    >
      <path
        d="M2 4L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 7L5.5 10.5L12 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
