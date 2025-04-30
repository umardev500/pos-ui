import {ProductInput} from '@app/types';
import {create} from 'zustand';

/**
 * Default initial state for a product form
 */
export const initialProductState: ProductInput = {
  category: undefined,
  name: '',
  description: '',
  photo: '',
  quantity: 0,
  capital: 0,
  price: 0,
  discount: 0,
  barcode: '',
  sku: '',
  units: [],
  variants: [],
};

/**
 * Store interface definition
 */
interface AddProductState {
  product: ProductInput | null;
  updateProduct: (fields: Partial<ProductInput>) => void;
  resetProduct: () => void;
}

/**
 * Zustand store to manage product creation form state
 */
export const useAddProductStore = create<AddProductState>(set => ({
  /**
   * Main product state, initialized to empty form
   */
  product: initialProductState,

  /**
   * Updates product fields with shallow merge
   */
  updateProduct: fields =>
    set(state => {
      const updatedProduct: ProductInput = {
        ...state.product,
        ...fields,
      };
      return {product: updatedProduct};
    }),

  /**
   * Resets product to initial blank state
   */
  resetProduct: () => set({product: initialProductState}),
}));
