# Change Tracker — ResumeAI

This document tracks all architectural and functional changes implemented during the system modernization.

---

## [3.1.0] — 2026-04-21 (Current)
### 🍱 Template Expansion
- **Creative Template**: Added a bold, asymmetric design with an accent sidebar for high visual impact.
- **Professional Template**: Introduced a sophisticated, serif-based authoritative layout for executive roles.
- **Compact Template**: Developed a high-density, single-column design optimized for extensive career histories (1-page efficiency).
- **Registry Update**: Integrated all new templates into the builder selection and preview router.

### ⚡ UI & Performance
- **Flicker Fix**: Eliminated UI flickering in the Template selection step by migrating from layout projection to hardware-accelerated animations.
- **Lint Sanitization**: Performed a full sweep of the codebase to remove unused imports and redundant Lucide icon declarations.

### 🔐 Security Updates
- **Credential Refresh**: Updated default administrative and user access codes to enhanced values (`skadmin@2024` and `user@2026`).

---

## [3.0.0] — 2026-04-21
### 🏗️ Architectural Overhaul
- **Monolith to Modular**: Transitioned from a single 1,600+ line `App.tsx` prototype to a highly structured directory system.
- **Provider Pattern**: Implemented `AuthContext`, `ThemeContext`, and `ResumeContext` for robust state management.
- **TypeScript Core**: Established 100% type-safety with a dedicated `types/index.ts` definition layer.

### 🔐 Security & Auth
- **Gatekeeper Implementation**: Created an access-code-based authentication screen with glassmorphism styling.
- **SHA-256 Hashing**: All authentication now uses client-side hashing via SubtleCrypto—passwords are never stored or compared in plain text.
- **RBAC**: Implemented Role-Based Access Control distinguishing between standard Users and Admins.
- **Admin Utilities**: Added a secure dashboard for role-based password management.

### 🧠 Local AI & ATS
- **ATS Analyzer Utility**: Developed a proprietary scoring engine that audits resumes for formatting, content density, and section completeness.
- **Keyword Matcher**: Built a parser that identifies gaps between the resume and job descriptions.
- **Smart AI Engine**: Created local NLP transformers for bullet point optimization, tone adjustment, and cover letter generation.

### 🎨 UI/UX & Design System
- **Tailwind v4 Integration**: Completely rewrote the CSS layer using Tailwind v4 theme variables and design tokens.
- **Fluid Animations**: Integrated **Framer Motion** for animated step transitions, modal entrances, and real-time score updates.
- **Glassmorphism**: Applied a premium aesthetic with deep backdrop blurs and subtle borders.
- **Theme Engine**: Added a native dark/light mode toggle with persistence and system-preference detection.

### 📄 Multi-Step Builder
- **Step-based Navigation**: 8-step builder workflow with animated progress indicators.
- **Auto-save Logic**: Implemented a 30-second interval local persistence layer.
- **Undo/Redo**: Added a state-tracking stack for error recovery during building.
- **Professional Templates**: Developed 4 distinct layouts (**Modern, Classic, Minimal, Executive**) with theme-aware accent colors.

### 📁 Features: Export / Import
- **PDF Export**: High-fidelity PDF generation using `html2canvas` and `jsPDF`.
- **DOCX Generation**: Automated Word document creation with optimized structure.
- **JSON Portability**: Added full export and import of resume data for local backups.

---

## [Historical Prototype] — Pre-3.0.0
- Baseline monolithic functional prototype.
- No authentication.
- Basic styling and linear form.
- Primitive PDF generation.
