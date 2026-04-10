'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function NewPostButton() {
  const searchParams = useSearchParams()
  const community = searchParams.get('community')
  const href = community ? `/new-post?community=${community}` : '/new-post'

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-xl bg-terracotta text-white text-sm font-semibold px-4 py-2 hover:bg-terracotta/90 active:bg-terracotta/80 transition"
    >
      <span className="text-base leading-none">＋</span>
      <span className="hidden sm:inline">New post</span>
    </Link>
  )
}
