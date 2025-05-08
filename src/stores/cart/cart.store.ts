import {CartItem} from '@app/types';
import lodash from 'lodash';
import {create} from 'zustand';

type CartState = {
  items: CartItem[];

  // Actions
  addItem: (item: CartItem) => void;
  updateItem: (item: CartItem, updates: Partial<CartItem>) => void;
  incrementQuantity: (item: CartItem) => void;
  decrementQuantity: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
  getTotalDiscount: () => number;

  // Derived State
  getTotalPrice: () => number;
  getFinalAmount: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  // ————————————————————————————————————————————————
  // 🛒 Add item to cart (merge if same unit/variant)
  // ————————————————————————————————————————————————
  addItem: item =>
    set(state => {
      const isExists = state.items.find(
        i =>
          i.product.id === item.product.id &&
          i.unit.unit_id === item.unit.unit_id &&
          i.variant?.id === item.variant?.id &&
          i.order_type_id === item.order_type_id &&
          lodash.isEqual(i.selectecVariantOptions, item.selectecVariantOptions),
      );

      if (isExists) {
        return {
          items: state.items.map(i =>
            i.product.id === item.product.id &&
            i.unit.unit_id === item.unit.unit_id &&
            i.order_type_id === item.order_type_id &&
            i.variant?.id === item.variant?.id
              ? {...i, quantity: i.quantity + item.quantity}
              : i,
          ),
        };
      }

      return {items: [...state.items, item]};
    }),

  updateItem: (item, updates) =>
    set(state => ({
      items: state.items.map(i => {
        const isSameItem =
          i.product.id === item.product.id &&
          i.unit.unit_id === item.unit.unit_id &&
          i.order_type_id === item.order_type_id &&
          i.variant?.id === item.variant?.id &&
          lodash.isEqual(i.selectecVariantOptions, item.selectecVariantOptions);

        console.log('is same');

        return isSameItem ? {...i, ...updates} : i;
      }),
    })),

  // ————————————————————————————————————————————————
  // ➕ Increment quantity of an existing item
  // ————————————————————————————————————————————————
  incrementQuantity: (item: CartItem) =>
    set(state => {
      return {
        items: state.items.map(i =>
          i.product.id === item.product.id &&
          i.unit.unit_id === item.unit.unit_id &&
          i.order_type_id === item.order_type_id &&
          i.variant?.id === item.variant?.id &&
          lodash.isEqual(i.selectecVariantOptions, item.selectecVariantOptions)
            ? {...i, quantity: i.quantity + 1}
            : i,
        ),
      };
    }),

  // ————————————————————————————————————————————————
  // ➖ Decrement quantity of an existing item
  // ————————————————————————————————————————————————
  decrementQuantity: (item: CartItem) =>
    set(state => {
      return {
        items: state.items.map(i =>
          i.product.id === item.product.id &&
          i.unit.unit_id === item.unit.unit_id &&
          i.order_type_id === item.order_type_id &&
          i.variant?.id === item.variant?.id &&
          lodash.isEqual(i.selectecVariantOptions, item.selectecVariantOptions)
            ? {...i, quantity: Math.max(i.quantity - 1, 1)} // prevent going below 1
            : i,
        ),
      };
    }),

  // ————————————————————————————————————————————————
  // ❌ Remove item from cart
  // ————————————————————————————————————————————————
  removeItem: (item: CartItem) =>
    set(state => ({
      items: state.items.filter(
        i =>
          !(
            i.product.id === item.product.id &&
            i.unit.unit_id === item.unit.unit_id &&
            i.order_type_id === item.order_type_id &&
            i.variant?.id === item.variant?.id &&
            lodash.isEqual(i.selectecVariantOptions, item.selectecVariantOptions)
          ),
      ),
    })),

  // ————————————————————————————————————————————————
  // 🧹 Clear the cart
  // ————————————————————————————————————————————————
  clearCart: () => set({items: []}),

  // ————————————————————————————————————————————————
  // 💰 Compute total cart price
  // ————————————————————————————————————————————————
  getTotalPrice: () =>
    get().items.reduce((total, item) => {
      const price = item.variant?.price ?? item.unit.price;
      return total + price * item.quantity;
    }, 0),

  // ————————————————————————————————————————————————
  // 💰 Compute total cart discount
  // ————————————————————————————————————————————————
  getTotalDiscount: () => {
    return get().items.reduce((total, item) => {
      const discount = item.product.discount;
      if (!discount) return total;

      const unitPrice = item.variant?.price ?? item.unit.price;
      let discountValue = 0;

      if (discount.type === 'PERCENT') {
        discountValue = (unitPrice * discount.value) / 100;
      } else if (discount.type === 'FIXED') {
        discountValue = discount.value;
      }

      return total + discountValue * item.quantity;
    }, 0);
  },

  getFinalAmount: () => {
    const total = get().getTotalPrice();
    const discount = get().getTotalDiscount();
    return total - discount;
  },
}));
