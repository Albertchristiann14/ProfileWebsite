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
  highlights?: string[];
  images?: string[];
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
    themeColor: '#1D3254',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    doorDepthColor: '#0E1B31',
    description: 'Engineering responsive, accessible, high-performance web applications with Next.js, React, and modern full-stack architectures.',
    checklist: [
      'Discovery & system architecture',
      'UI/UX & responsive visual design',
      'Full-stack Next.js & React engineering',
      'Technical SEO & Lighthouse 95+ speed',
      'Analytics, deployment & ongoing support'
    ]
  },
  {
    id: 'app-developer',
    route: '/app-developer',
    doorNumber: '02',
    title: 'App Development',
    subtitle: 'NATIVE & CROSS-PLATFORM MOBILE APPS',
    plateText: 'APP DEVELOPER',
    themeColor: '#46293B',
    glowColor: 'rgba(192, 132, 252, 0.4)',
    doorDepthColor: '#281521',
    description: 'Crafting native Android experiences in modern Kotlin with clean architecture, real-time Firebase services, and Play Store delivery.',
    checklist: [
      'Product scoping & mobile architecture',
      'Kotlin native & Jetpack development',
      'Firebase Auth, Firestore & messaging',
      'Offline-first local caching & SQLite',
      'Play Store readiness & maintenance'
    ]
  },
  {
    id: 'business-systems',
    route: '/business-systems',
    doorNumber: '03',
    title: 'Business Systems',
    subtitle: 'ERP, HRMS & INTERNAL ENTERPRISE TOOLS',
    plateText: 'BUSINESS SYSTEMS',
    themeColor: '#576F5B',
    glowColor: 'rgba(74, 222, 128, 0.4)',
    doorDepthColor: '#2F4033',
    description: 'Custom hospitality, HRMS, and enterprise operations management platforms built under Krevia Digital. "Build Smarter. Operate Better."',
    quote: 'Krevia Digital: "Build Smarter. Operate Better."',
    checklist: [
      'Multi-role RBAC & workflow mapping',
      'HRMS attendance, shifts & payroll',
      'IT Helpdesk & asset lifecycle tracking',
      'Modular POS & inventory pipelines',
      'Database design & cloud deployment'
    ]
  },
  {
    id: 'ai-gis',
    route: '/ai-gis',
    doorNumber: '04',
    title: 'AI & GIS Systems',
    subtitle: 'SPATIAL INTELLIGENCE & APPLIED ML',
    plateText: 'AI & GIS SYSTEMS',
    themeColor: '#1E464B',
    glowColor: 'rgba(45, 212, 191, 0.4)',
    doorDepthColor: '#0E2427',
    description: 'Geospatial intelligence with practical deep learning — from municipal waste WebGIS to AI invoice parsing and inventory forecasting.',
    checklist: [
      'Spatial GeoJSON & OpenLayers pipelines',
      'Interactive urban zoning dashboards',
      'Time-series demand forecasting (MAPE <15%)',
      'Smart client-side NLP token parsing',
      'FastAPI & PyTorch model serving'
    ]
  },
  {
    id: 'event-digital-ops',
    route: '/event-digital-ops',
    doorNumber: '05',
    title: 'Event & Digital Ops',
    subtitle: 'LIVE VISUAL PRODUCTION & STAGE TECH',
    plateText: 'EVENT & OPS',
    themeColor: '#9E4F25',
    glowColor: 'rgba(251, 146, 60, 0.4)',
    doorDepthColor: '#55260F',
    description: 'Seamless technology coordination, videotron live operations, stage management, and digital marketing execution for major conferences and runs.',
    checklist: [
      'High-res LED videotron live switching',
      'Showflow cues & stage A/V synchronization',
      'Digital campaign & visual collateral',
      'Tournament finance & registration ops',
      'Crowd logistics for 1,000–3,000 attendees'
    ]
  }
];

export const ALL_PROJECTS: ProjectCard[] = [
  // Web Development
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio (Hallway of Doors)',
    category: 'Web Architecture',
    doorRoute: '/web-developer',
    tags: ['Next.js 16', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Framer Motion'],
    year: '2026',
    shortDescription: 'Skeuomorphic hallway of doors experience with 3D tactile interaction, brass plates, and smooth route transitions.',
    detailedDescription: 'Designed as an interactive architectural metaphor where each specialty is a physical door. Features pure CSS/SVG skeuomorphic door craft, 3D perspective physics, Framer Motion page transitions, and full dark/light gallery lighting.',
    tech: ['Next.js App Router', 'React 19', 'GSAP 3', 'Tailwind CSS', 'Lenis'],
    highlights: [
      '3D perspective swinging doors with real-time interior portal layers',
      'Interactive mechanical lamp pull-cord with Web Audio synthesis',
      'Sticky overlapping card deck & responsive touch hallway'
    ],
    links: {
      github: 'https://github.com/KeijiChoco14/WebProfileAlbert',
      live: 'https://albertchristian.dev'
    },
    metrics: 'Lighthouse 95+ Performance & A11y',
    accentColor: '#1D3254',
    coverPattern: 'circuit'
  },
  {
    id: 'kota-pekanbaru-portal',
    title: 'Kota Pekanbaru Smart City Portal',
    category: 'Full-Stack Web',
    doorRoute: '/web-developer',
    tags: ['React 19', 'TypeScript', 'Lenis', 'Framer Motion', 'Express 5', 'Drizzle ORM'],
    year: '2025',
    shortDescription: 'Interactive smart city showcase for Kota Pekanbaru featuring smooth inertial scrolling, landmark explorer, and civic metrics.',
    detailedDescription: 'An immersive digital civic showcase presenting Kota Pekanbaru through a refined modern web experience. Built with smooth inertial scrolling powered by Lenis, interactive civic statistics, historical and modern landmarks explorer, and a public service directory.',
    tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Express 5', 'Drizzle ORM'],
    highlights: [
      'Cinematic full-page smooth scrolling orchestrated via Lenis and Framer Motion',
      'Interactive landmark viewer and cultural exhibition with categorized exploration',
      'End-to-end TypeScript monorepo with Express 5 API and PostgreSQL Drizzle ORM'
    ],
    links: {
      github: 'https://github.com/KeijiChoco14/KotaPekanbaru',
      live: 'https://kota-pekanbaru-pekanbaru.vercel.app/'
    },
    metrics: 'Full-Stack Smart City Showcase',
    accentColor: '#0D9488',
    coverPattern: 'gis'
  },
  {
    id: 'krevia-digital-website',
    title: 'Krevia Digital Official Platform',
    category: 'Agency Platform',
    doorRoute: '/web-developer',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'SEO'],
    year: '2026',
    shortDescription: 'The digital flagship for Krevia Digital — showcasing ERP solutions, POS tools, and UMKM modernization services.',
    detailedDescription: 'Engineered for Krevia Digital to serve Indonesian enterprises and UMKM. Features an interactive solution estimator, fast static generation, structured schema markup, and responsive customer onboarding workflows.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel Edge'],
    highlights: [
      'High-conversion agency landing system tailored for UMKM & enterprise leads',
      'Structured JSON-LD schema & technical SEO optimization',
      'Modular service showcase for Web, Mobile, and ERP builds'
    ],
    links: {
      live: 'https://kreviadigitalid.my.id'
    },
    metrics: 'Serves UMKM to Enterprise clients',
    accentColor: '#253B6E',
    coverPattern: 'code'
  },
  {
    id: 'pekanbaru-gis-platform-web',
    title: 'Pekanbaru GIS Platform (Waste & Zoning)',
    category: 'Spatial WebApp',
    doorRoute: '/web-developer',
    tags: ['Next.js 14', 'OpenLayers', 'Supabase', 'TypeScript'],
    year: '2025',
    shortDescription: 'Integrated digital spatial platform to monitor urban waste disposal points and official RTRW zoning across 4 districts.',
    detailedDescription: 'Developed by Kelompok FFAC at Politeknik Caltex Riau (with Albert Christian as Frontend Developer). Uses OpenLayers GIS engine and Supabase to visualize waste accumulation clusters, zoning boundaries, and municipal service coverage in Kota Pekanbaru.',
    tech: ['Next.js 14', 'OpenLayers (ol)', 'Supabase PostgreSQL', 'Tailwind CSS'],
    highlights: [
      'Interactive OpenLayers map canvas rendering multi-layer RTRW spatial polygons',
      'Real-time waste disposal point clustering and district filtering',
      'Supabase PostgreSQL geospatial storage with responsive layer controls'
    ],
    links: {
      github: 'https://github.com/KeijiChoco14/WebsiteGisPekanbaru',
      live: 'https://website-gis-pekanbaru.vercel.app/'
    },
    metrics: '4 Urban Districts Covered',
    accentColor: '#166534',
    coverPattern: 'gis'
  },
  {
    id: 'ai-invoice-maker-web',
    title: 'AI Invoice Maker with Smart Local Parser',
    category: 'Web Productivity',
    doorRoute: '/web-developer',
    tags: ['React 19', 'Smart Local Parser', 'jsPDF', 'Recharts'],
    year: '2025',
    shortDescription: 'Smart client-side invoice generator that parses raw prompt notes into client-ready PDF invoices, cutting manual entry by 28%.',
    detailedDescription: 'Tailored for freelance developers and IT contractors. The Smart Local Parser parses unformatted rates, taxes, and service descriptions instantly in the browser without sending client data to external servers. Includes live PDF export and revenue analytics.',
    tech: ['React 19', 'Smart Local Parser', 'Tailwind CSS', 'jsPDF', 'Recharts'],
    images: ['/projects/invoice-maker-1.png', '/projects/invoice-maker-2.png'],
    highlights: [
      'Client-side Smart Local Parser extracting line items & taxes from raw notes',
      'Instant vector PDF export via jsPDF with branded navy-gold styling',
      'Interactive revenue trend charts and invoice status tracking with Recharts'
    ],
    links: {
      github: 'https://github.com/KeijiChoco14/AI-Invoice-Maker',
      live: 'https://ai-invoice-maker-ivory.vercel.app/'
    },
    metrics: 'Cut manual entry time by 28%',
    accentColor: '#0F766E',
    coverPattern: 'blueprint'
  },

  // App Development
  {
    id: 'aplikasi-cari-kerja-indonesia',
    title: 'Indonesian Job Search Android App',
    category: 'Native Android',
    doorRoute: '/app-developer',
    tags: ['Android Native', 'Kotlin 1.9', 'Firebase Firestore', 'Jetpack'],
    year: '2025',
    shortDescription: 'Native Android application connecting Indonesian career seekers with real-time job openings and career insights.',
    detailedDescription: 'Crafted with a clean, high-contrast whitespace UI tailored for rapid scanning on mobile devices. Features real-time Cloud Firestore synchronization, bookmarking, push notifications, category filtering, and integrated career preparation articles.',
    tech: ['Kotlin 1.9', 'Android Jetpack', 'Firebase Firestore', 'Firebase Auth', 'Cloud Messaging'],
    images: ['/projects/cari-kerja-1.png', '/projects/cari-kerja-2.png'],
    highlights: [
      'Native Kotlin 1.9 architecture built with Android Jetpack components',
      'Real-time Cloud Firestore NoSQL sync for instant job listings & bookmarks',
      'Integrated career preparation reader and category filtering engine'
    ],
    links: {
      github: 'https://github.com/KeijiChoco14/AplikasiCariKerjaIndonesia'
    },
    metrics: 'Production-ready Native Kotlin Architecture',
    accentColor: '#6B2D5C',
    coverPattern: 'circuit'
  },
  {
    id: 'sipu-mobile-attendance',
    title: 'SIPU Mobile Attendance & Geolocation App',
    category: 'Mobile Companion',
    doorRoute: '/app-developer',
    tags: ['Mobile PWA', 'Geolocation API', 'React', 'Laravel Sanctum', 'Biometric Check'],
    year: '2026',
    shortDescription: 'Mobile-first shift clock-in, GPS radius verification, and digital payslip portal for 70+ hotel staff at Swiss-Belinn.',
    detailedDescription: 'Designed for hospitality employees on the move across 10 hotel departments. Validates live GPS coordinates against hotel perimeter geofences during shift clock-in/out, allows instant leave requests, and delivers mobile-optimized monthly payslips.',
    tech: ['React Mobile UI', 'HTML5 Geolocation', 'Laravel 11 API', 'Tailwind CSS'],
    highlights: [
      'Real-time GPS radius geofence verification for accurate shift attendance',
      'Touch-optimized mobile Kanban task updates for housekeeping & engineering',
      'Instant digital payslip viewer and supervisor leave approval alerts'
    ],
    links: {
      github: 'https://github.com/KeijiChoco14/hrms-swissbell'
    },
    metrics: '70+ Daily Active Hotel Staff on Mobile',
    accentColor: '#46293B',
    coverPattern: 'blueprint'
  },
  {
    id: 'krevia-mobile-pos',
    title: 'Krevia Mobile POS & Barcode Terminal',
    category: 'Retail Mobile App',
    doorRoute: '/app-developer',
    tags: ['Mobile POS', 'Offline-First', 'Barcode Scanner', 'Thermal Print', 'Krevia Digital'],
    year: '2026',
    shortDescription: 'Handheld cashier and stock-opname terminal app with camera barcode scanning and Bluetooth thermal receipt printing.',
    detailedDescription: 'Engineered under Krevia Digital for modern UMKM retail and F&B outlets. Turns any Android smartphone or tablet into a fast cashier terminal with offline transaction queueing, instant SKU lookup, and real-time cloud inventory sync.',
    tech: ['Kotlin / React Native', 'SQLite Offline Queue', 'ESC/POS Bluetooth', 'REST API'],
    highlights: [
      'Sub-second camera barcode & QR scanning for rapid checkout',
      'Offline-first SQLite transaction queue that syncs automatically when online',
      'Direct Bluetooth ESC/POS thermal receipt printer integration'
    ],
    links: {
      live: 'https://kreviadigitalid.my.id'
    },
    metrics: 'Offline-First UMKM Cashier Architecture',
    accentColor: '#7C2D12',
    coverPattern: 'code'
  },

  // Business Systems
  {
    id: 'hrms-swissbell-sipu',
    title: 'SIPU Management System (Swiss-Belinn)',
    category: 'Enterprise HRMS',
    doorRoute: '/business-systems',
    tags: ['Laravel 11', 'React', 'Inertia.js', 'PostgreSQL', 'RBAC'],
    year: '2026',
    shortDescription: 'Enterprise hospitality & HRMS operational platform unifying shift attendance, geolocation checks, Kanban boards, and payroll.',
    detailedDescription: 'Built for Swiss-Belinn SKA Pekanbaru hotel operations. Replaces fragmented paper logs with 6-tier role-based access control (Super Admin, HRD, GM, Supervisor, Employee, IT), automated payroll calculation, and operational task delegation across 70 users in 10 departments.',
    tech: ['Laravel 11', 'React 18', 'Inertia.js', 'PostgreSQL', 'Tailwind CSS'],
    highlights: [
      '6-tier Role-Based Access Control (Super Admin, HRD, GM, Supervisor, Staff, IT)',
      'Automated monthly payroll engine computing base salary, service charge & deductions',
      'Departmental drag-and-drop Kanban task boards with supervisor KPI appraisals'
    ],
    links: {
      github: 'https://github.com/KeijiChoco14/hrms-swissbell'
    },
    metrics: '70 users across 10 departments · 40-50% time saved',
    accentColor: '#3F624D',
    coverPattern: 'blueprint'
  },
  {
    id: 'it-helpdesk-swissbell',
    title: 'IT Helpdesk & Asset Lifecycle — Swiss-Belinn',
    category: 'IT Operations',
    doorRoute: '/business-systems',
    tags: ['Laravel', 'Blade', 'PHP', 'Tailwind CSS', 'Railway'],
    year: '2025',
    shortDescription: 'Internal IT support ticketing, staff workstation directory, and scheduled hardware maintenance tracking.',
    detailedDescription: 'Engineered for the IT department at Swiss-Belinn Pekanbaru to handle incident logging (Hardware/Software/Network), track computer equipment assigned to specific staff, and automate preventive maintenance reminders (thermal paste and hardware servicing).',
    tech: ['Laravel', 'Blade', 'MySQL', 'Tailwind CSS', 'Railway'],
    highlights: [
      'Multi-department incident ticketing with SLA priority tiers and resolution logs',
      'Hardware asset registry mapping PCs, printers & network gear to hotel staff',
      'Automated preventive maintenance scheduler for thermal paste & dusting cycles'
    ],
    links: {
      github: 'https://github.com/KeijiChoco14/it-helpdesk-swissbell',
      live: 'https://it-helpdesk-swissbell-production.up.railway.app'
    },
    metrics: 'Full hardware lifecycle & incident SLA tracking',
    accentColor: '#1E4638',
    coverPattern: 'code'
  },
  {
    id: 'krevia-erp-concept',
    title: 'Krevia Modular ERP & POS Suite',
    category: 'ERP Architecture',
    doorRoute: '/business-systems',
    tags: ['ERP Architecture', 'POS Integration', 'Inventory Flow', 'Multi-tenant'],
    year: '2026',
    shortDescription: 'Next-generation modular ERP & POS architecture designed by Krevia Digital for retail and hospitality operations.',
    detailedDescription: 'Krevia Digital flagship software architecture embodying "Build Smarter. Operate Better." Unifies supply chain purchase orders, inventory barcode scanning, cashier POS terminals, and real-time P&L reporting into a lightweight web dashboard.',
    tech: ['Next.js App Router', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker'],
    highlights: [
      'Unified ledger connecting supplier purchase orders, warehouse stock & POS sales',
      'Multi-branch tenant isolation with granular cashier & manager permissions',
      'Real-time COGS, margin analysis, and automated low-stock alerts'
    ],
    links: {
      live: 'https://kreviadigitalid.my.id'
    },
    metrics: 'Modular microservice-ready schema',
    accentColor: '#2E4F3E',
    coverPattern: 'blueprint'
  },

  // AI & GIS
  {
    id: 'pekanbaru-gis-ai',
    title: 'Pekanbaru GIS Spatial Zoning Engine',
    category: 'Geospatial Intelligence',
    doorRoute: '/ai-gis',
    tags: ['OpenLayers', 'Spatial Modeling', 'Next.js 14', 'Supabase'],
    year: '2025',
    shortDescription: 'Urban spatial modeling engine rendering multi-polygon RTRW zoning and demographic waste density maps for Pekanbaru.',
    detailedDescription: 'Empowers municipal authorities and citizens to inspect land-use zoning layers, waste collection hot spots, and demographic distributions with sub-second polygon queries on top of OpenLayers.',
    tech: ['OpenLayers', 'GeoJSON', 'Next.js 14', 'Supabase GIS', 'Tailwind CSS'],
    highlights: [
      'Vector GeoJSON polygon rendering for official municipal RTRW zoning layers',
      'Spatial correlation between neighborhood population density and waste volume',
      'Interactive coordinate inspector and custom map layer opacity controls'
    ],
    links: {
      github: 'https://github.com/KeijiChoco14/WebsiteGisPekanbaru',
      live: 'https://website-gis-pekanbaru.vercel.app/'
    },
    metrics: 'Sub-second GeoJSON polygon layer rendering',
    accentColor: '#1E464B',
    coverPattern: 'gis'
  },
  {
    id: 'stocksense-ai',
    title: 'StockSense AI (Demand Forecasting)',
    category: 'Applied Machine Learning',
    doorRoute: '/ai-gis',
    tags: ['Time Series Forecasting', 'Python FastAPI', 'Machine Learning', 'React'],
    year: '2025',
    shortDescription: 'AI decision intelligence platform for restaurants to optimize ingredient purchasing, eliminate stockouts, and minimize food waste.',
    detailedDescription: 'Leverages time-series forecasting algorithms to predict ingredient consumption trends with MAPE < 15%. Delivers automated purchase orders, shelf-life alerts, and sub-2-second analytics queries.',
    tech: ['Python', 'FastAPI', 'Time Series Models', 'React', 'PostgreSQL'],
    highlights: [
      'Predictive ingredient demand forecasting achieving target MAPE < 15%',
      'Automated reorder quantity optimization balancing spoilage vs. stockout risk',
      'FastAPI analytical backend serving sub-2-second forecast visualizations'
    ],
    links: {
      github: 'https://github.com/KeijiChoco14/StockSense-AI'
    },
    metrics: 'MAPE < 15% Forecast Accuracy',
    accentColor: '#0F766E',
    coverPattern: 'blueprint'
  },
  {
    id: 'ai-invoice-maker-ai',
    title: 'AI Invoice Maker (Smart Local Parser)',
    category: 'Client-Side NLP',
    doorRoute: '/ai-gis',
    tags: ['Heuristic NLP', 'Token Extraction', 'Client-side AI', 'React 19'],
    year: '2025',
    shortDescription: 'Smart Local Parser engine that uses pattern matching and heuristic tokenization to extract invoice items from unstructured text.',
    detailedDescription: 'Extracts line items, quantities, hourly billing rates, currency identifiers, and client tax numbers from raw natural language strings, eliminating repetitive data entry while preserving total client privacy.',
    tech: ['React 19', 'Local Token Parser', 'jsPDF Vector', 'Recharts'],
    images: ['/projects/invoice-maker-1.png', '/projects/invoice-maker-2.png'],
    highlights: [
      'Zero-latency heuristic NLP tokenizer running 100% in the browser',
      'Automatic detection of quantities, IDR/USD currencies, and tax percentages',
      'Instant structured JSON-to-PDF rendering pipeline'
    ],
    links: {
      github: 'https://github.com/KeijiChoco14/AI-Invoice-Maker',
      live: 'https://ai-invoice-maker-ivory.vercel.app/'
    },
    metrics: 'Zero-cloud local processing & 28% time savings',
    accentColor: '#0D9488',
    coverPattern: 'circuit'
  },
  {
    id: 'project-dl-fashion-ai',
    title: 'ProjectDL (FashionAI GRU Recommendation)',
    category: 'Deep Learning',
    doorRoute: '/ai-gis',
    tags: ['PyTorch', 'GRU Neural Network', 'FastAPI', 'React 19'],
    year: '2024',
    shortDescription: 'Sequential deep learning model using Gated Recurrent Units (GRU) to predict next-item fashion purchases from session history.',
    detailedDescription: 'Processes sequences of past user browsing and cart events through recurrent neural networks to generate next-item recommendations. Features a FastAPI inference microservice and interactive discovery client.',
    tech: ['PyTorch', 'GRU Neural Network', 'FastAPI', 'React 19', 'Tailwind CSS'],
    highlights: [
      'Gated Recurrent Unit (GRU) neural network trained on sequential session logs',
      'Dense category embedding vectors capturing multi-step shopping intent',
      'Low-latency FastAPI inference endpoint paired with React 19 discovery UI'
    ],
    links: {
      github: 'https://github.com/KeijiChoco14/ProjectDL'
    },
    metrics: 'Low-latency sequential session inference',
    accentColor: '#115E59',
    coverPattern: 'code'
  },

  // Event & Digital Ops
  {
    id: 'btn-priority-videotron',
    title: 'BTN Priority Private Event Videotron Ops',
    category: 'Live Visual Production',
    doorRoute: '/event-digital-ops',
    tags: ['Videotron Control', 'Live Switching', 'Margo Planner', 'Audio-Visual'],
    year: '2025',
    shortDescription: 'Live high-resolution videotron operator for Bank BTN Priority exclusive private event under Margo Planner.',
    detailedDescription: 'Handled live visual switching, digital presentation sequences, and media timing for 70 high-net-worth VIP guests alongside a 10-person event production team with zero latency.',
    tech: ['LED Videotron Controller', 'Resolume / OBS', 'Live A/V Switching', 'Timing Coordination'],
    highlights: [
      'Zero-latency LED wall switching and bumper cue execution for 70 VIP guests',
      'Synchronized visual transitions with live stage lighting and MC showflow',
      'Coordinated closely within a 10-person Margo Planner production crew'
    ],
    metrics: '70 VIP Guests · 10-person production crew · 0 hitch execution',
    accentColor: '#9E4F25',
    coverPattern: 'stage'
  },
  {
    id: 'permadhis-cup-treasurer',
    title: 'PERMADHIS CUP 2024 Management & Finance',
    category: 'Event Finance & Ops',
    doorRoute: '/event-digital-ops',
    tags: ['Budget Management', 'Sponsorship Ops', 'Digital Tracking', 'PERMADHIS'],
    year: '2024',
    shortDescription: 'Treasurer and digital operations coordinator overseeing ~Rp 30 Million tournament budget and ticket management.',
    detailedDescription: 'Maintained real-time digital cash flow ledgers, handled vendor agreements, automated financial reporting, and coordinated registration desks for a major multi-school competition in Riau.',
    tech: ['Digital Cashflow Systems', 'Spreadsheet Automation', 'Registration Ops'],
    highlights: [
      'Full financial stewardship and audit ledger for ~Rp 30 Million tournament budget',
      'Digital registration verification and multi-category bracket coordination',
      'Sponsorship fulfillment tracking and vendor payout scheduling'
    ],
    metrics: '~Rp 30 Million Financial Reconciliation',
    accentColor: '#7C3E1D',
    coverPattern: 'blueprint'
  },
  {
    id: 'major-mass-events-ops',
    title: 'Large-Scale Event Production Committee',
    category: 'Mass Event Logistics',
    doorRoute: '/event-digital-ops',
    tags: ['Event Operations', 'Mass Crowd Logistics', 'Digital Signage', '1K-3K Attendees'],
    year: '2025-2026',
    shortDescription: 'Core technical and logistical committee member for events hosting 1,000 to 3,000 attendees across Sumatra.',
    detailedDescription: 'Executed technical staging, digital announcements, and crowd management for landmark regional events: Buddhayana Run 2026, PCR Fun Run 2026, KTB FEST 2025, and African Kids Tour 2025.',
    tech: ['Crowd Flow Logistics', 'A/V Staging', 'Emergency Broadcasts', 'Team Lead'],
    highlights: [
      'On-ground staging & route logistics for Buddhayana Run 2026 & PCR Fun Run 2026',
      'Audio-visual cueing and stage management for KTB FEST 2025 & African Kids Tour',
      'Seamless crowd flow coordination for 1,000 to 3,000+ participants per event'
    ],
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
