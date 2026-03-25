import type { LoginData } from '../types/loginData';

export interface LoginDataDTO {
  email: string;
  password: string;
}

export const mapLoginData = (data: LoginData): LoginDataDTO => {
  return {
    email: data.email,
    password: data.password,
  };
};
