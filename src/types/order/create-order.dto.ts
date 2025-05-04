export interface CreateOrderDTO {
  order_type_id: number; // The ID of the order type (e.g., DINE_IN, TAKEAWAY)
  order_items: CreateOrderItemDTO[]; // List of items in the order, including quantity, product, price
  discount_id?: number; // Optional discount ID, set internally (not user-provided)
  down_payment?: number; // Optional down payment
}

export interface CreateOrderItemDTO {
  product_id: number;
  unit_id: number;
  quantity: number;
  price: number;
  variant_id?: number;
  discount_id?: number;
}
