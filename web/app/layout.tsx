import type {Metadata} from 'next'
import {Space_Grotesk, Inter, JetBrains_Mono} from 'next/font/google'
import './globals.css'
import {client} from '@/sanity/client'
import {siteSettingsQuery} from '@/sanity/queries'
import {buildMetadata} from '@/sanity/seo'

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '700'],
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

const BASE_URL = 'https://ayushpatel-dev.vercel.app'

/**
 * JSON-LD
 * Helps search engines understand:
 * Ayush Patel → Full Stack Developer → Portfolio → GitHub → LinkedIn
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,

      name: 'Ayush Patel',

      url: BASE_URL,

      jobTitle: 'Full Stack Developer',

      description:
        'Ayush Patel is a Full Stack Developer from Ahmedabad, Gujarat, India specializing in React.js, Next.js, Node.js, TypeScript, PostgreSQL, Prisma, GraphQL and modern web development.',

      image: `${BASE_URL}/og-image.png`,

      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },

      sameAs: [
        'https://github.com/AyushPatel1832002',
        'https://www.linkedin.com/in/ayush-patel-50674224b/',
      ],

      knowsAbout: [
        'React.js',
        'Next.js',
        'JavaScript',
        'TypeScript',
        'Node.js',
        'Express.js',
        'PostgreSQL',
        'MongoDB',
        'Prisma',
        'GraphQL',
        'REST APIs',
        'Redux Toolkit',
        'Sanity CMS',
        'Tailwind CSS',
        'Full Stack Development',
        'Web Development',
      ],
    },

    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,

      url: BASE_URL,

      name: 'Ayush Patel | Full Stack Developer',

      description:
        'Official portfolio of Ayush Patel, a Full Stack Developer from Ahmedabad, Gujarat, India specializing in React.js, Next.js, Node.js, TypeScript and modern web development.',

      publisher: {
        '@id': `${BASE_URL}/#person`,
      },

      inLanguage: 'en-IN',
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client
    .fetch(siteSettingsQuery, {}, {cache: 'no-store'})
    .catch(() => null)

  const fallbackTitle =
    'Ayush Patel | Full Stack Developer'

  const fallbackDescription =
    'Ayush Patel is a Full Stack Developer from Ahmedabad, Gujarat, India specializing in React.js, Next.js, Node.js, TypeScript, PostgreSQL, Prisma and modern web development.'

  const metadata = buildMetadata({
    seo: settings?.seo ?? null,

    fallbackTitle:
      settings?.metaTitle ||
      fallbackTitle,

    fallbackDescription:
      settings?.metaDescription ||
      fallbackDescription,

    canonical: BASE_URL,
  })

  return {
    ...metadata,

    title: {
      default: fallbackTitle,
      template: '%s | Ayush Patel',
    },

    description: fallbackDescription,

    keywords: [
      'Ayush Patel',
      'Ayush Patel Developer',
      'Ayush Patel Full Stack Developer',
      'AyushPatel1832002',
      'Full Stack Developer Ahmedabad',
      'React.js Developer',
      'Next.js Developer',
      'Node.js Developer',
      'TypeScript Developer',
      'PostgreSQL Developer',
      'Prisma Developer',
    ],

    authors: [
      {
        name: 'Ayush Patel',
        url: BASE_URL,
      },
    ],

    creator: 'Ayush Patel',

    metadataBase: new URL(BASE_URL),

    alternates: {
      canonical: BASE_URL,
    },

    openGraph: {
      type: 'website',
      url: BASE_URL,
      title: fallbackTitle,
      description: fallbackDescription,
      siteName: 'Ayush Patel | Full Stack Developer',
      locale: 'en_IN',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Ayush Patel - Full Stack Developer',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: fallbackTitle,
      description: fallbackDescription,
      images: ['/og-image.png'],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="font-body antialiased">

        {/* Person + Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {children}

      </body>
    </html>
  )
}