import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { RouterModule } from '@angular/router';
import { OrdersComponent } from './Orders/Orders.component';



@NgModule({
  declarations: [
    OrdersComponent
   ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    OrdersComponent
  ]
})
export class PagesModule { }
