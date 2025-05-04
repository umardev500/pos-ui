import {fetchCategories} from '@app/services';
import {useQuery} from '@tanstack/react-query';

// Custom hook to fetch categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'], // Unique key for categories
    queryFn: fetchCategories, // Fetch function
  });
};
