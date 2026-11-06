'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit,
  Save,
  Database,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FolderPlus,
  RefreshCw,
  Sparkles,
  Layers,
  Clock,
  Settings,
  Copy,
  Check,
} from 'lucide-react';
import { DOORS_DATA, ProjectCard } from '@/data/doorsData';

const DOOR_OPTIONS = [
  { label: 'Web Development (Door 01)', route: '/web-developer', color: '#1D3254' },
  { label: 'App Development (Door 02)', route: '/app-developer', color: '#46293B' },
  { label: 'Business Systems (Door 03)', route: '/business-systems', color: '#576F5B' },
  { label: 'AI & GIS Systems (Door 04)', route: '/ai-gis', color: '#1E464B' },
  { label: 'Event & Digital Ops (Door 05)', route: '/event-digital-ops', color: '#9E4F25' },
];

const PATTERN_OPTIONS = ['circuit', 'code', 'blueprint', 'gis', 'stage'] as const;

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'timeline' | 'settings' | 'supabase'>('projects');

  // Projects state
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [filterDoor, setFilterDoor] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'supabase' | 'local_fallback'>('local_fallback');

  // Form modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<ProjectCard> | null>(null);
  const [formTags, setFormTags] = useState('');
  const [formTech, setFormTech] = useState('');
  const [formHighlights, setFormHighlights] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  // Check existing session
  useEffect(() => {
    const saved = sessionStorage.getItem('albert_admin_passcode');
    if (saved) {
      setPasscode(saved);
      verifyLogin(saved);
    }
  }, []);

  const verifyLogin = async (code: string) => {
    setAuthError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: code }),
      });
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        sessionStorage.setItem('albert_admin_passcode', code);
        loadProjects();
      } else {
        setAuthError(data.message || 'Passcode salah.');
      }
    } catch (_err) {
      setAuthError('Gagal menghubungi server.');
    }
  };

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data.projects || []);
      setDataSource(data.source || 'local_fallback');
    } catch (_err) {
      // fallback
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) return;
    verifyLogin(passcode);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('albert_admin_passcode');
    setIsAuthenticated(false);
    setPasscode('');
  };

  // Open modal for create or edit
  const handleOpenCreate = () => {
    setEditingProject({
      id: `proj-${Date.now()}`,
      title: '',
      category: 'Full-Stack Web',
      doorRoute: '/web-developer',
      tags: ['Next.js', 'React', 'Tailwind CSS'],
      year: new Date().getFullYear().toString(),
      shortDescription: '',
      detailedDescription: '',
      tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4'],
      highlights: ['Responsive tactile UI with high performance', 'Clean architecture & API routing'],
      links: { github: '', live: '' },
      metrics: '',
      accentColor: '#1D3254',
      coverPattern: 'circuit',
    });
    setFormTags('Next.js, React, Tailwind CSS');
    setFormTech('Next.js 16, TypeScript, Tailwind CSS v4');
    setFormHighlights('Responsive tactile UI with high performance\nClean architecture & API routing');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: ProjectCard) => {
    setEditingProject(p);
    setFormTags((p.tags || []).join(', '));
    setFormTech((p.tech || []).join(', '));
    setFormHighlights((p.highlights || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    const parsedTags = formTags.split(',').map((s) => s.trim()).filter(Boolean);
    const parsedTech = formTech.split(',').map((s) => s.trim()).filter(Boolean);
    const parsedHighlights = formHighlights.split('\n').map((s) => s.trim()).filter(Boolean);

    const projectToSave: ProjectCard = {
      ...(editingProject as ProjectCard),
      tags: parsedTags,
      tech: parsedTech,
      highlights: parsedHighlights,
    };

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${passcode}`,
        },
        body: JSON.stringify({ project: projectToSave }),
      });

      const resData = await res.json();
      if (res.ok) {
        setIsModalOpen(false);
        setStatusMsg({ text: `Project "${projectToSave.title}" berhasil disimpan!`, type: 'success' });
        loadProjects();
      } else {
        setStatusMsg({ text: resData.error || 'Gagal menyimpan project.', type: 'error' });
      }
    } catch (_err) {
      setStatusMsg({ text: 'Terjadi kesalahan jaringan.', type: 'error' });
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Yakin ingin menghapus project "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${passcode}`,
        },
      });
      if (res.ok) {
        setStatusMsg({ text: `Project "${title}" berhasil dihapus.`, type: 'success' });
        loadProjects();
      }
    } catch (_err) {
      setStatusMsg({ text: 'Gagal menghapus project.', type: 'error' });
    }
  };

  const handleSeedDatabase = async () => {
    if (!confirm('Ini akan menyalin seluruh default project & milestone portfolio ke Supabase. Lanjutkan?')) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${passcode}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMsg({ text: data.message, type: 'success' });
        loadProjects();
      } else {
        setStatusMsg({ text: data.error || 'Seed gagal.', type: 'error' });
      }
    } catch (_err) {
      setStatusMsg({ text: 'Gagal menghubungi server untuk seed.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const copySqlToClipboard = () => {
    const sql = `-- Run this in Supabase SQL Editor (Project Ref: dfgdjiauxvercvjrpamj)
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

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT ALL ON TABLE public.projects TO anon, authenticated, service_role;`;
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  // Filter projects by door
  const filteredProjects = projects.filter((p) => {
    if (filterDoor === 'all') return true;
    return p.doorRoute === filterDoor;
  });

  // 1. LOCKED LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0D0E12] text-[#FAF7F2] flex items-center justify-center p-4 font-sans select-none">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#15171F] border border-[#2D303E] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden">
          {/* Subtle glowing amber backdrop */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">Executive Vault</h1>
              <p className="text-xs font-mono text-[#8E877D]">PORTAL CMS · URL-ONLY ACCESS</p>
            </div>
          </div>

          <p className="text-xs text-[#B2A99E] mb-6 leading-relaxed">
            Portal ini tersembunyi dan tidak terindeks publik. Masukkan Access Passcode untuk mengelola project, Supabase, dan konten dinamis.
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9E978D] mb-1.5 font-bold">
                Master Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Masukkan passcode admin..."
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-[#0F1015] border border-[#2A2D3A] focus:border-amber-400 focus:outline-none text-white text-sm font-mono tracking-widest placeholder-[#524E48]"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#121318] font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Chamber</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#6E675D]">
            <span>DEFAULT: krevia2026</span>
            <Link href="/" className="hover:text-amber-300 transition-colors">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#0C0D11] text-[#FAF7F2] font-sans pb-24">
      {/* TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#12141B]/90 backdrop-blur-md border-b border-[#242733] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 transition-all border border-white/10"
            title="Lihat Website Publik"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-base font-extrabold tracking-tight">Albert Christian — Admin Chamber</h1>
            </div>
            <p className="text-[10px] font-mono text-amber-300/80 tracking-wider">
              PORTAL CONTROL · URL ROUTE: /admin-portal
            </p>
          </div>
        </div>

        {/* Status Pills & Logout */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181B24] border border-[#2B2F3D] text-[11px] font-mono">
            <Database className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[#A39B8F]">Supabase:</span>
            <span className={dataSource === 'supabase' ? 'text-emerald-400 font-bold' : 'text-amber-300 font-bold'}>
              {dataSource === 'supabase' ? 'Connected (Live)' : 'Local Fallback'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-mono font-medium transition-all cursor-pointer"
          >
            Lock Vault
          </button>
        </div>
      </header>

      {/* STATUS NOTIFICATION TOAST */}
      {statusMsg && (
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <div
            className={`p-3.5 rounded-2xl border text-xs font-mono flex items-center justify-between gap-3 ${
              statusMsg.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusMsg(null)}
              className="text-xs underline cursor-pointer hover:opacity-80"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* DASHBOARD NAVIGATION TABS */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#14161E] border border-[#242735]">
          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-amber-400 text-[#121318] shadow-md'
                : 'text-[#9E978D] hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Projects Manager ({projects.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('supabase')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'supabase'
                ? 'bg-amber-400 text-[#121318] shadow-md'
                : 'text-[#9E978D] hover:text-white hover:bg-white/5'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase Sync &amp; SQL</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-amber-400 text-[#121318] shadow-md'
                : 'text-[#9E978D] hover:text-white hover:bg-white/5'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Timeline Story</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-amber-400 text-[#121318] shadow-md'
                : 'text-[#9E978D] hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Site &amp; Ability Card</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PROJECTS MANAGER */}
      {activeTab === 'projects' && (
        <main className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
          {/* Action Row & Category Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#14161E] border border-[#242733]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[#8E877D] mr-1">Door Filter:</span>
              <button
                type="button"
                onClick={() => setFilterDoor('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  filterDoor === 'all'
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-white/70'
                }`}
              >
                All Doors ({projects.length})
              </button>

              {DOOR_OPTIONS.map((d) => (
                <button
                  key={d.route}
                  type="button"
                  onClick={() => setFilterDoor(d.route)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    filterDoor === d.route
                      ? 'bg-amber-400 text-black font-bold'
                      : 'bg-white/5 hover:bg-white/10 text-white/70'
                  }`}
                >
                  {d.label.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={loadProjects}
                disabled={isLoading}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-all cursor-pointer"
                title="Refresh projects"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              <button
                type="button"
                onClick={handleOpenCreate}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#121318] font-bold text-xs font-mono tracking-wide transition-all shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Tambah Project Baru</span>
              </button>
            </div>
          </div>

          {/* Projects Table / Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((p) => {
              const doorMeta = DOOR_OPTIONS.find((d) => d.route === p.doorRoute);

              return (
                <div
                  key={p.id}
                  className="rounded-2xl bg-[#14161F] border border-[#232635] p-5 flex flex-col justify-between hover:border-amber-400/30 transition-all group shadow-sm"
                >
                  <div>
                    {/* Top Meta */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider"
                        style={{
                          backgroundColor: `${p.accentColor || '#1D3254'}30`,
                          color: '#FAF7F2',
                          border: `1px solid ${p.accentColor || '#1D3254'}60`,
                        }}
                      >
                        {doorMeta?.label.split('(')[0] || p.doorRoute}
                      </span>
                      <span className="text-[11px] font-mono text-[#8E877D]">{p.year}</span>
                    </div>

                    {/* Title & Category */}
                    <h3 className="font-extrabold text-base text-white tracking-tight leading-snug mb-1">
                      {p.title}
                    </h3>
                    <div className="text-xs font-mono text-amber-300/80 mb-3">{p.category}</div>

                    <p className="text-xs text-[#B2A99E] line-clamp-2 mb-4 leading-relaxed">
                      {p.shortDescription}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-[#DDD6CC]"
                        >
                          {tag}
                        </span>
                      ))}
                      {p.tags.length > 3 && (
                        <span className="text-[10px] font-mono text-[#8E877D] self-center">
                          +{p.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions & Links */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {p.links?.live && (
                        <a
                          href={p.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-mono text-amber-300 hover:underline flex items-center gap-1"
                        >
                          <span>Live</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {p.links?.github && (
                        <a
                          href={p.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-mono text-[#A39B8F] hover:text-white flex items-center gap-1"
                        >
                          <span>Code</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 transition-all cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(p.id, p.title)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-all cursor-pointer"
                        title="Hapus Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* TAB 2: SUPABASE SYNC & SQL */}
      {activeTab === 'supabase' && (
        <main className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
          <div className="p-6 rounded-2xl bg-[#14161F] border border-[#242733] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold tracking-tight">Supabase PostgreSQL Connection</h2>
                <p className="text-xs font-mono text-emerald-400">PROJECT REF: dfgdjiauxvercvjrpamj</p>
              </div>
            </div>

            <p className="text-xs text-[#B2A99E] leading-relaxed">
              Website ini telah disiapkan untuk tersambung langsung dengan proyek Supabase Anda. Anda dapat mengklik tombol di bawah untuk menyalin seluruh project awal (15 project), milestone timeline, dan setting ke database Supabase Anda secara otomatis.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSeedDatabase}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs font-mono tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isLoading ? 'Sedang Menyalin...' : '⚡ Seed Default Data ke Supabase'}</span>
              </button>

              <button
                type="button"
                onClick={copySqlToClipboard}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs transition-all cursor-pointer"
              >
                {copiedSql ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? 'Tersalin!' : 'Copy SQL Schema (Untuk SQL Editor)'}</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#14161F] border border-[#242733] space-y-3 font-mono text-xs">
            <h3 className="font-bold text-amber-300 uppercase tracking-wider">Petunjuk Konfigurasi API Key (.env.local)</h3>
            <p className="text-[#8E877D] text-[11px] leading-relaxed">
              Buka file <code className="text-amber-200">.env.local</code> di folder root, lalu masukkan <strong>anon key</strong> dan <strong>service role key</strong> dari dashboard Supabase Anda:
            </p>
            <pre className="p-4 rounded-xl bg-[#0C0D11] border border-white/5 text-[11px] text-amber-200/90 overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://dfgdjiauxvercvjrpamj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh... (dari Supabase Dashboard > Settings > API)
SUPABASE_SERVICE_ROLE_KEY=eyJh... (dari Supabase Dashboard > Settings > API)
ADMIN_SECRET_KEY=krevia2026`}
            </pre>
          </div>
        </main>
      )}

      {/* TAB 3: TIMELINE & STORY */}
      {activeTab === 'timeline' && (
        <main className="max-w-4xl mx-auto px-4 mt-6 space-y-4">
          <div className="p-6 rounded-2xl bg-[#14161F] border border-[#242733]">
            <h2 className="text-base font-extrabold tracking-tight mb-1">Story Timeline Milestones</h2>
            <p className="text-xs text-[#8E877D] font-mono mb-6">
              Bagian ini terhubung dengan section 3D Let’s Go Back in Time.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0D0E13] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-amber-300 font-bold">
                  <span>01 · 2026</span>
                  <span>OCT 2026 — NOW</span>
                </div>
                <div className="font-bold text-white text-sm">Independent Freelancer — Krevia Digital</div>
                <p className="text-xs text-[#A8A196]">Websites, mobile apps, interfaces and brand creatives.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0D0E13] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-amber-300 font-bold">
                  <span>02 · 2026</span>
                  <span>AUG 2026 — JAN 2027</span>
                </div>
                <div className="font-bold text-white text-sm">IT Operations Intern — Swiss-Belinn SKA Pekanbaru</div>
                <p className="text-xs text-[#A8A196]">Deploying SIPU Management System &amp; IT Helpdesk portal.</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 4: SETTINGS */}
      {activeTab === 'settings' && (
        <main className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
          <div className="p-6 rounded-2xl bg-[#14161F] border border-[#242733] space-y-4">
            <h2 className="text-base font-extrabold tracking-tight">Profile &amp; Ability Card Parameters</h2>
            <p className="text-xs text-[#8E877D] font-mono">
              Atur status ketersediaan, skor kemampuan, dan data almamater.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-[#8E877D] mb-1 font-bold">Status Strip Text</label>
                <input
                  type="text"
                  defaultValue="AVAILABLE FOR SELECT PROJECTS"
                  className="w-full px-3 py-2 rounded-xl bg-[#0C0D11] border border-[#2B2E3D] text-white"
                />
              </div>

              <div>
                <label className="block text-[#8E877D] mb-1 font-bold">Location Text</label>
                <input
                  type="text"
                  defaultValue="BASED IN PEKANBARU · REMOTE-FRIENDLY"
                  className="w-full px-3 py-2 rounded-xl bg-[#0C0D11] border border-[#2B2E3D] text-white"
                />
              </div>

              <div>
                <label className="block text-[#8E877D] mb-1 font-bold">Company Brand</label>
                <input
                  type="text"
                  defaultValue="Krevia Digital"
                  className="w-full px-3 py-2 rounded-xl bg-[#0C0D11] border border-[#2B2E3D] text-white"
                />
              </div>

              <div>
                <label className="block text-[#8E877D] mb-1 font-bold">Education &amp; GPA</label>
                <input
                  type="text"
                  defaultValue="Politeknik Caltex Riau · GPA 3.42 / 4.00"
                  className="w-full px-3 py-2 rounded-xl bg-[#0C0D11] border border-[#2B2E3D] text-white"
                />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* MODAL: ADD / EDIT PROJECT */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#141620] border border-[#2A2E3E] rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-amber-300" />
                <h2 className="text-lg font-extrabold text-white">
                  {editingProject.id ? 'Edit / Update Project' : 'Tambah Project Baru'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-xs font-mono text-white/50 hover:text-white px-2 py-1 rounded-lg bg-white/5"
              >
                ESC / Tutup
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block font-mono text-[11px] text-[#A69E93] mb-1 font-bold">Judul Project *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="Contoh: Smart City Portal"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1015] border border-[#2A2D3C] text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* Door Route */}
                <div>
                  <label className="block font-mono text-[11px] text-[#A69E93] mb-1 font-bold">Kategori Pintu (Door) *</label>
                  <select
                    value={editingProject.doorRoute || '/web-developer'}
                    onChange={(e) => {
                      const sel = DOOR_OPTIONS.find((d) => d.route === e.target.value);
                      setEditingProject({
                        ...editingProject,
                        doorRoute: e.target.value,
                        accentColor: sel?.color || editingProject.accentColor,
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1015] border border-[#2A2D3C] text-white focus:border-amber-400 focus:outline-none"
                  >
                    {DOOR_OPTIONS.map((d) => (
                      <option key={d.route} value={d.route}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Subtitle */}
                <div>
                  <label className="block font-mono text-[11px] text-[#A69E93] mb-1 font-bold">Sub-Kategori / Jenis</label>
                  <input
                    type="text"
                    value={editingProject.category || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    placeholder="Contoh: Full-Stack Web, Native Kotlin"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1015] border border-[#2A2D3C] text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="block font-mono text-[11px] text-[#A69E93] mb-1 font-bold">Tahun Rilis</label>
                  <input
                    type="text"
                    value={editingProject.year || '2026'}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1015] border border-[#2A2D3C] text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* Accent Color */}
                <div>
                  <label className="block font-mono text-[11px] text-[#A69E93] mb-1 font-bold">Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingProject.accentColor || '#1D3254'}
                      onChange={(e) => setEditingProject({ ...editingProject, accentColor: e.target.value })}
                      className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={editingProject.accentColor || '#1D3254'}
                      onChange={(e) => setEditingProject({ ...editingProject, accentColor: e.target.value })}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-[#0E1015] border border-[#2A2D3C] text-white font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Cover Pattern */}
                <div>
                  <label className="block font-mono text-[11px] text-[#A69E93] mb-1 font-bold">Cover Pattern (3D Interior)</label>
                  <select
                    value={editingProject.coverPattern || 'circuit'}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        coverPattern: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1015] border border-[#2A2D3C] text-white focus:border-amber-400 focus:outline-none"
                  >
                    {PATTERN_OPTIONS.map((pat) => (
                      <option key={pat} value={pat}>
                        {pat.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block font-mono text-[11px] text-[#A69E93] mb-1 font-bold">
                  Ringkasan Singkat (Short Description) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={editingProject.shortDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  placeholder="Deskripsi singkat yang muncul pada kartu preview..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1015] border border-[#2A2D3C] text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block font-mono text-[11px] text-[#A69E93] mb-1 font-bold">
                  Deskripsi Lengkap (Detailed Description)
                </label>
                <textarea
                  rows={3}
                  value={editingProject.detailedDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, detailedDescription: e.target.value })}
                  placeholder="Detail arsitektur, tantangan yang diselesaikan, dan dampak teknis..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1015] border border-[#2A2D3C] text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Tags & Tech */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-[#A69E93] mb-1 font-bold">
                    Tags (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="Next.js 16, TypeScript, GSAP"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1015] border border-[#2A2D3C] text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-[#A69E93] mb-1 font-bold">
                    Tech Stack (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={formTech}
                    onChange={(e) => setFormTech(e.target.value)}
                    placeholder="React 19, Tailwind CSS v4, Turbopack"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1015] border border-[#2A2D3C] text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Highlights (bullet points) */}
              <div>
                <label className="block font-mono text-[11px] text-[#A69E93] mb-1 font-bold">
                  Highlights / Poin Keunggulan (Satu per baris)
                </label>
                <textarea
                  rows={2}
                  value={formHighlights}
                  onChange={(e) => setFormHighlights(e.target.value)}
                  placeholder="3D perspective physics&#10;Lighthouse 95+ Score&#10;Real-time WebSocket telemetry"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1015] border border-[#2A2D3C] text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Links & Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono text-[11px] text-[#A69E93] mb-1 font-bold">GitHub URL</label>
                  <input
                    type="url"
                    value={editingProject.links?.github || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        links: { ...editingProject.links, github: e.target.value },
                      })
                    }
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-[#0E1015] border border-[#2A2D3C] text-white"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-[#A69E93] mb-1 font-bold">Live Demo URL</label>
                  <input
                    type="url"
                    value={editingProject.links?.live || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        links: { ...editingProject.links, live: e.target.value },
                      })
                    }
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-[#0E1015] border border-[#2A2D3C] text-white"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-[#A69E93] mb-1 font-bold">Metrics Badge</label>
                  <input
                    type="text"
                    value={editingProject.metrics || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, metrics: e.target.value })}
                    placeholder="Lighthouse 95+ / 70 Users"
                    className="w-full px-3 py-2 rounded-xl bg-[#0E1015] border border-[#2A2D3C] text-white"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-mono text-xs transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold font-mono text-xs tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan ke Database</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

