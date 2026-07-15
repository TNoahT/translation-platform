import { Star } from 'lucide-react';
import { FieldLabel } from './FieldLabel';
import { DIFFICULTY_LABELS } from '../lib/i18n/strings';
import { useLocale } from '../lib/i18n/LocaleContext';

interface StarRatingProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** Ten-point star selector for difficulty (1-10). Fully keyboard
 * operable: each star is a real button with a descriptive aria-label.
 * Wraps onto a second row on narrow layouts rather than shrinking to
 * the point of being hard to tap. */
export function StarRating({ id, value, onChange, error }: StarRatingProps) {
  const { locale, t } = useLocale();
  const labels = DIFFICULTY_LABELS[locale];

  return (
    <div>
      <FieldLabel htmlFor={id} required>
        {t('difficultyLabel')}
      </FieldLabel>
      <div id={id} role="radiogroup" aria-label={t('difficultyLabel')} className="flex flex-wrap items-center gap-1.3">
        {SCALE.map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={t('difficultyAriaLabel', { n: String(n), label: labels[n - 1] })}
            onClick={() => onChange(n)}
            className="rounded-md p-0.5 focus-ring"
          >
            <Star
              size={20}
              className={n <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}
            />
          </button>
        ))}
        {value > 0 && (
          <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">
            {value}/10 · {labels[value - 1]}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}