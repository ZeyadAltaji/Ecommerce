import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './home/components/main/main.component';
import { SubPageHomeComponent } from './home/components/sub-page-home/sub-page-home.component';
import { NewEmployyesComponent } from './page/components/employees/New-employyes/New-employyes.component';
import { EditEmployyesComponent } from './page/components/employees/edit-employyes/edit-employyes.component';
import { ProductsListComponent } from './page/components/products/components/products-list/products-list.component';
import { ProductsNewComponent } from './page/components/products/components/products-New/products-New.component';
import { ProductsEditComponent } from './page/components/products/components/Products-edit/Products-edit.component';
import { OrderListComponent } from './page/components/orders/order-list/order-list.component';
import { ReportsListComponent } from './page/components/Reports/Reports-list/Reports-list.component';
import { MessagesListComponent } from './page/components/Messages/Messages-list/Messages-list.component';
import { AnalyticsComponent } from './page/components/Analytics/Analytics.component';
import { CategoryListComponent } from './page/components/Category/Category-list/Category-list.component';
import { CategoryNewComponent } from './page/components/Category/Category-new/Category-new.component';
import { CategoryEditComponent } from './page/components/Category/Category-edit/Category-edit.component';
import { ProfilePageComponent } from './profile-user/Components/Profile-page/Profile-page.component';
import { EditUserProfileComponent } from './profile-user/Components/edit-user-profile/edit-user-profile.component';
import { EmployeesListComponent } from './page/components/employees/employees-list/employees-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainComponent ,
      },
      {
        path: '', component: SubPageHomeComponent ,outlet:'secondary'
      }
    ]
  },
  {
    path: 'Dashboard',
    children: [
      {
        path: '',
        component: MainComponent ,
      },
      {
        path: '', component: SubPageHomeComponent ,outlet:'secondary'
      }
    ]
  },
  //emp
  {
    path:'Employyes',
    component:EmployeesListComponent
  },{
    path:'NewEmployyes',
    component:NewEmployyesComponent
  },
  {
    path:'Edit-Employyes/:id',
    component:EditEmployyesComponent
  },
  //prodcuts
  {
    path:'Prodcuts',
    component:ProductsListComponent
  },
  {
    path:'New-products',
    component:ProductsNewComponent
  },
  {
    path:'Edit-Products/:id',
    component:ProductsEditComponent
  },
  // category
  {
    path:'category',
    component:CategoryListComponent
  },
  {
    path:'Category-new',
    component:CategoryNewComponent
  },
  {
    path:'Edit-Category/:id',
    component:CategoryEditComponent
  },
  //order
  {
    path:'Order-List',
    component:OrderListComponent
  },
  //Reports
  {
    path:'Reports-list',
    component:ReportsListComponent
  },
  //Messages
  {
    path:'Messages-list',
    component:MessagesListComponent
  },
  //Analytics
  {
    path:'Analytics',
    component:AnalyticsComponent
  },
  //profile user
  {
    path:'My-profile',
    component:ProfilePageComponent
  },
  {
    path:'Edit-My-profile',
    component:EditUserProfileComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
