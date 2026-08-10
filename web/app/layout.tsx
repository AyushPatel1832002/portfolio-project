import type {Metadata} from 'next'
import {Space_Grotesk, Inter, JetBrains_Mono} from 'next/font/google'
import './globals.css'
import {client} from '@/sanity/client'
import {siteSettingsQuery} from '@/sanity/queries'
import {buildMetadata} from '@/sanity/seo'

const display = Space_Grotesk({subsets: ['latin'], variable: '--font-display', weight: ['500', '700']})
const body = Inter({subsets: ['latin'], variable: '--font-body'})
const mono = JetBrains_Mono({subsets: ['latin'], variable: '--font-mono', weight: ['400', '500']})

const BASE_URL = 'https://ayushpatel-dev.vercel.app'

// JSON-LD: Person + WebSite schema (server-rendered, no hydration risk)
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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(siteSettingsQuery, {}, {cache: 'no-store'}).catch(() => null)

  return buildMetadata({
    seo: settings?.seo ?? null,
    // Legacy fallback: use old metaTitle/metaDescription if new SEO object is empty
    fallbackTitle: settings?.metaTitle || settings?.siteName || undefined,
    fallbackDescription: settings?.metaDescription || undefined,
    canonical: BASE_URL,
  })
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

