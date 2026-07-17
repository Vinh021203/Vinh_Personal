# Vinh_Personal

Personal portfolio/CMS website built with Next.js, Tailwind CSS, MongoDB, Resend mail, and modern animations. Developed by VinhWorks.

## Email delivery

Contact and pricing lead forms are saved to CMS Leads, then sent through Resend from the backend.

Required environment variables:

```env
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL="VinhWorks <no-reply@your-domain.com>"
RESEND_TO_EMAIL=your-inbox@example.com
```

For quick testing, Resend also supports:

```env
RESEND_FROM_EMAIL="VinhWorks <onboarding@resend.dev>"
```
