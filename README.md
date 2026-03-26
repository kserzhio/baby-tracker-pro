# Baby Tracker Pro

Baby Tracker Pro is a mobile-first Next.js app for newborn tracking. It keeps feeding, sleep, diaper changes, and notes fast enough for tired parents using one hand.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn-style UI components
- React Hook Form + Zod
- Prisma ORM
- PostgreSQL / Supabase
- Supabase Auth
- English and Ukrainian localization

## Features

- Magic link authentication with Supabase Auth
- Baby profile creation and listing
- Quick event logging for feeding, sleep, diaper, and notes
- Today dashboard with summary cards and recent activity
- Timeline grouped by day
- EN / UA language switching with cookie + localStorage sync

## Project Structure

```text
app/
  (app)/
    babies/
    dashboard/
    timeline/
  auth/
    callback/
    sign-in/
components/
  layout/
  shared/
  ui/
features/
  auth/
  babies/
  dashboard/
  events/
  locale/
lib/
  i18n/
  supabase/
prisma/
  migrations/
  schema.prisma
```

## Setup

1. Copy `.env.example` to `.env`.
2. Install dependencies with `npm install`.
3. Generate Prisma Client with `npm run prisma:generate`.
4. Push the schema to Supabase with `npx prisma db push`.
5. Start the app with `npm run dev`.

## Required Environment Variables

```env
DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD@REGION.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Supabase Setup

1. Create a Supabase project.
2. Enable Email authentication.
3. Add `http://localhost:3000/auth/callback` to Auth redirect URLs for local development.
4. Use the Supabase Session Pooler URI for `DATABASE_URL`.
5. If your environment is IPv4-only, prefer `prisma db push` with the Supabase Session Pooler URI.
6. Keep Prisma as the only source of truth for database structure. Do not create Baby or Event tables manually in Supabase.

## Database Notes

- Prisma stores only `userId` from Supabase Auth in relational models.
- `Baby` owns many `Event` rows.
- Event-specific details use enums and nullable columns to keep the schema simple for the MVP.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:deploy`
- `npm run prisma:studio`
- `npm run db:seed`
