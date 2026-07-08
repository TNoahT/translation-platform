import { useCallback, useEffect, useState } from 'react';
import { exchangeMagicLinkToken, requestMagicLink } from '../lib/api';
import type { AuthUser } from '../types';

const STORAGE_KEY = 'dtc.emailSession';
const URL_TOKEN_PARAM = 'authToken';

type Status = 'idle' | 'sending' | 'sent' | 'exchanging' | 'error';

interface StoredSession {
  email: string;
  name: string;
  token: string;
}

function readStoredSession(): AuthUser | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredSession;
    return { email: parsed.email, name: parsed.name, method: 'email', token: parsed.token };
  } catch {
    return null;
  }
}

function storeSession(user: AuthUser) {
  const toStore: StoredSession = { email: user.email, name: user.name, token: user.token };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
}

/** Strips the ?authToken=... param from the URL bar without a page
 * reload, so refreshing or sharing the URL doesn't re-trigger (or leak)
 * the one-time token. */
function stripTokenFromUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete(URL_TOKEN_PARAM);
  window.history.replaceState({}, '', url.toString());
}

export interface UseEmailLinkAuth {
  user: AuthUser | null;
  status: Status;
  error: string | null;
  /** Set while `status` is "sent", so the UI can say "check your inbox at …". */
  sentTo: string | null;
  requestLink: (email: string) => Promise<void>;
  reset: () => void;
  signOut: () => void;
}

/**
 * Handles both halves of the magic-link flow:
 *  1. requestLink(email) — asks the backend to email a one-time link.
 *  2. On mount, checks the URL for ?authToken=... (the link the user
 *     just clicked) and exchanges it for a longer-lived session token,
 *     which is then persisted in sessionStorage like the Google flow.
 */
export function useEmailLinkAuth(): UseEmailLinkAuth {
  const [user, setUser] = useState<AuthUser | null>(readStoredSession);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const linkToken = params.get(URL_TOKEN_PARAM);
    if (!linkToken) return;

    let cancelled = false;
    setStatus('exchanging');
    stripTokenFromUrl();

    exchangeMagicLinkToken(linkToken).then((result) => {
      if (cancelled) return;
      if (result.ok && result.data) {
        const newUser: AuthUser = {
          email: result.data.email,
          name: result.data.name,
          method: 'email',
          token: result.data.sessionToken,
        };
        storeSession(newUser);
        setUser(newUser);
        setStatus('idle');
      } else {
        setError(result.error ?? 'That sign-in link is invalid or has expired.');
        setStatus('error');
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const requestLink = useCallback(async (email: string) => {
    setStatus('sending');
    setError(null);
    const result = await requestMagicLink(email);
    if (result.ok) {
      setSentTo(email);
      setStatus('sent');
    } else {
      setError(result.error ?? 'Could not send the sign-in link. Please try again.');
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setSentTo(null);
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
    reset();
  }, [reset]);

  return { user, status, error, sentTo, requestLink, reset, signOut };
}