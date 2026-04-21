import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, X } from 'lucide-react';
import type { ResumeData } from '../../types';
import { generateCoverLetter } from '../../utils/ai-engine';
import { downloadPDF } from '../../utils/pdf-export';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
  onNotify: (msg: string) => void;
}

export default function CoverLetterModal({ isOpen, onClose, data, onNotify }: Props) {
  const [content, setContent] = useState(() => generateCoverLetter(data));
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!previewRef.current) return;
    const fileName = `${data.personalInfo.fullName?.replace(/\s+/g, '_') || 'Cover'}_Letter.pdf`;
    await downloadPDF(previewRef.current, fileName, (msg) => onNotify(msg));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="modal-content"
            style={{ maxWidth: '900px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-light)', background: 'var(--surface-tertiary)' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} /> AI Cover Letter
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={handleDownload} className="header-btn-primary header-btn" style={{ background: 'var(--accent-gradient)', color: 'white', border: 'none' }}>
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                <button onClick={onClose} className="header-btn">
                  <X className="w-4 h-4" /> Close
                </button>
              </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem', display: 'flex', gap: '1.5rem', background: 'var(--surface-secondary)' }}>
              {/* Editor */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  Edit Content
                </label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="field-input"
                  style={{ flex: 1, minHeight: '400px', fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}
                />
              </div>

              {/* Preview */}
              <div style={{ width: '380px', display: 'flex', flexDirection: 'column' }} className="hidden lg:flex">
                <label style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  Preview
                </label>
                <div
                  ref={previewRef}
                  style={{
                    flex: 1, background: 'white', padding: '2rem', borderRadius: 'var(--radius-sm)',
                    boxShadow: 'var(--shadow-md)', overflow: 'auto', fontSize: '12px', color: '#1e293b',
                    fontFamily: "'Inter', sans-serif", lineHeight: 1.7,
                  }}
                >
                  {content.split('\n').map((line, i) => (
                    <p key={i} style={{ margin: line.trim() === '' ? '12px 0' : '0 0 4px', minHeight: line.trim() === '' ? '8px' : undefined }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
