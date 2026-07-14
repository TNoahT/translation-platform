import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { FieldLabel } from './FieldLabel';
import { useLocale } from '../lib/i18n/LocaleContext';

interface TagInputProps {
  id: string;
  tags: string[];
  onChange: (tags: string[]) => void;
}

/** Free-form tag input. Press Enter (or comma) to create a tag from the
 * current text; click the × or press Backspace on an empty field to
 * remove the last one. */
export function TagInput({ id, tags, onChange }: TagInputProps) {
  const { t } = useLocale();
  const [draft, setDraft] = useState('');

  function addTag() {
    const value = draft.trim().toLowerCase();
    if (value && !tags.includes(value)) {
      onChange([...tags, value]);
    }
    setDraft('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && draft === '' && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div>
      <FieldLabel htmlFor={id} tooltip={t('tagsTooltip')}>
        {t('tagsLabel')}
      </FieldLabel>
      <div className="flex min-h-[46px] flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:border-slate-700 dark:bg-slate-900">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((existing) => existing !== tag))}
              aria-label={t('removeTagAria', { tag })}
              className="rounded-full hover:text-blue-900 dark:hover:text-blue-100"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          id={id}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? t('tagsPlaceholder') : ''}
          className="min-w-[8rem] flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-slate-100"
        />
      </div>
    </div>
  );
}