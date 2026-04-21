import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import InputField from '../shared/InputField';
import TextAreaField from '../shared/TextAreaField';
import SectionCard from '../shared/SectionCard';
import { useResume } from '../../context/ResumeContext';
import { generateId } from '../../types';

export default function StepEducation() {
  const { data, setData } = useResume();
  const items = data.education;

  const add = () => {
    setData({
      ...data,
      education: [...items, { id: generateId(), school: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', highlights: '' }],
    });
  };

  const remove = (id: string) => {
    setData({ ...data, education: items.filter(e => e.id !== id) });
  };

  const update = (idx: number, field: string, value: string) => {
    setData({ ...data, education: items.map((e, i) => i === idx ? { ...e, [field]: value } : e) });
  };

  return (
    <SectionCard title="Education" icon={<GraduationCap className="w-5 h-5" />}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map((edu, idx) => (
          <div key={edu.id} className="entry-card">
            <button onClick={() => remove(edu.id)} className="entry-delete" aria-label="Remove">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="entry-card-label">Education #{idx + 1}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <InputField label="School" value={edu.school} onChange={v => update(idx, 'school', v)} placeholder="University of Future" />
              <InputField label="Degree" value={edu.degree} onChange={v => update(idx, 'degree', v)} placeholder="B.S. Computer Science" />
              <InputField label="Field of Study" value={edu.field} onChange={v => update(idx, 'field', v)} placeholder="Computer Science" />
              <InputField label="GPA" value={edu.gpa} onChange={v => update(idx, 'gpa', v)} placeholder="3.8/4.0" />
              <InputField label="Start Date" value={edu.startDate} onChange={v => update(idx, 'startDate', v)} placeholder="2018" />
              <InputField label="End Date" value={edu.endDate} onChange={v => update(idx, 'endDate', v)} placeholder="2022" />
            </div>
            <TextAreaField
              label="Highlights"
              value={edu.highlights}
              onChange={v => update(idx, 'highlights', v)}
              rows={2}
              placeholder="Dean's List, Research Assistant..."
            />
          </div>
        ))}
      </div>
      <button onClick={add} className="add-entry-btn" style={{ marginTop: '1rem' }}>
        <Plus className="w-5 h-5" /> Add Education
      </button>
    </SectionCard>
  );
}
