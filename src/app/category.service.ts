import { Injectable } from '@angular/core';
import { categories, subcategories } from './category';
import { delay, forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  getCategories(): Observable<any> {
    return forkJoin([
      of(categories).pipe(delay(150)),
      of(subcategories).pipe(delay(150)),
    ]);
  }
}
