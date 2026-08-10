'use client'

import {motion} from 'framer-motion'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {getImageUrl} from '@/sanity/image'
import SectionLabel from './SectionLabel'

export default function About({
  heading,
  bio,
  image,
  highlights,
  yearsExperience,
  location,
  availableForWork,
}: {
  heading?: string
  bio?: any
  image?: any
  highlights?: string[]
  yearsExperience?: number
  location?: string
  availableForWork?: boolean
}) {
  const aboutImgUrl = getImageUrl(image, 500, 625)

  return (
    <section id="about" className="section-pad relative border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel file="about.tsx" comment="who I am" />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{opacity: 0, x: -24}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true, margin: '-80px'}}
            transition={{duration: 0.6}}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface"
          >
            {aboutImgUrl ? (
              <Image src={aboutImgUrl} alt="About" fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center font-mono text-muted">no-image.png</div>
            )}
            {availableForWork && (
              <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-teal/40 bg-ink/80 px-3 py-1 font-mono text-xs text-teal backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" /> available
              </span>
            )}
          </motion.div>

          <motion.div
            initial={{opacity: 0, x: 24}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true, margin: '-80px'}}
            transition={{duration: 0.6, delay: 0.1}}
          >
            <h2 className="font-display text-3xl font-bold text-text sm:text-4xl">{heading || 'About Me'}</h2>
            <div className="prose prose-invert mt-6 max-w-none text-muted [&_p]:leading-relaxed">
              {bio ? <PortableText value={bio} /> : <p>Add your bio in Sanity Studio.</p>}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 font-mono text-sm text-muted sm:grid-cols-3">
              {yearsExperience !== undefined && (
                <div>
                  <span className="text-teal">years_exp:</span> {yearsExperience}
                </div>
              )}
              {location && (
                <div>
                  <span className="text-teal">location:</span> {location}
                </div>
              )}
            </div>

            {highlights && highlights.length > 0 && (
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm text-text"
                  >
                    <span className="text-amber">▹</span> {h}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
