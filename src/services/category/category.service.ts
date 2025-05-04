import {CategoryDto} from '@app/types'; // Assuming you have a CategoryDto in your types
import Config from 'react-native-config';

const API_URL = Config.API_URL;

// Service function to fetch categories from the API
export const fetchCategories = async (): Promise<CategoryDto[]> => {
  const res = await fetch(`${API_URL}/categories`);

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data: CategoryDto[] = await res.json();
  return data;
};
