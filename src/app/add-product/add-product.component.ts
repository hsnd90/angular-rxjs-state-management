import { ProductStore } from './../stores/product.store';
import { Component, inject } from '@angular/core';
import { CategoriesStore } from '../stores/category.store';
import { Category } from '../models/category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  categoryStore: InstanceType<typeof CategoriesStore>;
  productStore: InstanceType<typeof ProductStore>;
  categories: Category[] = [];
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(null, [Validators.required]),
    categoryId: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  constructor(private router: Router) {
    this.categoryStore = inject(CategoriesStore);
    this.productStore = inject(ProductStore);
    this.categories = this.categoryStore.categories();
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productStore.addProduct({
        name: this.productForm.value.name!,
        price: this.productForm.value.price!,
        categoryId: this.productForm.value.categoryId!,
        quantitySold: 0,
      });
      this.productForm.reset();
      this.router.navigate(['/list']);
    } else {
      alert('Please fill in the form');
    }
  }
}
