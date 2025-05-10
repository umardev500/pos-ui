import {CustomerDTO} from '@app/types';
import {CreateCustomerDTO} from '@app/validations';
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

export const createCustomer = async (payload: CreateCustomerDTO): Promise<void> => {
  const res = await fetch(`${API_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create customer');
  }
};
