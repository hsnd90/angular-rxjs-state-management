import { inject } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { ArrayStore, Store } from '../store';

export class ProductStore extends Store<Product, ArrayStore> {
  private productService: ProductService;

  constructor() {
    super({ operation: null, value: null, values: [] });
    this.productService = inject(ProductService);
  }

  loadProducts() {
    let products = this.productService.getProducts();
    this.setState({
      operation: ProductOperation.LOADED,
      value: products,
      values: products,
    });
  }

  addProduct(product: Product) {
    this.setState({
      operation: ProductOperation.ADDED,
      value: product,
      values: [...this.getState(), product],
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
}

enum ProductOperation {
  LOADED = 'loaded',
  ADDED = 'added',
  INCREMENT_QUANTITY = 'increment_quantity',
  DECREMENT_QUANTITY = 'decrement_quantity',
  REMOVED = 'removed',
  CLEARED = 'cleared',
}
