import { Star } from 'lucide-react';
import { FieldLabel } from './FieldLabel';

interface StarRatingProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const LABELS = [
  'Trivial',
  'Very easy',
  'Easy',
  'Somewhat easy',
  'Moderate',
  'Somewhat hard',
  'Hard',
  'Very hard',
  'Extremely hard',
  'Nearly untranslatable',
];

/** Ten-point star selector for difficulty (1-10). Fully keyboard
 * operable: each star is a real button with a descriptive aria-label.
 * Wraps onto a second row on narrow layouts rather than shrinking to
 * the point of being hard to tap. */
export function StarRating({ id, value, onChange, error }: StarRatingProps) {
  return (
    <div>
      <FieldLabel htmlFor={id} required>
        Difficulty
      </FieldLabel>
      <div id={id} role="radiogroup" aria-label="Difficulty rating" className="flex flex-wrap items-center gap-0.5">
        {SCALE.map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} out of 10 — ${LABELS[n - 1]}`}
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
            {value}/10 · {LABELS[value - 1]}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
