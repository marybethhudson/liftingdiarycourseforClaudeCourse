# Session Notes — 2026-05-17

## What was done

### 1. Added Clerk authentication to the Next.js App Router project

**Installed:**
```bash
npm install @clerk/nextjs
```

**Created** `src/middleware.ts` with `clerkMiddleware()` — this protects routes automatically.

**Updated** `src/app/layout.tsx` to:
- Import `ClerkProvider`, `SignInButton`, `SignUpButton`, `Show`, `UserButton` from `@clerk/nextjs`
- Wrap the app in `<ClerkProvider>`
- Add a `<header>` with sign-in/sign-up buttons (shown when signed out) and a user avatar (shown when signed in)

### 2. Next step — add API keys

Create `.env.local` in the project root with keys from https://dashboard.clerk.com:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Then run the dev server:
```bash
npm run dev
```

Visit http://localhost:3000 — you should see Sign In / Sign Up buttons top-right.
Sign up as your first test user. When your profile icon appears, Clerk is working.

## Key rules (Clerk + Next.js App Router)

- Use `clerkMiddleware()` — NOT the deprecated `authMiddleware()`
- Use `<Show when="signed-in">` / `<Show when="signed-out">` — NOT `<SignedIn>` / `<SignedOut>`
- `ClerkProvider` goes inside `<body>`, not wrapping `<html>`
- Always import from `@clerk/nextjs` or `@clerk/nextjs/server`
- Never use the Pages Router (`_app.tsx`, `pages/`) with this setup
