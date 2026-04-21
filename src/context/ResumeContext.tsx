import { createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import type { ResumeData } from '../types';
import { createEmptyResume } from '../types';
import { saveResumeData, loadResumeData, UndoRedoManager } from '../utils/storage';

interface ResumeContextValue {
  data: ResumeData;
  setData: (data: ResumeData) => void;
  updateField: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void;
  resetData: () => void;
  loadSample: () => void;
  lastSaved: number | null;
  isSaving: boolean;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

const AUTO_SAVE_INTERVAL = 30_000; // 30 seconds

// ============================================
// SAMPLE DATA
// ============================================
const sampleData: ResumeData = {
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    website: 'alexjohnson.dev',
  },
  careerObjective: 'Passionate full-stack developer with 5 years of experience building scalable web applications. Looking to leverage my expertise in React, Node.js, and cloud technologies to drive innovation at a forward-thinking tech company.',
  education: [
    { id: 'edu1', school: 'UC Berkeley', degree: 'Bachelor of Science', field: 'Computer Science', startDate: '2016', endDate: '2020', gpa: '3.8', highlights: "Dean's List, Regents' Scholar" },
  ],
  skills: 'JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, PostgreSQL, MongoDB, UI/UX Design, GraphQL, Redis',
  workExperience: [
    { id: 'work1', company: 'TechCorp Inc.', position: 'Senior Software Engineer', startDate: 'Jan 2022', endDate: 'Present', current: true, description: 'Led development of a real-time analytics dashboard serving 1M+ users. Mentored a team of 4 junior developers. Reduced API response times by 60% through strategic Redis caching and query optimization. Spearheaded the migration to a microservices architecture.' },
    { id: 'work2', company: 'StartupX', position: 'Software Engineer', startDate: 'Jun 2020', endDate: 'Dec 2021', current: false, description: 'Built the initial MVP for an AI-powered financial tracker. Automated CI/CD pipelines using GitHub Actions. Collaborated with designers to implement a premium dark-themed UI.' },
  ],
  projects: [
    { id: 'proj1', name: 'CloudDeploy Pro', technologies: 'React, Node.js, AWS', description: "Built an automated deployment platform for serverless functions. Featured in Product Hunt's Top 10.", link: 'github.com/alexj/cloud' },
    { id: 'proj2', name: 'NeoPay', technologies: 'Next.js, Stripe, PostgreSQL', description: 'A secure payment gateway for freelancers with localized currency support.', link: 'neopay.is' },
  ],
  certifications: [
    { id: 'cert1', name: 'AWS Solutions Architect Professional', issuer: 'Amazon', date: '2023' },
    { id: 'cert2', name: 'Google Cloud Professional Developer', issuer: 'Google', date: '2022' },
  ],
  achievements: 'Winner of TechCorp Global Hackathon 2023. Published 5+ technical articles on Medium with 50k+ reads. Open source contributor to React Native core.',
  languages: [
    { id: 'lang1', name: 'English', fluency: 'native' },
    { id: 'lang2', name: 'Spanish', fluency: 'intermediate' },
  ],
  customSections: [],
  targetJob: 'Senior Full Stack Developer',
  themeColor: 'slate',
};

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setDataRaw] = useState<ResumeData>(() => {
    return loadResumeData() || createEmptyResume();
  });
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const undoManager = useRef(new UndoRedoManager());
  const [historyState, setHistoryState] = useState({ canUndo: false, canRedo: false });

  const updateHistoryState = useCallback(() => {
    setHistoryState({
      canUndo: undoManager.current.canUndo,
      canRedo: undoManager.current.canRedo
    });
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSaving(true);
      saveResumeData(data);
      setLastSaved(Date.now());
      setTimeout(() => setIsSaving(false), 800);
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [data]);

  const setData = useCallback((newData: ResumeData) => {
    undoManager.current.push(data);
    setDataRaw(newData);
    updateHistoryState();
  }, [data, updateHistoryState]);

  const updateField = useCallback(<K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setData({ ...data, [key]: value });
  }, [data, setData]);

  const resetData = useCallback(() => {
    undoManager.current.push(data);
    setDataRaw(createEmptyResume());
    updateHistoryState();
  }, [data, updateHistoryState]);

  const loadSample = useCallback(() => {
    undoManager.current.push(data);
    setDataRaw(sampleData);
    saveResumeData(sampleData);
    setLastSaved(Date.now());
    updateHistoryState();
  }, [data, updateHistoryState]);

  const undo = useCallback(() => {
    const prev = undoManager.current.undo(data);
    if (prev) {
      setDataRaw(prev);
      updateHistoryState();
    }
  }, [data, updateHistoryState]);

  const redo = useCallback(() => {
    const next = undoManager.current.redo(data);
    if (next) {
      setDataRaw(next);
      updateHistoryState();
    }
  }, [data, updateHistoryState]);

  return (
    <ResumeContext.Provider value={{
      data,
      setData,
      updateField,
      resetData,
      loadSample,
      lastSaved,
      isSaving,
      undo,
      redo,
      canUndo: historyState.canUndo,
      canRedo: historyState.canRedo,
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useResume(): ResumeContextValue {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}
