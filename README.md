# Insightly – MVP (Frontend)

A simple platform for creators to build a public profile page with a list of links and receive anonymous feedback. This repository contains the frontend (Next.js) for the MVP proposed in a Tech Lead challenge.

## Tech Lead Challenge – The Scenario

You are the technical lead of a fictional startup called "Insightly". Your mission is to create a simple platform where content creators can build a public page with a list of their social links and receive anonymous feedback from followers.

The challenge is to build the MVP (Minimum Viable Product) from scratch, making architecture decisions, developing the core features, and preparing the infrastructure for deployment.

## Project Description (MVP)

The MVP consists of three main parts:

- Authentication and Profile Management
  - Sign up (email/password) and login
  - Edit profile (name and short bio)
  - Links CRUD (each link with title and URL)
- Public Profile Page
  - Unique URL per username (e.g., `/your-username`)
  - Server rendering (SSR/SSG) for SEO
  - Displays name, bio, and list of links
  - "Anonymous Feedback" section with a text field and a Send button
- Feedback System
  - Any visitor can submit anonymous feedback on the public page
  - The creator, when logged in, can view feedback sorted from newest to oldest

## High-Level Overview

- Build the "Insightly" platform MVP with:
  - Authentication (email/password sign up/login) and profile management
  - Links CRUD (title and URL) shown on the public page
  - Public page per username with SSR/SSG for SEO
  - Anonymous feedback submission by visitors and feedback listing for the creator

## Key Features

- Authentication
  - Signup with name, username, email, and password
  - Login with email and password
  - JWT stored in `localStorage` and automatically injected into the `Authorization` header
- Creator Profile
  - Update name and bio
  - Initial avatar generated from the name initial
- Links
  - Full CRUD for creator links (title, URL)
  - Link reordering (persisted via API)
- Public Page (SSR/SSG)
  - Route: `/:username`
  - Shows creator name, bio, and link list
  - `generateMetadata` for dynamic SEO
- Anonymous Feedback
  - Visitors send feedback without authentication on the public page
  - Creator views received feedback in the dashboard, newest first

## Stack and Architecture Decisions

- Next.js 15 (App Router) – SSR/SSG, dynamic metadata, `app/` structure
- React 19 + TypeScript – typing and DX
- Styling: Tailwind CSS v4
- Client state: Zustand (`lib/store/auth-store.ts`)
- Data fetching: Axios + TanStack React Query
- UI: simple in-house components (Button, Card, Input, Textarea)
- Notifications: `react-hot-toast`
- Lint: ESLint 9 + `eslint-config-next`

### Folder Structure (partial)

```
app/
  auth/
    login/page.tsx
    register/page.tsx
  dashboard/page.tsx
  profile/page.tsx
  [username]/page.tsx
components/
  dashboard/
    feedback-list.tsx
    links-manager.tsx
  public/
    profile.tsx
  ui/
    button.tsx, card.tsx, input.tsx, textarea.tsx, formField.tsx
lib/
  api/
    client.ts        # Axios with interceptors and BASE URL
    endpoints.ts     # API endpoint mapping
  utils.ts
providers/
  ReactQuery.tsx
```

## Frontend Routes

- `/auth/register` – create an account
- `/auth/login` – sign in
- `/dashboard` – manage links and view feedback
- `/profile` – edit profile (name, bio)
- `/:username` – public SSR/SSG page

## API Integration (Expected Backend)

This frontend consumes an external REST API configured via an environment variable.

- Base URL: `NEXT_PUBLIC_API_URL` (e.g., `http://localhost:4000`)
- If the variable is not set, it falls back to `http://localhost:3000` (not recommended in development if Next.js is also running on port 3000).

Endpoints used (see `lib/api/endpoints.ts`):

- Auth
  - `POST /auth/login`
  - `POST /users` (sign up)
- Users
  - `GET /users/me`
  - `PATCH /users/me`
  - `GET /users/profile/:username`
- Links
  - `GET /links`
  - `POST /links`
  - `PATCH /links/:id`
  - `DELETE /links/:id`
  - `PUT /links/reorder`
  - `GET /links/public/:username`
- Feedback
  - `GET /feedback?page=&limit=`
  - `POST /feedback/:username`
  - `PATCH /feedback/:id`
  - `DELETE /feedback/:id`
  - `GET /feedback/stats`
  - `GET /feedback/public/:username?page=&limit=`

Notes:
- Request interceptor adds `Authorization: Bearer <token>` when `insightly_token` exists in `localStorage`.
- 401 responses clear the token and redirect to `/auth/login`.
- The public page `app/[username]/page.tsx` runs on the server, calling the API for SSR/SSG and better SEO.

## Environment Variables

Create a `.env.local` file in the project root with:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Adjust the value according to your backend address.

## Requirements

- Node.js >= 18
- pnpm (recommended) or npm/yarn

## Installation and Run

```bash
pnpm install
pnpm dev
# Open http://localhost:3000
```

Build and production:

```bash
pnpm build
pnpm start
```

Lint:

```bash
pnpm lint
```

## Deploy

- Recommended: Vercel for the frontend
- Set `NEXT_PUBLIC_API_URL` in production environment variables
- Ensure the backend is publicly accessible and CORS is configured

## Suggested Roadmap

- Rate limiting and CAPTCHA for feedback submission
- Private/moderated feedback mode and mark-as-resolved
- OAuth (Google/GitHub) in addition to email/password
- Slug/username availability check and custom 404 page
- Tests (unit and e2e) and CI/CD

## Scripts

- `pnpm dev` – development with Turbopack
- `pnpm build` – production build
- `pnpm start` – production server
- `pnpm lint` – static analysis with ESLint

## License

Project for educational/demo purposes for the Tech Lead challenge.
