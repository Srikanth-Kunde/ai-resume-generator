import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import InputField from '../shared/InputField';
import SectionCard from '../shared/SectionCard';
import { useResume } from '../../context/ResumeContext';

export default function StepPersonal() {
  const { data, setData } = useResume();
  const pi = data.personalInfo;

  const update = (field: keyof typeof pi, value: string) => {
    setData({ ...data, personalInfo: { ...pi, [field]: value } });
  };

  return (
    <SectionCard title="Personal Information" icon={<User className="w-5 h-5" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <InputField label="Full Name" icon={User} value={pi.fullName} onChange={v => update('fullName', v)} placeholder="John Doe" required id="input-fullname" />
        <InputField label="Email" icon={Mail} value={pi.email} onChange={v => update('email', v)} placeholder="john@example.com" type="email" required id="input-email" />
        <InputField label="Phone" icon={Phone} value={pi.phone} onChange={v => update('phone', v)} placeholder="+1 (555) 000-0000" id="input-phone" />
        <InputField label="Location" icon={MapPin} value={pi.location} onChange={v => update('location', v)} placeholder="City, Country" id="input-location" />
        <InputField label="LinkedIn" icon={Linkedin} value={pi.linkedin} onChange={v => update('linkedin', v)} placeholder="linkedin.com/in/username" id="input-linkedin" />
        <InputField label="Website" icon={Globe} value={pi.website} onChange={v => update('website', v)} placeholder="portfolio.dev" id="input-website" />
      </div>
    </SectionCard>
  );
}
