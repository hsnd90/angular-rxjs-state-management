import { Injectable } from '@angular/core';
import { ObjectStore, Store } from '../store';

@Injectable({
  providedIn: 'root',
})
export class ParameterStore extends Store<Parameter, ObjectStore> {
  constructor() {
    super({
      operation: null,
      value: {
        favoriteProductCount: 8,
      },
    });
    console.log('ParameterStore created');
  }
}

interface Parameter {
  favoriteProductCount: number;
}
