# Production-Ready Contact Form Setup Guide

## 📦 Installation Steps

### 1. Install Required Packages

```bash
cd web
npm install prisma @prisma/client resend
npm install -D prisma
```

### 2. Setup Environment Variables

Create or update `web/.env.local` with these values:

```env
# PostgreSQL Database URL
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio?schema=public"

# Resend API Key (get from https://resend.com)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Your email for receiving contact notifications
CONTACT_EMAIL="your-email@example.com"

# Your site URL (used in email notifications)
NEXT_PUBLIC_SITE_URL="https://yoursite.com"
```

**Security Notes:**
- `DATABASE_URL` - Server-only (not exposed to client)
- `RESEND_API_KEY` - Server-only (not exposed to client)
- `CONTACT_EMAIL` - Server-only (not exposed to client)
- `NEXT_PUBLIC_SITE_URL` - Client-accessible (safe to expose)

### 3. Initialize Prisma

```bash
cd web
npx prisma generate
```

### 4. Create Database Migration

```bash
cd web
npx prisma migrate dev --name add_contact_messages
```

This creates the `contact_messages` table in your database.

## 🚀 Local Development

### 1. Start PostgreSQL Database

Make sure you have PostgreSQL running locally or use a hosted service like:
- [Neon](https://neon.tech) (recommended for serverless)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

### 2. Test the Contact Form

```bash
cd web
npm run dev
```

Visit `http://localhost:3000/#contact` and submit a test message.

### 3. Check Database

```bash
cd web
npx prisma studio
```

This opens a GUI to view your `contact_messages` table.

## 📧 Resend Setup

### 1. Create Resend Account
- Go to [resend.com](https://resend.com)
- Sign up for free (100 emails/day on free tier)

### 2. Get API Key
- Navigate to API Keys section
- Create a new API key
- Copy it to your `.env.local` as `RESEND_API_KEY`

### 3. Verify Domain (Optional but Recommended)

For production, verify your domain:
- Go to Domains in Resend dashboard
- Add your domain (e.g., `yourdomain.com`)
- Add DNS records to your domain registrar
- Wait for verification
- Update `from` email in `app/api/contact/route.ts`:

```typescript
from: `Portfolio Contact <noreply@yourdomain.com>`
```

**Note:** Without domain verification, emails will be sent from `onboarding@resend.dev` which works but looks less professional.

## 🔒 Security Features Implemented

### 1. Input Validation
- Server-side validation (never trust client)
- Email format validation
- Length limits (name: 100, email: 255, message: 5000)
- Trim whitespace
- Type checking

### 2. Anti-Spam Protection
- Pattern detection (viagra, casino, multiple URLs)
- Silently rejects spam without informing sender
- Database index for efficient queries

### 3. Error Handling
- Never exposes database errors to client
- Safe error messages
- All errors logged server-side
- Network error handling

### 4. Rate Limiting (Recommended)

For additional protection, consider adding rate limiting. Here are two approaches:

#### Option A: Vercel Rate Limiting (Easiest)

Install Vercel's rate limiting:
```bash
npm install @vercel/rate-limit
```

Update `app/api/contact/route.ts`:
```typescript
import rateLimit from '@vercel/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})

export async function POST(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  
  try {
    await limiter.check(5, ip) // 5 requests per minute
  } catch {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }
  
  // ... rest of your code
}
```

#### Option B: Upstash Redis (Production-Grade)

Use Upstash for distributed rate limiting:
```bash
npm install @upstash/ratelimit @upstash/redis
```

See: https://upstash.com/docs/redis/features/ratelimiting

## ☁️ Vercel Deployment

### 1. Setup Database

#### Option A: Vercel Postgres (Recommended)
```bash
# In your Vercel project dashboard
1. Go to Storage tab
2. Create new Postgres database
3. Copy DATABASE_URL
```

#### Option B: External Provider
Use Neon, Supabase, or Railway and get connection string.

### 2. Add Environment Variables in Vercel

Go to your Vercel project dashboard:

**Settings → Environment Variables → Add New**

Add these variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | Production, Preview, Development |
| `RESEND_API_KEY` | `re_xxx...` | Production, Preview, Development |
| `CONTACT_EMAIL` | `your@email.com` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | Production, Preview, Development |

**Important:** Make sure to add variables to all environments (Production, Preview, Development).

### 3. Run Prisma Migration on Vercel

Add a build script in `package.json`:

```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

This ensures:
1. Prisma Client is generated
2. Database migrations are applied
3. Next.js builds successfully

### 4. Deploy

```bash
git add .
git commit -m "Add production-ready contact form"
git push
```

Vercel will automatically deploy.

### 5. Test on Production

Visit your live site: `https://yourdomain.com/#contact`

Submit a test message and verify:
- ✅ Message appears in database (check Prisma Studio or Vercel Postgres dashboard)
- ✅ Email notification received
- ✅ Success message displays correctly

## 🧪 Testing Checklist

### Frontend Tests
- [ ] Submit valid message → Shows "Message Sent ✓"
- [ ] Submit with empty name → Browser validation triggers
- [ ] Submit with invalid email → Browser validation triggers
- [ ] Submit with empty message → Browser validation triggers
- [ ] Button disabled while sending
- [ ] Form clears after successful submission
- [ ] Success message displays correctly
- [ ] Error message displays on failure
- [ ] All inputs keyboard accessible
- [ ] Tab navigation works properly
- [ ] Focus states visible

### Backend Tests
- [ ] Valid submission saves to database
- [ ] Email notification sent
- [ ] Invalid email rejected (400 error)
- [ ] Empty fields rejected (400 error)
- [ ] Very long message rejected (400 error)
- [ ] Spam patterns detected and handled
- [ ] Database errors handled gracefully
- [ ] Email errors don't fail the request
- [ ] Response times acceptable (<2s)

### Edge Cases
- [ ] Submit same message twice quickly
- [ ] Submit with only spaces in fields
- [ ] Submit with special characters (emojis, unicode)
- [ ] Submit with HTML/script tags (should be safe as plain text)
- [ ] Network timeout handling
- [ ] Database connection lost
- [ ] Resend API down

## 📊 Monitoring

### View Contact Messages

```bash
cd web
npx prisma studio
```

Or query directly:

```typescript
// In a script or admin page
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const messages = await prisma.contactMessage.findMany({
  orderBy: { createdAt: 'desc' },
  take: 10,
})

console.log(messages)
```

### Email Logs

Check Resend dashboard:
- Emails sent
- Delivery status
- Bounce rate
- Open rate (if tracking enabled)

## 🔧 Troubleshooting

### "Failed to save message"
- Check `DATABASE_URL` is correct
- Ensure database is running
- Run `npx prisma migrate deploy`
- Check Vercel logs

### Email not received
- Check `RESEND_API_KEY` is valid
- Check `CONTACT_EMAIL` is correct
- Check spam folder
- Check Resend dashboard for delivery status
- Verify domain if using custom domain

### "Something went wrong"
- Check Vercel function logs
- Check database connection
- Verify environment variables are set
- Check API route is accessible: `https://yoursite.com/api/contact`

### Prisma errors on build
- Ensure `prisma generate` runs before build
- Check `postinstall` script exists
- Verify DATABASE_URL is set in Vercel

## 🎯 Production Checklist

Before going live:
- [ ] PostgreSQL database setup and accessible
- [ ] All environment variables added to Vercel
- [ ] Prisma migrations deployed
- [ ] Resend API key configured
- [ ] Domain verified in Resend (optional but recommended)
- [ ] Test submission on production
- [ ] Email notification received
- [ ] Database entry created
- [ ] Error handling working
- [ ] Success/error messages display correctly
- [ ] Rate limiting configured (recommended)
- [ ] Monitoring setup (logs, Prisma Studio, Resend dashboard)

## 📝 Database Failure vs Email Failure

**Current Behavior:**
- If database save fails → Return error to user
- If email send fails → Still return success to user (message is saved)

**Rationale:**
The most important goal is to not lose the user's message. If the message is saved to the database, the submission is considered successful even if email notification fails. You can always check the database manually or set up alternative notification methods.

**Email failure is logged server-side** so you can monitor and debug without affecting user experience.

## 🚀 Next Steps (Optional Enhancements)

1. **Admin Dashboard** - Create `/admin/messages` page to view submissions
2. **Auto-responder** - Send confirmation email to user
3. **File Attachments** - Allow users to upload files
4. **Categories** - Add dropdown for inquiry type
5. **CAPTCHA** - Add Google reCAPTCHA or Cloudflare Turnstile
6. **Webhook** - Notify Slack/Discord on new submissions
7. **Analytics** - Track form conversion rate

## 📚 Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Resend Docs](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Neon Database](https://neon.tech/docs)

---

**Questions or issues?** Check the troubleshooting section above or review the implementation code.
