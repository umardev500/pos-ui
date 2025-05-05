import {fetchProductById, fetchProducts} from '@app/services';
import {ProductFilterDTO} from '@app/types';
import {useQuery} from '@tanstack/react-query';

/**
 * Custom hook to fetch products with optional filters 🔍
 * @param filter - The filter criteria (optional) to search products by.
 * @returns The query result for products, including loading, error, and data states.
 */
export const useProducts = (filter?: ProductFilterDTO) => {
  return useQuery({
    queryKey: ['products', filter], // Unique key for caching and refetching
    queryFn: () => fetchProducts(filter), // Fetch function with the filter
    enabled: filter !== undefined, // Only trigger the query if the filter is provided
  });
};

/**
 * Custom hook to fetch a single product by its ID 🎯
 * @param id - The ID of the product to fetch.
 * @returns The query result for a single product.
 */
export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ['product', id], // Unique key for caching and refetching the product
    queryFn: () => fetchProductById(id), // Fetch function with product ID
    enabled: !!id, // Only enable the query if an ID is provided
  });
};
