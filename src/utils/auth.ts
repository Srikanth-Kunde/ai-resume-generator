import type { AuthCredentials, AuthSession, UserRole } from '../types';

// ============================================
// SHA-256 HASHING
// ============================================

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ============================================
// DEFAULT CREDENTIALS (SHA-256 hashes)
// ============================================

// Default: admin2024 → hash, user2024 → hash
// These are computed at init time and cached.
const DEFAULT_ADMIN_CODE = 'skadmin@2024';
const DEFAULT_USER_CODE = 'user@2026';

let defaultHashes: AuthCredentials | null = null;

async function getDefaultHashes(): Promise<AuthCredentials> {
  if (defaultHashes) return defaultHashes;
  defaultHashes = {
    adminHash: await sha256(DEFAULT_ADMIN_CODE),
    userHash: await sha256(DEFAULT_USER_CODE),
  };
  return defaultHashes;
}

// ============================================
// CREDENTIAL STORAGE
// ============================================

const CREDENTIALS_KEY = 'resumeai_credentials';
const SESSION_KEY = 'resumeai_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function getStoredCredentials(): Promise<AuthCredentials> {
  const stored = localStorage.getItem(CREDENTIALS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as AuthCredentials;
    } catch {
      // Corrupted data — fallback to defaults
    }
  }
  return getDefaultHashes();
}

function storeCredentials(creds: AuthCredentials): void {
  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
}

// ============================================
// AUTHENTICATION
// ============================================

export async function authenticate(accessCode: string): Promise<{ success: boolean; role?: UserRole }> {
  const hash = await sha256(accessCode);
  const creds = await getStoredCredentials();

  if (hash === creds.adminHash) {
    const session: AuthSession = { role: 'admin', expiresAt: Date.now() + SESSION_DURATION };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, role: 'admin' };
  }

  if (hash === creds.userHash) {
    const session: AuthSession = { role: 'user', expiresAt: Date.now() + SESSION_DURATION };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, role: 'user' };
  }

  return { success: false };
}

export function getSession(): AuthSession | null {
  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) return null;

  try {
    const session = JSON.parse(stored) as AuthSession;
    if (session.expiresAt > Date.now()) {
      return session;
    }
    // Expired
    localStorage.removeItem(SESSION_KEY);
    return null;
  } catch {
    return null;
  }
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

// ============================================
// PASSWORD MANAGEMENT (Admin only)
// ============================================

export async function changePassword(
  currentRole: UserRole,
  targetRole: UserRole,
  newCode: string
): Promise<{ success: boolean; error?: string }> {
  if (currentRole !== 'admin') {
    return { success: false, error: 'Only administrators can change access codes.' };
  }

  if (newCode.length < 4) {
    return { success: false, error: 'Access code must be at least 4 characters.' };
  }

  const creds = await getStoredCredentials();
  const newHash = await sha256(newCode);

  if (targetRole === 'admin') {
    creds.adminHash = newHash;
  } else {
    creds.userHash = newHash;
  }

  storeCredentials(creds);

  // If we changed our own password, refresh session
  if (targetRole === currentRole) {
    const session: AuthSession = { role: currentRole, expiresAt: Date.now() + SESSION_DURATION };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return { success: true };
}

export async function resetToDefaults(): Promise<void> {
  localStorage.removeItem(CREDENTIALS_KEY);
  defaultHashes = null;
}
