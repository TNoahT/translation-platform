import { ShieldAlert } from 'lucide-react';

interface AccessDeniedScreenProps {
  email: string;
  onSignOut: () => void;
}

export function AccessDeniedScreen({ email, onSignOut }: AccessDeniedScreenProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950">
          <ShieldAlert className="text-amber-600 dark:text-amber-400" size={24} aria-hidden="true" />
        </div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Access denied</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="font-medium">{email}</span> isn't on the list of invited contributors
          yet. If you believe this is a mistake, please reach out to the project organizer to be
          added.
        </p>
        <button
          type="button"
          onClick={onSignOut}
          className="mt-6 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 focus-ring dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Try a different account
        </button>
      </div>
    </div>
  );
}
