import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search, Sparkles } from 'lucide-react';
import { LANGUAGE_OPTIONS, languageName } from '../lib/languages';
import { FieldLabel } from './FieldLabel';
import { useLocale } from '../lib/i18n/LocaleContext';

interface LanguageSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (code: string) => void;
  /** Whether the current value came from auto-detection (vs. a manual pick). */
  isAuto: boolean;
  detecting?: boolean;
  error?: string;
}

/**
 * Searchable dropdown for choosing a language. Shows a small badge when
 * the current value came from automatic detection, and otherwise behaves
 * like a normal combobox. A manual selection always overrides detection —
 * enforced by the parent via `isAuto`/`onChange`.
 */
export function LanguageSelect({
  id,
  label,
  value,
  onChange,
  isAuto,
  detecting,
  error,
}: LanguageSelectProps) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LANGUAGE_OPTIONS;
    return LANGUAGE_OPTIONS.filter((l) => l.name.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const selectedName = value ? languageName(value) : null;

  return (
    <div ref={containerRef} className="relative">
      <FieldLabel htmlFor={id} required>
        {label}
      </FieldLabel>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={Boolean(error)}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-2.5 text-left text-sm shadow-sm transition-colors focus-ring ${
          error ? 'border-red-300 dark:border-red-700' : 'border-slate-200 dark:border-slate-700'
        } dark:bg-slate-900 dark:text-slate-100`}
      >
        <span className={selectedName ? '' : 'text-slate-400'}>
          {selectedName ?? t('selectLanguagePlaceholder')}
        </span>
        <ChevronDown size={16} className="text-slate-400" aria-hidden="true" />
      </button>

      <div className="mt-1 flex min-h-[1.1rem] items-center gap-1 text-xs">
        {detecting && <span className="text-slate-400">{t('detectingLanguage')}</span>}
        {!detecting && isAuto && selectedName && (
          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <Sparkles size={12} aria-hidden="true" />
            {t('detectedLanguagePrefix', { name: selectedName })}
          </span>
        )}
        {!detecting && !selectedName && (
          <span className="text-slate-400">{t('languageUndetermined')}</span>
        )}
      </div>

      {error && <p className="mt-0.5 text-xs text-red-500">{error}</p>}

      {open && (
        <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 dark:border-slate-800">
            <Search size={14} className="text-slate-400" aria-hidden="true" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchLanguagesPlaceholder')}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-slate-100"
            />
          </div>
          <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-2 text-sm text-slate-400">{t('noMatches')}</li>
            )}
            {filtered.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={lang.code === value}
                  onClick={() => {
                    onChange(lang.code);
                    setOpen(false);
                    setQuery('');
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-blue-50 dark:hover:bg-slate-800 ${
                    lang.code === value
                      ? 'bg-blue-50 font-medium text-blue-600 dark:bg-slate-800 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}