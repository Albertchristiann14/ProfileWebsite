import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase';
import { ALL_PROJECTS, STORY_TIMELINE } from '@/data/doorsData';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const secret = process.env.ADMIN_SECRET_KEY || 'krevia2026';
    const providedSecret = authHeader.replace('Bearer ', '').trim();

    if (providedSecret !== secret.trim()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminClient = getSupabaseAdminClient();
    if (!adminClient) {
      return NextResponse.json(
        {
          error:
            'Supabase keys not configured yet in .env.local. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY and restart dev server.',
        },
        { status: 400 }
      );
    }

    // 1. Seed Projects
    const projectRows = ALL_PROJECTS.map((p, idx) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      door_route: p.doorRoute,
      tags: p.tags || [],
      year: p.year || '2026',
      short_description: p.shortDescription || '',
      detailed_description: p.detailedDescription || '',
      tech: p.tech || [],
      highlights: p.highlights || [],
      images: p.images || [],
      github_url: p.links?.github || null,
      live_url: p.links?.live || null,
      metrics: p.metrics || null,
      accent_color: p.accentColor || '#1D3254',
      cover_pattern: p.coverPattern || 'circuit',
      display_order: idx + 1,
      updated_at: new Date().toISOString(),
    }));

    const { error: projError } = await adminClient
      .from('projects')
      .upsert(projectRows, { onConflict: 'id' });

    if (projError) {
      return NextResponse.json({ error: `Projects seed failed: ${projError.message}` }, { status: 500 });
    }

    // 2. Seed Milestones
    const milestoneRows = STORY_TIMELINE.map((item, idx) => ({
      id: `milestone-${item.number}`,
      number: item.number,
      year: item.year,
      company: item.company,
      role: item.role,
      date_range: item.dateRange,
      description: item.subtitle,
      highlights: item.bullets,
      badge: item.badge || null,
      display_order: idx + 1,
    }));

    const { error: msError } = await adminClient
      .from('timeline_milestones')
      .upsert(milestoneRows, { onConflict: 'id' });

    if (msError) {
      return NextResponse.json({ error: `Milestones seed failed: ${msError.message}` }, { status: 500 });
    }

    // 3. Seed Site Settings
    await adminClient.from('site_settings').upsert({
      id: 'main',
      status_text: 'AVAILABLE FOR SELECT PROJECTS',
      location_text: 'BASED IN PEKANBARU · REMOTE-FRIENDLY',
      gpa_score: '3.42 / 4.00',
      company_name: 'Krevia Digital',
      perk_title: 'Perk: Tactile Engineering',
      perk_desc: 'High-precision full-stack builds, native responsiveness, and resilient clean architecture.',
      power_index: 96,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });

    return NextResponse.json({
      success: true,
      seededProjects: projectRows.length,
      seededMilestones: milestoneRows.length,
      message: `Successfully seeded ${projectRows.length} projects & ${milestoneRows.length} milestones into Supabase!`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

