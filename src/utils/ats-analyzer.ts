import type { ResumeData, ATSResult, ATSSectionScore, JobDescription, KeywordMatch } from '../types';
import { processSkills } from './ai-engine';

// ============================================
// STOP WORDS — Filtered from keyword analysis
// ============================================

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
  'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
  'could', 'should', 'may', 'might', 'shall', 'can', 'need', 'must',
  'that', 'which', 'who', 'whom', 'this', 'these', 'those', 'it', 'its',
  'my', 'your', 'our', 'their', 'we', 'you', 'they', 'he', 'she',
  'as', 'if', 'not', 'no', 'so', 'up', 'out', 'all', 'about', 'each',
  'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between',
  'such', 'only', 'other', 'than', 'too', 'very', 'just', 'because', 'also',
  'both', 'either', 'any', 'some', 'more', 'most', 'well', 'etc', 'i.e',
  'e.g', 'include', 'including', 'ability', 'able', 'strong', 'excellent',
  'experience', 'work', 'working', 'job', 'role', 'position', 'company',
  'team', 'new', 'using', 'used', 'make', 'like', 'over', 'year', 'years',
]);

// ============================================
// JOB DESCRIPTION PARSER
// ============================================

export function parseJobDescription(text: string): JobDescription {
  if (!text.trim()) {
    return { rawText: '', extractedKeywords: [], requiredSkills: [], preferredSkills: [], requirements: [] };
  }

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const allWords = extractMeaningfulWords(text);

  // Extract n-grams (1-3 word phrases)
  const keywords = extractKeyPhrases(text);

  // Separate required vs preferred
  const requiredSkills: string[] = [];
  const preferredSkills: string[] = [];
  const requirements: string[] = [];

  let inPreferred = false;

  lines.forEach(line => {
    const lower = line.toLowerCase();
    if (/require|must have|essential|mandatory/i.test(lower)) {
      inPreferred = false;
    } else if (/prefer|nice to have|bonus|plus|desired/i.test(lower)) {
      inPreferred = true;
    }

    // Extract bullet points as requirements
    if (/^[-•*▸›]\s/.test(line) || /^\d+[.)]\s/.test(line)) {
      const cleaned = line.replace(/^[-•*▸›\d.)]+\s*/, '').trim();
      requirements.push(cleaned);

      const lineKeywords = extractMeaningfulWords(cleaned);
      if (inPreferred) {
        preferredSkills.push(...lineKeywords);
      } else {
        requiredSkills.push(...lineKeywords);
      }
    }
  });

  // Deduplicate
  const dedupedRequired = [...new Set(requiredSkills)];
  const dedupedPreferred = [...new Set(preferredSkills.filter(s => !dedupedRequired.includes(s)))];

  return {
    rawText: text,
    extractedKeywords: keywords,
    requiredSkills: dedupedRequired.length > 0 ? dedupedRequired : allWords.slice(0, 20),
    preferredSkills: dedupedPreferred,
    requirements: [...new Set(requirements)],
  };
}

function extractMeaningfulWords(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s+#./]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));

  // Count frequency
  const freq: Record<string, number> = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });

  // Sort by frequency and return top unique words
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .slice(0, 50);
}

function extractKeyPhrases(text: string): string[] {
  const phrases: string[] = [];
  const words = text.split(/\s+/).map(w => w.replace(/[^a-zA-Z0-9+#./]/g, '').trim()).filter(Boolean);

  // Common tech patterns (multi-word)
  const techPatterns = [
    /\b(node\.?js)\b/gi, /\b(react\.?js|react native)\b/gi, /\b(next\.?js)\b/gi,
    /\b(vue\.?js)\b/gi, /\b(angular\.?js|angularjs)\b/gi, /\b(machine learning)\b/gi,
    /\b(deep learning)\b/gi, /\b(data science)\b/gi, /\b(project management)\b/gi,
    /\b(ci\/?cd)\b/gi, /\b(rest api|restful api)\b/gi, /\b(unit test|testing)\b/gi,
    /\b(agile|scrum)\b/gi, /\b(aws|gcp|azure)\b/gi, /\b(sql|nosql)\b/gi,
    /\b(ui\/?ux)\b/gi, /\b(full.?stack)\b/gi, /\b(front.?end)\b/gi, /\b(back.?end)\b/gi,
  ];

  techPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(m => phrases.push(m.trim()));
    }
  });

  // Single meaningful words
  words.forEach(w => {
    const lower = w.toLowerCase();
    if (lower.length > 2 && !STOP_WORDS.has(lower)) {
      phrases.push(w);
    }
  });

  return [...new Set(phrases.map(p => p.toLowerCase()))].slice(0, 40);
}

// ============================================
// ATS SCORING ENGINE
// ============================================

export function calculateATSScore(data: ResumeData, jobDesc?: JobDescription): ATSResult {
  const sections = [
    scorePersonalInfo(data),
    scoreObjective(data),
    scoreExperience(data),
    scoreEducation(data),
    scoreSkills(data),
    scoreProjects(data),
    scoreExtras(data),
    scoreFormatting(data),
  ];

  let keywordAnalysis: { matched: string[]; missing: string[]; partial: string[] } = {
    matched: [], missing: [], partial: [],
  };

  if (jobDesc && jobDesc.extractedKeywords.length > 0) {
    keywordAnalysis = analyzeKeywordMatch(data, jobDesc);
    // Keyword match bonus (up to 15 points)
    const matchRate = keywordAnalysis.matched.length / Math.max(1, jobDesc.extractedKeywords.length);
    const keywordScore: ATSSectionScore = {
      section: 'Keyword Match',
      score: Math.round(matchRate * 15),
      maxScore: 15,
      tips: keywordAnalysis.missing.length > 0
        ? [`Missing keywords: ${keywordAnalysis.missing.slice(0, 5).join(', ')}`]
        : ['Excellent keyword coverage!'],
    };
    sections.push(keywordScore);
  }

  const totalScore = sections.reduce((sum, s) => sum + s.score, 0);
  const maxPossible = sections.reduce((sum, s) => sum + s.maxScore, 0);
  const overallScore = Math.min(100, Math.round((totalScore / maxPossible) * 100));

  return {
    overallScore,
    sectionScores: sections,
    matchedKeywords: keywordAnalysis.matched,
    missingKeywords: keywordAnalysis.missing,
    partialKeywords: keywordAnalysis.partial,
    formattingIssues: getFormattingIssues(data),
  };
}

function scorePersonalInfo(data: ResumeData): ATSSectionScore {
  let score = 0;
  const tips: string[] = [];

  if (data.personalInfo.fullName.length > 2) score += 3;
  else tips.push('Add your full name.');

  if (data.personalInfo.email.includes('@')) score += 3;
  else tips.push('Add a valid email address.');

  if (data.personalInfo.phone.length > 5) score += 2;
  else tips.push('Add a phone number.');

  if (data.personalInfo.location.length > 2) score += 1;

  if (data.personalInfo.linkedin || data.personalInfo.website) score += 1;
  else tips.push('Add a LinkedIn profile or portfolio link.');

  return { section: 'Contact Info', score, maxScore: 10, tips };
}

function scoreObjective(data: ResumeData): ATSSectionScore {
  let score = 0;
  const tips: string[] = [];

  if (data.targetJob.length > 2) {
    score += 5;
  } else {
    tips.push('Add a target job title for better ATS matching.');
  }

  if (data.careerObjective.length > 30) {
    score += 5;
    if (data.careerObjective.length > 100) score += 2;
  } else {
    tips.push('Write a professional summary of at least 2-3 sentences.');
  }

  return { section: 'Profile Summary', score, maxScore: 12, tips };
}

function scoreExperience(data: ResumeData): ATSSectionScore {
  let score = 0;
  const tips: string[] = [];
  const validExps = data.workExperience.filter(e => e.company);

  if (validExps.length > 0) {
    score += 5;
    if (validExps.length >= 2) score += 3;
  } else {
    tips.push('Add at least one work experience entry.');
  }

  let hasMetrics = false;
  validExps.forEach(exp => {
    if (exp.description.length > 50) score += 2;
    if (/\d+%|\$\d+|\d+x|\d+ users|\d+ team/i.test(exp.description)) hasMetrics = true;
  });

  if (hasMetrics) {
    score += 5;
  } else if (validExps.length > 0) {
    tips.push('Add quantifiable achievements (numbers, percentages, dollar amounts).');
  }

  return { section: 'Work Experience', score: Math.min(score, 25), maxScore: 25, tips };
}

function scoreEducation(data: ResumeData): ATSSectionScore {
  let score = 0;
  const tips: string[] = [];
  const validEdu = data.education.filter(e => e.school);

  if (validEdu.length > 0) {
    score += 5;
    if (validEdu.some(e => e.degree)) score += 3;
    if (validEdu.some(e => e.gpa)) score += 2;
  } else {
    tips.push('Add your education background.');
  }

  return { section: 'Education', score, maxScore: 10, tips };
}

function scoreSkills(data: ResumeData): ATSSectionScore {
  let score = 0;
  const tips: string[] = [];
  const skillCount = processSkills(data.skills).length;

  if (skillCount >= 8) {
    score += 10;
  } else if (skillCount >= 5) {
    score += 7;
    tips.push('Add more relevant skills (aim for 8-15).');
  } else if (skillCount > 0) {
    score += 4;
    tips.push('Add more skills to improve ATS matching. Aim for 8-15 skills.');
  } else {
    tips.push('Skills section is critical for ATS. Add your key competencies.');
  }

  return { section: 'Skills', score, maxScore: 10, tips };
}

function scoreProjects(data: ResumeData): ATSSectionScore {
  let score = 0;
  const tips: string[] = [];
  const validProjects = data.projects.filter(p => p.name);

  if (validProjects.length > 0) {
    score += 5;
    if (validProjects.some(p => p.technologies)) score += 2;
    if (validProjects.some(p => p.link)) score += 1;
  } else {
    tips.push('Add portfolio projects to showcase hands-on skills.');
  }

  return { section: 'Projects', score, maxScore: 8, tips };
}

function scoreExtras(data: ResumeData): ATSSectionScore {
  let score = 0;
  const tips: string[] = [];

  if (data.certifications.filter(c => c.name).length > 0) {
    score += 5;
  } else {
    tips.push('Certifications strengthen your profile. Add any relevant ones.');
  }

  if (data.achievements.length > 10) {
    score += 3;
  }

  return { section: 'Certifications & Achievements', score, maxScore: 8, tips };
}

function scoreFormatting(data: ResumeData): ATSSectionScore {
  let score = 0;
  const tips: string[] = [];

  // Check for consistent date formats
  const dateEntries = [
    ...data.workExperience.map(e => e.startDate),
    ...data.workExperience.map(e => e.endDate),
    ...data.education.map(e => e.startDate),
    ...data.education.map(e => e.endDate),
  ].filter(Boolean);

  if (dateEntries.length > 0) {
    score += 3;
  }

  // Check skills are properly separated
  if (data.skills.includes(',')) {
    score += 2;
  } else if (data.skills.length > 0) {
    tips.push('Separate skills with commas for better ATS parsing.');
  }

  // Check for professional email
  if (data.personalInfo.email && !/@(gmail|outlook|yahoo|hotmail)/i.test(data.personalInfo.email)) {
    score += 2;
  }

  return { section: 'Formatting', score, maxScore: 7, tips };
}

// ============================================
// KEYWORD MATCH ANALYSIS
// ============================================

function analyzeKeywordMatch(data: ResumeData, jobDesc: JobDescription): { matched: string[]; missing: string[]; partial: string[] } {
  const resumeText = [
    data.careerObjective,
    data.skills,
    data.workExperience.map(e => `${e.position} ${e.company} ${e.description}`).join(' '),
    data.education.map(e => `${e.degree} ${e.field} ${e.school}`).join(' '),
    data.projects.map(p => `${p.name} ${p.technologies} ${p.description}`).join(' '),
    data.certifications.map(c => `${c.name} ${c.issuer}`).join(' '),
    data.achievements,
    data.targetJob,
  ].join(' ').toLowerCase();

  const matched: string[] = [];
  const missing: string[] = [];
  const partial: string[] = [];

  jobDesc.extractedKeywords.forEach(keyword => {
    const lower = keyword.toLowerCase();
    if (resumeText.includes(lower)) {
      matched.push(keyword);
    } else {
      // Check partial match (word stem)
      const stem = lower.replace(/(ing|ed|tion|ment|ness|ity|ies|s)$/, '');
      if (stem.length > 3 && resumeText.includes(stem)) {
        partial.push(keyword);
      } else {
        missing.push(keyword);
      }
    }
  });

  return { matched, missing, partial };
}

export function getKeywordMatches(data: ResumeData, jobDesc: JobDescription): KeywordMatch[] {
  const analysis = analyzeKeywordMatch(data, jobDesc);
  const matches: KeywordMatch[] = [];

  analysis.matched.forEach(k => matches.push({ keyword: k, status: 'matched' }));
  analysis.partial.forEach(k => matches.push({ keyword: k, status: 'partial' }));
  analysis.missing.forEach(k => matches.push({ keyword: k, status: 'missing' }));

  return matches;
}

function getFormattingIssues(data: ResumeData): string[] {
  const issues: string[] = [];

  if (!data.personalInfo.fullName) issues.push('Missing full name');
  if (!data.personalInfo.email) issues.push('Missing email address');

  const hasInconsistentDates = data.workExperience.some(e => {
    return e.company && !e.startDate;
  });
  if (hasInconsistentDates) issues.push('Some work entries are missing start dates');

  if (data.skills.length > 0 && !data.skills.includes(',') && !data.skills.includes(';')) {
    issues.push('Skills should be separated by commas for ATS compatibility');
  }

  return issues;
}
