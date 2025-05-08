import {CartAdditionalInfo, CartItem} from '@app/types';
import lodash from 'lodash';
import {create} from 'zustand';

type CartState = {
  items: CartItem[];
  additionalInfo?: CartAdditionalInfo;

  // Actions
  addItem: (item: CartItem) => void;
  updateItem: (item: CartItem, updates: Partial<CartItem>) => void;
  incrementQuantity: (item: CartItem) => void;
  decrementQuantity: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
  getTotalDiscount: () => number;

  // Additonal info action
  setAdditionalInfo: (info: CartAdditionalInfo) => void;

  // Derived State
  getTotalPrice: () => number;
  getFinalAmount: () => number;
};

// Helper function to check if two items are the same
const isSameCartItem = (itemA: CartItem, itemB: CartItem) => {
  return (
    itemA.product.id === itemB.product.id &&
    itemA.unit.unit_id === itemB.unit.unit_id &&
    itemA.order_type?.id === itemB?.order_type?.id &&
    itemA.variant?.id === itemB.variant?.id &&
    lodash.isEqual(itemA.selectecVariantOptions, itemB.selectecVariantOptions)
  );
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  additionalInfo: undefined,

  // ————————————————————————————————————————————————
  // 🛒 Add item to cart (merge if same unit/variant)
  // ————————————————————————————————————————————————
  addItem: item =>
    set(state => {
      const isExists = state.items.some(i => isSameCartItem(i, item));

      if (isExists) {
        return {
          items: state.items.map(i => (isSameCartItem(i, item) ? {...i, quantity: i.quantity + item.quantity} : i)),
        };
      }

      return {items: [...state.items, item]};
    }),

  updateItem: (item, updates) =>
    set(state => ({
      items: state.items.map(i => {
        const isSameItem = isSameCartItem(i, item);

        return isSameItem ? {...i, ...updates} : i;
      }),
    })),

  // ————————————————————————————————————————————————
  // ➕ Increment quantity of an existing item
  // ————————————————————————————————————————————————
  incrementQuantity: (item: CartItem) =>
    set(state => {
      return {
        items: state.items.map(i => (isSameCartItem(i, item) ? {...i, quantity: i.quantity + 1} : i)),
      };
    }),

  // ————————————————————————————————————————————————
  // ➖ Decrement quantity of an existing item
  // ————————————————————————————————————————————————
  decrementQuantity: (item: CartItem) =>
    set(state => {
      return {
        items: state.items.map(i => (isSameCartItem(i, item) ? {...i, quantity: Math.max(i.quantity - 1, 1)} : i)),
      };
    }),

  // ————————————————————————————————————————————————
  // ❌ Remove item from cart
  // ————————————————————————————————————————————————
  removeItem: item =>
    set(state => ({
      items: state.items.filter(i => !isSameCartItem(i, item)), // Use helper function
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

  setAdditionalInfo: (info: Partial<CartAdditionalInfo>) =>
    set(state => ({
      additionalInfo: {
        ...state.additionalInfo,
        ...info,
      },
    })),
}));
