import { Metadata } from 'next';
import { DOORS_DATA, ALL_PROJECTS } from '@/data/doorsData';
import { ProjectPageTemplate } from '@/components/projects/ProjectPageTemplate';

export const metadata: Metadata = {
  title: 'Web Development | Albert Christian — Founder, Krevia Digital',
  description: 'From sketch to live site: modern web architectures, Next.js, React, SEO, and full-stack software systems engineered by Albert Christian.',
};

export default function WebDeveloperPage() {
  const door = DOORS_DATA.find((d) => d.id === 'web-developer')!;
  const projects = ALL_PROJECTS.filter((p) => p.doorRoute === '/web-developer');

  return <ProjectPageTemplate door={door} projects={projects} />;
}
