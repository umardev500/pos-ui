import {ProductDto, ProductFilterDTO} from '@app/types';
import Config from 'react-native-config';

const API_URL = Config.API_URL;

export const fetchProducts = async (filter?: ProductFilterDTO): Promise<ProductDto[]> => {
  // Construct the URL with query parameters based on the filter
  const {search, categoryId} = filter || {};

  let url = `${API_URL}/products`;

  // Add query parameters if filter values are provided
  const params: URLSearchParams = new URLSearchParams();

  if (search) {
    params.append('search', search); // Add search filter
  }

  if (categoryId) {
    params.append('category_id', categoryId.toString()); // Add category filter
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: ProductDto[] = await res.json();
  return data;
};
