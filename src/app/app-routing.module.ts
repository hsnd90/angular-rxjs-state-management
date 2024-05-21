import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { BasketDetailComponent } from './basket-detail/basket-detail.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { ProductListComponent } from './products/product-list/product-list.component';

const routes: Routes = [
  {
    path: 'products',
    children: [
      { path: '', component: ProductListComponent },
      {
        path: 'add-product',
        component: AddProductComponent,
      },
      {
        path: 'edit-product/:id',
        component: AddProductComponent,
      },
    ],
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'categories',
    children: [
      { path: '', component: CategoryListComponent },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'edit-category/:id',
        component: AddCategoryComponent,
      },
    ],
  },
  {
    path: 'basket-detail',
    component: BasketDetailComponent,
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
