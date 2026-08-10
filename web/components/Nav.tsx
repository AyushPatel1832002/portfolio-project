'use client'

import {useEffect, useState} from 'react'

type NavLabels = {
  about?: string
  skills?: string
  projects?: string
  experience?: string
  contact?: string
}

const DEFAULTS: Required<NavLabels> = {
  about: 'About',
  skills: 'Skills',
  projects: 'Projects',
  experience: 'Experience',
  contact: 'Contact',
}

export default function Nav({logoText, labels}: {logoText?: string; labels?: NavLabels}) {
  const [active, setActive] = useState('about')
  const tabs = {...DEFAULTS, ...labels}
  const order = ['about', 'skills', 'projects', 'experience', 'contact'] as const

  useEffect(() => {
    const sections = order.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      {rootMargin: '-40% 0px -50% 0px'}
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 sm:px-6">
        <a href="#hero" className="mr-4 flex shrink-0 items-center gap-2 py-3 font-mono text-sm text-amber">
          <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-amber" />
          {logoText || 'aayush.tsx'}
        </a>
        <nav className="flex shrink-0 gap-1">
          {order.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`group relative flex items-center gap-2 border-x border-transparent px-4 py-3 font-mono text-xs transition-colors sm:text-sm ${
                active === id ? 'border-border bg-surface text-text' : 'text-muted hover:text-text'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  active === id ? 'bg-teal' : 'bg-transparent group-hover:bg-teal/50'
                }`}
              />
              {tabs[id].replace(/\.tsx$/i, '')}
              {active === id && <span className="absolute inset-x-0 -bottom-px h-px bg-teal" />}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
