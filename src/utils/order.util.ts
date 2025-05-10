import {CartAdditionalInfo, CartItem, CreateOrderDTO, CreateOrderItemDTO} from '@app/types';

/**
 * Maps a list of CartItem to a CreateOrderDTO.
 *
 * @param cart - The shopping cart items.
 * @param additionalInfo - Optional additional order information like order type, discount, and down payment.
 * @returns CreateOrderDTO
 */
export function mapCartToCreateOrderDTO(cart: CartItem[], additionalInfo?: CartAdditionalInfo): CreateOrderDTO {
  const order_items: CreateOrderItemDTO[] = cart.map(item => {
    const price = item.variant ? item.variant.price : item.unit.price;

    return {
      product_id: item.product.id,
      quantity: item.quantity,
      price,
      ...(item.product.discount_id && {discount_id: item.product.discount_id}),
    };
  });

  const dto: CreateOrderDTO = {
    order_type_id: additionalInfo?.orderType?.id ?? 0, // fallback value if orderType is not provided
    order_items,
    ...(additionalInfo?.discount && {discount_id: additionalInfo.discount.id}),
    ...(additionalInfo?.downPayment !== undefined && {down_payment: additionalInfo.downPayment}),
  };

  return dto;
}
