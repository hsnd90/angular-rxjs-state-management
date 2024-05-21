import { Injectable } from '@angular/core';
import { Store } from '../store';

@Injectable({
  providedIn: 'root',
})
export class ParameterStore extends Store<Parameter> {
  constructor() {
    super({ operation: null, value: {} });

    this.load({
      favoriteProductCount: 9,
      rowsPerPage: 10,
    });
  }
}

export interface Parameter {
  favoriteProductCount?: number;
  rowsPerPage?: number;
}
