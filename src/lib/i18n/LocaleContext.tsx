import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { TRANSLATIONS, type Locale } from './strings';

const STORAGE_KEY = 'dtc.locale';

function detectInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'fr') return stored;
  return navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Looks up `key` in the current locale's dictionary (see strings.ts)
   * and substitutes any `{placeholder}` tokens with `params`, e.g.
   * `t('accessDeniedBody', { email })`. */
  t: (key: string, params?: Record<string, string>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(detectInitialLocale);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  function t(key: string, params?: Record<string, string>): string {
    const template = TRANSLATIONS[locale][key];
    if (!template) {
      // Missing translation — fail loudly in dev rather than silently
      // rendering nothing, but never crash the app in production.
      // eslint-disable-next-line no-console
      console.warn(`Missing translation for key "${key}" (locale: ${locale})`);
      return key;
    }
    if (!params) return template;
    return Object.keys(params).reduce(
      (result, paramKey) => result.replaceAll(`{${paramKey}}`, params[paramKey]),
      template,
    );
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return ctx;
}