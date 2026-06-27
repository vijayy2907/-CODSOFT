import type { StoredCredentials } from '@/types';

const REMEMBER_KEY = 'auth-flow:remember';
const THEME_KEY = 'auth-flow:theme';

export function saveRememberedEmail(data: StoredCredentials): void {
  try {
    if (data.rememberMe) {
      window.localStorage.setItem(REMEMBER_KEY, JSON.stringify(data));
    } else {
      window.localStorage.removeItem(REMEMBER_KEY);
    }
  } catch {
    // localStorage may be unavailable (e.g. private mode); fail silently.
  }
}

export function getRememberedEmail(): StoredCredentials | null {
  try {
    const raw = window.localStorage.getItem(REMEMBER_KEY);
    return raw ? (JSON.parse(raw) as StoredCredentials) : null;
  } catch {
    return null;
  }
}

export function saveThemePreference(theme: 'light' | 'dark'): void {
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
}

export function getThemePreference(): 'light' | 'dark' | null {
  try {
    const value = window.localStorage.getItem(THEME_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}
