import {LoginResponse} from '@app/types';
import Config from 'react-native-config';

const API_URL = Config.API_URL;

export const login = async (email: string, password: string): Promise<LoginResponse> => {
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
