'use client'

import {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import Image from 'next/image'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import {getImageUrl} from '@/sanity/image'
import SectionLabel from './SectionLabel'

type Testimonial = {
  _id: string
  quote?: string
  authorName?: string
  authorRole?: string
  authorImage?: any
}

export default function Testimonials({testimonials}: {testimonials: Testimonial[]}) {
  const [index, setIndex] = useState(0)
  if (!testimonials || testimonials.length === 0) return null

  const t = testimonials[index]
  const next = () => setIndex((i) => (i + 1) % testimonials.length)
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  const authorImgUrl = getImageUrl(t.authorImage, 96, 96)

  return (
    <section id="testimonials" className="section-pad relative border-t border-border/60">
      <div className="mx-auto max-w-3xl px-6">
        <SectionLabel file="testimonials.tsx" comment="what people say" />
        <div className="relative rounded-2xl border border-border bg-surface p-8 sm:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={t._id}
              initial={{opacity: 0, x: 24}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: -24}}
              transition={{duration: 0.35}}
            >
              <p className="text-lg leading-relaxed text-text sm:text-xl">“{t.quote}”</p>
              <div className="mt-6 flex items-center gap-4">
                {authorImgUrl && (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border">
                    <Image src={authorImgUrl} alt={t.authorName || ''} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <div className="font-display font-bold text-text">{t.authorName}</div>
                  <div className="font-mono text-xs text-muted">{t.authorRole}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="rounded-full border border-border p-2 text-muted transition-colors hover:border-teal hover:text-teal"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="rounded-full border border-border p-2 text-muted transition-colors hover:border-teal hover:text-teal"
              >
                <FiChevronRight />
              </button>
              <div className="ml-2 flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-teal' : 'w-1.5 bg-border'}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
