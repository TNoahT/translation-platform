import type { ReactNode } from 'react';
import { Tooltip } from './Tooltip';

interface FieldLabelProps {
  htmlFor: string;
  children: ReactNode;
  tooltip?: string;
  required?: boolean;
}

/** Consistent label styling for every form field, with an optional
 * tooltip and a visual + ARIA indicator for required fields. */
export function FieldLabel({ htmlFor, children, tooltip, required }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center text-sm font-medium text-slate-700 dark:text-slate-200"
    >
      {children}
      {required && (
        <span className="ml-0.5 text-blue-500" aria-hidden="true">
          *
        </span>
      )}
      {tooltip && <Tooltip text={tooltip} />}
    </label>
  );
}
