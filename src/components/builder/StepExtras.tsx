import { Award, Sparkles, Plus, Trash2, Globe2 } from 'lucide-react';
import InputField from '../shared/InputField';
import TextAreaField from '../shared/TextAreaField';
import SectionCard from '../shared/SectionCard';
import { useResume } from '../../context/ResumeContext';
import { generateId } from '../../types';
import type { Language } from '../../types';

const FLUENCY_LEVELS: { value: Language['fluency']; label: string }[] = [
  { value: 'native', label: 'Native' },
  { value: 'fluent', label: 'Fluent' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'basic', label: 'Basic' },
];

export default function StepExtras() {
  const { data, setData } = useResume();

  // Certifications
  const addCert = () => {
    setData({ ...data, certifications: [...data.certifications, { id: generateId(), name: '', issuer: '', date: '' }] });
  };
  const removeCert = (id: string) => {
    setData({ ...data, certifications: data.certifications.filter(c => c.id !== id) });
  };
  const updateCert = (idx: number, field: string, value: string) => {
    setData({ ...data, certifications: data.certifications.map((c, i) => i === idx ? { ...c, [field]: value } : c) });
  };

  // Languages
  const addLang = () => {
    setData({ ...data, languages: [...data.languages, { id: generateId(), name: '', fluency: 'intermediate' }] });
  };
  const removeLang = (id: string) => {
    setData({ ...data, languages: data.languages.filter(l => l.id !== id) });
  };
  const updateLang = (idx: number, field: string, value: string) => {
    setData({ ...data, languages: data.languages.map((l, i) => i === idx ? { ...l, [field]: value } : l) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Certifications */}
      <SectionCard title="Certifications" icon={<Award className="w-5 h-5" />}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {data.certifications.map((cert, idx) => (
            <div key={cert.id} className="entry-card">
              <button onClick={() => removeCert(cert.id)} className="entry-delete" aria-label="Remove">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
                <InputField label="Name" value={cert.name} onChange={v => updateCert(idx, 'name', v)} placeholder="AWS Solutions Architect" />
                <InputField label="Issuer" value={cert.issuer} onChange={v => updateCert(idx, 'issuer', v)} placeholder="Amazon Web Services" />
                <InputField label="Date" value={cert.date} onChange={v => updateCert(idx, 'date', v)} placeholder="2023" />
              </div>
            </div>
          ))}
        </div>
        <button onClick={addCert} className="add-entry-btn" style={{ marginTop: '0.75rem' }}>
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </SectionCard>

      {/* Languages */}
      <SectionCard title="Languages" icon={<Globe2 className="w-5 h-5" />}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {data.languages.map((lang, idx) => (
            <div key={lang.id} className="entry-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem' }}>
              <div style={{ flex: 1 }}>
                <InputField label="Language" value={lang.name} onChange={v => updateLang(idx, 'name', v)} placeholder="Spanish" />
              </div>
              <div style={{ flex: 1 }}>
                <div className="field-wrapper">
                  <label className="field-label">Fluency</label>
                  <select
                    value={lang.fluency}
                    onChange={e => updateLang(idx, 'fluency', e.target.value)}
                    className="field-input"
                    style={{ cursor: 'pointer' }}
                  >
                    {FLUENCY_LEVELS.map(fl => (
                      <option key={fl.value} value={fl.value}>{fl.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button onClick={() => removeLang(lang.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', marginTop: '1.25rem' }}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addLang} className="add-entry-btn" style={{ marginTop: '0.75rem' }}>
          <Plus className="w-4 h-4" /> Add Language
        </button>
      </SectionCard>

      {/* Achievements */}
      <SectionCard title="Notable Achievements" icon={<Sparkles className="w-5 h-5" />}>
        <TextAreaField
          label="Awards & Recognition"
          value={data.achievements}
          onChange={v => setData({ ...data, achievements: v })}
          placeholder="e.g., Hackathon winner, Top contributor..."
          rows={4}
          hint="💡 Separate achievements with newlines or semicolons."
          id="textarea-achievements"
        />
      </SectionCard>
    </div>
  );
}
