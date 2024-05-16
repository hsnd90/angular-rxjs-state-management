import { inject } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { ArrayStore, Store } from '../store';
import { lastValueFrom } from 'rxjs';

export class ProductStore extends Store<Product, ArrayStore> {
  private productService: ProductService;

  constructor() {
    super({ operation: null, value: null, values: [] });
    this.productService = inject(ProductService);
  }

  async loadProducts() {
    let products = await lastValueFrom(this.productService.getProducts());
    this.load({
      operation: ProductOperation.LOADED,
      value: products,
      values: products,
    });
  }

  addProduct(product: Product) {
    let currentState = this.getState();
    this.setState({
      operation: ProductOperation.ADDED,
      value: product,
      values: [...currentState, { id: currentState.length + 1, ...product }],
    });
  }

  incrementQuantitySold(product: Product, quantity: number) {
    let store = this.getState();
    const index = store.findIndex((p) => p.id === product.id);
    store[index].quantitySold = store[index].quantitySold + quantity;
    this.setState({
      operation: ProductOperation.INCREMENT_QUANTITY,
      value: store[index],
      values: store,
    });
  }

  favoriteProducts() {
    let topProducts = [...this.getState()];
    return topProducts
      .sort((a, b) => b.quantitySold - a.quantitySold)
      .filter((product, index) => index < 10);
  }

  count() {
    return this.getState().length;
  }
}

export enum ProductOperation {
  LOADED = 'loaded',
  ADDED = 'added',
  INCREMENT_QUANTITY = 'increment_quantity',
  DECREMENT_QUANTITY = 'decrement_quantity',
  REMOVED = 'removed',
  CLEARED = 'cleared',
}
