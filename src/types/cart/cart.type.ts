import {DiscountDTO} from '@app/types/discount';
import {OrderTypeDTO} from '@app/types/order';
import {ProductDto, ProductUnitDto, ProductVariantDTO} from '@app/types/product';

export type CartItem = {
  product: ProductDto;
  quantity: number;
  unit: ProductUnitDto; // Added unit to CartItem
  variant?: ProductVariantDTO; // Variant is optional
  selectecVariantOptions?: Record<string, string>;
  price?: number;
  note?: string;
  order_type?: OrderTypeDTO;
};

export type CartAdditionalInfo = {
  discount?: DiscountDTO;
  downPayment?: number;
};
