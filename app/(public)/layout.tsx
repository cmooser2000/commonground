import Link from 'next/link'
import Footer from '@/components/Footer'

// ── Public layout ─────────────────────────────────────────────────────────────

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* ── Minimal nav ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="text-lg font-bold text-terracotta tracking-tight hover:opacity-80 transition-opacity"
          >
            CommonGround
          </Link>

          {/* Sign in */}
          <Link
            href="/login"
            className="inline-flex items-center rounded-xl border border-gray-200 bg-white text-charcoal text-sm font-semibold px-4 py-2 hover:bg-gray-50 transition"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* ── Page content ─────────────────────────────────────────────────── */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  )
}
