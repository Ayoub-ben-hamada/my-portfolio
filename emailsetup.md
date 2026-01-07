# Email Setup Guide for Portfolio Contact Form

## Overview
Your contact form is now configured to send emails to **mohamed.ayoub.bh@gmail.com** using EmailJS service.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account (allows 200 emails/month)
3. Verify your email address

### 2. Add Email Service
1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Select **Gmail** (recommended) or any other email provider
4. Click **Connect Account** and authorize with your Gmail (mohamed.ayoub.bh@gmail.com)
5. Give your service a name (e.g., "Portfolio Contact")
6. Click **Create Service**
7. **Copy the Service ID** (you'll need this later)


### 3. Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template content:

**Template Name:** Contact Form Submission

**Subject:** New Contact Form Message: {{subject}}

**Template Content:**
```
Hello Mohamed Ayoub,

You have received a new message from your portfolio contact form.

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Click **Save**
5. **Copy the Template ID** (you'll need this later)

### 4. Get Your Public Key
1. Go to **Account** (top right menu)
2. Click **General**
3. Find **Public Key** section
4. **Copy your Public Key**

### 5. Update Configuration File
1. Open `assets/js/email-handler.js`
2. Replace these three values with your actual keys:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'ceDrF1bLeMnnvigiX',    // Replace with your Public Key
    serviceId: 'service_anyi16m',     // Replace with your Service ID
    templateId: 'template_rash7x1'    // Replace with your Template ID
};
```

### 6. Test the Form
1. Open your portfolio website
2. Navigate to the Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. You should receive an email at mohamed.ayoub.bh@gmail.com

## Troubleshooting

### Form not sending?
- Check browser console (F12) for errors
- Verify all three keys are correctly copied
- Ensure your EmailJS account is verified

### Not receiving emails?
- Check spam/junk folder
- Verify the email template is saved correctly
- Ensure the Gmail service is connected properly

### Rate limiting?
- Free plan allows 200 emails/month
- Upgrade to paid plan if needed ($9/month for 1000 emails)

## Features Implemented

✅ Email sent to: mohamed.ayoub.bh@gmail.com
✅ Loading indicator while sending
✅ Success message on successful send
✅ Error message if sending fails
✅ Form auto-reset after successful send
✅ Submit button disabled during sending
✅ Automatic message hiding after 5 seconds

## Alternative Options

If you prefer not to use EmailJS, here are alternatives:

1. **Netlify Forms** (if hosting on Netlify)
   - Add `netlify` attribute back to form
   - Free tier: 100 submissions/month

2. **Formspree** (https://formspree.io/)
   - Free tier: 50 submissions/month
   - Just add action URL to form

3. **Custom Backend** (Node.js + Nodemailer)
   - Full control but requires hosting
   - Can use services like Heroku, Railway, or Vercel

## Security Notes

- EmailJS keys are safe to expose in frontend code
- They only allow sending emails, not reading or accessing your account
- Rate limiting prevents abuse
- Consider adding reCAPTCHA for additional spam protection

## Support

If you need help:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Check browser console for detailed error messages

---

**Last Updated:** January 7, 2026
