import api from '../api/axios';
import type { RegisterData } from '../config/types/registerData';
import type { LoginData } from '../config/types/loginData';
import type { User } from '../config/types/user';
import { mapRegisterData } from '../config/mappers/register.dto.mapper';
import { mapLoginData } from '../config/mappers/login.dto.mapper';
import type { AuthUser } from '../config/types/authUser';
import { LOGIN_API, LOGOUT_API, ME_API, REGISTER_API } from '../config/vars/variables';

// Register new user
export const register = async (data: RegisterData): Promise<AuthUser> => {
  const payload = mapRegisterData(data);
  const res = await api.post<AuthUser>(REGISTER_API, payload);
  return res.data;
};

// Login with existing user
export const login = async (data: LoginData): Promise<AuthUser> => {
  const payload = mapLoginData(data);
  const res = await api.post<AuthUser>(LOGIN_API, payload);
  return res.data;
};

// Get currunt logged in user
export const getCurruntUser = async (): Promise<User> => {
  const res = await api.get<User>(ME_API);
  return res.data;
};

// Logout user
export const logout = async (): Promise<void> => {
  await api.post(LOGOUT_API);
};
