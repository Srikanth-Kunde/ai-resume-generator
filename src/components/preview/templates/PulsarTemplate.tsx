import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function PulsarTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);

  return (
    <div className="bg-white mx-auto font-sans text-gray-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.5' }}>
      <header style={{ background: 'var(--color-premium-600, #475569)', padding: '60px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '42px', fontWeight: 900, margin: 0 }}>{data.personalInfo.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-premium-200, #e2e8f0)', marginTop: '4px' }}>{data.targetJob}</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: '11px', fontWeight: 600, background: 'rgba(0,0,0,0.1)', padding: '15px', borderRadius: '10px' }}>
          {data.personalInfo.email && <div style={{ marginBottom: '4px' }}>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div style={{ marginBottom: '4px' }}>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
        </div>
      </header>

      <div style={{ padding: '60px' }}>
        <main>
          {summary && (
            <section style={{ marginBottom: '45px' }}>
              <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--color-premium-600, #475569)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '15px' }}>01. Profile</div>
              <p style={{ fontSize: '14px', color: '#1e293b', fontWeight: 500, lineHeight: 1.7 }}>{summary}</p>
            </section>
          )}

          {data.workExperience.some(e => e.company) && (
            <section style={{ marginBottom: '45px' }}>
              <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--color-premium-600, #475569)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '25px' }}>02. Experience</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                {data.workExperience.filter(e => e.company).map((exp) => (
                  <div key={exp.id} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '30px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8' }}>{exp.startDate.toUpperCase()} — {exp.current ? 'PRESENT' : exp.endDate.toUpperCase()}</div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{exp.position}</h3>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-premium-500, #64748b)', margin: '4px 0 12px' }}>{exp.company}</p>
                      <ul style={{ margin: 0, paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {generateBulletPoints(exp.description).map((b, i) => (
                          <li key={i} style={{ fontSize: '12px', color: '#334155' }}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            {skills.length > 0 && (
              <section>
                <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--color-premium-600, #475569)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px' }}>03. Expertise</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {skills.map((s, i) => (
                    <span key={i} style={{ padding: '6px 12px', background: 'var(--color-premium-50, #f8fafc)', borderRadius: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-700, #334155)', border: '1px solid var(--color-premium-100, #f1f5f9)' }}>{s}</span>
                  ))}
                </div>
              </section>
            )}

            {data.education.some(e => e.school) && (
              <section>
                <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--color-premium-600, #475569)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px' }}>04. Training</div>
                {data.education.filter(e => e.school).map(edu => (
                  <div key={edu.id} style={{ marginBottom: '15px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{edu.school}</h4>
                    <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{edu.degree} · {edu.endDate}</p>
                  </div>
                ))}
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
