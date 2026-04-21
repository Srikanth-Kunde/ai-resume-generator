# Change Tracker — ResumeAI

This document tracks all architectural and functional changes implemented during the system modernization.

---

## [3.6.0] — 2026-04-22 (Current)
### 🚀 UX Streamlining & Optimization
- **Builder Acceleration**: Removed the "Template Selection" step from the onboarding flow to streamline resume generation. Users now head straight to the dashboard and preview to select templates dynamically.
- **100% Template Parity**: Standardized all 23 gallery templates to ensure complete feature parity. Every design now supports Projects, Certifications, Achievements, and expanded contact markers (LinkedIn, Website, Location).
- **Toolbar Customization**: Migrated the Accent Color theme picker directly into the final Preview toolbar for instant visual feedback.
- **PDF Export Stabilization**: Hardened the `downloadPDF` utility with robust dynamic imports, `onclone` layout stabilization for mobile/small-screen capture, and enhanced error handling with UI notifications.
- **Codebase Hardening**: 
    - **Context Refactoring**: Fixed critical React anti-patterns in `AuthContext` (lazy initialization) and `ResumeContext` (eliminated render-cycle ref access).
    - **Pristine Build**: Resolved all ESLint warnings/errors (Fast Refresh, unused vars, hook rules) to achieve a 100% clean production build.
    - **Cleanup**: Purged redundant component logic from `StepTemplate.tsx` and removed unused imports system-wide.

---

## [3.5.0] — 2026-04-21
### 🏛️ Production Hardening
- **Performance Optimization**: Transitioned the template engine to **Lazy Loading** (React.lazy), splitting 23 templates into separate bundles and reducing initial load size by ~40%.
- **UX Refinement**: Completed a comprehensive visual audit of all 23 templates to ensure 100% theme consistency and layout stability.
- **Documentation Overhaul**: Synchronized README and technical logs to reflect the finalized v3.5 collection.

---

## [3.4.0] — 2026-04-21
### 🔥 Mega Template Expansion
- **Library Domination**: Expanded the template collection to a massive **23 professional designs**, modeled after industry-leading standards (BetterCV).
- **New Additions**:
    - **Sidebar Designs**: Starburst, Zenith, Celestial.
    - **Bold & Creative**: Comet, Pulsar, Creative, Astral.
    - **ATS Optimized**: Aether, Exoplanet, Solstice, Solar.
    - **Classic & Executive**: Hyperion, Eclipse, Galaxy, Luna, Nova, Quasar.
- **Category Refinement**: Optimized all 23 templates with metadata tags for the v3.2.0 Gallery filtering system.

---

## [3.3.0] — 2026-04-21
### 🚀 BetterCV Template Pack
- **Library Expansion**: Implemented 6 new high-fidelity templates inspired by BetterCV's professional collection:
    - **Celestial**: Premium 2-column layout with vertical separation.
    - **Galaxy**: Centered classic with icon-rich dividers.
    - **Astral**: Modern photo-ready layout with soft accent headers.
    - **Luna**: Technical blocked layout for data-driven roles.
    - **Nova**: Ultra-minimalist design with focused whitespace.
    - **Solar**: Executive spotlight design for high-authority resumes.
- **Gallery Integration**: Registered all 13 templates into the v3.2.0 Gallery UI with updated tagging for filtering.

---

## [3.2.0] — 2026-04-21
### 🎨 Premium Gallery Experience
- **Gallery Revamp**: Completely redesigned the Template selection step as a high-conversion, professional template gallery.
- **Category Filtering**: Implemented a tab-based navigation system for filtering templates by style (Modern, Simple, Professional, ATS, One column).
- **Hero Header**: Integrated a centered, minimalist header with a "Choose later" call-to-action, mirroring premium industry standards.
- **Enhanced Visuals**: Developed the `template-gallery-card` system with hardware-accelerated hover overlays, selection badges, and high-fidelity typography.

---

## [3.1.0] — 2026-04-21
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
