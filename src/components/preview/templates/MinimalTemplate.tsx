import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  const h2Style: React.CSSProperties = { fontSize: '10px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2.5px', marginBottom: '8px' };

  return (
    <div style={{ background: 'white', padding: '44px', maxWidth: '210mm', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif", color: '#475569', fontSize: '11px', lineHeight: 1.65, minHeight: '297mm' }}>
      <header style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 300, color: '#0f172a', letterSpacing: '0.5px', margin: 0 }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        {data.targetJob && <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500, margin: '4px 0 0', letterSpacing: '0.5px' }}>{data.targetJob}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', fontSize: '10px', color: '#94a3b8' }}>
          {[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location, data.personalInfo.linkedin, data.personalInfo.website].filter(Boolean).map((info, i) => (
            <span key={i}>{i > 0 ? '· ' : ''}{info}</span>
          ))}
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: '20px' }}>
          <p style={{ color: '#64748b', lineHeight: 1.7 }}>{summary}</p>
        </section>
      )}

      {data.workExperience.some(e => e.company) && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={h2Style}>Experience</h2>
          {data.workExperience.filter(e => e.company).map(exp => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a', margin: 0 }}>
                  {exp.position} <span style={{ fontWeight: 400, color: '#94a3b8' }}>@ {exp.company}</span>
                </h3>
                <span style={{ fontSize: '10px', color: '#cbd5e1' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <ul style={{ margin: '4px 0 0', padding: 0, listStyle: 'none' }}>
                {generateBulletPoints(exp.description).map((b, i) => (
                  <li key={i} style={{ color: '#64748b', display: 'flex', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ color: '#cbd5e1' }}>—</span><span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {data.projects.some(p => p.name) && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={h2Style}>Projects</h2>
          {data.projects.filter(p => p.name).map(proj => (
            <div key={proj.id} style={{ marginBottom: '10px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a', margin: 0 }}>{proj.name}</h3>
              {proj.technologies && <p style={{ fontSize: '10px', color: '#94a3b8', margin: '1px 0' }}>{proj.technologies}</p>}
              <ul style={{ margin: '3px 0 0', padding: 0, listStyle: 'none' }}>
                {generateBulletPoints(proj.description).map((b, i) => (
                  <li key={i} style={{ color: '#64748b', display: 'flex', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ color: '#cbd5e1' }}>—</span><span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {data.education.some(e => e.school) && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={h2Style}>Education</h2>
          {data.education.filter(e => e.school).map(edu => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
              <div>
                <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>{edu.school}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
              </div>
              <span style={{ fontSize: '10px', color: '#cbd5e1' }}>{edu.startDate} — {edu.endDate}</span>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={h2Style}>Skills</h2>
          <p style={{ color: '#64748b' }}>{skills.join('  ·  ')}</p>
        </section>
      )}

      {data.certifications.some(c => c.name) && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={h2Style}>Certifications</h2>
          {data.certifications.filter(c => c.name).map(cert => (
            <p key={cert.id} style={{ color: '#64748b', margin: '0 0 3px' }}>
              {cert.name} <span style={{ color: '#cbd5e1' }}>— {cert.issuer}, {cert.date}</span>
            </p>
          ))}
        </section>
      )}

      {achievements.length > 0 && (
        <section>
          <h2 style={h2Style}>Achievements</h2>
          {achievements.map((ach, i) => (
            <p key={i} style={{ color: '#64748b', margin: '0 0 3px' }}>{ach}</p>
          ))}
        </section>
      )}
    </div>
  );
}
