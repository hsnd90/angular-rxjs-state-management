import { Component, inject, OnDestroy } from '@angular/core';
import { Basket } from '../models/basket.model';
import { OrderStore } from '../stores/order.store';
import { BasketStore } from '../stores/basket.store';
import { ProductStore } from '../stores/product.store';

@Component({
  selector: 'app-basket-detail',
  templateUrl: './basket-detail.component.html',
  styleUrls: ['./basket-detail.component.scss'],
})
export class BasketDetailComponent implements OnDestroy {
  baskets: Basket[] = [];
  productStore: ProductStore;

  constructor(
    private basketStore: BasketStore,
    private orderStore: OrderStore
  ) {
    this.getBaskets();
    this.productStore = inject(ProductStore);
  }

  getBaskets() {
    this.baskets = this.basketStore.getBaskets();
  }

  onOrder() {
    this.orderStore.addOrder({
      address: 'İstanbul',
      totalPrice: this.getTotalPrice(),
      baskets: this.baskets,
    });
    this.basketStore.clearBasket();
    this.getBaskets()
  }

  addBasket(basket: Basket) {
    this.basketStore.addBasket(basket);
    this.getBaskets();
  }

  removeBasket(basket: Basket) {
    this.basketStore.removeBasket(basket);
    this.getBaskets();
  }

  getTotalPrice() {
    return this.baskets.reduce(
      (acc, basket) => acc + basket.product!.price * basket.quantity,
      0
    );
  }

  ngOnDestroy(): void {}
}
