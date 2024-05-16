import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasketComponent } from './basket/basket.component';
import { ListComponent } from './list/list.component';
import { OrderComponent } from './order/order.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BasketDetailComponent } from './basket-detail/basket-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { ProductStore } from './stores/product.store';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ParameterStore } from './stores/parameter.store';

@NgModule({
  declarations: [
    AppComponent,
    BasketComponent,
    ListComponent,
    OrderComponent,
    NavbarComponent,
    BasketDetailComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfileComponent,
    FavoriteListComponent,
    ReactiveFormsModule
  ],
  providers: [ProductStore,ParameterStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
