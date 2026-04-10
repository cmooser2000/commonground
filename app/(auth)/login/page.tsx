'use client';

import { useState, useTransition } from 'react';
import { sendMagicLink } from './actions';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await sendMagicLink(email);
      if (result.error) {
        setError(result.error);
      } else {
        setSubmittedEmail(email);
        setSubmitted(true);
      }
    });
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-12">
      {/* Logo / Wordmark */}
      <div className="flex flex-col items-center mb-10 gap-3">
        <div className="flex items-center gap-2">
          {/* Inline SVG: simple house with a small leaf */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* House roof */}
            <path
              d="M18 4L32 16H4L18 4Z"
              fill="#C1502E"
            />
            {/* House body */}
            <rect x="8" y="16" width="20" height="14" rx="1" fill="#C1502E" opacity="0.85" />
            {/* Door */}
            <rect x="14" y="22" width="8" height="8" rx="1" fill="#FAF3E0" />
            {/* Small leaf on top-right of roof */}
            <ellipse cx="28" cy="8" rx="4" ry="2.5" fill="#7D9B76" transform="rotate(-30 28 8)" />
          </svg>
          <h1 className="text-4xl font-bold tracking-tight text-terracotta" style={{ fontFamily: 'Georgia, serif' }}>
            CommonGround
          </h1>
        </div>
        <p className="text-charcoal text-base text-center max-w-xs opacity-75">
          Share resources, share skills, know your neighbors.
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-stone-100 px-8 py-10">
        {submitted ? (
          /* Success state */
          <div className="text-center flex flex-col items-center gap-4">
            <span className="text-5xl" role="img" aria-label="Mail">✉️</span>
            <h2 className="text-xl font-semibold text-charcoal">Check your email!</h2>
            <p className="text-charcoal opacity-70 text-sm leading-relaxed">
              We sent a magic link to{' '}
              <span className="font-medium text-terracotta">{submittedEmail}</span>.
              Click it to sign in.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setEmail('');
                setSubmittedEmail('');
              }}
              className="mt-2 text-sm text-dusty-blue underline underline-offset-2 hover:text-terracotta transition-colors"
            >
              Use a different email
            </button>
          </div>
        ) : (
          /* Login form */
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-charcoal">
                Sign in or create an account
              </h2>
              <p className="text-sm text-charcoal opacity-60 mt-1">
                We&apos;ll email you a magic link — no password needed.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-charcoal">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-stone-200 bg-cream px-4 py-2.5 text-charcoal text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending || !email}
                className="w-full rounded-lg bg-terracotta text-white font-semibold py-2.5 px-4 text-sm hover:bg-opacity-90 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Sending…' : 'Send magic link'}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Subtle footer hint */}
      <p className="mt-8 text-xs text-charcoal opacity-40 text-center">
        No account? A magic link will create one automatically.
      </p>
    </main>
  );
}
