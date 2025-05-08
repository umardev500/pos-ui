import {DiscountDTO} from '@app/types';
import Config from 'react-native-config';

const API_URL = Config.API_URL;

// Service function to fetch discounts from the API
export const fetchDiscounts = async (): Promise<DiscountDTO[]> => {
  const res = await fetch(`${API_URL}/discounts`);

  if (!res.ok) {
    throw new Error('Failed to fetch discounts');
  }

  const data: DiscountDTO[] = await res.json();
  return data;
};
