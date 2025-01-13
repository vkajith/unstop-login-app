import { API_URL } from '@/constants';
import { LoginFormData } from '@/typings';
import axios from 'axios';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const authService = {
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    try {
      const { data } = await axios.post<AuthResponse>(API_URL, credentials);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new AuthError(error.response?.data?.message || 'Login failed');
      }
      throw new AuthError('An unexpected error occurred');
    }
  },
};
