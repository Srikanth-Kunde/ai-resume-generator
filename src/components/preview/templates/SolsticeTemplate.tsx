import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function SolsticeTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);

  return (
    <div className="bg-white mx-auto font-sans text-gray-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.6', borderTop: '15px solid var(--color-premium-600, #475569)' }}>
      <header style={{ padding: '60px 80px 40px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.05em' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', marginTop: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{data.targetJob}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '30px', color: '#64748b', fontSize: '10px', fontWeight: 700 }}>
          {data.personalInfo.email && <div>EMAIL: <span style={{ color: '#0f172a' }}>{data.personalInfo.email.toUpperCase()}</span></div>}
          {data.personalInfo.phone && <div>PHONE: <span style={{ color: '#0f172a' }}>{data.personalInfo.phone}</span></div>}
          {data.personalInfo.location && <div>LOCATION: <span style={{ color: '#0f172a' }}>{data.personalInfo.location.toUpperCase()}</span></div>}
        </div>
      </header>

      <div style={{ padding: '0 80px 60px' }}>
        <div style={{ height: '1px', background: '#e2e8f0', margin: '40px 0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '60px' }}>
          <div>
            {skills.length > 0 && (
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Expertise</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {skills.map((s, i) => (
                    <div key={i} style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>{s}</div>
                  ))}
                </div>
              </section>
            )}

            {data.education.some(e => e.school) && (
              <section>
                <h2 style={{ fontSize: '11px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Education</h2>
                {data.education.filter(e => e.school).map(edu => (
                  <div key={edu.id} style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>{edu.school}</h4>
                    <p style={{ fontSize: '10px', color: '#64748b' }}>{edu.endDate}</p>
                  </div>
                ))}
              </section>
            )}
          </div>

          <main>
            {summary && (
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Profile</h2>
                <p style={{ fontSize: '12px', color: '#334155', lineHeight: 1.8 }}>{summary}</p>
              </section>
            )}

            {data.workExperience.some(e => e.company) && (
              <section>
                <h2 style={{ fontSize: '11px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>Experience</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  {data.workExperience.filter(e => e.company).map(exp => (
                    <div key={exp.id}>
                      <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>{exp.position}</h3>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', margin: '4px 0 10px' }}>{exp.company} — {exp.startDate} to {exp.current ? 'Present' : exp.endDate}</p>
                      <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {generateBulletPoints(exp.description).map((b, i) => (
                          <li key={i} style={{ fontSize: '12.5px', color: '#334155' }}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
