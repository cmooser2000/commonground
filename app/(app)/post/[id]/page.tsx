import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Post, User } from '@/lib/types/database'
import { CATEGORY_MAP } from '@/components/icons'
import TypeBadge from '@/components/TypeBadge'
import ContactReveal from './ContactReveal'
import StatusManager from './StatusManager'

// ── Types ─────────────────────────────────────────────────────────────────────

type PostWithPoster = Post & {
  poster: Pick<User, 'display_name' | 'neighborhood' | 'phone'> & {
    email: string
  }
}

interface PostDetailPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ community?: string }>
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
  if (diffMinutes < 60)
    return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24)
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 30)
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`

  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths < 12)
    return diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`

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
  size,
}: {
  category: string
  iconKey: string
  size: number
}) {
  const categoryEntry = CATEGORY_MAP[category]
  const iconEntry = categoryEntry?.icons.find((i) => i.key === iconKey)
  const bgColor = categoryEntry?.bgColor ?? '#E5E7EB'

  if (!iconEntry) {
    return (
      <div
        className="flex-shrink-0 rounded-2xl"
        style={{ width: size, height: size, backgroundColor: bgColor }}
      />
    )
  }

  const Icon = iconEntry.component

  return (
    <div className="flex-shrink-0">
      <Icon size={size} bgColor={bgColor} />
    </div>
  )
}

// ── Condition badge ───────────────────────────────────────────────────────────

const CONDITION_LABELS: Record<string, { label: string; color: string }> = {
  'like-new': { label: 'Like new', color: 'bg-green-100 text-green-800' },
  good: { label: 'Good', color: 'bg-blue-100 text-blue-800' },
  fair: { label: 'Fair', color: 'bg-yellow-100 text-yellow-800' },
  worn: { label: 'Worn', color: 'bg-orange-100 text-orange-800' },
}

function ConditionBadge({ condition }: { condition: string | null }) {
  if (!condition) return null
  const config = CONDITION_LABELS[condition] ?? {
    label: condition,
    color: 'bg-gray-100 text-gray-600',
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${config.color}`}
    >
      {config.label}
    </span>
  )
}

// ── Urgency badge ─────────────────────────────────────────────────────────────

function UrgencyBadge({ urgency }: { urgency: string | null }) {
  if (urgency !== 'urgent') return null
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-terracotta text-white">
      Urgent
    </span>
  )
}

// ── Type-specific fields ──────────────────────────────────────────────────────

function TypeSpecificFields({ post }: { post: Post }) {
  if (post.type === 'lend') {
    return (
      <div className="flex flex-wrap gap-3 items-center">
        <ConditionBadge condition={post.condition} />
        {post.status === 'active' ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
            Available now
          </span>
        ) : post.status === 'lent' ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
            Currently lent out
          </span>
        ) : null}
      </div>
    )
  }

  if (post.type === 'give') {
    return (
      <div className="flex flex-col gap-2">
        <ConditionBadge condition={post.condition} />
        {post.availability_note && (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-charcoal">Pickup notes: </span>
            {post.availability_note}
          </p>
        )}
      </div>
    )
  }

  if (post.type === 'request') {
    return (
      <div className="flex flex-wrap gap-2">
        <UrgencyBadge urgency={post.urgency} />
      </div>
    )
  }

  if (post.type === 'skill') {
    return (
      <div className="flex flex-col gap-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-terracotta/10 text-terracotta w-fit">
          {post.direction === 'offered' ? 'Offering' : 'Needed'}
        </span>
        {post.availability_note && (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-charcoal">Availability: </span>
            {post.availability_note}
          </p>
        )}
      </div>
    )
  }

  return null
}

// ── Category label ────────────────────────────────────────────────────────────

function CategoryLabel({ category }: { category: string }) {
  const label = CATEGORY_MAP[category]?.label ?? category
  return (
    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
      {label}
    </span>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PostDetailPage({
  params,
  searchParams,
}: PostDetailPageProps) {
  const supabase = await createClient()

  // 1. Auth check
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const { id: postId } = await params
  const { community: communitySlug } = await searchParams

  // 2. Fetch post joined with poster's user data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: postRow, error: postError } = await (supabase as any)
    .from('posts')
    .select('*, users ( display_name, neighborhood, phone )')
    .eq('id', postId)
    .single()

  if (postError || !postRow) {
    redirect('/feed' + (communitySlug ? `?community=${communitySlug}` : ''))
  }

  // 3. Fetch poster's email from auth (they share the same id)
  // We use the anon client here — we only expose the email to the page owner
  // or other community members after interaction, not in a public route.
  // The service role isn't needed since we look up the viewer's own email via
  // auth.getUser() and for the poster we fetch via admin only if membership passes.
  // To keep things simple and avoid exposing service role on client path,
  // we use the service client only in the notify route. Here we fetch the
  // poster email via a profiles query — but email lives in auth.users, not public.
  // We therefore create a service client just for this lookup.
  const { createServiceClient } = await import('@/lib/supabase/server')
  const serviceSupabase = await createServiceClient()

  const { data: posterAuthUser } = await serviceSupabase.auth.admin.getUserById(
    postRow.user_id,
  )
  const posterEmail = posterAuthUser?.user?.email ?? ''

  // 4. Verify the viewing user is an active member of the post's community
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: membership } = await (supabase as any)
    .from('community_members')
    .select('id')
    .eq('community_id', postRow.community_id)
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  if (!membership) {
    redirect('/feed' + (communitySlug ? `?community=${communitySlug}` : ''))
  }

  // 5. Resolve community slug for back link
  let resolvedSlug = communitySlug ?? ''
  if (!resolvedSlug) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: community } = await (supabase as any)
      .from('communities')
      .select('slug')
      .eq('id', postRow.community_id)
      .single()
    resolvedSlug = community?.slug ?? ''
  }

  const post: PostWithPoster = {
    ...postRow,
    poster: {
      display_name: postRow.users?.display_name ?? 'Someone',
      neighborhood: postRow.users?.neighborhood ?? '',
      phone: postRow.users?.phone ?? null,
      email: posterEmail,
    },
  }

  const isOwner = user.id === post.user_id
  const firstName = post.poster.display_name.split(' ')[0] || 'Someone'
  const backHref = `/feed${resolvedSlug ? `?community=${resolvedSlug}` : ''}`

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      {/* Back link */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-charcoal transition-colors"
      >
        <span aria-hidden>←</span> Back to feed
      </Link>

      {/* Post card */}
      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header area */}
        <div className="p-6 flex items-start gap-5">
          {/* Large icon tile */}
          <IconTile category={post.category} iconKey={post.icon_key} size={80} />

          {/* Post info */}
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            {/* Badges row */}
            <div className="flex items-center gap-2 flex-wrap">
              <TypeBadge type={post.type} />
              {post.status !== 'active' && <StatusBadge status={post.status} />}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-charcoal leading-snug">
              {post.title}
            </h1>

            {/* Meta */}
            <p className="text-sm text-gray-400">
              Posted by {firstName}
              {post.poster.neighborhood ? ` · ${post.poster.neighborhood}` : ''}
              {' · '}
              {timeAgo(post.created_at)}
            </p>

            {/* Category label */}
            <CategoryLabel category={post.category} />
          </div>
        </div>

        <div className="border-t border-gray-50" />

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Description */}
          <p className="text-base text-charcoal leading-relaxed whitespace-pre-wrap">
            {post.description}
          </p>

          {/* Type-specific fields */}
          <TypeSpecificFields post={post} />
        </div>
      </article>

      {/* ── Owner section / Contact reveal ───────────────────────────────── */}
      {isOwner ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <p className="text-sm font-medium text-gray-500">This is your post</p>
          <StatusManager post={post} />
        </div>
      ) : (
        <ContactReveal
          postType={post.type}
          posterFirstName={firstName}
          posterEmail={post.poster.email}
          posterPhone={post.poster.phone}
        />
      )}
    </div>
  )
}
