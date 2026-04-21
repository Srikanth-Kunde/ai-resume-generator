import { Award, User } from 'lucide-react';
import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills, processAchievements } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function AstralTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);
  const achievements = processAchievements(data.achievements);

  return (
    <div className="bg-white mx-auto font-sans text-gray-800 shadow-sm overflow-hidden" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.5' }}>
      <header style={{ background: 'var(--color-premium-100, #f1f5f9)', padding: '50px 60px', display: 'flex', gap: '40px', alignItems: 'center' }}>
        <div style={{ width: '120px', height: '120px', borderRadius: '15px', background: 'var(--color-premium-400, #94a3b8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
          <User style={{ width: 60, height: 60, opacity: 0.8 }} />
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '38px', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.04em' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', marginTop: '8px' }}>{data.targetJob}</p>
          <div style={{ display: 'flex', gap: '15px', marginTop: '15px', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          </div>
        </div>
      </header>

      <div style={{ padding: '40px 60px', display: 'grid', gridTemplateColumns: '1fr 260px', gap: '50px' }}>
        {/* Main */}
        <main>
          {summary && (
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '2px solid var(--color-premium-500, #64748b)', paddingBottom: '4px', display: 'inline-block' }}>Profile Summary</h2>
              <p style={{ fontSize: '12px', color: '#334155', lineHeight: 1.7 }}>{summary}</p>
            </section>
          )}

          {data.workExperience.some(e => e.company) && (
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginBottom: '20px', borderBottom: '2px solid var(--color-premium-500, #64748b)', paddingBottom: '4px', display: 'inline-block' }}>Professional Background</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {data.workExperience.filter(e => e.company).map(exp => (
                  <div key={exp.id}>
                    <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>{exp.position}</h3>
                    <div style={{ display: 'flex', gap: '10px', color: 'var(--color-premium-600, #475569)', fontWeight: 700, fontSize: '11px', margin: '4px 0 10px' }}>
                      <span>{exp.company}</span>
                      <span>|</span>
                      <span>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {generateBulletPoints(exp.description).map((b, i) => (
                        <li key={i} style={{ fontSize: '12px', color: '#334155', lineHeight: 1.5 }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Sidebar */}
        <aside>
          {skills.length > 0 && (
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginBottom: '15px', background: 'var(--color-premium-100, #f1f5f9)', padding: '6px 12px', borderRadius: '6px' }}>Core Skills</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>{s}</div>
                ))}
              </div>
            </section>
          )}

          {data.education.some(e => e.school) && (
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginBottom: '15px', background: 'var(--color-premium-100, #f1f5f9)', padding: '6px 12px', borderRadius: '6px' }}>Education</h2>
              {data.education.filter(e => e.school).map(edu => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>{edu.school}</h4>
                  <p style={{ fontSize: '10px', color: 'var(--color-premium-600, #475569)', margin: '2px 0' }}>{edu.degree}</p>
                </div>
              ))}
            </section>
          )}

          {(achievements.length > 0) && (
            <section>
              <h2 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginBottom: '15px', background: 'var(--color-premium-100, #f1f5f9)', padding: '6px 12px', borderRadius: '6px' }}>Awards</h2>
              {achievements.map((a, i) => (
                <div key={i} style={{ fontSize: '10px', color: '#475569', marginBottom: '10px', display: 'flex', gap: '10px' }}>
                  <Award style={{ width: 14, height: 14, color: 'var(--color-premium-500, #64748b)', flexShrink: 0 }} /> {a}
                </div>
              ))}
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
