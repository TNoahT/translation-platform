import { useEffect, useState } from 'react';

const STORAGE_KEY = 'dtc.darkMode';

function getInitialValue(): boolean {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) return stored === 'true';
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

/** Persisted light/dark mode toggle. Applies the `dark` class to <html>,
 * which the `@custom-variant dark` rule in index.css hooks into. */
export function useDarkMode(): [boolean, () => void] {
  const [isDark, setIsDark] = useState(getInitialValue);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem(STORAGE_KEY, String(isDark));
  }, [isDark]);

  return [isDark, () => setIsDark((v) => !v)];
}
