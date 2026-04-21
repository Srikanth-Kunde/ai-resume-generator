import { lazy, Suspense } from 'react';
import type { ResumeData } from '../../types';
import { Loader2 } from 'lucide-react';

// Lazy load all templates for code splitting
const ModernTemplate = lazy(() => import('./templates/ModernTemplate'));
const ClassicTemplate = lazy(() => import('./templates/ClassicTemplate'));
const MinimalTemplate = lazy(() => import('./templates/MinimalTemplate'));
const ExecutiveTemplate = lazy(() => import('./templates/ExecutiveTemplate'));
const ProfessionalTemplate = lazy(() => import('./templates/ProfessionalTemplate'));
const CompactTemplate = lazy(() => import('./templates/CompactTemplate'));
const CelestialTemplate = lazy(() => import('./templates/CelestialTemplate'));
const GalaxyTemplate = lazy(() => import('./templates/GalaxyTemplate'));
const AstralTemplate = lazy(() => import('./templates/AstralTemplate'));
const LunaTemplate = lazy(() => import('./templates/LunaTemplate'));
const NovaTemplate = lazy(() => import('./templates/NovaTemplate'));
const SolarTemplate = lazy(() => import('./templates/SolarTemplate'));
const CreativeTemplate = lazy(() => import('./templates/CreativeTemplate'));
const ZenithTemplate = lazy(() => import('./templates/ZenithTemplate'));
const SolsticeTemplate = lazy(() => import('./templates/SolsticeTemplate'));
const EclipseTemplate = lazy(() => import('./templates/EclipseTemplate'));
const PulsarTemplate = lazy(() => import('./templates/PulsarTemplate'));
const HyperionTemplate = lazy(() => import('./templates/HyperionTemplate'));
const AetherTemplate = lazy(() => import('./templates/AetherTemplate'));
const ExoplanetTemplate = lazy(() => import('./templates/ExoplanetTemplate'));
const StarburstTemplate = lazy(() => import('./templates/StarburstTemplate'));
const CometTemplate = lazy(() => import('./templates/CometTemplate'));
const QuasarTemplate = lazy(() => import('./templates/QuasarTemplate'));

interface Props {
  data: ResumeData;
  templateId: string;
}

export default function ResumePreview({ data, templateId }: Props) {
  const renderTemplate = () => {
    switch (templateId) {
      case 'modern': return <ModernTemplate data={data} />;
      case 'classic': return <ClassicTemplate data={data} />;
      case 'minimal': return <MinimalTemplate data={data} />;
      case 'executive': return <ExecutiveTemplate data={data} />;
      case 'creative': return <CreativeTemplate data={data} />;
      case 'professional': return <ProfessionalTemplate data={data} />;
      case 'compact': return <CompactTemplate data={data} />;
      case 'celestial': return <CelestialTemplate data={data} />;
      case 'galaxy': return <GalaxyTemplate data={data} />;
      case 'astral': return <AstralTemplate data={data} />;
      case 'luna': return <LunaTemplate data={data} />;
      case 'nova': return <NovaTemplate data={data} />;
      case 'solar': return <SolarTemplate data={data} />;
      case 'zenith': return <ZenithTemplate data={data} />;
      case 'solstice': return <SolsticeTemplate data={data} />;
      case 'eclipse': return <EclipseTemplate data={data} />;
      case 'pulsar': return <PulsarTemplate data={data} />;
      case 'hyperion': return <HyperionTemplate data={data} />;
      case 'aether': return <AetherTemplate data={data} />;
      case 'exoplanet': return <ExoplanetTemplate data={data} />;
      case 'starburst': return <StarburstTemplate data={data} />;
      case 'comet': return <CometTemplate data={data} />;
      case 'quasar': return <QuasarTemplate data={data} />;
      default: return <ModernTemplate data={data} />;
    }
  };

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center p-20 text-slate-400 bg-white rounded-xl shadow-sm border border-slate-100 min-h-[600px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-accent-primary" />
          <span className="text-sm font-medium">Preparing Premium Template...</span>
        </div>
      </div>
    }>
      {renderTemplate()}
    </Suspense>
  );
}
