import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  const h2Style: React.CSSProperties = { fontSize: '11px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px', borderBottom: '1px solid #94a3b8', paddingBottom: '3px' };

  return (
    <div style={{ background: 'white', padding: '36px', maxWidth: '210mm', margin: '0 auto', fontFamily: 'Georgia, "Times New Roman", serif', color: '#1e293b', fontSize: '11px', lineHeight: 1.55, minHeight: '297mm' }}>
      <header style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '14px', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '3px', margin: 0 }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        {data.targetJob && <p style={{ fontSize: '12px', color: '#475569', fontStyle: 'italic', margin: '4px 0 0' }}>{data.targetJob}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '8px', fontSize: '10px', color: '#64748b' }}>
          {[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean).join(' | ')}
        </div>
        <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
          {[data.personalInfo.linkedin, data.personalInfo.website].filter(Boolean).join(' | ')}
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: '14px' }}>
          <h2 style={h2Style}>Summary</h2>
          <p style={{ textAlign: 'justify', color: '#334155', lineHeight: 1.65 }}>{summary}</p>
        </section>
      )}

      {data.workExperience.some(e => e.company) && (
        <section style={{ marginBottom: '14px' }}>
          <h2 style={h2Style}>Professional Experience</h2>
          {data.workExperience.filter(e => e.company).map(exp => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ color: '#0f172a' }}>{exp.position}</strong>
                <span style={{ fontSize: '10px', color: '#64748b', fontStyle: 'italic' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ fontStyle: 'italic', color: '#475569', fontSize: '11px', margin: '1px 0 4px' }}>{exp.company}</p>
              <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'disc' }}>
                {generateBulletPoints(exp.description).map((b, i) => (
                  <li key={i} style={{ color: '#334155', marginBottom: '2px' }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {data.education.some(e => e.school) && (
        <section style={{ marginBottom: '14px' }}>
          <h2 style={h2Style}>Education</h2>
          {data.education.filter(e => e.school).map(edu => (
            <div key={edu.id} style={{ marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
                <span style={{ fontSize: '10px', color: '#64748b', fontStyle: 'italic' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p style={{ fontStyle: 'italic', color: '#475569', margin: '1px 0' }}>{edu.school}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: '14px' }}>
          <h2 style={h2Style}>Skills</h2>
          <p style={{ color: '#334155' }}>{skills.join(' • ')}</p>
        </section>
      )}

      {data.projects.some(p => p.name) && (
        <section style={{ marginBottom: '14px' }}>
          <h2 style={h2Style}>Projects</h2>
          {data.projects.filter(p => p.name).map(proj => (
            <div key={proj.id} style={{ marginBottom: '8px' }}>
              <strong style={{ color: '#0f172a' }}>{proj.name}</strong>
              {proj.technologies && <span style={{ color: '#64748b', fontWeight: 400 }}> ({proj.technologies})</span>}
              <ul style={{ margin: '2px 0 0', paddingLeft: '16px', listStyleType: 'disc' }}>
                {generateBulletPoints(proj.description).map((b, i) => (
                  <li key={i} style={{ color: '#334155', marginBottom: '2px' }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {data.certifications.some(c => c.name) && (
        <section style={{ marginBottom: '14px' }}>
          <h2 style={h2Style}>Certifications</h2>
          {data.certifications.filter(c => c.name).map(cert => (
            <div key={cert.id} style={{ marginBottom: '3px', color: '#334155' }}>
              <strong>{cert.name}</strong>, {cert.issuer} ({cert.date})
            </div>
          ))}
        </section>
      )}

      {achievements.length > 0 && (
        <section style={{ marginBottom: '14px' }}>
          <h2 style={h2Style}>Achievements</h2>
          <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'disc' }}>
            {achievements.map((ach, i) => (
              <li key={i} style={{ color: '#334155', marginBottom: '2px' }}>{ach}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
