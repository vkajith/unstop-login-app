import { useAuth } from '@/contexts/auth.context';
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
