import { describe, expect, it } from 'vitest';
import { sortProducts } from './products.js';

const catalog = [
  { id: 1, name: 'Laptop Stand', price: 1200 },
  { id: 2, name: 'USB-C Study Lamp', price: 900 },
  { id: 3, name: 'Compact Mechanical Keyboard', price: 1850 }
];

describe('sortProducts', () => {
  it('sorts by price from low to high', () => {
    expect(sortProducts(catalog, 'price-asc').map((product) => product.price)).toEqual([900, 1200, 1850]);
  });

  it('sorts by price from high to low', () => {
    expect(sortProducts(catalog, 'price-desc').map((product) => product.price)).toEqual([1850, 1200, 900]);
  });

  it('sorts by name from A to Z', () => {
    expect(sortProducts(catalog, 'name-asc').map((product) => product.name)).toEqual([
      'Compact Mechanical Keyboard',
      'Laptop Stand',
      'USB-C Study Lamp'
    ]);
  });

  it('keeps the original order for the default sort', () => {
    expect(sortProducts(catalog, 'default').map((product) => product.id)).toEqual([1, 2, 3]);
    expect(sortProducts(catalog, 'unknown').map((product) => product.id)).toEqual([1, 2, 3]);
  });

  it('does not mutate the original array', () => {
    const original = [
      { id: 1, name: 'Laptop Stand', price: 1200 },
      { id: 2, name: 'USB-C Study Lamp', price: 900 }
    ];
    const snapshot = [...original];

    sortProducts(original, 'price-asc');

    expect(original).toEqual(snapshot);
    expect(original.map((product) => product.id)).toEqual([1, 2]);
  });

  it('sorts numeric-string prices numerically', () => {
    const pricedAsStrings = [
      { id: 1, name: 'Laptop Stand', price: '1200.00' },
      { id: 2, name: 'USB-C Study Lamp', price: '900.00' }
    ];

    expect(sortProducts(pricedAsStrings, 'price-asc').map((product) => product.price)).toEqual([
      '900.00',
      '1200.00'
    ]);
  });
});
