import { useLogin, useLogout, useRegister, useUser } from './authHooks';

export const useAuth = () => {
  const register = useRegister();
  const login = useLogin();
  const userQuery = useUser();
  const logout = useLogout();

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    isAuthenticated: !!userQuery.data,

    register,
    login,
    logout,
  };
};
