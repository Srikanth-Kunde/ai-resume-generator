// ============================================
// RESUME DATA TYPES
// ============================================

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  highlights: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  technologies: string;
  description: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Language {
  id: string;
  name: string;
  fluency: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic';
}

export interface CustomSection {
  id: string;
  title: string;
  entries: { id: string; label: string; value: string }[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  careerObjective: string;
  education: Education[];
  skills: string;
  workExperience: WorkExperience[];
  projects: Project[];
  certifications: Certification[];
  achievements: string;
  languages: Language[];
  customSections: CustomSection[];
  targetJob: string;
  themeColor: string;
}

// ============================================
// AUTH TYPES
// ============================================

export type UserRole = 'admin' | 'user';

export interface AuthSession {
  role: UserRole;
  expiresAt: number;
}

export interface AuthCredentials {
  adminHash: string;
  userHash: string;
}

// ============================================
// THEME TYPES
// ============================================

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColorOption {
  id: string;
  name: string;
  color: string;
}

export interface ThemeColors {
  [key: string]: string;
}

// ============================================
// ATS TYPES
// ============================================

export interface ATSSectionScore {
  section: string;
  score: number;
  maxScore: number;
  tips: string[];
}

export interface ATSResult {
  overallScore: number;
  sectionScores: ATSSectionScore[];
  matchedKeywords: string[];
  missingKeywords: string[];
  partialKeywords: string[];
  formattingIssues: string[];
}

export interface JobDescription {
  rawText: string;
  extractedKeywords: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  requirements: string[];
}

// ============================================
// AI ENGINE TYPES
// ============================================

export type ToneType = 'professional' | 'creative' | 'formal';

export interface AISuggestion {
  id: string;
  original: string;
  suggested: string;
  type: 'keyword' | 'action-verb' | 'tone' | 'quantify';
  confidence: number;
}

export interface KeywordMatch {
  keyword: string;
  status: 'matched' | 'partial' | 'missing';
  location?: string;
}

// ============================================
// TEMPLATE TYPES
// ============================================

export interface TemplateOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

// ============================================
// STORAGE TYPES
// ============================================

export interface SavedResume {
  data: ResumeData;
  timestamp: number;
  name: string;
}

export interface AppState {
  resumes: SavedResume[];
  activeResumeIndex: number;
  lastAutoSave: number;
}

// ============================================
// UTILITY
// ============================================

export const generateId = (): string => Math.random().toString(36).substr(2, 9);

export const createEmptyResume = (): ResumeData => ({
  personalInfo: { fullName: '', email: '', phone: '', location: '', linkedin: '', website: '' },
  careerObjective: '',
  education: [{ id: generateId(), school: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', highlights: '' }],
  skills: '',
  workExperience: [{ id: generateId(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' }],
  projects: [{ id: generateId(), name: '', technologies: '', description: '', link: '' }],
  certifications: [{ id: generateId(), name: '', issuer: '', date: '' }],
  achievements: '',
  languages: [],
  customSections: [],
  targetJob: '',
  themeColor: 'slate',
});
