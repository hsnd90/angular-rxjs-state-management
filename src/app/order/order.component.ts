import { Component, inject, OnDestroy } from '@angular/core';
import { Order } from '../models/order.model';
import { OrderStore } from '../stores/order.store';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnDestroy {
  orders: Order[] = [];
  orderStore: InstanceType<typeof OrderStore> = inject(OrderStore);

  constructor() {
    this.orders = this.orderStore.getOrders();
  }

  getTotalPrice(order: Order) {
    return order.baskets.reduce(
      (acc, basket) => acc + basket.product!.price * basket.quantity,
      0
    );
  }

  ngOnDestroy(): void {}
}
