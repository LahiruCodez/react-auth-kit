import type { RegisterData } from '../types/registerData';

export interface RegisterDataDTO {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export const mapRegisterData = (data: RegisterData): RegisterDataDTO => {
  return {
    name: data.name,
    email: data.email,
    password: data.password,
    password_confirm: data.passwordConfirm,
  };
};
