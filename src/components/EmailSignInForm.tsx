import { useState, type FormEvent } from 'react';
import { Loader2, Mail, MailCheck } from 'lucide-react';
import { useLocale } from '../lib/i18n/LocaleContext';

interface EmailSignInFormProps {
  status: 'idle' | 'sending' | 'sent' | 'ready' | 'exchanging' | 'error';
  error: string | null;
  sentTo: string | null;
  onRequestLink: (email: string) => void;
  onReset: () => void;
}

/**
 * Lets contributors without a Google account sign in via a one-time
 * emailed link instead. Mirrors the "no passwords, invitation-only"
 * design of Google Sign-In: only emails already on the Users sheet will
 * ever receive a link, but the UI never confirms or denies that to avoid
 * leaking who is invited.
 */
export function EmailSignInForm({ status, error, sentTo, onRequestLink, onReset }: EmailSignInFormProps) {
  const { t } = useLocale();
  const [email, setEmail] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email.trim()) onRequestLink(email.trim());
  }

  if (status === 'sent') {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-700 dark:bg-slate-800/50">
        <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
          <MailCheck size={16} className="text-emerald-500" aria-hidden="true" />
          {t('checkInboxTitle')}
        </div>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          {t('checkInboxBody', { email: sentTo ?? '' })}
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-2 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          {t('useDifferentEmail')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label htmlFor="magic-link-email" className="sr-only">
        {t('emailAddressLabel')}
      </label>
      <div className="flex gap-2">
        <input
          id="magic-link-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm focus-ring dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-ring disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {status === 'sending' ? (
            <Loader2 size={15} className="animate-spin" aria-hidden="true" />
          ) : (
            <Mail size={15} aria-hidden="true" />
          )}
          {t('sendLinkButton')}
        </button>
      </div>
      {status === 'error' && error && <p className="text-xs text-red-500">{error}</p>}
    </form>
  );
}