import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Category } from './models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http: HttpClient = inject(HttpClient);
  constructor() {}

  getCategories(): Observable<any> {
    return this.http.get<Category[]>(environment.apiUrl + 'categories', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  }
}
