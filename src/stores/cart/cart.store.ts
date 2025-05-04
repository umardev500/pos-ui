import {CartItem} from '@app/types';
import {create} from 'zustand';

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: number, unitId: number, variantId?: number, quantity?: number) => void;
  removeItem: (productId: number, unitId: number, variantId?: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>(set => ({
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

  updateQuantity: (productId, unitId, variantId, quantity = 1) =>
    set(state => ({
      items: state.items.map(item =>
        item.product.id === productId && item.unit.id === unitId && item.variant?.id === variantId
          ? {...item, quantity}
          : item,
      ),
    })),

  removeItem: (productId, unitId, variantId) =>
    set(state => ({
      items: state.items.filter(
        item => !(item.product.id === productId && item.unit.id === unitId && item.variant?.id === variantId),
      ),
    })),

  clearCart: () => set({items: []}),
}));
