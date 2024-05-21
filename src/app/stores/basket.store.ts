import { inject, Injectable } from '@angular/core';
import { Store } from '../store';
import { Basket } from '../models/basket.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class BasketStore extends Store<Basket[]> {
  readonly toastrService: InstanceType<typeof ToastrService> =
    inject(ToastrService);

  constructor() {
    super({ operation: null, value: [] });
  }

  addBasket(product: Basket) {
    let baskets = this.state;
    let ifExistIndex = baskets?.findIndex(
      (item: any) => item.productid === product.productid
    );

    if (ifExistIndex > -1) {
      let product = baskets[ifExistIndex];
      product.quantity = product.quantity + 1;
      this.updateState({
        operation: BasketOperation.INCREMENT_QUANTITY,
        obj: product,
        value: [...baskets],
      });
    } else {
      this.updateState({
        operation: BasketOperation.ADDED,
        obj: product,
        value: [...baskets, product],
      });
    }
    this.toastrService.success('Product added to basket');
  }

  removeBasket(product: Basket) {
    let baskets = this.state;
    let index = baskets.findIndex((p) => p.productid == product.productid);
    let removedProduct = structuredClone(baskets[index]);
    if (baskets[index].quantity > 1) {
      baskets[index].quantity = baskets[index].quantity - 1;
      this.updateState({
        operation: BasketOperation.DECREMENT_QUANTITY,
        obj: removedProduct,
        value: [...baskets],
      });
    } else {
      baskets.splice(index, 1);
      this.updateState({
        operation: BasketOperation.REMOVED,
        obj: removedProduct,
        value: [...baskets],
      });
    }
  }

  clearBasket() {
    this.clearState([]);
  }

  getBaskets() {
    return this.state;
  }
}

export enum BasketOperation {
  ADDED = 'added',
  INCREMENT_QUANTITY = 'increment_quantity',
  DECREMENT_QUANTITY = 'decrement_quantity',
  REMOVED = 'removed',
  CLEARED = 'cleared',
}
