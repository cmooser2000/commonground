'use client'

import { useTransition } from 'react'
import { removeMember, promoteToAdmin } from '../actions'
import type { CommunityMember, User } from '@/lib/types/database'

type MemberWithUser = CommunityMember & {
  users: Pick<User, 'display_name' | 'neighborhood'>
}

export default function MembersSection({
  members,
  currentUserId,
  communitySlug,
}: {
  members: MemberWithUser[]
  currentUserId: string
  communitySlug: string
}) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-6">
      <h2 className="text-lg font-semibold text-charcoal mb-4">
        Members{' '}
        <span className="text-sm font-normal text-gray-400">
          ({members.length})
        </span>
      </h2>

      {members.length === 0 ? (
        <p className="text-sm text-gray-400">No active members yet.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-gray-100">
          {members.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              isSelf={member.user_id === currentUserId}
              communitySlug={communitySlug}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

function MemberRow({
  member,
  isSelf,
  communitySlug,
}: {
  member: MemberWithUser
  isSelf: boolean
  communitySlug: string
}) {
  const [isPending, startTransition] = useTransition()

  function handleRemove() {
    if (!confirm(`Remove ${member.users.display_name} from this community?`)) return
    startTransition(async () => {
      await removeMember(member.id, communitySlug)
    })
  }

  function handlePromote() {
    if (!confirm(`Make ${member.users.display_name} an admin?`)) return
    startTransition(async () => {
      await promoteToAdmin(member.id, communitySlug)
    })
  }

  return (
    <li className="py-4 flex items-center gap-4">
      {/* Avatar placeholder */}
      <div className="w-10 h-10 rounded-full bg-cream border border-gray-200 flex items-center justify-center text-charcoal font-semibold text-sm flex-shrink-0">
        {member.users.display_name?.[0]?.toUpperCase() ?? '?'}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-charcoal">
            {member.users.display_name}
          </p>
          {isSelf && (
            <span className="text-xs text-gray-400">(you)</span>
          )}
          <RoleBadge role={member.role} />
        </div>
        {member.users.neighborhood && (
          <p className="text-xs text-gray-400">{member.users.neighborhood}</p>
        )}
      </div>

      <div className="flex gap-2 flex-shrink-0">
        {member.role === 'member' && (
          <button
            type="button"
            onClick={handlePromote}
            disabled={isPending}
            className="rounded-lg border border-dusty-blue text-dusty-blue text-xs font-semibold px-3 py-2 hover:bg-dusty-blue/5 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Make Admin
          </button>
        )}
        <button
          type="button"
          onClick={handleRemove}
          disabled={isPending || isSelf}
          title={isSelf ? "You can't remove yourself" : undefined}
          className="rounded-lg border border-gray-200 text-gray-500 text-xs font-semibold px-3 py-2 hover:bg-gray-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Remove
        </button>
      </div>
    </li>
  )
}

function RoleBadge({ role }: { role: string }) {
  if (role === 'admin') {
    return (
      <span className="text-xs font-semibold bg-terracotta/10 text-terracotta rounded-full px-2 py-0.5">
        Admin
      </span>
    )
  }
  return (
    <span className="text-xs font-semibold bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
      Member
    </span>
  )
}
