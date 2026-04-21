import { Layout, Sparkles, FileText, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionCard from '../shared/SectionCard';
import { useResume } from '../../context/ResumeContext';

const templates = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary', icon: <Layout className="w-6 h-6" /> },
  { id: 'classic', name: 'Classic', description: 'Traditional professional', icon: <FileText className="w-6 h-6" /> },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant', icon: <Sparkles className="w-6 h-6" /> },
  { id: 'executive', name: 'Executive', description: 'Bold and impactful', icon: <Briefcase className="w-6 h-6" /> },
];

export const THEME_OPTIONS = [
  { id: 'slate', name: 'Slate', color: '#475569' },
  { id: 'emerald', name: 'Emerald', color: '#059669' },
  { id: 'indigo', name: 'Indigo', color: '#4f46e5' },
  { id: 'rose', name: 'Rose', color: '#e11d48' },
  { id: 'amber', name: 'Amber', color: '#d97706' },
];

export const getThemeStyle = (colorId: string): Record<string, string> => {
  const themes: Record<string, Record<string, string>> = {
    slate: { '--color-premium-50': '#f8fafc', '--color-premium-100': '#f1f5f9', '--color-premium-400': '#94a3b8', '--color-premium-500': '#64748b', '--color-premium-600': '#475569', '--color-premium-700': '#334155', '--color-premium-900': '#0f172a' },
    emerald: { '--color-premium-50': '#ecfdf5', '--color-premium-100': '#d1fae5', '--color-premium-400': '#34d399', '--color-premium-500': '#10b981', '--color-premium-600': '#059669', '--color-premium-700': '#047857', '--color-premium-900': '#064e3b' },
    indigo: { '--color-premium-50': '#eef2ff', '--color-premium-100': '#e0e7ff', '--color-premium-400': '#818cf8', '--color-premium-500': '#6366f1', '--color-premium-600': '#4f46e5', '--color-premium-700': '#4338ca', '--color-premium-900': '#312e81' },
    rose: { '--color-premium-50': '#fff1f2', '--color-premium-100': '#ffe4e6', '--color-premium-400': '#fb7185', '--color-premium-500': '#f43f5e', '--color-premium-600': '#e11d48', '--color-premium-700': '#be123c', '--color-premium-900': '#881337' },
    amber: { '--color-premium-50': '#fffbeb', '--color-premium-100': '#fef3c7', '--color-premium-400': '#fbbf24', '--color-premium-500': '#f59e0b', '--color-premium-600': '#d97706', '--color-premium-700': '#b45309', '--color-premium-900': '#78350f' },
  };
  return themes[colorId] || themes.slate;
};

export { templates };

interface Props {
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
}

export default function StepTemplate({ selectedTemplate, onSelectTemplate }: Props) {
  const { data, setData } = useResume();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SectionCard title="Template Selection" icon={<Layout className="w-5 h-5" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {templates.map(t => (
            <button
              key={t.id}
              onClick={() => onSelectTemplate(t.id)}
              className={`template-card ${selectedTemplate === t.id ? 'selected' : ''}`}
            >
              {selectedTemplate === t.id && (
                <motion.div
                  layoutId="template-active"
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'var(--accent-glow)',
                    borderRadius: 'var(--radius-xl)',
                    zIndex: 0,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'inline-flex', padding: '0.75rem',
                  borderRadius: 'var(--radius-lg)',
                  background: selectedTemplate === t.id ? 'var(--accent-primary)' : 'var(--surface-tertiary)',
                  color: selectedTemplate === t.id ? 'white' : 'var(--text-tertiary)',
                  marginBottom: '0.75rem',
                  transition: 'all 0.2s ease',
                }}>
                  {t.icon}
                </div>
                <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{t.name}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>{t.description}</p>
              </div>
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Accent Color" icon={<Sparkles className="w-5 h-5" />}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {THEME_OPTIONS.map(theme => (
            <button
              key={theme.id}
              onClick={() => setData({ ...data, themeColor: theme.id })}
              className={`color-swatch-btn ${data.themeColor === theme.id ? 'selected' : ''}`}
            >
              <div className="color-dot" style={{ backgroundColor: theme.color }} />
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{theme.name}</span>
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
