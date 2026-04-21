import { Wrench } from 'lucide-react';
import TextAreaField from '../shared/TextAreaField';
import SectionCard from '../shared/SectionCard';
import { useResume } from '../../context/ResumeContext';
import { generateSkillSuggestions } from '../../utils/ai-engine';
import { useMemo } from 'react';

const DEFAULT_SUGGESTIONS = [
  'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker',
  'Git', 'TypeScript', 'Java', 'C++', 'Figma', 'Project Management',
  'Data Analysis', 'Machine Learning', 'Communication', 'Leadership',
];

export default function StepSkills() {
  const { data, setData } = useResume();

  const suggestions = useMemo(() => {
    if (data.targetJob.length > 2) {
      return generateSkillSuggestions(data.targetJob);
    }
    return DEFAULT_SUGGESTIONS;
  }, [data.targetJob]);

  const addSkill = (skill: string) => {
    const current = data.skills.split(',').map(s => s.trim()).filter(Boolean);
    if (!current.some(s => s.toLowerCase() === skill.toLowerCase())) {
      setData({ ...data, skills: [...current, skill].join(', ') });
    }
  };

  const isSelected = (skill: string) =>
    data.skills.toLowerCase().includes(skill.toLowerCase());

  return (
    <SectionCard title="Skills" icon={<Wrench className="w-5 h-5" />}>
      <TextAreaField
        label="Your Expertise"
        value={data.skills}
        onChange={v => setData({ ...data, skills: v })}
        hint="💡 List your skills separated by commas. We'll format them beautifully."
        placeholder="React, TypeScript, Node.js, System Design, UI/UX..."
        rows={5}
        id="textarea-skills"
      />
      <div style={{ marginTop: '1rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {data.targetJob ? `Suggested for "${data.targetJob}":` : 'Quick Add:'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {suggestions.map(skill => (
            <button
              key={skill}
              onClick={() => addSkill(skill)}
              className={`skill-chip ${isSelected(skill) ? 'selected' : ''}`}
            >
              {isSelected(skill) ? '✓ ' : '+ '}{skill}
            </button>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
