'use client'

import { useState, useTransition } from 'react'
import type { Post, PostStatus } from '@/lib/types/database'
import { updatePostStatus } from './actions'

// ── Props ─────────────────────────────────────────────────────────────────────

interface StatusManagerProps {
  post: Pick<Post, 'id' | 'type' | 'status'>
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function StatusManager({ post }: StatusManagerProps) {
  const [currentStatus, setCurrentStatus] = useState<PostStatus>(post.status)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleUpdate(newStatus: PostStatus) {
    setErrorMsg(null)
    startTransition(async () => {
      const result = await updatePostStatus(post.id, newStatus)
      if ('error' in result) {
        setErrorMsg(result.error)
      } else {
        setCurrentStatus(newStatus)
      }
    })
  }

  const buttonClass =
    'inline-flex items-center justify-center rounded-xl text-sm font-semibold px-5 py-2.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Manage status
      </p>

      {/* LEND: toggle lent / available */}
      {post.type === 'lend' && (
        <div className="flex flex-wrap gap-2">
          {currentStatus === 'active' ? (
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleUpdate('lent')}
              className={`${buttonClass} bg-orange-100 text-orange-800 hover:bg-orange-200 focus-visible:ring-orange-400`}
            >
              Mark as Lent Out
            </button>
          ) : (
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleUpdate('active')}
              className={`${buttonClass} bg-green-100 text-green-800 hover:bg-green-200 focus-visible:ring-green-400`}
            >
              Mark as Available
            </button>
          )}
        </div>
      )}

      {/* GIVE: mark claimed */}
      {post.type === 'give' && currentStatus === 'active' && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleUpdate('claimed')}
          className={`${buttonClass} bg-sage/10 text-sage hover:bg-sage/20 focus-visible:ring-sage w-fit`}
        >
          Mark as Claimed
        </button>
      )}

      {/* REQUEST: mark fulfilled */}
      {post.type === 'request' && currentStatus === 'active' && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleUpdate('fulfilled')}
          className={`${buttonClass} bg-sage/10 text-sage hover:bg-sage/20 focus-visible:ring-sage w-fit`}
        >
          Mark as Fulfilled
        </button>
      )}

      {/* SKILL: mark fulfilled */}
      {post.type === 'skill' && currentStatus === 'active' && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleUpdate('fulfilled')}
          className={`${buttonClass} bg-sage/10 text-sage hover:bg-sage/20 focus-visible:ring-sage w-fit`}
        >
          Mark as Fulfilled
        </button>
      )}

      {/* Already resolved */}
      {(currentStatus === 'claimed' ||
        currentStatus === 'fulfilled' ||
        (post.type === 'lend' && currentStatus === 'lent')) && (
        <p className="text-sm text-gray-400">
          {currentStatus === 'claimed' && 'This item has been claimed.'}
          {currentStatus === 'fulfilled' && 'This post has been fulfilled.'}
          {currentStatus === 'lent' && post.type === 'lend' && 'Currently lent out.'}
        </p>
      )}

      {/* Error message */}
      {errorMsg && (
        <p className="text-sm text-terracotta font-medium">{errorMsg}</p>
      )}
    </div>
  )
}
