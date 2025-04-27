import {ImageSourcePropType} from 'react-native';

type Variant = {
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
