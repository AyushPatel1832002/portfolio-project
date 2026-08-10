'use client'

import {motion} from 'framer-motion'
import Image from 'next/image'
import {getImageUrl} from '@/sanity/image'
import SectionLabel from './SectionLabel'
import {FiCode, FiLayout, FiLayers, FiCpu, FiTerminal, FiGlobe} from 'react-icons/fi'

type Service = {
  _id: string
  title?: string
  description?: string
  icon?: any
}

function ServiceIcon({icon}: {icon?: any}) {
  if (!icon) return null

  const imageUrl = getImageUrl(icon, 100, 100)
  if (imageUrl) {
    return (
      <div className="relative mb-4 h-10 w-10 overflow-hidden rounded-lg">
        <Image src={imageUrl} alt="" fill className="object-contain" />
      </div>
    )
  }

  const iconName = typeof icon === 'string' ? icon.toLowerCase() : ''
  let IconComponent = FiCode
  if (iconName.includes('design') || iconName.includes('layout') || iconName.includes('ui')) IconComponent = FiLayout
  if (iconName.includes('cms') || iconName.includes('layer') || iconName.includes('data')) IconComponent = FiLayers
  if (iconName.includes('cpu') || iconName.includes('tech')) IconComponent = FiCpu
  if (iconName.includes('web') || iconName.includes('globe')) IconComponent = FiGlobe
  if (iconName.includes('term') || iconName.includes('dev')) IconComponent = FiTerminal

  return (
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface2 text-teal text-xl">
      <IconComponent />
    </div>
  )
}

export default function Services({services}: {services: Service[]}) {
  if (!services || services.length === 0) return null

  return (
    <section id="services" className="section-pad relative border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel file="services.tsx" comment="what I can do for you" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s._id}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.5, delay: i * 0.06}}
              className="card-hover rounded-xl border border-border bg-surface p-6"
            >
              <ServiceIcon icon={s.icon} />
              <h3 className="mb-2 font-display font-bold text-text">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
