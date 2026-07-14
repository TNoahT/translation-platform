import { useLocale } from '../lib/i18n/LocaleContext';
import { PROJECT_INTRO } from '../config/content';

/**
 * Explains the project to visitors, shown above the sign-in card and
 * above the submission form. Content lives in `src/config/content.ts`
 * (not strings.ts) since it's project-specific wording a maintainer is
 * expected to customize — edit it there, not here.
 */
export function ProjectIntro() {
  const { locale } = useLocale();
  const content = PROJECT_INTRO[locale];

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
        {content.title}
      </h2>
      <div className="mt-2 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {content.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}