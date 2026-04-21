import { Sun, Moon, LogOut, FileText, Settings, Undo2, Redo2, Trash2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';
import { motion } from 'framer-motion';

interface Props {
  onLoadSample: () => void;
  showPreview: boolean;
  onTogglePreview: () => void;
  onOpenAdmin?: () => void;
}

export default function Header({ onLoadSample, showPreview, onTogglePreview, onOpenAdmin }: Props) {
  const { isDark, toggle } = useTheme();
  const { role, logout } = useAuth();
  const { isSaving, lastSaved, undo, redo, canUndo, canRedo, resetData } = useResume();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      resetData();
    }
  };

  const formatTime = (ts: number | null) => {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Brand */}
        <div className="header-brand">
          <motion.div
            className="header-logo"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            R
          </motion.div>
          <div>
            <div className="header-title">ResumeAI</div>
            <div className="header-subtitle">AI-Powered Resume Builder</div>
          </div>
        </div>

        {/* Actions */}
        <div className="header-actions">
          {/* Save indicator */}
          {lastSaved && (
            <div className="save-indicator" style={{ marginRight: '0.25rem' }}>
              <div className={`save-dot ${isSaving ? 'saving' : ''}`} />
              <span>{isSaving ? 'Saving...' : `Saved ${formatTime(lastSaved)}`}</span>
            </div>
          )}

          {/* Undo/Redo */}
          <button onClick={undo} disabled={!canUndo} className="theme-toggle" title="Undo" style={{ opacity: canUndo ? 1 : 0.3 }}>
            <Undo2 className="w-4 h-4" />
          </button>
          <button onClick={redo} disabled={!canRedo} className="theme-toggle" title="Redo" style={{ opacity: canRedo ? 1 : 0.3 }}>
            <Redo2 className="w-4 h-4" />
          </button>

          {/* Clear Data */}
          <button onClick={handleReset} className="theme-toggle" title="Clear All Data">
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Theme toggle */}
          <button onClick={toggle} className="theme-toggle" title="Toggle theme">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Sample data */}
          <button onClick={onLoadSample} className="header-btn" style={{ display: 'none' }} id="btn-load-sample">
            <FileText className="w-4 h-4" /> Sample
          </button>
          <button onClick={onLoadSample} className="header-btn hidden sm:flex">
            <FileText className="w-4 h-4" /> Sample
          </button>

          {/* Preview toggle */}
          {showPreview && (
            <button onClick={onTogglePreview} className="header-btn">
              ← Edit
            </button>
          )}

          {/* Admin */}
          {role === 'admin' && onOpenAdmin && (
            <button onClick={onOpenAdmin} className="theme-toggle" title="Admin Settings">
              <Settings className="w-4 h-4" />
            </button>
          )}

          {/* Logout */}
          <button onClick={logout} className="theme-toggle" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
