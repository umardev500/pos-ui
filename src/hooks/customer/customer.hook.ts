import {fetchCustomers} from '@app/services';
import {useQuery} from '@tanstack/react-query';

export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });
};
