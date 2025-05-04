import {CartItem, CreateOrderDTO, CreateOrderItemDTO} from '@app/types';

export function mapCartToCreateOrderDTO(
  cartItems: CartItem[],
  orderInfo: {
    order_type_id: number;
    discount_id?: number; // Optionally passed to apply discount
    down_payment?: number; // Optional down payment
  },
): CreateOrderDTO {
  const order_items: CreateOrderItemDTO[] = cartItems.map(item => {
    // Check if variant exists and use variant price if available
    const price = item.variant ? item.variant.price : item.unit.price;

    return {
      product_id: item.product.id,
      unit_id: item.unit.unit_id,
      quantity: item.quantity,
      price,
      subtotal: item.quantity * price,
      variant_id: item.variant?.id, // Include variant ID if it exists
      discount_type: item.product.discount?.type, // Set discount type if available
      discount_value: item.product.discount?.value, // Set discount value if available
    };
  });

  return {
    ...orderInfo,
    order_items,
  };
}
