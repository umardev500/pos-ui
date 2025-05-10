import {DiscountType} from '@app/types/discount';

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
