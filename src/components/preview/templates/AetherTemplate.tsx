import type { ResumeData } from '../../../types';
import { generateBulletPoints, generateSummary, processSkills } from '../../../utils/ai-engine';
import { getThemeStyle } from '../../builder/StepTemplate';

export default function AetherTemplate({ data }: { data: ResumeData }) {
  const skills = processSkills(data.skills);
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience, data.targetJob);

  return (
    <div className="bg-white p-12 mx-auto font-sans text-slate-800 shadow-sm" style={{ ...getThemeStyle(data.themeColor), minHeight: '297mm', width: '100%', maxWidth: '210mm', fontSize: '11px', lineHeight: '1.4' }}>
      <header style={{ textAlign: 'center', marginBottom: '35px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#0f172a', margin: 0 }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-premium-600, #475569)', marginTop: '4px' }}>{data.targetJob}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '12px', color: '#64748b', fontSize: '10.5px' }}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </header>

      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', borderBottom: '1px solid #0f172a', paddingBottom: '4px', marginBottom: '10px' }}>Summary</h2>
        <p style={{ fontSize: '11px', color: '#334155', lineHeight: 1.5 }}>{summary}</p>
      </section>

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

      {skills.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', borderBottom: '1px solid #0f172a', paddingBottom: '4px', marginBottom: '10px' }}>Skills</h2>
          <div style={{ fontSize: '11px', color: '#334155', fontWeight: 600 }}>{skills.join(', ')}</div>
        </section>
      )}

      {data.education.some(e => e.school) && (
        <section>
          <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', borderBottom: '1px solid #0f172a', paddingBottom: '4px', marginBottom: '10px' }}>Education</h2>
          {data.education.filter(e => e.school).map(edu => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#0f172a' }}>
                <span>{edu.school}</span>
                <span>{edu.endDate}</span>
              </div>
              <div style={{ fontSize: '10.5px' }}>{edu.degree}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
