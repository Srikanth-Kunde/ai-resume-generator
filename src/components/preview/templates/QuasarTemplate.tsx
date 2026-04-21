import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function QuasarTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white p-16 mx-auto font-sans text-slate-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.6' }}>
      <header style={{ borderBottom: '4px solid #0f172a', paddingBottom: '30px', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', margin: 0 }}>{data.personalInfo.fullName || 'YOUR NAME'}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', margin: 0 }}>{data.targetJob.toUpperCase()}</p>
          <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'flex-end' }}>
            {data.personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={10} /> {data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={10} /> {data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={10} /> {data.personalInfo.location}</span>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '15px', marginTop: '10px', fontSize: '10px', color: '#64748b' }}>
          {data.personalInfo.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Linkedin size={10} /> {data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={10} /> {data.personalInfo.website}</span>}
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: '45px' }}>
          <p style={{ fontSize: '12px', color: '#1e293b', lineHeight: 1.8 }}>{summary}</p>
        </section>
      )}

      {data.workExperience.some(e => e.company) && (
        <section style={{ marginBottom: '45px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '25px' }}>Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {data.workExperience.filter(e => e.company).map(exp => (
              <div key={exp.id}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{exp.position}</h3>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-500, #64748b)', margin: '4px 0 10px' }}>{exp.company} / {exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                <ul style={{ margin: 0, paddingLeft: '15px', listStyle: 'square' }}>
                  {generateBulletPoints(exp.description).map((b, i) => (
                    <li key={i} style={{ fontSize: '11.5px', color: '#334155', marginBottom: '4px' }}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects.some(p => p.name) && (
        <section style={{ marginBottom: '45px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '25px' }}>Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {data.projects.filter(p => p.name).map(proj => (
              <div key={proj.id}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{proj.name}</h3>
                {proj.technologies && <div style={{ fontSize: '10px', color: 'var(--color-premium-500, #64748b)', margin: '2px 0' }}>{proj.technologies}</div>}
                <p style={{ fontSize: '11.5px', color: '#334155', marginTop: '6px' }}>{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
        <div>
          {skills.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map((s, i) => (
                  <span key={i} style={{ padding: '4px 10px', background: '#f1f5f9', borderRadius: '4px', fontSize: '10.5px', fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </section>
          )}

          {data.education.some(e => e.school) && (
            <section>
              <h2 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Education</h2>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <h4 style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a' }}>{edu.school}</h4>
                  <p style={{ fontSize: '10px', color: '#64748b' }}>{edu.degree} · {edu.endDate}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        <div>
          {data.certifications.some(c => c.name) && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Certs</h2>
              {data.certifications.filter(c => c.name).map(cert => (
                <div key={cert.id} style={{ marginBottom: '10px' }}>
                  <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>{cert.name}</h4>
                  <p style={{ fontSize: '10px', color: '#64748b' }}>{cert.issuer}</p>
                </div>
              ))}
            </section>
          )}

          {achievements.length > 0 && (
            <section>
              <h2 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Achievements</h2>
              {achievements.map((a, i) => (
                <div key={i} style={{ fontSize: '10.5px', color: '#334155', marginBottom: '6px' }}>
                  • {a}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
