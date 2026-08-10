'use client'

import {motion} from 'framer-motion'
import SectionLabel from './SectionLabel'

type Edu = {
  _id: string
  degree?: string
  institution?: string
  startYear?: number
  endYear?: number
  description?: string
}

export default function Education({education}: {education: Edu[]}) {
  if (!education || education.length === 0) return null
  return (
    <section id="education" className="section-pad relative border-t border-border/60">
      <div className="mx-auto max-w-4xl px-6">
        <SectionLabel file="education.tsx" comment="how I got here" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {education.map((e, i) => (
            <motion.div
              key={e._id}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.5, delay: i * 0.06}}
              className="card-hover rounded-xl border border-border bg-surface p-6"
            >
              <span className="font-mono text-xs text-muted">
                {e.startYear} — {e.endYear || 'Present'}
              </span>
              <h3 className="mt-2 font-display font-bold text-text">{e.degree}</h3>
              <p className="mt-1 text-sm text-amber">{e.institution}</p>
              {e.description && <p className="mt-3 text-sm text-muted">{e.description}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
