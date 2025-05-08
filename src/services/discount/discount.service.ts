import {DiscountDTO, FindDiscountFilterDTO} from '@app/types';
import Config from 'react-native-config';

const API_URL = Config.API_URL;

// Service function to fetch discounts from the API
export const fetchDiscounts = async (filters?: FindDiscountFilterDTO): Promise<DiscountDTO[]> => {
  const queryParams = new URLSearchParams();

  // Add filters to the query string if they exist
  if (filters?.scope) {
    queryParams.append('scope', filters.scope);
  }

  // Construct the URL with query parameters
  const url = `${API_URL}/discounts?${queryParams.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch discounts');
  }

  const data: DiscountDTO[] = await res.json();
  return data;
};
