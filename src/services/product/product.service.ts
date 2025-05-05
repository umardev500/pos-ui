import {ProductDto, ProductFilterDTO} from '@app/types';
import Config from 'react-native-config';

const API_URL = Config.API_URL;

/**
 * Fetch products with optional filters 🔍
 * @param filter - Search and/or category filter
 * @returns Array of products matching the filter
 */
export const fetchProducts = async (filter?: ProductFilterDTO): Promise<ProductDto[]> => {
  const {search, categoryId} = filter || {}; // Destructure filters

  let url = `${API_URL}/products`; // Base URL

  const params: URLSearchParams = new URLSearchParams(); // Prepare query params

  if (search) params.append('search', search); // Add search filter
  if (categoryId) params.append('category_id', categoryId.toString()); // Add category filter

  // Append params to URL if any
  if (params.toString()) url += `?${params.toString()}`;

  const res = await fetch(url); // Fetch products from API

  if (!res.ok) throw new Error('Failed to fetch products 🚨'); // Error handling

  const data: ProductDto[] = await res.json(); // Parse JSON response
  return data; // Return products
};

/**
 * Fetch a single product by ID 🛒
 * @param id - The ID of the product
 * @returns The product with the given ID
 */
export const fetchProductById = async (id: number): Promise<ProductDto> => {
  const url = `${API_URL}/products/${id}`; // URL for single product

  const res = await fetch(url); // Fetch the product

  if (!res.ok) throw new Error('Failed to fetch product 🚨'); // Error handling

  const data: ProductDto = await res.json(); // Parse product data
  return data; // Return product
};
