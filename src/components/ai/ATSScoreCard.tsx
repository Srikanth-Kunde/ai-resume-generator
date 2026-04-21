import { useMemo } from 'react';
import type { ResumeData } from '../../types';
import { calculateATSScore } from '../../utils/ats-analyzer';

interface Props {
  data: ResumeData;
}

export default function ATSScoreCard({ data }: Props) {
  const result = useMemo(() => calculateATSScore(data), [data]);

  const gaugeColor = result.overallScore >= 75 ? 'var(--success)' : result.overallScore >= 45 ? 'var(--warning)' : 'var(--error)';
  const circumference = 2 * Math.PI * 42;
  const dashArray = `${(result.overallScore / 100) * circumference} ${circumference}`;

  return (
    <div className="ats-card">
      <h4 style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center', marginBottom: '1rem' }}>
        ATS Optimization
      </h4>

      {/* Gauge */}
      <div className="ats-gauge">
        <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="42" fill="none" stroke="var(--surface-tertiary)" strokeWidth="7" />
          <circle
            cx="48" cy="48" r="42" fill="none"
            stroke={gaugeColor}
            strokeWidth="7"
            strokeDasharray={dashArray}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease-out' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{result.overallScore}</span>
        </div>
      </div>

      <p style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', fontWeight: 500, textAlign: 'center', marginBottom: '1rem' }}>
        {result.overallScore >= 75 ? 'Ready to apply!' : result.overallScore >= 45 ? 'Add more details.' : 'Needs more content.'}
      </p>

      {/* Section breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {result.sectionScores.slice(0, 5).map((sec, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{sec.section}</span>
              <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-tertiary)' }}>{sec.score}/{sec.maxScore}</span>
            </div>
            <div className="ats-section-bar">
              <div
                className="ats-section-fill"
                style={{
                  width: `${(sec.score / sec.maxScore) * 100}%`,
                  background: sec.score / sec.maxScore >= 0.7 ? 'var(--success)' : sec.score / sec.maxScore >= 0.4 ? 'var(--warning)' : 'var(--error)',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Top tips */}
      {result.sectionScores.some(s => s.tips.length > 0) && (
        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
          <p style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.375rem' }}>Tips</p>
          {result.sectionScores
            .flatMap(s => s.tips)
            .slice(0, 3)
            .map((tip, i) => (
              <p key={i} style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', margin: '0 0 3px', lineHeight: 1.4 }}>
                • {tip}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
