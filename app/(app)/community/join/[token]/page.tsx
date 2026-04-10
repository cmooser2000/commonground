import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Community } from '@/lib/types/database'
import JoinButton from './_JoinButton'

export default async function JoinViaTokenPage({
  params,
}: {
  params: { token: string }
}) {
  const supabase = await createClient()

  // Check auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?next=/community/join/${params.token}`)
  }

  // Look up the invite token
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: tokenRow } = await (supabase as any)
    .from('invite_tokens')
    .select('id, community_id, expires_at, used_at, communities ( id, name, description, location_label )')
    .eq('token', params.token)
    .maybeSingle()

  // Validate token
  const isInvalid =
    !tokenRow ||
    tokenRow.used_at !== null ||
    new Date(tokenRow.expires_at) < new Date()

  if (isInvalid) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 text-center">
          <div className="text-4xl mb-4">🔗</div>
          <h1 className="text-xl font-bold text-charcoal mb-2">
            Invalid invite link
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            This invite link has expired, already been used, or doesn&apos;t
            exist. Ask an admin to send you a new one.
          </p>
          <Link
            href="/"
            className="inline-block rounded-xl bg-terracotta text-white font-semibold py-3 px-6 text-sm hover:bg-terracotta/90 transition"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    )
  }

  const community = tokenRow.communities as Community

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10">
        <div className="mb-6 text-center">
          <div className="text-4xl mb-4">🤝</div>
          <h1 className="text-2xl font-bold text-charcoal leading-snug">
            You&apos;re invited to join
          </h1>
          <h2 className="text-xl font-semibold text-terracotta mt-1">
            {community.name}
          </h2>
          {community.location_label && (
            <p className="text-sm text-gray-400 mt-1">{community.location_label}</p>
          )}
        </div>

        {community.description && (
          <div className="bg-cream rounded-xl px-4 py-4 mb-6">
            <p className="text-sm text-charcoal leading-relaxed">
              {community.description}
            </p>
          </div>
        )}

        <JoinButton token={params.token} communityName={community.name} />
      </div>
    </div>
  )
}
