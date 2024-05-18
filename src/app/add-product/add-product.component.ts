import { ProductStore } from './../stores/product.store';
import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryStore } from '../stores/category.store';
import { Product } from '../models/product.model';

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
    Name: new FormControl('', Validators.required),
    Code: new FormControl('', Validators.required),
    UnitPrice: new FormControl(0, [Validators.required]),
    Category: new FormControl('', [Validators.required, Validators.min(1)]),
  });
  id: string = '';
  product?: Product;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.product = this.productStore.state.find((p) => p._id === this.id);
      this.productForm.patchValue({
        Name: this.product?.Name,
        Code: this.product?.Code,
        UnitPrice: this.product?.UnitPrice,
        Category: this.product?.Category?._id,
      });
    }
  }

  async ngOnInit() {
    this.categoryStore.watch('categories').subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.id) {
        this.productStore.editProduct({
          ...this.product!,
          Name: this.productForm.value.Name!,
          Code: this.productForm.value.Code!,
          UnitPrice: this.productForm.value.UnitPrice!,
          Category: this.productForm.value.Category!,
        });
        this.productForm.reset();
        this.router.navigate(['/list']);
      } else {
        this.productStore.addProduct({
          Name: this.productForm.value.Name!,
          Code: this.productForm.value.Code!,
          UnitPrice: this.productForm.value.UnitPrice!,
          Category: this.productForm.value.Category!,
          QuantitySold: 0,
        });
        this.productForm.reset();
        this.router.navigate(['/list']);
      }
    } else {
      this.toastrService.error('Please fill in the form');
    }
  }
}
