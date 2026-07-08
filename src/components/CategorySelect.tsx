import { CATEGORY_OPTIONS, type Category } from '../types';
import { FieldLabel } from './FieldLabel';

interface CategorySelectProps {
  id: string;
  value: Category | '';
  onChange: (value: Category) => void;
  error?: string;
}

export function CategorySelect({ id, value, onChange, error }: CategorySelectProps) {
  return (
    <div>
      <FieldLabel htmlFor={id} required>
        Category
      </FieldLabel>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as Category)}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm transition-colors focus-ring dark:bg-slate-900 dark:text-slate-100 ${
          error ? 'border-red-300 dark:border-red-700' : 'border-slate-200 dark:border-slate-700'
        }`}
      >
        <option value="" disabled>
          Select a category…
        </option>
        {CATEGORY_OPTIONS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
