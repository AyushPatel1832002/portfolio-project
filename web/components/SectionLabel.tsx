'use client'

import {motion} from 'framer-motion'

export default function SectionLabel({file, comment}: {file: string; comment: string}) {
  return (
    <motion.div
      initial={{opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-80px'}}
      transition={{duration: 0.5}}
      className="mb-10 font-mono text-sm"
    >
      <span className="text-muted">{'// '}</span>
      <span className="text-teal">{file}</span>
      <span className="text-muted"> — {comment}</span>
    </motion.div>
  )
}
