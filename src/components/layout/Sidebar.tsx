import { User, Target, Briefcase, GraduationCap, Wrench, Rocket, Award, Check } from 'lucide-react';
import ATSScoreCard from '../ai/ATSScoreCard';
import KeywordOptimizer from '../ai/KeywordOptimizer';
import { useResume } from '../../context/ResumeContext';

const steps = [
  { label: 'Personal', icon: <User className="w-4 h-4" /> },
  { label: 'Objective', icon: <Target className="w-4 h-4" /> },
  { label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
  { label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
  { label: 'Skills', icon: <Wrench className="w-4 h-4" /> },
  { label: 'Projects', icon: <Rocket className="w-4 h-4" /> },
  { label: 'Extras', icon: <Award className="w-4 h-4" /> },
];

interface Props {
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function Sidebar({ currentStep, onStepChange }: Props) {
  const { data } = useResume();

  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;

          return (
            <button
              key={idx}
              onClick={() => onStepChange(idx)}
              className={`sidebar-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="sidebar-step-icon">
                {isCompleted ? <Check className="w-4 h-4" /> : step.icon}
              </div>
              <span>{step.label}</span>
              {isCompleted && !isActive && (
                <Check className="w-3.5 h-3.5" style={{ marginLeft: 'auto', opacity: 0.6 }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* ATS Score */}
      <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
        <ATSScoreCard data={data} />
        <KeywordOptimizer data={data} />
      </div>
    </aside>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { steps };
