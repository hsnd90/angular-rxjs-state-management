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
      favoriteProductCount: 8,
      rowsPerPage: 10,
    });
    console.log('ParameterStore created');
  }
}

export interface Parameter {
  favoriteProductCount: number;
  rowsPerPage: number;
}
