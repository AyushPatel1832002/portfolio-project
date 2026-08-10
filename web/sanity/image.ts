import createImageUrlBuilder from '@sanity/image-url'
import {client} from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  if (!source) return null
  if (typeof source === 'string') return null
  if (typeof source === 'object' && (source.asset || source._ref)) {
    return builder.image(source)
  }
  return null
}

export function getImageUrl(source: any, width = 600, height = 600): string | null {
  try {
    const img = urlFor(source)
    if (!img) return null
    return img.width(width).height(height).url()
  } catch {
    return null
  }
}
