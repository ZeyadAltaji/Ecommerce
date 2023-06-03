import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AreasModule } from 'projects/authentication/src/app/Areas/Areas.module';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorModule } from './Error/Error.module';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { PaymentPageComponent } from './Payment-page/Payment-page.component';
import { OrderPageComponent } from './OrderPage/OrderPage.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopByComponent } from './products/components/ShopBy/ShopBy.component';

@NgModule({
  declarations: [
    AppComponent,
      PaymentPageComponent,
      OrderPageComponent,
      ShopByComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HomeModule,
    ProductsModule,
    AreasModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
