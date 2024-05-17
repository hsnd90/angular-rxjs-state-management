import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductStore } from '../stores/product.store';
import { BasketStore } from '../stores/basket.store';
import { Category } from '../models/category.model';
import { combineLatest, forkJoin } from 'rxjs';
import { Parameter, ParameterStore } from '../stores/parameter.store';
import { CategoryStore } from '../stores/category.store';

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
  readonly categoryStore: InstanceType<typeof CategoryStore> =
    inject(CategoryStore);
  readonly parameterStore: InstanceType<typeof ParameterStore> =
    inject(ParameterStore);

  constructor() {
    this.productStore.watch(['name']).subscribe((data: any) => {});
    this.productCount = this.productStore.count;
    this.parameters = this.parameterStore.state;
    this.rowsPerPage = this.parameters.rowsPerPage;
  }

  async ngOnInit() {
    this.getProducts(1);
  }

  getProducts(pageNumber: number = 1) {
    combineLatest([
      this.categoryStore.watch(['categories']),
      this.productStore.state$,
    ]).subscribe((data: any[]) => {
      let categories = data[0] ? data[0] : [];
      this.productCount = this.productStore.count;
      this.pageSize = Math.ceil(this.productCount / this.rowsPerPage);
      this.pagesNumberArray = Array.from(
        { length: this.pageSize },
        (_, i) => i + 1
      );
      this.products = this.productStore.getByPageNumber(pageNumber);
      if (categories.length > 0)
        this.products = this.products.map((product) => {
          product.category = categories.find(
            (category: any) => category.id === product.categoryId
          );
          return product;
        });
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

  ngOnDestroy(): void {}
}
