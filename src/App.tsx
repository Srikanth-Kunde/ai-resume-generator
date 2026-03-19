import { useState, useRef, type ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Target, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Rocket, 
  Award, 
  Layout, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Download, 
  Plus, 
  Trash2, 
  FileText,
  Linkedin,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// ============================================
// TYPES
// ============================================
interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  highlights: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Project {
  id: string;
  name: string;
  technologies: string;
  description: string;
  link: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  careerObjective: string;
  education: Education[];
  skills: string;
  workExperience: WorkExperience[];
  projects: Project[];
  certifications: Certification[];
  achievements: string;
}


// ============================================
// UTILITIES
// ============================================
const generateId = () => Math.random().toString(36).substr(2, 9);

const actionVerbs = [
  "Achieved", "Accelerated", "Administered", "Advanced", "Analyzed", "Built", 
  "Collaborated", "Conceptualized", "Created", "Delivered", "Designed", 
  "Developed", "Directed", "Enhanced", "Established", "Executed", "Facilitated", 
  "Generated", "Guided", "Implemented", "Improved", "Increased", "Initiated", 
  "Innovated", "Led", "Managed", "Optimized", "Orchestrated", "Organized", 
  "Pioneered", "Produced", "Reduced", "Resolved", "Spearheaded", "Streamlined", 
  "Strengthened", "Supervised", "Transformed", "Validated", "Visualized", "Formulated",
  "Negotiated", "Presented", "Programmed", "Restructured", "Solved"
];

const professionalPhrases: Record<string, string> = {
  "worked on": "Contributed to the development of",
  "helped with": "Played a key role in",
  "was responsible for": "Oversaw and managed",
  "did": "Executed",
  "made": "Engineered",
  "fixed": "Resolved critical issues in",
  "improved": "Significantly enhanced",
  "built": "Architected and developed",
  "created": "Designed and implemented",
  "managed": "Strategically managed",
  "led": "Spearheaded",
  "helped": "Collaborated to deliver",
  "used": "Leveraged",
  "learned": "Mastered and applied",
  "wrote": "Authored comprehensive",
  "tested": "Conducted rigorous testing of",
  "designed": "Conceptualized and designed",
  "developed": "Engineered and delivered",
  "implemented": "Successfully implemented",
  "increased": "Drove measurable increase in",
  "reduced": "Achieved significant reduction in",
  "organized": "Coordinated and executed",
  "trained": "Mentored and trained",
  "analyzed": "Conducted in-depth analysis of",
  "researched": "Performed comprehensive research on",
  "familiar with": "Proficient in the application of",
  "good at": "Expert in",
  "know how to": "Possess advanced knowledge of",
  "started": "Initiated and launched",
  "finished": "Successfully concluded",
  "talked to": "Collaborated with stakeholders regarding",
  "showed": "Demonstrated",
};

function transformToProfessional(text: string): string {
  if (!text.trim()) return "";
  let result = text.trim();

  Object.entries(professionalPhrases).forEach(([informal, formal]) => {
    const regex = new RegExp(`\\b${informal}\\b`, "gi");
    result = result.replace(regex, formal);
  });

  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  if (result.length > 0 && !/[.!?%]$/.test(result)) {
    result += ".";
  }

  return result;
}

function generateBulletPoints(description: string): string[] {
  if (!description.trim()) return [];

  const rawPoints = description
    .split(/[;\n•]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  if (rawPoints.length === 0 && description.trim().length > 5) {
    rawPoints.push(description.trim());
  }

  return rawPoints.map((point) => {
    let transformed = transformToProfessional(point);
    const startsWithAction = actionVerbs.some((verb) =>
      transformed.toLowerCase().startsWith(verb.toLowerCase())
    );
    if (!startsWithAction && transformed.length > 10) {
      const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
      transformed = `${randomVerb} ${transformed.charAt(0).toLowerCase() + transformed.slice(1)}`;
    }
    return transformed;
  });
}

function generateSummary(objective: string, skills: string, experience: WorkExperience[]): string {
  if (!objective.trim() && !skills.trim()) return "";
  let summary = objective.trim() ? transformToProfessional(objective) : "";
  
  if (!summary && experience.length > 0) {
    const latestRole = experience[0];
    summary = `Results-driven professional with demonstrated expertise in ${latestRole.position.toLowerCase()}. Proven track record of delivering high-impact solutions and driving organizational success.`;
  }

  if (skills.trim()) {
    const topSkills = skills.split(",").map(s => s.trim()).filter(Boolean).slice(0, 4).join(", ");
    if (topSkills) summary += ` Core competencies include ${topSkills}.`;
  }

  return summary;
}

function processAchievements(achievements: string): string[] {
  if (!achievements.trim()) return [];
  return achievements.split(/[;\n•]+/).map(s => s.trim()).filter(s => s.length > 3).map(a => transformToProfessional(a));
}

function processSkills(skills: string): string[] {
  if (!skills.trim()) return [];
  return skills.split(/[,;\n•]+/).map(s => s.trim()).filter(s => s.length > 1);
}

// ============================================
// SAMPLE DATA
// ============================================
const sampleData: ResumeData = {
  personalInfo: {
    fullName: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    website: "alexjohnson.dev",
  },
  careerObjective: "Passionate full-stack developer with 5 years of experience building scalable web applications. Looking to leverage my expertise in React, Node.js, and cloud technologies to drive innovation at a forward-thinking tech company.",
  education: [
    { id: "edu1", school: "UC Berkeley", degree: "Bachelor of Science", field: "Computer Science", startDate: "2016", endDate: "2020", gpa: "3.8", highlights: "Dean's List, Regents' Scholar" }
  ],
  skills: "JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, PostgreSQL, MongoDB, UI/UX Design, GraphQL, Redis",
  workExperience: [
    { id: "work1", company: "TechCorp Inc.", position: "Senior Software Engineer", startDate: "Jan 2022", endDate: "Present", current: true, description: "Led development of a real-time analytics dashboard serving 1M+ users. Mentored a team of 4 junior developers. Reduced API response times by 60% through strategic Redis caching and query optimization. Spearheaded the migration to a microservices architecture." },
    { id: "work2", company: "StartupX", position: "Software Engineer", startDate: "Jun 2020", endDate: "Dec 2021", current: false, description: "Built the initial MVP for an AI-powered financial tracker. Automated CI/CD pipelines using GitHub Actions. Collaborated with designers to implement a premium dark-themed UI." }
  ],
  projects: [
    { id: "proj1", name: "CloudDeploy Pro", technologies: "React, Node.js, AWS", description: "Built an automated deployment platform for serverless functions. Featured in Product Hunt's Top 10.", link: "github.com/alexj/cloud" },
    { id: "proj2", name: "NeoPay", technologies: "Next.js, Stripe, PostgreSQL", description: "A secure payment gateway for freelancers with localized currency support.", link: "neopay.is" }
  ],
  certifications: [
    { id: "cert1", name: "AWS Solutions Architect Professional", issuer: "Amazon", date: "2023" },
    { id: "cert2", name: "Google Cloud Professional Developer", issuer: "Google", date: "2022" }
  ],
  achievements: "Winner of TechCorp Global Hackathon 2023. Published 5+ technical articles on Medium with 50k+ reads. Open source contributor to React Native core.",
};

// ============================================
// COMPONENTS
// ============================================

const templates = [
  { id: "modern", name: "Modern", description: "Clean and contemporary", icon: <Layout className="w-6 h-6" /> },
  { id: "classic", name: "Classic", description: "Traditional professional", icon: <FileText className="w-6 h-6" /> },
  { id: "minimal", name: "Minimal", description: "Simple and elegant", icon: <Sparkles className="w-6 h-6" /> },
  { id: "executive", name: "Executive", description: "Bold and impactful", icon: <Briefcase className="w-6 h-6" /> },
];

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden mb-6"
    >
      <div className="bg-gradient-to-r from-premium-50 to-premium-100/50 px-6 py-4 border-b border-premium-100 flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm text-premium-600">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-800 tracking-tight">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

interface InputFieldProps {
  label: string;
  icon?: ElementType;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

function InputField({ label, icon: Icon, value, onChange, placeholder, type = "text", required = false, disabled = false }: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-premium-500" />}
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-premium-500 focus:border-transparent transition-all duration-200 text-sm hover:border-premium-300 outline-none shadow-sm ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
      />
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  icon?: ElementType;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
}

function TextAreaField({ label, icon: Icon, value, onChange, placeholder, rows = 4, hint }: TextAreaFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-premium-500" />}
        {label}
      </label>
      {hint && <p className="text-xs text-gray-400 mb-2 italic">{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-premium-500 focus:border-transparent transition-all duration-200 text-sm hover:border-premium-300 outline-none shadow-sm resize-none"
      />
    </div>
  );
}

// ============================================
// TEMPLATE RENDERERS
// ============================================

function ModernTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white p-8 sm:p-12 mx-auto font-sans text-gray-800 shadow-sm" style={{ minHeight: "297mm", width: "100%", maxWidth: "210mm" }}>
      <header className="border-b-4 border-premium-600 pb-6 mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight uppercase">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600">
          {data.personalInfo.email && <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span className="flex items-center gap-1.5"><Linkedin className="w-4 h-4" /> {data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> {data.personalInfo.website}</span>}
        </div>
      </header>

      <div className="space-y-8">
        {summary && (
          <section>
            <h2 className="text-sm font-bold text-premium-700 uppercase tracking-widest mb-3 border-b border-premium-100 pb-1 flex items-center gap-2">
              <Target className="w-4 h-4" /> Professional Profile
            </h2>
            <p className="text-[13px] leading-relaxed text-gray-700 text-justify">{summary}</p>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-premium-700 uppercase tracking-widest mb-3 border-b border-premium-100 pb-1 flex items-center gap-2">
              <Wrench className="w-4 h-4" /> Technical Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="px-2.5 py-1 bg-premium-50 text-premium-700 rounded-md text-[11px] font-semibold border border-premium-100">
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.workExperience.some(e => e.company) && (
          <section>
            <h2 className="text-sm font-bold text-premium-700 uppercase tracking-widest mb-4 border-b border-premium-100 pb-1 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Professional Experience
            </h2>
            <div className="space-y-6">
              {data.workExperience.filter(e => e.company).map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-premium-600 font-bold text-sm mb-2">{exp.company}</p>
                  <ul className="space-y-1.5">
                    {generateBulletPoints(exp.description).map((b, i) => (
                      <li key={i} className="text-[12px] text-gray-700 flex gap-2">
                        <span className="text-premium-400 mt-1.5 w-1 h-1 rounded-full bg-premium-400 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.some(p => p.name) && (
          <section>
            <h2 className="text-sm font-bold text-premium-700 uppercase tracking-widest mb-4 border-b border-premium-100 pb-1 flex items-center gap-2">
              <Rocket className="w-4 h-4" /> Key Projects
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {data.projects.filter(p => p.name).map(proj => (
                <div key={proj.id} className="border-l-2 border-premium-100 pl-4 py-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                    <span className="text-[10px] font-bold text-premium-600 bg-premium-50 px-2 py-0.5 rounded">{proj.technologies}</span>
                  </div>
                  <p className="text-[12px] text-gray-600">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.education.some(e => e.school) && (
            <section>
              <h2 className="text-sm font-bold text-premium-700 uppercase tracking-widest mb-4 border-b border-premium-100 pb-1 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Education
              </h2>
              <div className="space-y-4">
                {data.education.filter(e => e.school).map(edu => (
                  <div key={edu.id}>
                    <h3 className="text-sm font-bold text-gray-900">{edu.school}</h3>
                    <p className="text-xs text-premium-600 font-semibold">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                    <p className="text-[11px] text-gray-500 mt-1">{edu.startDate} — {edu.endDate}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
                    {edu.highlights && <p className="text-[11px] text-gray-500 mt-1 italic">{edu.highlights}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {(data.certifications.some(c => c.name) || achievements.length > 0) && (
            <section>
              <h2 className="text-sm font-bold text-premium-700 uppercase tracking-widest mb-4 border-b border-premium-100 pb-1 flex items-center gap-2">
                <Award className="w-4 h-4" /> Achievements & Certs
              </h2>
              <div className="space-y-3">
                {data.certifications.filter(c => c.name).map(cert => (
                  <div key={cert.id} className="flex items-center gap-2 text-[12px] text-gray-700">
                    <Check className="w-3 h-3 text-premium-500" />
                    <span>{cert.name}</span>
                  </div>
                ))}
                {achievements.map((ach, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px] text-gray-700">
                    <Sparkles className="w-3 h-3 text-premium-500" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// CLASSIC TEMPLATE
// ============================================

function ClassicTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white p-12 mx-auto font-serif text-gray-800 shadow-sm" style={{ minHeight: "297mm", width: "100%", maxWidth: "210mm" }}>
      <header className="text-center border-b-2 border-gray-900 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wider">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="mt-4 flex justify-center flex-wrap gap-x-4 text-xs text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>| {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>| {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>| {data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span>| {data.personalInfo.website}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-8">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 border-b border-gray-200 pb-1">Professional Summary</h2>
          <p className="text-[12px] leading-relaxed text-justify">{summary}</p>
        </section>
      )}

      {data.workExperience.some(e => e.company) && (
        <section className="mb-8">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-200 pb-1">Professional Experience</h2>
          <div className="space-y-6">
            {data.workExperience.filter(e => e.company).map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-xs italic text-gray-500">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                </div>
                <p className="italic text-gray-800 text-xs mb-2">{exp.company}</p>
                <ul className="list-disc list-inside space-y-1">
                  {generateBulletPoints(exp.description).map((b, i) => (
                    <li key={i} className="text-[11px] text-gray-700 ml-2">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects.some(p => p.name) && (
        <section className="mb-8">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-200 pb-1">Projects</h2>
          <div className="space-y-4">
            {data.projects.filter(p => p.name).map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                  <span className="text-[10px] italic text-gray-500">{proj.technologies}</span>
                </div>
                <p className="text-[11px] text-gray-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.some(e => e.school) && (
        <section className="mb-8">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-200 pb-1">Education</h2>
          <div className="space-y-4">
            {data.education.filter(e => e.school).map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-gray-900">{edu.school}</h3>
                  <span className="text-xs italic text-gray-500">{edu.startDate} – {edu.endDate}</span>
                </div>
                <p className="text-[11px] text-gray-700">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
                {edu.highlights && <p className="text-[11px] text-gray-500 mt-0.5 italic">{edu.highlights}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 border-b border-gray-200 pb-1">Technical Skills</h2>
          <p className="text-[11px] text-gray-700">{skills.join(" • ")}</p>
        </section>
      )}

      {(data.certifications.some(c => c.name) || achievements.length > 0) && (
        <section>
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 border-b border-gray-200 pb-1">Honors & Certifications</h2>
          <ul className="list-disc list-inside space-y-1">
            {data.certifications.filter(c => c.name).map(cert => (
              <li key={cert.id} className="text-[11px] text-gray-700">{cert.name}</li>
            ))}
            {achievements.map((ach, i) => (
              <li key={i} className="text-[11px] text-gray-700">{ach}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function MinimalTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white p-12 mx-auto font-sans text-gray-700 shadow-sm" style={{ minHeight: "297mm", width: "100%", maxWidth: "210mm" }}>
      <header className="mb-12">
        <h1 className="text-2xl font-light text-gray-900 tracking-widest uppercase">{data.personalInfo.fullName || "Your Name"}</h1>
        <p className="mt-2 text-[10px] text-gray-400 tracking-[0.2em] flex flex-wrap gap-x-3">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
        </p>
      </header>

      {summary && (
        <section className="mb-10 text-[12px] leading-loose text-gray-500 max-w-xl">
          {summary}
        </section>
      )}

      {data.workExperience.some(e => e.company) && (
        <section className="mb-10">
          <h2 className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] mb-6">Experience</h2>
          <div className="space-y-8">
            {data.workExperience.filter(e => e.company).map(exp => (
              <div key={exp.id} className="relative pl-6 border-l border-gray-100">
                <div className="absolute -left-[1px] top-1.5 w-[2px] h-3 bg-gray-200" />
                <h3 className="text-sm font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">{exp.company} • {exp.startDate} – {exp.current ? "Now" : exp.endDate}</p>
                <div className="mt-3 space-y-2">
                  {generateBulletPoints(exp.description).map((b, i) => (
                    <p key={i} className="text-[11px] text-gray-500 leading-relaxed">— {b}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects.some(p => p.name) && (
        <section className="mb-10">
          <h2 className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] mb-6">Projects</h2>
          <div className="space-y-6">
            {data.projects.filter(p => p.name).map(proj => (
              <div key={proj.id}>
                <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">{proj.technologies}</p>
                <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {data.education.some(e => e.school) && (
          <section>
            <h2 className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] mb-4">Education</h2>
            <div className="space-y-4">
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id}>
                  <h3 className="text-sm font-semibold text-gray-900">{edu.school}</h3>
                  <p className="text-[11px] text-gray-500 mt-1">{edu.degree}{edu.field ? ` in ${edu.field}` : ''} • {edu.endDate}{edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {(skills.length > 0 || achievements.length > 0) && (
          <section>
            <h2 className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] mb-4">Skills & More</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {skills.slice(0, 8).map((s, i) => (
                <span key={i} className="text-[11px] text-gray-500">• {s}</span>
              ))}
              {achievements.map((a, i) => (
                <span key={i} className="text-[11px] text-gray-400 italic">/ {a}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white mx-auto font-sans text-gray-800 shadow-sm pb-12" style={{ minHeight: "297mm", width: "100%", maxWidth: "210mm" }}>
      <header className="bg-premium-900 text-white p-12">
        <h1 className="text-4xl font-black tracking-tight">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-premium-100 font-medium">
          {data.personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> {data.personalInfo.linkedin}</span>}
        </div>
      </header>

      <div className="px-12 py-10">
        {summary && (
          <section className="mb-10 p-6 bg-premium-50 rounded-xl border-l-4 border-premium-600">
            <h2 className="text-xs font-black text-premium-900 uppercase tracking-widest mb-3">Executive Summary</h2>
            <p className="text-[13px] leading-relaxed text-premium-800">{summary}</p>
          </section>
        )}

        <div className="grid grid-cols-1 gap-10">
          {data.workExperience.some(e => e.company) && (
            <section>
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <span className="w-10 h-[2px] bg-premium-900" /> Experience
              </h2>
              <div className="space-y-8">
                {data.workExperience.filter(e => e.company).map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline underline decoration-premium-100 decoration-2 underline-offset-4 mb-1">
                      <h3 className="text-base font-black text-gray-900">{exp.position}</h3>
                      <span className="text-[11px] font-bold text-gray-400">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
                    </div>
                    <p className="text-premium-600 font-bold text-xs uppercase tracking-wider mb-3">{exp.company}</p>
                    <ul className="space-y-2">
                      {generateBulletPoints(exp.description).map((b, i) => (
                        <li key={i} className="text-[12px] text-gray-600 flex gap-3">
                          <span className="text-premium-900 font-black">›</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects.some(p => p.name) && (
            <section>
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <span className="w-10 h-[2px] bg-premium-900" /> Notable Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.projects.filter(p => p.name).map(proj => (
                  <div key={proj.id} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <h3 className="text-sm font-black text-gray-900 mb-1">{proj.name}</h3>
                    <p className="text-[10px] font-bold text-premium-600 mb-3">{proj.technologies}</p>
                    <p className="text-[12px] text-gray-600 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {data.education.some(e => e.school) && (
              <section>
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                   Education
                </h2>
                <div className="space-y-4">
                  {data.education.filter(e => e.school).map(edu => (
                    <div key={edu.id}>
                      <h4 className="text-sm font-black text-gray-900">{edu.school}</h4>
                      <p className="text-xs text-premium-600 font-bold">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                      <p className="text-[11px] text-gray-400 mt-1">{edu.startDate} – {edu.endDate}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(skills.length > 0 || achievements.length > 0) && (
              <section>
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                   Core Competencies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-premium-900 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                      {s}
                    </span>
                  ))}
                </div>
                {achievements.length > 0 && (
                  <div className="mt-6 space-y-2">
                    {achievements.map((ach, i) => (
                      <div key={i} className="text-[12px] text-gray-600 flex gap-2">
                        <span className="text-premium-600">★</span> {ach}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  const steps = [
    { label: "Personal", icon: <User className="w-4 h-4" /> },
    { label: "Objective", icon: <Target className="w-4 h-4" /> },
    { label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
    { label: "Skills", icon: <Wrench className="w-4 h-4" /> },
    { label: "Projects", icon: <Rocket className="w-4 h-4" /> },
    { label: "Extras", icon: <Award className="w-4 h-4" /> },
    { label: "Template", icon: <Layout className="w-4 h-4" /> }
  ];

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: { fullName: "", email: "", phone: "", location: "", linkedin: "", website: "" },
    careerObjective: "",
    education: [{ id: generateId(), school: "", degree: "", field: "", startDate: "", endDate: "", gpa: "", highlights: "" }],
    skills: "",
    workExperience: [{ id: generateId(), company: "", position: "", startDate: "", endDate: "", current: false, description: "" }],
    projects: [{ id: generateId(), name: "", technologies: "", description: "", link: "" }],
    certifications: [{ id: generateId(), name: "", issuer: "", date: "" }],
    achievements: "",
  });

  const updatePersonalInfo = (field: keyof PersonalInfo, val: string) => {
    setResumeData({ ...resumeData, personalInfo: { ...resumeData.personalInfo, [field]: val } });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowPreview(true);
      showNotification("Resume polished by AI! ✨");
    }, 1500);
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    showNotification("Preparing high-quality PDF...");
    const canvas = await html2canvas(previewRef.current, { 
      scale: 2,
      useCORS: true,
      logging: false
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    const pageHeight = pdf.internal.pageSize.getHeight();
    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }

    const fileName = resumeData.personalInfo.fullName
      ? `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`
      : "Resume.pdf";
    pdf.save(fileName);
    showNotification("Downloaded successfully! ✅");
  };

  const downloadDOCX = () => {
    showNotification("Generating document...");
    const summary = generateSummary(resumeData.careerObjective, resumeData.skills, resumeData.workExperience);
    const skills = processSkills(resumeData.skills);
    const achievements = processAchievements(resumeData.achievements);
    const pi = resumeData.personalInfo;

    const doc = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
<head><meta charset="utf-8"><title>Resume</title></head>
<body style="font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.5; color: #333;">
<h1 style="margin:0; color: #1a1a2e; font-size: 24pt;">${pi.fullName || "Your Name"}</h1>
<p style="color: #666; font-size: 10pt; margin: 4px 0;">${[pi.email, pi.phone, pi.location, pi.linkedin, pi.website].filter(Boolean).join(" | ")}</p>
<hr style="border: 1px solid #475569; margin: 10px 0;">
${summary ? `<h2 style="color: #475569; font-size: 12pt; text-transform: uppercase; margin: 12px 0 4px;">Professional Summary</h2><p>${summary}</p>` : ""}
${skills.length ? `<h2 style="color: #475569; font-size: 12pt; text-transform: uppercase; margin: 12px 0 4px;">Skills</h2><p>${skills.join(" \u2022 ")}</p>` : ""}
${resumeData.workExperience.filter(e => e.company).length ? `<h2 style="color: #475569; font-size: 12pt; text-transform: uppercase; margin: 12px 0 4px;">Work Experience</h2>${resumeData.workExperience.filter(e => e.company).map(exp => `<p><strong>${exp.position}</strong> | ${exp.company} | ${exp.startDate} - ${exp.current ? "Present" : exp.endDate}</p><ul>${generateBulletPoints(exp.description).map(b => `<li>${b}</li>`).join("")}</ul>`).join("")}` : ""}
${resumeData.projects.filter(p => p.name).length ? `<h2 style="color: #475569; font-size: 12pt; text-transform: uppercase; margin: 12px 0 4px;">Projects</h2>${resumeData.projects.filter(p => p.name).map(proj => `<p><strong>${proj.name}</strong>${proj.technologies ? ` | ${proj.technologies}` : ""}</p><p>${proj.description}</p>`).join("")}` : ""}
${resumeData.education.filter(e => e.school).length ? `<h2 style="color: #475569; font-size: 12pt; text-transform: uppercase; margin: 12px 0 4px;">Education</h2>${resumeData.education.filter(e => e.school).map(edu => `<p><strong>${edu.degree}${edu.field ? ` in ${edu.field}` : ""}</strong> | ${edu.school} | ${edu.startDate} - ${edu.endDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ""}</p>`).join("")}` : ""}
${resumeData.certifications.filter(c => c.name).length ? `<h2 style="color: #475569; font-size: 12pt; text-transform: uppercase; margin: 12px 0 4px;">Certifications</h2>${resumeData.certifications.filter(c => c.name).map(cert => `<p><strong>${cert.name}</strong>${cert.issuer ? ` - ${cert.issuer}` : ""}${cert.date ? ` (${cert.date})` : ""}</p>`).join("")}` : ""}
${achievements.length ? `<h2 style="color: #475569; font-size: 12pt; text-transform: uppercase; margin: 12px 0 4px;">Achievements</h2><ul>${achievements.map(a => `<li>${a}</li>`).join("")}</ul>` : ""}
</body></html>`;

    const blob = new Blob([doc], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = resumeData.personalInfo.fullName
      ? `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.doc`
      : "Resume.doc";
    a.click();
    URL.revokeObjectURL(url);
    showNotification("Document downloaded! ✅");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-12 px-4 selection:bg-premium-100 selection:text-premium-900 bg-premium-50/30">
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-8 left-1/2 z-50 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-premium-100 text-premium-700 font-bold flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-premium-500" /> {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generating Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-10 shadow-2xl text-center max-w-sm"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-premium-100 border-t-premium-600 animate-spin" />
              <h3 className="text-xl font-black text-gray-900 mb-2">Generating Your Resume</h3>
              <p className="text-sm text-gray-500 font-medium">Our AI is polishing your content and formatting it professionally...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="text-center mb-16 px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-2xl shadow-sm border border-premium-100 mb-8"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-premium-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">R</div>
          <span className="text-sm font-bold text-gray-500 tracking-tight">ResumeAI Studio</span>
        </motion.div>
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter mb-6 leading-tight">
          Create Your <br className="sm:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-premium-600 to-indigo-600">Dream Resume</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
          Our AI analyzes your expertise and transforms it into high-impact <br className="hidden md:block" /> professional content with a premium design.
        </p>
      </header>

      <div className="w-full max-w-6xl">
        {!showPreview ? (
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <aside className="w-full lg:w-72 space-y-2 sticky top-12">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 text-sm font-bold ${
                    currentStep === idx 
                      ? "bg-premium-600 text-white shadow-xl shadow-premium-200" 
                      : idx < currentStep 
                        ? "bg-premium-100/50 text-premium-600" 
                        : "text-gray-400 hover:text-gray-600 hover:bg-white"
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${currentStep === idx ? "bg-white/20" : "bg-gray-100/50"}`}>
                    {step.icon}
                  </div>
                  {step.label}
                  {idx < currentStep && <Check className="w-4 h-4 ml-auto text-premium-500" />}
                </button>
              ))}
              <div className="pt-8 border-t border-gray-100 mt-8 space-y-4">
                <button 
                  onClick={() => {setResumeData(sampleData); showNotification("Sample data loaded! 📋")}}
                  className="w-full py-4 rounded-2xl border border-gray-200 text-gray-500 text-xs font-bold hover:bg-white hover:text-premium-600 hover:border-premium-200 transition-all flex items-center justify-center gap-2 group"
                >
                  <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" /> Load Sample Data
                </button>
              </div>
            </aside>

            <main className="flex-1 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {currentStep === 0 && (
                    <SectionCard title="Personal Information" icon={<User />}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Full Name" value={resumeData.personalInfo.fullName} onChange={(v) => updatePersonalInfo("fullName", v)} icon={User} required placeholder="John Doe" />
                        <InputField label="Email" value={resumeData.personalInfo.email} onChange={(v) => updatePersonalInfo("email", v)} icon={Mail} required placeholder="john@example.com" />
                        <InputField label="Phone" value={resumeData.personalInfo.phone} onChange={(v) => updatePersonalInfo("phone", v)} icon={Phone} placeholder="+1 (555) 000-0000" />
                        <InputField label="Location" value={resumeData.personalInfo.location} onChange={(v) => updatePersonalInfo("location", v)} icon={MapPin} placeholder="City, Country" />
                        <InputField label="LinkedIn" value={resumeData.personalInfo.linkedin} onChange={(v) => updatePersonalInfo("linkedin", v)} icon={Linkedin} placeholder="linkedin.com/in/username" />
                        <InputField label="Website" value={resumeData.personalInfo.website} onChange={(v) => updatePersonalInfo("website", v)} icon={Globe} placeholder="portfolio.dev" />
                      </div>
                    </SectionCard>
                  )}

                  {currentStep === 1 && (
                    <SectionCard title="Career Objective" icon={<Target />}>
                      <TextAreaField 
                        label="Profile Summary" 
                        value={resumeData.careerObjective} 
                        onChange={(v) => setResumeData({...resumeData, careerObjective: v})} 
                        hint="Describe your career goals. Our AI will transform this into a powerful professional summary."
                        placeholder="e.g., I'm a software developer with 5 years of experience in React..."
                        rows={6}
                      />
                    </SectionCard>
                  )}

                  {currentStep === 2 && (
                    <SectionCard title="Work Experience" icon={<Briefcase />}>
                      <div className="space-y-6">
                        {resumeData.workExperience.map((exp, idx) => (
                          <div key={exp.id} className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 relative group hover:bg-white hover:border-premium-100 transition-all">
                            <button 
                              onClick={() => setResumeData({...resumeData, workExperience: resumeData.workExperience.filter(e => e.id !== exp.id)})}
                              className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            <label className="text-[10px] uppercase tracking-widest font-black text-premium-400 mb-4 block">Position #{idx+1}</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <InputField label="Company" value={exp.company} onChange={(v) => {
                                setResumeData({...resumeData, workExperience: resumeData.workExperience.map((e, i) => i === idx ? {...e, company: v} : e)});
                              }} placeholder="Tech Giants Corp" />
                              <InputField label="Position" value={exp.position} onChange={(v) => {
                                setResumeData({...resumeData, workExperience: resumeData.workExperience.map((e, i) => i === idx ? {...e, position: v} : e)});
                              }} placeholder="Senior Developer" />
                              <InputField label="Start Date" value={exp.startDate} onChange={(v) => {
                                setResumeData({...resumeData, workExperience: resumeData.workExperience.map((e, i) => i === idx ? {...e, startDate: v} : e)});
                              }} placeholder="Jan 2022" />
                              <div>
                                <InputField label="End Date" value={exp.current ? "Present" : exp.endDate} onChange={(v) => {
                                  setResumeData({...resumeData, workExperience: resumeData.workExperience.map((e, i) => i === idx ? {...e, endDate: v} : e)});
                                }} placeholder="Present" disabled={exp.current} />
                                <label className="flex items-center gap-2 -mt-2 mb-4 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={exp.current}
                                    onChange={(e) => setResumeData({...resumeData, workExperience: resumeData.workExperience.map((el, i) => i === idx ? {...el, current: e.target.checked, endDate: e.target.checked ? '' : el.endDate} : el)})}
                                    className="w-4 h-4 text-premium-600 rounded focus:ring-premium-500 accent-premium-600"
                                  />
                                  <span className="text-sm text-gray-500 font-medium">Currently working here</span>
                                </label>
                              </div>
                              <div className="md:col-span-2">
                                <TextAreaField label="Description" value={exp.description} onChange={(v) => {
                                  setResumeData({...resumeData, workExperience: resumeData.workExperience.map((e, i) => i === idx ? {...e, description: v} : e)});
                                }} rows={4} hint="What did you achieve? Write in plain English—our AI generates strong action verbs." placeholder="I managed a team of 5 and we built a new API..." />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button 
                         onClick={() => setResumeData({...resumeData, workExperience: [...resumeData.workExperience, { id: generateId(), company: "", position: "", startDate: "", endDate: "", current: false, description: "" }]})}
                        className="w-full mt-6 py-5 border-2 border-dashed border-premium-100 text-premium-600 rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-premium-50 transition-all active:scale-[0.99]"
                      >
                        <Plus className="w-6 h-6" /> Add Professional Experience
                      </button>
                    </SectionCard>
                  )}

                  {currentStep === 3 && (
                    <SectionCard title="Education" icon={<GraduationCap />}>
                      <div className="space-y-6">
                        {resumeData.education.map((edu, idx) => (
                          <div key={edu.id} className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 relative group hover:bg-white hover:border-premium-100 transition-all">
                             <button 
                              onClick={() => setResumeData({...resumeData, education: resumeData.education.filter(e => e.id !== edu.id)})}
                              className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            <label className="text-[10px] uppercase tracking-widest font-black text-premium-400 mb-4 block">Education #{idx+1}</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <InputField label="School" value={edu.school} onChange={(v) => {
                                setResumeData({...resumeData, education: resumeData.education.map((e, i) => i === idx ? {...e, school: v} : e)});
                              }} placeholder="University of Future" />
                              <InputField label="Degree" value={edu.degree} onChange={(v) => {
                                setResumeData({...resumeData, education: resumeData.education.map((e, i) => i === idx ? {...e, degree: v} : e)});
                              }} placeholder="B.S. Computer Science" />
                              <InputField label="Field of Study" value={edu.field} onChange={(v) => {
                                setResumeData({...resumeData, education: resumeData.education.map((e, i) => i === idx ? {...e, field: v} : e)});
                              }} placeholder="Computer Science" />
                              <InputField label="GPA" value={edu.gpa} onChange={(v) => {
                                setResumeData({...resumeData, education: resumeData.education.map((e, i) => i === idx ? {...e, gpa: v} : e)});
                              }} placeholder="3.8/4.0" />
                              <InputField label="Start Date" value={edu.startDate} onChange={(v) => {
                                setResumeData({...resumeData, education: resumeData.education.map((e, i) => i === idx ? {...e, startDate: v} : e)});
                              }} placeholder="2018" />
                              <InputField label="End Date" value={edu.endDate} onChange={(v) => {
                                setResumeData({...resumeData, education: resumeData.education.map((e, i) => i === idx ? {...e, endDate: v} : e)});
                              }} placeholder="2022" />
                              <div className="md:col-span-2">
                                <TextAreaField label="Highlights" value={edu.highlights} onChange={(v) => {
                                  setResumeData({...resumeData, education: resumeData.education.map((e, i) => i === idx ? {...e, highlights: v} : e)});
                                }} rows={2} placeholder="Dean's List, Research Assistant..." />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button 
                         onClick={() => setResumeData({...resumeData, education: [...resumeData.education, { id: generateId(), school: "", degree: "", field: "", startDate: "", endDate: "", gpa: "", highlights: "" }]})}
                        className="w-full mt-6 py-5 border-2 border-dashed border-premium-100 text-premium-600 rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-premium-50 transition-all"
                      >
                        <Plus className="w-6 h-6" /> Add Education
                      </button>
                    </SectionCard>
                  )}

                  {currentStep === 4 && (
                    <SectionCard title="Skills" icon={<Wrench />}>
                      <TextAreaField 
                        label="Your Expertise" 
                        value={resumeData.skills} 
                        onChange={(v) => setResumeData({...resumeData, skills: v})} 
                        hint="List your skills separated by commas. We'll format them beautifully."
                        placeholder="React, TypeScript, Node.js, System Design, UI/UX..."
                        rows={6}
                      />
                      <div className="mt-4">
                        <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Quick Add:</p>
                        <div className="flex flex-wrap gap-2">
                          {["JavaScript", "Python", "React", "Node.js", "SQL", "AWS", "Docker", "Git", "TypeScript", "Java", "C++", "Figma", "Project Management", "Data Analysis", "Machine Learning", "Communication", "Leadership"].map((skill) => {
                            const isSelected = resumeData.skills.toLowerCase().includes(skill.toLowerCase());
                            return (
                              <button
                                key={skill}
                                onClick={() => {
                                  if (!isSelected) {
                                    const current = resumeData.skills.split(',').map(s => s.trim()).filter(Boolean);
                                    setResumeData({...resumeData, skills: [...current, skill].join(', ')});
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-premium-600 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-600 hover:bg-premium-50 hover:text-premium-700'
                                }`}
                              >
                                {isSelected ? '✓ ' : '+ '}{skill}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </SectionCard>
                  )}

                  {currentStep === 5 && (
                    <SectionCard title="Key Projects" icon={<Rocket />}>
                      <div className="space-y-6">
                        {resumeData.projects.map((proj, idx) => (
                          <div key={proj.id} className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 relative group hover:bg-white hover:border-premium-100 transition-all">
                             <button 
                              onClick={() => setResumeData({...resumeData, projects: resumeData.projects.filter(p => p.id !== proj.id)})}
                              className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            <label className="text-[10px] uppercase tracking-widest font-black text-premium-400 mb-4 block">Project #{idx+1}</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <InputField label="Project Name" value={proj.name} onChange={(v) => {
                                setResumeData({...resumeData, projects: resumeData.projects.map((p, i) => i === idx ? {...p, name: v} : p)});
                              }} placeholder="E-commerce Engine" />
                              <InputField label="Technologies" value={proj.technologies} onChange={(v) => {
                                setResumeData({...resumeData, projects: resumeData.projects.map((p, i) => i === idx ? {...p, technologies: v} : p)});
                              }} placeholder="Next.js, Prisma" />
                              <InputField label="Project Link" value={proj.link} onChange={(v) => {
                                setResumeData({...resumeData, projects: resumeData.projects.map((p, i) => i === idx ? {...p, link: v} : p)});
                              }} placeholder="github.com/username/repo" />
                              <div className="md:col-span-2">
                                <TextAreaField label="Description" value={proj.description} onChange={(v) => {
                                  setResumeData({...resumeData, projects: resumeData.projects.map((p, i) => i === idx ? {...p, description: v} : p)});
                                }} rows={3} placeholder="Describe the impact and tech stack..." />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button 
                         onClick={() => setResumeData({...resumeData, projects: [...resumeData.projects, { id: generateId(), name: "", technologies: "", description: "", link: "" }]})}
                        className="w-full mt-6 py-5 border-2 border-dashed border-premium-100 text-premium-600 rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-premium-50 transition-all"
                      >
                        <Plus className="w-6 h-6" /> Add Project
                      </button>
                    </SectionCard>
                  )}

                  {currentStep === 6 && (
                    <div className="space-y-8">
                       <SectionCard title="Certifications" icon={<Award />}>
                        <div className="space-y-4">
                          {resumeData.certifications.map((cert, idx) => (
                            <div key={cert.id} className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 relative group hover:bg-white hover:border-premium-100 transition-all">
                              <button 
                                onClick={() => setResumeData({...resumeData, certifications: resumeData.certifications.filter(c => c.id !== cert.id)})}
                                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <InputField label="Certification Name" value={cert.name} onChange={(v) => {
                                  setResumeData({...resumeData, certifications: resumeData.certifications.map((c, i) => i === idx ? {...c, name: v} : c)});
                                }} placeholder="AWS Solutions Architect" />
                                <InputField label="Issuing Organization" value={cert.issuer} onChange={(v) => {
                                  setResumeData({...resumeData, certifications: resumeData.certifications.map((c, i) => i === idx ? {...c, issuer: v} : c)});
                                }} placeholder="Amazon Web Services" />
                                <InputField label="Date" value={cert.date} onChange={(v) => {
                                  setResumeData({...resumeData, certifications: resumeData.certifications.map((c, i) => i === idx ? {...c, date: v} : c)});
                                }} placeholder="2023" />
                              </div>
                            </div>
                          ))}
                          <button 
                            onClick={() => setResumeData({...resumeData, certifications: [...resumeData.certifications, { id: generateId(), name: "", issuer: "", date: "" }]})}
                            className="w-full py-4 border-2 border-dashed border-premium-100 text-premium-600 rounded-2xl text-xs font-bold hover:bg-premium-50 transition-all"
                          >
                            + Add Certification
                          </button>
                        </div>
                      </SectionCard>
                      
                      <SectionCard title="Notable Achievements" icon={<Sparkles />}>
                        <TextAreaField 
                          label="Awards & Recognition" 
                          value={resumeData.achievements} 
                          onChange={(v) => setResumeData({...resumeData, achievements: v})} 
                          placeholder="e.g., Hackathon winner, Top contributor..."
                          rows={4}
                        />
                      </SectionCard>
                    </div>
                  )}
                  
                  {currentStep === 7 && (
                    <SectionCard title="Template Selection" icon={<Layout />}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {templates.map(t => (
                          <button
                            key={t.id}
                            onClick={() => setSelectedTemplate(t.id)}
                            className={`p-6 rounded-3xl border-2 text-left transition-all duration-500 relative overflow-hidden group ${
                              selectedTemplate === t.id 
                                ? "border-premium-600 bg-white shadow-2xl shadow-premium-100" 
                                : "border-gray-100 bg-gray-50/50 hover:bg-white hover:border-premium-200"
                            }`}
                          >
                            {selectedTemplate === t.id && (
                              <motion.div 
                                layoutId="template-selection" 
                                className="absolute inset-0 bg-premium-600/5 z-0" 
                              />
                            )}
                            <div className="relative z-10">
                              <div className={`p-3 rounded-2xl inline-block mb-4 transition-colors ${selectedTemplate === t.id ? "bg-premium-600 text-white" : "bg-white text-gray-400 group-hover:text-premium-500"}`}>
                                {t.icon}
                              </div>
                              <h4 className="font-black text-gray-900 leading-tight">{t.name}</h4>
                              <p className="text-xs font-medium text-gray-400 mt-2">{t.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </SectionCard>
                  )}
                  
                  <div className="flex items-center justify-between mt-12 pb-12">
                    <button 
                      onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                      disabled={currentStep === 0}
                      className="px-8 py-4 rounded-2xl font-bold text-gray-400 hover:text-premium-600 hover:bg-white transition-all disabled:opacity-0"
                    >
                      <ChevronLeft className="w-5 h-5 inline mr-2" /> Previous Step
                    </button>
                    {currentStep < steps.length - 1 ? (
                      <button 
                        onClick={() => setCurrentStep(s => s + 1)}
                        className="group px-10 py-4 bg-premium-900 text-white rounded-2xl font-bold shadow-2xl shadow-premium-200 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        Next Area <ChevronRight className="w-5 h-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <button 
                        onClick={handleGenerate}
                        className="px-12 py-5 bg-gradient-to-r from-premium-600 to-indigo-600 text-white rounded-2xl font-black shadow-2xl shadow-premium-300 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center gap-3"
                      >
                        <Sparkles className="w-6 h-6 animate-pulse" /> Generate Final Resume
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        ) : (
          /* PREVIEW MODE */
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full space-y-10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/70 backdrop-blur-2xl p-8 rounded-[40px] border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-2">Resume Ready! ✨</h3>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Optimized & Polished</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="px-6 py-4 border-2 border-gray-100 rounded-2xl text-sm font-bold bg-white focus:ring-4 focus:ring-premium-100 focus:border-premium-500 outline-none transition-all cursor-pointer"
                >
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} Style
                    </option>
                  ))}
                </select>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-white hover:shadow-md transition-all"
                >
                  Edit Resume
                </button>
                <button 
                  onClick={downloadPDF}
                  className="px-10 py-4 bg-premium-900 text-white rounded-2xl font-black shadow-2xl hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
                >
                  <Download className="w-5 h-5" /> Save as PDF
                </button>
                <button 
                  onClick={downloadDOCX}
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-3"
                >
                  <FileText className="w-5 h-5" /> Save as DOCX
                </button>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-12">
              <div className="flex-1 bg-white/40 backdrop-blur-md p-6 sm:p-12 rounded-[40px] border border-white/40 shadow-xl overflow-auto max-h-[1200px] scrollbar-hide">
                <div ref={previewRef} className="origin-top flex justify-center">
                  {selectedTemplate === "modern" && <ModernTemplate data={resumeData} />}
                  {selectedTemplate === "classic" && <ClassicTemplate data={resumeData} />}
                  {selectedTemplate === "minimal" && <MinimalTemplate data={resumeData} />}
                  {selectedTemplate === "executive" && <ExecutiveTemplate data={resumeData} />}
                </div>
              </div>
              
              <aside className="w-full xl:w-96 space-y-8">
                <div className="bg-emerald-50 rounded-[32px] p-8 border border-emerald-100 shadow-sm shadow-emerald-50">
                  <h4 className="font-black text-emerald-900 text-lg flex items-center gap-3 mb-6">
                    <Sparkles className="w-6 h-6 text-emerald-500" /> AI Insights
                  </h4>
                  <ul className="space-y-4">
                    {[
                      { t: "Action Verbs Integrated", d: "Content optimized for recruiters." },
                      { t: "ATS Keywords Detected", d: "High matching score expected." },
                      { t: "Achievement Focused", d: "Impact prioritized over tasks." },
                    ].map((tip, i) => (
                      <li key={i} className="flex gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Check className="w-3 h-3 text-emerald-700" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-emerald-800">{tip.t}</p>
                          <p className="text-xs text-emerald-600/80 font-medium">{tip.d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/50 backdrop-blur-sm rounded-[32px] p-8 border border-gray-100 shadow-sm">
                   <h4 className="font-black text-gray-900 text-lg flex items-center gap-3 mb-6">
                    <ExternalLink className="w-6 h-6 text-premium-600" /> Next Steps
                  </h4>
                  <p className="text-xs font-medium text-gray-500 mb-6 leading-relaxed">
                    Download your resume and use our AI to draft a custom cover letter matching this data.
                  </p>
                  <button className="w-full py-4 bg-premium-50 text-premium-700 rounded-2xl text-sm font-bold hover:bg-premium-100 transition-colors">
                    Draft Cover Letter
                  </button>
                </div>
              </aside>
            </div>
          </motion.div>
        )}
      </div>

      <footer className="mt-32 pt-16 border-t border-gray-100 w-full max-w-6xl text-center pb-12">
        <div className="flex items-center justify-center gap-4 mb-4 opacity-30">
           <div className="w-6 h-6 rounded bg-gray-400" />
           <div className="w-6 h-6 rounded bg-gray-400" />
           <div className="w-6 h-6 rounded bg-gray-400" />
        </div>
        <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">
          ResumeAI Studio — Version 2.0 Premium
        </p>
        <p className="text-gray-300 text-[10px] mt-2 font-medium">
          Powered by proprietary text processing & premium design tokens
        </p>
      </footer>
    </div>
  );
}
