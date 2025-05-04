import {
  CartItem,
  CategoryDto,
  DiscountDto,
  DiscountType,
  ProductDto,
  ProductUnitDto,
  ProductVariantDto,
  UnitDto,
  VariantValueDto,
} from '@app/types';
import {mapCartToCreateOrderDTO} from '@app/utils/order.util';

const mockCartItems: CartItem[] = [
  {
    product: {
      id: 1,
      name: 'T-shirt',
      description: 'A cotton T-shirt.',
      image_url: 'http://example.com/tshirt.jpg',
      barcode: '1234567890123',
      base_unit_id: 1,
      category_id: 2,
      merchant_id: 101,
      discount_id: 1,
      created_at: '2025-05-01T12:00:00Z',
      updated_at: '2025-05-01T12:00:00Z',
      category: {id: 2, name: 'Clothing', description: 'Apparel'} as CategoryDto,
      base_unit: {id: 1, name: 'Piece'} as UnitDto,
      discount: {
        id: 1,
        type: 'PERCENT' as DiscountType,
        value: 10, // 10% off
      } as DiscountDto,
      product_units: [
        {
          id: 1,
          product_id: 1,
          unit_id: 1,
          stock: 50,
          price: 15,
          conversion_factor: 1,
          sku: 'TSHIRT123',
          barcode: null,
          unit: {id: 1, name: 'Piece'} as UnitDto,
        } as ProductUnitDto,
      ],
      product_variants: [], // No variants for this product
    } as ProductDto,
    quantity: 2,
    unit: {
      id: 1,
      unit_id: 1,
      price: 15,
      sku: 'TSHIRT123',
      conversion_factor: 1,
      stock: 50,
      barcode: null,
      unit: {id: 1, name: 'Piece'} as UnitDto,
    } as ProductUnitDto,
    variant: undefined, // No variant selected
  },
  {
    product: {
      id: 2,
      name: 'Jeans',
      description: 'A pair of denim jeans.',
      image_url: 'http://example.com/jeans.jpg',
      barcode: '9876543210987',
      base_unit_id: 1,
      category_id: 2,
      merchant_id: 101,
      discount_id: null,
      created_at: '2025-05-01T12:00:00Z',
      updated_at: '2025-05-01T12:00:00Z',
      category: {id: 2, name: 'Clothing', description: 'Apparel'} as CategoryDto,
      base_unit: {id: 1, name: 'Piece'} as UnitDto,
      discount: null, // No discount
      product_units: [
        {
          id: 2,
          product_id: 2,
          unit_id: 1,
          stock: 30,
          price: 40,
          conversion_factor: 1,
          sku: 'JEANS456',
          barcode: null,
          unit: {id: 1, name: 'Piece'} as UnitDto,
        } as ProductUnitDto,
      ],
      product_variants: [
        {
          id: 1,
          product_id: 2,
          unit_id: 1,
          variant_value_id: 1,
          stock: 20,
          price: 42,
          sku: 'JEANS456-BLUE',
          barcode: null,
          variant_value: {id: 1, variant_type_id: 1, value: 'Blue'} as VariantValueDto,
          unit: {id: 1, name: 'Piece'} as UnitDto,
        } as ProductVariantDto,
      ],
    } as ProductDto,
    quantity: 1,
    unit: {
      id: 1,
      unit_id: 1,
      price: 40,
      sku: 'JEANS456',
      conversion_factor: 1,
      stock: 30,
      barcode: null,
      unit: {id: 1, name: 'Piece'} as UnitDto,
    } as ProductUnitDto,
    variant: {
      id: 1,
      product_id: 2,
      unit_id: 1,
      variant_value_id: 1,
      stock: 20,
      price: 42,
      sku: 'JEANS456-BLUE',
      barcode: null,
      variant_value: {id: 1, variant_type_id: 1, value: 'Blue'} as VariantValueDto,
      unit: {id: 1, name: 'Piece'} as UnitDto,
    } as ProductVariantDto,
  },
];

const orderInfo = {
  order_type_id: 1, // For example, 1 = "Dine-in"
  discount_id: 1,
  down_payment: 10,
};

const createOrderDTO = mapCartToCreateOrderDTO(mockCartItems, orderInfo);
console.log(createOrderDTO);
