# ResumeAI — Premium AI Resume Builder

**ResumeAI** is a production-ready, intelligent resume building platform designed to transform plain-text career data into high-impact, ATS-optimized professional documents. Built with security, performance, and accessibility as core priorities.

---

## ✨ Key Features

### 🧠 Intelligence Layer
- **ATS Analytics**: Real-time scoring (0-100) based on industry-standard parsing rules.
- **Keyword Optimizer**: Match your resume against any job description to identify missing technical keywords.
- **Local NLP Engine**: AI-powered text transformation for bullet points, professional summaries, and cover letters—**zero API dependency** ensures maximum privacy and zero latency.
- **Context-Aware Suggestions**: Real-time skill suggestions based on your target job title.

### 🛡️ Security & Roles
- **Access Code Authentication**: Secure, hashed (SHA-256) entry Gate. No direct URL access.
- **RBAC (Role Based Access Control)**:
    - **User**: Build, preview, and export resumes.
    - **Admin**: Full access + dedicated dashboard to update access codes for both roles.

### Core Features
- **23 Premium Templates**: Professionally designed layouts including ATS-optimized, Executive, Creative, and Modern styles (inspired by BetterCV).
- **Gallary-Style Selection**: A dedicated template gallery with category filtering (Simple, Professional, ATS, etc.).
- **Smooth Real-time Editing**: Minimalist, high-performance editor with instant visual feedback.
- **AI Content Engine**: Specialized logic for generating high-impact summaries and bullet points.
- **Code-Splitted Performance**: Optimized component loading for lightning-fast initial dashboards.
- **Security Hardened**: Advanced role-based access with double-hashed default credentials.table JSON export/import.

---

## 🛠️ Technology Stack

- **Frontend**: React 19 (Strict Mode), TypeScript
- **Styling**: Tailwind CSS v4, Vanilla CSS (Design Tokens)
- **State Management**: Context API (Auth, Theme, Resume)
- **Animations**: Framer Motion
- **Utilities**: Lucide Icons, html2canvas, jsPDF
- **Build Tool**: Vite 6.x

---

## 🚀 Getting Started

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Default Access Codes
- **User Access**: `user@2026`
- **Admin Access**: `skadmin@2024`

> [!NOTE]
> Access codes are hashed using SHA-256 before storage. Admins can update these codes via the Settings panel in the main dashboard.

---

## 📦 Deployment

The application is a standalone SPA. To deploy:
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` folder to any static hosting provider (Netlify, Vercel, GitHub Pages, etc.).

---

## 📝 License
Proprietary — Created for professional career development.

Created by **Antigravity**.
