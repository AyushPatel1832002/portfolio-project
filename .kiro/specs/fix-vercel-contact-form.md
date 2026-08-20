# Fix Contact Form Email on Vercel Production

## Overview
Contact form works locally but emails don't arrive when deployed to Vercel. Need to diagnose and fix the production deployment issue.

## Requirements

### Must Have
- [ ] Contact form sends emails successfully on Vercel production
- [ ] Email notifications arrive at configured inbox
- [ ] Proper error handling with user-friendly messages
- [ ] Environment variables correctly configured in Vercel
- [ ] EmailJS template variables match form field names exactly
- [ ] Logging for production debugging via Vercel Runtime Logs
- [ ] No hardcoded development values in production
- [ ] Form validation works correctly
- [ ] Submit button states (idle/sending/sent/error)
- [ ] No exposure of sensitive credentials

### Should Have
- [ ] Rate limiting to prevent spam
- [ ] Clear documentation for environment variable setup
- [ ] Duplicate submission prevention
- [ ] Comprehensive error messages in console logs

### Won't Have
- UI/UX redesign (keep existing design)
- Changes to other portfolio sections
- Migration away from EmailJS unless absolutely necessary

## Design

### Root Cause Analysis
Based on context:
1. **EmailJS template variable mismatch**: Template uses `{{from_name}}` and `{{reply_to}}` but form sends `user_name` and `user_email`
2. **Missing Vercel environment variables**: EmailJS credentials not added to Vercel production environment
3. **Possible cache issue**: Vercel build cache might need clearing

### Current Implementation Status
- ✅ EmailJS package installed: `@emailjs/browser@4.4.1`
- ✅ Contact.tsx uses correct field names: `user_name`, `user_email`, `message`
- ✅ Environment variables in `.env.local`:
  - `NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_6aynn5v"`
  - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="template_eijm65q"`
  - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="ClG_rzyjZRDZ9su6K"`
- ❌ EmailJS template not updated to match form variables
- ❌ Vercel environment variables not configured

### Solution Architecture

#### Phase 1: Fix EmailJS Template (User Action Required)
User must manually update EmailJS template at https://dashboard.emailjs.com/admin/templates

**Template Changes Needed:**
```
Subject: New message from {{user_name}}

Content:
Name: {{user_name}}
Email: {{user_email}}

Message:
{{message}}

Reply To: {{user_email}}
```

**Current Wrong Variables:**
- ❌ `{{from_name}}` → ✅ `{{user_name}}`
- ❌ `{{reply_to}}` → ✅ `{{user_email}}`

#### Phase 2: Enhanced Error Logging
Add comprehensive logging to Contact.tsx:
- Log environment variables availability (without exposing values)
- Log EmailJS errors with full error object
- Add request/response timing logs
- Validate environment variables before form submission

#### Phase 3: Vercel Environment Variables Setup
Add to Vercel Dashboard → Settings → Environment Variables:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_6aynn5v` | Production, Preview, Development |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `template_eijm65q` | Production, Preview, Development |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `ClG_rzyjZRDZ9su6K` | Production, Preview, Development |

#### Phase 4: Improved Error Handling
- Check environment variables exist before form submission
- Show specific error messages for missing config
- Catch and log EmailJS errors properly
- Provide user-friendly fallback messages

### Technical Specifications

**File Changes Required:**
1. `web/components/Contact.tsx`
   - Add environment variable validation
   - Enhanced error logging
   - Better error messages
   - Configuration validation before submission

2. Documentation updates:
   - Update `EMAILJS_SETUP_GUIDE.md` with template variable instructions
   - Create Vercel deployment checklist

**No Backend Changes Needed:**
- EmailJS works client-side (no API routes required)
- No server-side code changes
- No database changes

### Error Handling Strategy

**Client-Side Validation:**
```typescript
// Before form submission
if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID) {
  console.error('EmailJS Service ID missing')
  return 'Configuration error'
}
```

**Enhanced Logging:**
```typescript
try {
  console.log('[EmailJS] Sending email...', {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    hasPublicKey: !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  })
  
  await emailjs.sendForm(...)
  
  console.log('[EmailJS] Email sent successfully')
} catch (error) {
  console.error('[EmailJS] Failed to send email:', {
    error,
    message: error.message,
    status: error.status,
    text: error.text,
  })
}
```

**User-Facing Messages:**
- Missing config: "Email service not configured. Please contact site administrator."
- Network error: "Network error. Please check your connection and try again."
- Server error: "Server error. Your message couldn't be sent. Please try again later."
- Success: Existing success message from Sanity CMS

## Implementation Tasks

### Task 1: Update EmailJS Template Variables
**Type:** Manual (User Action)
**Files:** None (EmailJS Dashboard)
**Description:** Update EmailJS template to use correct variable names

**Steps:**
1. Go to https://dashboard.emailjs.com/admin/templates
2. Find template `template_eijm65q` ("Contact Us")
3. Click "Edit Content"
4. Update Subject: `New message from {{user_name}}`
5. Update Content to use `{{user_name}}`, `{{user_email}}`, `{{message}}`
6. Update Reply To: `{{user_email}}`
7. Save template
8. Test using "Test It" button

**Verification:**
- Template preview shows correct variables
- Test email received successfully
- Variables populate correctly

---

### Task 2: Add Environment Variable Validation and Enhanced Logging
**Type:** Code Change
**Files:** `web/components/Contact.tsx`
**Description:** Add validation, logging, and better error handling

**Changes:**
1. Validate environment variables exist before submission
2. Add comprehensive console logging
3. Improve error messages
4. Add configuration check on component mount

**Verification:**
- Console shows clear logs
- Missing config shows proper error
- EmailJS errors logged with full details

---

### Task 3: Configure Vercel Environment Variables
**Type:** Manual (User Action)
**Files:** None (Vercel Dashboard)
**Description:** Add EmailJS credentials to Vercel

**Steps:**
1. Go to Vercel Dashboard
2. Select project
3. Settings → Environment Variables
4. Add 3 variables (see Phase 3 table above)
5. Select all environments (Production, Preview, Development)
6. Save

**Verification:**
- All 3 variables present
- Applied to Production environment
- Variable names exactly match code

---

### Task 4: Redeploy to Vercel (Clear Cache)
**Type:** Manual (User Action)
**Files:** None (Vercel Dashboard)
**Description:** Trigger new deployment with environment variables

**Steps:**
1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. **Uncheck** "Use existing Build Cache"
5. Click "Redeploy"

**Verification:**
- Build succeeds
- Deployment goes live
- Environment variables available in runtime

---

### Task 5: Test Production Contact Form
**Type:** Manual Testing
**Files:** None
**Description:** Verify contact form works on production

**Test Cases:**
1. Visit production site
2. Fill contact form (name, email, message)
3. Click "Send Message"
4. Verify: Button shows "Sending..."
5. Verify: Success message appears
6. Verify: Email received in inbox
7. Check Vercel Runtime Logs for any errors

**Verification:**
- Form submits successfully
- Email arrives within 1 minute
- Success message shown to user
- No errors in Vercel logs

---

### Task 6: Update Documentation
**Type:** Documentation
**Files:** `EMAILJS_SETUP_GUIDE.md`
**Description:** Add template variable mismatch troubleshooting

**Changes:**
1. Add section on template variable matching
2. Add Vercel deployment checklist
3. Add troubleshooting for production issues

**Verification:**
- Documentation clear and accurate
- Covers common pitfalls
- Includes template variable examples

## Acceptance Criteria

### Functional Requirements
- [ ] Contact form submits successfully on Vercel production
- [ ] Email notifications arrive at `ayushpatel1832001@gmail.com`
- [ ] Form shows "Sending..." state during submission
- [ ] Success message displays after successful send
- [ ] Error messages display when submission fails
- [ ] Submit button disabled during submission

### Technical Requirements
- [ ] Environment variables configured in Vercel (Production, Preview, Development)
- [ ] EmailJS template uses correct variables: `user_name`, `user_email`, `message`
- [ ] Console logs available for debugging in Vercel Runtime Logs
- [ ] No sensitive credentials exposed in client code
- [ ] No hardcoded development URLs in production build
- [ ] Build succeeds without errors

### User Experience
- [ ] Form UI remains unchanged (existing design)
- [ ] Clear feedback during form submission
- [ ] Helpful error messages (no technical jargon)
- [ ] Form resets after successful submission
- [ ] No duplicate submissions possible

### Testing
- [ ] Local development works (`npm run dev`)
- [ ] Vercel preview deployment works
- [ ] Vercel production deployment works
- [ ] Email received with correct formatting
- [ ] Error scenarios handled gracefully

## Notes

### Critical Issues Identified
1. **EmailJS Template Mismatch**: Template uses `from_name`/`reply_to`, form sends `user_name`/`user_email`
2. **Missing Vercel Environment Variables**: EmailJS credentials not in Vercel
3. **Insufficient Error Logging**: Hard to debug production issues

### Common Pitfalls to Avoid
- Don't change `user_name`, `user_email`, `message` field names in form
- Don't forget to redeploy after adding environment variables
- Don't skip clearing Vercel build cache
- Don't add environment variables only to Development environment
- Don't expose private EmailJS keys (use Public Key only)

### Debugging Checklist
If still not working after implementation:
1. Check Vercel Runtime Logs: Deployments → Functions
2. Check browser console for client-side errors
3. Verify environment variables in Vercel UI
4. Test EmailJS template with "Test It" button
5. Verify Service ID is `service_6aynn5v` (not `service_$aynn5v`)
6. Check EmailJS dashboard for usage limits (100/month free)
7. Check spam folder for emails

### Dependencies
- `@emailjs/browser@4.4.1` (already installed)
- No new packages required

### Rollback Plan
If EmailJS continues to fail:
1. Switch to Next.js API route with Resend/SendGrid
2. Keep form UI identical
3. Move email logic server-side

### Success Metrics
- 100% email delivery on production
- Zero errors in Vercel logs
- User receives confirmation within 30 seconds
- Clear error messages for any failures
