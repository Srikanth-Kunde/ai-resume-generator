import type { ResumeData } from '../../types';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';

interface Props {
  data: ResumeData;
  templateId: string;
}

export default function ResumePreview({ data, templateId }: Props) {
  switch (templateId) {
    case 'modern': return <ModernTemplate data={data} />;
    case 'classic': return <ClassicTemplate data={data} />;
    case 'minimal': return <MinimalTemplate data={data} />;
    case 'executive': return <ExecutiveTemplate data={data} />;
    default: return <ModernTemplate data={data} />;
  }
}
