import {fetchOrderTypes} from '@app/services/order';
import {useQuery} from '@tanstack/react-query';

export const useOrderTypes = () => {
  return useQuery({
    queryKey: ['order-types'],
    queryFn: fetchOrderTypes,
  });
};
