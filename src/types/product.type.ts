import {Category} from '@app/types/category.type';
import {Unit} from '@app/types/unit.type';
import {ImageSourcePropType} from 'react-native';

export type Variant = {
  unit?: string;
  price: number;
  stock: number;
  [key: string]: any; // other dynamic fields (e.g., size, color, etc.)
};

export type Product = {
  id: number;
  name: string;
  description: string;
  photo: ImageSourcePropType | string;
  quantity: number;
  capital: number;
  price: number;
  discount: number;
  barcode: string;
  variants: Variant[];
};

export type ProductsResponse = Product[];

// Input product
export type ProductInput = {
  category?: Category;
  name?: string;
  description?: string;
  photo?: ImageSourcePropType | string;
  quantity?: number;
  capital?: number;
  price?: number;
  discount?: number;
  barcode?: string;
  sku?: string;
  units?: Unit[];
  variants?: Variant[];
};
