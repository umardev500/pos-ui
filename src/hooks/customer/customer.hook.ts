import {createCustomer, fetchCustomers} from '@app/services';
import {CreateCustomerDTO} from '@app/validations';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });
};

export const useCreateCustomer = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCustomer: CreateCustomerDTO) => createCustomer(newCustomer),
    onSuccess: () => {
      // Invalidate the customer list so it refetches
      queryClient.invalidateQueries({queryKey: ['customers']});

      onSuccess?.();
    },
    onError: err => {
      console.log('error', err);
    },
  });
};
