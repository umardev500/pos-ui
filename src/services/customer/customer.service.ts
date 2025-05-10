import {CustomerDTO} from '@app/types';
import {CreateCustomerDTO, UpdateCustomerDTO} from '@app/validations';
import Config from 'react-native-config';

const API_URL = Config.API_URL;

// Get all customers
export const fetchCustomers = async (): Promise<CustomerDTO[]> => {
  const res = await fetch(`${API_URL}/customers`);

  if (!res.ok) {
    throw new Error('Failed to fetch customers');
  }

  return await res.json();
};

// Get customer by ID
export const fetchCustomerById = async (id: number): Promise<CustomerDTO> => {
  const res = await fetch(`${API_URL}/customers/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch customer with ID ${id}`);
  }

  return await res.json();
};

// Create new customer
export const createCustomer = async (payload: CreateCustomerDTO): Promise<void> => {
  const {level, ...rest} = payload;
  const transformedPayload = {...rest, level_id: level.id};

  const res = await fetch(`${API_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transformedPayload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create customer');
  }
};

// Update existing customer
export const updateCustomer = async (id: number, payload: UpdateCustomerDTO): Promise<void> => {
  const {level, ...rest} = payload;
  const transformedPayload = {...rest, level_id: level?.id};

  const res = await fetch(`${API_URL}/customers/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transformedPayload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to update customer');
  }
};

// Delete customer by ID
export const deleteCustomer = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/customers/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to delete customer');
  }
};
