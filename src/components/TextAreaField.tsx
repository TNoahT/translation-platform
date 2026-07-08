import type { TextareaHTMLAttributes } from 'react';
import { FieldLabel } from './FieldLabel';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  tooltip?: string;
  required?: boolean;
  error?: string;
  maxLength?: number;
}

/** Large multiline textarea used for source text, target text, and the
 * difficulty explanation. Shows a live character counter and an inline
 * validation message when `error` is set. */
export function TextAreaField({
  id,
  label,
  tooltip,
  required,
  error,
  maxLength = 2000,
  value,
  className,
  ...rest
}: TextAreaFieldProps) {
  const length = typeof value === 'string' ? value.length : 0;

  return (
    <div>
      <div className="flex items-end justify-between">
        <FieldLabel htmlFor={id} tooltip={tooltip} required={required}>
          {label}
        </FieldLabel>
        <span className="counter mb-1.5 text-xs tabular-nums text-slate-400">
          {length}/{maxLength}
        </span>
      </div>
      <textarea
        id={id}
        value={value}
        maxLength={maxLength}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        rows={7}
        className={`w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 focus:border-blue-400 focus-ring dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 ${
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
