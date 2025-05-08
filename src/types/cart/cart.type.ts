import {ProductDto, ProductUnitDto, ProductVariantDTO} from '@app/types/product';

export type CartItem = {
  product: ProductDto;
  quantity: number;
  unit: ProductUnitDto; // Added unit to CartItem
  variant?: ProductVariantDTO; // Variant is optional
  selectecVariantOptions?: Record<string, string>;
  price?: number;
  note?: string;
  order_type_id?: number;
};
