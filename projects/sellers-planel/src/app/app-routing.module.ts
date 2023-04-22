import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products/components/products-list/products-list.component';
import { ProductsNewComponent } from './products/components/products-New/products-New.component';
import { ProductsEditComponent } from './products/components/Products-edit/Products-edit.component';
import { AnalyticsComponent } from './analytics/components/Analytics/Analytics.component';
import { ProfilePageComponent } from './profile-user/Components/Profile-page/Profile-page.component';
import { EditUserProfileComponent } from './profile-user/Components/edit-user-profile/edit-user-profile.component';

const routes: Routes = [
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
