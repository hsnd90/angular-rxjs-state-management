import { Component, inject, OnDestroy } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductStore } from '../stores/product.store';
import { BasketStore } from '../stores/basket.store';
import { Category } from '../models/category.model';
import { combineLatest, zip, map } from 'rxjs';
import { Parameter, ParameterStore } from '../stores/parameter.store';
import { CategoryStore } from '../stores/category.store';
import { categories } from '../category';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnDestroy {
  parameters: Parameter;
  products: Product[] = [];
  pageSize: number = 0;
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
    this.productCount = this.productStore.count;
    this.parameters = this.parameterStore.state;
    this.rowsPerPage = this.parameters.rowsPerPage;
  }

  async ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    combineLatest([
      this.categoryStore.watch(['categories']),
      this.productStore.state$,
      this.parameterStore.watch(['rowsPerPage']),
    ])
      .pipe(
        map((x: any) => {
          return {
            categories: x[0],
            products: x[1],
            rowsPerPage: x[2],
          };
        })
      )
      .subscribe(
        (
          data: {
            categories: any[];
            products: any[];
            rowsPerPage: number;
          } | null
        ) => {
          if (!data) return;
          let productCount = this.productStore.count;
          let rowsPerPage = data.rowsPerPage;
          this.pageSize = Math.ceil(productCount / rowsPerPage);
          this.products = this.productStore.getByPageNumber(this.activePage);
          this.products = this.products.map((product) => {
            product.category = this.mapCategory(product.categoryId);
            return product;
          });
        }
      );
  }

  get pagesNumberAsArray() {
    return Array.from({ length: this.pageSize }, (_, i) => i + 1);
  }

  mapCategory(categoryId: number) {
    return categories.find((category) => category.id === categoryId);
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
    this.getProducts();
  }

  onForward() {
    this.activePage++;
    this.getProducts();
  }

  onPage(pageNumber: number) {
    this.activePage = pageNumber;
    this.getProducts();
  }

  onRowsPerPageChange() {
    this.activePage = 1;
    this.parameterStore.patchState({
      operation: 'rowsPerPage',
      value: {
        ...this.parameterStore.state,
        rowsPerPage: this.rowsPerPage,
      },
    });
  }

  ngOnDestroy(): void {}
}
