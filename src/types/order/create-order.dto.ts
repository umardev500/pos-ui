import {DiscountType} from '@app/types/discount';

export interface CreateOrderDTO {
  merchant_id: number;
  order_type_id: number;
  total_amount: number;
  discount_type?: DiscountType;
  discount_value?: number;
  down_payment?: number;
  paid_at?: string; // ISO 8601 date string
  order_items?: CreateOrderItemDTO[];
}

export interface CreateOrderItemDTO {
  product_id: number;
  unit_id: number;
  quantity: number;
  price: number;
  subtotal: number;
  variant_id?: number;
  discount_type?: DiscountType;
  discount_value?: number;
}
