import type { ElementType } from 'react';

interface InputFieldProps {
  label: string;
  icon?: ElementType;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
}

export default function InputField({
  label, icon: Icon, value, onChange, placeholder, type = 'text', required = false, disabled = false, id,
}: InputFieldProps) {
  return (
    <div className="field-wrapper">
      <label className="field-label" htmlFor={id}>
        {Icon && <Icon className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />}
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="field-input"
      />
    </div>
  );
}
