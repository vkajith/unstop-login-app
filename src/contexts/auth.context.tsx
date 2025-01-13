import { createContext, useContext, useCallback, useState, ReactNode } from 'react';
import { AuthResponse, authService } from '@/services/auth.service';
import { LoginFormData } from '@/typings';

interface AuthContextType {
  user: AuthResponse | null;
  login: (credentials: LoginFormData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(() => {
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = useCallback(async (credentials: LoginFormData) => {
    const response = await authService.login(credentials);
    setUser(response);
    localStorage.setItem('userData', JSON.stringify(response));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
