import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductStore } from '../stores/product.store';
import { BasketStore } from '../stores/basket.store';
import { CategoriesStore } from '../stores/category.store';
import { Category } from '../models/category.model';
import { Subscription } from 'rxjs';
import { Parameter, ParameterStore } from '../stores/parameter.store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnDestroy {
  parameters: Parameter;
  products: Product[] = [];
  pageSize: number = 0;
  pagesNumberArray: number[] = [];
  categories: Category[] = [];
  rowsPerPage: number;
  productCount: number = 0;
  activePage: number = 1;
  readonly productStore: InstanceType<typeof ProductStore> =
    inject(ProductStore);
  readonly basketStore: InstanceType<typeof BasketStore> = inject(BasketStore);
  readonly categoryStore: InstanceType<typeof CategoriesStore> =
    inject(CategoriesStore);
  readonly parameterStore: InstanceType<typeof ParameterStore> =
    inject(ParameterStore);
  productStoreChangedSubscription$: Subscription;

  constructor() {
    this.productStoreChangedSubscription$ = this.productStore
      .onChanged$()
      .subscribe((data: any) => {
        console.log(data);
        this.productCount = this.productStore.count;
        console.log(this.productCount + ' adet ürün listelendi.');
      });
    this.parameters = this.parameterStore.state;
    this.rowsPerPage = this.parameters.rowsPerPage;
  }

  async ngOnInit() {
    await this.productStore.loadProducts();
    await this.categoryStore.loadCategories();
    this.categories = this.categoryStore.categories();

    this.getProducts(1);

    this.productCount = this.productStore.count;
    this.pageSize = Math.ceil(this.productCount / this.rowsPerPage);
    this.pagesNumberArray = Array.from(
      { length: this.pageSize },
      (_, i) => i + 1
    );
  }

  getProducts(pageNumber: number = 1) {
    this.products = this.productStore.getByPageNumber(pageNumber);
    this.products = this.products.map((product: Product) => {
      product.category = this.categories.find(
        (category) => category.id === product.categoryId
      );
      return product;
    });
  }

  addProductToBasket(product: Product) {
    this.basketStore.addBasket({
      productid: product.id!,
      quantity: 1,
      product: product,
    });
  }

  onPrevious() {
    this.activePage--;
    this.getProducts(this.activePage);
  }

  onForward() {
    this.activePage++;
    this.getProducts(this.activePage);
  }

  onPage(pageNumber: number) {
    this.activePage = pageNumber;
    this.getProducts(pageNumber);
  }

  ngOnDestroy(): void {
    this.productStoreChangedSubscription$.unsubscribe();
  }
}
