CREATE TABLE public.scan_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  items jsonb NOT NULL DEFAULT '[]',
  co2_saved numeric(6,3) NOT NULL DEFAULT 0,
  points_earned integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.scan_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own scans" ON public.scan_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scans" ON public.scan_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_scan_history_user_id ON public.scan_history(user_id);
