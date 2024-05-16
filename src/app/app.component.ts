import { Component, inject, OnInit } from '@angular/core';
import { ProductStore } from './stores/product.store';
import { BasketStore } from './stores/basket.store';
import { OrderStore } from './stores/order.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly productStore: InstanceType<typeof ProductStore>;
  private readonly orderStore: InstanceType<typeof OrderStore>;
  private readonly basketStore: InstanceType<typeof BasketStore>;

  constructor() {
    this.productStore = inject(ProductStore);
    this.orderStore = inject(OrderStore);
    this.basketStore = inject(BasketStore);

    this.basketStore.onChanged$.subscribe((data) => {
      console.log('Basket Store Event', data);
    });

    this.orderStore.onChanged$.subscribe((data) => {
      console.log('Order Store Event', data);
    });

    this.productStore.onChanged$.subscribe((data) => {
      console.log('Product Store Event', data);
    });
  }
  async ngOnInit() {}
}
