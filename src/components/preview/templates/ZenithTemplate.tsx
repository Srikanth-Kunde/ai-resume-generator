import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function ZenithTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white mx-auto font-sans text-gray-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.6' }}>
      <div style={{ background: 'var(--color-premium-50, #f8fafc)', padding: '50px 60px', borderBottom: '1px solid var(--color-premium-100, #f1f5f9)' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: 0 }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', marginTop: '8px' }}>{data.targetJob}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px', color: '#64748b', fontSize: '11px' }}>
          {data.personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Linkedin size={12} /> {data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={12} /> {data.personalInfo.website}</span>}
        </div>
      </div>

      <div style={{ padding: '40px 60px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '60px' }}>
        <aside>
          {skills.length > 0 && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Expertise</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ padding: '6px 12px', background: 'var(--color-premium-100, #f1f5f9)', borderRadius: '6px', color: '#475569', fontWeight: 600 }}>{s}</div>
                ))}
              </div>
            </section>
          )}

          {data.education.some(e => e.school) && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Academic</h2>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a' }}>{edu.school}</h4>
                  <p style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{edu.degree}</p>
                </div>
              ))}
            </section>
          )}

          {data.certifications.some(c => c.name) && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Certs</h2>
              {data.certifications.filter(c => c.name).map(cert => (
                <div key={cert.id} style={{ marginBottom: '15px' }}>
                  <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>{cert.name}</h4>
                  <p style={{ fontSize: '10px', color: '#64748b' }}>{cert.issuer}</p>
                </div>
              ))}
            </section>
          )}

          {achievements.length > 0 && (
            <section>
              <h2 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Awards</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {achievements.map((a, i) => (
                  <div key={i} style={{ fontSize: '10.5px', color: '#475569' }}>
                    • {a}
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        <main>
          {summary && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '15px', borderLeft: '4px solid var(--color-premium-500, #64748b)', paddingLeft: '15px' }}>About Me</h2>
              <p style={{ fontSize: '12px', color: '#334155', lineHeight: 1.8 }}>{summary}</p>
            </section>
          )}

          {data.workExperience.some(e => e.company) && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '25px', borderLeft: '4px solid var(--color-premium-500, #64748b)', paddingLeft: '15px' }}>Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {data.workExperience.filter(e => e.company).map(exp => (
                  <div key={exp.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{exp.position}</h3>
                      <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
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

          {data.projects.some(p => p.name) && (
            <section>
              <h2 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '25px', borderLeft: '4px solid var(--color-premium-500, #64748b)', paddingLeft: '15px' }}>Projects</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {data.projects.filter(p => p.name).map(proj => (
                  <div key={proj.id}>
                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{proj.name}</h3>
                    {proj.technologies && <div style={{ fontSize: '10px', color: 'var(--color-premium-500, #64748b)', fontWeight: 700, margin: '2px 0 8px' }}>{proj.technologies}</div>}
                    <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {generateBulletPoints(proj.description).map((b, i) => (
                        <li key={i} style={{ fontSize: '11.5px', color: '#334155' }}>{b}</li>
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
