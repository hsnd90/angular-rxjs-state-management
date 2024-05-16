import { Component, inject, OnInit } from '@angular/core';
import { ProductStore } from './stores/product.store';
import { CategoriesStore } from './stores/category.store';
import { BasketStore } from './stores/basket.store';
import { OrderStore } from './stores/order.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  productStore: InstanceType<typeof ProductStore>;
  categoryStore: InstanceType<typeof CategoriesStore>;
  orderStore: InstanceType<typeof OrderStore>;
  basketStore: BasketStore;

  constructor() {
    this.productStore = inject(ProductStore);
    this.categoryStore = inject(CategoriesStore);
    this.orderStore = inject(OrderStore);

    this.basketStore = inject(BasketStore);

    this.basketStore.onChanged$.subscribe((data) => {
      console.log('Basket Store Event', data);
    });

    this.orderStore.onChanged$.subscribe((data) => {
      console.log('Order Store Event', data);
    });
  }
  async ngOnInit() {
    this.categoryStore.loadCategories();
  }
}
