import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as authService from '../auth/authService';

// Register new user hook
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);

      // Update me cache (currunt user)
      queryClient.setQueryData(['me'], data.user);
    },
  });
};

// User Loggin hook
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);

      //Update me cache (currunt user)
      queryClient.setQueryData(['me'], data.user);
    },
  });
};

// Get currunt user hook
export const useUser = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: authService.getCurruntUser,
    retry: false,
  });
};

// Logout currunt user hook
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.removeItem('authToken');

      // Clear me cache (currunt user)
      queryClient.setQueryData(['me'], null);
    },
  });
};
