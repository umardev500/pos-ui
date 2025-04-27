import {product1, product2, product3, product4} from '@app/assets/images';
import {Product} from '@app/types';

export const drinkProducts: Product[] = [
  {
    id: 201,
    name: 'Iced Coffee',
    description: 'Freshly brewed coffee served over ice',
    photo: product1,
    quantity: 100,
    capital: 2000,
    price: 8000,
    discount: 10,
    barcode: '555555555',
    variants: [
      {size: 'Small', type: 'Black', price: 3.99, stock: 60},
      {size: 'Medium', type: 'Latte', price: 5.99, stock: 30},
      {size: 'Large', type: 'Cappuccino', price: 6.99, stock: 10},
    ],
  },
  {
    id: 202,
    name: 'Fruit Juice',
    description: 'Natural fruit juice with no added sugar',
    photo: product2,
    quantity: 90,
    capital: 1800,
    price: 7000,
    discount: 5,
    barcode: '666666666',
    variants: [
      {flavor: 'Orange', size: 'Medium', price: 4.99, stock: 50},
      {flavor: 'Apple', size: 'Large', price: 6.99, stock: 40},
      {flavor: 'Mixed Berry', size: 'Small', price: 3.99, stock: 20},
    ],
  },
  {
    id: 203,
    name: 'Smoothie',
    description: 'Refreshing smoothie with tropical fruits',
    photo: product3,
    quantity: 120,
    capital: 2200,
    price: 6500,
    discount: 10,
    barcode: '777777777',
    variants: [
      {flavor: 'Mango', size: 'Small', price: 5.99, stock: 60},
      {flavor: 'Berry', size: 'Large', price: 7.99, stock: 45},
      {flavor: 'Pineapple', size: 'Medium', price: 6.99, stock: 15},
    ],
  },
  {
    id: 204,
    name: 'Lemonade',
    description: 'Classic lemonade made from fresh lemons',
    photo: product4,
    quantity: 110,
    capital: 1500,
    price: 4000,
    discount: 5,
    barcode: '888888888',
    variants: [
      {size: 'Small', sweetness: 'Mild', price: 2.99, stock: 50},
      {size: 'Medium', sweetness: 'Regular', price: 3.99, stock: 40},
      {size: 'Large', sweetness: 'Extra Sweet', price: 4.99, stock: 20},
    ],
  },
];
