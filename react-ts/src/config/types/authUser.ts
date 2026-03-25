import type { User } from './user';

export interface AuthUser {
  user: User;
  token: string;
}
