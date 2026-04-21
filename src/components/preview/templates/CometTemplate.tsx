import { Mail, Phone, MapPin, Linkedin, Globe, Sparkles } from 'lucide-react';
import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function CometTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white mx-auto font-sans text-gray-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.6' }}>
      <header style={{ background: '#fbbf24', padding: '50px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '42px', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.04em' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginTop: '8px', opacity: 0.8 }}>{data.targetJob}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '25px', color: '#0f172a', fontSize: '11px', fontWeight: 600 }}>
            {data.personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> {data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> {data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {data.personalInfo.location}</span>}
            {data.personalInfo.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Linkedin size={12} /> {data.personalInfo.linkedin}</span>}
            {data.personalInfo.website && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={12} /> {data.personalInfo.website}</span>}
          </div>
        </div>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
      </header>

      <div style={{ padding: '50px 80px', display: 'grid', gridTemplateColumns: '1fr 240px', gap: '60px' }}>
        <main>
          {summary && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Introduction</h2>
              <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: 1.8 }}>{summary}</p>
            </section>
          )}

          {data.workExperience.some(e => e.company) && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '25px' }}>Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {data.workExperience.filter(e => e.company).map(exp => (
                  <div key={exp.id}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{exp.position}</h3>
                    <div style={{ color: '#64748b', fontWeight: 700, fontSize: '11px', margin: '4px 0 12px' }}>{exp.company} | {exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
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
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '25px' }}>Key Projects</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {data.projects.filter(p => p.name).map(proj => (
                  <div key={proj.id}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{proj.name}</h3>
                    <div style={{ color: '#64748b', fontWeight: 700, fontSize: '10px', margin: '4px 0' }}>{proj.technologies} {proj.link && `| ${proj.link}`}</div>
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

        <aside>
          {skills.length > 0 && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>The Toolkit</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ fontSize: '11px', color: '#475569', fontWeight: 700, padding: '8px', background: '#f8fafc', borderRadius: '4px' }}>{s}</div>
                ))}
              </div>
            </section>
          )}

          {data.education.some(e => e.school) && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Education</h2>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <h4 style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a' }}>{edu.school}</h4>
                  <p style={{ fontSize: '10px', color: '#64748b', margin: '2px 0' }}>{edu.degree}</p>
                  <p style={{ fontSize: '9px', color: '#94a3b8' }}>{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </section>
          )}

          {data.certifications.some(c => c.name) && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Certs</h2>
              {data.certifications.filter(c => c.name).map(cert => (
                <div key={cert.id} style={{ marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '10.5px', fontWeight: 800, color: '#0f172a' }}>{cert.name}</h4>
                  <p style={{ fontSize: '9px', color: '#64748b' }}>{cert.issuer}</p>
                </div>
              ))}
            </section>
          )}

          {achievements.length > 0 && (
            <section>
              <h2 style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Achievements</h2>
              {achievements.map((a, i) => (
                <div key={i} style={{ fontSize: '10px', color: '#475569', marginBottom: '8px', display: 'flex', gap: '6px' }}>
                  <Sparkles size={12} style={{ color: '#fbbf24', flexShrink: 0 }} /> {a}
                </div>
              ))}
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
