import { Metadata } from 'next';
import { DOORS_DATA, ALL_PROJECTS } from '@/data/doorsData';
import { ProjectPageTemplate } from '@/components/projects/ProjectPageTemplate';

export const metadata: Metadata = {
  title: 'Business Systems | Krevia Digital — "Build Smarter. Operate Better."',
  description: 'ERP, POS & internal enterprise tools: SIPU Management System, IT Helpdesk, and modular business architectures for hospitality and UMKM.',
};

export default function BusinessSystemsPage() {
  const door = DOORS_DATA.find((d) => d.id === 'business-systems')!;
  const projects = ALL_PROJECTS.filter((p) => p.doorRoute === '/business-systems');

  return <ProjectPageTemplate door={door} projects={projects} />;
}
