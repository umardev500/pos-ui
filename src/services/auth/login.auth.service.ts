import {mmkvStorage} from '@app/storage';
import {LoginResponse, User} from '@app/types';
import Config from 'react-native-config';

const API_URL = Config.API_URL;

const login = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password}),
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  return res.json(); // will contain token or user data
};

const getMe = async (): Promise<User> => {
  const token = mmkvStorage.getString('user.token');

  const res = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }

  return res.json(); // Will contain the user data (like name, email, etc.)
};

export const authService = {
  login,
  getMe,
};
