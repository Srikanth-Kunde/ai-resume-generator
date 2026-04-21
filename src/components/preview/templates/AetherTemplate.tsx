import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function AetherTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white p-12 mx-auto font-sans text-slate-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.4' }}>
      <header style={{ textAlign: 'center', marginBottom: '35px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#0f172a', margin: 0 }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', marginTop: '4px' }}>{data.targetJob}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '12px', color: '#64748b', fontSize: '10.5px' }}>
          {data.personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Linkedin size={12} /> {data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={12} /> {data.personalInfo.website}</span>}
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', borderBottom: '1px solid #0f172a', paddingBottom: '4px', marginBottom: '10px' }}>Summary</h2>
          <p style={{ fontSize: '11px', color: '#334155', lineHeight: 1.5 }}>{summary}</p>
        </section>
      )}

      {data.workExperience.some(e => e.company) && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', borderBottom: '1px solid #0f172a', paddingBottom: '4px', marginBottom: '15px' }}>Professional Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {data.workExperience.filter(e => e.company).map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, color: '#0f172a' }}>
                  <span>{exp.position}</span>
                  <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', margin: '2px 0 6px' }}>{exp.company}</div>
                <ul style={{ margin: 0, paddingLeft: '15px', listStyle: 'disc' }}>
                  {generateBulletPoints(exp.description).map((b, i) => (
                    <li key={i} style={{ fontSize: '11px', color: '#334155', marginBottom: '2px' }}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects.some(p => p.name) && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', borderBottom: '1px solid #0f172a', paddingBottom: '4px', marginBottom: '15px' }}>Key Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.projects.filter(p => p.name).map(proj => (
              <div key={proj.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#0f172a' }}>
                  <span>{proj.name}</span>
                  {proj.link && <span style={{ fontSize: '10px', color: 'var(--color-premium-600, #475569)' }}>{proj.link}</span>}
                </div>
                {proj.technologies && <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-premium-500, #64748b)', margin: '2px 0' }}>{proj.technologies}</div>}
                <ul style={{ margin: 0, paddingLeft: '15px', listStyle: 'disc' }}>
                  {generateBulletPoints(proj.description).map((b, i) => (
                    <li key={i} style={{ fontSize: '10.5px', color: '#334155' }}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
          {skills.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', borderBottom: '1px solid #0f172a', paddingBottom: '4px', marginBottom: '10px' }}>Skills</h2>
              <div style={{ fontSize: '11px', color: '#334155', fontWeight: 600 }}>{skills.join(', ')}</div>
            </section>
          )}

          {data.education.some(e => e.school) && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', borderBottom: '1px solid #0f172a', paddingBottom: '4px', marginBottom: '10px' }}>Education</h2>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#0f172a' }}>
                    <span>{edu.school}</span>
                    <span>{edu.endDate}</span>
                  </div>
                  <div style={{ fontSize: '10.5px' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                </div>
              ))}
            </section>
          )}
        </div>

        <div>
          {data.certifications.some(c => c.name) && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', borderBottom: '1px solid #0f172a', paddingBottom: '4px', marginBottom: '10px' }}>Certifications</h2>
              {data.certifications.filter(c => c.name).map(cert => (
                <div key={cert.id} style={{ marginBottom: '6px' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>{cert.name}</div>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>{cert.issuer} | {cert.date}</div>
                </div>
              ))}
            </section>
          )}

          {achievements.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', borderBottom: '1px solid #0f172a', paddingBottom: '4px', marginBottom: '10px' }}>Achievements</h2>
              <ul style={{ margin: 0, paddingLeft: '15px', listStyle: 'disc' }}>
                {achievements.map((a, i) => (
                  <li key={i} style={{ fontSize: '10.5px', color: '#334155', marginBottom: '2px' }}>{a}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
