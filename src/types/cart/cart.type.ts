import {ProductDto, ProductUnitDto, ProductVariantDto} from '@app/types/product';

export type CartItem = {
  product: ProductDto;
  quantity: number;
  unit: ProductUnitDto; // Added unit to CartItem
  variant?: ProductVariantDto; // Variant is optional
};
