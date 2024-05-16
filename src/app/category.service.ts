import { Injectable } from '@angular/core';
import { categories } from './category';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  async getCategories() {
    return of(categories).pipe(delay(450));
  }
}
