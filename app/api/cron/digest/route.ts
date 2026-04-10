import { NextRequest, NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import type { Database, Post, Community, User } from '@/lib/types/database'

// ── Types ─────────────────────────────────────────────────────────────────────

type PostWithCommunity = Post & {
  user: Pick<User, 'display_name' | 'neighborhood'>
  community: Pick<Community, 'id' | 'name' | 'slug'>
}

type CommunitySection = {
  community: Pick<Community, 'id' | 'name' | 'slug'>
  posts: PostWithCommunity[]
}

// ── POST type helpers ──────────────────────────────────────────────────────────

const TYPE_EMOJI: Record<string, string> = {
  lend: '🤝',
  give: '🎁',
  request: '🙋',
  skill: '💡',
}

const TYPE_LABEL: Record<string, string> = {
  lend: 'Lend',
  give: 'Give',
  request: 'Request',
  skill: 'Skill',
}

const TYPE_COLOR: Record<string, string> = {
  lend: '#6B8FA3',
  give: '#7D9B76',
  request: '#E8B84B',
  skill: '#C1502E',
}

const TYPE_TEXT_COLOR: Record<string, string> = {
  lend: '#ffffff',
  give: '#ffffff',
  request: '#3D3D3D',
  skill: '#ffffff',
}

// ── Email HTML builder ────────────────────────────────────────────────────────

function buildEmailHtml(
  sections: CommunitySection[],
  totalCount: number,
  appUrl: string
): string {
  const postCardsHtml = sections
    .map((section) => {
      const postsHtml = section.posts
        .map((post) => {
          const emoji = TYPE_EMOJI[post.type] ?? '📌'
          const typeLabel = TYPE_LABEL[post.type] ?? post.type
          const typeBg = TYPE_COLOR[post.type] ?? '#6B8FA3'
          const typeText = TYPE_TEXT_COLOR[post.type] ?? '#ffffff'
          const firstName = post.user.display_name?.split(' ')[0] ?? 'Someone'
          const neighborhood = post.user.neighborhood

          return `
            <div style="
              background: #ffffff;
              border-radius: 12px;
              border: 1px solid #e5e7eb;
              padding: 14px 16px;
              margin-bottom: 10px;
              display: flex;
              align-items: flex-start;
              gap: 12px;
            ">
              <div style="
                font-size: 28px;
                line-height: 1;
                flex-shrink: 0;
                margin-top: 2px;
              ">${emoji}</div>
              <div style="flex: 1; min-width: 0;">
                <div style="margin-bottom: 4px;">
                  <span style="
                    display: inline-block;
                    background: ${typeBg};
                    color: ${typeText};
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.05em;
                    padding: 2px 8px;
                    border-radius: 999px;
                    text-transform: uppercase;
                  ">${typeLabel}</span>
                </div>
                <p style="
                  margin: 0 0 4px;
                  font-size: 15px;
                  font-weight: 700;
                  color: #3D3D3D;
                  line-height: 1.3;
                ">${escapeHtml(post.title)}</p>
                <p style="
                  margin: 0;
                  font-size: 12px;
                  color: #9ca3af;
                ">${escapeHtml(firstName)}${neighborhood ? ` · ${escapeHtml(neighborhood)}` : ''}</p>
              </div>
            </div>
          `
        })
        .join('')

      return `
        <div style="margin-bottom: 28px;">
          <h2 style="
            font-size: 16px;
            font-weight: 700;
            color: #3D3D3D;
            margin: 0 0 12px;
            padding-bottom: 8px;
            border-bottom: 2px solid #FAF3E0;
          ">${escapeHtml(section.community.name)}</h2>
          ${postsHtml}
        </div>
      `
    })
    .join('')

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="
      margin: 0;
      padding: 0;
      background: #FAF3E0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    ">
      <div style="max-width: 600px; margin: 0 auto; padding: 32px 16px;">

        <!-- Header -->
        <div style="text-align: center; margin-bottom: 32px;">
          <p style="
            font-size: 22px;
            font-weight: 800;
            color: #C1502E;
            margin: 0 0 8px;
            letter-spacing: -0.5px;
          ">CommonGround</p>
          <h1 style="
            font-size: 28px;
            font-weight: 800;
            color: #3D3D3D;
            margin: 0 0 8px;
            line-height: 1.2;
          ">Your daily digest</h1>
          <p style="
            font-size: 15px;
            color: #6b7280;
            margin: 0;
          ">${totalCount} new post${totalCount === 1 ? '' : 's'} from your communities</p>
        </div>

        <!-- Posts by community -->
        <div style="
          background: #FAF3E0;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
        ">
          ${postCardsHtml}
        </div>

        <!-- CTA -->
        <div style="text-align: center; margin-bottom: 32px;">
          <a href="${appUrl}/feed" style="
            display: inline-block;
            background: #C1502E;
            color: #ffffff;
            font-size: 15px;
            font-weight: 700;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 12px;
          ">View your communities →</a>
        </div>

        <!-- Footer -->
        <div style="
          text-align: center;
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
        ">
          <p style="
            font-size: 12px;
            color: #9ca3af;
            margin: 0;
            line-height: 1.6;
          ">
            You're receiving this digest because you chose daily updates.
            <br />
            <a href="${appUrl}/settings" style="color: #C1502E; text-decoration: underline;">Change preferences</a>
          </p>
        </div>

      </div>
    </body>
    </html>
  `
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  // Auth check: must have Authorization: Bearer <CRON_SECRET> OR x-vercel-cron header
  const cronSecret = process.env.CRON_SECRET
  const authHeader = request.headers.get('authorization')
  const vercelCronHeader = request.headers.get('x-vercel-cron')

  const hasValidBearer =
    cronSecret && authHeader === `Bearer ${cronSecret}`
  const isVercelCron = vercelCronHeader === '1'

  if (!hasValidBearer && !isVercelCron) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://commonground.app'

  // Service role client (bypass RLS)
  const supabase = createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )

  const resend = new Resend(process.env.RESEND_API_KEY)

  // 1. Get all posts created in the last 24 hours
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: recentPosts, error: postsError } = await (supabase as any)
    .from('posts')
    .select(`
      *,
      users ( display_name, neighborhood ),
      communities ( id, name, slug )
    `)
    .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .order('created_at', { ascending: false })

  if (postsError) {
    console.error('[digest] Failed to fetch recent posts:', postsError)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }

  if (!recentPosts || recentPosts.length === 0) {
    return NextResponse.json({ success: true, usersNotified: 0 })
  }

  // Normalise the joined rows
  const postsWithData: PostWithCommunity[] = (recentPosts ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (row: any) => ({
      ...row,
      user: row.users ?? { display_name: 'Someone', neighborhood: '' },
      community: row.communities ?? { id: '', name: 'Unknown', slug: '' },
    })
  )

  // 2. Get all users who prefer digest notifications
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: digestUsers, error: usersError } = await (supabase as any)
    .from('users')
    .select('id')
    .eq('notification_preference', 'digest')

  if (usersError) {
    console.error('[digest] Failed to fetch digest users:', usersError)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }

  if (!digestUsers || digestUsers.length === 0) {
    return NextResponse.json({ success: true, usersNotified: 0 })
  }

  let usersNotified = 0

  // 3. For each digest user, build and send their personalised email
  for (const digestUser of digestUsers) {
    try {
      // a. Find their active community memberships
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: memberships } = await (supabase as any)
        .from('community_members')
        .select('community_id')
        .eq('user_id', digestUser.id)
        .eq('status', 'active')

      if (!memberships || memberships.length === 0) continue

      const userCommunityIds = new Set<string>(
        memberships.map((m: { community_id: string }) => m.community_id)
      )

      // b. Filter recent posts to only those in this user's communities
      const userPosts = postsWithData.filter((p) =>
        userCommunityIds.has(p.community_id)
      )

      // c. Skip if no posts
      if (userPosts.length === 0) continue

      // d. Group posts by community
      const communityMap = new Map<string, CommunitySection>()
      for (const post of userPosts) {
        const key = post.community.id || post.community_id
        if (!communityMap.has(key)) {
          communityMap.set(key, { community: post.community, posts: [] })
        }
        communityMap.get(key)!.posts.push(post)
      }
      const sections = Array.from(communityMap.values())

      // e. Get user email via admin API
      const { data: authUser, error: authError } =
        await supabase.auth.admin.getUserById(digestUser.id)

      if (authError || !authUser?.user?.email) {
        console.warn(`[digest] Could not get email for user ${digestUser.id}`)
        continue
      }

      const email = authUser.user.email
      const totalCount = userPosts.length
      const subject = `Your CommonGround digest — ${totalCount} new post${totalCount === 1 ? '' : 's'}`

      // f. Send email
      await resend.emails.send({
        from: 'CommonGround <digest@mail.commonground.app>',
        to: email,
        subject,
        html: buildEmailHtml(sections, totalCount, appUrl),
      })

      usersNotified++
    } catch (err) {
      console.error(`[digest] Error processing user ${digestUser.id}:`, err)
    }
  }

  return NextResponse.json({ success: true, usersNotified })
}
