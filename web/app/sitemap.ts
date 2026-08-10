import type {MetadataRoute} from 'next'
import {client} from '@/sanity/client'
import {siteSettingsQuery} from '@/sanity/queries'

const BASE_URL = 'https://ayushpatel-dev.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch site settings for noIndex flag and lastModified date
  const settings = await client
    .fetch(siteSettingsQuery, {}, {cache: 'no-store'})
    .catch(() => null)

  // If the site is globally set to noIndex, return empty sitemap
  if (settings?.seo?.noIndex === true) return []

  const lastModified = settings?._updatedAt ? new Date(settings._updatedAt) : new Date()

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}

