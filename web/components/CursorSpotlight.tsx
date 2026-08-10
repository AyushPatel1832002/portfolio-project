'use client'

import {useEffect, useRef} from 'react'

export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!ref.current) return
      ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(53,208,186,0.08), transparent 40%)`
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-30 transition-[background] duration-150" />
}
