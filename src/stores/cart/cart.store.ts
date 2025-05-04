import {CartItem} from '@app/types';
import {create} from 'zustand';

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: number, unitId: number, variantId?: number, quantity?: number) => void;
  removeItem: (productId: number, unitId: number, variantId?: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number; // New method to get total price
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: item =>
    set(state => {
      const exists = state.items.find(
        i => i.product.id === item.product.id && i.unit.id === item.unit.id && i.variant?.id === item.variant?.id,
      );

      if (exists) {
        return {
          items: state.items.map(i =>
            i.product.id === item.product.id && i.unit.id === item.unit.id && i.variant?.id === item.variant?.id
              ? {...i, quantity: i.quantity + item.quantity}
              : i,
          ),
        };
      }

      return {items: [...state.items, item]};
    }),

  updateQuantity: (productId, unitId, variantId, quantity = 1) => {
    set(state => {
      const updatedItems = state.items.map(item => {
        // Check if we match the product, unit, and variant (if provided)
        const matchesProduct = item.product.id === productId;
        const matchesUnit = item.unit.unit_id === unitId;
        const matchesVariant = !variantId || item.variant?.id === variantId;

        if (matchesProduct && matchesUnit && matchesVariant) {
          return {...item, quantity}; // Update the quantity
        }

        return item;
      });

      return {items: updatedItems}; // Return the new state
    });
  },

  removeItem: (productId, unitId, variantId) =>
    set(state => ({
      items: state.items.filter(
        item => !(item.product.id === productId && item.unit.id === unitId && item.variant?.id === variantId),
      ),
    })),

  clearCart: () => set({items: []}),

  getTotalPrice: () =>
    get().items.reduce((total, item) => {
      // Get the price based on unit or variant
      const price = item.variant?.price || item.unit.price;
      // Add price * quantity to total
      return total + price * item.quantity;
    }, 0),
}));
