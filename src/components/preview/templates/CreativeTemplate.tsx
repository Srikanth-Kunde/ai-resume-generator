import { Mail, Phone, MapPin, Linkedin, Globe, Target, Briefcase, Rocket, Award, Sparkles } from 'lucide-react';
import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white mx-auto font-sans text-gray-800 shadow-sm overflow-hidden" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', background: 'var(--color-premium-900, #0f172a)', color: 'white', padding: '40px 25px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--color-premium-600, #475569)', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 800, border: '4px solid var(--color-premium-400, #94a3b8)' }}>
            {data.personalInfo.fullName?.charAt(0) || 'R'}
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>{data.personalInfo.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: '11px', color: 'var(--color-premium-400, #94a3b8)', marginTop: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>{data.targetJob}</p>
        </div>

        <section>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '15px', color: 'var(--color-premium-400, #94a3b8)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>Contact</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '10px' }}>
            {data.personalInfo.email && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail style={{ width: 12, height: 12 }} /> {data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone style={{ width: 12, height: 12 }} /> {data.personalInfo.phone}</div>}
            {data.personalInfo.location && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin style={{ width: 12, height: 12 }} /> {data.personalInfo.location}</div>}
            {data.personalInfo.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Linkedin style={{ width: 12, height: 12 }} /> {data.personalInfo.linkedin}</div>}
            {data.personalInfo.website && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Globe style={{ width: 12, height: 12 }} /> {data.personalInfo.website}</div>}
          </div>
        </section>

        {skills.length > 0 && (
          <section>
            <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '15px', color: 'var(--color-premium-400, #94a3b8)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>Expertise</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map((s, i) => (
                <span key={i} style={{ padding: '3px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', fontSize: '9px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)' }}>{s}</span>
              ))}
            </div>
          </section>
        )}

        {data.education.some(e => e.school) && (
          <section>
            <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '15px', color: 'var(--color-premium-400, #94a3b8)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>Education</h2>
            {data.education.filter(e => e.school).map(edu => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>{edu.school}</h4>
                <p style={{ fontSize: '10px', color: 'var(--color-premium-400, #94a3b8)', margin: '2px 0' }}>{edu.degree}</p>
                <p style={{ fontSize: '9px', opacity: 0.7, margin: 0 }}>{edu.startDate} – {edu.endDate}</p>
              </div>
            ))}
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px' }}>
        {summary && (
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-premium-900, #0f172a)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target style={{ width: 16, height: 16, color: 'var(--color-premium-600, #475569)' }} /> Profile
            </h2>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.7, textAlign: 'justify' }}>{summary}</p>
          </section>
        )}

        {data.workExperience.some(e => e.company) && (
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-premium-900, #0f172a)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase style={{ width: 16, height: 16, color: 'var(--color-premium-600, #475569)' }} /> Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {data.workExperience.filter(e => e.company).map(exp => (
                <div key={exp.id} style={{ borderLeft: '2px solid var(--color-premium-100, #f1f5f9)', paddingLeft: '15px', position: 'relative' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-premium-600, #475569)', position: 'absolute', left: '-5px', top: '5px' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-premium-600, #475569)' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-premium-500, #64748b)', marginBottom: '8px' }}>{exp.company}</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {generateBulletPoints(exp.description).map((b, i) => (
                      <li key={i} style={{ fontSize: '11px', color: '#475569', lineHeight: 1.55 }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.some(p => p.name) && (
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-premium-900, #0f172a)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Rocket style={{ width: 16, height: 16, color: 'var(--color-premium-600, #475569)' }} /> Projects
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {data.projects.filter(p => p.name).map(proj => (
                <div key={proj.id} style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>{proj.name}</h3>
                  {proj.technologies && <p style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', marginBottom: '6px' }}>{proj.technologies}</p>}
                  <p style={{ fontSize: '10.5px', color: '#475569', margin: 0, lineHeight: 1.5 }}>{generateBulletPoints(proj.description)[0]}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {(achievements.length > 0 || data.certifications.length > 0) && (
          <section>
            <h2 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-premium-900, #0f172a)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award style={{ width: 16, height: 16, color: 'var(--color-premium-600, #475569)' }} /> Honors & More
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {achievements.map((a, i) => (
                <div key={i} style={{ fontSize: '11px', color: '#475569', display: 'flex', gap: '8px' }}>
                  <Sparkles style={{ width: 12, height: 12, color: 'var(--color-premium-500, #64748b)', marginTop: '2px' }} /> {a}
                </div>
              ))}
              {data.certifications.filter(c => c.name).map(cert => (
                <div key={cert.id} style={{ fontSize: '11px', color: '#475569', display: 'flex', gap: '8px' }}>
                  <Award style={{ width: 12, height: 12, color: 'var(--color-premium-500, #64748b)', marginTop: '2px' }} /> {cert.name} — {cert.issuer}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
