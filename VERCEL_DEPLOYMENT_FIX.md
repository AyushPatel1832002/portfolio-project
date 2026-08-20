# 🚨 URGENT: Fix Contact Form on Vercel Production

## Problem Summary
Contact form works locally but emails don't arrive on Vercel because:
1. ❌ EmailJS environment variables not added to Vercel
2. ❌ EmailJS template uses wrong variable names
3. ❌ Code logging added but needs deployment

---

## ✅ SOLUTION (3 Steps)

### **STEP 1: Fix EmailJS Template Variables** ⚠️ CRITICAL

Your EmailJS template currently uses **WRONG variable names**. This must be fixed first.

#### Go to EmailJS Dashboard:
🔗 https://dashboard.emailjs.com/admin/templates

#### Find Template: `template_eijm65q` ("Contact Us")

#### Click "Edit Content" and update:

**❌ WRONG (Current):**
```
Subject: New message from {{from_name}}

Name: {{from_name}}
Email: {{reply_to}}
Message: {{message}}

Reply To: {{reply_to}}
```

**✅ CORRECT (Update to this):**
```
Subject: New message from {{user_name}}

Name: {{user_name}}
Email: {{user_email}}
Message: {{message}}

Reply To: {{user_email}}
```

#### Save Template

#### Test It:
1. Click "Test It" button in template editor
2. Fill in test values:
   - `user_name`: Test Name
   - `user_email`: test@example.com
   - `message`: Test message
3. Click "Test It"
4. Check your email (ayushpatel1832001@gmail.com)
5. **Verify email arrives before proceeding**

---

### **STEP 2: Add Environment Variables to Vercel** ⚠️ CRITICAL

#### Go to Vercel Dashboard:
🔗 https://vercel.com/dashboard → Your Project → Settings → Environment Variables

#### Add These 3 Variables:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_6aynn5v` | ✅ Production<br>✅ Preview<br>✅ Development |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `template_eijm65q` | ✅ Production<br>✅ Preview<br>✅ Development |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `ClG_rzyjZRDZ9su6K` | ✅ Production<br>✅ Preview<br>✅ Development |

#### Screenshot Instructions:
1. Click "Add New" for each variable
2. Enter exact variable name (case-sensitive!)
3. Paste value
4. Select ALL THREE checkboxes (Production, Preview, Development)
5. Click "Save"
6. Repeat for all 3 variables

---

### **STEP 3: Redeploy to Vercel (Clear Cache)** ⚠️ CRITICAL

After adding environment variables, you **MUST** redeploy:

#### Go to Deployments Tab:
🔗 https://vercel.com/dashboard → Your Project → Deployments

#### Trigger Fresh Deployment:
1. Click "..." (three dots) on latest deployment
2. Click "Redeploy"
3. **UNCHECK** ❌ "Use existing Build Cache"
4. Click "Redeploy"
5. Wait for build to complete (~2-3 minutes)

#### Why Clear Cache?
Environment variables are baked into the build. Without clearing cache, Vercel uses the old build without your new variables.

---

## 🧪 Testing Production

### After Deployment Completes:

1. **Visit your production site**
2. **Scroll to Contact section**
3. **Fill out form:**
   - Name: Test User
   - Email: your-test-email@example.com
   - Message: Testing production contact form
4. **Click "Send Message"**
5. **Watch for:**
   - Button shows "Sending..."
   - Success message appears
   - Form clears
6. **Check your email:** ayushpatel1832001@gmail.com
7. **Email should arrive within 30 seconds**

---

## 🔍 Debugging (If Still Not Working)

### Check Vercel Runtime Logs:
1. Go to: Deployments → Latest Deployment → Functions
2. Look for console logs starting with `[EmailJS]`
3. Check for errors

### Expected Logs (Success):
```
[EmailJS] Initiating email send...
[EmailJS] Email sent successfully: { status: 200, text: 'OK' }
```

### Common Error Logs:

#### Configuration Error:
```
[EmailJS] Configuration Error: { hasServiceId: false, hasTemplateId: false, hasPublicKey: false }
```
**Fix:** Environment variables not added or deployment not redeployed

#### Template Variable Error:
```
[EmailJS] Failed to send email: { errorStatus: 400, errorText: "Template variable 'from_name' not found" }
```
**Fix:** EmailJS template still using wrong variable names (Step 1 not completed)

#### Authentication Error:
```
[EmailJS] Failed to send email: { errorStatus: 401 }
```
**Fix:** Wrong Public Key or Service ID

---

## 📋 Verification Checklist

Before marking as fixed, verify:

- [ ] EmailJS template updated with correct variables (`user_name`, `user_email`, `message`)
- [ ] EmailJS template tested successfully via "Test It" button
- [ ] Test email received in inbox
- [ ] All 3 environment variables added to Vercel
- [ ] All 3 variables applied to Production environment
- [ ] Vercel redeployed WITHOUT build cache
- [ ] Production form tested
- [ ] Production email received
- [ ] No errors in Vercel Runtime Logs
- [ ] No errors in browser console

---

## 🎯 Summary

**Files Changed:**
- ✅ `web/components/Contact.tsx` (enhanced logging, validation, error handling)
- ✅ `VERCEL_DEPLOYMENT_FIX.md` (this guide)

**Environment Variables Required:**
```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_6aynn5v"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="template_eijm65q"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="ClG_rzyjZRDZ9su6K"
```

**Deployment Steps:**
1. Fix EmailJS template variables
2. Add 3 environment variables to Vercel (Production + Preview + Development)
3. Redeploy without cache

**Testing:**
1. Fill production contact form
2. Check email arrives
3. Check Vercel logs for `[EmailJS]` entries

---

## ⚠️ IMPORTANT NOTES

### Why Not Use API Route?
Your project has `/app/api/contact/route.ts` (Prisma + Resend), but:
- Prisma removed from package.json (no database)
- Resend not installed
- API route set to `DEV_MODE = true`
- Contact.tsx uses EmailJS directly (no API call)

**Current architecture is correct** - EmailJS client-side is simpler and works well for portfolio contact forms.

### Security Notes
- ✅ `NEXT_PUBLIC_*` prefix is correct (EmailJS needs client access)
- ✅ EmailJS Public Key is meant to be public
- ✅ No sensitive secrets exposed
- ✅ EmailJS has built-in rate limiting (100 emails/month free tier)

### Variable Name Matching
| Form Field (name attribute) | EmailJS Template Variable |
|----------------------------|---------------------------|
| `user_name` | `{{user_name}}` |
| `user_email` | `{{user_email}}` |
| `message` | `{{message}}` |

**These must match exactly** (case-sensitive).

---

## 🆘 Still Not Working?

If you've completed all 3 steps and it still fails:

1. **Check EmailJS Dashboard:**
   - Service `service_6aynn5v` is Active
   - Template `template_eijm65q` is Published
   - Usage hasn't exceeded 100 emails/month

2. **Check Browser Console** (production site):
   - Open DevTools (F12)
   - Go to Console tab
   - Submit form
   - Look for `[EmailJS]` logs

3. **Check Vercel Environment Variables:**
   - Settings → Environment Variables
   - Verify exact spelling
   - Verify "Production" is checked
   - Verify values are correct (no typos)

4. **Verify Template Variables:**
   - Go to EmailJS template
   - Click "Variables" tab
   - Should show: `user_name`, `user_email`, `message`
   - NOT: `from_name`, `reply_to`

---

**Next Steps:**
1. Complete Step 1 (fix template)
2. Complete Step 2 (add env vars)
3. Complete Step 3 (redeploy)
4. Test production form
5. Verify email arrives ✅
