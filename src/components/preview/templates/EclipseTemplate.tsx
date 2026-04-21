import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function EclipseTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white mx-auto font-sans text-slate-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.5' }}>
      <header style={{ background: '#0f172a', padding: '60px 80px', color: 'white' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, margin: 0, letterSpacing: '-0.05em' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-premium-400, #94a3b8)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{data.targetJob}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', marginTop: '25px', fontSize: '11px', fontWeight: 500, opacity: 0.8 }}>
          {data.personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Linkedin size={12} /> {data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={12} /> {data.personalInfo.website}</span>}
        </div>
      </header>

      <div style={{ padding: '60px 80px', display: 'grid', gridTemplateColumns: '1fr 240px', gap: '60px' }}>
        <main>
          {summary && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '15px' }}>About</h2>
              <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: 1.8 }}>{summary}</p>
            </section>
          )}

          {data.workExperience.some(e => e.company) && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '25px' }}>Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                {data.workExperience.filter(e => e.company).map(exp => (
                  <div key={exp.id}>
                    <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>{exp.position}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-premium-600, #475569)', fontWeight: 800, fontSize: '11px', margin: '4px 0 12px' }}>
                      <span>{exp.company.toUpperCase()}</span>
                      <span>{exp.startDate} – {exp.current ? 'PRESENT' : exp.endDate.toUpperCase()}</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {generateBulletPoints(exp.description).map((b, i) => (
                        <li key={i} style={{ fontSize: '12px', color: '#334155', lineHeight: 1.5 }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects.some(p => p.name) && (
            <section>
              <h2 style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '25px' }}>Projects</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {data.projects.filter(p => p.name).map(proj => (
                  <div key={proj.id}>
                    <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>{proj.name}</h3>
                    {proj.technologies && <div style={{ color: 'var(--color-premium-500, #64748b)', fontWeight: 800, fontSize: '10px', margin: '4px 0' }}>{proj.technologies}</div>}
                    <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
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

        <aside>
          {skills.length > 0 && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '20px', background: 'var(--color-premium-100, #f1f5f9)', padding: '8px 12px', borderRadius: '4px ' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ fontSize: '10px', color: '#0f172a', fontWeight: 800, background: 'var(--color-premium-50, #f8fafc)', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--color-premium-200, #e2e8f0)' }}>{s}</div>
                ))}
              </div>
            </section>
          )}

          {data.education.some(e => e.school) && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '20px', background: 'var(--color-premium-100, #f1f5f9)', padding: '8px 12px', borderRadius: '4px ' }}>Education</h2>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a' }}>{edu.school}</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{edu.degree}</p>
                  <p style={{ fontSize: '10px', color: '#94a3b8' }}>{edu.endDate}</p>
                </div>
              ))}
            </section>
          )}

          {data.certifications.some(c => c.name) && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '20px', background: 'var(--color-premium-100, #f1f5f9)', padding: '8px 12px', borderRadius: '4px ' }}>Certs</h2>
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
              <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '20px', background: 'var(--color-premium-100, #f1f5f9)', padding: '8px 12px', borderRadius: '4px ' }}>Achievements</h2>
              {achievements.map((a, i) => (
                <div key={i} style={{ fontSize: '10.5px', color: '#334155', marginBottom: '10px' }}>
                  • {a}
                </div>
              ))}
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
