# Vinh_Personal

> Personal Portfolio & Digital Studio Platform built for **VinhWorks**.

[![Live Website](https://img.shields.io/badge/Website-vinhwork.io.vn-black?style=flat-square)](https://vinhwork.io.vn)
[![GitHub](https://img.shields.io/badge/GitHub-Vinh021203-black?style=flat-square\&logo=github)](https://github.com/Vinh021203)

---

## 📖 About

**Vinh_Personal** is a modern personal portfolio and digital studio website developed for **VinhWorks**.

The project is designed to be more than a traditional portfolio. It provides a platform for:

* Showcasing personal projects
* Introducing professional services
* Presenting technical skills
* Receiving project inquiries
* Managing website content
* Managing leads and contact information
* Building a professional digital presence

The project focuses on three core principles:

* **Clean Code** — Maintainable and scalable architecture
* **Modern UI/UX** — Clean interface with smooth interactions
* **Performance** — Fast, responsive and SEO-friendly experience

🌐 **Live Website:** [vinhwork.io.vn](https://vinhwork.io.vn)

---

## ✨ Features

### Portfolio

* Personal profile
* Project showcase
* Project details
* Technology stack
* Responsive project presentation
* External project links

### Services

VinhWorks provides digital development services including:

* Web Development
* UI/UX Design
* Landing Page Development
* Web Application Development
* Business Website Development
* SEO & Performance Optimization

### CMS

The project includes a CMS-oriented architecture for managing website content.

Depending on the enabled modules, the system can manage:

* Projects
* Services
* Testimonials
* Leads
* Website content
* Media assets

### Contact & Lead Management

Visitors can submit project inquiries through contact and pricing forms.

The system can:

1. Receive the submitted information
2. Validate the request
3. Store lead information
4. Send notification emails
5. Allow the administrator to manage incoming leads

### UI & Experience

The website focuses on a modern and interactive experience with:

* Responsive layouts
* Smooth animations
* Page transitions
* Interactive components
* Loading states
* Toast notifications
* Mobile-friendly design

---

# 🛠️ Tech Stack

## Frontend

| Technology      | Purpose                      |
| --------------- | ---------------------------- |
| Next.js         | React framework              |
| React           | UI development               |
| TypeScript      | Type-safe development        |
| Tailwind CSS    | Styling                      |
| Framer Motion   | Animations                   |
| Lucide React    | Icons                        |
| React Icons     | Icon library                 |
| React Hot Toast | Notifications                |
| Zustand         | Client-side state management |

## Backend & Database

| Technology         | Purpose          |
| ------------------ | ---------------- |
| MongoDB            | Database         |
| Mongoose           | MongoDB ODM      |
| Next.js API Routes | Backend API      |
| JWT / Jose         | Authentication   |
| Resend             | Email delivery   |
| Cloudinary         | Media management |

## Deployment

The project can be deployed to modern Node.js hosting platforms such as:

* Vercel
* VPS
* Cloud platforms
* Self-hosted environments

---

# 📁 Project Structure

```text
Vinh_Personal/
│
├── app/
│   ├── api/
│   ├── admin/
│   ├── projects/
│   ├── services/
│   └── ...
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── sections/
│   └── ...
│
├── contexts/
│   └── ...
│
├── hooks/
│   └── ...
│
├── libs/
│   └── ...
│
├── models/
│   └── ...
│
├── public/
│   ├── images/
│   ├── icons/
│   └── ...
│
├── styles/
│   └── ...
│
├── utils/
│   └── ...
│
├── middleware.ts
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

> Project structure may evolve as the application continues to be developed.

---

# ⚙️ Getting Started

## Prerequisites

Before running the project, make sure you have installed:

* Node.js 18+
* npm
* MongoDB
* Git

---

## 1. Clone Repository

```bash
git clone https://github.com/Vinh021203/Vinh_Personal.git

cd Vinh_Personal
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Environment Variables

Create a `.env.local` file in the project root:

```bash
.env.local
```

Example configuration:

```env
# ==================================
# Database
# ==================================

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database


# ==================================
# Authentication
# ==================================

JWT_SECRET=your_secure_jwt_secret


# ==================================
# Resend
# ==================================

RESEND_API_KEY=your_resend_api_key

RESEND_FROM_EMAIL="VinhWorks <no-reply@your-domain.com>"

RESEND_TO_EMAIL=your-email@example.com


# ==================================
# Cloudinary
# ==================================

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> Never commit `.env.local` or any secret credentials to GitHub.

---

# 📧 Email System

The contact and pricing forms use **Resend** for email delivery.

The general flow is:

```text
Visitor
   │
   ▼
Contact / Pricing Form
   │
   ▼
Next.js API
   │
   ├───────────────┐
   │               │
   ▼               ▼
MongoDB          Resend
   │               │
   │               ▼
   │          Admin Inbox
   │
   ▼
Lead Management
```

Required environment variables:

```env
RESEND_API_KEY=your_resend_api_key

RESEND_FROM_EMAIL="VinhWorks <no-reply@your-domain.com>"

RESEND_TO_EMAIL=your-email@example.com
```

For development/testing:

```env
RESEND_FROM_EMAIL="VinhWorks <onboarding@resend.dev>"
```

---

# 💻 Development

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The application will automatically reload when you modify the source code.

---

# 🏗️ Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

# 📜 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Create production build  |
| `npm run start` | Start production server  |

---

# 🎨 Design Philosophy

VinhWorks follows a modern, minimal and product-focused design approach.

## Clean

Clear typography, spacing and visual hierarchy make the interface easy to understand.

## Modern

The design uses modern UI patterns, subtle animations and interactive elements without unnecessary visual effects.

## Fast

Performance is considered throughout development, including rendering, image handling and asset optimization.

## Scalable

The architecture is designed to make it easier to add:

* New pages
* New services
* New projects
* CMS features
* Authentication features
* Additional APIs

## Conversion-focused

The website is built not only to showcase work, but also to generate meaningful project inquiries.

Key conversion elements include:

* Clear service descriptions
* Project showcases
* Call-to-action sections
* Contact forms
* Pricing/project inquiry forms

---

# 💼 Services

## Web Development

Development of modern and scalable websites using technologies such as:

* React
* Next.js
* TypeScript
* Tailwind CSS
* REST APIs
* MongoDB
* CMS integrations

## UI/UX Design

Design focused on:

* User experience
* Visual hierarchy
* Responsive layouts
* Wireframes
* Prototypes
* Conversion

## SEO & Performance

Optimization including:

* Technical SEO
* On-page SEO
* Performance optimization
* Search visibility
* Core Web Vitals
* Content structure

## Web Applications

Development of custom web applications with:

* Authentication
* APIs
* Database integration
* CMS
* Admin dashboards
* Business logic

---

# 🔄 Development Workflow

```text
┌───────────────────────────┐
│  01. Consulting & Research │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│      02. UI/UX Design     │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ 03. Development & Testing │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│    04. Deployment         │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│   05. Support & Maintenance│
└───────────────────────────┘
```

### 01 — Consulting & Research

* Requirement analysis
* Competitor research
* Sitemap planning
* User flow
* Technical planning

### 02 — UI/UX Design

* Wireframes
* UI design
* Responsive layouts
* Prototypes
* Feedback and iteration

### 03 — Development & Testing

* Frontend development
* Backend development
* API integration
* Database integration
* CMS development
* Testing
* Performance optimization

### 04 — Deployment

* Hosting configuration
* Domain configuration
* Production deployment
* Environment variables
* Database connection

### 05 — Support & Maintenance

* Bug fixes
* Performance improvements
* Content updates
* Technical support
* Feature improvements

---

# 🔐 Security

The project follows several security practices:

* Environment-based secret management
* JWT-based authentication
* Password hashing
* API validation
* Protected administrative functionality
* Server-side processing for sensitive operations

Never expose the following values publicly:

```text
MONGODB_URI
JWT_SECRET
RESEND_API_KEY
CLOUDINARY_API_SECRET
```

Never place sensitive credentials inside:

```text
app/
components/
public/
```

---

# 🚀 Deployment

## Vercel

The project is compatible with Vercel.

Basic deployment process:

```bash
npm install

npm run build
```

Then configure the required environment variables in your deployment platform.

Recommended configuration:

```text
Framework: Next.js
Build Command: npm run build
Start Command: npm run start
Node.js: LTS
```

---

# 🌍 Production

## VinhWorks

VinhWorks is a digital studio focused on building modern digital experiences and web products.

### Website

https://vinhwork.io.vn

### GitHub

https://github.com/Vinh021203/Vinh_Personal

---

# 📊 Technology Overview

```text
Frontend
├── Next.js
├── React
├── TypeScript
├── Tailwind CSS
├── Framer Motion
├── Zustand
└── React Hot Toast

Backend
├── Next.js API
├── MongoDB
├── Mongoose
├── JWT
└── Jose

Services
├── Cloudinary
└── Resend

Development
├── Git
├── GitHub
└── npm

Deployment
└── Vercel
```

---

# 🧑‍💻 Author

## VinhWorks

**Creative Developer / Digital Studio**

### Specializations

* Web Development
* Next.js
* React
* TypeScript
* UI/UX
* SEO
* Performance Optimization
* Digital Product Development

### Location

Vietnam

### Website

[vinhwork.io.vn](https://vinhwork.io.vn)

---

# 📞 Contact

For project inquiries, collaboration or business opportunities:

**Website**

https://vinhwork.io.vn

**Email**

[contact@vinhwork.io.vn](mailto:contact@vinhwork.io.vn)

**Phone**

0971 386 588

---

# 🤝 Contributing

This repository primarily contains the source code for the VinhWorks personal portfolio and digital studio platform.

If you find a bug or have an improvement suggestion:

1. Open an issue
2. Fork the repository
3. Create a new branch
4. Make your changes
5. Test the application
6. Create a pull request

Example:

```bash
git checkout -b feature/improve-project-section

npm install

npm run dev

npm run build

git add .

git commit -m "feat: improve project section"

git push origin feature/improve-project-section
```

---

# 📝 Commit Convention

The project follows a conventional commit style.

```text
feat:     New feature
fix:      Bug fix
refactor: Code refactoring
style:    UI/style changes
docs:     Documentation
chore:    Maintenance
perf:     Performance improvement
test:     Tests
```

Examples:

```bash
git commit -m "feat: add project management"

git commit -m "fix: resolve contact form validation"

git commit -m "perf: optimize project images"

git commit -m "docs: update README"
```

---

# 📄 License

This project is a personal portfolio and digital studio application developed by **VinhWorks**.

Unless explicitly stated otherwise, the source code, visual design, branding, content, images and other project assets belong to the project owner.

Please do not copy, redistribute or commercially reuse the branding, content or design without permission.

---

# ❤️ Acknowledgements

Built with modern open-source technologies and tools including:

* Next.js
* React
* TypeScript
* Tailwind CSS
* MongoDB
* Mongoose
* Framer Motion
* Zustand
* Cloudinary
* Resend

---

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

**Vinh_Personal — VinhWorks**

[GitHub Repository](https://github.com/Vinh021203/Vinh_Personal)

[Live Website](https://vinhwork.io.vn)
