import Link from 'next/link'
import type { Post, User } from '@/lib/types/database'
import { CATEGORY_MAP } from '@/components/icons'
import TypeBadge from '@/components/TypeBadge'

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  post: Post & { user: Pick<User, 'display_name' | 'neighborhood'> }
  communitySlug: string
}

// ── Time helper ───────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffMs = now - then

  if (diffMs < 0) return 'just now'

  const diffSeconds = Math.floor(diffMs / 1000)
  if (diffSeconds < 60) return 'just now'

  const diffMinutes = Math.floor(diffSeconds / 60)
  if (diffMinutes < 60) {
    return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`
  }

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`
  }

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 30) {
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`
  }

  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths < 12) {
    return diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`
  }

  const diffYears = Math.floor(diffMonths / 12)
  return diffYears === 1 ? '1 year ago' : `${diffYears} years ago`
}

// ── Status badge ──────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<string, string> = {
  claimed: 'Claimed',
  fulfilled: 'Fulfilled',
  lent: 'Lent out',
}

function StatusBadge({ status }: { status: string }) {
  const label = STATUS_LABELS[status]
  if (!label) return null

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-gray-100 text-gray-500">
      {label}
    </span>
  )
}

// ── Icon tile ─────────────────────────────────────────────────────────────────

function IconTile({
  category,
  iconKey,
}: {
  category: string
  iconKey: string
}) {
  const categoryEntry = CATEGORY_MAP[category]
  const iconEntry = categoryEntry?.icons.find((i) => i.key === iconKey)
  const bgColor = categoryEntry?.bgColor ?? '#E5E7EB'

  if (!iconEntry) {
    // Placeholder square
    return (
      <div
        className="flex-shrink-0 rounded-xl"
        style={{ width: 56, height: 56, backgroundColor: bgColor }}
      />
    )
  }

  const Icon = iconEntry.component

  return (
    <div className="flex-shrink-0">
      <Icon size={56} bgColor={bgColor} />
    </div>
  )
}

// ── PostCard ──────────────────────────────────────────────────────────────────

export default function PostCard({ post, communitySlug }: Props) {
  const isInactive = post.status !== 'active'
  const isUrgent = post.urgency === 'urgent'

  const firstName = post.user.display_name?.split(' ')[0] ?? 'Someone'
  const neighborhood = post.user.neighborhood

  return (
    <Link
      href={`/post/${post.id}?community=${communitySlug}`}
      className={[
        'group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden',
        isInactive ? 'opacity-75' : '',
        isUrgent ? 'border-l-4' : '',
      ].join(' ')}
      style={isUrgent ? { borderLeftColor: '#C1502E' } : undefined}
    >
      <div className="flex items-start gap-4 p-4">
        {/* Icon tile */}
        <IconTile category={post.category} iconKey={post.icon_key} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Badges row */}
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <TypeBadge type={post.type} />
            {isInactive && <StatusBadge status={post.status} />}
          </div>

          {/* Title */}
          <h3
            className={[
              'text-sm font-bold text-charcoal leading-snug truncate group-hover:text-terracotta transition-colors',
            ].join(' ')}
          >
            {post.title}
          </h3>

          {/* Meta: first name + neighborhood + time */}
          <p className="text-xs text-gray-400 mt-1 truncate">
            {firstName}
            {neighborhood ? ` · ${neighborhood}` : ''}
            {' · '}
            {timeAgo(post.created_at)}
          </p>
        </div>
      </div>
    </Link>
  )
}
