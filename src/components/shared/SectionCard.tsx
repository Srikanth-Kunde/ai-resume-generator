import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function SectionCard({ title, icon, children, className = '' }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`section-card ${className}`}
    >
      <div className="section-card-header">
        <div className="section-card-icon">{icon}</div>
        <h3 className="section-card-title">{title}</h3>
      </div>
      <div className="section-card-body">{children}</div>
    </motion.div>
  );
}
