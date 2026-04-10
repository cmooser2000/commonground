// NOTE: The public homepage lives in app/page.tsx (root level).
// This file intentionally has no default export so Next.js does not
// treat it as a conflicting route for "/".
//
// The (public) route group exists solely for its layout.tsx, which
// provides the public nav/footer for other public-facing pages
// (e.g. /community/request/[slug] if moved into this group).
export {}
