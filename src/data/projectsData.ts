import { Project } from '@/types/portfolio'

export const projectsData: Project[] = [
  {
    id: 'hrms-swissbell',
    title: 'hrms-swissbell',
    displayTitle: 'HRMS — Swiss-Belinn',
    category: 'Full-Stack',
    featured: true,
    description:
      'Internal office & hospitality management system (SIPU) engineered for Swiss-Belinn SKA Pekanbaru, unifying shift attendance, task boards, leave approvals, and payroll.',
    detailedDescription:
      'SIPU (Sistem Informasi Pengelolaan Usaha) was engineered to replace manual paper SOPs and disjointed messaging workflows across Swiss-Belinn SKA Pekanbaru hotel operations. Designed with granular role-based permissions (Super Admin, HRD, General Manager, Supervisor, Employee, IT), it features real-time clock-in/out attendance with geolocation verification, interactive Kanban boards for operational task delegation, automated monthly payroll and payslip calculation, supervisor performance appraisals, and centralized internal policy announcements.',
    repoUrl: 'https://github.com/KeijiChoco14/hrms-swissbell',
    tags: ['Laravel 11', 'React', 'Inertia.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    architecturePoints: [
      'Interactive drag-and-drop Kanban task boards for department workflow tracking',
      'Real-time shift attendance logging with automated timesheet generation and location checks',
      'End-to-end payroll computation with structured salary breakdown, bonuses, deductions, and payslips',
      'Granular role-based access control (RBAC) covering 6 distinct hotel operational roles'
    ],
    techStack: {
      frontend: 'React 18, Inertia.js, TypeScript, Tailwind CSS',
      backend: 'Laravel 11, PHP 8.2+',
      database: 'PostgreSQL / MySQL',
      deployment: 'Vercel / On-premise hotel network'
    },
    previewType: 'blueprint',
    accentColor: '#10b981' // Emerald Leaf
  },
  {
    id: 'it-helpdesk-swissbell',
    title: 'it-helpdesk-swissbell',
    displayTitle: 'IT Helpdesk — Swiss-Belinn',
    category: 'Full-Stack',
    featured: false,
    description:
      'Internal IT support ticketing, staff workstation inventory, and recurring hardware maintenance management platform for Swiss-Belinn Pekanbaru.',
    detailedDescription:
      'A purpose-built IT service operations platform for the IT department of Swiss-Belinn Pekanbaru. It streamlines internal incident reporting (Hardware, Software, Network) submitted by departmental staff, maintains an inventory of computer peripherals and network gear linked to assigned hotel employees, tracks recurring preventative maintenance tasks (PC dusting, thermal paste re-application cycles), and provides IT managers with prioritized operational dashboards.',
    repoUrl: 'https://github.com/KeijiChoco14/it-helpdesk-swissbell',
    liveUrl: 'https://it-helpdesk-swissbell-production.up.railway.app',
    tags: ['Laravel', 'Blade', 'PHP', 'Tailwind CSS', 'Vite', 'Railway'],
    architecturePoints: [
      'Multi-department IT issue ticketing system with assignment, priority tiers, and status lifecycle',
      'IT equipment inventory directory linking devices to staff workstations and locations',
      'Scheduled preventive maintenance logging for periodic thermal paste and hardware cleaning',
      'Role-tailored dashboards for Employee, IT Support, and IT Admin roles'
    ],
    techStack: {
      frontend: 'Blade Templates, Tailwind CSS, Vite',
      backend: 'Laravel, PHP',
      database: 'MySQL / PostgreSQL',
      deployment: 'Railway'
    },
    previewType: 'blueprint',
    accentColor: '#059669' // Deep Forest Jade
  },
  {
    id: 'stocksense-ai',
    title: 'StockSense-AI',
    displayTitle: 'StockSense AI',
    category: 'AI & ML',
    featured: true,
    description:
      'AI-powered decision intelligence platform for restaurants and culinary businesses to optimize ingredient purchasing, eliminate stockouts, and minimize food waste.',
    detailedDescription:
      'StockSense AI addresses the operational challenges of restaurant inventory management—food waste, stockouts, overstocking, and unpredictable demand swings. The platform provides real-time intelligent recommendations, sales trend analytics, demand forecasting with high target accuracy (MAPE < 15%), menu profitability intelligence, and comprehensive audit logs to ensure transparent purchasing decisions.',
    repoUrl: 'https://github.com/KeijiChoco14/StockSense-AI',
    tags: ['Python', 'FastAPI', 'React', 'Machine Learning', 'Time Series Forecasting'],
    architecturePoints: [
      'Predictive ingredient demand forecasting targeting Mean Absolute Percentage Error (MAPE) < 15%',
      'Real-time automated purchasing recommendations to balance stock levels and shelf-life',
      'High-performance analytics dashboard delivering sub-2-second query response times',
      'Comprehensive inventory audit logging capturing all purchasing and consumption events'
    ],
    techStack: {
      frontend: 'React, Tailwind CSS',
      backend: 'Python (FastAPI / Flask)',
      ai: 'Time Series Forecasting, Decision Optimization Algorithms',
      database: 'PostgreSQL'
    },
    previewType: 'blueprint',
    accentColor: '#34d399' // Mint Canopy
  },
  {
    id: 'kota-pekanbaru',
    title: 'KotaPekanbaru',
    displayTitle: 'Kota Pekanbaru',
    category: 'Full-Stack',
    featured: true,
    description:
      'Interactive smart city portal and digital civic showcase for Kota Pekanbaru, featuring smooth Lenis scrolling, dynamic landmarks exploration, and city metrics.',
    detailedDescription:
      'An immersive digital showcase designed to present Kota Pekanbaru through a refined, modern web experience. Built with smooth inertial scrolling powered by Lenis, custom cursor tracking, interactive civic statistics, historical and modern landmarks explorer, cultural heritage features, a night city visual exhibition, and a directory of smart city public services.',
    repoUrl: 'https://github.com/KeijiChoco14/KotaPekanbaru',
    liveUrl: 'https://kota-pekanbaru-pekanbaru.vercel.app/',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis', 'Express 5', 'Drizzle ORM'],
    architecturePoints: [
      'Cinematic full-page smooth scrolling architecture orchestrated via Lenis and Framer Motion',
      'Interactive landmark viewer and cultural exhibition with categorized exploration',
      'Smart city civic statistics and public initiative indicators',
      'End-to-end TypeScript monorepo with Express 5 backend API and PostgreSQL Drizzle ORM'
    ],
    techStack: {
      frontend: 'React 19, Vite, Tailwind CSS, Framer Motion, Lenis',
      backend: 'Node.js, Express 5, TypeScript',
      database: 'PostgreSQL, Drizzle ORM',
      deployment: 'Vercel'
    },
    previewType: 'blueprint',
    accentColor: '#0d9488' // Teal Pine
  },
  {
    id: 'project-dl',
    title: 'ProjectDL',
    displayTitle: 'Deep Learning Project (FashionAI)',
    category: 'AI & ML',
    featured: false,
    description:
      'Sequential deep learning recommendation system powered by a Gated Recurrent Unit (GRU) model to predict next-item fashion purchases based on user shopping history.',
    detailedDescription:
      'FashionAI applies recurrent deep learning to sequential shopping behaviors. Using a Gated Recurrent Unit (GRU) neural network, the system analyzes sequences of past user browsing and purchasing actions to predict the next product category a customer is most likely to purchase. Features real-time model inference served through a FastAPI backend and an interactive product discovery dashboard built with React and Vite.',
    repoUrl: 'https://github.com/KeijiChoco14/ProjectDL',
    tags: ['Python', 'PyTorch / GRU', 'FastAPI', 'React 19', 'Vite', 'Lucide React'],
    architecturePoints: [
      'Gated Recurrent Unit (GRU) sequential neural network trained on purchase session patterns',
      'Category encoding pipeline converting sequential shopping behaviors into embedding vectors',
      'FastAPI inference backend providing low-latency model predictions and catalog matching',
      'Interactive React client supporting search by product title, category, or ASIN'
    ],
    techStack: {
      frontend: 'React 19, Vite, Lucide React, Tailwind CSS',
      backend: 'Python, FastAPI',
      ai: 'PyTorch / TensorFlow (GRU Neural Network, Sequential Embeddings)',
      database: 'Product Catalog JSON / Vector Index'
    },
    previewType: 'blueprint',
    accentColor: '#10b981' // Vibrant Botanical Leaf
  },
  {
    id: 'ai-invoice-maker',
    title: 'AI-Invoice-Maker',
    displayTitle: 'AI Invoice Maker',
    category: 'Productivity',
    featured: false,
    description:
      'Modern web application featuring a Smart Local Parser that converts unstructured invoice text into structured data with instant PDF export and analytics.',
    detailedDescription:
      'Tailored for freelance automation consultants, web developers, and IT support contractors, AI Invoice Maker turns raw, semi-structured notes or prompt outputs into clean, branded client invoices. It incorporates a client-side Smart Local Parser, live interactive invoice preview, custom navy-gold theme styling, instant PDF rendering with jsPDF, and revenue trend visual charts using Recharts.',
    repoUrl: 'https://github.com/KeijiChoco14/AI-Invoice-Maker',
    liveUrl: 'https://ai-invoice-maker-ivory.vercel.app/',
    tags: ['React 19', 'Vite', 'JavaScript', 'jsPDF', 'Recharts', 'Tailwind CSS', 'Vercel'],
    architecturePoints: [
      'Smart Local Parser algorithm extracting line items, rates, taxes, and client info from raw text',
      'Client-side vector PDF generation using jsPDF with customized typography and layout',
      'Interactive revenue tracking and invoice status analytics with Recharts',
      'Persistent local invoice history with toast feedback notifications'
    ],
    techStack: {
      frontend: 'React 19, Vite, Tailwind CSS, Recharts, jsPDF',
      backend: 'Client-side SPA with local storage persistence',
      deployment: 'Vercel'
    },
    previewType: 'screenshot',
    screenshotUrl: '/projects/invoice-maker-1.png',
    accentColor: '#14b8a6' // Fresh Sage
  },
  {
    id: 'aplikasi-cari-kerja-indonesia',
    title: 'AplikasiCariKerjaIndonesia',
    displayTitle: 'Aplikasi Cari Kerja Indonesia',
    category: 'Mobile & GIS',
    featured: false,
    description:
      'Native Android mobile application built with Kotlin and Firebase Firestore, delivering a clean, modern job search and career insights platform.',
    detailedDescription:
      'A native Android application designed with a contemporary, whitespace-focused minimalist UI to connect Indonesian job seekers with career openings and interactive professional development articles. Integrates real-time cloud synchronization via Firebase Firestore, job bookmarking, category filtering, and responsive mobile card layouts designed for quick mobile scanning.',
    repoUrl: 'https://github.com/KeijiChoco14/AplikasiCariKerjaIndonesia',
    tags: ['Android Native', 'Kotlin 1.9', 'Jetpack', 'Firebase Firestore', 'Android Studio'],
    architecturePoints: [
      'Native Android architecture written in modern Kotlin 1.9 using Android Jetpack components',
      'Real-time Firestore NoSQL database synchronization for instant job updates',
      'Clean UI design system prioritizing typography, whitespace, and touch targets',
      'Integrated career insights and industry article reader for career preparation'
    ],
    techStack: {
      frontend: 'Android Native UI, Kotlin 1.9, XML/Jetpack',
      backend: 'Firebase Backend-as-a-Service',
      database: 'Cloud Firestore'
    },
    previewType: 'screenshot',
    screenshotUrl: '/projects/cari-kerja-1.png',
    accentColor: '#22c55e' // Meadow Moss
  },
  {
    id: 'website-gis-pekanbaru',
    title: 'WebsiteGisPekanbaru',
    displayTitle: 'GIS Pekanbaru (WebGIS Sampah)',
    category: 'Mobile & GIS',
    featured: false,
    description:
      'Smart city Geographic Information System (WebGIS) mapping urban waste distribution, RTRW spatial zones, and demographic data across Kota Pekanbaru.',
    detailedDescription:
      'Developed by Kelompok FFAC at Politeknik Caltex Riau (with Albert Christian serving as Frontend Developer), WebGIS Sampah is an integrated digital spatial platform to monitor urban waste disposal points, official RTRW zoning regulations, and neighborhood RT/RW population distribution. Built with OpenLayers mapping engine, Next.js 14, Supabase PostgreSQL, and Framer Motion for clean environmental governance.',
    repoUrl: 'https://github.com/KeijiChoco14/WebsiteGisPekanbaru',
    liveUrl: 'https://website-gis-pekanbaru.vercel.app/',
    tags: ['Next.js 14', 'React 18', 'TypeScript', 'OpenLayers (ol)', 'Supabase', 'Tailwind CSS'],
    architecturePoints: [
      'Interactive OpenLayers GIS map canvas rendering spatial polygon layers and geo-markers',
      'Comprehensive RTRW spatial zoning overlay and urban waste distribution analysis',
      'Supabase PostgreSQL backend storing geographical coordinates and demographic records',
      'Performant Next.js 14 frontend architecture with responsive map controls'
    ],
    techStack: {
      frontend: 'Next.js 14, React 18, TypeScript, OpenLayers (ol), Tailwind CSS',
      backend: 'Next.js Server Routes, Supabase',
      database: 'PostgreSQL (Supabase)',
      deployment: 'Vercel'
    },
    previewType: 'blueprint',
    accentColor: '#16a34a' // Canopy Evergreen
  }
]
