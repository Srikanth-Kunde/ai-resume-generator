import { Linkedin, Globe, Trophy } from 'lucide-react';
import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function ProfessionalTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white p-12 mx-auto font-serif text-slate-900 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', borderTop: '8px solid var(--color-premium-700, #334155)' }}>
      {/* Split Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '2px' }}>{data.targetJob}</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: '10px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {data.personalInfo.location && <div style={{ fontWeight: 600 }}>{data.personalInfo.location}</div>}
          {data.personalInfo.email && <div style={{ textDecoration: 'underline' }}>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
            {data.personalInfo.linkedin && <Linkedin style={{ width: 10, height: 10 }} />}
            {data.personalInfo.website && <Globe style={{ width: 10, height: 10 }} />}
          </div>
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: '25px' }}>
          <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#334155', borderLeft: '3px solid var(--color-premium-100, #f1f5f9)', paddingLeft: '15px', fontStyle: 'italic' }}>
            {summary}
          </p>
        </section>
      )}

      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
        {skills.length > 0 && (
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Core Competencies</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {skills.map((s, i) => (
                <div key={i} style={{ fontSize: '10.5px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '4px', height: '4px', background: 'var(--color-premium-400, #94a3b8)' }} /> {s}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.workExperience.some(e => e.company) && (
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Professional Milestones</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {data.workExperience.filter(e => e.company).map(exp => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{exp.company}</h3>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>{exp.startDate} — {exp.current ? 'PRESENT' : exp.endDate.toUpperCase()}</span>
                  </div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', marginBottom: '8px', fontStyle: 'italic' }}>{exp.position}</p>
                  <ul style={{ margin: 0, paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {generateBulletPoints(exp.description).map((b, i) => (
                      <li key={i} style={{ fontSize: '11px', color: '#334155', lineHeight: 1.5 }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
          <div>
            {data.projects.some(p => p.name) && (
              <section style={{ marginBottom: '25px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Strategic Projects</h2>
                {data.projects.filter(p => p.name).map(proj => (
                  <div key={proj.id} style={{ marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a' }}>{proj.name}</h3>
                    <p style={{ fontSize: '10.5px', color: '#475569', lineHeight: 1.5, marginTop: '2px' }}>{generateBulletPoints(proj.description)[0]}</p>
                  </div>
                ))}
              </section>
            )}

            {data.education.some(e => e.school) && (
              <section>
                <h2 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Academic Background</h2>
                {data.education.filter(e => e.school).map(edu => (
                  <div key={edu.id} style={{ marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a' }}>{edu.school}</h4>
                    <p style={{ fontSize: '10.5px', color: '#475569', margin: '1px 0' }}>{edu.degree} · {edu.endDate}</p>
                  </div>
                ))}
              </section>
            )}
          </div>

          <aside>
            {achievements.length > 0 && (
              <section style={{ marginBottom: '25px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Key Awards</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {achievements.map((a, i) => (
                    <div key={i} style={{ fontSize: '10.5px', color: '#475569', lineHeight: 1.4, display: 'flex', gap: '8px' }}>
                      <Trophy style={{ width: 12, height: 12, color: 'var(--color-premium-500, #64748b)', flexShrink: 0 }} /> {a}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.certifications.some(c => c.name) && (
              <section>
                <h2 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Certifications</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {data.certifications.filter(c => c.name).map(cert => (
                    <div key={cert.id} style={{ fontSize: '10.5px', color: '#475569' }}>
                      <strong>{cert.name}</strong><br/>
                      <span style={{ fontSize: '9px', color: '#94a3b8' }}>{cert.issuer}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
