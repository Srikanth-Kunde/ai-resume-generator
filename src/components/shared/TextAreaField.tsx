interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
  id?: string;
}

export default function TextAreaField({
  label, value, onChange, placeholder, rows = 4, hint, id,
}: TextAreaFieldProps) {
  return (
    <div className="field-wrapper">
      <label className="field-label" htmlFor={id}>{label}</label>
      {hint && <p className="field-hint">{hint}</p>}
      <textarea
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="field-input"
      />
    </div>
  );
}
