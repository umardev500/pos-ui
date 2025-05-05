import {ProductVariantDTO} from '@app/types';

export const variantsMock: ProductVariantDTO[] = [
  {
    id: 1,
    product_id: 1,
    unit_id: 1,
    stock: 50,
    price: 3300.5,
    sku: 'CBG-PCS-BEEF',
    barcode: '12345678',
    unit: {
      id: 1,
      name: 'Piece',
      merchant_id: 1,
    },
    product_variant_values: [
      {
        id: 2,
        product_variant_id: 1,
        variant_value_id: 1,
        variant_value: {
          id: 1,
          variant_type_id: 1,
          value: 'Beef',
          variant_type: {
            id: 1,
            name: 'Flavor',
          },
        },
      },
      {
        id: 1,
        product_variant_id: 1,
        variant_value_id: 2,
        variant_value: {
          id: 2,
          variant_type_id: 1,
          value: 'Chicken',
          variant_type: {
            id: 1,
            name: 'Flavor',
          },
        },
      },
      {
        id: 3,
        product_variant_id: 1,
        variant_value_id: 3,
        variant_value: {
          id: 3,
          variant_type_id: 2,
          value: 'Small',
          variant_type: {
            id: 2,
            name: 'Size',
          },
        },
      },
    ],
  },
  {
    id: 2,
    product_id: 1,
    unit_id: 1,
    stock: 50,
    price: 5000.5,
    sku: 'CBG-PCX-BEEF',
    barcode: '12345678',
    unit: {
      id: 1,
      name: 'Piece',
      merchant_id: 1,
    },
    product_variant_values: [
      {
        id: 5,
        product_variant_id: 2,
        variant_value_id: 1,
        variant_value: {
          id: 1,
          variant_type_id: 1,
          value: 'Beef',
          variant_type: {
            id: 1,
            name: 'Flavor',
          },
        },
      },
      {
        id: 4,
        product_variant_id: 2,
        variant_value_id: 2,
        variant_value: {
          id: 2,
          variant_type_id: 1,
          value: 'Chicken',
          variant_type: {
            id: 1,
            name: 'Flavor',
          },
        },
      },
      {
        id: 6,
        product_variant_id: 2,
        variant_value_id: 4,
        variant_value: {
          id: 4,
          variant_type_id: 2,
          value: 'Large',
          variant_type: {
            id: 2,
            name: 'Size',
          },
        },
      },
    ],
  },
];
