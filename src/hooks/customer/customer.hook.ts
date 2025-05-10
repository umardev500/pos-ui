import {createCustomer, deleteCustomer, fetchCustomerById, fetchCustomers, updateCustomer} from '@app/services';
import {CreateCustomerDTO, UpdateCustomerDTO} from '@app/validations';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });
};

export const useCustomer = (id: number, enabled = true) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => fetchCustomerById(id),
    enabled,
  });
};

export const useCreateCustomer = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCustomer: CreateCustomerDTO) => createCustomer(newCustomer),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['customers']});
      onSuccess?.();
    },
    onError: err => {
      console.error('Create error:', err);
    },
  });
};

export const useUpdateCustomer = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, data}: {id: number; data: UpdateCustomerDTO}) => updateCustomer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['customers']});
      onSuccess?.();
    },
    onError: err => {
      console.error('Update error:', err);
    },
  });
};

export const useDeleteCustomer = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['customers']});
      onSuccess?.();
    },
    onError: err => {
      console.error('Delete error:', err);
    },
  });
};
