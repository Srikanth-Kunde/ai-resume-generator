import type { ResumeData } from '../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from './ai-engine';

// ============================================
// PDF EXPORT (html2canvas + jsPDF)
// ============================================

export async function downloadPDF(
  element: HTMLElement,
  fileName: string,
  onProgress?: (msg: string) => void
): Promise<void> {
  try {
    onProgress?.('Preparing high-quality PDF...');

    // Robust dynamic imports
    const html2canvasModule = await import('html2canvas');
    const html2canvas = html2canvasModule.default || html2canvasModule;
    
    const jspdfModule = await import('jspdf');
    const jsPDF = jspdfModule.jsPDF || jspdfModule.default || jspdfModule;

    const canvas = await html2canvas(element, {
      scale: 1.5, // Slightly lower scale for better performance and reliability
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (_clonedDoc, clonedElement) => {
        // Ensure the element has a stable width for capture regardless of screen size
        clonedElement.style.width = '210mm';
        clonedElement.style.height = 'auto';
        clonedElement.style.position = 'relative';
        clonedElement.style.top = '0';
        clonedElement.style.left = '0';
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    const pageHeight = pdf.internal.pageSize.getHeight();

    let heightLeft = pdfHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Add subsequent pages if content overflows
    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);
    onProgress?.('PDF downloaded successfully! ✅');
  } catch (error) {
    console.error('PDF export failed:', error);
    onProgress?.('PDF export failed. Please try again.');
  }
}

// ============================================
// DOCX EXPORT (HTML-based)
// ============================================

export function downloadDOCX(data: ResumeData, onProgress?: (msg: string) => void): void {
  onProgress?.('Generating Word document...');

  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const skills = processSkills(data.skills);
  const achievements = processAchievements(data.achievements);
  const pi = data.personalInfo;

  const accentColor = '#475569';

  const doc = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
<head><meta charset="utf-8"><title>Resume</title>
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.6; color: #333; margin: 40px; }
  h1 { margin: 0; color: #1a1a2e; font-size: 24pt; letter-spacing: -0.5px; }
  h2 { color: ${accentColor}; font-size: 12pt; text-transform: uppercase; margin: 16px 0 6px; border-bottom: 2px solid ${accentColor}; padding-bottom: 3px; letter-spacing: 1px; }
  .contact { color: #666; font-size: 10pt; margin: 4px 0 0; }
  .meta { color: #888; font-size: 9pt; }
  ul { margin: 4px 0; padding-left: 18px; }
  li { margin-bottom: 3px; }
  strong { color: #1a1a2e; }
</style>
</head>
<body>

<h1>${pi.fullName || 'Your Name'}</h1>
<p class="contact">${[pi.email, pi.phone, pi.location, pi.linkedin, pi.website].filter(Boolean).join(' | ')}</p>
<hr style="border: 1px solid ${accentColor}; margin: 12px 0;">

${summary ? `<h2>Professional Summary</h2><p>${summary}</p>` : ''}

${skills.length ? `<h2>Technical Skills</h2><p>${skills.join(' • ')}</p>` : ''}

${data.workExperience.filter(e => e.company).length ? `<h2>Professional Experience</h2>
${data.workExperience.filter(e => e.company).map(exp => `
<p><strong>${exp.position}</strong> | ${exp.company} <span class="meta">| ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span></p>
<ul>${generateBulletPoints(exp.description).map(b => `<li>${b}</li>`).join('')}</ul>
`).join('')}` : ''}

${data.projects.filter(p => p.name).length ? `<h2>Projects</h2>
${data.projects.filter(p => p.name).map(proj => `
<p><strong>${proj.name}</strong>${proj.technologies ? ` <span class="meta">| ${proj.technologies}</span>` : ''}</p>
<ul>${generateBulletPoints(proj.description).map(b => `<li>${b}</li>`).join('')}</ul>
`).join('')}` : ''}

${data.education.filter(e => e.school).length ? `<h2>Education</h2>
${data.education.filter(e => e.school).map(edu => `
<p><strong>${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</strong> | ${edu.school} <span class="meta">| ${edu.startDate} - ${edu.endDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</span></p>
${edu.highlights ? `<p class="meta">${edu.highlights}</p>` : ''}
`).join('')}` : ''}

${data.certifications.filter(c => c.name).length ? `<h2>Certifications</h2>
${data.certifications.filter(c => c.name).map(cert => `<p><strong>${cert.name}</strong> - ${cert.issuer} (${cert.date})</p>`).join('')}` : ''}

${achievements.length ? `<h2>Achievements</h2>
<ul>${achievements.map(a => `<li>${a}</li>`).join('')}</ul>` : ''}

</body></html>`;

  const blob = new Blob([doc], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = pi.fullName
    ? `${pi.fullName.replace(/\s+/g, '_')}_Resume.doc`
    : 'Resume.doc';
  a.click();
  URL.revokeObjectURL(url);

  onProgress?.('Document downloaded! ✅');
}
