import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  const h2Style: React.CSSProperties = { fontSize: '11px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', paddingBottom: '4px', borderBottom: '2px solid #0f172a' };

  return (
    <div style={{ background: 'white', maxWidth: '210mm', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif", color: '#1e293b', fontSize: '11px', lineHeight: 1.55, minHeight: '297mm' }}>
      {/* Dark header */}
      <header style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '32px 36px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        {data.targetJob && <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 500, margin: '4px 0 0' }}>{data.targetJob}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px', fontSize: '10px', color: '#cbd5e1' }}>
          {data.personalInfo.email && <span>✉ {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>☎ {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>◉ {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>⬢ {data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span>◎ {data.personalInfo.website}</span>}
        </div>
      </header>

      <div style={{ padding: '28px 36px' }}>
        {summary && (
          <section style={{ marginBottom: '18px', padding: '14px 16px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #0f172a' }}>
            <h2 style={{ fontSize: '10px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>Executive Summary</h2>
            <p style={{ color: '#334155', lineHeight: 1.65 }}>{summary}</p>
          </section>
        )}

        {data.workExperience.some(e => e.company) && (
          <section style={{ marginBottom: '18px' }}>
            <h2 style={h2Style}>Professional Experience</h2>
            {data.workExperience.filter(e => e.company).map(exp => (
              <div key={exp.id} style={{ marginBottom: '14px', paddingLeft: '14px', borderLeft: '2px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#475569', margin: '1px 0 6px' }}>{exp.company}</p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {generateBulletPoints(exp.description).map((b, i) => (
                    <li key={i} style={{ color: '#334155', display: 'flex', gap: '6px' }}>
                      <span style={{ color: '#0f172a', fontWeight: 700 }}>›</span><span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            {data.education.some(e => e.school) && (
              <section style={{ marginBottom: '16px' }}>
                <h2 style={h2Style}>Education</h2>
                {data.education.filter(e => e.school).map(edu => (
                  <div key={edu.id} style={{ marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                    <p style={{ fontSize: '10px', color: '#475569', margin: 0 }}>{edu.school}</p>
                    <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>{edu.startDate} – {edu.endDate}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                  </div>
                ))}
              </section>
            )}

            {data.certifications.some(c => c.name) && (
              <section>
                <h2 style={h2Style}>Certifications</h2>
                {data.certifications.filter(c => c.name).map(cert => (
                  <div key={cert.id} style={{ marginBottom: '4px' }}>
                    <strong style={{ fontSize: '11px', color: '#0f172a' }}>{cert.name}</strong>
                    <p style={{ fontSize: '10px', color: '#64748b', margin: 0 }}>{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </section>
            )}
          </div>

          <div>
            {skills.length > 0 && (
              <section style={{ marginBottom: '16px' }}>
                <h2 style={h2Style}>Core Competencies</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
                  {skills.map((s, i) => (
                    <span key={i} style={{ fontSize: '10px', color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0f172a', flexShrink: 0 }} />{s}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {achievements.length > 0 && (
              <section>
                <h2 style={h2Style}>Key Achievements</h2>
                {achievements.map((ach, i) => (
                  <div key={i} style={{ fontSize: '10px', color: '#334155', display: 'flex', gap: '6px', marginBottom: '3px' }}>
                    <span style={{ color: '#0f172a', fontWeight: 700 }}>★</span><span>{ach}</span>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>

        {data.projects.some(p => p.name) && (
          <section style={{ marginTop: '16px' }}>
            <h2 style={h2Style}>Notable Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {data.projects.filter(p => p.name).map(proj => (
                <div key={proj.id} style={{ padding: '10px', background: '#f8fafc', borderRadius: '6px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{proj.name}</h3>
                  {proj.technologies && <p style={{ fontSize: '9px', color: '#64748b', margin: '1px 0 4px' }}>{proj.technologies}</p>}
                  {generateBulletPoints(proj.description).slice(0, 2).map((b, i) => (
                    <p key={i} style={{ fontSize: '10px', color: '#475569', margin: '0 0 2px' }}>{b}</p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
