import { Injectable } from '@angular/core';
import { products } from './products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getProducts() {
    return products;
  }
}
