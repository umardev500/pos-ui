import {fetchDiscounts} from '@app/services/discount/discount.service';
import {FindDiscountFilterDTO} from '@app/types';
import {useQuery} from '@tanstack/react-query';

export const useDiscounts = (filters?: FindDiscountFilterDTO) => {
  return useQuery({
    queryKey: ['discounts', filters],
    queryFn: () => fetchDiscounts(filters),
  });
};
