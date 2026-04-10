# CommonGround

A hosted platform where anyone can create a neighborhood, school, church, or community group. Members share resources, skills, and needs — hyperlocal, trust-based, non-commercial.

Think Nextdoor but radically simpler. No ads. No algorithm. Just neighbors.

---

## Stack

- **Next.js 14** (App Router)
- **Supabase** (Auth, PostgreSQL, Row Level Security)
- **Tailwind CSS**
- **Resend** (transactional email)
- **Vercel** (hosting + cron jobs)

---

## Setup Guide

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Once the project is ready, open the **SQL Editor** and run the full contents of `supabase/schema.sql`. This creates all tables, indexes, RLS policies, and the auto-user trigger.
3. In your Supabase project settings, copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret, never expose to the browser)

### 2. Configure Supabase magic link email

1. In your Supabase dashboard, go to **Authentication → Email Templates**.
2. Edit the **Magic Link** template. The default template works fine, but you can customize the subject line:
   - Subject: `Sign in to CommonGround`
   - Keep the `{{ .ConfirmationURL }}` variable in the body — Supabase replaces it with the actual magic link.
3. In **Authentication → URL Configuration**, set your **Site URL** to your production URL (e.g. `https://yourapp.vercel.app`).
4. Add your production URL to **Redirect URLs**: `https://yourapp.vercel.app/auth/callback`.
5. For local development, also add `http://localhost:3000/auth/callback` to Redirect URLs.

### 3. Create a Resend account

1. Go to [resend.com](https://resend.com) and create an account.
2. Add and **verify your sending domain** (e.g. `commonground.app`). Follow Resend's DNS verification instructions.
3. Create an API key → `RESEND_API_KEY`.
4. Notification emails send from `notifications@yourdomain.com` (auto-derived from `NEXT_PUBLIC_APP_URL`). Make sure this address is valid on your domain.

> For testing without a verified domain, Resend provides `onboarding@resend.dev` as a default sender — update `getSenderEmail()` in `app/api/notify/new-post/route.ts` and `app/api/cron/digest/route.ts` temporarily.

### 4. Create a Ko-fi account (optional)

1. Go to [ko-fi.com](https://ko-fi.com) and create a free account.
2. Copy your Ko-fi page URL (e.g. `https://ko-fi.com/yourname`) → `NEXT_PUBLIC_KOFI_URL`.
3. This appears as a quiet, friendly link in the site footer. If you skip this variable, the footer omits the link gracefully.

### 5. Environment variables

Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
RESEND_API_KEY=re_xxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_KOFI_URL=https://ko-fi.com/yourname
CRON_SECRET=a-long-random-secret-string
```

Generate `CRON_SECRET` with: `openssl rand -base64 32`

### 6. Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

### One-time setup

1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. In Vercel's **Environment Variables** settings, add all variables from `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_APP_URL` — set to your Vercel URL (e.g. `https://yourapp.vercel.app`)
   - `NEXT_PUBLIC_KOFI_URL`
   - `CRON_SECRET`
4. Deploy. Vercel auto-detects Next.js.

### Vercel Cron Job

`vercel.json` configures a cron job that runs daily at 8am UTC:

```json
{
  "crons": [
    {
      "path": "/api/cron/digest",
      "schedule": "0 8 * * *"
    }
  ]
}
```

- Vercel calls `GET /api/cron/digest` automatically at 8am UTC every day.
- The endpoint verifies an `Authorization: Bearer <CRON_SECRET>` header (Vercel sends this automatically) or the `x-vercel-cron: 1` header.
- It queries posts from the last 24 hours and sends digest emails to members who chose that preference.
- No empty digests are sent — if a user's communities had no new posts, they get no email.

> Cron jobs require Vercel's **Hobby plan or higher**. The free Hobby plan includes one cron job.

---

## Getting started: first community

1. Visit your deployed app and sign in with your email.
2. Complete the 4-step onboarding.
3. Click **"Start your own community"** (from the onboarding completion screen or the nav).
4. Fill in the community name, description, and location label.
5. Choose **"Listed"** if you want it in the public directory, or **"Unlisted"** for invite-only.
6. After creating, you land in the **Admin Panel**.
7. Click **"Generate invite link"** and share it with your neighbors.
8. As members request to join, you receive an email and can approve/deny from the Admin Panel.

---

## Testing the digest cron locally

The cron endpoint is a plain GET route you can call directly:

```bash
curl -X GET http://localhost:3000/api/cron/digest \
  -H "Authorization: Bearer your_cron_secret_here"
```

Or with the Vercel header:

```bash
curl -X GET http://localhost:3000/api/cron/digest \
  -H "x-vercel-cron: 1"
```

Returns `{ "success": true, "usersNotified": N }`. If `N` is 0, either no users have "digest" preference set or no posts were created in the last 24 hours.

To test with real data: create a community, add a second account with "daily digest" preference, create a post, then call the cron endpoint — you should receive an email at the second account's address.

---

## Project structure

```
app/
  (public)/             Public-facing pages (homepage, community directory)
  (auth)/
    login/              Magic link login
    onboarding/         4-step first-time setup
  (app)/                Authenticated shell (nav + footer)
    feed/               Main post feed with filters
    post/[id]/          Post detail + contact reveal
    new-post/           Create post form
    community/
      new/              Create community
      [slug]/admin/     Admin panel
      join/[token]/     Join via invite link
      request/[slug]/   Request to join
    profile/[id]/       User profile
    settings/           Edit profile + notification preferences
  api/
    cron/digest/        Daily digest (called by Vercel Cron)
    notify/new-post/    Instant notification trigger

components/
  icons/                48 SVG icon components + CATEGORY_MAP
  IconPicker.tsx        Category dropdown + icon grid
  PostCard.tsx          Feed card
  TypeBadge.tsx         Color-coded post type pill
  CommunityNav.tsx      Community switcher dropdown
  NotificationPrefPicker.tsx  Shared notification preference UI
  Footer.tsx            Site-wide footer with Ko-fi link
  NewPostButton.tsx     URL-aware new post button

lib/
  supabase/
    client.ts           Browser Supabase client
    server.ts           Server Supabase client + service role client
  types/
    database.ts         TypeScript types matching the DB schema

supabase/
  schema.sql            Full database schema + RLS policies

vercel.json             Vercel Cron configuration
```

---

## Post types

| Type | Description | Contact mechanic |
|------|-------------|------------------|
| **Lend** | I have this, you can borrow it | "I'm interested" reveals poster's contact |
| **Give** | Free, come get it | "I'm interested" reveals poster's contact |
| **Request** | Does anyone have X? | "I can help" reveals responder's own contact |
| **Skill** | I can do X / I need help with X | "I can help" reveals responder's own contact |

No in-app messaging. Contact happens directly via email or phone, outside the app.

---

## Notification preferences

Set during onboarding, changeable anytime in Settings:

- **Every new post** — email immediately when anyone posts in your communities
- **Daily digest** — one summary email at 8am UTC with all posts from the past 24 hours
- **Never** — no post emails (system emails like login and join approval still work)

---

## License

MIT
