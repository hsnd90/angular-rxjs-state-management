import { Component, inject, OnInit } from '@angular/core';
import { ProductStore } from './stores/product.store';
import { CategoriesStore } from './stores/category.store';
import { BasketStore } from './stores/basket.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  productStore: InstanceType<typeof ProductStore>;
  categoryStore: InstanceType<typeof CategoriesStore>;
  basketStore: BasketStore;

  constructor() {
    this.productStore = inject(ProductStore);
    this.categoryStore = inject(CategoriesStore);

    this.basketStore = inject(BasketStore);

    this.basketStore.onChanged$.subscribe((data: any) => {
      console.log('Basket Store Event', data);
    });
  }
  async ngOnInit() {
    this.categoryStore.loadCategories();
  }
}
