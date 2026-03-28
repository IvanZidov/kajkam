-- Create storage bucket for scan images
INSERT INTO storage.buckets (id, name, public) VALUES ('scan-images', 'scan-images', true);

-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload scan images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'scan-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public read access (images are not sensitive)
CREATE POLICY "Public read scan images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'scan-images');

-- Add image_url column to scan_history
ALTER TABLE public.scan_history ADD COLUMN IF NOT EXISTS image_url text;
