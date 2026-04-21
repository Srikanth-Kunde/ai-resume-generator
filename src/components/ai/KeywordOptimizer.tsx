import { useState, useMemo } from 'react';
import { Search, Target } from 'lucide-react';
import type { ResumeData } from '../../types';
import { parseJobDescription, getKeywordMatches } from '../../utils/ats-analyzer';

interface Props {
  data: ResumeData;
}

export default function KeywordOptimizer({ data }: Props) {
  const [jobDescText, setJobDescText] = useState('');

  const jobDesc = useMemo(() => parseJobDescription(jobDescText), [jobDescText]);
  const matches = useMemo(() => getKeywordMatches(data, jobDesc), [data, jobDesc]);

  const matchedCount = matches.filter(m => m.status === 'matched').length;
  const totalKeywords = jobDesc.extractedKeywords.length;
  const matchPercent = totalKeywords > 0 ? Math.round((matchedCount / totalKeywords) * 100) : 0;

  if (!jobDescText.trim()) {
    return (
      <div className="ats-card" style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Search className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
          <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Job Match</h4>
        </div>
        <textarea
          value={jobDescText}
          onChange={e => setJobDescText(e.target.value)}
          placeholder="Paste a job description here to see keyword match analysis..."
          rows={4}
          className="field-input"
          style={{ fontSize: '0.75rem' }}
        />
      </div>
    );
  }

  return (
    <div className="ats-card" style={{ marginTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
          <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Keyword Match</h4>
        </div>
        <span style={{
          fontSize: '0.75rem', fontWeight: 800,
          color: matchPercent >= 70 ? 'var(--success)' : matchPercent >= 40 ? 'var(--warning)' : 'var(--error)',
        }}>
          {matchPercent}%
        </span>
      </div>

      <textarea
        value={jobDescText}
        onChange={e => setJobDescText(e.target.value)}
        rows={3}
        className="field-input"
        style={{ fontSize: '0.75rem', marginBottom: '0.75rem' }}
      />

      {/* Keyword badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '0.75rem' }}>
        {matches.slice(0, 20).map((m, i) => (
          <span key={i} className={`keyword-badge keyword-${m.status}`}>
            {m.keyword}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', fontSize: '0.625rem', textAlign: 'center' }}>
        <div style={{ padding: '0.375rem', background: 'var(--success-bg)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontWeight: 800, color: 'var(--success)', fontSize: '0.875rem' }}>{matches.filter(m => m.status === 'matched').length}</div>
          <div style={{ color: 'var(--success)', fontWeight: 600 }}>Matched</div>
        </div>
        <div style={{ padding: '0.375rem', background: 'var(--warning-bg)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontWeight: 800, color: 'var(--warning)', fontSize: '0.875rem' }}>{matches.filter(m => m.status === 'partial').length}</div>
          <div style={{ color: 'var(--warning)', fontWeight: 600 }}>Partial</div>
        </div>
        <div style={{ padding: '0.375rem', background: 'var(--error-bg)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontWeight: 800, color: 'var(--error)', fontSize: '0.875rem' }}>{matches.filter(m => m.status === 'missing').length}</div>
          <div style={{ color: 'var(--error)', fontWeight: 600 }}>Missing</div>
        </div>
      </div>
    </div>
  );
}
