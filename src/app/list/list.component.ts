import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductStore } from '../stores/product.store';
import { BasketStore } from '../stores/basket.store';
import { CategoriesStore } from '../stores/category.store';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  readonly productStore: InstanceType<typeof ProductStore> =
    inject(ProductStore);
  readonly basketStore: InstanceType<typeof BasketStore> = inject(BasketStore);
  readonly categoryStore: InstanceType<typeof CategoriesStore> =
    inject(CategoriesStore);

  constructor() {}

  async ngOnInit() {
    await this.productStore.loadProducts();
    await this.categoryStore.loadCategories();
    this.categories = this.categoryStore.categories();

    this.products = this.productStore.getState();

    this.products = this.products.map((product: Product) => {
      product.category = this.categories.find(
        (category) => category.id === product.categoryId
      );
      return product;
    });

    this.productStore.onChanged$.subscribe((data: any) => {
      this.productCount = this.productStore.count();
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
