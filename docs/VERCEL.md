# Deploy to Vercel

## One-time setup

1. Push this repo to **GitHub** (or GitLab / Bitbucket).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo.
3. Vercel auto-detects Next.js. Confirm these settings:

| Setting | Value |
|---------|--------|
| **Framework Preset** | Next.js |
| **Install Command** | `npm install` |
| **Build Command** | `npm run build` |
| **Output Directory** | *(leave empty — Vercel handles Next.js)* |
| **Node.js Version** | 20.x (recommended) |

4. Add **Environment Variables** (copy from `.env.example`):

   **Required for production:**
   - `MONGODB_URI` — MongoDB Atlas connection string (database: `kingswell`)
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` — admin login
   - `NEXT_PUBLIC_SITE_URL` — e.g. `https://kingswellagents.co.uk`
   - `LEADS_EMAIL` — where form submissions go
   - `NEXT_PUBLIC_WHATSAPP` — UK number without + (e.g. `447700900123`)

   **Recommended:**
   - `RESEND_API_KEY` — email delivery for leads
   - `CRM_WEBHOOK_URL` + `CRM_API_KEY` + `CRM_PROVIDER` — Alto / Reapit / Street

   **Optional:**
   - `PROPERTY_FEED_URL` — auto-sync listings from CRM/portals
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - `NEXT_PUBLIC_GOOGLE_REVIEWS_EMBED_URL`
   - `NEXT_PUBLIC_INSTAGRAM_USERNAME`

5. Click **Deploy**.

Every `git push` to `main` triggers a new deploy automatically.

---

## Local commands (same as Vercel)

```bash
# Install
npm install

# Develop
npm run dev

# Production build (what Vercel runs)
npm run build

# Run production locally
npm start
```

---

## Environment files

| File | Purpose |
|------|---------|
| `.env.example` | Template — commit to git |
| `.env.local` | Your local secrets — **never commit** |

On Vercel, set variables in **Project → Settings → Environment Variables** for Production, Preview, and Development.

---

## Custom domain

1. Vercel → Project → **Settings → Domains**
2. Add `kingswellagents.co.uk` (or your domain)
3. Update DNS at your registrar per Vercel’s instructions
4. Set `NEXT_PUBLIC_SITE_URL` to your live URL

---

## Folder structure (deployment-ready)

```
Kingswell/
├── content/          ← Admin edits (JSON) — see docs/ADMIN.md
├── public/           ← Images, logo, uploads
├── src/              ← App code
├── vercel.json       ← Install + build commands
├── package.json      ← npm install / npm run build
├── .env.example      ← Env template for Vercel
└── docs/
    ├── VERCEL.md     ← This file
    └── ADMIN.md      ← How to manage content
```
