import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { SignInScreen } from './components/SignInScreen';
import { AccessDeniedScreen } from './components/AccessDeniedScreen';
import { SubmissionForm } from './components/SubmissionForm';
import { useGoogleAuth } from './hooks/useGoogleAuth';
import { useDarkMode } from './hooks/useDarkMode';
import { verifyUser } from './lib/api';

type AuthorizationState = 'checking' | 'authorized' | 'denied';

function App() {
  const { user, scriptReady, buttonRef, signOut } = useGoogleAuth();
  const [isDark, toggleDark] = useDarkMode();
  const [authState, setAuthState] = useState<AuthorizationState>('checking');
  const [verifyError, setVerifyError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setAuthState('checking');
      return;
    }

    let cancelled = false;
    setAuthState('checking');
    setVerifyError(null);

    verifyUser(user.idToken).then((result) => {
      if (cancelled) return;
      if (result.ok && result.data?.authorized) {
        setAuthState('authorized');
      } else if (result.ok) {
        setAuthState('denied');
      } else {
        // Network/config failure — don't lock the user out permanently,
        // but do let them know something went wrong.
        setVerifyError(result.error ?? 'Could not verify your account. Please try again.');
        setAuthState('denied');
      }
    });

    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Header user={user} isDark={isDark} onToggleDark={toggleDark} onSignOut={signOut} />

      {!user && <SignInScreen buttonRef={buttonRef} scriptReady={scriptReady} />}

      {user && authState === 'checking' && (
        <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
          Checking access…
        </div>
      )}

      {user && authState === 'denied' && (
        <>
          <AccessDeniedScreen email={user.email} onSignOut={signOut} />
          {verifyError && (
            <p className="pb-8 text-center text-xs text-slate-400">{verifyError}</p>
          )}
        </>
      )}

      {user && authState === 'authorized' && (
        <main className="flex-1 px-4 pb-16 sm:px-8">
          <div className="mx-auto w-full max-w-2xl">
            <div className="pb-8 pt-6 text-center sm:pt-10">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
                Difficult Translation Collection
              </h1>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
                Help us build a high-quality dataset of challenging translation examples.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <SubmissionForm idToken={user.idToken} />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
