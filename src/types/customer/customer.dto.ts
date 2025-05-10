import {DiscountType} from '@app/types/discount';

export type CustomerDTO = {
  id: number;
  merchant_id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  points: number;
  level?: Level;
  created_at: string;
  updated_at: string;
};

export type Level = {
  id: number;
  merchant_id: number;
  name: string;
  description: string;
  discount_type: DiscountType;
  discount: number;
  created_at: string;
  updated_at: string;
};
