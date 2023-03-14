import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { NewEmployyesComponent } from './components/employees/New-employyes/New-employyes.component';
import { ProductsListComponent } from './components/products/components/products-list/products-list.component';
import { ProductsNewComponent } from './components/products/components/products-New/products-New.component';
import { EditEmployyesComponent } from './components/employees/edit-employyes/edit-employyes.component';
import { ProductsEditComponent } from './components/products/components/Products-edit/Products-edit.component';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { ReportsListComponent } from './components/Reports/Reports-list/Reports-list.component';
import { MessagesListComponent } from './components/Messages/Messages-list/Messages-list.component';
import { AnalyticsComponent } from './components/Analytics/Analytics.component';
import { CategoryComponent } from './components/Category/Category.component';



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
    CategoryComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
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
    CategoryComponent
  ]
})
export class PageModule { }
