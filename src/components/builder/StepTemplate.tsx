import { Layout, Sparkles, FileText, Briefcase, Award, Rocket, Zap, Columns, Image } from 'lucide-react';

const templates = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary', icon: <Layout className="w-6 h-6" />, categories: ['modern', 'professional'] },
  { id: 'classic', name: 'Classic', description: 'Traditional professional', icon: <FileText className="w-6 h-6" />, categories: ['classic', 'professional'] },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant', icon: <Sparkles className="w-6 h-6" />, categories: ['minimal', 'simple'] },
  { id: 'executive', name: 'Executive', description: 'Bold and impactful', icon: <Briefcase className="w-6 h-6" />, categories: ['professional', 'ats'] },
  { id: 'creative', name: 'Creative', description: 'Bold and asymmetric', icon: <Rocket className="w-6 h-6" />, categories: ['creative', 'photo'] },
  { id: 'professional', name: 'Professional', description: 'High-authority executive', icon: <Award className="w-6 h-6" />, categories: ['professional', 'ats'] },
  { id: 'compact', name: 'Compact', description: 'Efficiency-optimized', icon: <Zap className="w-6 h-6" />, categories: ['compact', 'simple'] },
  { id: 'celestial', name: 'Celestial', description: 'Premium 2-column', icon: <Columns className="w-6 h-6" />, categories: ['professional', 'modern'] },
  { id: 'galaxy', name: 'Galaxy', description: 'Centered classic', icon: <Sparkles className="w-6 h-6" />, categories: ['classic', 'simple'] },
  { id: 'astral', name: 'Astral', description: 'Modern photo-ready', icon: <Image className="w-6 h-6" />, categories: ['photo', 'modern'] },
  { id: 'luna', name: 'Luna', description: 'Technical blocked', icon: <Layout className="w-6 h-6" />, categories: ['modern', 'professional'] },
  { id: 'nova', name: 'Nova', description: 'Ultra-minimalist', icon: <FileText className="w-6 h-6" />, categories: ['simple', 'one column'] },
  { id: 'solar', name: 'Solar', description: 'Executive spotlight', icon: <Award className="w-6 h-6" />, categories: ['professional', 'ats'] },
  { id: 'zenith', name: 'Zenith', description: 'Eco-minimalist', icon: <Sparkles className="w-6 h-6" />, categories: ['simple', 'one column'] },
  { id: 'solstice', name: 'Solstice', description: 'Precision linear', icon: <Columns className="w-6 h-6" />, categories: ['simple', 'ats', 'one column'] },
  { id: 'eclipse', name: 'Eclipse', description: 'Authoritative bold', icon: <Layout className="w-6 h-6" />, categories: ['professional', 'modern'] },
  { id: 'pulsar', name: 'Pulsar', description: 'Digital forward', icon: <Rocket className="w-6 h-6" />, categories: ['modern', 'one column'] },
  { id: 'hyperion', name: 'Hyperion', description: 'Bold hierarchy', icon: <FileText className="w-6 h-6" />, categories: ['professional', 'one column'] },
  { id: 'aether', name: 'Aether', description: 'Pure ATS reader', icon: <Briefcase className="w-6 h-6" />, categories: ['ats', 'simple'] },
  { id: 'exoplanet', name: 'Exoplanet', description: 'Refined centering', icon: <Layout className="w-6 h-6" />, categories: ['simple', 'ats'] },
  { id: 'starburst', name: 'Starburst', description: 'High-contrast sidebar', icon: <Columns className="w-6 h-6" />, categories: ['professional', 'modern'] },
  { id: 'comet', name: 'Comet', description: 'Vibrant bold header', icon: <Rocket className="w-6 h-6" />, categories: ['modern', 'creative'] },
  { id: 'quasar', name: 'Quasar', description: 'Minimal precision', icon: <Layout className="w-6 h-6" />, categories: ['simple', 'ats'] },
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

