import { Rocket, Plus, Trash2 } from 'lucide-react';
import InputField from '../shared/InputField';
import TextAreaField from '../shared/TextAreaField';
import SectionCard from '../shared/SectionCard';
import { useResume } from '../../context/ResumeContext';
import { generateId } from '../../types';

export default function StepProjects() {
  const { data, setData } = useResume();
  const items = data.projects;

  const add = () => {
    setData({ ...data, projects: [...items, { id: generateId(), name: '', technologies: '', description: '', link: '' }] });
  };

  const remove = (id: string) => {
    setData({ ...data, projects: items.filter(p => p.id !== id) });
  };

  const update = (idx: number, field: string, value: string) => {
    setData({ ...data, projects: items.map((p, i) => i === idx ? { ...p, [field]: value } : p) });
  };

  return (
    <SectionCard title="Key Projects" icon={<Rocket className="w-5 h-5" />}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map((proj, idx) => (
          <div key={proj.id} className="entry-card">
            <button onClick={() => remove(proj.id)} className="entry-delete" aria-label="Remove">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="entry-card-label">Project #{idx + 1}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <InputField label="Project Name" value={proj.name} onChange={v => update(idx, 'name', v)} placeholder="E-commerce Engine" />
              <InputField label="Technologies" value={proj.technologies} onChange={v => update(idx, 'technologies', v)} placeholder="Next.js, Prisma" />
            </div>
            <InputField label="Project Link" value={proj.link} onChange={v => update(idx, 'link', v)} placeholder="github.com/username/repo" />
            <TextAreaField
              label="Description"
              value={proj.description}
              onChange={v => update(idx, 'description', v)}
              rows={3}
              placeholder="Describe the impact and tech stack..."
            />
          </div>
        ))}
      </div>
      <button onClick={add} className="add-entry-btn" style={{ marginTop: '1rem' }}>
        <Plus className="w-5 h-5" /> Add Project
      </button>
    </SectionCard>
  );
}
