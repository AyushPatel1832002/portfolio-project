# Production-Ready Contact System Setup Guide

## Overview

This guide explains how to set up a fully functional contact system that:
- Uses **Sanity CMS** for managing contact section content
- Stores submissions in **PostgreSQL** via Prisma
- Sends email notifications via **Resend**
- Works in production on **Vercel**

---

## Architecture

```
Sanity CMS (Content)
  ↓
Next.js Contact Section
  ↓
User Submits Form
  ↓
POST /api/contact
  ↓
Validate Input
  ↓
Save to PostgreSQL (Prisma)
  ↓
Send Email (Resend)
  ↓
Return Success/Error
  ↓
Show Message in UI
```

**Important Separation:**
- **Sanity CMS** = Contact section content (heading, email, phone, messages)
- **PostgreSQL** = Visitor form submissions (name, email, message, timestamp)

---

## Step 1: Install Dependencies

```bash
cd web
npm install prisma @prisma/client resend
```

---

## Step 2: Set Up Prisma

### Initialize Prisma (if not already done)

```bash
npx prisma init
```

This creates:
- `prisma/schema.prisma`
- `.env` (with DATABASE_URL)

### Update `prisma/schema.prisma`

The `ContactMessage` model is already added. Your schema should look like:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String   @db.Text
  createdAt DateTime @default(now())

  @@index([createdAt(sort: Desc)])
  @@map("contact_messages")
}
```

---

## Step 3: Set Up PostgreSQL Database

### Option 1: Vercel Postgres (Recommended)

1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → **Postgres**
4. Copy the `DATABASE_URL` environment variable
5. Add it to your `.env.local`:

```bash
DATABASE_URL="postgres://..."
```

### Option 2: Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings** → **Database**
3. Copy the connection string (use "Session pooler" for serverless)
4. Add to `.env.local`

### Option 3: Railway/Render/Other

Follow your provider's PostgreSQL setup guide and get the connection string.

---

## Step 4: Run Prisma Migration

```bash
npx prisma migrate dev --name add_contact_messages
```

This creates the `contact_messages` table in your database.

### Generate Prisma Client

```bash
npx prisma generate
```

---

## Step 5: Set Up Resend

### Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for free (100 emails/day on free tier)
3. Navigate to **API Keys**
4. Click **Create API Key**
5. Copy the key (starts with `re_`)

### Add to `.env.local`

```bash
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxx"
CONTACT_EMAIL="your-email@example.com"
```

### Verify Domain (Optional but Recommended)

For production:
1. Go to **Domains** in Resend
2. Add your domain
3. Add DNS records
4. Update the `from` field in `app/api/contact/route.ts`:

```typescript
from: `Portfolio Contact <noreply@yourdomain.com>`,
```

If not verified, use the default:
```typescript
from: `Portfolio Contact <onboarding@resend.dev>`,
```

---

## Step 6: Update Sanity Studio Content

### Deploy Sanity Schema Changes

```bash
cd studio-protfoliyo
npm run build
```

Or if you have Sanity Studio running locally:

```bash
npm run dev
```

### Add Contact Content

1. Open Sanity Studio (usually at `http://localhost:3333`)
2. Find **Contact Section** in the sidebar
3. Create a new document (or edit existing)
4. Fill in:
   - **Heading**: "Let's Build Something"
   - **Subheading**: "Have a project in mind? Let's talk."
   - **Email**: "your-email@example.com"
   - **Phone**: "+91 XXXXX XXXXX"
   - **Location**: "Ahmedabad, Gujarat, India"
   - **Button Text**: "Send Message"
   - **Success Message**: "Thanks! Your message has been sent successfully. I'll get back to you soon."
   - **Error Message**: "Something went wrong. Please try again or contact me via email."
5. Click **Publish**

---

## Step 7: Configure Environment Variables

### Local Development (`.env.local`)

Create/update `web/.env.local`:

```bash
# Database
DATABASE_URL="postgresql://..."

# Email (DO NOT COMMIT THESE)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxx"
CONTACT_EMAIL="your-email@example.com"

# Sanity (Already configured)
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Security Notes

- `DATABASE_URL` = Server-only
- `RESEND_API_KEY` = Server-only (NEVER expose to client)
- `CONTACT_EMAIL` = Server-only
- `NEXT_PUBLIC_*` = Public (safe to expose)

---

## Step 8: Test Locally

```bash
cd web
npm run dev
```

1. Navigate to `http://localhost:3000`
2. Scroll to Contact section
3. Verify Sanity content appears (heading, email, phone, location)
4. Fill out the form
5. Submit
6. Check:
   - Success message appears
   - Form clears
   - Email received at `CONTACT_EMAIL`
   - Database entry created

### Verify Database Entry

```bash
npx prisma studio
```

This opens a GUI where you can see your `ContactMessage` records.

---

## Step 9: Deploy to Vercel

### Add Environment Variables

1. Go to your Vercel project
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | Production, Preview, Development |
| `RESEND_API_KEY` | `re_xxx...` | Production, Preview, Development |
| `CONTACT_EMAIL` | `your@email.com` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://yoursite.com` | Production |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `xxx` | All (likely already set) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | All (likely already set) |

### Deploy

```bash
git add .
git commit -m "Add production contact system with Sanity CMS"
git push
```

Vercel will automatically deploy.

### Run Migration on Production

If this is your first deployment with Prisma:

```bash
# Generate Prisma Client in production build
# (This happens automatically in most setups)
```

Vercel automatically runs `prisma generate` during build if you have a `postinstall` script.

Add to `web/package.json` if not present:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

---

## Step 10: Testing in Production

1. Visit your live site: `https://yoursite.com`
2. Navigate to Contact section
3. Verify content from Sanity appears
4. Submit a test message
5. Confirm:
   - Success message displays
   - Email arrives at `CONTACT_EMAIL`
   - Submission saved to database

### Check Database

Use your database provider's dashboard:
- **Vercel Postgres**: View in Vercel dashboard
- **Supabase**: Use Table Editor
- Or use Prisma Studio locally (connected to production DB)

---

## API Endpoint Details

### Request

```
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello, I'd like to discuss a project."
}
```

### Responses

**Success (200)**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Validation Error (400)**
```json
{
  "success": false,
  "message": "Email is required, Invalid email format"
}
```

**Server Error (500)**
```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

## Security Features

✅ Server-side validation  
✅ Input sanitization (trim whitespace)  
✅ Length limits (name: 100, email: 255, message: 5000 chars)  
✅ Email format validation  
✅ Basic spam detection (keyword/URL patterns)  
✅ No sensitive data exposure in error messages  
✅ API keys stored server-side only  
✅ CSRF protection via SameSite cookies (Next.js default)  

### Optional: Rate Limiting

For production sites with high traffic, consider adding rate limiting.

**Simple Vercel Edge Config approach:**

Install:
```bash
npm install @vercel/edge-config
```

Or use third-party services like:
- **Upstash Redis** (rate limiting)
- **Vercel Edge Functions** (built-in rate limiting)

---

## Accessibility Features

✅ Proper `<label>` elements with `htmlFor`  
✅ `aria-required` on required fields  
✅ `aria-live` regions for success/error messages  
✅ Keyboard navigation support  
✅ Focus management (focus on success message after submit)  
✅ Disabled state during submission  
✅ Clear focus indicators  

---

## Email Failure Handling

**Current behavior:**
- Message is saved to database ✅
- Email sending is attempted
- If email fails:
  - Error is logged server-side
  - API still returns success (because database save succeeded)
  - User sees success message

**Why this design?**
- The primary goal (storing the message) succeeded
- Email failures shouldn't block user confirmation
- You can check database for messages even if email fails

**Alternative:** If you want email failures to show as errors to users, modify `app/api/contact/route.ts`:

```typescript
try {
  await resend.emails.send({ ... })
} catch (emailError) {
  console.error('Email sending failed:', emailError)
  return NextResponse.json(
    { success: false, message: 'Failed to send notification email' },
    { status: 500 }
  )
}
```

---

## Troubleshooting

### "Failed to save message"

**Issue:** Database connection error

**Solutions:**
1. Verify `DATABASE_URL` is correct
2. Check database is accessible from Vercel
3. Run `npx prisma generate` locally
4. Ensure migration was applied: `npx prisma migrate deploy`

### "Email not received"

**Issue:** Resend configuration

**Solutions:**
1. Check `RESEND_API_KEY` is valid
2. Verify `CONTACT_EMAIL` is correct
3. Check Resend dashboard for delivery logs
4. If using custom domain, verify DNS records
5. Check spam folder

### "Something went wrong" in UI

**Issue:** API error

**Solutions:**
1. Check Vercel function logs
2. Verify all environment variables are set
3. Check API route is deployed correctly
4. Inspect browser Network tab for error details

### Sanity content not showing

**Issue:** CMS query or deployment

**Solutions:**
1. Verify content is published in Sanity Studio
2. Check Sanity project ID and dataset in `.env.local`
3. Ensure Next.js is fetching with `cache: 'no-store'`
4. Check browser console for errors

---

## Maintenance

### Viewing Submissions

**Option 1: Prisma Studio (Local)**
```bash
npx prisma studio
```

**Option 2: Database Dashboard**
Use your provider's web interface (Vercel, Supabase, etc.)

**Option 3: Build Admin Panel**
Create a protected Next.js page to view submissions:
- `/admin/contact-messages`
- Protected with authentication (NextAuth, Clerk, etc.)

### Backing Up Data

Export contact messages:
```bash
npx prisma db pull
```

Or use your database provider's backup features.

---

## Next Steps (Optional Enhancements)

### 1. Auto-Reply Email

Send a confirmation email to the user:

```typescript
// In app/api/contact/route.ts
await resend.emails.send({
  from: 'Portfolio <noreply@yourdomain.com>',
  to: email, // User's email
  subject: 'Thanks for reaching out!',
  html: `<p>Hi ${name},</p><p>I received your message and will get back to you soon!</p>`,
})
```

### 2. Admin Dashboard

Create `/app/admin/messages/page.tsx` to view submissions.

### 3. Rate Limiting

Add Upstash Redis or Vercel Edge Config for rate limiting.

### 4. Webhook Notifications

Send submissions to Slack/Discord:
```typescript
await fetch(process.env.SLACK_WEBHOOK_URL, {
  method: 'POST',
  body: JSON.stringify({ text: `New contact from ${name}` }),
})
```

### 5. reCAPTCHA

Add Google reCAPTCHA v3 for advanced spam protection.

---

## Summary

✅ Sanity CMS manages contact section content  
✅ PostgreSQL stores visitor submissions  
✅ Resend sends email notifications  
✅ Next.js API provides secure backend  
✅ Frontend has proper UX and accessibility  
✅ Production-ready and deployed on Vercel  

**You can now:**
- Update contact info in Sanity Studio
- Receive form submissions via email
- Store submissions in database
- Provide a professional contact experience

---

## Files Modified/Created

### Created:
- `web/app/api/contact/route.ts` - API endpoint
- `web/prisma/schema.prisma` - Database schema
- `web/.env.local.contact-example` - Environment template
- `CONTACT_SETUP_GUIDE.md` - This guide

### Modified:
- `web/components/Contact.tsx` - Updated with Sanity props
- `web/sanity/queries.ts` - Added buttonText, successMessage, errorMessage
- `studio-protfoliyo/schemaTypes/contact.ts` - Updated schema

### To Install:
```bash
npm install prisma @prisma/client resend
```

### To Run:
```bash
npx prisma migrate dev --name add_contact_messages
npx prisma generate
```

---

Need help? Check the error logs in:
- Vercel Functions tab
- Browser Network tab
- Resend delivery logs
- Database provider dashboard
