import {ProductUnitDto, ProductVariantDTO} from '@app/types';
import * as yup from 'yup';

export type PreviewProductFormType = {
  order_type_id?: number;
  product_unit?: ProductUnitDto;
  note?: string;
  quantity?: number;
  variant?: ProductVariantDTO;
};

export const initialPreviewProductForm: PreviewProductFormType = {
  order_type_id: undefined,
  product_unit: undefined,
  note: undefined,
  quantity: 0,
  variant: undefined,
};

export const ProductPreviewSchema = (hasVariant?: boolean) => {
  return yup.object().shape({
    product_unit: yup.object().required('Product unit is required'),

    quantity: yup.number().required('Quantity is required').moreThan(0, 'Quantity must be greater than zero'),

    ...(hasVariant && {
      variant: yup.object().required('Variant is required'),
    }),
  });
};
