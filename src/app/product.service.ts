import { Injectable } from '@angular/core';
import { products } from './products';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getProducts() {
    return of(products).pipe(delay(150));
  }
}
