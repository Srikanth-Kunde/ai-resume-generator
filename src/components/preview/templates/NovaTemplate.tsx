import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function NovaTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white p-12 mx-auto font-sans text-slate-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.7' }}>
      <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '30px', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 300, color: '#0f172a', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-premium-600, #475569)', marginTop: '6px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{data.targetJob}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px', fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {data.personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={10} /> {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={10} /> {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={10} /> {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Linkedin size={10} /> {data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={10} /> {data.personalInfo.website}</span>}
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-premium-500, #64748b)', textTransform: 'uppercase', letterSpacing: '2px' }}>Summary</div>
            <p style={{ fontSize: '12px', color: '#334155', textAlign: 'justify' }}>{summary}</p>
          </div>
        </section>
      )}

      {data.workExperience.some(e => e.company) && (
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-premium-500, #64748b)', textTransform: 'uppercase', letterSpacing: '2px' }}>Experience</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {data.workExperience.filter(e => e.company).map(exp => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{exp.position}</h3>
                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', margin: '4px 0 10px' }}>{exp.company}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {generateBulletPoints(exp.description).map((b, i) => (
                      <div key={i} style={{ fontSize: '11.5px', color: '#334155' }}>• {b}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.projects.some(p => p.name) && (
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-premium-500, #64748b)', textTransform: 'uppercase', letterSpacing: '2px' }}>Projects</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {data.projects.filter(p => p.name).map(proj => (
                <div key={proj.id}>
                  <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{proj.name}</h3>
                  {proj.technologies && <div style={{ fontSize: '10px', color: 'var(--color-premium-600, #475569)', margin: '4px 0' }}>{proj.technologies}</div>}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {generateBulletPoints(proj.description).map((b, i) => (
                      <div key={i} style={{ fontSize: '11.5px', color: '#334155' }}>• {b}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
        <section>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-premium-500, #64748b)', textTransform: 'uppercase', letterSpacing: '2px' }}>Skills</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {skills.map((s, i) => <div key={i} style={{ fontSize: '11px', color: '#334155', fontWeight: 600 }}>{s}</div>)}
            </div>
          </div>
        </section>

        <section>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-premium-500, #64748b)', textTransform: 'uppercase', letterSpacing: '2px' }}>Education</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id}>
                  <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>{edu.school}</h4>
                  <p style={{ fontSize: '10px', color: '#94a3b8' }}>{edu.degree} · {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginTop: '40px' }}>
        {data.certifications.some(c => c.name) && (
          <section>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-premium-500, #64748b)', textTransform: 'uppercase', letterSpacing: '2px' }}>Certs</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {data.certifications.filter(c => c.name).map(cert => (
                  <div key={cert.id}>
                    <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>{cert.name}</h4>
                    <p style={{ fontSize: '10px', color: '#94a3b8' }}>{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {achievements.length > 0 && (
          <section>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-premium-500, #64748b)', textTransform: 'uppercase', letterSpacing: '2px' }}>Awards</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {achievements.map((a, i) => <div key={i} style={{ fontSize: '11px', color: '#334155' }}>• {a}</div>)}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
