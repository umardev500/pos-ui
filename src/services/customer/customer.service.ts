import {CustomerDTO} from '@app/types';
import Config from 'react-native-config';

const API_URL = Config.API_URL;

// Service function to fetch order types from the API
export const fetchCustomers = async (): Promise<CustomerDTO[]> => {
  const res = await fetch(`${API_URL}/customers`);

  if (!res.ok) {
    throw new Error('Failed to fetch customers');
  }

  const data: CustomerDTO[] = await res.json();
  return data;
};
