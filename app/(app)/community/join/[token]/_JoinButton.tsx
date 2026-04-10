'use client'

import { useTransition } from 'react'
import { joinViaToken } from './actions'

export default function JoinButton({
  token,
  communityName,
}: {
  token: string
  communityName: string
}) {
  const [isPending, startTransition] = useTransition()

  function handleJoin() {
    startTransition(async () => {
      const result = await joinViaToken(token)
      if (result?.error) {
        // joinViaToken redirects on success; surface error here
        alert(result.error)
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleJoin}
      disabled={isPending}
      className="w-full rounded-xl bg-terracotta text-white font-semibold py-3 px-6 text-sm hover:bg-terracotta/90 active:bg-terracotta/80 transition disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {isPending ? 'Joining…' : `Join ${communityName}`}
    </button>
  )
}
