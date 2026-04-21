import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function HyperionTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white p-16 mx-auto font-sans text-slate-900 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '12px', lineHeight: '1.6' }}>
      <header style={{ marginBottom: '60px' }}>
        <h1 style={{ fontSize: '56px', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.06em', textTransform: 'uppercase' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '10px' }}>
          <p style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-premium-600, #475569)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{data.targetJob}</p>
          <div style={{ textAlign: 'right', fontSize: '10px', color: '#94a3b8', display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'flex-end' }}>
            {data.personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={10} /> {data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={10} /> {data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={10} /> {data.personalInfo.location}</span>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '15px', marginTop: '10px', fontSize: '10px', color: '#94a3b8' }}>
          {data.personalInfo.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Linkedin size={10} /> {data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={10} /> {data.personalInfo.website}</span>}
        </div>
        <div style={{ height: '8px', background: 'var(--color-premium-600, #475569)', width: '60px', marginTop: '30px' }} />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
        {summary && (
          <section>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginBottom: '15px', letterSpacing: '-0.04em' }}>The Profile</h2>
            <p style={{ fontSize: '14px', color: '#334155', fontWeight: 500, lineHeight: 1.8 }}>{summary}</p>
          </section>
        )}

        {data.workExperience.some(e => e.company) && (
          <section>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginBottom: '30px', letterSpacing: '-0.04em' }}>The Journey</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {data.workExperience.filter(e => e.company).map(exp => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>{exp.position}</h3>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-premium-500, #64748b)' }}>{exp.startDate} / {exp.current ? 'NOW' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', margin: '4px 0 15px' }}>{exp.company}</p>
                  <ul style={{ margin: 0, paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {generateBulletPoints(exp.description).map((b, i) => (
                      <li key={i} style={{ fontSize: '12.5px', color: '#334155' }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.some(p => p.name) && (
          <section>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginBottom: '30px', letterSpacing: '-0.04em' }}>The Projects</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {data.projects.filter(p => p.name).map(proj => (
                <div key={proj.id}>
                  <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a' }}>{proj.name}</h3>
                  {proj.technologies && <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-500, #64748b)', margin: '4px 0' }}>{proj.technologies}</div>}
                  <p style={{ fontSize: '12.5px', color: '#334155' }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
          <div>
            {skills.length > 0 && (
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginBottom: '20px', letterSpacing: '-0.04em' }}>The Toolkit</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                  {skills.map((s, i) => (
                    <div key={i}>
                      <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{s}</div>
                      <div style={{ width: '20px', height: '2px', background: 'var(--color-premium-600, #475569)', marginTop: '4px' }} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.education.some(e => e.school) && (
              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginBottom: '20px', letterSpacing: '-0.04em' }}>The Education</h2>
                {data.education.filter(e => e.school).map(edu => (
                  <div key={edu.id} style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a' }}>{edu.school}</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-premium-600, #475569)' }}>{edu.degree} · {edu.endDate}</div>
                  </div>
                ))}
              </section>
            )}
          </div>

          <div>
            {data.certifications.some(c => c.name) && (
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginBottom: '20px', letterSpacing: '-0.04em' }}>The Certs</h2>
                {data.certifications.filter(c => c.name).map(cert => (
                  <div key={cert.id} style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{cert.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{cert.issuer}</div>
                  </div>
                ))}
              </section>
            )}

            {achievements.length > 0 && (
              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginBottom: '20px', letterSpacing: '-0.04em' }}>The Highlights</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {achievements.map((a, i) => (
                    <div key={i} style={{ fontSize: '12px', color: '#334155', fontWeight: 500 }}>
                      • {a}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
