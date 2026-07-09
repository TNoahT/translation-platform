interface CheckboxFieldProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

/** Accessible checkbox with a clickable label and optional helper text
 * underneath, styled consistently with the rest of the form. */
export function CheckboxField({ id, checked, onChange, label, description }: CheckboxFieldProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus-ring dark:border-slate-600 dark:bg-slate-900"
      />
      <label htmlFor={id} className="cursor-pointer text-sm text-slate-700 dark:text-slate-200">
        {label}
        {description && (
          <span className="mt-0.5 block text-xs font-normal text-slate-500 dark:text-slate-400">
            {description}
          </span>
        )}
      </label>
    </div>
  );
}