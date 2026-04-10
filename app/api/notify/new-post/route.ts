import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServiceClient } from '@/lib/supabase/server'
import type { Post, User, Community } from '@/lib/types/database'

// ── Config ────────────────────────────────────────────────────────────────────

const resend = new Resend(process.env.RESEND_API_KEY)

function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? 'https://commonground.app'
}

function getSenderEmail(): string {
  const appUrl = getAppUrl()
  const domain = appUrl
    .replace('https://', '')
    .replace('http://', '')
    .split('/')[0]
  return `CommonGround <notifications@${domain}>`
}

// ── Type helpers ──────────────────────────────────────────────────────────────

type PostType = Post['type']

const TYPE_LABELS: Record<PostType, string> = {
  lend: 'Lend',
  give: 'Give',
  request: 'Request',
  skill: 'Skill',
}

const TYPE_COLORS: Record<PostType, { bg: string; text: string }> = {
  lend: { bg: '#6B8FA3', text: '#ffffff' },
  give: { bg: '#7D9B76', text: '#ffffff' },
  request: { bg: '#E8B84B', text: '#3D3D3D' },
  skill: { bg: '#C1502E', text: '#ffffff' },
}

// ── Email HTML builder ────────────────────────────────────────────────────────

function buildEmailHtml({
  post,
  posterFirstName,
  posterNeighborhood,
  communityName,
  postUrl,
  appUrl,
}: {
  post: Post
  posterFirstName: string
  posterNeighborhood: string
  communityName: string
  postUrl: string
  appUrl: string
}): string {
  const typeLabel = TYPE_LABELS[post.type]
  const typeColor = TYPE_COLORS[post.type]
  const descriptionExcerpt =
    post.description.length > 200
      ? post.description.slice(0, 200).trimEnd() + '…'
      : post.description

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${typeLabel}: ${post.title} — ${communityName}</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF3E0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF3E0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="background-color:#C1502E;border-radius:16px 16px 0 0;padding:24px 32px;text-align:center;">
              <p style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">CommonGround</p>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.75);">${communityName}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:32px;">

              <!-- Type badge -->
              <div style="margin-bottom:16px;">
                <span style="display:inline-block;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:0.05em;background-color:${typeColor.bg};color:${typeColor.text};">
                  ${typeLabel.toUpperCase()}
                </span>
              </div>

              <!-- Post title -->
              <h1 style="margin:0 0 12px;font-size:24px;font-weight:800;color:#3D3D3D;line-height:1.25;">
                ${escapeHtml(post.title)}
              </h1>

              <!-- Poster meta -->
              <p style="margin:0 0 20px;font-size:13px;color:#9CA3AF;">
                Posted by <strong style="color:#3D3D3D;">${escapeHtml(posterFirstName)}</strong>${posterNeighborhood ? ` from <strong style="color:#3D3D3D;">${escapeHtml(posterNeighborhood)}</strong>` : ''}
              </p>

              <!-- Description excerpt -->
              <p style="margin:0 0 28px;font-size:15px;color:#4B5563;line-height:1.6;">
                ${escapeHtml(descriptionExcerpt)}
              </p>

              <!-- CTA button -->
              <div style="text-align:center;margin-bottom:8px;">
                <a href="${postUrl}" style="display:inline-block;background-color:#C1502E;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 32px;border-radius:12px;letter-spacing:0.01em;">
                  View post →
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F9FAFB;border-radius:0 0 16px 16px;padding:20px 32px;border-top:1px solid #F3F4F6;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.6;">
                You're receiving this because you're a member of <strong>${escapeHtml(communityName)}</strong>.
                <br />
                <a href="${appUrl}/settings" style="color:#6B8FA3;text-decoration:underline;">Change notification preferences</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json()
    const { post_id, postId, community_id, communityId } = body as {
      post_id?: string
      postId?: string
      community_id?: string
      communityId?: string
    }

    const resolvedPostId = post_id ?? postId
    const resolvedCommunityId = community_id ?? communityId

    if (!resolvedPostId || !resolvedCommunityId) {
      return NextResponse.json(
        { error: 'postId and communityId are required' },
        { status: 400 },
      )
    }

    const supabase = await createServiceClient()

    // 1. Fetch the post with poster's user data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: postRow, error: postError } = await (supabase as any)
      .from('posts')
      .select('*, users ( display_name, neighborhood )')
      .eq('id', resolvedPostId)
      .single()

    if (postError || !postRow) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const post = postRow as Post & {
      users: Pick<User, 'display_name' | 'neighborhood'> | null
    }

    const posterFirstName =
      post.users?.display_name?.split(' ')[0] ?? 'Someone'
    const posterNeighborhood = post.users?.neighborhood ?? ''

    // 2. Fetch community data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: communityRow, error: communityError } = await (supabase as any)
      .from('communities')
      .select('id, name, slug')
      .eq('id', resolvedCommunityId)
      .single()

    if (communityError || !communityRow) {
      return NextResponse.json(
        { error: 'Community not found' },
        { status: 404 },
      )
    }

    const community = communityRow as Pick<Community, 'id' | 'name' | 'slug'>

    // 3. Fetch active community members with instant notification preference,
    //    excluding the post creator
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: memberRows, error: membersError } = await (supabase as any)
      .from('community_members')
      .select('user_id')
      .eq('community_id', resolvedCommunityId)
      .eq('status', 'active')
      .neq('user_id', post.user_id)

    if (membersError) {
      return NextResponse.json(
        { error: 'Failed to fetch members' },
        { status: 500 },
      )
    }

    if (!memberRows || memberRows.length === 0) {
      return NextResponse.json({ success: true, sent: 0 })
    }

    // 4. Filter to only those with instant notifications
    const memberUserIds: string[] = memberRows.map(
      (row: { user_id: string }) => row.user_id,
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profileRows, error: profilesError } = await (supabase as any)
      .from('users')
      .select('id, notification_preference')
      .in('id', memberUserIds)
      .eq('notification_preference', 'instant')

    if (profilesError) {
      return NextResponse.json(
        { error: 'Failed to fetch member profiles' },
        { status: 500 },
      )
    }

    const instantUserIds: string[] = (
      profileRows as Array<{ id: string; notification_preference: string }>
    ).map((p) => p.id)

    if (instantUserIds.length === 0) {
      return NextResponse.json({ success: true, sent: 0 })
    }

    // 5. Get auth emails for each user via admin API
    const appUrl = getAppUrl()
    const postUrl = `${appUrl}/post/${resolvedPostId}?community=${community.slug}`
    const subject = `[${TYPE_LABELS[post.type]}] ${post.title} — ${community.name}`
    const htmlBody = buildEmailHtml({
      post,
      posterFirstName,
      posterNeighborhood,
      communityName: community.name,
      postUrl,
      appUrl,
    })

    let sentCount = 0
    const errors: string[] = []

    await Promise.allSettled(
      instantUserIds.map(async (userId) => {
        try {
          const { data: authUser, error: authUserError } =
            await supabase.auth.admin.getUserById(userId)

          if (authUserError || !authUser?.user?.email) {
            errors.push(`No email for user ${userId}`)
            return
          }

          const email = authUser.user.email

          const { error: sendError } = await resend.emails.send({
            from: getSenderEmail(),
            to: email,
            subject,
            html: htmlBody,
          })

          if (sendError) {
            errors.push(`Failed to send to ${email}: ${sendError.message}`)
          } else {
            sentCount++
          }
        } catch (err) {
          errors.push(`Unexpected error for user ${userId}: ${String(err)}`)
        }
      }),
    )

    return NextResponse.json({
      success: true,
      sent: sentCount,
      ...(errors.length > 0 ? { errors } : {}),
    })
  } catch (err) {
    console.error('[notify/new-post] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
