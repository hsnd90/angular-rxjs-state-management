import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoryStore } from 'src/app/stores/category.store';

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
  id: string = '';

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.categoryStore.watch('categories').subscribe((data: any) => {
        try {
          const category = data.find(
            (category: any) => category._id === this.id
          );
          this.categoryForm.patchValue({
            name: category.Name,
          });
        } catch (error) {}
      });
    }
  }

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
