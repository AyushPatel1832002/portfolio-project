# EmailJS Contact Form Setup Guide

Your contact form uses **EmailJS** - a free email service that sends emails directly from the browser without a backend.

## Current Status

✅ **EmailJS package installed:** `@emailjs/browser`  
✅ **Contact component configured**  
❌ **Environment variables missing** ← This is why you're seeing the error

---

## Step 1: Create EmailJS Account (Free)

1. Go to https://dashboard.emailjs.com/sign-up
2. Sign up (100 emails/month free)
3. Verify your email

---

## Step 2: Add Email Service

1. **Go to:** https://dashboard.emailjs.com/admin
2. **Click:** "Email Services" in sidebar
3. **Click:** "Add New Service"
4. **Choose:** Gmail (or your preferred email provider)
5. **Connect your email account:**
   - For Gmail: Click "Connect Account" and authorize
   - Or use SMTP settings
6. **Copy the Service ID** (looks like: `service_abc123`)

---

## Step 3: Create Email Template

1. **Go to:** "Email Templates" in sidebar
2. **Click:** "Create New Template"
3. **Template Name:** "Contact Form"
4. **Edit Template Content:**

```html
Subject: New Contact from {{user_name}}

Body:
You received a new message from your portfolio contact form.

Name: {{user_name}}
Email: {{user_email}}

Message:
{{message}}

---
Sent from your portfolio website
```

5. **Save** template
6. **Copy the Template ID** (looks like: `template_xyz789`)

---

## Step 4: Get Public Key

1. **Go to:** "Account" in sidebar
2. **Find:** "Public Key" section
3. **Copy the Public Key** (looks like: `abcDEF123ghiJKL`)

---

## Step 5: Update `.env.local`

Open `web/.env.local` and fill in your EmailJS credentials:

```bash
# Already filled ✅
NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_abc123"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="template_xyz789"  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="abcDEF123ghiJKL"
```

Replace with your actual values from EmailJS dashboard.

---

## Step 6: Update Vercel Environment Variables

1. **Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables
2. **Add these 3 variables:**

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_abc123` | Production, Preview, Development |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `template_xyz789` | Production, Preview, Development |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `abcDEF123ghiJKL` | Production, Preview, Development |

3. **Redeploy** your site

---

## Step 7: Test Locally

```bash
cd web
npm run dev
```

1. Open http://localhost:3000
2. Scroll to Contact section
3. Fill out the form
4. Click "Send Message"
5. Check your email inbox (the one connected to EmailJS)

---

## Step 8: Test in Production

After Vercel deployment:
1. Visit your live site
2. Submit contact form
3. Check email

---

## Troubleshooting

### Error: "Something went wrong. Please try again..."

**Causes:**
1. ❌ Environment variables not set
2. ❌ Service ID/Template ID/Public Key incorrect
3. ❌ EmailJS service not connected
4. ❌ EmailJS free limit exceeded (100 emails/month)

**Solutions:**
1. Check `.env.local` has all 3 variables
2. Verify values match EmailJS dashboard exactly
3. Restart dev server: `npm run dev`
4. Check browser console for specific error

### Error: "Failed to send email"

**Check:**
1. EmailJS service is connected and active
2. Template exists and is published
3. Public key is correct
4. Not blocked by browser extensions (disable ad blockers)

### Email not received

**Check:**
1. Spam folder
2. EmailJS service email is correct
3. EmailJS free limit not exceeded
4. Template is saved and published

---

## EmailJS Dashboard Quick Links

- **Dashboard:** https://dashboard.emailjs.com/admin
- **Email Services:** https://dashboard.emailjs.com/admin/services
- **Email Templates:** https://dashboard.emailjs.com/admin/templates
- **Account (Public Key):** https://dashboard.emailjs.com/admin/account
- **Usage Stats:** https://dashboard.emailjs.com/admin/usage

---

## Template Variables Reference

Your contact form sends these variables to EmailJS:

| Variable | Description | Form Field |
|----------|-------------|------------|
| `{{user_name}}` | Visitor's name | name input |
| `{{user_email}}` | Visitor's email | email input |
| `{{message}}` | Visitor's message | message textarea |

Use these in your EmailJS template.

---

## Free Tier Limits

EmailJS Free Plan:
- ✅ 100 emails/month
- ✅ 2 email templates
- ✅ Unlimited email services
- ✅ Captcha protection included

If you need more, upgrade to paid plan.

---

## Alternative: Use FormSubmit (No Signup)

If you want an even simpler solution (no signup required):

### Option: FormSubmit

1. **Update Contact form action:**
```tsx
<form action="https://formsubmit.co/your@email.com" method="POST">
```

2. **No environment variables needed**
3. **No EmailJS account needed**
4. **Just change form to point to FormSubmit**

But EmailJS is better because:
- ✅ Custom email templates
- ✅ Better control
- ✅ Detailed analytics
- ✅ No email exposed in source code

---

## Security Notes

- ✅ `NEXT_PUBLIC_*` variables are safe (public)
- ✅ EmailJS Public Key is meant to be public
- ✅ Rate limiting included by EmailJS
- ✅ Captcha protection available

---

## Summary

**Current Issue:**
- Contact form error because EmailJS environment variables are empty

**Fix:**
1. Create EmailJS account (5 min)
2. Add email service (2 min)
3. Create template (3 min)
4. Copy Service ID, Template ID, Public Key
5. Update `.env.local`
6. Restart dev server
7. Test form

**Total Time:** ~10 minutes

---

## Quick Test Command

After setting up EmailJS, test with:

```bash
# Check environment variables are loaded
node -e "console.log('Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID)"
```

Should output your Service ID (not undefined).

---

**Need Help?**
- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
