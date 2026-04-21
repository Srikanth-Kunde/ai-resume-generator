import type { ResumeData, AISuggestion, ToneType } from '../types';
import { generateId } from '../types';

// ============================================
// ACTION VERBS DATABASE
// ============================================

export const actionVerbs = [
  'Achieved', 'Accelerated', 'Administered', 'Advanced', 'Analyzed', 'Architected',
  'Built', 'Championed', 'Collaborated', 'Conceptualized', 'Consolidated', 'Created',
  'Delivered', 'Designed', 'Developed', 'Directed', 'Drove', 'Elevated',
  'Engineered', 'Enhanced', 'Established', 'Executed', 'Expanded', 'Facilitated',
  'Formulated', 'Generated', 'Guided', 'Implemented', 'Improved', 'Increased',
  'Influenced', 'Initiated', 'Innovated', 'Integrated', 'Launched', 'Led',
  'Managed', 'Mentored', 'Modernized', 'Negotiated', 'Optimized', 'Orchestrated',
  'Organized', 'Overhauled', 'Pioneered', 'Presented', 'Produced', 'Programmed',
  'Reduced', 'Refactored', 'Resolved', 'Restructured', 'Revamped', 'Scaled',
  'Solved', 'Spearheaded', 'Streamlined', 'Strengthened', 'Supervised',
  'Transformed', 'Validated', 'Visualized',
];

export const actionVerbsByCategory: Record<string, string[]> = {
  leadership: ['Led', 'Directed', 'Managed', 'Supervised', 'Mentored', 'Guided', 'Orchestrated', 'Championed', 'Spearheaded'],
  technical: ['Engineered', 'Developed', 'Implemented', 'Architected', 'Built', 'Programmed', 'Refactored', 'Integrated', 'Modernized'],
  achievement: ['Achieved', 'Delivered', 'Increased', 'Reduced', 'Improved', 'Optimized', 'Expanded', 'Elevated', 'Scaled'],
  innovation: ['Innovated', 'Pioneered', 'Conceptualized', 'Created', 'Designed', 'Launched', 'Initiated', 'Revamped', 'Transformed'],
  communication: ['Presented', 'Negotiated', 'Collaborated', 'Facilitated', 'Influenced', 'Produced', 'Formulated'],
};

// ============================================
// PROFESSIONAL PHRASE MAPPING
// ============================================

const professionalPhrases: Record<string, string> = {
  'worked on': 'Contributed to the development of',
  'helped with': 'Played a key role in',
  'was responsible for': 'Oversaw and managed',
  'did': 'Executed',
  'made': 'Engineered',
  'fixed': 'Resolved critical issues in',
  'improved': 'Significantly enhanced',
  'built': 'Architected and developed',
  'created': 'Designed and implemented',
  'managed': 'Strategically managed',
  'led': 'Spearheaded',
  'helped': 'Collaborated to deliver',
  'used': 'Leveraged',
  'learned': 'Mastered and applied',
  'wrote': 'Authored comprehensive',
  'tested': 'Conducted rigorous testing of',
  'designed': 'Conceptualized and designed',
  'developed': 'Engineered and delivered',
  'implemented': 'Successfully implemented',
  'increased': 'Drove measurable increase in',
  'reduced': 'Achieved significant reduction in',
  'organized': 'Coordinated and executed',
  'trained': 'Mentored and trained',
  'analyzed': 'Conducted in-depth analysis of',
  'researched': 'Performed comprehensive research on',
  'familiar with': 'Proficient in the application of',
  'good at': 'Expert in',
  'know how to': 'Possess advanced knowledge of',
  'started': 'Initiated and launched',
  'finished': 'Successfully concluded',
  'talked to': 'Collaborated with stakeholders regarding',
  'showed': 'Demonstrated',
  'set up': 'Established and configured',
  'put together': 'Assembled and orchestrated',
  'came up with': 'Devised and proposed',
  'looked into': 'Investigated and evaluated',
  'dealt with': 'Managed and resolved',
  'took care of': 'Administered and maintained',
  'ran': 'Directed and managed',
  'taught': 'Educated and mentored',
};

const toneModifiers: Record<ToneType, Record<string, string>> = {
  professional: {
    'built': 'Developed',
    'made': 'Created',
    'ran': 'Managed',
    'helped': 'Assisted',
    'used': 'Utilized',
    'worked': 'Operated',
  },
  creative: {
    'built': 'Crafted',
    'made': 'Brought to life',
    'ran': 'Steered',
    'helped': 'Empowered',
    'used': 'Harnessed',
    'worked': 'Engaged with',
  },
  formal: {
    'built': 'Constructed and delivered',
    'made': 'Produced and finalized',
    'ran': 'Administered',
    'helped': 'Provided assistance with',
    'used': 'Employed',
    'worked': 'Engaged in the execution of',
  },
};

// ============================================
// CORE TRANSFORMATIONS
// ============================================

export function transformToProfessional(text: string): string {
  if (!text.trim()) return '';
  let result = text.trim();

  Object.entries(professionalPhrases).forEach(([informal, formal]) => {
    const regex = new RegExp(`\\b${informal}\\b`, 'gi');
    result = result.replace(regex, formal);
  });

  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  if (result.length > 0 && !/[.!?%]$/.test(result)) {
    result += '.';
  }

  return result;
}

export function adjustTone(text: string, tone: ToneType): string {
  if (!text.trim()) return '';
  let result = text.trim();
  const modifiers = toneModifiers[tone];

  Object.entries(modifiers).forEach(([word, replacement]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    result = result.replace(regex, replacement);
  });

  return result;
}

export function generateBulletPoints(description: string): string[] {
  if (!description.trim()) return [];

  const rawPoints = description
    .split(/[;\n•]+/)
    .map(s => s.trim())
    .filter(s => s.length > 5);

  if (rawPoints.length === 0 && description.trim().length > 5) {
    rawPoints.push(description.trim());
  }

  return rawPoints.map(point => {
    let transformed = transformToProfessional(point);
    const startsWithAction = actionVerbs.some(verb =>
      transformed.toLowerCase().startsWith(verb.toLowerCase())
    );
    if (!startsWithAction && transformed.length > 10) {
      const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
      transformed = `${randomVerb} ${transformed.charAt(0).toLowerCase() + transformed.slice(1)}`;
    }
    return transformed;
  });
}

export function generateSummary(
  objective: string,
  skills: string,
  experience: { position: string }[],
  targetJob: string = ''
): string {
  if (!objective.trim() && !skills.trim() && !targetJob.trim()) return '';

  let summary = objective.trim() ? transformToProfessional(objective) : '';

  if (!summary) {
    const roleContext = targetJob.trim()
      ? targetJob
      : (experience.length > 0 ? experience[0].position : 'professional');
    summary = `Results-driven ${roleContext.toLowerCase()} with a proven track record of delivering high-impact solutions and driving organizational success.`;
  }

  if (skills.trim()) {
    const topSkills = skills.split(',').map(s => s.trim()).filter(Boolean).slice(0, 4).join(', ');
    if (topSkills) summary += ` Core competencies include ${topSkills}.`;
  }

  return summary;
}

export function processAchievements(achievements: string): string[] {
  if (!achievements.trim()) return [];
  return achievements
    .split(/[;\n•]+/)
    .map(s => s.trim())
    .filter(s => s.length > 3)
    .map(a => transformToProfessional(a));
}

export function processSkills(skills: string): string[] {
  if (!skills.trim()) return [];
  return skills.split(/[,;\n•]+/).map(s => s.trim()).filter(s => s.length > 1);
}

// ============================================
// KEYWORD OPTIMIZATION
// ============================================

export function optimizeForKeywords(text: string, keywords: string[]): AISuggestion[] {
  const suggestions: AISuggestion[] = [];
  const lowerText = text.toLowerCase();

  keywords.forEach(keyword => {
    const lowerKeyword = keyword.toLowerCase().trim();
    if (!lowerKeyword) return;

    if (!lowerText.includes(lowerKeyword)) {
      // Find a relevant place to suggest insertion
      const contextVerbs = ['experience with', 'proficient in', 'expertise in', 'knowledge of'];
      const randomContext = contextVerbs[Math.floor(Math.random() * contextVerbs.length)];

      suggestions.push({
        id: generateId(),
        original: '',
        suggested: `Consider adding "${keyword}" — e.g., "Demonstrated ${randomContext} ${keyword}."`,
        type: 'keyword',
        confidence: 0.8,
      });
    }
  });

  return suggestions;
}

export function suggestActionVerbs(description: string): AISuggestion[] {
  const suggestions: AISuggestion[] = [];
  const sentences = description.split(/[.;]/).filter(s => s.trim().length > 5);

  sentences.forEach(sentence => {
    const trimmed = sentence.trim();
    const startsWithAction = actionVerbs.some(v => trimmed.toLowerCase().startsWith(v.toLowerCase()));

    if (!startsWithAction && trimmed.length > 10) {
      const relevantCategory = detectCategory(trimmed);
      const verbs = actionVerbsByCategory[relevantCategory] || actionVerbs.slice(0, 10);
      const suggested = verbs[Math.floor(Math.random() * verbs.length)];

      suggestions.push({
        id: generateId(),
        original: trimmed.split(' ').slice(0, 3).join(' ') + '...',
        suggested: `${suggested} ${trimmed.charAt(0).toLowerCase() + trimmed.slice(1)}`,
        type: 'action-verb',
        confidence: 0.7,
      });
    }
  });

  return suggestions;
}

function detectCategory(text: string): string {
  const lower = text.toLowerCase();
  if (/team|manage|lead|direct|supervis|mentor/.test(lower)) return 'leadership';
  if (/code|develop|build|engineer|architec|program|debug|deploy/.test(lower)) return 'technical';
  if (/increase|reduce|improve|grow|optim|scale|achiev/.test(lower)) return 'achievement';
  if (/creat|design|innovat|invent|launch|pioneer/.test(lower)) return 'innovation';
  if (/present|communicat|collaborat|negoti|meet/.test(lower)) return 'communication';
  return 'achievement';
}

export function analyzeReadability(text: string): { score: number; level: string; suggestion: string } {
  if (!text.trim()) return { score: 0, level: 'N/A', suggestion: 'Add content to analyze.' };

  const words = text.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const syllables = words.reduce((count, word) => count + countSyllables(word), 0);

  if (words.length === 0 || sentences.length === 0) {
    return { score: 0, level: 'N/A', suggestion: 'Add more content.' };
  }

  // Flesch Reading Ease
  const score = Math.round(
    206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (syllables / words.length)
  );

  const clampedScore = Math.max(0, Math.min(100, score));

  let level: string;
  let suggestion: string;

  if (clampedScore >= 80) {
    level = 'Easy';
    suggestion = 'Consider using more technical vocabulary for a professional tone.';
  } else if (clampedScore >= 60) {
    level = 'Optimal';
    suggestion = 'Great readability for resumes!';
  } else if (clampedScore >= 40) {
    level = 'Moderate';
    suggestion = 'Good professional level. Consider simplifying a few complex phrases.';
  } else {
    level = 'Complex';
    suggestion = 'Shorten sentences and simplify vocabulary for better ATS parsing.';
  }

  return { score: clampedScore, level, suggestion };
}

function countSyllables(word: string): number {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, '');
  if (cleaned.length <= 3) return 1;
  const syllableMatches = cleaned.match(/[aeiouy]+/g);
  let count = syllableMatches ? syllableMatches.length : 1;
  if (cleaned.endsWith('e') && count > 1) count--;
  return Math.max(1, count);
}

// ============================================
// ROLE-SPECIFIC SKILL SUGGESTIONS
// ============================================

const roleSkillMap: Record<string, string[]> = {
  'software engineer': ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'AWS', 'Docker', 'CI/CD', 'REST APIs', 'TypeScript', 'System Design', 'Agile/Scrum'],
  'frontend developer': ['React', 'TypeScript', 'CSS', 'HTML', 'Next.js', 'Tailwind CSS', 'Figma', 'Jest', 'Webpack', 'Responsive Design', 'Accessibility', 'Performance Optimization'],
  'backend developer': ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'GraphQL', 'REST APIs', 'Microservices', 'Message Queues'],
  'data scientist': ['Python', 'R', 'SQL', 'TensorFlow', 'PyTorch', 'Pandas', 'Scikit-learn', 'Tableau', 'Statistics', 'Machine Learning', 'Deep Learning', 'NLP'],
  'product manager': ['Roadmapping', 'User Research', 'A/B Testing', 'Jira', 'SQL', 'Data Analysis', 'Stakeholder Management', 'Agile', 'OKRs', 'Wireframing', 'Market Analysis'],
  'devops engineer': ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'AWS', 'Linux', 'Ansible', 'Jenkins', 'Monitoring', 'Bash', 'Python', 'Infrastructure as Code'],
  'ux designer': ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Design Systems', 'Information Architecture', 'Interaction Design'],
  'project manager': ['Agile', 'Scrum', 'Kanban', 'Jira', 'MS Project', 'Risk Management', 'Stakeholder Communication', 'Budget Management', 'Resource Planning', 'PMP'],
  'marketing manager': ['SEO', 'SEM', 'Google Analytics', 'Content Strategy', 'Social Media', 'Email Marketing', 'CRM', 'A/B Testing', 'Brand Management', 'Campaign Management'],
  'full stack developer': ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'GraphQL', 'REST APIs', 'Git', 'CI/CD', 'System Design'],
};

export function generateSkillSuggestions(jobTitle: string): string[] {
  const lower = jobTitle.toLowerCase().trim();
  for (const [role, skills] of Object.entries(roleSkillMap)) {
    if (lower.includes(role) || role.includes(lower)) {
      return skills;
    }
  }
  // Partial match
  for (const [role, skills] of Object.entries(roleSkillMap)) {
    const words = role.split(' ');
    if (words.some(w => lower.includes(w))) {
      return skills;
    }
  }
  return ['Communication', 'Problem Solving', 'Teamwork', 'Leadership', 'Time Management', 'Critical Thinking', 'Adaptability'];
}

// ============================================
// COVER LETTER GENERATOR
// ============================================

export function generateCoverLetter(data: ResumeData): string {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const role = data.targetJob || (data.workExperience[0]?.position || 'the open position');
  const recipient = 'Hiring Manager';
  const years = data.workExperience.length > 1 ? `${data.workExperience.length}+ years` : 'extensive experience';
  const topSkills = data.skills.split(',').slice(0, 3).map(s => s.trim()).filter(Boolean).join(', ');

  return `${data.personalInfo.fullName}
${data.personalInfo.email}${data.personalInfo.phone ? ' | ' + data.personalInfo.phone : ''}
${data.personalInfo.location}

${date}

Dear ${recipient},

I am writing to express my strong interest in the ${role} position. With ${years} of professional experience and a proven track record of delivering high-impact results, I am confident in my ability to make an immediate contribution to your team.

In my recent roles, I have successfully driven key initiatives and collaborated with cross-functional teams to achieve strategic goals.${topSkills ? ` My core competencies in ${topSkills} align perfectly with the requirements of this role.` : ''} I am particularly drawn to your company's innovative approach and am eager to bring my expertise in ${data.workExperience[0]?.position || 'problem solving'} to help advance your mission.

I have attached my resume for your review, which further details my professional background and achievements. I would welcome the opportunity to discuss how my skills and experiences align with your needs in an interview.

Thank you for your time and consideration. I look forward to the possibility of discussing this exciting opportunity with you.

Sincerely,

${data.personalInfo.fullName}`;
}
