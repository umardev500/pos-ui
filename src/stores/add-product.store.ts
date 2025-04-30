import {ProductInput} from '@app/types';
import {create} from 'zustand';

const initialProductState: ProductInput = {
  category_id: 0,
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
interface AddProductState {
  product: ProductInput | null;
  updateProduct: (fields: Partial<ProductInput>) => void;
  resetProduct: () => void;
}

export const useAddProductStore = create<AddProductState>(set => ({
  product: initialProductState,
  updateProduct: fields =>
    set(state => {
      const updatedProduct: ProductInput = {
        ...state.product,
        ...fields,
      };
      return {product: updatedProduct};
    }),
  resetProduct: () => set({product: initialProductState}),
}));
