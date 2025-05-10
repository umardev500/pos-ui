import {createOrder, fetchOrderTypes} from '@app/services/order';
import {CreateOrderDTO} from '@app/types';
import {useMutation, useQuery} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export const useOrderTypes = () => {
  return useQuery({
    queryKey: ['order-types'],
    queryFn: fetchOrderTypes,
  });
};

// Hook for creating an order
export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (orderData: CreateOrderDTO) => createOrder(orderData),
    onSuccess: () => {
      // You can handle side effects like showing a toast, updating the UI, etc.
      Toast.show({
        type: 'success',
        text1: 'Order created successfully 🎉',
      });
    },
    onError: (error: Error) => {
      // Handle error appropriately
      Toast.show({
        type: 'error',
        text1: 'Failed to create order',
      });

      console.error('Error creating order:', error);
    },
  });
};
