CREATE TABLE public.bin_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bin_object_id text NOT NULL,
  bin_name text,
  bin_location text,
  bin_type text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  status text NOT NULL DEFAULT 'reported' CHECK (status IN ('reported', 'resolved')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.bin_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own reports" ON public.bin_reports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reports" ON public.bin_reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_bin_reports_user ON public.bin_reports(user_id);
