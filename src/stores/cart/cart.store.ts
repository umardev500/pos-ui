import {ProductDto} from '@app/types';
import {create} from 'zustand';

type CartItem = {
  product: ProductDto;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: ProductDto, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
  totalItems: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product, quantity = 1) => {
    const {items} = get();
    const existing = items.find(i => i.product.id === product.id);

    if (existing) {
      set({
        items: items.map(i => (i.product.id === product.id ? {...i, quantity: i.quantity + quantity} : i)),
      });
    } else {
      set({items: [...items, {product, quantity}]});
    }
  },

  removeItem: productId => {
    set(state => ({
      items: state.items.filter(i => i.product.id !== productId),
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
    } else {
      set(state => ({
        items: state.items.map(i => (i.product.id === productId ? {...i, quantity} : i)),
      }));
    }
  },

  clearCart: () => {
    set({items: []});
  },

  getItemQuantity: (productId: number) => {
    const item = get().items.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  },

  totalItems: () => {
    return get().items.reduce((sum, i) => sum + i.quantity, 0);
  },
}));
