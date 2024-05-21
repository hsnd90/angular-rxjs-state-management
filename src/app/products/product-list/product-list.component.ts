import { Component, inject, OnDestroy } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { ProductStore } from 'src/app/stores/product.store';
import { BasketStore } from 'src/app/stores/basket.store';
import { CategoryStore } from 'src/app/stores/category.store';
import { Parameter, ParameterStore } from 'src/app/stores/parameter.store';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnDestroy {
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

  constructor(private router: Router) {
    this.productCount = this.productStore.state.length;
    this.parameters = this.parameterStore.state;
    this.rowsPerPage = this.parameters.rowsPerPage!;
  }

  async ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    combineLatest({
      categories: this.categoryStore.watch(['categories']),
      products: this.productStore.state$,
      rowsPerPage: this.parameterStore.watch(['rowsPerPage']),
    }).subscribe(
      (data: { categories: any[]; products: any[]; rowsPerPage?: number }) => {
        if (!data) return;
        let productCount = this.productStore.state.length;
        let rowsPerPage = data.rowsPerPage;
        this.pageSize = Math.ceil(productCount / rowsPerPage!);
        this.products = this.productStore.getByPageNumber(this.activePage);
      }
    );
  }

  get pagesNumberAsArray() {
    const visiblePages: (number | string)[] = [];
    const maxVisiblePages = 5; // Kaç sayfa gösterilecek (1, 2, ..., 5, 6, 'ellipsis', 10)
    let startPage = 1;
    let endPage = this.pageSize;

    if (this.pageSize > maxVisiblePages) {
      startPage = Math.max(
        this.activePage - Math.floor(maxVisiblePages / 2),
        1
      );
      endPage = startPage + maxVisiblePages - 1;

      if (endPage > this.pageSize) {
        endPage = this.pageSize;
        startPage = endPage - maxVisiblePages + 1;
      }
    }

    if (startPage > 1) {
      visiblePages.push(1);
      if (startPage > 2) {
        visiblePages.push('ellipsis');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    if (endPage < this.pageSize) {
      if (endPage < this.pageSize - 1) {
        visiblePages.push('ellipsis');
      }
      visiblePages.push(this.pageSize);
    }

    return visiblePages;
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

  onPage(pageNumber: any) {
    this.activePage = pageNumber;
    this.getProducts();
  }

  onRowsPerPageChange() {
    this.activePage = 1;
    this.parameterStore.updateState({
      operation: 'rowsPerPage',
      value: {
        ...this.parameterStore.state,
        rowsPerPage: this.rowsPerPage,
      },
    });
  }

  editProduct(product: Product) {
    this.router.navigate(['/products/edit-product', product._id]);
  }

  removeProduct(id: any) {
    this.productStore.deleteProduct(id);
  }

  ngOnDestroy(): void {}
}
