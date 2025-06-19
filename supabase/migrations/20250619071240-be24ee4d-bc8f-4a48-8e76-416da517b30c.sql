
-- Create storage bucket for gallery media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-media',
  'gallery-media', 
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime']
);

-- Create RLS policies for the gallery-media bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-media');
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-media');
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING (bucket_id = 'gallery-media');
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (bucket_id = 'gallery-media');

-- Clean up existing blob URLs from gallery_items
UPDATE gallery_items 
SET src = CASE 
  WHEN src LIKE 'blob:%' THEN 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80'
  ELSE src
END
WHERE src LIKE 'blob:%';
