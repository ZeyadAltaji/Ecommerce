import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsDetailComponent } from './components/products-detail/products-detail.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { SingleProducteSelftComponent } from './components/single-producte-selft/single-producte-selft.component';
import { ViewAllProductsComponent } from './components/view-all-products/view-all-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductsDetailComponent,
    ShoppingcartComponent,
    SingleProducteSelftComponent,
    ViewAllProductsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    ProductsDetailComponent,
    ShoppingcartComponent,
    SingleProducteSelftComponent,
    ViewAllProductsComponent
  ]
})
export class ProductsModule { }
