import { AuthContext } from './AuthContex';
import { useUser } from './authHooks';

export const AuthProvider = ({ children }) => {
  const { data: user, isLoading } = useUser();
  return <AuthContext.Provider value={{ user: user ?? null, isAuthenticated: !!user, isLoading }}>{children}</AuthContext.Provider>;
};
