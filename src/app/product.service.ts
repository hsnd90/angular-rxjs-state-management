import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http: HttpClient = inject(HttpClient);
  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiUrl + 'products', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(environment.apiUrl + 'products', product, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  }

  deleteProduct(id: any): Observable<Product> {
    return this.http.delete<Product>(environment.apiUrl + 'products/' + id, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(
      environment.apiUrl + 'products/' + product._id,
      product,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
