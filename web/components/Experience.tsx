'use client'

import {motion} from 'framer-motion'
import SectionLabel from './SectionLabel'

type Exp = {
  _id: string
  role?: string
  company?: string
  companyUrl?: string
  location?: string
  startDate?: string
  endDate?: string
  current?: boolean
  description?: string[]
}

function formatDate(d?: string) {
  if (!d) return ''
  const date = new Date(d)
  if (isNaN(date.getTime())) return d
  return date.toLocaleDateString('en-US', {month: 'short', year: 'numeric'})
}

export default function Experience({experience}: {experience: Exp[]}) {
  if (!experience || experience.length === 0) return null

  return (
    <section id="experience" className="section-pad relative border-t border-border/60">
      <div className="mx-auto max-w-4xl px-6">
        <SectionLabel file="experience.tsx" comment="where I've worked" />
        <div className="relative border-l border-border pl-8">
          {(experience || []).map((e, i) => (
            <motion.div
              key={e._id}
              initial={{opacity: 0, x: -20}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.5, delay: i * 0.06}}
              className="group relative mb-12 last:mb-0"
            >
              <span className="absolute -left-[2.28rem] top-1.5 h-3 w-3 rounded-full border-2 border-ink bg-teal transition-transform group-hover:scale-125" />
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-text">
                  {e.role} <span className="text-muted">@</span>{' '}
                  {e.companyUrl ? (
                    <a href={e.companyUrl} target="_blank" rel="noopener noreferrer" className="text-amber hover:underline">
                      {e.company}
                    </a>
                  ) : (
                    <span className="text-amber">{e.company}</span>
                  )}
                </h3>
                <span className="font-mono text-xs text-muted">
                  {formatDate(e.startDate)} — {e.current ? 'Present' : formatDate(e.endDate)}
                </span>
              </div>
              {e.location && <p className="mb-3 font-mono text-xs text-muted">{e.location}</p>}
              {e.description && e.description.length > 0 && (
                <ul className="space-y-1.5 text-sm text-muted">
                  {e.description.map((d, di) => (
                    <li key={di} className="flex gap-2">
                      <span className="mt-0.5 text-teal">▹</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
