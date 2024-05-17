import { inject, Injectable } from '@angular/core';
import { ArrayStore, Store } from '../store';
import { Order } from '../models/order.model';
import { ProductStore } from './product.store';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class OrderStore extends Store<Order, ArrayStore> {
  private productStore: ProductStore;
  private toastrService: ToastrService = inject(ToastrService);

  constructor() {
    super({ operation: null, value: null, values: [] });
    this.productStore = inject(ProductStore);
  }

  addOrder(order: Order) {
    order.id = this.state.length + 1;
    order.baskets.forEach((basket: any) => {
      this.productStore.incrementQuantitySold(basket.product!, basket.quantity);
    });
    this.patchState({
      operation: OrderOperation.ADDED,
      value: order,
      values: [...this.state, order],
    });
    this.toastrService.success('Order added successfully');
  }

  getOrders() {
    return this.state;
  }
}

export enum OrderOperation {
  ADDED = 'added',
  CANCELED = 'canceled',
}
