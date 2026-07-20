export function Input({ label, value, onChange, required = false, placeholder = '' }) {
  return (
    <label className="text-sm font-semibold text-slate-700">
      {label}
      <input
        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
      />
    </label>
  );
}

export function Select({ label, value, onChange, options }) {
  return (
    <label className="text-sm font-semibold text-slate-700">
      {label}
      <select
        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function TextArea({ label, value, onChange, required = false }) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <textarea
        className="mt-2 min-h-28 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </label>
  );
}
