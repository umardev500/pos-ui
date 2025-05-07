import {OrderTypeDTO} from '@app/types';
import Config from 'react-native-config';

const API_URL = Config.API_URL;

// Service function to fetch order types from the API
export const fetchOrderTypes = async (): Promise<OrderTypeDTO[]> => {
  const res = await fetch(`${API_URL}/orders/types`);

  if (!res.ok) {
    throw new Error('Failed to fetch order types');
  }

  const data: OrderTypeDTO[] = await res.json();
  return data;
};
