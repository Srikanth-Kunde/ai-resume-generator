import { Target } from 'lucide-react';
import InputField from '../shared/InputField';
import TextAreaField from '../shared/TextAreaField';
import SectionCard from '../shared/SectionCard';
import { useResume } from '../../context/ResumeContext';

export default function StepObjective() {
  const { data, setData } = useResume();

  return (
    <SectionCard title="Career Objective" icon={<Target className="w-5 h-5" />}>
      <InputField
        label="Target Job Title"
        value={data.targetJob}
        onChange={v => setData({ ...data, targetJob: v })}
        placeholder="e.g., Senior Frontend Engineer"
        id="input-target-job"
      />
      <TextAreaField
        label="Profile Summary"
        value={data.careerObjective}
        onChange={v => setData({ ...data, careerObjective: v })}
        hint="💡 Describe your career goals. If left empty, our AI will generate a powerful summary based on your experience and target role."
        placeholder="e.g., I'm a software developer with 5 years of experience in React..."
        rows={6}
        id="textarea-objective"
      />
    </SectionCard>
  );
}
