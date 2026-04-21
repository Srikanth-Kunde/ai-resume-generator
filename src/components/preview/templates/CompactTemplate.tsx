import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function CompactTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white p-8 mx-auto font-sans text-gray-900 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '10.5px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 5px' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', color: '#64748b', fontSize: '10px' }}>
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.email && <span>• {data.personalInfo.email}</span>}
          {data.personalInfo.linkedin && <span>• LinkedIn</span>}
          {data.personalInfo.website && <span>• Portfolio</span>}
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: '15px' }}>
          <div style={{ fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-premium-700, #334155)', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', marginBottom: '6px' }}>Summary</div>
          <p style={{ lineHeight: 1.5, margin: 0 }}>{summary}</p>
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: '15px' }}>
          <div style={{ fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-premium-700, #334155)', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', marginBottom: '6px' }}>Skills</div>
          <p style={{ margin: 0, fontWeight: 500 }}>{skills.join(' • ')}</p>
        </section>
      )}

      {data.workExperience.some(e => e.company) && (
        <section style={{ marginBottom: '15px' }}>
          <div style={{ fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-premium-700, #334155)', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', marginBottom: '8px' }}>Experience</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.workExperience.filter(e => e.company).map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '11px' }}>
                  <span>{exp.position}, {exp.company}</span>
                  <span style={{ color: '#64748b' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <ul style={{ margin: '4px 0 0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {generateBulletPoints(exp.description).map((b, i) => (
                    <li key={i} style={{ lineHeight: 1.4 }}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '25px' }}>
        <div>
          {data.projects.some(p => p.name) && (
            <section style={{ marginBottom: '15px' }}>
              <div style={{ fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-premium-700, #334155)', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', marginBottom: '6px' }}>Projects</div>
              {data.projects.filter(p => p.name).map(proj => (
                <div key={proj.id} style={{ marginBottom: '8px' }}>
                  <div style={{ fontWeight: 800 }}>{proj.name} | <span style={{ fontWeight: 500, color: '#64748b' }}>{proj.technologies}</span></div>
                  <ul style={{ margin: '4px 0 0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {generateBulletPoints(proj.description).map((b, i) => (
                      <li key={i} style={{ lineHeight: 1.4 }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {data.education.some(e => e.school) && (
            <section>
              <div style={{ fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-premium-700, #334155)', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', marginBottom: '6px' }}>Education</div>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ marginBottom: '5px' }}>
                  <div style={{ fontWeight: 800 }}>{edu.school}</div>
                  <div style={{ fontSize: '10px' }}>{edu.degree} · {edu.endDate}</div>
                </div>
              ))}
            </section>
          )}

          {(achievements.length > 0 || data.certifications.length > 0) && (
            <section>
              <div style={{ fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-premium-700, #334155)', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', marginBottom: '6px' }}>Other</div>
              <ul style={{ margin: 0, paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {achievements.map((a, i) => <li key={`a-${i}`}>{a}</li>)}
                {data.certifications.filter(c => c.name).map(c => <li key={c.id}>Certified {c.name} ({c.issuer})</li>)}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
