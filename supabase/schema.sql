-- ==============================================================================
-- ALBERT CHRISTIAN PORTFOLIO - SUPABASE DATABASE SCHEMA
-- Project Reference: dfgdjiauxvercvjrpamj
-- ==============================================================================

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  door_route TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  year TEXT NOT NULL,
  short_description TEXT NOT NULL,
  detailed_description TEXT NOT NULL,
  tech TEXT[] NOT NULL DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  metrics TEXT,
  accent_color TEXT NOT NULL DEFAULT '#1D3254',
  cover_pattern TEXT NOT NULL DEFAULT 'circuit',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for speedy queries by door
CREATE INDEX IF NOT EXISTS idx_projects_door ON public.projects(door_route);
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects(display_order);

-- 2. TIMELINE MILESTONES TABLE
CREATE TABLE IF NOT EXISTS public.timeline_milestones (
  id TEXT PRIMARY KEY,
  number TEXT NOT NULL,
  year TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  date_range TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  badge TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_milestones_order ON public.timeline_milestones(display_order);

-- 3. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  status_text TEXT DEFAULT 'AVAILABLE FOR SELECT PROJECTS',
  location_text TEXT DEFAULT 'BASED IN PEKANBARU · REMOTE-FRIENDLY',
  gpa_score TEXT DEFAULT '3.42 / 4.00',
  company_name TEXT DEFAULT 'Krevia Digital',
  perk_title TEXT DEFAULT 'Perk: Tactile Engineering',
  perk_desc TEXT DEFAULT 'High-precision full-stack builds, native responsiveness, and resilient clean architecture.',
  power_index INTEGER DEFAULT 96,
  stats_matrix JSONB DEFAULT '[
    {"label": "Web Systems (Next.js / React)", "val": 98, "color": "from-amber-400 to-amber-200"},
    {"label": "Native Android (Kotlin / Jetpack)", "val": 94, "color": "from-emerald-400 to-emerald-200"},
    {"label": "ERP & Business Backends", "val": 92, "color": "from-cyan-400 to-cyan-200"},
    {"label": "Creative UI / 3D & Shaders", "val": 96, "color": "from-rose-400 to-amber-300"}
  ]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) & ACCESS CONTROL
-- ==============================================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can read the portfolio items)
DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects" ON public.projects
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can view milestones" ON public.timeline_milestones;
CREATE POLICY "Public can view milestones" ON public.timeline_milestones
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
CREATE POLICY "Public can view site settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);

-- Admin write policies (Service Role / Authenticated users can modify)
DROP POLICY IF EXISTS "Admin write projects" ON public.projects;
CREATE POLICY "Admin write projects" ON public.projects
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write milestones" ON public.timeline_milestones;
CREATE POLICY "Admin write milestones" ON public.timeline_milestones
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write site settings" ON public.site_settings;
CREATE POLICY "Admin write site settings" ON public.site_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Grant privileges for Data API
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

