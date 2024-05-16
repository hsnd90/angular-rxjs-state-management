import { Injectable } from '@angular/core';
import { ArrayStore, Store } from '../store';
import { Basket } from '../models/basket.model';

@Injectable({
  providedIn: 'root',
})
export class BasketStore extends Store<Basket, ArrayStore> {
  constructor() {
    super({ operation: null, value: null, values: [] });
  }

  addBasket(product: Basket) {
    let ifExistIndex = this.getState().findIndex(
      (item: any) => item.productid === product.productid
    );

    if (ifExistIndex > -1) {
      let product = this.getState()[ifExistIndex];
      product.quantity = product.quantity + 1;
      this.setState({
        operation: BasketOperation.INCREMENT_QUANTITY,
        value: product,
        values: [...this.getState()],
      });
    } else {
      this.setState({
        operation: BasketOperation.ADDED,
        value: product,
        values: [...this.getState(), product],
      });
    }
  }

  removeBasket(product: Basket) {
    let index = this.getState().indexOf(product);
    let removedProduct = { ...this.getState()[index] };
    let baskets = this.getState();
    if (baskets[index].quantity > 1) {
      baskets[index].quantity = this.getState()[index].quantity - 1;
      this.setState({
        operation: BasketOperation.DECREMENT_QUANTITY,
        value: removedProduct,
        values: [...baskets],
      });
    } else {
      baskets.splice(index, 1);
      this.setState({
        operation: BasketOperation.REMOVED,
        value: removedProduct,
        values: [...baskets],
      });
    }
  }

  clearBasket() {
    this.clearState();
  }

  getBaskets() {
    return this.getState();
  }
}

enum BasketOperation {
  ADDED = 'added',
  INCREMENT_QUANTITY = 'increment_quantity',
  DECREMENT_QUANTITY = 'decrement_quantity',
  REMOVED = 'removed',
  CLEARED = 'cleared',
}
