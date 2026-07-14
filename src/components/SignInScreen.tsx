import type { RefObject } from 'react';
import { Languages } from 'lucide-react';
import { EmailSignInForm } from './EmailSignInForm';
import { ProjectIntro } from './ProjectIntro';
import { useLocale } from '../lib/i18n/LocaleContext';

interface SignInScreenProps {
  buttonRef: RefObject<HTMLDivElement | null>;
  scriptReady: boolean;
  emailStatus: 'idle' | 'sending' | 'sent' | 'ready' | 'exchanging' | 'error';
  emailError: string | null;
  emailSentTo: string | null;
  onRequestEmailLink: (email: string) => void;
  onResetEmail: () => void;
}

export function SignInScreen({
  buttonRef,
  scriptReady,
  emailStatus,
  emailError,
  emailSentTo,
  onRequestEmailLink,
  onResetEmail,
}: SignInScreenProps) {
  const { t } = useLocale();

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <ProjectIntro />

        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950">
            <Languages className="text-blue-600 dark:text-blue-400" size={24} aria-hidden="true" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Difficult Translation Collection
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t('signInSubtitle')}</p>

          <div className="mt-6 flex justify-center" ref={buttonRef}>
            {!scriptReady && <span className="text-sm text-slate-400">{t('loadingSignIn')}</span>}
          </div>

          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            {t('orDivider')}
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>

          <div className="text-left">
            <p className="mb-2 text-center text-xs text-slate-500 dark:text-slate-400">
              {t('noGoogleAccount')}
            </p>
            <EmailSignInForm
              status={emailStatus}
              error={emailError}
              sentTo={emailSentTo}
              onRequestLink={onRequestEmailLink}
              onReset={onResetEmail}
            />
          </div>
        </div>
      </div>
    </div>
  );
}