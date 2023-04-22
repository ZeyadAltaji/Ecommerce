import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsNewComponent } from './components/products-New/products-New.component';
import { ProductsEditComponent } from './components/Products-edit/Products-edit.component';



@NgModule({
  declarations: [
  //products
  ProductsListComponent,
  ProductsNewComponent,
  ProductsEditComponent,

],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[
      //products
  ProductsListComponent,
  ProductsNewComponent,
  ProductsEditComponent,
  ]
})
export class ProductsModule { }
