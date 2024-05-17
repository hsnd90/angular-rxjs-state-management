import { Injectable } from '@angular/core';
import { ObjectStore, Store } from '../store';

@Injectable({
  providedIn: 'root',
})
export class ParameterStore extends Store<Parameter, ObjectStore> {
  constructor() {
    super({
      operation: null,
      value: undefined,
    });
    this.load({
      favoriteProductCount: 7,
      rowsPerPage: 10,
    });
  }
}

export interface Parameter {
  favoriteProductCount: number;
  rowsPerPage: number;
}
