import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductStore } from '../stores/product.store';
import { BasketStore } from '../stores/basket.store';
import { CategoriesStore } from '../stores/category.store';
import { Category } from '../models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  readonly productStore: InstanceType<typeof ProductStore> =
    inject(ProductStore);
  readonly basketStore: InstanceType<typeof BasketStore> = inject(BasketStore);
  readonly categoryStore: InstanceType<typeof CategoriesStore> =
    inject(CategoriesStore);
  productStoreChangedSubscription$: Subscription;

  constructor() {
    this.productStoreChangedSubscription$ = this.productStore
      .onChanged$()
      .subscribe((data: any) => {
        console.log(data)
        this.productCount = this.productStore.count;
        console.log(this.productCount + ' adet ürün listelendi.');
      });
  }

  async ngOnInit() {
    await this.productStore.loadProducts();
    await this.categoryStore.loadCategories();
    this.categories = this.categoryStore.categories();

    this.products = this.productStore.state;

    this.products = this.products.map((product: Product) => {
      product.category = this.categories.find(
        (category) => category.id === product.categoryId
      );
      return product;
    });

    this.productCount = this.productStore.count;
  }

  productCount: number = 0;

  addProductToBasket(product: Product) {
    this.basketStore.addBasket({
      productid: product.id!,
      quantity: 1,
      product: product,
    });
  }

  ngOnDestroy(): void {
    this.productStoreChangedSubscription$.unsubscribe();
  }
}
