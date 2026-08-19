'use client'

import {useState, useRef} from 'react'
import {motion} from 'framer-motion'
import {FiMail, FiMapPin, FiPhone} from 'react-icons/fi'
import SectionLabel from './SectionLabel'

type ContactProps = {
  heading?: string
  subheading?: string
  email?: string
  phone?: string
  location?: string
  buttonText?: string
  successMessage?: string
  errorMessage?: string
}

export default function Contact({
  heading = "Let's Build Something",
  subheading,
  email,
  phone,
  location,
  buttonText,
  successMessage,
  errorMessage,
}: ContactProps) {
  // Debug: Check what props are received
  console.log('Contact Props:', { heading, subheading, email, phone, location, buttonText })
  
  // Use fallback values for null/undefined
  const finalButtonText = buttonText || 'Send Message'
  const finalSuccessMessage = successMessage || "Thanks! Your message has been sent successfully. I'll get back to you soon."
  const finalErrorMessage = errorMessage || 'Something went wrong. Please try again or contact me via email.'
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({name: '', email: '', message: ''})
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const successMessageRef = useRef<HTMLDivElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Prevent duplicate submissions
    if (isSubmitting) return
    
    // Reset error message
    setApiErrorMessage('')
    setIsSubmitting(true)
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('sent')
        // Clear form after successful submission
        setForm({name: '', email: '', message: ''})
        // Focus on success message for screen readers
        setTimeout(() => {
          successMessageRef.current?.focus()
        }, 100)
      } else {
        setStatus('error')
        setApiErrorMessage(data.message || finalErrorMessage)
      }
    } catch (error) {
      setStatus('error')
      setApiErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
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
          {heading}
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

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block font-mono text-xs text-muted">
                name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                disabled={isSubmitting}
                className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-text outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Jane Doe"
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block font-mono text-xs text-muted">
                email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                disabled={isSubmitting}
                className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-text outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="jane@email.com"
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block font-mono text-xs text-muted">
                message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                maxLength={5000}
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
                disabled={isSubmitting}
                className="w-full rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-text outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Tell me about your project..."
                aria-required="true"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || status === 'sending'}
              className="rounded-md bg-amber px-6 py-3 font-mono text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2"
              aria-label={status === 'sending' ? 'Sending message' : status === 'sent' ? 'Message sent successfully' : 'Send message'}
            >
              {status === 'sending' && 'Sending...'}
              {status === 'sent' && 'Message Sent ✓'}
              {status === 'error' && 'Try Again'}
              {status === 'idle' && finalButtonText}
            </button>
            
            {/* Success message */}
            {status === 'sent' && (
              <div 
                ref={successMessageRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="rounded-md bg-teal/10 border border-teal/30 px-4 py-3 font-mono text-sm text-teal"
              >
                {finalSuccessMessage}
              </div>
            )}
            
            {/* Error message */}
            {status === 'error' && (
              <div 
                role="alert"
                aria-live="assertive"
                className="rounded-md bg-red-400/10 border border-red-400/30 px-4 py-3 font-mono text-xs text-red-400"
              >
                {apiErrorMessage || finalErrorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
