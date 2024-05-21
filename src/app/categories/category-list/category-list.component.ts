import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryStore } from 'src/app/stores/category.store';
import { ParameterStore } from 'src/app/stores/parameter.store';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  readonly categoryStore: InstanceType<typeof CategoryStore> =
    inject(CategoryStore);
  readonly parameterStore: InstanceType<typeof ParameterStore> =
    inject(ParameterStore);
  readonly router = inject(Router);
  activePage: number = 1;
  pageSize: number = 0;
  rowsPerPage: number;
  parameters: any;

  constructor() {
    this.parameters = this.parameterStore.state;
    this.rowsPerPage = this.parameters.rowsPerPage!;
  }
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    combineLatest({
      categories: this.categoryStore.watch('categories'),
    }).subscribe((data: { categories: any[] }) => {
      if (!data) return;
      let categoryCount = this.categoryStore.state.categories.length;
      let rowsPerPage = this.parameterStore.state.rowsPerPage;
      this.categories = data.categories;
      this.pageSize = Math.ceil(categoryCount / rowsPerPage!);
      this.categories = this.categoryStore.getByPageNumber(this.activePage);
    });
  }

  editCategory(category: Category) {
    this.router.navigateByUrl(`/categories/edit-category/${category._id}`);
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

  onPrevious() {
    this.activePage--;
    this.getCategories();
  }

  onForward() {
    this.activePage++;
    this.getCategories();
  }

  onPage(pageNumber: any) {
    this.activePage = pageNumber;
    this.getCategories();
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
}
