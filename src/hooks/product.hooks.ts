import {fetchProducts} from '@app/services';
import {ProductFilterDTO} from '@app/types';
import {useQuery} from '@tanstack/react-query';

// Update the useProducts hook to accept filter parameters
export const useProducts = (filter?: ProductFilterDTO) => {
  return useQuery({
    queryKey: ['products', filter], // Include filter in the query key to trigger re-fetch when filter changes
    queryFn: () => fetchProducts(filter), // Pass the filter to the fetch function
    enabled: filter !== undefined, // Enable the query only if the filter is provided
  });
};
