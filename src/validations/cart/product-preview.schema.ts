import {ProductUnitDto} from '@app/types';

export type PreviewProductFormType = {
  order_type_id?: number;
  product_unit?: ProductUnitDto;
  note?: string;
  quantity?: number;
};

export const initialPreviewProductForm: PreviewProductFormType = {
  order_type_id: undefined,
  product_unit: undefined,
  note: undefined,
  quantity: 0,
};
