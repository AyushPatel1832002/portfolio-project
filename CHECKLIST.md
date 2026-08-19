# Implementation Checklist

Use this checklist to ensure your contact system is fully set up and working.

---

## ✅ Files Created/Modified

### Backend Files
- [x] `web/app/api/contact/route.ts` - API endpoint
- [x] `web/prisma/schema.prisma` - Database schema

### Frontend Files
- [x] `web/components/Contact.tsx` - Updated component

### CMS Files
- [x] `studio-protfoliyo/schemaTypes/contact.ts` - Enhanced schema
- [x] `web/sanity/queries.ts` - Updated query

### Configuration Files
- [x] `web/package.json` - Added postinstall script
- [x] `web/.env.local.contact-example` - Environment template

### Documentation
- [x] `CONTACT_SETUP_GUIDE.md` - Complete guide
- [x] `QUICK_SETUP.md` - Quick reference
- [x] `IMPLEMENTATION_COMPLETE.md` - Overview
- [x] `CHECKLIST.md` - This file

---

## 🔧 Setup Steps (Complete These)

### 1. Install Dependencies

- [ ] Run: `cd web`
- [ ] Run: `npm install prisma @prisma/client resend`
- [ ] Verify: No errors during installation

**If you get ENOSPC error:**
```bash
npm cache clean --force
# Free up disk space
npm install prisma @prisma/client resend
```

### 2. Environment Variables

- [ ] Copy: `cp .env.local.contact-example .env.local`
- [ ] Open: `web/.env.local`
- [ ] Add: `DATABASE_URL` (from Vercel Postgres or Supabase)
- [ ] Add: `RESEND_API_KEY` (from resend.com)
- [ ] Add: `CONTACT_EMAIL` (your email address)
- [ ] Add: `NEXT_PUBLIC_SITE_URL` (your site URL)
- [ ] Verify: All sensitive vars are NOT committed to git

**Get DATABASE_URL:**
- Vercel Postgres: Dashboard → Storage → Create Database
- Supabase: Project Settings → Database → Connection String
- Other: Your provider's PostgreSQL connection string

**Get RESEND_API_KEY:**
1. Go to https://resend.com
2. Sign up (free tier: 100 emails/day)
3. Navigate to API Keys
4. Create API Key
5. Copy the key (starts with `re_`)

### 3. Database Setup

- [ ] Run: `npx prisma migrate dev --name add_contact_messages`
- [ ] Run: `npx prisma generate`
- [ ] Verify: Migration completed successfully
- [ ] Verify: Prisma Client generated

**If migration fails:**
- Check DATABASE_URL is correct
- Ensure database is accessible
- Try: `npx prisma migrate reset` (WARNING: Deletes all data)

### 4. Sanity Studio

- [ ] Run: `cd ../studio-protfoliyo`
- [ ] Run: `npm run dev`
- [ ] Open: http://localhost:3333
- [ ] Find: "Contact Section" in sidebar
- [ ] Create/Edit document
- [ ] Fill in:
  - [ ] Heading
  - [ ] Subheading
  - [ ] Email
  - [ ] Phone
  - [ ] Location
  - [ ] Button Text
  - [ ] Success Message
  - [ ] Error Message
- [ ] Click: **Publish**
- [ ] Verify: Document shows in Sanity Studio

**If Sanity Studio doesn't load:**
- Check `studio-protfoliyo/package.json` dependencies
- Run: `npm install`
- Check for console errors

### 5. Local Testing

- [ ] Run: `cd ../web`
- [ ] Run: `npm run dev`
- [ ] Open: http://localhost:3000
- [ ] Scroll to: Contact section
- [ ] Verify: Sanity content appears (heading, email, phone, location)
- [ ] Fill out: Name, Email, Message
- [ ] Click: Submit button
- [ ] Wait for: "Sending..." state
- [ ] Verify: Success message appears
- [ ] Verify: Form clears after submission
- [ ] Check email: Message received at CONTACT_EMAIL
- [ ] Run: `npx prisma studio`
- [ ] Verify: Entry in `ContactMessage` table

**If form doesn't work:**
- Open browser console for errors
- Check Network tab for API response
- Verify `/api/contact` endpoint exists
- Check environment variables are loaded

**If email not received:**
- Check Resend dashboard for logs
- Verify RESEND_API_KEY and CONTACT_EMAIL
- Look in spam folder
- Check Resend account status

### 6. Vercel Deployment

- [ ] Go to: Vercel project dashboard
- [ ] Navigate to: Settings → Environment Variables
- [ ] Add variables for: Production, Preview, Development
  - [ ] `DATABASE_URL`
  - [ ] `RESEND_API_KEY`
  - [ ] `CONTACT_EMAIL`
  - [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] Verify: All variables saved
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Add production contact system"`
- [ ] Run: `git push`
- [ ] Wait: For Vercel deployment to complete
- [ ] Check: Deployment logs for errors

**If deployment fails:**
- Check build logs in Vercel
- Verify postinstall script exists
- Ensure all dependencies are in package.json
- Check for TypeScript errors

### 7. Production Testing

- [ ] Visit: Your live site
- [ ] Navigate to: Contact section
- [ ] Verify: Content from Sanity displays correctly
- [ ] Submit: Test message
- [ ] Verify: Success message appears
- [ ] Check: Email received at CONTACT_EMAIL
- [ ] Verify: Database entry (use provider dashboard or Prisma Studio)

**If production doesn't work:**
- Check Vercel function logs
- Verify environment variables in Vercel
- Test API directly: `curl https://yoursite.com/api/contact -X POST -d ...`
- Check database connection from Vercel

---

## 🔍 Verification Tests

### Test 1: Valid Submission

**Input:**
```
Name: Jane Doe
Email: jane@example.com
Message: Hello, I'd like to discuss a project.
```

**Expected:**
- ✅ Success message appears
- ✅ Form clears
- ✅ Email received
- ✅ Database entry created

### Test 2: Invalid Email

**Input:**
```
Name: John
Email: notanemail
Message: Test
```

**Expected:**
- ❌ Error message: "Invalid email format"
- 📝 Form data preserved
- ❌ No email sent
- ❌ No database entry

### Test 3: Empty Fields

**Input:**
```
Name: (empty)
Email: (empty)
Message: (empty)
```

**Expected:**
- ❌ Browser validation prevents submit
- ❌ No API request

### Test 4: Very Long Message

**Input:**
```
Message: (6000 characters)
```

**Expected:**
- ❌ Error message: "Message must be less than 5000 characters"
- 📝 Form data preserved

### Test 5: Spam Detection

**Input:**
```
Name: Viagra Seller
Message: Buy cheap viagra now! Click here!
```

**Expected:**
- ✅ Success message (silent rejection)
- ❌ No email sent
- ❌ No database entry
- 📝 Server logs spam detection

---

## 🎯 Success Criteria

Your contact system is fully working when:

✅ **Content Management**
- Sanity Studio shows Contact Section
- All fields can be edited
- Changes reflect on website immediately

✅ **Form Functionality**
- Form validates input properly
- Submit button shows correct states
- Success/error messages display
- Form clears after success

✅ **Data Storage**
- Submissions save to PostgreSQL
- Database entries are searchable
- Timestamps are correct

✅ **Email Notifications**
- Emails arrive at CONTACT_EMAIL
- Reply-to is set correctly
- Email content is formatted properly

✅ **Security**
- Server-side validation works
- API keys are not exposed
- Spam detection functions

✅ **User Experience**
- Loading states are clear
- Error messages are helpful
- Accessibility features work
- Mobile responsive

✅ **Production**
- Deployed to Vercel successfully
- Environment variables configured
- Database connected
- Email service working

---

## 🐛 Common Issues & Solutions

### Issue: "Module not found: Can't resolve '@prisma/client'"

**Solution:**
```bash
npm install @prisma/client
npx prisma generate
```

### Issue: "PrismaClientInitializationError"

**Solution:**
- Check DATABASE_URL is set correctly
- Verify database is accessible
- Run: `npx prisma generate`

### Issue: "ResendError: API key not found"

**Solution:**
- Check `.env.local` has `RESEND_API_KEY`
- Verify key starts with `re_`
- Restart dev server after adding env vars

### Issue: Sanity content not showing

**Solution:**
- Ensure content is published (not just saved)
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Clear Next.js cache: `rm -rf .next`
- Restart dev server

### Issue: Form submits but no email

**Solution:**
- Check Resend dashboard for delivery logs
- Verify `CONTACT_EMAIL` is set
- Look in spam folder
- Check Resend account limits

### Issue: TypeScript errors in Contact.tsx

**Solution:**
```bash
npm install --save-dev @types/react @types/node
```

### Issue: Build fails on Vercel

**Solution:**
- Add postinstall script to package.json
- Verify all dependencies are listed
- Check TypeScript config
- Review Vercel build logs

---

## 📊 Final Checklist

Before marking as complete, verify:

- [ ] All files created and in correct locations
- [ ] Dependencies installed successfully
- [ ] Environment variables configured (local & production)
- [ ] Database migration ran successfully
- [ ] Sanity content published
- [ ] Local testing passed all tests
- [ ] Email notifications working
- [ ] Database storing submissions
- [ ] Deployed to Vercel
- [ ] Production testing passed
- [ ] Documentation reviewed

---

## 🎉 You're Done!

If all checkboxes above are checked, your contact system is fully operational!

**What you achieved:**
✅ Sanity CMS integration for content management  
✅ Real contact form with validation  
✅ PostgreSQL database for submissions  
✅ Email notifications via Resend  
✅ Production-ready and secure  
✅ Accessible and user-friendly  

**Next steps:**
- Monitor submissions via Prisma Studio or database dashboard
- Update contact content in Sanity Studio as needed
- Consider optional enhancements (see IMPLEMENTATION_COMPLETE.md)

**Support:**
- Full Guide: `CONTACT_SETUP_GUIDE.md`
- Quick Commands: `QUICK_SETUP.md`
- Overview: `IMPLEMENTATION_COMPLETE.md`
