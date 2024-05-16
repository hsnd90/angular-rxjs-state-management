import { Injectable } from '@angular/core';
import { categories } from './category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  getCategories() {
    return categories;
  }
}
