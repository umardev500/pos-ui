import {CartItem} from '@app/types';
import {mapCartToCreateOrderDTO} from '@app/utils/order.util';

const cartWithVariants: CartItem[] = [
  {
    product: {
      id: 1,
      name: 'Cheese Burger',
      description: null,
      image_url: null,
      barcode: null,
      base_unit_id: 1,
      category_id: 1,
      merchant_id: 1,
      discount_id: null,
      created_at: '2025-05-05T07:43:11.640Z',
      updated_at: '2025-05-05T07:43:11.640Z',
      category: null,
      base_unit: {id: 1, name: 'Piece', merchant_id: 1},
      discount: null,
      product_units: [
        {
          id: 1,
          product_id: 1,
          unit_id: 1,
          stock: 100,
          price: 8500,
          conversion_factor: 1,
          sku: 'CBG-PCS-001',
          barcode: null,
          unit: {id: 1, name: 'Piece', merchant_id: 1},
        },
      ],
      product_variants: [
        {
          id: 1,
          product_id: 1,
          unit_id: 1,
          stock: 50,
          price: 3300.5,
          sku: 'CBG-PCS-BEEF',
          barcode: '12345678',
          unit: {id: 1, name: 'Piece', merchant_id: 1},
          product_variant_values: [
            {
              id: 2,
              product_variant_id: 1,
              variant_value_id: 1,
              variant_value: {
                id: 1,
                variant_type_id: 1,
                value: 'Beef',
                variant_type: {id: 1, name: 'Flavor'},
              },
            },
          ],
        },
      ],
    },
    quantity: 2,
    unit: {
      id: 1,
      product_id: 1,
      unit_id: 1,
      stock: 100,
      price: 8500,
      conversion_factor: 1,
      sku: 'CBG-PCS-001',
      barcode: null,
      unit: {id: 1, name: 'Piece', merchant_id: 1},
    },
    variant: {
      id: 1,
      product_id: 1,
      unit_id: 1,
      stock: 50,
      price: 3300.5,
      sku: 'CBG-PCS-BEEF',
      barcode: '12345678',
      unit: {id: 1, name: 'Piece', merchant_id: 1},
      product_variant_values: [
        {
          id: 2,
          product_variant_id: 1,
          variant_value_id: 1,
          variant_value: {
            id: 1,
            variant_type_id: 1,
            value: 'Beef',
            variant_type: {id: 1, name: 'Flavor'},
          },
        },
      ],
    },
  },
];

const orderTypeId = 1; // DINE_IN, for example
const discountId = 123; // Optional discount ID
const downPayment = 50; // Optional down payment

const createOrderDTO = mapCartToCreateOrderDTO(cartWithVariants, orderTypeId, discountId, downPayment);
console.log(createOrderDTO);
