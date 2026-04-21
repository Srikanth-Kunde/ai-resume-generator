import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function EclipseTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);

  return (
    <div className="bg-white mx-auto font-sans text-slate-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.5' }}>
      <header style={{ background: '#0f172a', padding: '60px 80px', color: 'white' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, margin: 0, letterSpacing: '-0.05em' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-premium-400, #94a3b8)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{data.targetJob}</p>
        <div style={{ display: 'flex', gap: '25px', marginTop: '25px', fontSize: '11px', fontWeight: 500, opacity: 0.8 }}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </header>

      <div style={{ padding: '60px 80px', display: 'grid', gridTemplateColumns: '1fr 240px', gap: '60px' }}>
        <main>
          {summary && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '15px' }}>About</h2>
              <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: 1.8 }}>{summary}</p>
            </section>
          )}

          {data.workExperience.some(e => e.company) && (
            <section>
              <h2 style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '25px' }}>Professional Background</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                {data.workExperience.filter(e => e.company).map(exp => (
                  <div key={exp.id}>
                    <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>{exp.position}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-premium-600, #475569)', fontWeight: 800, fontSize: '11px', margin: '4px 0 12px' }}>
                      <span>{exp.company.toUpperCase()}</span>
                      <span>{exp.startDate} – {exp.current ? 'PRESENT' : exp.endDate.toUpperCase()}</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {generateBulletPoints(exp.description).map((b, i) => (
                        <li key={i} style={{ fontSize: '12px', color: '#334155', lineHeight: 1.5 }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside>
          {skills.length > 0 && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '20px', background: 'var(--color-premium-100, #f1f5f9)', padding: '8px 12px', borderRadius: '4px ' }}>Skills</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ fontSize: '11px', color: '#475569', fontWeight: 700 }}>• {s}</div>
                ))}
              </div>
            </section>
          )}

          {data.education.some(e => e.school) && (
            <section>
              <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '20px', background: 'var(--color-premium-100, #f1f5f9)', padding: '8px 12px', borderRadius: '4px ' }}>Education</h2>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a' }}>{edu.school}</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{edu.degree}</p>
                </div>
              ))}
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
