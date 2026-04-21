import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function LunaTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);

  return (
    <div className="bg-white mx-auto font-sans text-gray-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.5' }}>
      <div style={{ background: 'var(--color-premium-700, #334155)', padding: '40px 60px', color: 'white' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, margin: 0 }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-premium-300, #cbd5e1)', marginTop: '4px' }}>{data.targetJob}</p>
        <div style={{ display: 'flex', gap: '20px', marginTop: '15px', fontSize: '10px', fontWeight: 600, opacity: 0.9 }}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      <div style={{ padding: '40px 60px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '50px' }}>
        <main>
          {summary && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>Overview</h2>
              <p style={{ fontSize: '12px', color: '#1e293b', lineHeight: 1.6 }}>{summary}</p>
            </section>
          )}

          {data.workExperience.some(e => e.company) && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '15px' }}>Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {data.workExperience.filter(e => e.company).map(exp => (
                  <div key={exp.id}>
                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{exp.position}</h3>
                    <div style={{ color: 'var(--color-premium-600, #475569)', fontWeight: 700, margin: '2px 0 8px' }}>{exp.company} — {exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                    <ul style={{ margin: 0, paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {generateBulletPoints(exp.description).map((b, i) => (
                        <li key={i} style={{ fontSize: '11.5px', color: '#334155' }}>• {b}</li>
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
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>Competencies</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map((s, i) => (
                  <span key={i} style={{ padding: '4px 10px', background: 'var(--color-premium-50, #f8fafc)', borderRadius: '4px', border: '1px solid var(--color-premium-100, #f1f5f9)', color: 'var(--color-premium-700, #334155)', fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </section>
          )}

          {data.education.some(e => e.school) && (
            <section>
              <h2 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>Education</h2>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <h4 style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a' }}>{edu.school}</h4>
                  <p style={{ fontSize: '10.5px', color: '#64748b' }}>{edu.degree}</p>
                </div>
              ))}
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
