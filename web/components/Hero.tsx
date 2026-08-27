'use client'

import {useEffect, useMemo, useState} from 'react'
import {motion} from 'framer-motion'
import Image from 'next/image'
import {getImageUrl} from '@/sanity/image'

type Stat = {label?: string; value?: string}

export default function Hero({
  greeting,
  name,
  roles,
  tagline,
  profileImage,
  primaryCtaLabel,
  primaryCtaLink,
  secondaryCtaLabel,
  resumeUrl,
  stats,
}: {
  greeting?: string
  name?: string
  roles?: string[]
  tagline?: string
  profileImage?: any
  primaryCtaLabel?: string
  primaryCtaLink?: string
  secondaryCtaLabel?: string
  resumeUrl?: string
  stats?: Stat[]
}) {
  const words = useMemo(() => (roles && roles.length ? roles : ['Full Stack Developer']), [roles])
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    const speed = deleting ? 40 : 80
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, displayed.length + 1)
        setDisplayed(next)
        if (next === current) setTimeout(() => setDeleting(true), 1200)
      } else {
        const next = current.slice(0, displayed.length - 1)
        setDisplayed(next)
        if (next === '') {
          setDeleting(false)
          setWordIndex((i) => i + 1)
        }
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [displayed, deleting, wordIndex, words])

  const profileImgUrl = getImageUrl(profileImage, 600, 600)

  return (
    <section id="hero" className="section-pad relative flex min-h-screen items-center pt-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.p
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="mb-4 font-mono text-sm text-teal"
          >
            {greeting || 'const developer ='} <span className="text-muted">{'{'}</span>
          </motion.p>

          <motion.h1
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.1}}
            className="font-display text-4xl font-bold leading-[1.05] text-text sm:text-5xl md:text-6xl"
          >
            {name || 'Dev Patel'}
          </motion.h1>

          <motion.div
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.55, delay: 0.2}}
            className="mt-4 h-10 font-mono text-lg text-amber sm:text-xl md:text-2xl"
          >
            {displayed}
            <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-blink bg-amber align-middle" />
          </motion.div>

          <motion.p
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.25}}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted"
          >
            {tagline || 'I build fast, accessible, and delightful web experiences.'}
          </motion.p>

          <motion.p
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5, delay: 0.35}}
            className="mt-2 font-mono text-sm text-muted"
          >
            <span className="text-muted">{'}'}</span>
          </motion.p>

          <motion.div
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.4}}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href={primaryCtaLink || '#projects'}
              className="rounded-md bg-amber px-6 py-3 font-mono text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(255,182,39,0.6)]"
            >
              {primaryCtaLabel || 'View Projects'}
            </a>
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border px-6 py-3 font-mono text-sm text-text transition-colors hover:border-teal hover:text-teal"
              >
                {secondaryCtaLabel || 'Download Resume'}
              </a>
            )}
          </motion.div>

          {stats && stats.length > 0 && (
            <motion.div
              initial={{opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.5}}
              className="mt-12 flex flex-wrap gap-8"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{opacity: 0, y: 8}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.4, delay: 0.6 + i * 0.1}}
                >
                  <div className="font-display text-2xl font-bold text-text">{s.value}</div>
                  <div className="font-mono text-xs text-muted">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.7, delay: 0.2}}
          className="relative mx-auto aspect-square w-full max-w-sm animate-floaty"
        >
          <div className="hero-glow absolute inset-0 rounded-2xl bg-gradient-to-br from-amber/15 via-amber/10 to-violet/15 blur-2xl" />
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-surface">
            {profileImgUrl ? (
              <Image src={profileImgUrl} alt={`${name || 'Aayush Patel'} – Full Stack Developer profile photo`} fill sizes="(max-width: 768px) 90vw, 384px" className="object-cover" priority />
            ) : (
              <div className="flex h-full items-center justify-center font-mono text-muted">no-image.png</div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
