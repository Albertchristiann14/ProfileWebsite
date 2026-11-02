import { Metadata } from 'next';
import { DOORS_DATA, ALL_PROJECTS } from '@/data/doorsData';
import { ProjectPageTemplate } from '@/components/projects/ProjectPageTemplate';

export const metadata: Metadata = {
  title: 'AI & GIS Systems | Albert Christian — Data That Explains Itself',
  description: 'Applied machine learning and spatial intelligence: WebGIS Sampah Pekanbaru, AI Invoice Maker with Smart Local Parser, and StockSense AI demand forecasting.',
};

export default function AiGisPage() {
  const door = DOORS_DATA.find((d) => d.id === 'ai-gis')!;
  const projects = ALL_PROJECTS.filter((p) => p.doorRoute === '/ai-gis');

  return <ProjectPageTemplate door={door} projects={projects} />;
}
