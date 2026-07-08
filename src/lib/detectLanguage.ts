import { franc } from 'franc';
import type { DetectionResult } from '../types';
import { ISO_639_3_TO_1, languageName } from './languages';

/**
 * Minimum character count before we attempt detection at all. Very short
 * strings produce unreliable guesses, so we simply wait for more input
 * rather than show a wrong language.
 */
const MIN_CHARS = 12;

/**
 * `franc` returns "und" (undetermined) when it isn't confident, and
 * otherwise an ISO 639-3 code. It runs entirely client-side, has no
 * network dependency, and is small enough to bundle — which is why it
 * was chosen over calling a paid translation-detection API.
 */
export function detectLanguage(text: string): DetectionResult {
  const trimmed = text.trim();

  if (trimmed.length < MIN_CHARS) {
    return { code: null, name: null, confident: false };
  }

  const guess = franc(trimmed, { minLength: MIN_CHARS });

  if (guess === 'und') {
    return { code: null, name: null, confident: false };
  }

  const code = ISO_639_3_TO_1[guess];
  if (!code) {
    // franc detected *something*, but it isn't one of the languages this
    // app currently offers in its dropdown — treat as undetermined so we
    // don't silently select a language the researcher can't see.
    return { code: null, name: null, confident: false };
  }

  return { code, name: languageName(code), confident: true };
}
