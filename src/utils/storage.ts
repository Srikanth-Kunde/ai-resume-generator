import type { ResumeData, SavedResume } from '../types';
import { createEmptyResume } from '../types';

// ============================================
// STORAGE KEYS
// ============================================

const RESUME_KEY = 'resumeai_current';
const HISTORY_KEY = 'resumeai_history';
const MAX_HISTORY = 5;
const MAX_UNDO = 15;

// ============================================
// RESUME DATA PERSISTENCE
// ============================================

export function saveResumeData(data: ResumeData): void {
  try {
    localStorage.setItem(RESUME_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save resume data:', e);
  }
}

export function loadResumeData(): ResumeData | null {
  try {
    const stored = localStorage.getItem(RESUME_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ResumeData;
      // Ensure all required fields exist (migration safety)
      return {
        ...createEmptyResume(),
        ...parsed,
        personalInfo: { ...createEmptyResume().personalInfo, ...parsed.personalInfo },
      };
    }
  } catch (e) {
    console.warn('Failed to load resume data:', e);
  }
  return null;
}

export function clearResumeData(): void {
  localStorage.removeItem(RESUME_KEY);
}

// ============================================
// RESUME HISTORY (Last N saves with timestamps)
// ============================================

export function saveToHistory(data: ResumeData, name?: string): void {
  try {
    const history = loadHistory();
    const entry: SavedResume = {
      data: structuredClone(data),
      timestamp: Date.now(),
      name: name || data.personalInfo.fullName || 'Untitled Resume',
    };

    history.unshift(entry);
    if (history.length > MAX_HISTORY) history.pop();

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.warn('Failed to save history:', e);
  }
}

export function loadHistory(): SavedResume[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) return JSON.parse(stored) as SavedResume[];
  } catch (e) {
    console.warn('Failed to load history:', e);
  }
  return [];
}

export function deleteHistoryEntry(timestamp: number): void {
  const history = loadHistory().filter(h => h.timestamp !== timestamp);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// ============================================
// JSON EXPORT / IMPORT
// ============================================

export function exportAsJSON(data: ResumeData): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = data.personalInfo.fullName
    ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.json`
    : 'Resume.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function importFromJSON(file: File): Promise<ResumeData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as ResumeData;
        // Validate structure
        if (!data.personalInfo || !data.workExperience) {
          throw new Error('Invalid resume data format');
        }
        resolve({
          ...createEmptyResume(),
          ...data,
          personalInfo: { ...createEmptyResume().personalInfo, ...data.personalInfo },
        });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

// ============================================
// UNDO / REDO STACK
// ============================================

export class UndoRedoManager {
  private undoStack: ResumeData[] = [];
  private redoStack: ResumeData[] = [];
  private maxSize: number;

  constructor(maxSize = MAX_UNDO) {
    this.maxSize = maxSize;
  }

  push(state: ResumeData): void {
    this.undoStack.push(structuredClone(state));
    if (this.undoStack.length > this.maxSize) {
      this.undoStack.shift();
    }
    this.redoStack = []; // Clear redo on new action
  }

  undo(currentState: ResumeData): ResumeData | null {
    if (this.undoStack.length === 0) return null;
    this.redoStack.push(structuredClone(currentState));
    return this.undoStack.pop()!;
  }

  redo(currentState: ResumeData): ResumeData | null {
    if (this.redoStack.length === 0) return null;
    this.undoStack.push(structuredClone(currentState));
    return this.redoStack.pop()!;
  }

  get canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  get canRedo(): boolean {
    return this.redoStack.length > 0;
  }
}
