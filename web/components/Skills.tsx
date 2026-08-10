'use client'

import {motion} from 'framer-motion'
import SectionLabel from './SectionLabel'

type Skill = {
  _id: string
  name?: string
  category?: string
  proficiency?: number
}

const CATEGORY_LABEL: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps / Tools',
  design: 'Design',
  other: 'Other',
}

export default function Skills({skills}: {skills: Skill[]}) {
  const grouped = (skills || []).reduce<Record<string, Skill[]>>((acc, s) => {
    const key = s.category || 'other'
    acc[key] = acc[key] || []
    acc[key].push(s)
    return acc
  }, {})

  return (
    <section id="skills" className="section-pad relative border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel file="skills.tsx" comment="tools I reach for" />
        <h2 className="sr-only">Technical Skills</h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(grouped).map(([cat, items], gi) => (
            <motion.div
              key={cat}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.5, delay: gi * 0.05}}
              className="card-hover rounded-xl border border-border bg-surface p-6"
            >
              <h3 className="mb-5 font-mono text-sm text-teal">{CATEGORY_LABEL[cat] || cat}</h3>
              <div className="space-y-4">
                {items.map((s) => (
                  <div key={s._id}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-text">{s.name}</span>
                      <span className="font-mono text-xs text-muted">{s.proficiency ?? 0}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface2">
                      <motion.div
                        initial={{width: 0}}
                        whileInView={{width: `${s.proficiency ?? 0}%`}}
                        viewport={{once: true}}
                        transition={{duration: 0.9, ease: 'easeOut'}}
                        className="h-full rounded-full bg-gradient-to-r from-teal to-amber"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
