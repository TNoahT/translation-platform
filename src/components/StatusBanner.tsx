import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface StatusBannerProps {
  kind: 'success' | 'error';
  message: string;
}

/** Subtle, non-animated confirmation/error banner shown above the form. */
export function StatusBanner({ kind, message }: StatusBannerProps) {
  const isSuccess = kind === 'success';
  return (
    <div
      role="status"
      className={`mb-6 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${
        isSuccess
          ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
          : 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300'
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      ) : (
        <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      )}
      <span>{message}</span>
    </div>
  );
}
