import { Component, inject } from '@angular/core';
import { BasketStore } from '../stores/basket.store';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  basketStore: InstanceType<typeof BasketStore> = inject(BasketStore);

  constructor() {
    this.basketStore.onChanged$.subscribe((data: any) => {
      this.productCount = data.values.length;
    });
  }

  productCount = 0;
}
