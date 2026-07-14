import { ShieldAlert } from 'lucide-react';
import { useLocale } from '../lib/i18n/LocaleContext';

interface AccessDeniedScreenProps {
  email: string;
  onSignOut: () => void;
}

export function AccessDeniedScreen({ email, onSignOut }: AccessDeniedScreenProps) {
  const { t } = useLocale();

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950">
          <ShieldAlert className="text-amber-600 dark:text-amber-400" size={24} aria-hidden="true" />
        </div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          {t('accessDeniedTitle')}
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t('accessDeniedBody', { email })}
        </p>
        <button
          type="button"
          onClick={onSignOut}
          className="mt-6 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 focus-ring dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {t('tryDifferentAccount')}
        </button>
      </div>
    </div>
  );
}
