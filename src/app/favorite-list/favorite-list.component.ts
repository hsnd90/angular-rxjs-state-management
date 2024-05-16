import { Component, inject } from '@angular/core';
import { ProductStore } from '../stores/product.store';
import { Product } from '../models/product.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
  standalone: true,
  imports: [NgFor],
})
export class FavoriteListComponent {
  productStore: InstanceType<typeof ProductStore> = inject(ProductStore);
  favoriteProducts: Product[] = [];

  constructor() {
    this.favoriteProducts = this.productStore.favoriteProducts();
  }
}
