import { Star } from 'lucide-react';
import { FieldLabel } from './FieldLabel';

interface StarRatingProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const LABELS = ['Very easy', 'Easy', 'Moderate', 'Hard', 'Very hard'];

/** Five-star selector for difficulty (1-5). Fully keyboard operable: each
 * star is a real button with a descriptive aria-label. */
export function StarRating({ id, value, onChange, error }: StarRatingProps) {
  return (
    <div>
      <FieldLabel htmlFor={id} required>
        Difficulty
      </FieldLabel>
      <div id={id} role="radiogroup" aria-label="Difficulty rating" className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? 's' : ''} — ${LABELS[n - 1]}`}
            onClick={() => onChange(n)}
            className="rounded-md p-1 focus-ring"
          >
            <Star
              size={26}
              className={n <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}
            />
          </button>
        ))}
        {value > 0 && (
          <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">{LABELS[value - 1]}</span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
