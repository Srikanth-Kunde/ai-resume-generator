import { Briefcase, Plus, Trash2 } from 'lucide-react';
import InputField from '../shared/InputField';
import TextAreaField from '../shared/TextAreaField';
import SectionCard from '../shared/SectionCard';
import { useResume } from '../../context/ResumeContext';
import { generateId } from '../../types';

export default function StepExperience() {
  const { data, setData } = useResume();
  const exps = data.workExperience;

  const add = () => {
    setData({
      ...data,
      workExperience: [...exps, { id: generateId(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' }],
    });
  };

  const remove = (id: string) => {
    setData({ ...data, workExperience: exps.filter(e => e.id !== id) });
  };

  const update = (idx: number, field: string, value: string | boolean) => {
    setData({
      ...data,
      workExperience: exps.map((e, i) => i === idx ? { ...e, [field]: value } : e),
    });
  };

  return (
    <SectionCard title="Work Experience" icon={<Briefcase className="w-5 h-5" />}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {exps.map((exp, idx) => (
          <div key={exp.id} className="entry-card">
            <button onClick={() => remove(exp.id)} className="entry-delete" aria-label="Remove">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="entry-card-label">Position #{idx + 1}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <InputField label="Company" value={exp.company} onChange={v => update(idx, 'company', v)} placeholder="Tech Giants Corp" />
              <InputField label="Position" value={exp.position} onChange={v => update(idx, 'position', v)} placeholder="Senior Developer" />
              <InputField label="Start Date" value={exp.startDate} onChange={v => update(idx, 'startDate', v)} placeholder="Jan 2022" />
              <div>
                <InputField label="End Date" value={exp.current ? 'Present' : exp.endDate} onChange={v => update(idx, 'endDate', v)} placeholder="Present" disabled={exp.current} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '-0.5rem', marginBottom: '0.75rem' }}>
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={e => {
                      update(idx, 'current', e.target.checked);
                      if (e.target.checked) update(idx, 'endDate', '');
                    }}
                    style={{ accentColor: 'var(--accent-primary)' }}
                  />
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Currently working here</span>
                </label>
              </div>
            </div>
            <TextAreaField
              label="Description"
              value={exp.description}
              onChange={v => update(idx, 'description', v)}
              rows={4}
              hint="💡 What did you achieve? Write in plain English — our AI generates strong action verbs."
              placeholder="I managed a team of 5 and we built a new API..."
            />
          </div>
        ))}
      </div>
      <button onClick={add} className="add-entry-btn" style={{ marginTop: '1rem' }}>
        <Plus className="w-5 h-5" /> Add Work Experience
      </button>
    </SectionCard>
  );
}
