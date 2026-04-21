import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { UserRole } from '../types';
import { authenticate, getSession, logout as logoutUtil, changePassword as changePasswordUtil } from '../utils/auth';

interface AuthContextValue {
  isAuthenticated: boolean;
  role: UserRole | null;
  isLoading: boolean;
  login: (accessCode: string) => Promise<{ success: boolean; role?: UserRole }>;
  logout: () => void;
  changePassword: (targetRole: UserRole, newCode: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const session = getSession();
    return !!session;
  });
  const [role, setRole] = useState<UserRole | null>(() => {
    const session = getSession();
    return session ? session.role : null;
  });
  const isLoading = false;

  const login = useCallback(async (accessCode: string) => {
    const result = await authenticate(accessCode);
    if (result.success && result.role) {
      setIsAuthenticated(true);
      setRole(result.role);
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    logoutUtil();
    setIsAuthenticated(false);
    setRole(null);
  }, []);

  const changePassword = useCallback(async (targetRole: UserRole, newCode: string) => {
    if (!role) return { success: false, error: 'Not authenticated.' };
    return changePasswordUtil(role, targetRole, newCode);
  }, [role]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, isLoading, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
