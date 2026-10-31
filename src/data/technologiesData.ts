import { TechItem } from '@/types/portfolio'

export const technologiesData: TechItem[] = [
  // Frontend
  { name: 'React', category: 'Frontend', repoEvidence: ['hrms-swissbell', 'KotaPekanbaru', 'ProjectDL', 'AI-Invoice-Maker', 'WebsiteGisPekanbaru'] },
  { name: 'TypeScript', category: 'Frontend', repoEvidence: ['hrms-swissbell', 'KotaPekanbaru', 'WebsiteGisPekanbaru'] },
  { name: 'Next.js', category: 'Frontend', repoEvidence: ['WebsiteGisPekanbaru'] },
  { name: 'Tailwind CSS', category: 'Frontend', repoEvidence: ['hrms-swissbell', 'it-helpdesk-swissbell', 'KotaPekanbaru', 'WebsiteGisPekanbaru', 'AI-Invoice-Maker'] },
  { name: 'OpenLayers (GIS)', category: 'Frontend', repoEvidence: ['WebsiteGisPekanbaru'] },
  { name: 'Inertia.js', category: 'Frontend', repoEvidence: ['hrms-swissbell'] },
  { name: 'Framer Motion / Motion', category: 'Frontend', repoEvidence: ['KotaPekanbaru', 'WebsiteGisPekanbaru'] },

  // Backend
  { name: 'Laravel 11', category: 'Backend', repoEvidence: ['hrms-swissbell', 'it-helpdesk-swissbell'] },
  { name: 'PHP', category: 'Backend', repoEvidence: ['hrms-swissbell', 'it-helpdesk-swissbell'] },
  { name: 'Python', category: 'Backend', repoEvidence: ['StockSense-AI', 'ProjectDL'] },
  { name: 'FastAPI', category: 'Backend', repoEvidence: ['StockSense-AI', 'ProjectDL'] },
  { name: 'Express 5 / Node.js', category: 'Backend', repoEvidence: ['KotaPekanbaru'] },
  { name: 'REST APIs', category: 'Backend', repoEvidence: ['hrms-swissbell', 'StockSense-AI', 'KotaPekanbaru'] },

  // AI & Data
  { name: 'Deep Learning (GRU)', category: 'AI & Data', repoEvidence: ['ProjectDL'] },
  { name: 'PyTorch / ML Workflow', category: 'AI & Data', repoEvidence: ['ProjectDL', 'StockSense-AI'] },
  { name: 'Time Series Demand Forecasting', category: 'AI & Data', repoEvidence: ['StockSense-AI'] },
  { name: 'Smart Local Text Parsing', category: 'AI & Data', repoEvidence: ['AI-Invoice-Maker'] },

  // Database & Mobile
  { name: 'PostgreSQL', category: 'Database & Mobile', repoEvidence: ['hrms-swissbell', 'KotaPekanbaru', 'WebsiteGisPekanbaru'] },
  { name: 'Supabase', category: 'Database & Mobile', repoEvidence: ['WebsiteGisPekanbaru'] },
  { name: 'Firebase Firestore', category: 'Database & Mobile', repoEvidence: ['AplikasiCariKerjaIndonesia'] },
  { name: 'Drizzle ORM', category: 'Database & Mobile', repoEvidence: ['KotaPekanbaru'] },
  { name: 'Kotlin (Android Native)', category: 'Database & Mobile', repoEvidence: ['AplikasiCariKerjaIndonesia'] },
  { name: 'MySQL', category: 'Database & Mobile', repoEvidence: ['hrms-swissbell', 'it-helpdesk-swissbell'] },

  // Dev Tools & Cloud
  { name: 'Vite', category: 'Dev Tools & Cloud', repoEvidence: ['hrms-swissbell', 'ProjectDL', 'AI-Invoice-Maker', 'KotaPekanbaru'] },
  { name: 'Git & GitHub', category: 'Dev Tools & Cloud', repoEvidence: ['All 8 Repositories'] },
  { name: 'Vercel', category: 'Dev Tools & Cloud', repoEvidence: ['WebsiteGisPekanbaru', 'KotaPekanbaru', 'AI-Invoice-Maker'] },
  { name: 'Railway', category: 'Dev Tools & Cloud', repoEvidence: ['it-helpdesk-swissbell'] },
  { name: 'Android Studio / Gradle', category: 'Dev Tools & Cloud', repoEvidence: ['AplikasiCariKerjaIndonesia'] }
]
