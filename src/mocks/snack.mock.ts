import {product5, product6, product7} from '@app/assets/images';
import {Product} from '@app/types';

export const snackProducts: Product[] = [
  {
    id: 301,
    name: 'Popcorn',
    description: 'Freshly popped popcorn, lightly salted',
    photo: product5,
    quantity: 150,
    capital: 1000,
    price: 3000,
    discount: 0,
    barcode: '123123123',
    variants: [
      {size: 'Small', flavor: 'Salted', price: 2.99, stock: 80},
      {size: 'Medium', flavor: 'Butter', price: 3.99, stock: 50},
      {size: 'Large', flavor: 'Cheese', price: 4.99, stock: 20},
    ],
  },
  {
    id: 302,
    name: 'Chips',
    description: 'Crispy potato chips with a variety of flavors',
    photo: product6,
    quantity: 100,
    capital: 2000,
    price: 4000,
    discount: 5,
    barcode: '456456456',
    variants: [
      {flavor: 'Classic', size: 'Small', price: 1.99, stock: 50},
      {flavor: 'Barbecue', size: 'Medium', price: 2.99, stock: 40},
      {flavor: 'Sour Cream', size: 'Large', price: 3.99, stock: 10},
    ],
  },
  {
    id: 303,
    name: 'Chocolate Bar',
    description: 'Rich chocolate bar with smooth caramel filling',
    photo: product7,
    quantity: 80,
    capital: 1500,
    price: 5000,
    discount: 10,
    barcode: '789789789',
    variants: [
      {size: 'Small', type: 'Milk Chocolate', price: 1.99, stock: 40},
      {size: 'Medium', type: 'Dark Chocolate', price: 2.99, stock: 30},
    ],
  },
];
