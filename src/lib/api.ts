import { APPS_SCRIPT_URL, APP_VERSION } from '../config/env';
import type {
  ApiResponse,
  SubmissionFormData,
  SubmitResponseData,
  VerifyResponseData,
} from '../types';

/**
 * Apps Script Web Apps do not reliably answer CORS preflight (OPTIONS)
 * requests. Sending the body as `text/plain` keeps the request a "simple
 * request" under the Fetch spec, so the browser never sends a preflight
 * — the Apps Script side still parses it as JSON. This is the standard
 * workaround for calling Apps Script from a separately-hosted frontend.
 */
async function postToAppsScript<T>(body: unknown): Promise<ApiResponse<T>> {
  if (!APPS_SCRIPT_URL) {
    return { ok: false, error: 'The app is not configured (missing Apps Script URL).' };
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
      redirect: 'follow',
    });

    if (!response.ok) {
      return { ok: false, error: `Server responded with status ${response.status}.` };
    }

    const json = (await response.json()) as ApiResponse<T>;
    return json;
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Network error contacting the server.',
    };
  }
}

/** Checks that the signed-in user's email is on the allow list before we
 * show them the submission form. */
export function verifyUser(idToken: string): Promise<ApiResponse<VerifyResponseData>> {
  return postToAppsScript<VerifyResponseData>({ action: 'verify', idToken });
}

/** Submits a completed translation example. */
export function submitTranslation(
  idToken: string,
  form: SubmissionFormData,
): Promise<ApiResponse<SubmitResponseData>> {
  return postToAppsScript<SubmitResponseData>({
    action: 'submit',
    idToken,
    sourceLanguage: form.sourceLanguage,
    targetLanguage: form.targetLanguage,
    sourceText: form.sourceText,
    targetText: form.targetText,
    explanation: form.explanation,
    category: form.category,
    difficulty: form.difficulty,
    tags: form.tags,
    appVersion: APP_VERSION,
  });
}
