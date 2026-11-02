import { Metadata } from 'next';
import { DOORS_DATA, ALL_PROJECTS } from '@/data/doorsData';
import { ProjectPageTemplate } from '@/components/projects/ProjectPageTemplate';

export const metadata: Metadata = {
  title: 'Event & Digital Ops | Albert Christian — Tech Behind The Show',
  description: 'On-site digital operations, videotron visual switching for BTN Priority, mass attendee coordination (Buddhayana Run, PCR Fun Run), and digital marketing systems.',
};

export default function EventDigitalOpsPage() {
  const door = DOORS_DATA.find((d) => d.id === 'event-digital-ops')!;
  const projects = ALL_PROJECTS.filter((p) => p.doorRoute === '/event-digital-ops');

  return <ProjectPageTemplate door={door} projects={projects} />;
}
