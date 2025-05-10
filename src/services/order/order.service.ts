import {CreateOrderDTO, OrderTypeDTO} from '@app/types';
import Config from 'react-native-config';

const API_URL = Config.API_URL;

// Service function to fetch order types from the API
export const fetchOrderTypes = async (): Promise<OrderTypeDTO[]> => {
  const res = await fetch(`${API_URL}/orders/types`);

  if (!res.ok) {
    throw new Error('Failed to fetch order types');
  }

  const data: OrderTypeDTO[] = await res.json();
  return data;
};

// Service function to create an order
export const createOrder = async (orderData: CreateOrderDTO): Promise<any> => {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData), // Pass the order data as JSON in the request body
  });

  if (!res.ok) {
    throw new Error('Failed to create order');
  }

  const data = await res.json();
  return data;
};
