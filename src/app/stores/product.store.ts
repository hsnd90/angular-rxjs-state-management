import { inject, Injectable } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { Store } from '../store';
import { ParameterStore } from './parameter.store';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ProductStore extends Store<Product[]> {
  private productService: ProductService;
  private parameterStore: InstanceType<typeof ParameterStore>;
  private toastrService: InstanceType<typeof ToastrService> =
    inject(ToastrService);

  constructor() {
    super({ operation: null, value: [] });
    this.productService = inject(ProductService);
    this.parameterStore = inject(ParameterStore);
    this.loadProducts();
  }

  async loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.load(products);
    });
  }

  getAll() {
    return this.state;
  }

  getByPageNumber(pageNumber: number) {
    let parameters = this.parameterStore.state;
    let rowsPerPage = parameters.rowsPerPage!;
    return this.state.slice(
      (pageNumber - 1) * rowsPerPage,
      pageNumber * rowsPerPage
    );
  }

  addProduct(product: Product) {
    let currentState = this.state;
    this.productService.addProduct(product).subscribe((product) => {
      this.updateState({
        operation: ProductOperation.ADDED,
        obj: product,
        value: [...currentState, { id: currentState.length + 1, ...product }],
      });
      this.toastrService.success('Product added successfully');
    });
  }

  incrementQuantitySold(product: Product, quantity: number) {
    let store = this.state;
    const index = store.findIndex((p) => p.id === product.id);
    store[index].QuantitySold = store[index].QuantitySold ?? 0 + quantity;
    this.updateState({
      operation: ProductOperation.INCREMENT_QUANTITY_SOLD,
      obj: store[index],
      value: store,
    });
  }

  favoriteProducts() {
    let parameters = this.parameterStore.state;
    let favoriteCount = parameters.favoriteProductCount!;
    let topProducts = [...this.state];
    return topProducts
      .sort((a, b) => b.QuantitySold ?? 0 - a.QuantitySold!)
      .filter((product, index) => index < favoriteCount);
  }

  deleteProduct(id: string) {
    let currentState = this.state;
    this.productService.deleteProduct(id).subscribe((product) => {
      this.updateState({
        operation: ProductOperation.REMOVED,
        obj: product,
        value: currentState.filter((p) => p._id !== id),
      });
      this.toastrService.warning('Product deleted successfully');
    });
  }

  editProduct(product: Product) {
    let store = this.state;
    const index = store.findIndex((p) => p.id === product.id);
    this.productService.updateProduct(product).subscribe((product) => {
      store[index] = product;
      this.updateState({
        operation: ProductOperation.UPDATED,
        obj: product,
        value: store,
      });
      this.toastrService.success('Product updated successfully');
    });
  }

  getProduct(id: string) {
    return this.state.find((product) => product._id === id);
  }
}

export enum ProductOperation {
  LOADED = 'loaded',
  ADDED = 'added',
  UPDATED = 'updated',
  INCREMENT_QUANTITY = 'increment_quantity',
  INCREMENT_QUANTITY_SOLD = 'increment_quantity_sold',
  DECREMENT_QUANTITY = 'decrement_quantity',
  REMOVED = 'removed',
  CLEARED = 'cleared',
}
