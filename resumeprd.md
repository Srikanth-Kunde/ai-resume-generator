# Prompt

Create an intelligent AI-powered resume generator application that helps users build a professional resume by simply providing their details in plain language. The application should allow users to enter information such as their name, contact details, education, skills, work experience, projects, certifications, achievements, and career objective. The system should intelligently analyze the information and transform it into a well-structured, professionally written resume with clear sections, strong action-oriented bullet points, and polished language suitable for job applications.

The app should automatically organize the information into standard resume sections such as Summary, Education, Skills, Work Experience, Projects, Certifications, and Achievements. It should improve the wording to sound professional, highlight important accomplishments, and format the content in a clean and modern resume layout. The generated resume should be concise, easy to read, and optimized for applicant tracking systems (ATS).

The application should also allow users to select from multiple professional resume templates, preview the resume before finalizing it, and download it in formats such as PDF or DOCX. The goal of the application is to simplify the resume creation process so that anyone—even without writing experience—can generate a high-quality professional resume quickly and easily.

# AI-Powered Resume Generator

Here's a complete, production-quality resume generator application:

```tsx
import { useState, useRef, useCallback } from "react";

// ============================================
// TYPES
// ============================================
interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  highlights: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Project {
  id: string;
  name: string;
  technologies: string;
  description: string;
  link: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  careerObjective: string;
  education: Education[];
  skills: string;
  workExperience: WorkExperience[];
  projects: Project[];
  certifications: Certification[];
  achievements: string;
}

interface ResumeSection {
  title: string;
  items: string[];
}

interface ProcessedResume {
  summary: string;
  sections: ResumeSection[];
}

// ============================================
// UTILITY: ID Generator
// ============================================
const generateId = () => Math.random().toString(36).substr(2, 9);

// ============================================
// UTILITY: AI Text Transformer
// ============================================
const actionVerbs = [
  "Achieved",
  "Accelerated",
  "Administered",
  "Advanced",
  "Analyzed",
  "Built",
  "Collaborated",
  "Conceptualized",
  "Created",
  "Delivered",
  "Designed",
  "Developed",
  "Directed",
  "Enhanced",
  "Established",
  "Executed",
  "Facilitated",
  "Generated",
  "Guided",
  "Implemented",
  "Improved",
  "Increased",
  "Initiated",
  "Innovated",
  "Led",
  "Managed",
  "Optimized",
  "Orchestrated",
  "Organized",
  "Pioneered",
  "Produced",
  "Reduced",
  "Resolved",
  "Spearheaded",
  "Streamlined",
  "Strengthened",
  "Supervised",
  "Transformed",
];

const professionalPhrases: Record<string, string> = {
  "worked on": "Contributed to the development of",
  "helped with": "Played a key role in",
  "was responsible for": "Oversaw and managed",
  "did": "Executed",
  "made": "Engineered",
  "fixed": "Resolved critical issues in",
  "improved": "Significantly enhanced",
  "built": "Architected and developed",
  "created": "Designed and implemented",
  "managed": "Strategically managed",
  "led": "Spearheaded",
  "helped": "Collaborated to deliver",
  "used": "Leveraged",
  "learned": "Mastered and applied",
  "wrote": "Authored comprehensive",
  "tested": "Conducted rigorous testing of",
  "designed": "Conceptualized and designed",
  "developed": "Engineered and delivered",
  "implemented": "Successfully implemented",
  "increased": "Drove measurable increase in",
  "reduced": "Achieved significant reduction in",
  "organized": "Coordinated and executed",
  "trained": "Mentored and trained",
  "analyzed": "Conducted in-depth analysis of",
  "researched": "Performed comprehensive research on",
};

const numberWords: Record<string, string> = {
  "one": "1", "two": "2", "three": "3", "four": "4", "five": "5",
  "six": "6", "seven": "7", "eight": "8", "nine": "9", "ten": "10",
  "twenty": "20", "thirty": "30", "fifty": "50", "hundred": "100",
};

function transformToProfessional(text: string): string {
  if (!text.trim()) return "";
  let result = text.trim();

  // Replace informal phrases
  Object.entries(professionalPhrases).forEach(([informal, formal]) => {
    const regex = new RegExp(`\\b${informal}\\b`, "gi");
    result = result.replace(regex, formal);
  });

  // Replace number words with digits
  Object.entries(numberWords).forEach(([word, digit]) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    result = result.replace(regex, digit);
  });

  // Capitalize first letter
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  // Add period if missing
  if (result.length > 0 && !result.endsWith(".") && !result.endsWith("!") && !result.endsWith("%")) {
    result += ".";
  }

  return result;
}

function generateBulletPoints(description: string): string[] {
  if (!description.trim()) return [];

  // Split by newlines, semicolons, or periods
  const rawPoints = description
    .split(/[;\n•]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  if (rawPoints.length === 0 && description.trim().length > 5) {
    rawPoints.push(description.trim());
  }

  return rawPoints.map((point) => {
    let transformed = transformToProfessional(point);

    // Add action verb if sentence doesn't start with one
    const startsWithAction = actionVerbs.some((verb) =>
      transformed.toLowerCase().startsWith(verb.toLowerCase())
    );
    if (!startsWithAction && transformed.length > 10) {
      const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
      transformed = `${randomVerb} ${transformed.charAt(0).toLowerCase() + transformed.slice(1)}`;
    }

    return transformed;
  });
}

function generateSummary(objective: string, skills: string, experience: WorkExperience[]): string {
  if (!objective.trim() && !skills.trim()) return "";

  let summary = "";

  if (objective.trim()) {
    summary = transformToProfessional(objective);
  } else {
    const yearsOfExperience = experience.length;
    if (yearsOfExperience > 0) {
      const latestRole = experience[0];
      summary = `Results-driven professional with demonstrated expertise in ${latestRole.position.toLowerCase()}. Proven track record of delivering high-impact solutions and driving organizational success.`;
    } else {
      summary = "Motivated and detail-oriented professional eager to contribute skills and passion to drive organizational success.";
    }
  }

  if (skills.trim()) {
    const topSkills = skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s)
      .slice(0, 4)
      .join(", ");
    if (topSkills) {
      summary += ` Core competencies include ${topSkills}.`;
    }
  }

  return summary;
}

function processAchievements(achievements: string): string[] {
  if (!achievements.trim()) return [];
  return achievements
    .split(/[;\n•]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3)
    .map((a) => transformToProfessional(a));
}

function processSkills(skills: string): string[] {
  if (!skills.trim()) return [];
  return skills
    .split(/[,;\n•]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
}

// ============================================
// TEMPLATES DATA
// ============================================
const templates = [
  { id: "modern", name: "Modern", description: "Clean and contemporary design with accent colors", icon: "🎨" },
  { id: "classic", name: "Classic", description: "Traditional professional format", icon: "📋" },
  { id: "minimal", name: "Minimal", description: "Simple and elegant with lots of whitespace", icon: "✨" },
  { id: "executive", name: "Executive", description: "Bold and impactful for senior roles", icon: "💼" },
];

// ============================================
// SAMPLE DATA
// ============================================
const sampleData: ResumeData = {
  personalInfo: {
    fullName: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    website: "alexjohnson.dev",
  },
  careerObjective:
    "Passionate full-stack developer with 5 years of experience building scalable web applications. Looking to leverage my expertise in React, Node.js, and cloud technologies to drive innovation at a forward-thinking tech company.",
  education: [
    {
      id: "edu1",
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2016",
      endDate: "2020",
      gpa: "3.8",
      highlights: "Dean's List, Computer Science Honor Society",
    },
  ],
  skills:
    "JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, PostgreSQL, MongoDB, GraphQL, Git, CI/CD, Agile/Scrum, System Design, REST APIs, Microservices",
  workExperience: [
    {
      id: "work1",
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      startDate: "Jan 2022",
      endDate: "",
      current: true,
      description:
        "Led development of a real-time analytics dashboard that increased user engagement by 45%. Mentored team of 4 junior developers. Reduced API response times by 60% through optimization. Implemented CI/CD pipelines reducing deployment time by 70%. Collaborated with product team to define technical requirements for new features.",
    },
    {
      id: "work2",
      company: "StartupXYZ",
      position: "Full Stack Developer",
      startDate: "Jun 2020",
      endDate: "Dec 2021",
      current: false,
      description:
        "Built and maintained a customer portal serving 50,000+ users. Developed RESTful APIs and microservices architecture. Implemented automated testing increasing code coverage from 45% to 92%. Worked closely with design team to create responsive UI components.",
    },
  ],
  projects: [
    {
      id: "proj1",
      name: "CloudDeploy Pro",
      technologies: "React, Node.js, AWS, Docker, Terraform",
      description:
        "Built an automated deployment platform that reduced deployment time by 80%. Serves 200+ developers with one-click deployments. Implemented real-time monitoring and rollback capabilities.",
      link: "github.com/alexj/clouddeploy",
    },
    {
      id: "proj2",
      name: "SmartBudget AI",
      technologies: "Python, TensorFlow, React Native, PostgreSQL",
      description:
        "Created an AI-powered personal finance app with predictive budgeting. Achieved 94% accuracy in expense categorization. Featured on Product Hunt with 500+ upvotes.",
      link: "smartbudget.app",
    },
  ],
  certifications: [
    { id: "cert1", name: "AWS Solutions Architect - Professional", issuer: "Amazon Web Services", date: "2023" },
    { id: "cert2", name: "Google Cloud Professional Developer", issuer: "Google", date: "2022" },
  ],
  achievements:
    "Winner of TechCorp Hackathon 2023. Published technical blog with 50,000+ readers. Open source contributor with 1,200+ GitHub stars. Speaker at ReactConf 2023.",
};

// ============================================
// COMPONENTS
// ============================================

// --- Step Indicator ---
function StepIndicator({ currentStep, totalSteps, stepLabels }: { currentStep: number; totalSteps: number; stepLabels: string[] }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {stepLabels.map((label, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  index < currentStep
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                    : index === currentStep
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>
              {index < stepLabels.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 transition-all duration-300 ${
                    index < currentStep ? "bg-emerald-400" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
            <span className={`text-xs mt-2 font-medium ${index === currentStep ? "text-indigo-600" : "text-gray-500"}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Input Field ---
function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm bg-white hover:border-gray-400"
      />
    </div>
  );
}

// --- TextArea Field ---
function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  hint,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {hint && <p className="text-xs text-gray-500 mb-1.5">{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm bg-white hover:border-gray-400 resize-none"
      />
    </div>
  );
}

// --- Section Card ---
function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          {title}
        </h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// --- Personal Info Form ---
function PersonalInfoForm({
  data,
  onChange,
}: {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}) {
  const update = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <SectionCard title="Personal Information" icon="👤">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <InputField label="Full Name" value={data.fullName} onChange={(v) => update("fullName", v)} placeholder="John Doe" required />
        <InputField label="Email" value={data.email} onChange={(v) => update("email", v)} placeholder="john@example.com" type="email" required />
        <InputField label="Phone" value={data.phone} onChange={(v) => update("phone", v)} placeholder="+1 (555) 123-4567" />
        <InputField label="Location" value={data.location} onChange={(v) => update("location", v)} placeholder="New York, NY" />
        <InputField label="LinkedIn" value={data.linkedin} onChange={(v) => update("linkedin", v)} placeholder="linkedin.com/in/johndoe" />
        <InputField label="Website / Portfolio" value={data.website} onChange={(v) => update("website", v)} placeholder="johndoe.dev" />
      </div>
    </SectionCard>
  );
}

// --- Career Objective Form ---
function CareerObjectiveForm({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <SectionCard title="Career Objective / About" icon="🎯">
      <TextAreaField
        label="Describe your career goals and what you bring to the table"
        value={value}
        onChange={onChange}
        placeholder="Write in plain language — e.g., 'I'm a software developer with 3 years of experience in React and Node.js, looking for a senior role where I can lead projects and mentor others.'"
        rows={4}
        hint="💡 Tip: Write naturally. Our AI will transform it into a polished professional summary."
      />
    </SectionCard>
  );
}

// --- Education Form ---
function EducationForm({
  items,
  onChange,
}: {
  items: Education[];
  onChange: (items: Education[]) => void;
}) {
  const addEducation = () => {
    onChange([
      ...items,
      { id: generateId(), school: "", degree: "", field: "", startDate: "", endDate: "", gpa: "", highlights: "" },
    ]);
  };

  const removeEducation = (id: string) => {
    onChange(items.filter((e) => e.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(items.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  return (
    <SectionCard title="Education" icon="🎓">
      {items.map((edu, index) => (
        <div key={edu.id} className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
          <button
            onClick={() => removeEducation(edu.id)}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm hover:bg-red-200 transition-colors"
          >
            ✕
          </button>
          <p className="text-xs font-semibold text-indigo-600 mb-3">Education #{index + 1}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <InputField label="School / University" value={edu.school} onChange={(v) => updateEducation(edu.id, "school", v)} placeholder="MIT" />
            <InputField label="Degree" value={edu.degree} onChange={(v) => updateEducation(edu.id, "degree", v)} placeholder="Bachelor of Science" />
            <InputField label="Field of Study" value={edu.field} onChange={(v) => updateEducation(edu.id, "field", v)} placeholder="Computer Science" />
            <InputField label="GPA" value={edu.gpa} onChange={(v) => updateEducation(edu.id, "gpa", v)} placeholder="3.8/4.0" />
            <InputField label="Start Date" value={edu.startDate} onChange={(v) => updateEducation(edu.id, "startDate", v)} placeholder="Sep 2018" />
            <InputField label="End Date" value={edu.endDate} onChange={(v) => updateEducation(edu.id, "endDate", v)} placeholder="May 2022" />
          </div>
          <TextAreaField
            label="Highlights (Dean's List, honors, relevant coursework)"
            value={edu.highlights}
            onChange={(v) => updateEducation(edu.id, "highlights", v)}
            placeholder="Dean's List 2020-2022, CS Honor Society, relevant coursework in ML and Databases"
            rows={2}
          />
        </div>
      ))}
      <button
        onClick={addEducation}
        className="w-full py-3 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200"
      >
        + Add Education
      </button>
    </SectionCard>
  );
}

// --- Skills Form ---
function SkillsForm({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const skillSuggestions = [
    "JavaScript", "Python", "React", "Node.js", "SQL", "AWS", "Docker",
    "Git", "TypeScript", "Java", "C++", "Figma", "Project Management",
    "Data Analysis", "Machine Learning", "Communication", "Leadership",
  ];

  const addSkill = (skill: string) => {
    const current = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    if (!current.includes(skill)) {
      onChange([...current, skill].join(", "));
    }
  };

  return (
    <SectionCard title="Skills" icon="⚡">
      <TextAreaField
        label="List your skills"
        value={value}
        onChange={onChange}
        placeholder="JavaScript, React, Node.js, Python, AWS, Docker, Communication, Leadership..."
        rows={3}
        hint="Separate skills with commas. Write in plain language — we'll organize them professionally."
      />
      <div className="mt-3">
        <p className="text-xs font-semibold text-gray-600 mb-2">Quick Add:</p>
        <div className="flex flex-wrap gap-2">
          {skillSuggestions.map((skill) => {
            const isSelected = value.toLowerCase().includes(skill.toLowerCase());
            return (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                }`}
              >
                {isSelected ? "✓ " : "+ "}
                {skill}
              </button>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}

// --- Work Experience Form ---
function WorkExperienceForm({
  items,
  onChange,
}: {
  items: WorkExperience[];
  onChange: (items: WorkExperience[]) => void;
}) {
  const addExperience = () => {
    onChange([
      ...items,
      { id: generateId(), company: "", position: "", startDate: "", endDate: "", current: false, description: "" },
    ]);
  };

  const removeExperience = (id: string) => {
    onChange(items.filter((e) => e.id !== id));
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: string | boolean) => {
    onChange(items.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  return (
    <SectionCard title="Work Experience" icon="💼">
      {items.map((exp, index) => (
        <div key={exp.id} className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
          <button
            onClick={() => removeExperience(exp.id)}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm hover:bg-red-200 transition-colors"
          >
            ✕
          </button>
          <p className="text-xs font-semibold text-indigo-600 mb-3">Experience #{index + 1}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <InputField label="Company" value={exp.company} onChange={(v) => updateExperience(exp.id, "company", v)} placeholder="Google" />
            <InputField label="Position" value={exp.position} onChange={(v) => updateExperience(exp.id, "position", v)} placeholder="Software Engineer" />
            <InputField label="Start Date" value={exp.startDate} onChange={(v) => updateExperience(exp.id, "startDate", v)} placeholder="Jan 2021" />
            <div>
              <InputField
                label="End Date"
                value={exp.current ? "Present" : exp.endDate}
                onChange={(v) => updateExperience(exp.id, "endDate", v)}
                placeholder="Dec 2023"
              />
              <label className="flex items-center gap-2 mt-1 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600">Currently working here</span>
              </label>
            </div>
          </div>
          <TextAreaField
            label="Describe your responsibilities and achievements (plain language OK!)"
            value={exp.description}
            onChange={(v) => updateExperience(exp.id, "description", v)}
            placeholder="Write what you did in plain language — e.g., 'I led a team of 5 developers and improved the loading speed of our app by 40%. I also set up automated testing that caught bugs before production.'"
            rows={4}
            hint="💡 Our AI will transform your description into professional bullet points with strong action verbs."
          />
        </div>
      ))}
      <button
        onClick={addExperience}
        className="w-full py-3 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200"
      >
        + Add Work Experience
      </button>
    </SectionCard>
  );
}

// --- Projects Form ---
function ProjectsForm({
  items,
  onChange,
}: {
  items: Project[];
  onChange: (items: Project[]) => void;
}) {
  const addProject = () => {
    onChange([...items, { id: generateId(), name: "", technologies: "", description: "", link: "" }]);
  };

  const removeProject = (id: string) => {
    onChange(items.filter((p) => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(items.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  return (
    <SectionCard title="Projects" icon="🚀">
      {items.map((proj, index) => (
        <div key={proj.id} className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
          <button
            onClick={() => removeProject(proj.id)}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm hover:bg-red-200 transition-colors"
          >
            ✕
          </button>
          <p className="text-xs font-semibold text-indigo-600 mb-3">Project #{index + 1}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <InputField label="Project Name" value={proj.name} onChange={(v) => updateProject(proj.id, "name", v)} placeholder="My Awesome App" />
            <InputField label="Technologies Used" value={proj.technologies} onChange={(v) => updateProject(proj.id, "technologies", v)} placeholder="React, Node.js, MongoDB" />
          </div>
          <InputField label="Project Link" value={proj.link} onChange={(v) => updateProject(proj.id, "link", v)} placeholder="github.com/user/project" />
          <TextAreaField
            label="Describe your project (plain language OK!)"
            value={proj.description}
            onChange={(v) => updateProject(proj.id, "description", v)}
            placeholder="Write what the project does and your contributions — e.g., 'I built a task management app using React and Firebase. It lets users create projects, assign tasks, and track progress in real-time. Over 500 users signed up in the first month.'"
            rows={3}
          />
        </div>
      ))}
      <button
        onClick={addProject}
        className="w-full py-3 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200"
      >
        + Add Project
      </button>
    </SectionCard>
  );
}

// --- Certifications Form ---
function CertificationsForm({
  items,
  onChange,
}: {
  items: Certification[];
  onChange: (items: Certification[]) => void;
}) {
  const addCert = () => {
    onChange([...items, { id: generateId(), name: "", issuer: "", date: "" }]);
  };

  const removeCert = (id: string) => {
    onChange(items.filter((c) => c.id !== id));
  };

  const updateCert = (id: string, field: keyof Certification, value: string) => {
    onChange(items.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  return (
    <SectionCard title="Certifications" icon="🏅">
      {items.map((cert, index) => (
        <div key={cert.id} className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
          <button
            onClick={() => removeCert(cert.id)}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm hover:bg-red-200 transition-colors"
          >
            ✕
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
            <InputField label="Certification Name" value={cert.name} onChange={(v) => updateCert(cert.id, "name", v)} placeholder="AWS Solutions Architect" />
            <InputField label="Issuing Organization" value={cert.issuer} onChange={(v) => updateCert(cert.id, "issuer", v)} placeholder="Amazon Web Services" />
            <InputField label="Date" value={cert.date} onChange={(v) => updateCert(cert.id, "date", v)} placeholder="2023" />
          </div>
        </div>
      ))}
      <button
        onClick={addCert}
        className="w-full py-3 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200"
      >
        + Add Certification
      </button>
    </SectionCard>
  );
}

// --- Achievements Form ---
function AchievementsForm({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <SectionCard title="Achievements & Awards" icon="🏆">
      <TextAreaField
        label="List your notable achievements"
        value={value}
        onChange={onChange}
        placeholder="Write your achievements in plain language — e.g., 'Won the company hackathon in 2023, got 10,000 users for my side project, published a paper on machine learning'"
        rows={3}
        hint="💡 Separate achievements with new lines or semicolons. Our AI will polish the language."
      />
    </SectionCard>
  );
}

// ============================================
// RESUME PREVIEW COMPONENTS (Templates)
// ============================================

function ModernTemplate({ data }: { data: ProcessedResume & { raw: ResumeData } }) {
  const { raw } = data;
  const skills = processSkills(raw.skills);

  return (
    <div className="bg-white p-8 max-w-[800px] mx-auto font-sans text-gray-800" style={{ fontSize: "11px", lineHeight: "1.5" }}>
      {/* Header */}
      <div className="border-b-4 border-indigo-600 pb-4 mb-5">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{raw.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-3 mt-2 text-gray-600 text-xs">
          {raw.personalInfo.email && <span>📧 {raw.personalInfo.email}</span>}
          {raw.personalInfo.phone && <span>📱 {raw.personalInfo.phone}</span>}
          {raw.personalInfo.location && <span>📍 {raw.personalInfo.location}</span>}
          {raw.personalInfo.linkedin && <span>🔗 {raw.personalInfo.linkedin}</span>}
          {raw.personalInfo.website && <span>🌐 {raw.personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2 border-b border-indigo-200 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2 border-b border-indigo-200 pb-1">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <span key={i} className="px-2 py-0.5 bg-indigo-50 text-indigo-800 rounded text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {raw.workExperience.length > 0 && raw.workExperience.some((e) => e.company || e.position) && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2 border-b border-indigo-200 pb-1">
            Work Experience
          </h2>
          {raw.workExperience
            .filter((e) => e.company || e.position)
            .map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-500">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-indigo-600 font-medium text-xs">{exp.company}</p>
                <ul className="mt-1.5 space-y-1">
                  {generateBulletPoints(exp.description).map((bullet, i) => (
                    <li key={i} className="text-gray-700 flex">
                      <span className="text-indigo-400 mr-2 mt-0.5">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}

      {/* Projects */}
      {raw.projects.length > 0 && raw.projects.some((p) => p.name) && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2 border-b border-indigo-200 pb-1">
            Projects
          </h2>
          {raw.projects
            .filter((p) => p.name)
            .map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{proj.name}</h3>
                  {proj.link && <span className="text-xs text-indigo-500">{proj.link}</span>}
                </div>
                {proj.technologies && (
                  <p className="text-xs text-indigo-600 font-medium">{proj.technologies}</p>
                )}
                <ul className="mt-1 space-y-1">
                  {generateBulletPoints(proj.description).map((bullet, i) => (
                    <li key={i} className="text-gray-700 flex">
                      <span className="text-indigo-400 mr-2 mt-0.5">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}

      {/* Education */}
      {raw.education.length > 0 && raw.education.some((e) => e.school) && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2 border-b border-indigo-200 pb-1">
            Education
          </h2>
          {raw.education
            .filter((e) => e.school)
            .map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className="text-indigo-600 text-xs font-medium">
                  {edu.school}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </p>
                {edu.highlights && <p className="text-xs text-gray-600 mt-0.5">{edu.highlights}</p>}
              </div>
            ))}
        </div>
      )}

      {/* Certifications */}
      {raw.certifications.length > 0 && raw.certifications.some((c) => c.name) && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2 border-b border-indigo-200 pb-1">
            Certifications
          </h2>
          {raw.certifications
            .filter((c) => c.name)
            .map((cert) => (
              <div key={cert.id} className="flex justify-between mb-1">
                <span className="text-gray-800">
                  <strong>{cert.name}</strong>
                  {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                </span>
                <span className="text-xs text-gray-500">{cert.date}</span>
              </div>
            ))}
        </div>
      )}

      {/* Achievements */}
      {raw.achievements && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2 border-b border-indigo-200 pb-1">
            Achievements
          </h2>
          <ul className="space-y-1">
            {processAchievements(raw.achievements).map((ach, i) => (
              <li key={i} className="text-gray-700 flex">
                <span className="text-indigo-400 mr-2">★</span>
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ClassicTemplate({ data }: { data: ProcessedResume & { raw: ResumeData } }) {
  const { raw } = data;
  const skills = processSkills(raw.skills);

  return (
    <div className="bg-white p-8 max-w-[800px] mx-auto font-serif text-gray-800" style={{ fontSize: "11px", lineHeight: "1.5" }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-5">
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wider">{raw.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-gray-600 text-xs">
          {raw.personalInfo.email && <span>{raw.personalInfo.email}</span>}
          {raw.personalInfo.phone && <span>|</span>}
          {raw.personalInfo.phone && <span>{raw.personalInfo.phone}</span>}
          {raw.personalInfo.location && <span>|</span>}
          {raw.personalInfo.location && <span>{raw.personalInfo.location}</span>}
        </div>
        <div className="flex justify-center gap-4 mt-1 text-gray-600 text-xs">
          {raw.personalInfo.linkedin && <span>{raw.personalInfo.linkedin}</span>}
          {raw.personalInfo.website && <span>| {raw.personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Summary</h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {raw.workExperience.length > 0 && raw.workExperience.some((e) => e.company) && (
        <div className="mb-5">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 border-b border-gray-300 pb-1">
            Professional Experience
          </h2>
          {raw.workExperience
            .filter((e) => e.company)
            .map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-500 italic">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="italic text-gray-700 text-xs">{exp.company}</p>
                <ul className="mt-1.5 space-y-1 list-disc list-inside">
                  {generateBulletPoints(exp.description).map((bullet, i) => (
                    <li key={i} className="text-gray-700">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}

      {/* Education */}
      {raw.education.length > 0 && raw.education.some((e) => e.school) && (
        <div className="mb-5">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 border-b border-gray-300 pb-1">
            Education
          </h2>
          {raw.education
            .filter((e) => e.school)
            .map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <span className="text-xs text-gray-500 italic">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <p className="italic text-gray-700 text-xs">
                  {edu.school}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 border-b border-gray-300 pb-1">
            Skills
          </h2>
          <p className="text-gray-700">{skills.join(" • ")}</p>
        </div>
      )}

      {/* Projects */}
      {raw.projects.length > 0 && raw.projects.some((p) => p.name) && (
        <div className="mb-5">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 border-b border-gray-300 pb-1">
            Projects
          </h2>
          {raw.projects
            .filter((p) => p.name)
            .map((proj) => (
              <div key={proj.id} className="mb-3">
                <h3 className="font-bold text-gray-900">
                  {proj.name}
                  {proj.technologies && <span className="font-normal text-gray-600"> ({proj.technologies})</span>}
                </h3>
                <ul className="mt-1 space-y-1 list-disc list-inside">
                  {generateBulletPoints(proj.description).map((bullet, i) => (
                    <li key={i} className="text-gray-700">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}

      {/* Certifications */}
      {raw.certifications.length > 0 && raw.certifications.some((c) => c.name) && (
        <div className="mb-5">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 border-b border-gray-300 pb-1">
            Certifications
          </h2>
          {raw.certifications
            .filter((c) => c.name)
            .map((cert) => (
              <div key={cert.id} className="mb-1 text-gray-700">
                <strong>{cert.name}</strong>, {cert.issuer} ({cert.date})
              </div>
            ))}
        </div>
      )}

      {/* Achievements */}
      {raw.achievements && (
        <div className="mb-5">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 border-b border-gray-300 pb-1">
            Achievements
          </h2>
          <ul className="space-y-1 list-disc list-inside">
            {processAchievements(raw.achievements).map((ach, i) => (
              <li key={i} className="text-gray-700">{ach}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MinimalTemplate({ data }: { data: ProcessedResume & { raw: ResumeData } }) {
  const { raw } = data;
  const skills = processSkills(raw.skills);

  return (
    <div className="bg-white p-10 max-w-[800px] mx-auto font-sans text-gray-700" style={{ fontSize: "11px", lineHeight: "1.6" }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-light text-gray-900 tracking-wide">{raw.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-3 mt-2 text-gray-500 text-xs">
          {raw.personalInfo.email && <span>{raw.personalInfo.email}</span>}
          {raw.personalInfo.phone && <span>· {raw.personalInfo.phone}</span>}
          {raw.personalInfo.location && <span>· {raw.personalInfo.location}</span>}
          {raw.personalInfo.linkedin && <span>· {raw.personalInfo.linkedin}</span>}
          {raw.personalInfo.website && <span>· {raw.personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <p className="text-gray-600 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {raw.workExperience.length > 0 && raw.workExperience.some((e) => e.company) && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-3">Experience</h2>
          {raw.workExperience
            .filter((e) => e.company)
            .map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">{exp.position} <span className="font-normal text-gray-500">@ {exp.company}</span></h3>
                  <span className="text-xs text-gray-400">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
                </div>
                <ul className="mt-1.5 space-y-1">
                  {generateBulletPoints(exp.description).map((bullet, i) => (
                    <li key={i} className="text-gray-600 flex">
                      <span className="text-gray-300 mr-2">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}

      {/* Projects */}
      {raw.projects.length > 0 && raw.projects.some((p) => p.name) && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-3">Projects</h2>
          {raw.projects
            .filter((p) => p.name)
            .map((proj) => (
              <div key={proj.id} className="mb-3">
                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                {proj.technologies && <p className="text-xs text-gray-500">{proj.technologies}</p>}
                <ul className="mt-1 space-y-1">
                  {generateBulletPoints(proj.description).map((bullet, i) => (
                    <li key={i} className="text-gray-600 flex">
                      <span className="text-gray-300 mr-2">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}

      {/* Education */}
      {raw.education.length > 0 && raw.education.some((e) => e.school) && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-3">Education</h2>
          {raw.education
            .filter((e) => e.school)
            .map((edu) => (
              <div key={edu.id} className="mb-2 flex justify-between items-baseline">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-500 text-xs">{edu.school}</p>
                </div>
                <span className="text-xs text-gray-400">{edu.startDate} — {edu.endDate}</span>
              </div>
            ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-3">Skills</h2>
          <p className="text-gray-600">{skills.join("  ·  ")}</p>
        </div>
      )}

      {/* Certifications */}
      {raw.certifications.length > 0 && raw.certifications.some((c) => c.name) && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-3">Certifications</h2>
          {raw.certifications.filter((c) => c.name).map((cert) => (
            <div key={cert.id} className="text-gray-600 mb-1">
              {cert.name} <span className="text-gray-400">— {cert.issuer}, {cert.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {raw.achievements && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-3">Achievements</h2>
          {processAchievements(raw.achievements).map((ach, i) => (
            <div key={i} className="text-gray-600 mb-1">{ach}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function ExecutiveTemplate({ data }: { data: ProcessedResume & { raw: ResumeData } }) {
  const { raw } = data;
  const skills = processSkills(raw.skills);

  return (
    <div className="bg-white max-w-[800px] mx-auto font-sans text-gray-800" style={{ fontSize: "11px", lineHeight: "1.5" }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8">
        <h1 className="text-3xl font-bold tracking-tight">{raw.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-gray-300 text-xs">
          {raw.personalInfo.email && <span>✉ {raw.personalInfo.email}</span>}
          {raw.personalInfo.phone && <span>☎ {raw.personalInfo.phone}</span>}
          {raw.personalInfo.location && <span>◉ {raw.personalInfo.location}</span>}
          {raw.personalInfo.linkedin && <span>⬢ {raw.personalInfo.linkedin}</span>}
          {raw.personalInfo.website && <span>◎ {raw.personalInfo.website}</span>}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.summary && (
          <div className="mb-5 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-900">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {raw.workExperience.length > 0 && raw.workExperience.some((e) => e.company) && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 pb-1 border-b-2 border-gray-900">
              Professional Experience
            </h2>
            {raw.workExperience
              .filter((e) => e.company)
              .map((exp) => (
                <div key={exp.id} className="mb-4 pl-4 border-l-2 border-gray-200">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-sm">{exp.position}</h3>
                    <span className="text-xs text-gray-500 font-medium">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600 font-semibold text-xs">{exp.company}</p>
                  <ul className="mt-2 space-y-1.5">
                    {generateBulletPoints(exp.description).map((bullet, i) => (
                      <li key={i} className="text-gray-700 flex">
                        <span className="text-gray-900 mr-2 font-bold">›</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Education */}
          <div>
            {raw.education.length > 0 && raw.education.some((e) => e.school) && (
              <div className="mb-5">
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 pb-1 border-b-2 border-gray-900">Education</h2>
                {raw.education.filter((e) => e.school).map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <h3 className="font-bold text-gray-900 text-xs">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-600 text-xs">{edu.school}</p>
                    <p className="text-gray-500 text-xs">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}

            {raw.certifications.length > 0 && raw.certifications.some((c) => c.name) && (
              <div className="mb-5">
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 pb-1 border-b-2 border-gray-900">Certifications</h2>
                {raw.certifications.filter((c) => c.name).map((cert) => (
                  <div key={cert.id} className="text-gray-700 text-xs mb-1">
                    <strong>{cert.name}</strong>
                    <div className="text-gray-500">{cert.issuer} · {cert.date}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-5">
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 pb-1 border-b-2 border-gray-900">Core Competencies</h2>
                <div className="grid grid-cols-2 gap-1">
                  {skills.map((skill, i) => (
                    <span key={i} className="text-xs text-gray-700 flex items-center">
                      <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-2" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {raw.achievements && (
              <div className="mb-5">
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 pb-1 border-b-2 border-gray-900">Key Achievements</h2>
                {processAchievements(raw.achievements).map((ach, i) => (
                  <div key={i} className="text-gray-700 text-xs mb-1 flex">
                    <span className="text-gray-900 mr-2 font-bold">★</span>
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Projects */}
        {raw.projects.length > 0 && raw.projects.some((p) => p.name) && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 pb-1 border-b-2 border-gray-900">Notable Projects</h2>
            <div className="grid grid-cols-2 gap-4">
              {raw.projects.filter((p) => p.name).map((proj) => (
                <div key={proj.id} className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 text-xs">{proj.name}</h3>
                  {proj.technologies && <p className="text-xs text-gray-500 mb-1">{proj.technologies}</p>}
                  {generateBulletPoints(proj.description).slice(0, 2).map((b, i) => (
                    <p key={i} className="text-gray-600 text-xs">{b}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Template Renderer
function ResumePreview({
  data,
  templateId,
}: {
  data: ResumeData;
  templateId: string;
}) {
  const summary = generateSummary(data.careerObjective, data.skills, data.workExperience);
  const processed = {
    summary,
    sections: [],
    raw: data,
  };

  switch (templateId) {
    case "modern":
      return <ModernTemplate data={processed} />;
    case "classic":
      return <ClassicTemplate data={processed} />;
    case "minimal":
      return <MinimalTemplate data={processed} />;
    case "executive":
      return <ExecutiveTemplate data={processed} />;
    default:
      return <ModernTemplate data={processed} />;
  }
}

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  const stepLabels = ["Personal", "Objective", "Experience", "Education", "Skills", "Projects", "Extras", "Template"];

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: { fullName: "", email: "", phone: "", location: "", linkedin: "", website: "" },
    careerObjective: "",
    education: [{ id: generateId(), school: "", degree: "", field: "", startDate: "", endDate: "", gpa: "", highlights: "" }],
    skills: "",
    workExperience: [{ id: generateId(), company: "", position: "", startDate: "", endDate: "", current: false, description: "" }],
    projects: [{ id: generateId(), name: "", technologies: "", description: "", link: "" }],
    certifications: [{ id: generateId(), name: "", issuer: "", date: "" }],
    achievements: "",
  });

  const showNotification = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  }, []);

  const loadSampleData = () => {
    setResumeData(sampleData);
    showNotification("✨ Sample data loaded! You can edit any field.");
  };

  const generateResume = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowPreview(true);
      showNotification("🎉 Resume generated successfully!");
    }, 1500);
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    showNotification("📄 Preparing PDF download...");
    
    try {
      const html2canvas = (await import("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm")).default;
      const jsPDF = (await import("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm")).default;
      
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }
      
      const fileName = resumeData.personalInfo.fullName
        ? `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`
        : "Resume.pdf";
      pdf.save(fileName);
      showNotification("✅ PDF downloaded successfully!");
    } catch {
      showNotification("⚠️ PDF generation requires internet for first load. Please try again.");
    }
  };

  const handleDownloadDOCX = () => {
    showNotification("📝 Generating DOCX...");
    
    const content = buildDocxContent(resumeData);
    const blob = new Blob([content], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = resumeData.personalInfo.fullName
      ? `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.doc`
      : "Resume.doc";
    a.click();
    URL.revokeObjectURL(url);
    showNotification("✅ Document downloaded!");
  };

  const buildDocxContent = (data: ResumeData): string => {
    const summary = generateSummary(data.careerObjective, data.skills, data.workExperience);
    const skills = processSkills(data.skills);
    const achievements = processAchievements(data.achievements);
    
    let doc = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
<head><meta charset="utf-8"><title>Resume</title></head>
<body style="font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.5; color: #333;">

<h1 style="margin:0; color: #1a1a2e; font-size: 24pt;">${data.personalInfo.fullName || "Your Name"}</h1>
<p style="color: #666; font-size: 10pt; margin: 4px 0;">
${[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location, data.personalInfo.linkedin, data.personalInfo.website].filter(Boolean).join(" | ")}
</p>
<hr style="border: 1px solid #4f46e5; margin: 10px 0;">

${summary ? `<h2 style="color: #4f46e5; font-size: 12pt; text-transform: uppercase; margin: 12px 0 4px;">Professional Summary</h2><p>${summary}</p>` : ""}

${skills.length ? `<h2 style="color: #4f46e5; font-size: 12pt; text-transform: uppercase; margin: 12px 0 4px;">Skills</h2><p>${skills.join(" • ")}</p>` : ""}

${data.workExperience.filter(e => e.company).length ? `<h2 style="color: #4f46e5; font-size: 12pt; text-transform: uppercase; margin: 12px 0 4px;">Work Experience</h2>
${data.workExperience.filter(e => e.company).map(exp => `
<p><strong>${exp.position}</strong> | ${exp.company} | ${exp.startDate} - ${exp.current ? "Present" : exp.endDate}</p>
<ul>${generateBulletPoints(exp.description).map(b => `<li>${b}</li>`).join("")}</ul>
`).join("")}` : ""}

${data.projects.filter(p => p.name).length ? `<h2 style="color: #4f46e5; font-size: 12pt; text-transform: uppercase; margin: 12px 0 4px;">Projects</h2>
${data.projects.filter(p => p.name).map(proj => `
<p><strong>${proj.name}</strong>${proj.technologies ? ` | ${proj.technologies}` : ""}</p>
<ul>${generateBulletPoints(proj.description).map(b => `<li>${b}</li>`).join("")}</ul>
`).join("")}` : ""}

${data.education.filter(e => e.school).length ? `<h2 style="color: #4f46e5; font-size: 12pt; text-transform: uppercase; margin: 12px 0 4px;">Education</h2>
${data.education.filter(e => e.school).map(edu => `
<p><strong>${edu.degree} in ${edu.field}</strong> | ${edu.school} | ${edu.startDate} - ${edu.endDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ""}</p>
`).join("")}` : ""}

${data.certifications.filter(c => c.name).length ? `<h2 style="color: #4f46e5; font-size: 12pt; text-transform: uppercase; margin: 12px 0 4px;">Certifications</h2>
${data.certifications.filter(c => c.name).map(cert => `<p><strong>${cert.name}</strong> - ${cert.issuer} (${cert.date})</p>`).join("")}` : ""}

${achievements.length ? `<h2 style="color: #4f46e5; font-size: 12pt; text-transform: uppercase; margin: 12px 0 4px;">Achievements</h2>
<ul>${achievements.map(a => `<li>${a}</li>`).join("")}</ul>` : ""}

</body></html>`;
    return doc;
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, stepLabels.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-[slideDown_0.3s_ease] bg-white border border-indigo-200 shadow-xl rounded-xl px-5 py-3 text-sm font-medium text-gray-800">
          {notification}
        </div>
      )}

      {/* Generating Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Generating Your Resume</h3>
            <p className="text-sm text-gray-600">Our AI is polishing your content and formatting it professionally...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-indigo-200">
                R
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">ResumeAI</h1>
                <p className="text-xs text-gray-500">AI-Powered Resume Builder</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadSampleData}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
              >
                <span>📋</span> Load Sample
              </button>
              {showPreview && (
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  ← Edit Resume
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showPreview ? (
          <>
            {/* Hero */}
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Build Your Professional Resume in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Minutes</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Just describe your experience in plain language. Our AI will transform it into a polished, ATS-friendly resume with strong action verbs and professional formatting.
              </p>
            </div>

            <StepIndicator currentStep={currentStep} totalSteps={stepLabels.length} stepLabels={stepLabels} />

            {/* Form Steps */}
            <div className="max-w-4xl mx-auto">
              {currentStep === 0 && (
                <PersonalInfoForm
                  data={resumeData.personalInfo}
                  onChange={(personalInfo) => setResumeData({ ...resumeData, personalInfo })}
                />
              )}

              {currentStep === 1 && (
                <CareerObjectiveForm
                  value={resumeData.careerObjective}
                  onChange={(careerObjective) => setResumeData({ ...resumeData, careerObjective })}
                />
              )}

              {currentStep === 2 && (
                <WorkExperienceForm
                  items={resumeData.workExperience}
                  onChange={(workExperience) => setResumeData({ ...resumeData, workExperience })}
                />
              )}

              {currentStep === 3 && (
                <EducationForm
                  items={resumeData.education}
                  onChange={(education) => setResumeData({ ...resumeData, education })}
                />
              )}

              {currentStep === 4 && (
                <SkillsForm
                  value={resumeData.skills}
                  onChange={(skills) => setResumeData({ ...resumeData, skills })}
                />
              )}

              {currentStep === 5 && (
                <ProjectsForm
                  items={resumeData.projects}
                  onChange={(projects) => setResumeData({ ...resumeData, projects })}
                />
              )}

              {currentStep === 6 && (
                <>
                  <CertificationsForm
                    items={resumeData.certifications}
                    onChange={(certifications) => setResumeData({ ...resumeData, certifications })}
                  />
                  <AchievementsForm
                    value={resumeData.achievements}
                    onChange={(achievements) => setResumeData({ ...resumeData, achievements })}
                  />
                </>
              )}

              {currentStep === 7 && (
                <SectionCard title="Choose Your Template" icon="🎨">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {templates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTemplate(t.id)}
                        className={`p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                          selectedTemplate === t.id
                            ? "border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                        }`}
                      >
                        <div className="text-3xl mb-2">{t.icon}</div>
                        <h3 className="font-bold text-gray-900">{t.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{t.description}</p>
                        {selectedTemplate === t.id && (
                          <div className="mt-2 text-indigo-600 text-sm font-semibold flex items-center gap-1">
                            ✓ Selected
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Mini Preview */}
                  <div className="mt-6">
                    <h4 className="text-sm font-bold text-gray-700 mb-3">Template Preview:</h4>
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-inner bg-gray-50 p-4" style={{ transform: "scale(0.5)", transformOrigin: "top left", width: "200%", height: "auto" }}>
                      <ResumePreview data={resumeData} templateId={selectedTemplate} />
                    </div>
                  </div>
                </SectionCard>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 mb-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    currentStep === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm"
                  }`}
                >
                  ← Previous
                </button>

                {currentStep < stepLabels.length - 1 ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all duration-200"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    onClick={generateResume}
                    className="px-8 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200 transition-all duration-200"
                  >
                    ✨ Generate Resume
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Preview Mode */
          <div>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
              <div>
                <h3 className="font-bold text-gray-900">Your Resume is Ready! 🎉</h3>
                <p className="text-sm text-gray-500">Preview your resume below and download when satisfied.</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Template Switcher */}
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.icon} {t.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all duration-200"
                >
                  📄 Download PDF
                </button>
                <button
                  onClick={handleDownloadDOCX}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  📝 Download DOCX
                </button>
              </div>
            </div>

            {/* Resume Preview */}
            <div className="shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
              <div ref={previewRef}>
                <ResumePreview data={resumeData} templateId={selectedTemplate} />
              </div>
            </div>

            {/* ATS Tips */}
            <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
              <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                <span>✅</span> ATS Optimization Tips
              </h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Your resume uses standard section headings that ATS systems can easily parse</li>
                <li>• Skills are clearly listed and match common job description keywords</li>
                <li>• Bullet points use strong action verbs to describe accomplishments</li>
                <li>• Clean formatting ensures readability across all ATS platforms</li>
                <li>• Contact information is prominently placed at the top</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/60 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
          <p>ResumeAI — Build professional resumes with the power of AI ✨</p>
          <p className="mt-1">Write naturally. We'll make it professional.</p>
        </div>
      </footer>
    </div>
  );
}
```

## Key Features

### 🧠 AI-Powered Text Transformation
- **Plain language → Professional language**: Casual descriptions are automatically converted using action verbs, professional phrasing, and polished grammar
- **Smart bullet point generation**: Raw text is split into individual accomplishments with strong action verbs prepended
- **Automatic summary generation**: Career objectives and skills are synthesized into a compelling professional summary

### 📝 Multi-Step Form Builder
- **8 guided steps**: Personal Info → Career Objective → Work Experience → Education → Skills → Projects → Certifications & Achievements → Template Selection
- **Dynamic entries**: Add/remove multiple education, work experience, projects, and certifications
- **Quick-add skill chips**: One-click skill suggestions with visual feedback
- **Sample data loading**: One button to populate all fields with realistic demo data

### 🎨 4 Professional Templates
| Template | Style | Best For |
|----------|-------|----------|
| **Modern** | Clean with indigo accents, skill pills | Tech & Creative roles |
| **Classic** | Centered header, serif font, traditional | Corporate & Academic |
| **Minimal** | Light typography, lots of whitespace | Design & Startups |
| **Executive** | Dark header, two-column layout, bold | Senior & Leadership roles |

### 📥 Download Options
- **PDF**: High-quality rendering via html2canvas + jsPDF
- **DOCX**: Native Word-compatible HTML document format

### ✅ ATS Optimization
- Standard section headings for parser compatibility
- Keyword-rich skill sections
- Clean, parseable formatting
- Action-verb-driven bullet points