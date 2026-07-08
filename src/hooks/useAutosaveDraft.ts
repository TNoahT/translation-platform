import { useEffect, useRef } from 'react';
import type { SubmissionFormData } from '../types';

const DRAFT_KEY = 'dtc.draft';

/** Reads any previously autosaved draft, if present. Called once on
 * mount by the form so a refresh or accidental tab close doesn't lose
 * a researcher's in-progress work. */
export function loadDraft(): Partial<SubmissionFormData> | null {
  const raw = localStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Partial<SubmissionFormData>;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  localStorage.removeItem(DRAFT_KEY);
}

/** Debounced autosave of the current form state to localStorage. */
export function useAutosaveDraft(form: SubmissionFormData): void {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    }, 400);

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [form]);
}
