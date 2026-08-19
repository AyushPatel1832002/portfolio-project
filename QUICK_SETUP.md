# Quick Setup Commands

## 1. Install Dependencies

```bash
cd web
npm install prisma @prisma/client resend
```

## 2. Set Up Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.contact-example .env.local
```

Edit `.env.local` with your actual values:
- `DATABASE_URL` (from Vercel Postgres, Supabase, etc.)
- `RESEND_API_KEY` (from resend.com)
- `CONTACT_EMAIL` (your email address)

## 3. Run Prisma Migration

```bash
npx prisma migrate dev --name add_contact_messages
npx prisma generate
```

## 4. Update Sanity Content

```bash
cd ../studio-protfoliyo
npm run dev
```

Then:
1. Open http://localhost:3333
2. Go to "Contact Section"
3. Fill in all fields
4. Publish

## 5. Test Locally

```bash
cd ../web
npm run dev
```

Visit http://localhost:3000 and test the contact form.

## 6. Deploy to Vercel

Add these environment variables in Vercel dashboard:
- `DATABASE_URL`
- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `NEXT_PUBLIC_SITE_URL`

Then deploy:

```bash
git add .
git commit -m "Add production contact system"
git push
```

## 7. Verify Production

1. Visit your live site
2. Submit a test message
3. Check your email
4. Verify in database (Prisma Studio or provider dashboard)

---

## Optional: Add postinstall script

Add to `web/package.json` if not present:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

This ensures Prisma Client is generated during Vercel builds.

---

## Troubleshooting

**Form not working?**
- Check browser console for errors
- Verify API route exists: `web/app/api/contact/route.ts`
- Check environment variables are set

**Email not received?**
- Check Resend dashboard for delivery logs
- Verify RESEND_API_KEY and CONTACT_EMAIL
- Check spam folder

**Database error?**
- Run `npx prisma migrate deploy`
- Verify DATABASE_URL is correct
- Check database is accessible

**Sanity content not showing?**
- Verify content is published in Sanity Studio
- Check NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET

---

For detailed instructions, see `CONTACT_SETUP_GUIDE.md`
