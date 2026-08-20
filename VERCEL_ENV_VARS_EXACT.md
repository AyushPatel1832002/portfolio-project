# Vercel Environment Variables - Exact Configuration

## Copy-Paste These Exact Values

### Variable 1
```
Name (Key):
NEXT_PUBLIC_EMAILJS_SERVICE_ID

Value:
service_6aynn5v

Environments:
☑ Production
☑ Preview
☑ Development
```

---

### Variable 2
```
Name (Key):
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

Value:
template_eijm65q

Environments:
☑ Production
☑ Preview
☑ Development
```

---

### Variable 3
```
Name (Key):
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

Value:
ClG_rzyjZRDZ9su6K

Environments:
☑ Production
☑ Preview
☑ Development
```

---

## ⚠️ Important Notes

1. **Variable names are case-sensitive** - copy exactly as shown
2. **No quotes** around values in Vercel dashboard
3. **No spaces** before or after values
4. **Check all 3 environment checkboxes** for each variable
5. **Must redeploy** after adding variables (without cache)

---

## Screenshot Guide

When adding each variable in Vercel:

```
┌─────────────────────────────────────────────┐
│ Add New Environment Variable               │
├─────────────────────────────────────────────┤
│ Name: NEXT_PUBLIC_EMAILJS_SERVICE_ID       │
│                                             │
│ Value: service_6aynn5v                     │
│                                             │
│ Environments:                               │
│ ☑ Production                                │
│ ☑ Preview                                   │
│ ☑ Development                               │
│                                             │
│             [Cancel]  [Save]                │
└─────────────────────────────────────────────┘
```

---

## Verification

After adding all 3 variables, you should see:

```
Environment Variables (3)

NEXT_PUBLIC_EMAILJS_SERVICE_ID
  Production, Preview, Development
  service_6aynn5v

NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  Production, Preview, Development
  template_eijm65q

NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  Production, Preview, Development
  ClG_rzyjZRDZ9su6K
```

---

## After Adding Variables

1. Go to **Deployments** tab
2. Find latest deployment
3. Click **"..."** (three dots)
4. Click **"Redeploy"**
5. **UNCHECK** "Use existing Build Cache"
6. Click **"Redeploy"**
7. Wait for deployment to complete (~2-3 min)

---

## Testing

After redeployment completes:

1. Visit production URL
2. Open DevTools (F12) → Console
3. Go to Contact section
4. Fill form and submit
5. Check console for: `[EmailJS] Email sent successfully`
6. Check inbox: ayushpatel1832001@gmail.com

✅ Email should arrive within 30 seconds
