# 🌴 Casa Granada — Private Luxury Villa Website

A full-stack resort website for **Casa Granada**, a private luxury villa in Sto. Tomas, Batangas, Philippines.

## ✨ Features

- **Stunning Landing Page** — Hero, About, Amenities, Gallery, Rooms, Reviews, CTA
- **Booking System** — Date picker with availability checking, double-booking prevention
- **Inquiry Form** — Contact form saved to Supabase
- **Gallery Lightbox** — Filterable masonry grid with keyboard navigation
- **Admin Dashboard** — Protected route with Supabase Auth; approve/reject bookings, view inquiries
- **WhatsApp Button** — Floating chat button with tooltip
- **Fully Responsive** — Mobile-first design
- **SEO Ready** — React Helmet meta tags
- **Smooth Animations** — Framer Motion throughout

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Backend | Supabase (Auth, Database, Storage) |
| Date Picker | react-datepicker + date-fns |
| Notifications | react-hot-toast |
| SEO | react-helmet-async |
| Deployment | Vercel |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd casa-granada
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/migrations/001_initial_schema.sql`
3. Go to **Authentication → Users** and create an admin user (this will be the dashboard login)
4. Copy your project URL and anon key from **Settings → API**

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## 📁 Project Structure

```
casa-granada/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky nav with blur effect
│   │   ├── Hero.tsx            # Full-screen hero with CTA
│   │   ├── About.tsx           # Villa description + highlights
│   │   ├── Amenities.tsx       # Amenities grid
│   │   ├── Gallery.tsx         # Masonry gallery + lightbox
│   │   ├── Rooms.tsx           # Room cards
│   │   ├── Reviews.tsx         # Testimonial carousel
│   │   ├── BookingForm.tsx     # Multi-step booking form
│   │   ├── InquiryForm.tsx     # Contact/inquiry form
│   │   ├── BookingSection.tsx  # Booking + inquiry wrapper
│   │   ├── CTASection.tsx      # Full-bleed CTA banner
│   │   ├── Footer.tsx          # Footer with contact info
│   │   └── WhatsAppButton.tsx  # Floating WhatsApp button
│   ├── pages/
│   │   ├── Home.tsx            # Main landing page
│   │   └── Admin.tsx           # Protected admin dashboard
│   ├── services/
│   │   ├── supabaseClient.ts   # Supabase initialization
│   │   ├── reservationsService.ts
│   │   └── inquiriesService.ts
│   ├── hooks/
│   │   └── useAvailability.ts  # Date availability logic
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── .env.example
├── vercel.json
└── README.md
```

---

## 🗄 Database Schema

### `reservations`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Guest full name |
| email | TEXT | Guest email |
| phone | TEXT | Guest phone |
| check_in | DATE | Check-in date |
| check_out | DATE | Check-out date |
| guests | INTEGER | Number of guests (1–20) |
| status | TEXT | `pending` / `approved` / `rejected` |
| special_requests | TEXT | Optional requests |
| created_at | TIMESTAMPTZ | Auto-generated |

### `inquiries`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Contact name |
| email | TEXT | Contact email |
| phone | TEXT | Optional phone |
| message | TEXT | Inquiry message |
| created_at | TIMESTAMPTZ | Auto-generated |

### `gallery_images`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| image_url | TEXT | Image URL (Supabase Storage) |
| caption | TEXT | Optional caption |
| category | TEXT | e.g. Pool, Rooms, Outdoor |
| created_at | TIMESTAMPTZ | Auto-generated |

---

## 🔐 Admin Dashboard

Visit `/admin` to access the dashboard.

- Login with the Supabase user you created
- View all bookings and inquiries
- Approve or reject reservations
- Delete inquiries
- Approved bookings block those dates in the booking calendar

---

## 🚢 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# VITE_SUPABASE_URL
# VITE_SUPABASE_ANON_KEY
```

Or connect your GitHub repo to Vercel for automatic deployments.

---

## 🎨 Customization Checklist

- [ ] Replace placeholder phone number (`+63 9XX XXX XXXX`) in `Navbar.tsx`, `CTASection.tsx`, `Footer.tsx`, `WhatsAppButton.tsx`
- [ ] Replace placeholder email in `Footer.tsx`
- [ ] Update social media links in `Footer.tsx`
- [ ] Replace Google Maps link in `Footer.tsx`
- [ ] Add real property photos (replace Unsplash URLs)
- [ ] Update pricing information if displayed
- [ ] Configure WhatsApp number in `WhatsAppButton.tsx`
- [ ] Update `index.html` OG image URL

---

## 📝 License

MIT — Built for Casa Granada, Sto. Tomas, Batangas, Philippines.
