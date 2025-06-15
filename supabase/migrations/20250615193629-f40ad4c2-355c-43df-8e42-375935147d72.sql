
-- Table for bookings
CREATE TABLE public.bookings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table for gallery items
CREATE TABLE public.gallery_items (
  id BIGINT PRIMARY KEY,
  src TEXT NOT NULL,
  category TEXT NOT NULL,
  alt TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table for admin accounts (username/password pairs)
CREATE TABLE public.admin_accounts (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table for storing custom images (key-value mapping)
CREATE TABLE public.custom_images (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security for all new tables
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_images ENABLE ROW LEVEL SECURITY;

-- RLS policies (open: since localStorage is public, you may wish to tune later)
CREATE POLICY "Public can read/write bookings" ON public.bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public can read/write gallery_items" ON public.gallery_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public can read/write admin_accounts" ON public.admin_accounts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public can read/write custom_images" ON public.custom_images FOR ALL USING (true) WITH CHECK (true);
