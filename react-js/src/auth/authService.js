import api from '../api/axios';
import { mapRegisterData } from '../config/mappers/register.mapper';
import { mapLoginData } from '../config/mappers/login.mapper';
import { LOGIN_API, LOGOUT_API, ME_API, REGISTER_API } from '../config/vars/variables';

// Register new user
export const register = async (data) => {
  const payload = mapRegisterData(data);
  const res = await api.post(REGISTER_API, payload);
  return res.data;
};

// Login with existing user
export const login = async (data) => {
  const payload = mapLoginData(data);
  const res = await api.post(LOGIN_API, payload);
  return res.data;
};

// Get currunt logged in user
export const getCurruntUser = async () => {
  const res = await api.get(ME_API);
  return res.data;
};

// Logout user
export const logout = async () => {
  await api.post(LOGOUT_API);
};
