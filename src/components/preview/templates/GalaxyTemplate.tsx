import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function GalaxyTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);

  const Diamond = () => (
    <div style={{ width: '6px', height: '6px', background: 'var(--color-premium-600, #475569)', transform: 'rotate(45deg)', alignSelf: 'center' }} />
  );

  return (
    <div className="bg-white p-12 mx-auto font-serif text-slate-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11.5px', lineHeight: '1.6' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '4px', textTransform: 'uppercase' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', marginTop: '8px', letterSpacing: '4px', textTransform: 'uppercase' }}>{data.targetJob}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', color: '#64748b', fontSize: '11px' }}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
        {summary && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-premium-200, #e2e8f0)' }} />
              <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px' }}>Summary</h2>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-premium-200, #e2e8f0)' }} />
            </div>
            <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#334155', maxWidth: '600px', margin: '0 auto' }}>{summary}</p>
          </section>
        )}

        {data.workExperience.some(e => e.company) && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-premium-200, #e2e8f0)' }} />
              <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px' }}>Experience</h2>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-premium-200, #e2e8f0)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {data.workExperience.filter(e => e.company).map(exp => (
                <div key={exp.id} style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px' }}>{exp.position} — {exp.company}</h3>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', marginBottom: '10px' }}>{exp.startDate.toUpperCase()} — {exp.current ? 'PRESENT' : exp.endDate.toUpperCase()}</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                    {generateBulletPoints(exp.description).map((b, i) => (
                      <li key={i} style={{ fontSize: '12px', color: '#334155', maxWidth: '600px' }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          {skills.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-premium-200, #e2e8f0)' }} />
                <h2 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px' }}>Skills</h2>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-premium-200, #e2e8f0)' }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Diamond />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#334155' }}>{s}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.some(e => e.school) && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-premium-200, #e2e8f0)' }} />
                <h2 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px' }}>Education</h2>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-premium-200, #e2e8f0)' }} />
              </div>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ textAlign: 'center', marginBottom: '10px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a' }}>{edu.school}</h4>
                  <p style={{ fontSize: '11px', color: 'var(--color-premium-600, #475569)' }}>{edu.degree} · {edu.endDate}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
