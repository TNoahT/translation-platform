import { AlertTriangle } from 'lucide-react';
import { useLocale } from '../lib/i18n/LocaleContext';

/**
 * Static guidance shown above the form fields, before anyone starts
 * typing. Two points are made deliberately separate:
 *  1. The example must be understandable/translatable by a human using
 *     only what's submitted here (use the "Additional information"
 *     field for anything else needed).
 *  2. No confidential/personal information, since submissions are
 *     visible to the research team.
 */
export function SubmissionGuidelines() {
  const { t } = useLocale();

  return (
    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
      <div className="flex items-start gap-2.5">
        <AlertTriangle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
        <div>
          <p className="font-medium">{t('guidelinesTitle')}</p>
          <ul className="mt-1.5 list-disc space-y-1.5 pl-4">
            <li>{t('guidelinesTranslatability')}</li>
            <li>{t('guidelinesConfidentiality')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}