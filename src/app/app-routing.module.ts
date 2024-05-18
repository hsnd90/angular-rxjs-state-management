import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { OrderComponent } from './order/order.component';
import { BasketDetailComponent } from './basket-detail/basket-detail.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
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
    component: CategoryListComponent,
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
  },
  {
    path: 'basket-detail',
    component: BasketDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
