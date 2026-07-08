import { useId, useState, type ReactNode } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  /** The explanatory text shown on hover/focus. */
  text: string;
  children?: ReactNode;
}

/**
 * Small "?" icon that reveals a text tooltip on hover or keyboard focus.
 * Implemented with plain ARIA attributes rather than a UI library so the
 * component stays dependency-free and fully keyboard accessible.
 */
export function Tooltip({ text, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <span className="relative inline-flex items-center">
      {children}
      <button
        type="button"
        aria-describedby={id}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="ml-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus-ring rounded-full"
      >
        <HelpCircle size={15} aria-hidden="true" />
        <span className="sr-only">More information</span>
      </button>
      {visible && (
        <span
          role="tooltip"
          id={id}
          className="absolute left-0 top-full z-20 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-2.5 text-xs leading-relaxed text-slate-600 shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          {text}
        </span>
      )}
    </span>
  );
}
