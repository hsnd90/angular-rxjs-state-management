import { ProductStore } from './../stores/product.store';
import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryStore } from '../stores/category.store';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  categoryStore: InstanceType<typeof CategoryStore> = inject(CategoryStore);
  productStore: InstanceType<typeof ProductStore> = inject(ProductStore);
  toastrService: InstanceType<typeof ToastrService> = inject(ToastrService);
  categories: Category[] = [];
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(null, [Validators.required]),
    categoryId: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  constructor(private router: Router) {}

  async ngOnInit() {
    this.categoryStore.watch('categories').subscribe((data) => {
      this.categories = data;
    });
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
      this.toastrService.error('Please fill in the form');
    }
  }
}
