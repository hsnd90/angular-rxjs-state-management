import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductStore } from '../stores/product.store';
import { BasketStore } from '../stores/basket.store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  products: Product[] = [];
  productStore: InstanceType<typeof ProductStore> = inject(ProductStore);
  basketStore: any = inject(BasketStore);

  constructor() {
    this.products = this.productStore.getState();
  }

  productCount = this.productStore.getState().length;

  addProductToBasket(product: Product) {
    this.basketStore.addBasket({
      productid: product.id,
      quantity: 1,
      product: product,
    });
  }
}
