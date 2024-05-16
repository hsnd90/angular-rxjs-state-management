import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductOperation, ProductStore } from './stores/product.store';
import { BasketOperation, BasketStore } from './stores/basket.store';
import { OrderOperation, OrderStore } from './stores/order.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private readonly productStore: InstanceType<typeof ProductStore>;
  private readonly orderStore: InstanceType<typeof OrderStore>;
  private readonly basketStore: InstanceType<typeof BasketStore>;
  productStoreChangedSubscription$: Subscription;
  orderStoreChangedSubscription$: Subscription;
  basketStoreDecrementChangedSubscription$: Subscription;
  basketStoreIncrementChangedSubscription$: Subscription;

  constructor() {
    this.productStore = inject(ProductStore);
    this.orderStore = inject(OrderStore);
    this.basketStore = inject(BasketStore);

    this.basketStoreDecrementChangedSubscription$ = this.basketStore
      .onChanged$(BasketOperation.DECREMENT_QUANTITY)
      .subscribe((data) => {
        console.log('Sepetten ürün silindi', data);
      });

    this.basketStoreIncrementChangedSubscription$ = this.basketStore
      .onChanged$([BasketOperation.INCREMENT_QUANTITY, BasketOperation.ADDED])
      .subscribe((data) => {
        console.log('Sepete ürün eklendi.', data);
      });

    this.orderStoreChangedSubscription$ = this.orderStore
      .onChanged$(OrderOperation.ADDED)
      .subscribe((data) => {
        console.log('Sipariş oluşturuldu.', data);
      });

    this.productStoreChangedSubscription$ = this.productStore
      .onChanged$(ProductOperation.ADDED)
      .subscribe((data) => {
        console.log('Yeni ürün eklendi.', data);
      });
  }
  ngOnDestroy(): void {
    this.basketStoreIncrementChangedSubscription$.unsubscribe();
    this.basketStoreDecrementChangedSubscription$.unsubscribe();
    this.orderStoreChangedSubscription$.unsubscribe();
    this.productStoreChangedSubscription$.unsubscribe();
  }
}
