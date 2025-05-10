import {Level} from '@app/types'; // Assuming this type has already been defined
import {CreateCustomerLevelDTO, UpdateCustomerLevelDTO} from '@app/validations';
import Config from 'react-native-config';

const API_URL = Config.API_URL; // Assuming this holds your API URL

/**
 * Get all customer levels.
 * @returns List of all customer levels.
 */
export const fetchCustomerLevels = async (): Promise<Level[]> => {
  const res = await fetch(`${API_URL}/customer-levels`);

  if (!res.ok) {
    throw new Error('Failed to fetch customer levels');
  }

  return await res.json();
};

/**
 * Get a specific customer level by its ID.
 * @param id - The ID of the customer level.
 * @returns The customer level corresponding to the ID.
 */
export const fetchCustomerLevelById = async (id: number): Promise<Level> => {
  const res = await fetch(`${API_URL}/customer-levels/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch customer level with ID ${id}`);
  }

  return await res.json();
};

/**
 * Create a new customer level.
 * @param payload - The data for creating a new customer level.
 * @returns Void.
 */
export const createCustomerLevel = async (payload: CreateCustomerLevelDTO): Promise<void> => {
  const res = await fetch(`${API_URL}/customer-levels`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create customer level');
  }
};

/**
 * Update an existing customer level by ID.
 * @param id - The ID of the customer level to update.
 * @param payload - The updated data for the customer level.
 * @returns Void.
 */
export const updateCustomerLevel = async (id: number, payload: UpdateCustomerLevelDTO): Promise<void> => {
  const res = await fetch(`${API_URL}/customer-levels/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to update customer level');
  }
};

/**
 * Delete a customer level by ID.
 * @param id - The ID of the customer level to delete.
 * @returns Void.
 */
export const deleteCustomerLevel = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/customer-levels/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to delete customer level');
  }
};
