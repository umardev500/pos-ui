import {CartItem} from '@app/types';
import {create} from 'zustand';

type CartState = {
  items: CartItem[];

  // Actions
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: number, unitId: number, variantId?: number, quantity?: number) => void;
  removeItem: (productId: number, unitId: number, variantId?: number) => void;
  clearCart: () => void;

  // Derived State
  getTotalPrice: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  // ————————————————————————————————————————————————
  // 🛒 Add item to cart (merge if same unit/variant)
  // ————————————————————————————————————————————————
  addItem: item =>
    set(state => {
      const exists = state.items.find(
        i =>
          i.product.id === item.product.id &&
          i.unit.unit_id === item.unit.unit_id &&
          i.variant?.id === item.variant?.id,
      );

      if (exists) {
        return {
          items: state.items.map(i =>
            i.product.id === item.product.id &&
            i.unit.unit_id === item.unit.unit_id &&
            i.variant?.id === item.variant?.id
              ? {...i, quantity: i.quantity + item.quantity}
              : i,
          ),
        };
      }

      return {items: [...state.items, item]};
    }),

  // ————————————————————————————————————————————————
  // 🔄 Update quantity of a specific cart item
  // ————————————————————————————————————————————————
  updateQuantity: (productId, unitId, variantId, quantity = 1) =>
    set(state => {
      const updatedItems = state.items.map(item => {
        const isSameProduct = item.product.id === productId;
        const isSameUnit = item.unit.unit_id === unitId;
        const isSameVariant = !variantId || item.variant?.id === variantId || (!item.variant && !variantId);

        if (isSameProduct && isSameUnit && isSameVariant) {
          return {...item, quantity};
        }

        return item;
      });

      return {items: updatedItems};
    }),

  // ————————————————————————————————————————————————
  // ❌ Remove item from cart
  // ————————————————————————————————————————————————
  removeItem: (productId, unitId, variantId) =>
    set(state => ({
      items: state.items.filter(
        item => !(item.product.id === productId && item.unit.unit_id === unitId && item.variant?.id === variantId),
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
}));
