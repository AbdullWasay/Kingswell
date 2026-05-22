# Admin Guide — Managing Kingswell Website

This guide explains how you (as admin) can do everything listed in `Requirements.txt` without being a developer.

---

## Three ways to manage the site

| Method | Best for | Technical level |
|--------|----------|-----------------|
| **A. Edit JSON + images** (built-in) | Content, blog, team, testimonials, areas | Low — edit files, push to Git |
| **B. CRM property feed** (automatic) | Live listings from Alto / Reapit / Street | Set up once in Vercel env |
| **C. Visual CMS** (optional upgrade) | Non-technical daily editing | Sanity / Contentful — see bottom |

---

## A. Built-in content (no code)

All editable content lives in the **`content/`** folder. After you change a file, commit and push to Git — Vercel redeploys in ~2 minutes.

### Contact details, hours, social links

**File:** `content/site.json`

```json
{
  "phone": "020 8123 4567",
  "email": "hello@kingswellagents.co.uk",
  "whatsapp": "447700900123",
  "address": "12 Rushey Green, Catford, London SE6 4JF"
}
```

You can also override phone/email/WhatsApp in **Vercel env** without editing files:
- `NEXT_PUBLIC_PHONE`
- `NEXT_PUBLIC_EMAIL`
- `NEXT_PUBLIC_WHATSAPP`

---

### Add / edit / remove properties

**File:** `content/properties.json`

Each property is one object. Key fields:

| Field | Example |
|-------|---------|
| `slug` | `victorian-semi-catford` (URL: `/properties/for-sale/victorian-semi-catford`) |
| `type` | `"sale"` or `"let"` |
| `price` | `625000` (number, no £) |
| `priceLabel` | `"£625,000"` or `"£1,850 pcm"` |
| `images` | Array of image URLs or paths like `"/images/properties/1/front.jpg"` |
| `featured` | `true` — shows on homepage |
| `status` | `"available"`, `"under-offer"`, `"let-agreed"`, `"sold"` |

**Upload photos:**
1. Put files in `public/images/properties/your-slug/` (e.g. `front.jpg`, `kitchen.jpg`)
2. Reference them as `"/images/properties/your-slug/front.jpg"` in the `images` array

**Remove a listing:** Delete its object from `properties.json` and push.

---

### Testimonials (Google-style reviews)

**File:** `content/testimonials.json`

Add a new block:

```json
{
  "id": "5",
  "name": "Mr Smith",
  "text": "Excellent service...",
  "rating": 5,
  "date": "2026-04-01"
}
```

For **live Google Reviews**, add to Vercel env:
- `NEXT_PUBLIC_GOOGLE_REVIEWS_EMBED_URL` — embed URL from Google Business Profile

---

### Team profiles

**File:** `content/team.json`

Upload headshots to `public/images/team/` and set `"image": "/images/team/jane.jpg"`.

---

### Area guides (Catford, Lee, Hither Green, Lewisham)

**File:** `content/areas.json`

Edit `schools`, `transport`, `lifestyle`, `marketInsights`, `amenities` arrays for each area.  
Pages auto-update at `/areas/catford`, `/areas/lee`, etc.

---

### Homepage “Why Choose Kingswell”

**File:** `content/why-choose.json`

Edit titles and descriptions. Icons must be one of: `MapPin`, `Megaphone`, `Camera`, `Share2`, `Shield`, `Zap`.

---

### Blog posts

**File:** `content/blog.json`

Add a post:

```json
{
  "slug": "my-new-article",
  "title": "Your Title",
  "excerpt": "Short summary for listing page",
  "publishedAt": "2026-05-20",
  "author": "Marcus Kingswell",
  "image": "/images/blog/my-article.jpg",
  "body": "Paragraph one.\n\nParagraph two."
}
```

Use `\n\n` between paragraphs. Page appears at `/blog/my-new-article`.

---

### Logo & static images

| Asset | Location |
|-------|----------|
| Logo | `public/logo.png` (replace file, keep same name) |
| Hero / general | `public/images/` |
| Property photos | `public/images/properties/` |
| Team photos | `public/images/team/` |
| Blog images | `public/images/blog/` |

---

## B. Automatic property sync (CRM / portals)

When you connect your estate agency CRM, listings update **without** editing JSON.

1. In **Vercel → Environment Variables**, set:
   - `PROPERTY_FEED_URL` — XML/JSON feed URL from your CRM or Rightmove/Zoopla/OTM
   - `PROPERTY_FEED_API_KEY` — if required
   - `CRM_WEBHOOK_URL` + `CRM_API_KEY` + `CRM_PROVIDER` (`alto` | `reapit` | `street`)

2. Your CRM provider gives you the feed URL (ask Alto / Reapit / Street support).

3. Leads from forms already go to `POST /api/leads` → email + CRM webhook.

**Supported CRMs (per requirements):** Alto, Reapit, Street — via webhook on form submit.

---

## C. Lead capture & enquiries

All forms (valuation, viewing, contact, landlord) send to:

1. **Email** — set `RESEND_API_KEY` + `LEADS_EMAIL` in Vercel  
2. **CRM** — set `CRM_WEBHOOK_URL`  
3. **WhatsApp** — visitors use the green button; number from `NEXT_PUBLIC_WHATSAPP`

**View leads without code:** Check your email inbox and CRM dashboard.

---

## D. Social media & Instagram

- Links: edit `content/site.json` → `social.instagram`, etc.
- **Instagram feed on site:** set `NEXT_PUBLIC_INSTAGRAM_USERNAME` in Vercel (embed can be added to homepage when username is set).

---

## E. SEO (mostly automatic)

Already handled for you:

- Page titles & descriptions per page
- `sitemap.xml` and `robots.txt`
- JSON-LD schema (estate agent + properties)
- Local keywords in metadata

**You should:** Keep area guide and blog content rich with local terms (Catford, Lee, Hither Green, Lewisham).

---

## Workflow summary (typical admin week)

1. **New listing** → Add to CRM *or* `content/properties.json` + upload photos to `public/images/properties/`
2. **Sold / let** → Change `status` in JSON or mark in CRM
3. **New review** → Add to `content/testimonials.json`
4. **Blog article** → Add to `content/blog.json`
5. **Price change** → Update `price` and `priceLabel` in properties JSON
6. **Push to Git** → Vercel deploys automatically

### Using GitHub without terminal

1. Open your repo on **github.com**
2. Click the file (e.g. `content/properties.json`) → **Edit** (pencil icon)
3. Save → **Commit changes**
4. Vercel rebuilds the site

---

## Optional upgrade: Visual CMS (Sanity / Contentful)

If you want a WordPress-like admin panel (click to edit, no JSON):

1. Create a free **Sanity** or **Contentful** project
2. Mirror the schemas: Property, BlogPost, Testimonial, TeamMember, AreaGuide
3. Connect to Next.js (we can wire this in a follow-up)
4. Editors use sanity.io/studio — no Git required

Until then, **`content/*.json` + GitHub web editor** fulfils all CMS requirements from your brief.

---

## Quick reference — requirement → how you do it

| Requirement | How admin does it |
|-------------|-------------------|
| Add/edit properties | `content/properties.json` or CRM feed |
| Upload blogs | `content/blog.json` |
| Change images/text | `public/images/` + JSON files |
| Add testimonials | `content/testimonials.json` |
| Edit area guides | `content/areas.json` |
| CRM integration | Vercel env: `CRM_*` |
| Property feed (RM/Zoopla/OTM) | Vercel env: `PROPERTY_FEED_*` |
| Lead capture → email | Vercel env: `RESEND_API_KEY`, `LEADS_EMAIL` |
| WhatsApp | Vercel env: `NEXT_PUBLIC_WHATSAPP` |
| Google Reviews | `content/testimonials.json` or live embed env |
| Instagram | `content/site.json` + `NEXT_PUBLIC_INSTAGRAM_USERNAME` |
