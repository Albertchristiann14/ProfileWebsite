import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { DoorTransitionProvider } from '@/components/doors/DoorTransitionProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://albertchristian.dev'),
  title: {
    default: 'Albert Christian — Creative Engineer & Founder of Krevia Digital',
    template: '%s | Albert Christian',
  },
  description:
    'Tactile, cinematic portfolio for Albert Christian: Web development, native Kotlin Android apps, ERP & business systems, AI/GIS platforms, and event digital operations in Pekanbaru, Indonesia.',
  keywords: [
    'Albert Christian',
    'Krevia Digital',
    'Web Developer',
    'Android Developer',
    'Kotlin',
    'Next.js',
    'React',
    'ERP Systems',
    'WebGIS',
    'Pekanbaru',
    'Politeknik Caltex Riau',
  ],
  authors: [{ name: 'Albert Christian', url: 'https://albertchristian.dev' }],
  creator: 'Albert Christian',
  alternates: {
    canonical: 'https://albertchristian.dev',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://albertchristian.dev',
    title: 'Albert Christian — Creative Engineer & Founder of Krevia Digital',
    description:
      'Explore the Hallway of Doors: Web development, Android apps, Business Systems, AI & GIS, and Event Digital Operations.',
    siteName: 'Albert Christian Portfolio',
    images: [
      {
        url: '/character/albert_photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Albert Christian — Developer & Founder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Albert Christian — Creative Engineer & Founder of Krevia Digital',
    description:
      'Explore the Hallway of Doors: Web development, Android apps, Business Systems, AI & GIS, and Event Digital Operations.',
    images: ['/character/albert_photo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Albert Christian',
    alternateName: 'Albert',
    jobTitle: 'Web & Mobile Developer, Founder',
    description:
      'Web & mobile developer and founder of Krevia Digital, based in Pekanbaru, Indonesia.',
    worksFor: {
      '@type': 'Organization',
      name: 'Krevia Digital',
      url: 'https://kreviadigitalid.my.id',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Politeknik Caltex Riau',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pekanbaru',
      addressRegion: 'Riau',
      addressCountry: 'ID',
    },
    url: 'https://albertchristian.dev',
    email: 'albertchristian.dev@gmail.com',
    sameAs: [
      'https://github.com/KeijiChoco14',
      'https://linkedin.com/in/albert-christiann',
      'https://instagram.com/__nybertx',
      'https://kreviadigitalid.my.id',
    ],
  };

  return (
    <html lang="en" className={`${bodyFont.variable} ${monoFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <SmoothScrollProvider>
          <ThemeProvider>
            <DoorTransitionProvider>
              {children}
            </DoorTransitionProvider>
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
