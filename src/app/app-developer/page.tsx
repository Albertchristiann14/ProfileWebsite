import { Metadata } from 'next';
import { DOORS_DATA, ALL_PROJECTS } from '@/data/doorsData';
import { ProjectPageTemplate } from '@/components/projects/ProjectPageTemplate';

export const metadata: Metadata = {
  title: 'App Development | Albert Christian — Kotlin & Firebase',
  description: 'Android apps that ship: Kotlin native development, Firebase Cloud Firestore, authentication, and Play Store ready architecture by Albert Christian.',
};

export default function AppDeveloperPage() {
  const door = DOORS_DATA.find((d) => d.id === 'app-developer')!;
  const projects = ALL_PROJECTS.filter((p) => p.doorRoute === '/app-developer');

  return <ProjectPageTemplate door={door} projects={projects} />;
}
