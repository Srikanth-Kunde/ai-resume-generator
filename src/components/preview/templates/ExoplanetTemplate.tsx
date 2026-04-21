import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function ExoplanetTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);

  return (
    <div className="bg-white p-20 mx-auto font-sans text-slate-700 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.8' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 300, color: '#0f172a', margin: 0, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-premium-500, #64748b)', marginTop: '12px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>{data.targetJob}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px', color: '#94a3b8', fontSize: '10px' }}>
          {data.personalInfo.email && <span style={{ letterSpacing: '0.05em' }}>{data.personalInfo.email.toUpperCase()}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span style={{ letterSpacing: '0.05em' }}>{data.personalInfo.location.toUpperCase()}</span>}
        </div>
      </header>

      <section style={{ marginBottom: '50px', textAlign: 'center' }}>
        <p style={{ fontSize: '12.5px', color: '#475569', maxWidth: '560px', margin: '0 auto', fontStyle: 'italic' }}>{summary}</p>
      </section>

      {data.workExperience.some(e => e.company) && (
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 900, color: 'var(--color-premium-600, #475569)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '30px', textAlign: 'center' }}>Professional Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {data.workExperience.filter(e => e.company).map(exp => (
              <div key={exp.id}>
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-500, #64748b)', margin: '6px 0' }}>{exp.company.toUpperCase()} / {exp.startDate} – {exp.current ? 'PRESENT' : exp.endDate.toUpperCase()}</div>
                </div>
                <ul style={{ margin: '0 auto', maxWidth: '580px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'center' }}>
                  {generateBulletPoints(exp.description).map((b, i) => (
                    <li key={i} style={{ fontSize: '11.5px', color: '#475569' }}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 900, color: 'var(--color-premium-600, #475569)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px' }}>The Toolkit</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {skills.map((s, i) => (
              <div key={i} style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>{s.toUpperCase()}</div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
