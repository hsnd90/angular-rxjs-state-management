import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Category } from '../models/category.model';
import { CategoryService } from '../category.service';
import { inject } from '@angular/core';

type CategoryState = {
  categories: Category[];
};

const initialState: CategoryState = {
  categories: [],
};

export const CategoriesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, categoryService = inject(CategoryService)) => ({
    loadCategories() {
      patchState(store, { categories: categoryService.getCategories() });
    },
  }))
);