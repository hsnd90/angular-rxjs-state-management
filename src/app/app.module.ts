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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParameterStore } from './stores/parameter.store';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryStore } from './stores/category.store';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BasketComponent,
    ListComponent,
    OrderComponent,
    NavbarComponent,
    BasketDetailComponent,
    AddProductComponent,
    CategoryListComponent,
    AddCategoryComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ProfileComponent,
    FavoriteListComponent,
    ReactiveFormsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
  ],
  providers: [ProductStore, ParameterStore, CategoryStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
