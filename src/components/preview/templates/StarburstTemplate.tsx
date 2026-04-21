import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function StarburstTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);

  return (
    <div className="bg-white mx-auto font-sans text-gray-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.5' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '297mm' }}>
        {/* Sidebar */}
        <aside style={{ background: '#1e293b', color: 'white', padding: '50px 40px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 900, lineHeight: 1.1, margin: 0 }}>{data.personalInfo.fullName || 'Your Name'}</h1>
            <div style={{ height: '4px', width: '40px', background: 'var(--color-premium-400, #94a3b8)', marginTop: '20px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '10px', opacity: 0.8, marginBottom: '40px' }}>
            {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
            {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          </div>

          {skills.length > 0 && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Expertise</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ fontSize: '11px', opacity: 0.9 }}>{s}</div>
                ))}
              </div>
            </section>
          )}

          {data.education.some(e => e.school) && (
            <section>
              <h2 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Education</h2>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800 }}>{edu.school}</div>
                  <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '2px' }}>{edu.degree}</div>
                </div>
              ))}
            </section>
          )}
        </aside>

        {/* Main */}
        <main style={{ padding: '50px' }}>
          <h1 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-premium-600, #475569)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '30px' }}>{data.targetJob}</h1>

          {summary && (
            <section style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.8 }}>{summary}</p>
            </section>
          )}

          {data.workExperience.some(e => e.company) && (
            <section>
              <h2 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '25px', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px' }}>Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {data.workExperience.filter(e => e.company).map(exp => (
                  <div key={exp.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{exp.position}</h3>
                      <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-premium-500, #64748b)', margin: '4px 0 12px' }}>{exp.company}</p>
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
      </div>
    </div>
  );
}
