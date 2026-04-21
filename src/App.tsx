import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Download, FileText, FileJson, Upload, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { useResume } from './context/ResumeContext';
import LoginScreen from './components/auth/LoginScreen';
import Header from './components/layout/Header';
import Sidebar, { steps } from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Toast from './components/shared/Toast';
import Modal from './components/shared/Modal';
import StepPersonal from './components/builder/StepPersonal';
import StepObjective from './components/builder/StepObjective';
import StepExperience from './components/builder/StepExperience';
import StepEducation from './components/builder/StepEducation';
import StepSkills from './components/builder/StepSkills';
import StepProjects from './components/builder/StepProjects';
import StepExtras from './components/builder/StepExtras';
import ResumePreview from './components/preview/ResumePreview';
import CoverLetterModal from './components/cover-letter/CoverLetterModal';
import { downloadPDF, downloadDOCX } from './utils/pdf-export';
import { exportAsJSON, importFromJSON, saveToHistory } from './utils/storage';
import { templates, THEME_OPTIONS } from './components/builder/StepTemplate';
import type { UserRole } from './types';

// ============================================
// APP COMPONENT
// ============================================
export default function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-secondary)' }}>
        <div className="generating-spinner" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <Dashboard />;
}

// ============================================
// DASHBOARD
// ============================================
function Dashboard() {
  const { data, setData, loadSample } = useResume();
  const { role } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Toast
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'success' | 'info' | 'warning' | 'error'>('info');
  const [toastVisible, setToastVisible] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const notify = useCallback((msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, []);

  const generateResume = async () => {
    setIsGenerating(true);
    saveToHistory(data);
    await new Promise(r => setTimeout(r, 1200));
    setIsGenerating(false);
    setShowPreview(true);
    notify('Resume generated! 🎉', 'success');
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    notify('Preparing PDF...', 'info');
    const fileName = data.personalInfo.fullName
      ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
      : 'Resume.pdf';
    await downloadPDF(previewRef.current, fileName, (msg) => notify(msg));
  };

  const handleDownloadDOCX = () => {
    downloadDOCX(data, (msg) => notify(msg, 'success'));
  };

  const handleExportJSON = () => {
    exportAsJSON(data);
    notify('Resume data exported as JSON.', 'success');
  };

  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importFromJSON(file);
      setData(imported);
      notify('Resume data imported!', 'success');
    } catch {
      notify('Invalid file format.', 'error');
    }
    e.target.value = '';
  };

  const triggerImport = () => {
    const input = document.getElementById('json-import-input') as HTMLInputElement;
    input?.click();
  };

  const nextStep = () => setCurrentStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 0));

  // Step animation direction
  const [direction, setDirection] = useState(0);
  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepPersonal />;
      case 1: return <StepObjective />;
      case 2: return <StepExperience />;
      case 3: return <StepEducation />;
      case 4: return <StepSkills />;
      case 5: return <StepProjects />;
      case 6: return <StepExtras />;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-secondary)', display: 'flex', flexDirection: 'column' }}>
      <Toast message={toastMsg} type={toastType} visible={toastVisible} />
      <Header
        onLoadSample={loadSample}
        showPreview={showPreview}
        onTogglePreview={() => setShowPreview(false)}
        onOpenAdmin={role === 'admin' ? () => setShowAdmin(true) : undefined}
      />

      {/* Mobile step indicator */}
      {!showPreview && (
        <div className="mobile-steps">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToStep(idx)}
              className={`mobile-step-dot ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
              style={{ border: 'none', cursor: 'pointer' }}
            />
          ))}
        </div>
      )}

      {/* Generating overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="generating-overlay"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="generating-card"
            >
              <div className="generating-spinner" />
              <h3 style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Generating Your Resume</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>AI is enhancing your content...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ flex: 1 }}>
        {!showPreview ? (
          <div className="builder-layout">
            <Sidebar currentStep={currentStep} onStepChange={goToStep} />
            <div className="builder-main">
              {/* Hero (mobile only - step title) */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  {steps[currentStep]?.label || 'Resume Builder'}
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: 500, marginTop: '0.25rem' }}>
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>

              {/* Step content with animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: direction * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 30 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="builder-nav-footer">
                <button onClick={() => { setDirection(-1); prevStep(); }} disabled={currentStep === 0} className="nav-btn nav-btn-prev">
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                {currentStep < steps.length - 1 ? (
                  <button onClick={() => { setDirection(1); nextStep(); }} className="nav-btn nav-btn-next">
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={generateResume} className="nav-btn nav-btn-generate">
                    <Sparkles className="w-5 h-5" /> Generate Resume
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ============================================ */
          /* PREVIEW MODE                                */
          /* ============================================ */
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
            {/* Toolbar */}
            <div className="preview-toolbar">
              <div>
                <h3 style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Your Resume is Ready 🎉</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>Preview, switch templates, and download.</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                <select
                  value={selectedTemplate}
                  onChange={e => setSelectedTemplate(e.target.value)}
                  className="field-input"
                  style={{ width: 'auto', cursor: 'pointer', fontWeight: 600 }}
                >
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                <select
                  value={data.themeColor || 'slate'}
                  onChange={e => setData({ ...data, themeColor: e.target.value })}
                  className="field-input"
                  style={{ width: 'auto', cursor: 'pointer', fontWeight: 600 }}
                >
                  {THEME_OPTIONS.map(theme => (
                    <option key={theme.id} value={theme.id}>{theme.name}</option>
                  ))}
                </select>

                <button onClick={handleDownloadPDF} className="header-btn header-btn-primary" style={{ background: 'var(--accent-gradient)', color: 'white', border: 'none' }}>
                  <Download className="w-4 h-4" /> PDF
                </button>
                <button onClick={handleDownloadDOCX} className="header-btn">
                  <FileText className="w-4 h-4" /> DOCX
                </button>
                <button onClick={triggerImport} className="header-btn">
                  <Upload className="w-4 h-4" /> Import JSON
                </button>
                <input
                  type="file"
                  id="json-import-input"
                  accept=".json"
                  onChange={handleImportJSON}
                  style={{ display: 'none' }}
                />
                <button onClick={handleExportJSON} className="header-btn">
                  <FileJson className="w-4 h-4" /> JSON
                </button>
                <button onClick={() => setShowCoverLetter(true)} className="header-btn">
                  <FileText className="w-4 h-4" /> Cover Letter
                </button>
              </div>
            </div>

            {/* Resume preview */}
            <div className="preview-container">
              <div ref={previewRef}>
                <ResumePreview data={data} templateId={selectedTemplate} />
              </div>
            </div>

            {/* ATS Tips */}
            <div style={{
              marginTop: '1.5rem', padding: '1.5rem',
              background: 'var(--success-bg)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-light)',
            }}>
              <h4 style={{ fontWeight: 800, color: 'var(--success)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ✅ ATS Optimization Active
              </h4>
              <ul style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <li>• Standard section headings for ATS parser compatibility</li>
                <li>• Action-verb-driven bullet points for impact</li>
                <li>• Keyword-rich skills section for matching</li>
                <li>• Clean formatting for readability across platforms</li>
                <li>• Contact information prominently placed</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Cover Letter Modal */}
      <CoverLetterModal
        isOpen={showCoverLetter}
        onClose={() => setShowCoverLetter(false)}
        data={data}
        onNotify={notify}
      />

      {/* Admin Modal */}
      {role === 'admin' && (
        <AdminModal isOpen={showAdmin} onClose={() => setShowAdmin(false)} onNotify={notify} />
      )}
    </div>
  );
}

// ============================================
// ADMIN MODAL
// ============================================
function AdminModal({ isOpen, onClose, onNotify }: { isOpen: boolean; onClose: () => void; onNotify: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void }) {
  const { changePassword } = useAuth();
  const [targetRole, setTargetRole] = useState<UserRole>('user');
  const [newCode, setNewCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async () => {
    if (newCode.length < 4) {
      onNotify('Code must be at least 4 characters.', 'warning');
      return;
    }
    setIsLoading(true);
    const result = await changePassword(targetRole, newCode);
    setIsLoading(false);
    if (result.success) {
      onNotify(`${targetRole === 'admin' ? 'Admin' : 'User'} access code updated!`, 'success');
      setNewCode('');
      onClose();
    } else {
      onNotify(result.error || 'Failed to update.', 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Admin Settings" maxWidth="420px">
      <div style={{ padding: '1.5rem' }}>
        <div className="field-wrapper">
          <label className="field-label">Target Account</label>
          <select
            value={targetRole}
            onChange={e => setTargetRole(e.target.value as UserRole)}
            className="field-input"
            style={{ cursor: 'pointer' }}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="field-wrapper">
          <label className="field-label"><Lock className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} /> New Access Code</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showCode ? 'text' : 'password'}
              value={newCode}
              onChange={e => setNewCode(e.target.value)}
              placeholder="Enter new code (min 4 chars)"
              className="field-input"
              style={{ paddingRight: '2.5rem' }}
            />
            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              style={{
                position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer',
              }}
            >
              {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          onClick={handleChange}
          disabled={isLoading || newCode.length < 4}
          className="header-btn header-btn-primary"
          style={{
            width: '100%', justifyContent: 'center', padding: '0.75rem',
            background: 'var(--accent-gradient)', color: 'white', border: 'none',
            borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '0.875rem',
            opacity: isLoading || newCode.length < 4 ? 0.6 : 1,
            cursor: isLoading || newCode.length < 4 ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? 'Updating...' : 'Update Access Code'}
        </button>
      </div>
    </Modal>
  );
}
