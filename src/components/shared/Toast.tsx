import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  visible: boolean;
}

const icons = {
  success: <CheckCircle className="w-5 h-5" style={{ color: 'var(--success)' }} />,
  info: <Info className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />,
  warning: <AlertTriangle className="w-5 h-5" style={{ color: 'var(--warning)' }} />,
  error: <AlertTriangle className="w-5 h-5" style={{ color: 'var(--error)' }} />,
};

export default function Toast({ message, type = 'info', visible }: ToastProps) {
  return (
    <div className="toast-container">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -16, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="toast"
          >
            {icons[type] || <Sparkles className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />}
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
