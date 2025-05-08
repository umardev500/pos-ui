import {fetchDiscounts} from '@app/services/discount/discount.service';
import {useQuery} from '@tanstack/react-query';

export const useDiscounts = () => {
  return useQuery({
    queryKey: ['discounts'],
    queryFn: fetchDiscounts,
  });
};
