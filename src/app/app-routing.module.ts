import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { OrderComponent } from './order/order.component';
import { BasketDetailComponent } from './basket-detail/basket-detail.component';
import { AddProductComponent } from './add-product/add-product.component';

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
    ],
  },
  {
    path: 'order',
    component: OrderComponent,
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
