import { useCallback, useEffect, useRef, useState } from 'react';
import { GOOGLE_CLIENT_ID } from '../config/env';
import type { AuthUser } from '../types';

const STORAGE_KEY = 'dtc.idToken';

// Minimal typings for the pieces of the Google Identity Services API we
// use. The full library ships its own types via @types/google.accounts,
// but declaring just what we need keeps the dependency footprint small.
interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleAccountsId {
  initialize(config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
  }): void;
  renderButton(parent: HTMLElement, options: Record<string, unknown>): void;
  disableAutoSelect(): void;
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleAccountsId } };
  }
}

/** Decodes the payload of a JWT without verifying its signature. This is
 * safe here because the token is only used for *display* (name/picture)
 * on the client; the Apps Script backend independently verifies the
 * token's signature and audience before trusting it for authorization. */
function decodeJwtPayload(token: string): Record<string, unknown> {
  const [, payload] = token.split('.');
  const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(decodeURIComponent(escape(json))) as Record<string, unknown>;
}

function userFromToken(idToken: string): AuthUser {
  const payload = decodeJwtPayload(idToken);
  return {
    email: String(payload.email ?? ''),
    name: String(payload.name ?? payload.email ?? 'Unknown user'),
    picture: typeof payload.picture === 'string' ? payload.picture : undefined,
    idToken,
  };
}

export interface UseGoogleAuth {
  user: AuthUser | null;
  scriptReady: boolean;
  /** Attach the "Sign in with Google" button to this ref. */
  buttonRef: React.RefObject<HTMLDivElement | null>;
  signOut: () => void;
}

/**
 * Loads the Google Identity Services script (added in index.html) and
 * renders the official "Sign in with Google" button into `buttonRef`.
 * On success, decodes the returned ID token for display and persists it
 * in sessionStorage so a page refresh doesn't force a re-login.
 */
export function useGoogleAuth(): UseGoogleAuth {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    try {
      return userFromToken(stored);
    } catch {
      return null;
    }
  });
  const [scriptReady, setScriptReady] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleCredential = useCallback((response: GoogleCredentialResponse) => {
    sessionStorage.setItem(STORAGE_KEY, response.credential);
    setUser(userFromToken(response.credential));
  }, []);

  useEffect(() => {
    let cancelled = false;

    function tryInit() {
      if (cancelled) return;
      if (!window.google?.accounts?.id) {
        // The script tag in index.html loads asynchronously; poll briefly.
        setTimeout(tryInit, 100);
        return;
      }
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredential,
      });
      setScriptReady(true);
    }

    tryInit();
    return () => {
      cancelled = true;
    };
  }, [handleCredential]);

  useEffect(() => {
    if (scriptReady && !user && buttonRef.current && window.google?.accounts?.id) {
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        text: 'signin_with',
        width: 280,
      });
    }
  }, [scriptReady, user]);

  const signOut = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    window.google?.accounts?.id.disableAutoSelect();
    setUser(null);
  }, []);

  return { user, scriptReady, buttonRef, signOut };
}
