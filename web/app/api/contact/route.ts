import { NextRequest, NextResponse } from 'next/server'

// Development mode flag - set to false once you've installed dependencies
const DEV_MODE = true

// Lazy imports to handle missing dependencies gracefully
let PrismaClient: any
let Resend: any
let prisma: any
let resend: any

try {
  PrismaClient = require('@prisma/client').PrismaClient
  prisma = new PrismaClient()
} catch (e) {
  if (!DEV_MODE) {
    console.warn('Prisma not installed. Run: npm install @prisma/client prisma')
  }
}

try {
  Resend = require('resend').Resend
  resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
} catch (e) {
  if (!DEV_MODE) {
    console.warn('Resend not installed. Run: npm install resend')
  }
}

// Input validation constants
const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 255
const MAX_MESSAGE_LENGTH = 5000
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ContactFormData {
  name: string
  email: string
  message: string
}

// Validate and sanitize input
function validateInput(data: any): { valid: boolean; errors: string[]; sanitized?: ContactFormData } {
  const errors: string[] = []

  // Type check
  if (typeof data !== 'object' || data === null) {
    return { valid: false, errors: ['Invalid request format'] }
  }

  const { name, email, message } = data

  // Validate name
  if (!name || typeof name !== 'string') {
    errors.push('Name is required')
  } else if (name.trim().length === 0) {
    errors.push('Name cannot be empty')
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.push(`Name must be less than ${MAX_NAME_LENGTH} characters`)
  }

  // Validate email
  if (!email || typeof email !== 'string') {
    errors.push('Email is required')
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push('Invalid email format')
  } else if (email.length > MAX_EMAIL_LENGTH) {
    errors.push(`Email must be less than ${MAX_EMAIL_LENGTH} characters`)
  }

  // Validate message
  if (!message || typeof message !== 'string') {
    errors.push('Message is required')
  } else if (message.trim().length === 0) {
    errors.push('Message cannot be empty')
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.push(`Message must be less than ${MAX_MESSAGE_LENGTH} characters`)
  }

  if (errors.length > 0) {
    return { valid: false, errors }
  }

  // Sanitize and trim
  const sanitized: ContactFormData = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
  }

  return { valid: true, errors: [], sanitized }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body: any
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON' },
        { status: 400 }
      )
    }

    // Validate input
    const validation = validateInput(body)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.errors.join(', ') },
        { status: 400 }
      )
    }

    const { name, email, message } = validation.sanitized!

    // Basic anti-spam: Check for obvious spam patterns
    const spamPatterns = [
      /\b(viagra|cialis|casino|lottery|click here)\b/i,
      /(https?:\/\/[^\s]+){5,}/i, // Multiple URLs
    ]

    const hasSpam = spamPatterns.some(pattern => 
      pattern.test(name) || pattern.test(message)
    )

    if (hasSpam) {
      // Silently reject but pretend success (don't inform spammers)
      console.warn('Spam detected:', { name, email })
      return NextResponse.json(
        { success: true, message: 'Message sent successfully' },
        { status: 200 }
      )
    }

    // DEVELOPMENT MODE: Log to console instead of database
    if (DEV_MODE || !prisma) {
      console.log('\n=================================')
      console.log('📧 NEW CONTACT FORM SUBMISSION')
      console.log('=================================')
      console.log('Name:', name)
      console.log('Email:', email)
      console.log('Message:', message)
      console.log('Time:', new Date().toISOString())
      console.log('=================================\n')
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Message sent successfully (DEV MODE: Check server console)' 
        },
        { status: 200 }
      )
    }

    // PRODUCTION MODE: Save to database
    let contactMessage
    try {
      contactMessage = await prisma.contactMessage.create({
        data: { name, email, message },
      })
    } catch (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, message: 'Failed to save message' },
        { status: 500 }
      )
    }

    // Send email notification
    // Note: If email fails, we still return success because the message is saved
    const contactEmail = process.env.CONTACT_EMAIL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'your-site.com'

    if (contactEmail && resend) {
      try {
        await resend.emails.send({
          from: `Portfolio Contact <onboarding@resend.dev>`, // Use your verified domain
          replyTo: email,
          to: contactEmail,
          subject: `New Contact Message from ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0891b2;">New Contact Form Submission</h2>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p style="margin: 8px 0;"><strong>Date:</strong> ${new Date(contactMessage.createdAt).toLocaleString()}</p>
              </div>
              <div style="margin: 20px 0;">
                <h3>Message:</h3>
                <p style="white-space: pre-wrap; background: #f8fafc; padding: 16px; border-radius: 8px;">${message}</p>
              </div>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="color: #64748b; font-size: 14px;">
                This message was sent from ${siteUrl}/contact
              </p>
            </div>
          `,
        })
      } catch (emailError) {
        // Log error but don't fail the request
        console.error('Email sending failed:', emailError)
        // Message is still saved in database, so we return success
      }
    } else {
      console.warn('Email notification skipped: Missing CONTACT_EMAIL or Resend not configured')
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Unexpected error in contact API:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
