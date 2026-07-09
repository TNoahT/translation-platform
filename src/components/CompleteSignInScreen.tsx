import { Loader2, MailCheck } from 'lucide-react';

interface CompleteSignInScreenProps {
  status: 'ready' | 'exchanging' | 'error';
  error: string | null;
  onComplete: () => void;
  onBack: () => void;
}

/**
 * Shown after the user lands on the app via an emailed magic link. We
 * deliberately require an explicit click here rather than exchanging the
 * link token automatically on page load: some institutional email
 * systems pre-fetch (and sometimes fully render) links inside emails to
 * scan them for phishing/malware, which would otherwise silently consume
 * the one-time token before the real person arrives.
 */
export function CompleteSignInScreen({ status, error, onComplete, onBack }: CompleteSignInScreenProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950">
          <MailCheck className="text-blue-600 dark:text-blue-400" size={24} aria-hidden="true" />
        </div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          Finish signing in
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Click below to complete your sign-in.
        </p>

        <button
          type="button"
          onClick={onComplete}
          disabled={status === 'exchanging'}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-ring disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'exchanging' ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Signing you in…
            </>
          ) : (
            'Continue'
          )}
        </button>

        {status === 'error' && (
          <div className="mt-4">
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="button"
              onClick={onBack}
              className="mt-2 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Back to sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}