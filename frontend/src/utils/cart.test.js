import { describe, expect, it } from 'vitest';
import {
  addProductToCart, calculateCartItemCount,
  calculateCartTotal, updateCartQuantity
} from './cart.js';

describe('cart utilities', () => {
  it('calculates the cart total', () => {
    expect(calculateCartTotal([
      { price: 100, quantity: 2 },
      { price: 50, quantity: 3 }
    ])).toBe(350);
  });

  it('adds a new product', () => {
    const result = addProductToCart([], { id: 1, name: 'Mouse', price: 500, stock: 2 });
    expect(result.error).toBe('');
    expect(result.cart[0].quantity).toBe(1);
  });

  it('prevents a quantity above stock', () => {
    const cart = [{ productId: 1, name: 'Mouse', price: 500, stock: 1, quantity: 1 }];
    expect(updateCartQuantity(cart, 1, 2).error).toContain('Only 1');
  });

  it('counts all cart units and handles an empty cart', () => {
    expect(calculateCartItemCount([{ quantity: 2 }, { quantity: 3 }])).toBe(5);
    expect(calculateCartItemCount([])).toBe(0);
  });

  it('increases only the selected item by one', () => {
    const cart = [
      { productId: 1, name: 'Mouse', price: 500, stock: 5, quantity: 1 },
      { productId: 2, name: 'Lamp', price: 900, stock: 5, quantity: 3 }
    ];
    const result = updateCartQuantity(cart, 1, 2);
    expect(result.error).toBe('');
    expect(result.cart[0].quantity).toBe(2);
    expect(result.cart[1].quantity).toBe(3);
  });

  it('decreases a quantity of 2 to 1', () => {
    const cart = [{ productId: 1, name: 'Mouse', price: 500, stock: 5, quantity: 2 }];
    const result = updateCartQuantity(cart, 1, 1);
    expect(result.error).toBe('');
    expect(result.cart[0].quantity).toBe(1);
  });

  it('rejects a quantity of 0 and leaves the cart unchanged', () => {
    const cart = [{ productId: 1, name: 'Mouse', price: 500, stock: 5, quantity: 2 }];
    const result = updateCartQuantity(cart, 1, 0);
    expect(result.error).not.toBe('');
    expect(result.cart).toBe(cart);
    expect(result.cart[0].quantity).toBe(2);
  });

  it('allows a quantity equal to stock and rejects one above stock', () => {
    const cart = [{ productId: 1, name: 'Mouse', price: 500, stock: 2, quantity: 1 }];
    const atStock = updateCartQuantity(cart, 1, cart[0].stock);
    expect(atStock.error).toBe('');
    expect(atStock.cart[0].quantity).toBe(2);

    const overStock = updateCartQuantity(cart, 1, cart[0].stock + 1);
    expect(overStock.error).toContain('Only');
    expect(overStock.cart).toBe(cart);
    expect(overStock.cart[0].quantity).toBe(1);
  });
});
