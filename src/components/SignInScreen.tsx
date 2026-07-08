import type { RefObject } from 'react';
import { Languages } from 'lucide-react';

interface SignInScreenProps {
  buttonRef: RefObject<HTMLDivElement | null>;
  scriptReady: boolean;
}

export function SignInScreen({ buttonRef, scriptReady }: SignInScreenProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950">
          <Languages className="text-blue-600 dark:text-blue-400" size={24} aria-hidden="true" />
        </div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          Difficult Translation Collection
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          This is an invitation-only research tool. Sign in with the Google account you were
          invited with to submit examples.
        </p>
        <div className="mt-6 flex justify-center" ref={buttonRef}>
          {!scriptReady && (
            <span className="text-sm text-slate-400">Loading sign-in…</span>
          )}
        </div>
      </div>
    </div>
  );
}
