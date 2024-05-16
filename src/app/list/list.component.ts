import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductStore } from '../stores/product.store';
import { BasketStore } from '../stores/basket.store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  productStore: InstanceType<typeof ProductStore> = inject(ProductStore);
  basketStore: InstanceType<typeof BasketStore> = inject(BasketStore);

  constructor() {}
  async ngOnInit() {
    await this.productStore.loadProducts();
    this.products = this.productStore.getState();
    this.productStore.onChanged$.subscribe((data: any) => {
      this.productCount = this.productStore.count()
    });
  }

  productCount: number = 0;

  addProductToBasket(product: Product) {
    this.basketStore.addBasket({
      productid: product.id!,
      quantity: 1,
      product: product,
    });
  }
}
