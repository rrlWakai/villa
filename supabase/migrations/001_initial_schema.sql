-- ============================================================
-- Casa Granada - Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. RESERVATIONS TABLE
CREATE TABLE IF NOT EXISTS public.reservations (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT NOT NULL,
  check_in    DATE NOT NULL,
  check_out   DATE NOT NULL,
  guests      INTEGER NOT NULL CHECK (guests BETWEEN 1 AND 20),
  status      TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  special_requests TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for availability checks
CREATE INDEX IF NOT EXISTS idx_reservations_dates ON public.reservations (check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON public.reservations (status);

-- 2. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. GALLERY IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url  TEXT NOT NULL,
  caption    TEXT,
  category   TEXT DEFAULT 'General',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- RESERVATIONS POLICIES
-- Public can insert (create booking requests)
CREATE POLICY "Public can create reservations"
  ON public.reservations FOR INSERT
  TO anon
  WITH CHECK (true);

-- Public can read approved reservations dates (for availability)
CREATE POLICY "Public can read approved dates"
  ON public.reservations FOR SELECT
  TO anon
  USING (status = 'approved');

-- Authenticated admin can do everything
CREATE POLICY "Admin full access to reservations"
  ON public.reservations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- INQUIRIES POLICIES
-- Public can insert inquiries
CREATE POLICY "Public can create inquiries"
  ON public.inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

-- Admin can read/delete inquiries
CREATE POLICY "Admin full access to inquiries"
  ON public.inquiries FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- GALLERY POLICIES
-- Public can read gallery
CREATE POLICY "Public can view gallery"
  ON public.gallery_images FOR SELECT
  TO anon
  USING (true);

-- Admin can manage gallery
CREATE POLICY "Admin full access to gallery"
  ON public.gallery_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- STORAGE BUCKET FOR GALLERY
-- ============================================================

-- Create a public storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public to view gallery images
CREATE POLICY "Public can view gallery images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'gallery');

-- Allow authenticated users to upload/delete gallery images
CREATE POLICY "Admin can manage gallery images"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'gallery')
  WITH CHECK (bucket_id = 'gallery');

-- ============================================================
-- SAMPLE DATA (Optional - remove in production)
-- ============================================================

-- Insert sample approved reservation to test availability blocking
-- INSERT INTO public.reservations (name, email, phone, check_in, check_out, guests, status)
-- VALUES ('Test Guest', 'test@example.com', '+639000000000', '2025-04-01', '2025-04-03', 4, 'approved');
