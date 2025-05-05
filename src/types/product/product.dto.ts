import {CategoryDto} from '@app/types/category';
import {DiscountDto} from '@app/types/discount';
import {UnitDto} from '@app/types/unit';
import {VariantTypeDTO} from '@app/types/variant';

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

export interface ProductVariantDTO {
  id: number;
  product_id: number;
  unit_id: number;
  stock: number;
  price: number;
  sku: string;
  barcode: string;
  unit: UnitDto;
  product_variant_values: ProductVariantValueDTO[];
}

export interface ProductVariantValueDTO {
  id: number;
  product_variant_id: number;
  variant_value_id: number;
  variant_value: VariantValueDTO;
}

export interface VariantValueDTO {
  id: number;
  variant_type_id: number;
  value: string;
  variant_type: VariantTypeDTO;
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
  product_units: ProductUnitDto[];
  product_variants: ProductVariantDTO[];
}
