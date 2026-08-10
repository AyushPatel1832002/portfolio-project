import type {Metadata} from 'next'

const BASE_URL = 'https://ayushpatel-dev.vercel.app'

const SITE_DEFAULTS = {
  title: 'Aayush Patel | Full Stack Developer',
  description:
    'Aayush Patel is a Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, Sanity CMS, Tailwind CSS and modern web applications.',
  ogImage: `${BASE_URL}/og-image.png`,
  keywords: [
    'Aayush Patel',
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
}

export type SanitySeo = {
  metaTitle?: string | null
  metaDescription?: string | null
  keywords?: string[] | null
  canonicalUrl?: string | null
  noIndex?: boolean | null
  noFollow?: boolean | null
  ogTitle?: string | null
  ogDescription?: string | null
  ogImageUrl?: string | null
  ogImageAlt?: string | null
  twitterTitle?: string | null
  twitterDescription?: string | null
  twitterImageUrl?: string | null
  twitterCard?: 'summary_large_image' | 'summary' | null
}

type BuildMetadataOptions = {
  seo?: SanitySeo | null
  /** Page-level title fallback (e.g. project title) */
  fallbackTitle?: string
  /** Page-level description fallback (e.g. project description) */
  fallbackDescription?: string
  /** Page-level canonical URL fallback */
  canonical?: string
}

/**
 * Builds a Next.js Metadata object with a 3-tier priority system:
 * 1. Sanity SEO fields
 * 2. Page-level fallbacks
 * 3. Global site defaults
 */
export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  canonical,
}: BuildMetadataOptions = {}): Metadata {
  // Tier 1 → 2 → 3 priority chain
  const title = seo?.metaTitle || fallbackTitle || SITE_DEFAULTS.title
  const description = seo?.metaDescription || fallbackDescription || SITE_DEFAULTS.description
  const canonicalUrl = seo?.canonicalUrl || canonical || BASE_URL
  const keywords =
    seo?.keywords && seo.keywords.length > 0 ? seo.keywords : SITE_DEFAULTS.keywords

  const ogTitle = seo?.ogTitle || seo?.metaTitle || fallbackTitle || SITE_DEFAULTS.title
  const ogDescription =
    seo?.ogDescription || seo?.metaDescription || fallbackDescription || SITE_DEFAULTS.description
  const ogImageUrl = seo?.ogImageUrl || SITE_DEFAULTS.ogImage
  const ogImageAlt = seo?.ogImageAlt || `${title} – Aayush Patel`

  const twitterTitle = seo?.twitterTitle || ogTitle
  const twitterDescription = seo?.twitterDescription || ogDescription
  const twitterImageUrl = seo?.twitterImageUrl || ogImageUrl
  const twitterCard = seo?.twitterCard || 'summary_large_image'

  const noIndex = seo?.noIndex ?? false
  const noFollow = seo?.noFollow ?? false

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: title,
      template: '%s | Aayush Patel',
    },
    description,
    keywords,
    authors: [{name: 'Aayush Patel', url: BASE_URL}],
    creator: 'Aayush Patel',
    publisher: 'Aayush Patel',
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: 'Aayush Patel | Full Stack Developer',
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImageUrl],
      creator: '@aayushpatel',
    },
    icons: {
      icon: '/favicon.ico',
    },
  }
}
