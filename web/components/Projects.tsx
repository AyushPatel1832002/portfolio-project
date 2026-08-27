'use client'

import {useMemo, useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import Image from 'next/image'
import {FiGithub, FiExternalLink} from 'react-icons/fi'
import {getImageUrl} from '@/sanity/image'
import SectionLabel from './SectionLabel'

type Project = {
  _id: string
  title?: string
  coverImage?: any
  shortDescription?: string
  techStack?: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  category?: string
  year?: number
}

export default function Projects({projects}: {projects: Project[]}) {
  const categories = useMemo(() => {
    const set = new Set<string>()
    ;(projects || []).forEach((p) => p.category && set.add(p.category))
    return ['all', ...Array.from(set)]
  }, [projects])

  const [filter, setFilter] = useState('all')
  const filtered = (projects || []).filter((p) => filter === 'all' || p.category === filter)

  return (
    <section id="projects" className="section-pad relative border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel file="projects.tsx" comment="things I've shipped" />
        <h2 className="sr-only">Featured Projects</h2>

        {categories.length > 2 && (
          <div className="mb-10 flex flex-wrap gap-2 font-mono text-xs">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-4 py-1.5 transition-colors ${
                  filter === c
                    ? 'border-teal bg-teal/10 text-teal'
                    : 'border-border text-muted hover:border-teal/50 hover:text-text'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((p, i) => {
              const projectImgUrl = getImageUrl(p.coverImage, 600, 340)

              return (
                <motion.div
                  key={p._id}
                  initial={{opacity: 0, y: 24}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, margin: '-60px'}}
                  transition={{duration: 0.5, delay: (i % 3) * 0.08}}
                  className="card-hover group overflow-hidden rounded-xl border border-border bg-surface"
                >
                  <div className="relative aspect-video overflow-hidden bg-surface2">
                    {projectImgUrl ? (
                      <Image
                        src={projectImgUrl}
                        alt={`${p.title || 'Project'} – project screenshot`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-mono text-muted">no-image.png</div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-ink/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-amber p-3 text-ink transition-transform hover:scale-110"
                          aria-label={`View live demo of ${p.title || 'project'}`}
                        >
                          <FiExternalLink />
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-teal p-3 text-ink transition-transform hover:scale-110"
                          aria-label={`View source code of ${p.title || 'project'} on GitHub`}
                        >
                          <FiGithub />
                        </a>
                      )}
                    </div>
                    {p.featured && (
                      <span className="absolute right-3 top-3 rounded-full border border-amber/50 bg-ink/80 px-2.5 py-0.5 font-mono text-[10px] text-amber backdrop-blur">
                        featured
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-display font-bold text-text">{p.title}</h3>
                      {p.year && <span className="font-mono text-xs text-muted">{p.year}</span>}
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-muted">{p.shortDescription}</p>
                    {p.techStack && p.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {p.techStack.map((t, ti) => (
                          <span
                            key={ti}
                            className="rounded-md border border-border bg-surface2 px-2 py-1 font-mono text-[11px] text-teal"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="py-16 text-center font-mono text-sm text-muted">No projects found — add some in Sanity Studio.</p>
        )}
      </div>
    </section>
  )
}
