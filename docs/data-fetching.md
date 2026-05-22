# Data Fetching

## Server Components Only

**All data fetching MUST be done exclusively via React Server Components.**

Do not fetch data via:
- Route handlers (`app/api/`)
- Client components (`"use client"`)
- `useEffect` + `fetch`
- SWR, React Query, or any client-side fetching library
- Any mechanism other than Server Components

If a component needs data, it must be a Server Component (or receive data as props from a parent Server Component).

## Database Queries via `/data` Helpers

**All database queries MUST go through helper functions in the `/data` directory.**

- Never query the database directly from a component — always call a `/data` helper.
- Helper functions MUST use Drizzle ORM. **Do not use raw SQL.**
- Each helper function is responsible for scoping its query to the currently authenticated user. A logged-in user must NEVER be able to access another user's data.

### Enforcing user-scoped access

Every query that returns user-owned data must filter by the authenticated user's ID. Retrieve the session inside the helper (or accept `userId` as a required parameter) and always include a `where` clause that matches the record's owner to that ID.

```ts
// CORRECT — always scope to the current user
export async function getWorkouts(userId: string) {
  return db.query.workouts.findMany({
    where: eq(workouts.userId, userId),
  });
}

// WRONG — never return all rows without a user filter
export async function getWorkouts() {
  return db.query.workouts.findMany(); // ❌
}
```

Failing to scope queries by `userId` is a critical security bug. Every helper that touches user-owned data must include this guard, with no exceptions.
