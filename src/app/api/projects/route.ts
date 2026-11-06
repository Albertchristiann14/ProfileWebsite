import { NextResponse } from 'next/server';
import { getSupabaseAdminClient, getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { ALL_PROJECTS, ProjectCard } from '@/data/doorsData';

// Helper: map Supabase DB row to ProjectCard
function mapRowToProject(row: any): ProjectCard {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    doorRoute: row.door_route,
    tags: Array.isArray(row.tags) ? row.tags : [],
    year: row.year || '2026',
    shortDescription: row.short_description || '',
    detailedDescription: row.detailed_description || '',
    tech: Array.isArray(row.tech) ? row.tech : [],
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    images: Array.isArray(row.images) ? row.images : [],
    links: {
      github: row.github_url || undefined,
      live: row.live_url || undefined,
    },
    metrics: row.metrics || undefined,
    accentColor: row.accent_color || '#1D3254',
    coverPattern: (row.cover_pattern as any) || 'circuit',
  };
}

// Helper: map ProjectCard to Supabase DB row
function mapProjectToRow(p: Partial<ProjectCard>, displayOrder: number = 0) {
  return {
    id: p.id || `proj-${Date.now()}`,
    title: p.title || 'Untitled Project',
    category: p.category || 'General',
    door_route: p.doorRoute || '/web-developer',
    tags: p.tags || [],
    year: p.year || new Date().getFullYear().toString(),
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
    display_order: displayOrder,
    updated_at: new Date().toISOString(),
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const door = searchParams.get('door');

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      if (supabase) {
        let query = supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (door) {
          query = query.eq('door_route', door);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return NextResponse.json({
            source: 'supabase',
            projects: data.map(mapRowToProject),
          });
        }
      }
    }

    // Fallback to static data
    let fallback = ALL_PROJECTS;
    if (door) {
      fallback = fallback.filter((p) => p.doorRoute === door);
    }

    return NextResponse.json({
      source: 'local_fallback',
      projects: fallback,
    });
  } catch (_error) {
    return NextResponse.json(
      { source: 'local_fallback', projects: ALL_PROJECTS },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const secret = process.env.ADMIN_SECRET_KEY || 'krevia2026';
    const providedSecret = authHeader.replace('Bearer ', '').trim();

    if (providedSecret !== secret.trim()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const project = body.project as ProjectCard;

    if (!project || !project.title || !project.doorRoute) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const adminClient = getSupabaseAdminClient();
    if (!adminClient) {
      return NextResponse.json(
        {
          error:
            'Supabase is not yet connected or API key is missing. Add NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local to persist directly to Supabase.',
          mockSaved: true,
          project,
        },
        { status: 200 }
      );
    }

    const row = mapProjectToRow(project, body.displayOrder || 0);
    const { data, error } = await adminClient
      .from('projects')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      project: mapRowToProject(data),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const secret = process.env.ADMIN_SECRET_KEY || 'krevia2026';
    const providedSecret = authHeader.replace('Bearer ', '').trim();

    if (providedSecret !== secret.trim()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const adminClient = getSupabaseAdminClient();
    if (!adminClient) {
      return NextResponse.json({ success: true, mockDeleted: true });
    }

    const { error } = await adminClient.from('projects').delete().eq('id', id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

