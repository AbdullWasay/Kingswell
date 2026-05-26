# Kingswell Admin Panel

**URL:** `https://yourdomain.co.uk/kingswell-admin`

## Login

1. Open `/kingswell-admin`
2. Sign in with your admin email and password:
   - `ADMIN_EMAIL` (e.g. `admin@kingswell.com`)
   - `ADMIN_PASSWORD`

## Database

All website content is stored in **MongoDB** (`kingswell` database, `content` collection).

```bash
MONGODB_URI=mongodb+srv://...@cluster.mongodb.net/kingswell
```

First-time setup (imports `content/*.json` into MongoDB):

```bash
npm run seed
```

## What you can manage

| Section | Actions |
|---------|---------|
| **Dashboard** | Overview and quick links |
| **Form Enquiries** | All contact, valuation, viewing, and landlord form submissions |
| **Site Settings** | Phone, email, WhatsApp, address, hours, social links |
| **Properties** | Add, edit, delete listings; upload photos; set featured |
| **Blog** | Create and edit property insight articles |
| **Testimonials** | Add/edit Google-style reviews |
| **Team** | Update staff photos, names, roles, bios |
| **Area Guides** | Edit Catford, Lee, Hither Green, Lewisham content |
| **Why Choose** | Homepage selling points |

## Image uploads

Use the **Upload** field in any form. Images are stored in:
- **Local dev:** `public/images/`
- **Vercel production:** Vercel Blob (requires `BLOB_READ_WRITE_TOKEN`)

## Environment variables

```bash
MONGODB_URI=mongodb+srv://...
ADMIN_EMAIL=admin@kingswell.com
ADMIN_PASSWORD=your_secure_password
ADMIN_SESSION_SECRET=random_string_at_least_32_chars
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...   # Optional: image uploads on Vercel
```

Generate session secret:
```bash
openssl rand -base64 32
```

## Security notes

- Use a **strong** `ADMIN_PASSWORD`
- Never commit `.env.local` to git
- Admin routes are blocked from search engines (`noindex`)
- Session expires after 8 hours
- Change default password before going live

## Form enquiries

All form submissions are stored in MongoDB (`leads` collection) and visible under **Form Enquiries** in the admin panel.

They are also sent to:
- Email (`RESEND_API_KEY` + `LEADS_EMAIL`)
- CRM webhook (`CRM_WEBHOOK_URL`) when configured

## Production on Vercel

Add `MONGODB_URI` and all `ADMIN_*` variables in Vercel → Environment Variables.

Run `npm run seed` once (locally with production URI) to populate MongoDB, or let the app auto-seed on first request if the collection is empty.

For image uploads on Vercel, optionally add `BLOB_READ_WRITE_TOKEN` (otherwise use image URLs).
