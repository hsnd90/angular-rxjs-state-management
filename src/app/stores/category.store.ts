import { Categories, Category } from '../models/category.model';
import { CategoryService } from '../category.service';
import { inject } from '@angular/core';
import { ObjectStore, Store } from '../store';
import { ToastrService } from 'ngx-toastr';

export class CategoryStore extends Store<Categories, ObjectStore> {
  private categoryService: InstanceType<typeof CategoryService> =
    inject(CategoryService);
  private toastrService: ToastrService = inject(ToastrService);

  constructor() {
    super({ operation: null, value: null });
    this.loadCategories();
  }

  async loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.load({ categories: categories });
    });
  }

  addCategory(category: Category) {
    let currentCategories = this.state;
    currentCategories.categories.push(category);

    this.patchState({
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
