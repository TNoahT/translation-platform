import type { InputHTMLAttributes } from 'react';
import { FieldLabel } from './FieldLabel';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  tooltip?: string;
  required?: boolean;
  error?: string;
}

/** Single-line text input, styled consistently with the multiline
 * TextAreaField. Used for short free-text values like a display name. */
export function TextField({ id, label, tooltip, required, error, className, ...rest }: TextFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id} tooltip={tooltip} required={required}>
        {label}
      </FieldLabel>
      <input
        id={id}
        type="text"
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 focus:border-blue-400 focus-ring dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 ${
          error ? 'border-red-300 dark:border-red-700' : 'border-slate-200 dark:border-slate-700'
        } ${className ?? ''}`}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}