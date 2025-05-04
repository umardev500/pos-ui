import {CategoryDto} from '@app/types/category';
import {DiscountDto} from '@app/types/discount';
import {UnitDto} from '@app/types/unit';
import {VariantValueDto} from '@app/types/variant';

export interface ProductUnitDto {
  id: number;
  product_id: number;
  unit_id: number;
  stock: number;
  price: number;
  conversion_factor: number;
  sku: string;
  barcode: string | null;
  unit: UnitDto;
}

export interface ProductVariantDto {
  id: number;
  product_id: number;
  unit_id: number;
  variant_value_id: number;
  stock: number;
  price: number;
  sku: string;
  barcode: string | null;
  variant_value: VariantValueDto;
  unit: UnitDto;
}

export interface ProductDto {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  barcode: string | null;
  base_unit_id: number;
  category_id: number | null;
  merchant_id: number;
  discount_id: number | null;
  created_at: string;
  updated_at: string;
  category: CategoryDto | null;
  base_unit: UnitDto;
  discount: DiscountDto | null;
  product_unit: ProductUnitDto[];
  product_variant: ProductVariantDto[];
}
