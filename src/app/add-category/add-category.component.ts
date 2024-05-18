import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryStore } from '../stores/category.store';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
  readonly categoryStore: InstanceType<typeof CategoryStore> =
    inject(CategoryStore);
  categoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private location: Location) {}

  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryStore.addCategory({
        Name: this.categoryForm.value.name!,
      });
      this.categoryForm.reset();
      this.location.back();
    }
  }
}
