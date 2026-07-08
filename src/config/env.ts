/**
 * Typed, single-source access to build-time environment variables.
 *
 * All values must be prefixed with VITE_ so Vite exposes them to the
 * client bundle. Never put secrets here — this code ships to the browser.
 * See .env.example for the full list of variables a deployer must set.
 */

function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    // Fail loudly during local development instead of silently sending
    // requests to "undefined".
    // eslint-disable-next-line no-console
    console.error(
      `Missing required environment variable ${name}. Did you copy .env.example to .env?`,
    );
    return '';
  }
  return value;
}

export const APPS_SCRIPT_URL = requireEnv(
  'VITE_APPS_SCRIPT_URL',
  import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined,
);

export const GOOGLE_CLIENT_ID = requireEnv(
  'VITE_GOOGLE_CLIENT_ID',
  import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined,
);

/** Sent with every submission so the spreadsheet records which build of
 * the app produced each row. Bump this when the form schema changes. */
export const APP_VERSION = '1.0.0';
