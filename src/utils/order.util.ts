import {CartItem, CreateOrderDTO, CreateOrderItemDTO} from '@app/types';

/**
 * Maps a list of CartItem to a CreateOrderDTO.
 *
 * @param cart - The shopping cart items.
 * @param orderTypeId - The type ID of the order (e.g., DINE_IN).
 * @param discountId - Optional discount ID to apply to the entire order.
 * @param downPayment - Optional down payment.
 * @returns CreateOrderDTO
 */
export function mapCartToCreateOrderDTO(
  cart: CartItem[],
  orderTypeId: number,
  discountId?: number,
  downPayment?: number,
): CreateOrderDTO {
  const order_items: CreateOrderItemDTO[] = cart.map(item => {
    // Determine the price: if a variant is selected, use its price; otherwise, use the unit price.
    const price = item.variant ? item.variant.price : item.unit.price;

    return {
      product_id: item.product.id,
      quantity: item.quantity,
      price, // Use the price from the variant if available, otherwise fallback to unit price.
      ...(item.product.discount_id && {discount_id: item.product.discount_id}),
    };
  });

  const dto: CreateOrderDTO = {
    order_type_id: orderTypeId,
    order_items,
    ...(discountId && {discount_id: discountId}),
    ...(downPayment !== undefined && {down_payment: downPayment}),
  };

  return dto;
}
