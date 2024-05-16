import { inject } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { ArrayStore, Store } from '../store';
import { lastValueFrom } from 'rxjs';
import { ParameterStore } from './parameter.store';

export class ProductStore extends Store<Product, ArrayStore> {
  private productService: ProductService;
  private parameterStore: InstanceType<typeof ParameterStore>;

  constructor() {
    super({ operation: null, value: null, values: [] });
    this.productService = inject(ProductService);
    this.parameterStore = inject(ParameterStore);
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
    let currentState = this.state;
    this.patchState({
      operation: ProductOperation.ADDED,
      value: product,
      values: [...currentState, { id: currentState.length + 1, ...product }],
    });
  }

  incrementQuantitySold(product: Product, quantity: number) {
    let store = this.state;
    const index = store.findIndex((p) => p.id === product.id);
    store[index].quantitySold = store[index].quantitySold + quantity;
    this.patchState({
      operation: ProductOperation.INCREMENT_QUANTITY_SOLD,
      value: store[index],
      values: store,
    });
  }

  favoriteProducts() {
    let favoriteCount = this.parameterStore.state.favoriteProductCount;
    let topProducts = [...this.state];
    return topProducts
      .sort((a, b) => b.quantitySold - a.quantitySold)
      .filter((product, index) => index < favoriteCount);
  }
}

export enum ProductOperation {
  LOADED = 'loaded',
  ADDED = 'added',
  INCREMENT_QUANTITY = 'increment_quantity',
  INCREMENT_QUANTITY_SOLD = 'increment_quantity_sold',
  DECREMENT_QUANTITY = 'decrement_quantity',
  REMOVED = 'removed',
  CLEARED = 'cleared',
}
