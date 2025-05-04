import {ProductDto} from '@app/types';
import Config from 'react-native-config';

const API_URL = Config.API_URL;

export const fetchProducts = async (): Promise<ProductDto[]> => {
  const res = await fetch(`${API_URL}/products`);

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: ProductDto[] = await res.json();
  return data;
};
