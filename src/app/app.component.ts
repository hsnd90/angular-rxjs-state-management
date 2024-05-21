import { Component, inject, OnDestroy } from '@angular/core';
import { CategoryStore } from './stores/category.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private readonly categoryStore: InstanceType<typeof CategoryStore>;

  constructor() {
    this.categoryStore = inject(CategoryStore);

    this.categoryStore.watch('categories').subscribe((data: any) => {
      if (data) console.log('Ana kategoriler güncellendi.', data);
    });
  }

  ngOnDestroy(): void {}
}
