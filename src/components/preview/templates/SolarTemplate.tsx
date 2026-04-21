import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function SolarTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white mx-auto font-sans text-gray-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.6' }}>
      <header style={{ background: 'var(--color-premium-900, #0f172a)', padding: '50px 60px', color: 'white' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
          <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-premium-400, #94a3b8)', margin: 0 }}>{data.targetJob}</p>
          <div style={{ display: 'flex', gap: '15px', fontSize: '10px' }}>
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 240px' }}>
        <main style={{ padding: '40px 40px 40px 60px' }}>
          {summary && (
            <section style={{ marginBottom: '40px' }}>
              <div style={{ width: '40px', height: '4px', background: 'var(--color-premium-600, #475569)', marginBottom: '15px' }} />
              <p style={{ fontSize: '13px', color: '#1e293b', fontWeight: 500, lineHeight: 1.8 }}>{summary}</p>
            </section>
          )}

          {data.workExperience.some(e => e.company) && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                 Experience <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {data.workExperience.filter(e => e.company).map(exp => (
                  <div key={exp.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{exp.position}</h3>
                      <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>{exp.startDate} – {exp.current ? 'PRESENT' : exp.endDate.toUpperCase()}</span>
                    </div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', margin: '4px 0 12px' }}>{exp.company}</p>
                    <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {generateBulletPoints(exp.description).map((b, i) => (
                        <li key={i} style={{ fontSize: '12px', color: '#334155' }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside style={{ background: 'var(--color-premium-50, #f8fafc)', padding: '40px 40px 40px 30px', borderLeft: '1px solid #e2e8f0' }}>
          {skills.length > 0 && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Expertise</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ fontSize: '11px', color: '#444', fontWeight: 600, background: 'white', padding: '6px 12px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>{s}</div>
                ))}
              </div>
            </section>
          )}

          {data.education.some(e => e.school) && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Training</h2>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <h4 style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a' }}>{edu.school}</h4>
                  <p style={{ fontSize: '10px', color: '#64748b', margin: '2px 0' }}>{edu.degree}</p>
                </div>
              ))}
            </section>
          )}

          {achievements.length > 0 && (
            <section>
              <h2 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Spotlight</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {achievements.map((a, i) => (
                  <div key={i} style={{ fontSize: '10px', color: '#555', lineHeight: '1.4' }}>• {a}</div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
