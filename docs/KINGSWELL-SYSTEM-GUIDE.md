# Kingswell Estate Agents — System Guide (Non-Technical)

This guide explains how the Kingswell website works, what your customers see, and how you manage everything through the admin panel. No technical knowledge is required.

---

## 1. What this system is

Kingswell has two parts:

| Part | Who uses it | Purpose |
|------|-------------|---------|
| **Public website** | Buyers, sellers, landlords, tenants | Browse properties, learn about Kingswell, contact you, book valuations |
| **Admin panel** | Kingswell staff only | Update content, add properties, manage reviews and blog posts |

When you save changes in the admin panel, they appear on the live website shortly afterwards—there is no separate “publish” step.

---

## 2. Your website addresses

| Environment | Public website | Admin panel |
|-------------|----------------|-------------|
| **Live (production)** | `https://your-domain.co.uk` | `https://your-domain.co.uk/kingswell-admin` |
| **On your computer (development)** | `http://localhost:3000` | `http://localhost:3000/kingswell-admin` |

Replace `your-domain.co.uk` with your real domain when the site is live (for example `kingswellestateagents.co.uk`).

### Admin login

1. Open the **admin URL** in your browser.
2. Sign in with the **admin email** and **password** that were set up for you (these are not stored on the public site).
3. After login you are taken to the **Dashboard**.

Your session stays active for about **8 hours**, then you will need to sign in again.

**Security:** Use a strong password. Do not share admin login details. The admin area is hidden from Google search results.

---

## 3. What visitors see on the public website

### Homepage

- Premium branding (logo, colours, luxury feel).
- Property search (location, price, bedrooms).
- Latest property listings.
- “Why Choose Kingswell” points.
- **Areas We Cover** — photo cards for London, Kent, Catford, Lewisham, Hither Green, Bromley, Greenwich, Blackheath, and more.
- Client testimonials.
- Invitation to book a free valuation.

### Property listings

- **Properties for sale** — all homes and flats you have marked as available or under offer for sale.
- **Properties to rent** — all rental listings in the same way.
- Each property has photos, description, price, bedrooms, features, and a map.
- Listings marked **Sold** or **Let agreed** are hidden from the public site.

### Service pages

- **Valuation** — request a free property valuation.
- **Landlords** — lettings and property management information.
- **Buyers** — guide for people buying a home.
- **Tenants** — guide for renters.
- **About** — your story and team.
- **Blog** — market updates and advice articles.
- **Contact** — phone, email, address, opening hours, contact form, map.

### Areas & trust

- **Areas We Cover** on the homepage (and anchor link from the menu).
- **Regulated & Protected** section — Property Redress Scheme (PRS) membership and certificate.
- Footer with contact details, links, and legal pages (Privacy, Terms).

### Help for visitors

- **Chat button (bottom right)** — AI assistant that answers questions about your properties, areas, services, and contact details. It only uses information from your website (it does not make up listings).
- **WhatsApp button (bottom right)** — opens WhatsApp to message your business number.

### Contact forms

When someone submits:

- Contact / general enquiry  
- Valuation request  
- Property viewing request  

…the details are saved in the admin panel and also sent to your **leads email inbox** (and optionally to your CRM if that is connected).

---

## 4. Admin panel — full list of what you can do

After logging in, use the **menu on the left** to move between sections.

### Dashboard

- Quick overview of how many properties, blog posts, testimonials, team members, and area guides you have.
- Shortcuts to open each section.

### Form Enquiries

View **every form submission** from the website in one place:

- **Contact page** — general enquiries  
- **Valuation page** — free valuation requests (address, property type, sell/let intent)  
- **Property pages** — viewing requests for a specific listing  
- **Landlords page** — landlord / lettings enquiries  

**You can:**

- See name, email, phone, date, and enquiry type  
- Expand each entry for full details (message, property address, etc.)  
- Filter by enquiry type  
- Delete an entry when no longer needed (e.g. after you have dealt with it)  

New submissions appear automatically as soon as someone submits a form. Email notifications still send if your email service is configured.

### Site Settings

Update business details used across the whole website:

- Agency name and slogan  
- Tagline (e.g. “Premium Estate Agents Covering London & Kent”)  
- Phone number  
- Email address  
- WhatsApp number  
- Office address  
- Opening hours (weekdays, Saturday, Sunday)  
- Social media links (Instagram, Facebook, LinkedIn)  

**Note:** PRS / regulatory membership text is managed in the website configuration files. Contact your developer if PRS details change.

### Properties

This is where you manage everything you sell or let.

**You can:**

- View all properties in a list  
- **Add a new property**  
- **Edit** any existing property  
- **Delete** a property from the website  

**For each property you can set:**

| Field | What it means |
|-------|----------------|
| For sale / To rent | Whether it is a sale or letting |
| Title | Headline shown on the listing |
| Address & area | Location (e.g. Catford, Lewisham, Kent) |
| Price & price label | e.g. £450,000 or £1,200 pcm |
| Bedrooms, bathrooms, receptions | Property size |
| Description | Full text about the home |
| Features | Bullet points (garden, parking, etc.) |
| Photos | Upload multiple images; first image is the main photo |
| Floor plan / EPC | Optional extra images |
| Status | **Available**, **Under offer**, **Sold**, or **Let agreed** (only Available and Under offer show on the site) |
| Featured | Tick to prioritise on the homepage |
| Map position | Used for the property map (your developer can help if unsure) |

**Tip:** Keep status up to date so the website and chat assistant only show homes that are actually on the market.

### Blog

- View all articles  
- **Write a new post** (title, short summary, date, author, main image, full article text)  
- **Edit** or remove posts  
- Posts appear on the Blog page for visitors and help with search engines  

### Testimonials

- Add, edit, or remove **client reviews** (name, review text, star rating, date)  
- Reviews appear on the homepage  

### Team

- Update **staff profiles**: photo, name, job title, short biography  
- Shown on the About page  

### Area Guides

- Edit detailed guides for individual areas (e.g. Catford, Lee, Hither Green, Lewisham)  
- Includes overview, schools, transport, lifestyle, market notes, and a hero image  
- These are separate from the homepage “Areas We Cover” cards (those use photos stored in the project folder—ask your developer to swap images if needed)  

### Why Choose

- Edit the six selling points on the homepage (title, short description, icon name)  
- Examples: London & Kent expertise, modern marketing, photography, etc.  

### Log out

- Use **Log out** in the admin menu when finished, especially on a shared computer.

---

## 5. How content stays in sync

- All website and admin content is stored in a **secure online database** (cloud).
- When you click **Save** in the admin panel, the database updates and the public site refreshes.
- The **chat assistant** reads the same property and contact information, so it stays aligned with what is on the website.

If the website ever looks empty after a new setup, your developer may need to run a one-time **seed** (import) from backup files—this is not something you do day to day.

---

## 6. Images

- In the admin panel, use **Upload** buttons on properties, blog posts, team, etc.
- Photos are stored safely online (Cloudinary when configured) and appear on the live site.
- For best results use clear, well-lit photos in landscape orientation.

---

## 7. Positioning & branding (already on the site)

The site is set up to present Kingswell as:

- A **premium boutique** estate agency  
- Covering **London & Kent** (not only one small neighbourhood)  
- With strong local knowledge and wider reach  
- Contact: **020 8064 3668**, **sales@kingswellestateagents.co.uk**, WhatsApp **07367 087204**  
- Office: **12 Rushey Green, Catford, London SE6 4JF**  

If any of these details change, update **Site Settings** in the admin panel (and tell your developer if legal/PRS wording must change).

---

## 8. What the admin panel does *not* do

| Task | Where to handle it |
|------|-------------------|
| Read contact / valuation form submissions | **Admin → Form Enquiries** (also email if configured) |
| Reply to WhatsApp messages | WhatsApp on your phone |
| Change chat AI API key | Developer / hosting settings (Gemini) |
| Change homepage area photos | Developer (`public/images/areas/`) |
| Domain name, SSL, hosting bills | Your hosting provider (e.g. Vercel) |

---

## 9. Quick reference — admin URLs

```
Login:     /kingswell-admin
Dashboard: /kingswell-admin/dashboard
Enquiries: /kingswell-admin/leads
Settings:  /kingswell-admin/site
Properties:/kingswell-admin/properties
Blog:      /kingswell-admin/blog
Reviews:   /kingswell-admin/testimonials
Team:      /kingswell-admin/team
Areas:     /kingswell-admin/areas
Why Choose:/kingswell-admin/why-choose
```

---

## 10. Typical day-to-day workflow

1. **New listing** — Admin → Properties → Add new → fill details → upload photos → Status “Available” → Save.  
2. **Offer accepted** — Edit property → Status “Under offer”.  
3. **Completed sale/let** — Edit property → Status “Sold” or “Let agreed” (it disappears from the public site).  
4. **New review** — Testimonials → add review → Save.  
5. **Phone/email change** — Site Settings → update → Save.  
6. **Blog post** — Blog → New post → write article → Save.  

---

## 11. Getting help

- **Website or admin not loading** — Contact your developer or hosting support.  
- **Forgotten admin password** — Developer can reset `ADMIN_PASSWORD` in secure settings.  
- **Chat not answering** — Check Gemini API key and billing with your developer.  
- **Forms not arriving** — Check leads email and spam folder; developer checks email/CRM setup.  

---

*Document version: May 2026 — Kingswell Estate Agents website & admin system.*
