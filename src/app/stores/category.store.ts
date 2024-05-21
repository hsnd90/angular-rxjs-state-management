import { Categories, Category } from '../models/category.model';
import { CategoryService } from '../category.service';
import { inject } from '@angular/core';
import { Store } from '../store';
import { ToastrService } from 'ngx-toastr';
import { ParameterStore } from './parameter.store';

export class CategoryStore extends Store<Categories> {
  private categoryService: InstanceType<typeof CategoryService> =
    inject(CategoryService);
  private toastrService: ToastrService = inject(ToastrService);
  private parameterStore: InstanceType<typeof ParameterStore>;

  constructor() {
    super({ operation: null, value: { categories: [] } });
    this.loadCategories();
    this.parameterStore = inject(ParameterStore);
  }

  async loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.load({ categories: categories });
    });
  }

  getByPageNumber(pageNumber: number) {
    let parameters = this.parameterStore.state;
    let rowsPerPage = parameters.rowsPerPage!;
    return this.state.categories.slice(
      (pageNumber - 1) * rowsPerPage,
      pageNumber * rowsPerPage
    );
  }

  addCategory(category: Category) {
    let currentCategories = this.state;
    currentCategories.categories.push(category);

    this.updateState({
      operation: CategoryOperation.ADDED,
      value: currentCategories,
    });
    this.toastrService.success('Category added successfully');
  }
}
export enum CategoryOperation {
  ADDED = 'ADDED',
  REMOVED = 'REMOVED',
  UPDATED = 'UPDATED',
}
