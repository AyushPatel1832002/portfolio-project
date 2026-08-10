'use client'

import {useState} from 'react'
import {motion} from 'framer-motion'
import {FiMail, FiMapPin, FiPhone} from 'react-icons/fi'
import SectionLabel from './SectionLabel'

export default function Contact({
  heading,
  subheading,
  email,
  phone,
  location,
  formEndpoint,
}: {
  heading?: string
  subheading?: string
  email?: string
  phone?: string
  location?: string
  formEndpoint?: string
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({name: '', email: '', message: ''})

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formEndpoint) {
      setStatus('sent')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-pad relative border-t border-border/60">
      <div className="mx-auto max-w-4xl px-6">
        <SectionLabel file="contact.tsx" comment="get in touch" />
        <motion.h2
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5}}
          className="font-display text-3xl font-bold text-text sm:text-4xl"
        >
          {heading || "Let's Build Something"}
        </motion.h2>
        {subheading && <p className="mt-4 max-w-xl text-muted">{subheading}</p>}

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4 font-mono text-sm">
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-muted transition-colors hover:text-teal">
                <FiMail /> {email}
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} className="flex items-center gap-3 text-muted transition-colors hover:text-teal">
                <FiPhone /> {phone}
              </a>
            )}
            {location && (
              <div className="flex items-center gap-3 text-muted">
                <FiMapPin /> {location}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block font-mono text-xs text-muted">name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-text outline-none transition-colors focus:border-teal"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-xs text-muted">email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-text outline-none transition-colors focus:border-teal"
                placeholder="jane@email.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-xs text-muted">message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
                className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-text outline-none transition-colors focus:border-teal"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-md bg-amber px-6 py-3 font-mono text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : 'Send Message'}
            </button>
            {status === 'error' && <p className="font-mono text-xs text-red-400">Something went wrong — try email instead.</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
