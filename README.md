# Kingswell Estate Agents Website

Premium estate agency site for **Catford, Lee, Hither Green & Lewisham**.

**Slogan:** Move Like Royalty, Move Well.

---

## Commands (local & Vercel)

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Local development → http://localhost:3000 |
| `npm run build` | Production build (Vercel uses this) |
| `npm start` | Run production build locally |
| `npm run lint` | Lint code |

---

## Deploy to Vercel

1. Push repo to GitHub
2. Import on [vercel.com](https://vercel.com)
3. **Install:** `npm install` · **Build:** `npm run build` (set in `vercel.json`)
4. Copy env vars from `.env.example` into Vercel → Settings → Environment Variables

Full guide: **[docs/VERCEL.md](docs/VERCEL.md)**

---

## Admin panel (recommended)

**URL:** `/kingswell-admin` — login required.

Manage properties, blog, testimonials, team, area guides, site settings, and upload images from the browser.

Full guide: **[docs/ADMIN-PANEL.md](docs/ADMIN-PANEL.md)**

**Database:** MongoDB (`kingswell` database, `content` collection)

```bash
# .env.local
MONGODB_URI=mongodb+srv://...
ADMIN_EMAIL=admin@kingswell.com
ADMIN_PASSWORD=your_secure_password
ADMIN_SESSION_SECRET=openssl_rand_base64_32_output

# First-time: seed database from content/*.json
npm run seed
```

On Vercel, add the same env vars (including `MONGODB_URI`). Optional: `BLOB_READ_WRITE_TOKEN` for image uploads in production.

Alternative: edit **`content/*.json`** directly — see **[docs/ADMIN.md](docs/ADMIN.md)**

---

## Project structure

```
Kingswell/
├── content/              ← Admin: properties, blog, team, areas, testimonials
├── public/
│   ├── logo.png
│   └── images/           ← Admin: upload photos here
├── src/
│   ├── app/              ← Pages & API
│   ├── components/
│   └── lib/
├── docs/
│   ├── ADMIN.md          ← How to manage everything
│   └── VERCEL.md         ← Deployment guide
├── .env.example          ← All environment variables
├── vercel.json           ← install + build commands
└── package.json
```

---

## Environment variables

Copy `.env.example` → `.env.local` for local dev.

Set the same keys in **Vercel → Environment Variables** for production.

See `.env.example` for descriptions of each variable.
