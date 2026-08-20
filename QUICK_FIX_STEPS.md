# ⚡ Quick Fix: Contact Form on Vercel (3 Steps)

## Problem
Contact form works locally but emails don't arrive on Vercel production.

---

## ✅ Fix (5 Minutes)

### **STEP 1: Fix EmailJS Template** (2 min)

1. Go to: https://dashboard.emailjs.com/admin/templates
2. Find template: **`template_eijm65q`**
3. Click **"Edit Content"**
4. Change these variables:

| Current (Wrong) | Change To (Correct) |
|----------------|---------------------|
| `{{from_name}}` | `{{user_name}}` |
| `{{reply_to}}` | `{{user_email}}` |

5. **Update Subject line:**
   ```
   New message from {{user_name}}
   ```

6. **Update Content:**
   ```
   Name: {{user_name}}
   Email: {{user_email}}
   
   Message:
   {{message}}
   ```

7. **Update Reply To field:**
   ```
   {{user_email}}
   ```

8. Click **"Save"**
9. Click **"Test It"** to verify

---

### **STEP 2: Add Vercel Environment Variables** (2 min)

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to: **Settings** → **Environment Variables**
4. Add these 3 variables:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID = service_6aynn5v
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = template_eijm65q
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = ClG_rzyjZRDZ9su6K
```

5. For each variable:
   - ✅ Check **Production**
   - ✅ Check **Preview**
   - ✅ Check **Development**

---

### **STEP 3: Redeploy** (1 min)

1. Go to: **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. **UNCHECK** ❌ "Use existing Build Cache"
5. Click **"Redeploy"**
6. Wait for build to complete

---

## 🧪 Test

1. Visit your production site
2. Fill contact form
3. Click "Send Message"
4. Check email: **ayushpatel1832001@gmail.com**

**Expected:** Email arrives within 30 seconds ✅

---

## 🔍 Still Not Working?

**Check Vercel Runtime Logs:**
- Deployments → Functions
- Look for `[EmailJS]` logs

**Check Browser Console:**
- F12 → Console tab
- Look for `[EmailJS]` logs

**Common Issues:**
- Template variables not saved (Step 1)
- Environment variables not added (Step 2)
- Forgot to redeploy (Step 3)
- "Production" checkbox not checked (Step 2)
- Build cache not cleared (Step 3)

---

## 📋 Quick Checklist

- [ ] EmailJS template uses `{{user_name}}`, `{{user_email}}`, `{{message}}`
- [ ] Tested template with "Test It" button
- [ ] All 3 environment variables added to Vercel
- [ ] "Production" checkbox checked for all 3 variables
- [ ] Redeployed WITHOUT build cache
- [ ] Production form tested
- [ ] Email received ✅

---

**Files Changed:**
- ✅ `web/components/Contact.tsx` (enhanced error handling & logging)

**Manual Steps Required:**
1. Fix EmailJS template (dashboard)
2. Add Vercel environment variables (dashboard)
3. Redeploy Vercel (dashboard)

**Time Required:** ~5 minutes
**Risk:** Low (only improvements, no breaking changes)
