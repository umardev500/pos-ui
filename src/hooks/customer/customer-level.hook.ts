import {
  createCustomerLevel,
  deleteCustomerLevel,
  fetchCustomerLevelById,
  fetchCustomerLevels,
  updateCustomerLevel,
} from '@app/services';
import {CreateCustomerLevelDTO, UpdateCustomerLevelDTO} from '@app/validations';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

/**
 * Custom hook to fetch all customer levels.
 */
export const useCustomerLevels = () => {
  return useQuery({
    queryKey: ['customerLevels'],
    queryFn: fetchCustomerLevels,
  });
};

/**
 * Custom hook to fetch a single customer level by ID.
 * @param id - The ID of the customer level.
 * @param enabled - Flag to control whether the query should be enabled immediately.
 */
export const useCustomerLevel = (id: number, enabled = true) => {
  return useQuery({
    queryKey: ['customerLevel', id],
    queryFn: () => fetchCustomerLevelById(id),
    enabled,
  });
};

/**
 * Custom hook to create a new customer level.
 * @param onSuccess - Callback function to run on successful creation.
 */
export const useCreateCustomerLevel = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCustomerLevel: CreateCustomerLevelDTO) => createCustomerLevel(newCustomerLevel),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['customerLevels']});
      onSuccess?.();
    },
    onError: err => {
      console.error('Create error:', err);
    },
  });
};

/**
 * Custom hook to update an existing customer level.
 * @param onSuccess - Callback function to run on successful update.
 */
export const useUpdateCustomerLevel = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, data}: {id: number; data: UpdateCustomerLevelDTO}) => updateCustomerLevel(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['customerLevels']});
      onSuccess?.();
    },
    onError: err => {
      console.error('Update error:', err);
    },
  });
};

/**
 * Custom hook to delete a customer level.
 * @param onSuccess - Callback function to run on successful deletion.
 */
export const useDeleteCustomerLevel = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCustomerLevel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['customerLevels']});
      onSuccess?.();
    },
    onError: err => {
      console.error('Delete error:', err);
    },
  });
};
