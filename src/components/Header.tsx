import { LogOut, Moon, Sun } from 'lucide-react';
import type { AuthUser } from '../types';

interface HeaderProps {
  user: AuthUser | null;
  isDark: boolean;
  onToggleDark: () => void;
  onSignOut: () => void;
}

export function Header({ user, isDark, onToggleDark, onSignOut }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-4 sm:px-8">
      <span className="text-sm font-semibold tracking-tight text-slate-600 dark:text-slate-300">
        Difficult Translation Collection
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleDark}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="rounded-full p-2 text-slate-500 hover:bg-slate-100 focus-ring dark:text-slate-400 dark:hover:bg-slate-800"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        {user && (
          <div className="flex items-center gap-2">
            {user.picture ? (
              <img
                src={user.picture}
                alt=""
                referrerPolicy="no-referrer"
                className="h-7 w-7 rounded-full"
              />
            ) : (
              <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700" />
            )}
            <span className="hidden text-sm text-slate-600 dark:text-slate-300 sm:inline">
              {user.name}
            </span>
            <button
              type="button"
              onClick={onSignOut}
              aria-label="Sign out"
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 focus-ring dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <LogOut size={17} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
