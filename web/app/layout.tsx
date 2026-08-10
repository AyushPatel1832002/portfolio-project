import type {Metadata} from 'next'
import {Space_Grotesk, Inter, JetBrains_Mono} from 'next/font/google'
import './globals.css'

const display = Space_Grotesk({subsets: ['latin'], variable: '--font-display', weight: ['500', '700']})
const body = Inter({subsets: ['latin'], variable: '--font-body'})
const mono = JetBrains_Mono({subsets: ['latin'], variable: '--font-mono', weight: ['400', '500']})

const BASE_URL = 'https://ayushpatel-dev.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Aayush Patel | Full Stack Developer',
    template: '%s | Aayush Patel',
  },
  description:
    'Aayush Patel is a Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, Sanity CMS, Tailwind CSS and modern responsive web applications.',
  keywords: [
    'Aayush Patel',
    'Aayush Patel Full Stack Developer',
    'Aayush Patel Developer',
    'Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'TypeScript Developer',
    'Sanity CMS Developer',
    'Frontend Developer',
    'Web Developer',
    'Full Stack Developer India',
    'Full Stack Developer Gujarat',
  ],
  authors: [{name: 'Aayush Patel', url: BASE_URL}],
  creator: 'Aayush Patel',
  publisher: 'Aayush Patel',
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Aayush Patel | Full Stack Developer',
    title: 'Aayush Patel | Full Stack Developer',
    description:
      'Full Stack Developer specializing in Next.js, React, TypeScript, Node.js and Sanity CMS. Building performant, scalable and user-friendly web applications.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Aayush Patel – Full Stack Developer',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aayush Patel | Full Stack Developer',
    description:
      'Full Stack Developer specializing in Next.js, React, TypeScript, Node.js and Sanity CMS.',
    images: [`${BASE_URL}/og-image.png`],
    creator: '@aayushpatel',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: 'Aayush Patel',
      url: BASE_URL,
      jobTitle: 'Full Stack Developer',
      description:
        'Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, Sanity CMS and Tailwind CSS.',
      sameAs: [
        'https://github.com/AyushPatel1832002',
        'https://www.linkedin.com/in/ayush-patel-50674224b/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Aayush Patel | Full Stack Developer',
      description:
        'Portfolio of Aayush Patel — Full Stack Developer building modern web applications with Next.js, React, TypeScript and Node.js.',
      publisher: {
        '@id': `${BASE_URL}/#person`,
      },
    },
  ],
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
        {children}
      </body>
    </html>
  )
}
