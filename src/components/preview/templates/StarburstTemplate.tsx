import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function StarburstTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white mx-auto font-sans text-gray-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.5' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '297mm' }}>
        {/* Sidebar */}
        <aside style={{ background: '#1e293b', color: 'white', padding: '50px 40px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 900, lineHeight: 1.1, margin: 0 }}>{data.personalInfo.fullName || 'Your Name'}</h1>
            <div style={{ height: '4px', width: '40px', background: 'var(--color-premium-400, #94a3b8)', marginTop: '20px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '10px', opacity: 0.8, marginBottom: '40px' }}>
            {data.personalInfo.email && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={12} /> {data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={12} /> {data.personalInfo.phone}</div>}
            {data.personalInfo.location && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={12} /> {data.personalInfo.location}</div>}
            {data.personalInfo.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Linkedin size={12} /> {data.personalInfo.linkedin}</div>}
            {data.personalInfo.website && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={12} /> {data.personalInfo.website}</div>}
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
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Education</h2>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800 }}>{edu.school}</div>
                  <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '2px' }}>{edu.degree}</div>
                </div>
              ))}
            </section>
          )}

          {data.certifications.some(c => c.name) && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Certs</h2>
              {data.certifications.filter(c => c.name).map(cert => (
                <div key={cert.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800 }}>{cert.name}</div>
                  <div style={{ fontSize: '9px', opacity: 0.7, marginTop: '2px' }}>{cert.issuer}</div>
                </div>
              ))}
            </section>
          )}

          {achievements.length > 0 && (
            <section>
              <h2 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Awards</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {achievements.map((a, i) => (
                  <div key={i} style={{ fontSize: '10px', opacity: 0.8 }}>
                    • {a}
                  </div>
                ))}
              </div>
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
            <section style={{ marginBottom: '40px' }}>
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

          {data.projects.some(p => p.name) && (
            <section>
              <h2 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: '25px', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px' }}>Projects</h2>
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
