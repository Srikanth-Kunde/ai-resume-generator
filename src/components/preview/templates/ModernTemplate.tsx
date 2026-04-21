import { Mail, Phone, MapPin, Linkedin, Globe, Target, Wrench, Briefcase, Rocket, Award, GraduationCap, Sparkles } from 'lucide-react';
import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white p-8 sm:p-10 mx-auto font-sans text-gray-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.55' }}>
      <header style={{ borderBottom: '3px solid var(--color-premium-600, #475569)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', textTransform: 'uppercase', margin: 0 }}>
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        {data.targetJob && (
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-premium-600, #475569)', margin: '4px 0 0' }}>{data.targetJob}</p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '10px', fontSize: '11px', color: '#64748b' }}>
          {data.personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail style={{ width: 12, height: 12 }} /> {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone style={{ width: 12, height: 12 }} /> {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin style={{ width: 12, height: 12 }} /> {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Linkedin style={{ width: 12, height: 12 }} /> {data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe style={{ width: 12, height: 12 }} /> {data.personalInfo.website}</span>}
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {summary && (
          <section>
            <h2 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px', borderBottom: '1px solid var(--color-premium-100, #f1f5f9)', paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Target style={{ width: 13, height: 13 }} /> Professional Profile
            </h2>
            <p style={{ fontSize: '12px', color: '#374151', lineHeight: 1.65, textAlign: 'justify' }}>{summary}</p>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px', borderBottom: '1px solid var(--color-premium-100, #f1f5f9)', paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Wrench style={{ width: 13, height: 13 }} /> Technical Expertise
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.map((s, i) => (
                <span key={i} style={{ padding: '3px 10px', background: 'var(--color-premium-50, #f8fafc)', color: 'var(--color-premium-700, #334155)', borderRadius: '4px', fontSize: '10px', fontWeight: 600, border: '1px solid var(--color-premium-100, #f1f5f9)' }}>{s}</span>
              ))}
            </div>
          </section>
        )}

        {data.workExperience.some(e => e.company) && (
          <section>
            <h2 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px', borderBottom: '1px solid var(--color-premium-100, #f1f5f9)', paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Briefcase style={{ width: 13, height: 13 }} /> Professional Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {data.workExperience.filter(e => e.company).map(exp => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', background: '#f8fafc', padding: '2px 8px', borderRadius: '4px' }}>
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', margin: '0 0 6px' }}>{exp.company}</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {generateBulletPoints(exp.description).map((b, i) => (
                      <li key={i} style={{ fontSize: '11px', color: '#374151', display: 'flex', gap: '6px', lineHeight: 1.5 }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-premium-400, #94a3b8)', flexShrink: 0, marginTop: '6px' }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.some(p => p.name) && (
          <section>
            <h2 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px', borderBottom: '1px solid var(--color-premium-100, #f1f5f9)', paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Rocket style={{ width: 13, height: 13 }} /> Key Projects
            </h2>
            {data.projects.filter(p => p.name).map(proj => (
              <div key={proj.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{proj.name}</h3>
                  {proj.link && <span style={{ fontSize: '10px', color: 'var(--color-premium-500, #64748b)' }}>{proj.link}</span>}
                </div>
                {proj.technologies && <p style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-premium-600, #475569)', margin: '2px 0 4px' }}>{proj.technologies}</p>}
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {generateBulletPoints(proj.description).map((b, i) => (
                    <li key={i} style={{ fontSize: '11px', color: '#374151', display: 'flex', gap: '6px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-premium-400, #94a3b8)', flexShrink: 0, marginTop: '6px' }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {data.education.some(e => e.school) && (
            <section>
              <h2 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px', borderBottom: '1px solid var(--color-premium-100, #f1f5f9)', paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <GraduationCap style={{ width: 13, height: 13 }} /> Education
              </h2>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{edu.school}</h4>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-premium-600, #475569)', margin: '1px 0' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                  <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>{edu.startDate} – {edu.endDate}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
                </div>
              ))}
            </section>
          )}

          <section>
            {data.certifications.some(c => c.name) && (
              <div style={{ marginBottom: '12px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px', borderBottom: '1px solid var(--color-premium-100, #f1f5f9)', paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award style={{ width: 13, height: 13 }} /> Certifications
                </h2>
                {data.certifications.filter(c => c.name).map(cert => (
                  <div key={cert.id} style={{ marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a' }}>{cert.name}</span>
                    <p style={{ fontSize: '10px', color: '#64748b', margin: 0 }}>{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            )}

            {achievements.length > 0 && (
              <div>
                <h2 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-700, #334155)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px', borderBottom: '1px solid var(--color-premium-100, #f1f5f9)', paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles style={{ width: 13, height: 13 }} /> Achievements
                </h2>
                {achievements.map((ach, i) => (
                  <div key={i} style={{ fontSize: '11px', color: '#374151', display: 'flex', gap: '6px', marginBottom: '3px' }}>
                    <span style={{ color: 'var(--color-premium-500, #64748b)' }}>★</span> {ach}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
