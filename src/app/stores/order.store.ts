import { inject, Injectable } from '@angular/core';
import { ArrayStore, Store } from '../store';
import { Order } from '../models/order.model';
import { ProductStore } from './product.store';

@Injectable({
  providedIn: 'root',
})
export class OrderStore extends Store<Order, ArrayStore> {
  private productStore: ProductStore;

  constructor() {
    super({ operation: null, value: null, values: [] });
    this.productStore = inject(ProductStore);
  }

  addOrder(order: Order) {
    order.id = this.getState().length + 1;
    order.baskets.forEach((basket: any) => {
      this.productStore.incrementQuantitySold(basket.product!, basket.quantity);
    });
    this.setState({
      operation:OrderOperation.ADDED,
      value: order,
      values: [...this.getState(), order],
    });
  }

  getOrders() {
    return this.getState();
  }
}

enum OrderOperation {
  ADDED = 'added',
  INCREMENT_QUANTITY = 'increment_quantity',
  DECREMENT_QUANTITY = 'decrement_quantity',
  REMOVED = 'removed',
  CLEARED = 'cleared',
}
