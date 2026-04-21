import { Linkedin, Globe, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function CelestialTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white p-12 mx-auto font-sans text-gray-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.6' }}>
      <header style={{ borderBottom: '3px solid var(--color-premium-600, #475569)', paddingBottom: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.04em' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '2px' }}>{data.targetJob}</p>
        </div>
        <div style={{ textAlign: 'right', color: '#64748b', fontSize: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {data.personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}><MapPin size={10} /> {data.personalInfo.location}</span>}
          {data.personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}><Mail size={10} /> {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}><Phone size={10} /> {data.personalInfo.phone}</span>}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '40px' }}>
        {/* Sidebar */}
        <aside style={{ borderRight: '1px solid var(--color-premium-100, #f1f5f9)', paddingRight: '20px' }}>
          {(data.personalInfo.linkedin || data.personalInfo.website) && (
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-premium-500, #64748b)', letterSpacing: '1px', marginBottom: '10px' }}>Details</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '10px' }}>
                {data.personalInfo.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Linkedin style={{ width: 12, height: 12 }} /> <span>LinkedIn / {data.personalInfo.fullName}</span></div>}
                {data.personalInfo.website && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Globe style={{ width: 12, height: 12 }} /> <span>Portfolio</span></div>}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-premium-500, #64748b)', letterSpacing: '1px', marginBottom: '15px' }}>Skills</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ fontSize: '11px', color: '#334155', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-premium-400, #94a3b8)' }} /> {s}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.some(e => e.school) && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-premium-500, #64748b)', letterSpacing: '1px', marginBottom: '15px' }}>Education</h2>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>{edu.school}</h4>
                  <p style={{ fontSize: '10px', color: 'var(--color-premium-600, #475569)', margin: '2px 0' }}>{edu.degree}</p>
                  <p style={{ fontSize: '9px', color: '#94a3b8' }}>{edu.endDate}</p>
                </div>
              ))}
            </section>
          )}

          {data.certifications.some(c => c.name) && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-premium-500, #64748b)', letterSpacing: '1px', marginBottom: '15px' }}>Certs</h2>
              {data.certifications.filter(c => c.name).map(cert => (
                <div key={cert.id} style={{ marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>{cert.name}</h4>
                  <p style={{ fontSize: '9px', color: '#64748b' }}>{cert.issuer}</p>
                </div>
              ))}
            </section>
          )}

          {achievements.length > 0 && (
            <section>
              <h2 style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-premium-500, #64748b)', letterSpacing: '1px', marginBottom: '15px' }}>Achievements</h2>
              {achievements.map((a, i) => (
                <div key={i} style={{ fontSize: '10px', color: '#334155', marginBottom: '8px', display: 'flex', gap: '6px' }}>
                  <Sparkles size={12} style={{ color: 'var(--color-premium-400, #94a3b8)' }} /> {a}
                </div>
              ))}
            </section>
          )}
        </aside>

        {/* Main Content */}
        <main>
          {summary && (
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', letterSpacing: '2px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>Summary</h2>
              <p style={{ fontSize: '12px', color: '#334155', lineHeight: 1.7, textAlign: 'justify' }}>{summary}</p>
            </section>
          )}

          {data.workExperience.some(e => e.company) && (
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', letterSpacing: '2px', marginBottom: '20px' }}>Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {data.workExperience.filter(e => e.company).map(exp => (
                  <div key={exp.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{exp.position}</h3>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-premium-600, #475569)' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-premium-500, #64748b)', marginBottom: '10px' }}>{exp.company}</p>
                    <ul style={{ margin: 0, paddingLeft: '15px', listStyle: 'square', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {generateBulletPoints(exp.description).map((b, i) => (
                        <li key={i} style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.55 }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects.some(p => p.name) && (
            <section>
              <h2 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', letterSpacing: '2px', marginBottom: '20px' }}>Projects</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {data.projects.filter(p => p.name).map(proj => (
                  <div key={proj.id}>
                    <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{proj.name}</h3>
                    {proj.technologies && <div style={{ fontSize: '10px', color: 'var(--color-premium-500, #64748b)', fontWeight: 700, margin: '2px 0' }}>{proj.technologies}</div>}
                    <ul style={{ margin: 0, paddingLeft: '15px', listStyle: 'square', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {generateBulletPoints(proj.description).map((b, i) => (
                        <li key={i} style={{ fontSize: '11px', color: '#334155', lineHeight: 1.5 }}>{b}</li>
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
