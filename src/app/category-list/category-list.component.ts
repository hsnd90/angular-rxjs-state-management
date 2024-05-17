import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryStore } from '../stores/category.store';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  categories: Category[] = [];
  readonly categoryStore: InstanceType<typeof CategoryStore> =
    inject(CategoryStore);

  constructor() {
    this.categoryStore.watch('categories').subscribe((data: any) => {
      this.categories = data;
    });
  }

  addCategory() {}

  editCategory(category: Category) {}

  onPrevious() {}

  onForward() {}

  onPage(pageNumber: number) {}
}
