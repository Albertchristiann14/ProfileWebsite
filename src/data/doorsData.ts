export interface DoorItem {
  id: string;
  route: string;
  doorNumber: string;
  title: string;
  subtitle: string;
  plateText: string;
  themeColor: string; // Tonal door variation
  glowColor: string;
  doorDepthColor: string;
  checklist: string[];
  description: string;
  quote?: string;
}

export interface ProjectCard {
  id: string;
  title: string;
  category: string;
  doorRoute: string;
  tags: string[];
  year: string;
  shortDescription: string;
  detailedDescription: string;
  tech: string[];
  links?: {
    github?: string;
    live?: string;
  };
  metrics?: string;
  accentColor: string;
  coverPattern: 'circuit' | 'code' | 'blueprint' | 'gis' | 'stage';
}

export const DOORS_DATA: DoorItem[] = [
  {
    id: 'web-developer',
    route: '/web-developer',
    doorNumber: '01',
    title: 'Web Development',
    subtitle: 'END TO END, FROM SKETCH TO LIVE SITE',
    plateText: 'WEB DEVELOPER',
    themeColor: '#1D3254', // Navy blue, matching Screenshot 1 & 2
    glowColor: 'rgba(56, 189, 248, 0.4)',
    doorDepthColor: '#0E1B31',
    description: 'Engineering responsive, accessible, high-performance web applications with Next.js, React, and modern full-stack architectures.',
    checklist: [
      'Discovery & planning',
      'UX & visual design',
      'Front-end & back-end development',
      'Technical SEO & performance',
      'Analytics, launch & ongoing support'
    ]
  },
  {
    id: 'app-developer',
    route: '/app-developer',
    doorNumber: '02',
    title: 'App Development',
    subtitle: 'NATIVE & HYBRID MOBILE APPS',
    plateText: 'APP DEVELOPER',
    themeColor: '#46293B', // Plum burgundy, matching Screenshot 1 & 2
    glowColor: 'rgba(192, 132, 252, 0.4)',
    doorDepthColor: '#281521',
    description: 'Crafting native Android experiences in modern Kotlin with clean architecture, real-time Firebase services, and Play Store delivery.',
    checklist: [
      'Product scoping & architecture',
      'Kotlin native development & Flutter',
      'Firebase auth, database & notifications',
      'Offline-first local caching & SQLite',
      'Play Store readiness & maintenance'
    ]
  },
  {
    id: 'business-systems',
    route: '/business-systems',
    doorNumber: '03',
    title: 'UI/UX Design',
    subtitle: 'INTUITIVE & PURPOSEFUL INTERFACES',
    plateText: 'UI/UX DESIGNER',
    themeColor: '#576F5B', // Sage olive green, matching Screenshot 1 & 2
    glowColor: 'rgba(74, 222, 128, 0.4)',
    doorDepthColor: '#2F4033',
    description: 'Custom hospitality, HRMS, and enterprise operations management platforms built under Krevia Digital. "Build Smarter. Operate Better."',
    quote: 'Krevia Digital: "Build Smarter. Operate Better."',
    checklist: [
      'User research & workflow mapping',
      'Wireframing & interactive prototypes',
      'Design systems & micro-interactions',
      'Usability testing & heuristic reviews',
      'Developer handoff & design QA'
    ]
  },
  {
    id: 'event-digital-ops',
    route: '/event-digital-ops',
    doorNumber: '04',
    title: 'Graphic Design',
    subtitle: 'BRAND IDENTITY & DIGITAL CREATIVES',
    plateText: 'GRAPHIC DESIGNER',
    themeColor: '#9E4F25', // Warm terracotta / cognac brown, matching Screenshot 1 & 2
    glowColor: 'rgba(251, 146, 60, 0.4)',
    doorDepthColor: '#55260F',
    description: 'Seamless technology coordination, videotron live operations, stage management, and digital marketing execution for major conferences and runs.',
    checklist: [
      'Brand visual identity & guidelines',
      'Social media carousels & campaign assets',
      'Vector illustration & marketing design',
      'Stage videotron visuals & motion timing',
      'Production-ready print & web exports'
    ]
  },
  {
    id: 'ai-gis',
    route: '/ai-gis',
    doorNumber: '05',
    title: 'AI & GIS Systems',
    subtitle: 'DATA THAT EXPLAINS ITSELF',
    plateText: 'AI & GIS SYSTEMS',
    themeColor: '#162C42',
    glowColor: 'rgba(20, 184, 166, 0.35)',
    doorDepthColor: '#0E1E2E',
    description: 'Geospatial intelligence with practical deep learning — from municipal waste WebGIS to AI invoice parsing and inventory forecasting.',
    checklist: [
      'Data modelling & spatial pipelines',
      'Map-based dashboards & Leaflet/Mapbox',
      'AI-assisted automation',
      'Smart parsing & validation',
      'Deployment & documentation'
    ]
  }
];

export const ALL_PROJECTS: ProjectCard[] = [
  // Web Development
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio (Hallway of Doors)',
    category: 'Web',
    doorRoute: '/web-developer',
    tags: ['Next.js 15', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Framer Motion'],
    year: '2026',
    shortDescription: 'Skeuomorphic hallway of doors experience with 3D tactile interaction, brass plates, and smooth route transitions.',
    detailedDescription: 'Designed as an interactive architectural metaphor where each specialty is a physical door. Features pure CSS/SVG skeuomorphic door craft, GSAP carousel physics, Framer Motion page transitions, and WCAG AA contrast compliance.',
    tech: ['Next.js App Router', 'React 19', 'GSAP 3', 'Tailwind CSS', 'Lenis'],
    links: {
      github: 'https://github.com/KeijiChoco14/WebProfileAlbert',
      live: 'https://albertchristian.dev'
    },
    metrics: 'Lighthouse 95+ Performance & A11y',
    accentColor: '#1F2F55',
    coverPattern: 'circuit'
  },
  {
    id: 'krevia-digital-website',
    title: 'Krevia Digital Official Platform',
    category: 'Web',
    doorRoute: '/web-developer',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'SEO'],
    year: '2026',
    shortDescription: 'The digital flagship for Krevia Digital — showcasing ERP solutions, POS tools, and UMKM modernization services.',
    detailedDescription: 'Engineered for Krevia Digital to serve Indonesian enterprises and UMKM. Features an interactive solution estimator, fast static generation, structured schema markup, and responsive customer onboarding forms.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel Edge'],
    links: {
      live: 'https://kreviadigitalid.my.id'
    },
    metrics: 'Serves UMKM to Enterprise clients',
    accentColor: '#1E2C4C',
    coverPattern: 'code'
  },
  {
    id: 'pekanbaru-gis-platform-web',
    title: 'Pekanbaru GIS Platform (Waste & Zoning)',
    category: 'Web',
    doorRoute: '/web-developer',
    tags: ['Next.js 14', 'OpenLayers', 'Supabase', 'TypeScript'],
    year: '2025',
    shortDescription: 'Integrated digital spatial platform to monitor urban waste disposal points and official RTRW zoning across 4 districts.',
    detailedDescription: 'Developed by Kelompok FFAC at Politeknik Caltex Riau (with Albert Christian as Frontend Developer). Uses OpenLayers GIS engine and Supabase to visualize waste accumulation clusters, zoning boundaries, and municipal service coverage in Kota Pekanbaru.',
    tech: ['Next.js 14', 'OpenLayers (ol)', 'Supabase PostgreSQL', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/KeijiChoco14/WebsiteGisPekanbaru',
      live: 'https://website-gis-pekanbaru.vercel.app/'
    },
    metrics: '4 Urban Districts Covered',
    accentColor: '#162C42',
    coverPattern: 'gis'
  },
  {
    id: 'ai-invoice-maker-web',
    title: 'AI Invoice Maker with Smart Local Parser',
    category: 'Web',
    doorRoute: '/web-developer',
    tags: ['React 19', 'Smart Local Parser', 'jsPDF', 'Recharts'],
    year: '2025',
    shortDescription: 'Smart client-side invoice generator that parses raw prompt notes into client-ready PDF invoices, cutting manual entry by 28%.',
    detailedDescription: 'Tailored for freelance developers and IT contractors. The Smart Local Parser parses unformatted rates, taxes, and service descriptions instantly in the browser without sending client data to external servers. Includes live PDF export and revenue analytics.',
    tech: ['React 19', 'Smart Local Parser', 'Tailwind CSS', 'jsPDF', 'Recharts'],
    links: {
      github: 'https://github.com/KeijiChoco14/AI-Invoice-Maker',
      live: 'https://ai-invoice-maker-ivory.vercel.app/'
    },
    metrics: 'Cut manual entry time by 28%',
    accentColor: '#14b8a6',
    coverPattern: 'blueprint'
  },

  // App Development
  {
    id: 'aplikasi-cari-kerja-indonesia',
    title: 'Indonesian Job Search Android App',
    category: 'App',
    doorRoute: '/app-developer',
    tags: ['Android Native', 'Kotlin 1.9', 'Firebase Firestore', 'Jetpack'],
    year: '2025',
    shortDescription: 'Native Android application connecting Indonesian career seekers with real-time job openings and career insights.',
    detailedDescription: 'Crafted with a clean, high-contrast whitespace UI tailored for rapid scanning on mobile devices. Features real-time Cloud Firestore synchronization, bookmarking, push notifications, category filtering, and integrated career preparation articles.',
    tech: ['Kotlin 1.9', 'Android Jetpack', 'Firebase Firestore', 'Firebase Auth', 'Cloud Messaging'],
    links: {
      github: 'https://github.com/KeijiChoco14/AplikasiCariKerjaIndonesia'
    },
    metrics: 'Production-ready Native Kotlin Architecture',
    accentColor: '#1A284D',
    coverPattern: 'circuit'
  },

  // Business Systems
  {
    id: 'hrms-swissbell-sipu',
    title: 'SIPU Management System (Swiss-Belinn)',
    category: 'Business Systems',
    doorRoute: '/business-systems',
    tags: ['Laravel 11', 'React', 'Inertia.js', 'PostgreSQL', 'RBAC'],
    year: '2026',
    shortDescription: 'Enterprise hospitality & HRMS operational platform unifying shift attendance, geolocation checks, Kanban boards, and payroll.',
    detailedDescription: 'Built for Swiss-Belinn SKA Pekanbaru hotel operations. Replaces fragmented paper logs with 6-tier role-based access control (Super Admin, HRD, GM, Supervisor, Employee, IT), automated payroll calculation, and operational task delegation across 70 users in 10 departments.',
    tech: ['Laravel 11', 'React 18', 'Inertia.js', 'PostgreSQL', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/KeijiChoco14/hrms-swissbell'
    },
    metrics: '70 users across 10 departments · 40-50% time saved',
    accentColor: '#1B233D',
    coverPattern: 'blueprint'
  },
  {
    id: 'it-helpdesk-swissbell',
    title: 'IT Helpdesk — Swiss-Belinn',
    category: 'Business Systems',
    doorRoute: '/business-systems',
    tags: ['Laravel', 'Blade', 'PHP', 'Tailwind CSS', 'Railway'],
    year: '2025',
    shortDescription: 'Internal IT support ticketing, staff workstation directory, and scheduled hardware maintenance tracking.',
    detailedDescription: 'Engineered for the IT department at Swiss-Belinn Pekanbaru to handle incident logging (Hardware/Software/Network), track computer equipment assigned to specific staff, and automate preventive maintenance reminders (thermal paste and hardware servicing).',
    tech: ['Laravel', 'Blade', 'MySQL', 'Tailwind CSS', 'Railway'],
    links: {
      github: 'https://github.com/KeijiChoco14/it-helpdesk-swissbell',
      live: 'https://it-helpdesk-swissbell-production.up.railway.app'
    },
    metrics: 'Full hardware lifecycle & incident SLA tracking',
    accentColor: '#152238',
    coverPattern: 'code'
  },
  {
    id: 'krevia-erp-concept',
    title: 'Krevia Modular ERP Concept',
    category: 'Business Systems',
    doorRoute: '/business-systems',
    tags: ['ERP Architecture', 'POS Integration', 'Inventory Flow', 'Multi-tenant'],
    year: '2026',
    shortDescription: 'Next-generation modular ERP & POS architecture designed by Krevia Digital for retail and hospitality operations.',
    detailedDescription: 'Krevia Digital flagship software architecture embodying "Build Smarter. Operate Better." Unifies supply chain purchase orders, inventory barcode scanning, cashier POS terminals, and real-time P&L reporting into a lightweight web dashboard.',
    tech: ['Next.js App Router', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker'],
    links: {
      live: 'https://kreviadigitalid.my.id'
    },
    metrics: 'Modular microservice-ready schema',
    accentColor: '#1B233D',
    coverPattern: 'blueprint'
  },

  // AI & GIS
  {
    id: 'pekanbaru-gis-ai',
    title: 'Pekanbaru GIS Spatial Zoning Engine',
    category: 'AI & GIS',
    doorRoute: '/ai-gis',
    tags: ['OpenLayers', 'Spatial Modeling', 'Next.js 14', 'Supabase'],
    year: '2025',
    shortDescription: 'Urban spatial modeling engine rendering multi-polygon RTRW zoning and demographic waste density maps for Pekanbaru.',
    detailedDescription: 'Empowers municipal authorities and citizens to inspect land-use zoning layers, waste collection hot spots, and demographic distributions with sub-second polygon queries on top of OpenLayers.',
    tech: ['OpenLayers', 'GeoJSON', 'Next.js 14', 'Supabase GIS', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/KeijiChoco14/WebsiteGisPekanbaru',
      live: 'https://website-gis-pekanbaru.vercel.app/'
    },
    metrics: 'Sub-second GeoJSON polygon layer rendering',
    accentColor: '#162C42',
    coverPattern: 'gis'
  },
  {
    id: 'ai-invoice-maker-ai',
    title: 'AI Invoice Maker (Smart Local Parser)',
    category: 'AI & GIS',
    doorRoute: '/ai-gis',
    tags: ['Heuristic NLP', 'Token Extraction', 'Client-side AI', 'React 19'],
    year: '2025',
    shortDescription: 'Smart Local Parser engine that uses pattern matching and heuristic tokenization to extract invoice items from unstructured text.',
    detailedDescription: 'Extracts line items, quantities, hourly billing rates, currency identifiers, and client tax numbers from raw natural language strings, eliminating repetitive data entry while preserving total client privacy.',
    tech: ['React 19', 'Local Token Parser', 'jsPDF Vector', 'Recharts'],
    links: {
      github: 'https://github.com/KeijiChoco14/AI-Invoice-Maker',
      live: 'https://ai-invoice-maker-ivory.vercel.app/'
    },
    metrics: 'Zero-cloud local processing & 28% time savings',
    accentColor: '#14b8a6',
    coverPattern: 'circuit'
  },
  {
    id: 'stocksense-ai',
    title: 'StockSense AI (Demand Forecasting)',
    category: 'AI & GIS',
    doorRoute: '/ai-gis',
    tags: ['Time Series Forecasting', 'Python FastAPI', 'Machine Learning', 'React'],
    year: '2025',
    shortDescription: 'AI decision intelligence platform for restaurants to optimize ingredient purchasing, eliminate stockouts, and minimize food waste.',
    detailedDescription: 'Leverages time-series forecasting algorithms to predict ingredient consumption trends with MAPE < 15%. Delivers automated purchase orders, shelf-life alerts, and sub-2-second analytics queries.',
    tech: ['Python', 'FastAPI', 'Time Series Models', 'React', 'PostgreSQL'],
    links: {
      github: 'https://github.com/KeijiChoco14/StockSense-AI'
    },
    metrics: 'MAPE < 15% Forecast Accuracy',
    accentColor: '#10b981',
    coverPattern: 'blueprint'
  },
  {
    id: 'project-dl-fashion-ai',
    title: 'ProjectDL (FashionAI GRU Recommendation)',
    category: 'AI & GIS',
    doorRoute: '/ai-gis',
    tags: ['PyTorch', 'GRU Neural Network', 'FastAPI', 'React 19'],
    year: '2024',
    shortDescription: 'Sequential deep learning model using Gated Recurrent Units (GRU) to predict next-item fashion purchases from session history.',
    detailedDescription: 'Processes sequences of past user browsing and cart events through recurrent neural networks to generate next-item recommendations. Features a FastAPI inference microservice and interactive discovery client.',
    tech: ['PyTorch', 'GRU Neural Network', 'FastAPI', 'React 19', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/KeijiChoco14/ProjectDL'
    },
    metrics: 'Low-latency sequential session inference',
    accentColor: '#0d9488',
    coverPattern: 'code'
  },

  // Event & Digital Ops
  {
    id: 'btn-priority-videotron',
    title: 'BTN Priority Private Event Videotron Ops',
    category: 'Event & Digital Ops',
    doorRoute: '/event-digital-ops',
    tags: ['Videotron Control', 'Live Switching', 'Margo Planner', 'Audio-Visual'],
    year: '2025',
    shortDescription: 'Live high-resolution videotron operator for Bank BTN Priority exclusive private event under Margo Planner.',
    detailedDescription: 'Handled live visual switching, digital presentation sequences, and media timing for 70 high-net-worth VIP guests alongside a 10-person event production team with zero latency.',
    tech: ['LED Videotron Controller', 'Resolume / OBS', 'Live A/V Switching', 'Timing Coordination'],
    metrics: '70 VIP Guests · 10-person production crew · 0 hitch execution',
    accentColor: '#261C3B',
    coverPattern: 'stage'
  },
  {
    id: 'permadhis-cup-treasurer',
    title: 'PERMADHIS CUP 2024 Management & Finance',
    category: 'Event & Digital Ops',
    doorRoute: '/event-digital-ops',
    tags: ['Budget Management', 'Sponsorship Ops', 'Digital Tracking', 'PERMADHIS'],
    year: '2024',
    shortDescription: 'Treasurer and digital operations coordinator overseeing ~Rp 30 Million tournament budget and ticket management.',
    detailedDescription: 'Maintained real-time digital cash flow ledgers, handled vendor agreements, automated financial reporting, and coordinated registration desks for a major multi-school competition in Riau.',
    tech: ['Digital Cashflow Systems', 'Spreadsheet Automation', 'Registration Ops'],
    metrics: '~Rp 30 Million Financial Reconciliation',
    accentColor: '#1E2C4C',
    coverPattern: 'blueprint'
  },
  {
    id: 'major-mass-events-ops',
    title: 'Large-Scale Event Production Committee',
    category: 'Event & Digital Ops',
    doorRoute: '/event-digital-ops',
    tags: ['Event Operations', 'Mass Crowd Logistics', 'Digital Signage', '1K-3K Attendees'],
    year: '2025-2026',
    shortDescription: 'Core technical and logistical committee member for events hosting 1,000 to 3,000 attendees across Sumatra.',
    detailedDescription: 'Executed technical staging, digital announcements, and crowd management for landmark regional events: Buddhayana Run 2026, PCR Fun Run 2026, KTB FEST 2025, and African Kids Tour 2025.',
    tech: ['Crowd Flow Logistics', 'A/V Staging', 'Emergency Broadcasts', 'Team Lead'],
    metrics: '1,000 - 3,000 Attendees per event',
    accentColor: '#6B3A3F',
    coverPattern: 'stage'
  }
];

export interface StoryTimelineItem {
  number: string;
  year: string;
  dateRange: string;
  role: string;
  company: string;
  subtitle: string;
  period: string;
  periodNumericStart: string;
  periodNumericEnd: string;
  bullets: string[];
  badge?: string;
}

export const STORY_TIMELINE: StoryTimelineItem[] = [
  {
    number: '01',
    year: '2026',
    dateRange: 'OCT 2026 — NOW',
    role: 'Independent freelancer',
    company: 'Krevia Digital',
    subtitle: 'Working for myself, remote-first',
    period: '2026 — Present',
    periodNumericStart: '2026',
    periodNumericEnd: '2026',
    badge: 'Current Venture',
    bullets: [
      'Websites, iOS apps, interfaces and brand creatives, carried from the first sketch to launch.',
      'Working directly with clients, wherever they are.'
    ]
  },
  {
    number: '02',
    year: '2026',
    dateRange: 'AUG 2026 — JAN 2027',
    role: 'IT Operations Intern',
    company: 'Swiss-Belinn SKA Pekanbaru',
    subtitle: 'Hospitality Technology & Digital Infrastructure',
    period: 'Aug 2026 — Jan 2027',
    periodNumericStart: '2026.08',
    periodNumericEnd: '2027.01',
    badge: 'Enterprise Hospitality',
    bullets: [
      'Engineered and deployed the SIPU Management System and IT Helpdesk ticketing portal.',
      'Adopted by 70 active hotel staff across 10 operational departments, reducing shift tracking and payroll calculation friction by 40-50%.'
    ]
  },
  {
    number: '03',
    year: '2026',
    dateRange: 'FEB 2026 — APR 2026',
    role: 'Digital Event & Marketing Intern',
    company: 'Laksamana Muda',
    subtitle: 'Digital Campaigns & Multimedia Visuals',
    period: 'Feb 2026 — Apr 2026',
    periodNumericStart: '2026.02',
    periodNumericEnd: '2026.04',
    badge: 'Digital Marketing',
    bullets: [
      'Managed digital marketing assets, campaign distribution, and multimedia promotional collateral.',
      'Assisted technical team in AV staging, digital guest engagement, and analytics reporting.'
    ]
  },
  {
    number: '04',
    year: '2025',
    dateRange: 'NOV 2025 — PRESENT',
    role: 'Freelance Event Operator',
    company: 'Margo Planner',
    subtitle: 'Live Visual Switching & Audio-Visual Production',
    period: 'Nov 2025 — Present',
    periodNumericStart: '2025.11',
    periodNumericEnd: '2026.11',
    badge: 'Live Production',
    bullets: [
      'Lead videotron operator for high-profile events including Bank BTN Priority private gala (70 VIP guests).',
      'Collaborated within a 10-person production crew to ensure synchronized lighting, visual switching, and live timing.'
    ]
  },
  {
    number: '05',
    year: '2022',
    dateRange: 'SEP 2022 — PRESENT',
    role: 'Informatics Engineering Student & Organizer',
    company: 'Politeknik Caltex Riau',
    subtitle: 'Academic Foundations & Campus Leadership',
    period: '2022 — Present',
    periodNumericStart: '2022.09',
    periodNumericEnd: '2026.09',
    badge: 'Academic & Civic',
    bullets: [
      'GPA 3.42 / 4.00 in Informatics Engineering at Politeknik Caltex Riau.',
      'Active leadership in PERMADHIS (Treasurer for PERMADHIS CUP 2024 with ~Rp 30M budget), PSMTI, and 10+ event committees managing 1,000–3,000 attendees.'
    ]
  }
];
