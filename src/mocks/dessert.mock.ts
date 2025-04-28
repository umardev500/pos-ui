// @app/mocks/dessertProducts.ts

import {product1, product2, product3, product4} from '@app/assets/images'; // import images for mock data
import {Product} from '@app/types';

export const dessertProducts: Product[] = [
  {
    id: 1,
    name: 'Chocolate Cake',
    description: 'Rich and moist chocolate cake with a creamy frosting',
    photo: product1,
    quantity: 50,
    capital: 1000,
    price: 2500,
    discount: 10,
    barcode: '111223344',
    variants: [
      {size: 'Small', price: 12.99, stock: 20},
      {size: 'Large', price: 18.99, stock: 30},
    ],
  },
  {
    id: 2,
    name: 'Vanilla Ice Cream',
    description: 'Creamy vanilla ice cream with natural vanilla beans',
    photo: product2,
    quantity: 100,
    capital: 500,
    price: 1500,
    discount: 5,
    barcode: '223344556',
    variants: [
      {size: 'Small', price: 5.99, stock: 50},
      {size: 'Large', price: 9.99, stock: 50},
    ],
  },
  {
    id: 3,
    name: 'Strawberry Cheesecake',
    description: 'Smooth cheesecake topped with fresh strawberries',
    photo: product3,
    quantity: 30,
    capital: 2000,
    price: 4000,
    discount: 15,
    barcode: '334455667',
    variants: [
      {size: 'Medium', price: 15.99, stock: 15},
      {size: 'Large', price: 20.99, stock: 15},
    ],
  },
  {
    id: 4,
    name: 'Lemon Meringue Pie',
    description: 'Tart lemon filling with a fluffy meringue topping',
    photo: product4,
    quantity: 20,
    capital: 1500,
    price: 3000,
    discount: 8,
    barcode: '445566778',
    variants: [
      {size: 'Small', price: 8.99, stock: 10},
      {size: 'Large', price: 14.99, stock: 10},
    ],
  },
];
