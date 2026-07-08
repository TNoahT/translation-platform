/**
 * Central type definitions for the Difficult Translation Collection app.
 *
 * Keeping these in one place makes it easy to extend the data model later
 * (e.g. adding reviewer fields, moderation status values, etc.) without
 * hunting through components for scattered inline types.
 */

/** A language option shown in the searchable language dropdowns. */
export interface LanguageOption {
  /** ISO 639-1 (or 639-3 fallback) code, e.g. "en", "fr", "zh". */
  code: string;
  /** Human readable English name, e.g. "French". */
  name: string;
}

/** Result of running the in-browser language detector on a piece of text. */
export interface DetectionResult {
  /** Detected language code, or null if it could not be determined. */
  code: string | null;
  /** Human readable name for display, or null if undetermined. */
  name: string | null;
  /** Whether the detector was confident enough to trust the result. */
  confident: boolean;
}

/** The fixed set of difficulty categories a submission can belong to. */
export const CATEGORY_OPTIONS = [
  'Terminology',
  'Grammar',
  'Syntax',
  'Ambiguity',
  'Idiom',
  'Cultural reference',
  'Named entities',
  'Formatting',
  'Scientific language',
  'Legal language',
  'Medical language',
  'Other',
] as const;

export type Category = (typeof CATEGORY_OPTIONS)[number];

/** Submission status values. More states (e.g. "Approved") can be added
 * later for the reviewer dashboard without changing the submission flow. */
export type SubmissionStatus = 'Pending' | 'Approved' | 'Rejected';

/** Shape of the form as edited in the browser. */
export interface SubmissionFormData {
  sourceText: string;
  sourceLanguage: string; // language code
  sourceLanguageManual: boolean; // true once the user overrides auto-detect
  targetText: string;
  targetLanguage: string; // language code
  targetLanguageManual: boolean;
  explanation: string;
  category: Category | '';
  difficulty: number; // 1-5, 0 means "not yet chosen"
  tags: string[];
}

/** Payload sent to the Google Apps Script backend. */
export interface SubmissionPayload {
  action: 'submit';
  idToken: string;
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
  targetText: string;
  explanation: string;
  category: string;
  difficulty: number;
  tags: string[];
  appVersion: string;
}

/** A verify-only payload, used right after sign-in to check the user is
 * on the allow list before showing them the submission form. */
export interface VerifyPayload {
  action: 'verify';
  idToken: string;
}

/** Common shape of every Apps Script JSON response. */
export interface ApiResponse<T = unknown> {
  ok: boolean;
  error?: string;
  data?: T;
}

export interface VerifyResponseData {
  authorized: boolean;
  name?: string;
  role?: string;
}

export interface SubmitResponseData {
  submissionId: string;
  timestamp: string;
}

/** The authenticated user, decoded from the Google ID token. */
export interface AuthUser {
  email: string;
  name: string;
  picture?: string;
  idToken: string;
}
