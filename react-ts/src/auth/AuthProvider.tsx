import { AuthContext } from './AuthContex';
import { useUser } from './authHooks';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: user, isLoading } = useUser();
  return <AuthContext.Provider value={{ user: user ?? null, isAuthenticated: !!user, isLoading }}>{children}</AuthContext.Provider>;
};
