'use client'

import { useTransition } from 'react'
import { approveRequest, denyRequest } from '../actions'
import type { CommunityMember, User } from '@/lib/types/database'

type MemberWithUser = CommunityMember & {
  users: Pick<User, 'display_name' | 'neighborhood'>
}

export default function PendingRequestsSection({
  pending,
  communitySlug,
}: {
  pending: MemberWithUser[]
  communitySlug: string
}) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-6">
      <h2 className="text-lg font-semibold text-charcoal mb-4">
        Pending Join Requests{' '}
        {pending.length > 0 && (
          <span className="ml-1.5 text-xs font-bold bg-golden/20 text-golden rounded-full px-2 py-0.5">
            {pending.length}
          </span>
        )}
      </h2>

      {pending.length === 0 ? (
        <p className="text-sm text-gray-400">No pending requests.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-gray-100">
          {pending.map((member) => (
            <PendingRow
              key={member.id}
              member={member}
              communitySlug={communitySlug}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

function PendingRow({
  member,
  communitySlug,
}: {
  member: MemberWithUser
  communitySlug: string
}) {
  const [isPending, startTransition] = useTransition()

  function handleApprove() {
    startTransition(async () => {
      await approveRequest(member.id, communitySlug)
    })
  }

  function handleDeny() {
    startTransition(async () => {
      await denyRequest(member.id, communitySlug)
    })
  }

  return (
    <li className="py-4 flex items-start gap-4">
      {/* Avatar placeholder */}
      <div className="w-10 h-10 rounded-full bg-cream border border-gray-200 flex items-center justify-center text-charcoal font-semibold text-sm flex-shrink-0">
        {member.users.display_name?.[0]?.toUpperCase() ?? '?'}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-charcoal">
          {member.users.display_name}
        </p>
        {member.users.neighborhood && (
          <p className="text-xs text-gray-400">{member.users.neighborhood}</p>
        )}
        {member.request_note && (
          <p className="mt-1.5 text-sm text-gray-600 italic bg-gray-50 rounded-lg px-3 py-2">
            &ldquo;{member.request_note}&rdquo;
          </p>
        )}
      </div>

      <div className="flex gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={handleApprove}
          disabled={isPending}
          className="rounded-lg bg-sage text-white text-xs font-semibold px-3 py-2 hover:bg-sage/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Approve
        </button>
        <button
          type="button"
          onClick={handleDeny}
          disabled={isPending}
          className="rounded-lg border border-gray-200 text-gray-500 text-xs font-semibold px-3 py-2 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Deny
        </button>
      </div>
    </li>
  )
}
