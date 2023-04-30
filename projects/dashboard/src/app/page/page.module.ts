import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsListComponent } from './components/products/components/products-list/products-list.component';
import { ProductsNewComponent } from './components/products/components/products-New/products-New.component';
import { EditEmployyesComponent } from './components/employees/edit-employyes/edit-employyes.component';
import { ProductsEditComponent } from './components/products/components/Products-edit/Products-edit.component';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { ReportsListComponent } from './components/Reports/Reports-list/Reports-list.component';
import { MessagesListComponent } from './components/Messages/Messages-list/Messages-list.component';
import { AnalyticsComponent } from './components/Analytics/Analytics.component';
import { CategoryListComponent } from './components/Category/Category-list/Category-list.component';
import { CategoryNewComponent } from './components/Category/Category-new/Category-new.component';
import { CategoryEditComponent } from './components/Category/Category-edit/Category-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { NewEmployyesComponent } from './components/employees/New-employyes/New-employyes.component';
import { CarsNewComponent } from './components/Cars/Cars-New/Cars-New.component';
import { CarsEditComponent } from './components/Cars/Cars-edit/Cars-edit.component';
import { CarsLsitComponent } from './components/Cars/Cars-lsit/Cars-lsit.component';
import { BrandEditComponent } from './components/Brand/Brand-edit/Brand-edit.component';
import { BrandNewComponent } from './components/Brand/Brand-New/Brand-New.component';
import { BrandListComponent } from './components/Brand/Brand-list/Brand-list.component';
import { NewSubProductsComponent } from './components/SubProducts/NewSubProducts/NewSubProducts.component';
import { ListProductsComponent } from './components/SubProducts/ListProducts/ListProducts.component';
import { EditSubProductsComponent } from './components/SubProducts/EditSubProducts/EditSubProducts.component';
import { SettingsComponent } from './components/settings/settings/settings.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    // Employees
    EmployeesListComponent,
    NewEmployyesComponent,
    EditEmployyesComponent,
    //products
    ProductsListComponent,
    ProductsNewComponent,
    ProductsEditComponent,
    //order
    OrderListComponent,
    //Reports
    ReportsListComponent,
    //Messages
    MessagesListComponent,
    // Analytics
    AnalyticsComponent,
    // category
    CategoryListComponent,
    CategoryNewComponent,
    CategoryEditComponent,
    //cars
    CarsNewComponent,
    CarsEditComponent,
    CarsLsitComponent,
    // Brand
    BrandEditComponent,
    BrandNewComponent,
    BrandListComponent,
    //subproducts
    NewSubProductsComponent,
    ListProductsComponent,
    EditSubProductsComponent,
    SettingsComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,

  ],exports:[
    // Employees
    EmployeesListComponent,
    NewEmployyesComponent,
    EditEmployyesComponent,
    //products
    ProductsListComponent,
    ProductsNewComponent,
    ProductsEditComponent,
    //order
    OrderListComponent,
    //Reports
    ReportsListComponent,
    //Messages
    MessagesListComponent,
    // Analytics
    AnalyticsComponent,
    // category
    CategoryListComponent,
    CategoryNewComponent,
    CategoryEditComponent,

    //cars
    CarsNewComponent,
    CarsEditComponent,
    CarsLsitComponent,
    // Brand
    BrandEditComponent,
    BrandNewComponent,
    BrandListComponent,
    //subproducts
    NewSubProductsComponent,
    ListProductsComponent,
    EditSubProductsComponent,
    SettingsComponent
  ]
})
export class PageModule { }
