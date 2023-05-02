import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessAccountComponent } from 'projects/authentication/src/app/Areas/components/BusinessAccount/BusinessAccount.component';
import { LoginComponent } from 'projects/authentication/src/app/Areas/components/Login/Login.component';
import { PaymentPageComponent } from 'projects/authentication/src/app/Areas/components/Payment-page/Payment-page.component';
import { UserAccountComponent } from 'projects/authentication/src/app/Areas/components/UserAccount/UserAccount.component';
import { ErrorComponent } from './Error/components/Error/Error.component';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { SectionHomeComponent } from './home/components/section-home/section-home.component';
import { ProductsDetailComponent } from './products/components/products-detail/products-detail.component';
import { ShoppingcartComponent } from './products/components/shoppingcart/shoppingcart.component';
import { SingleProducteSelftComponent } from './products/components/single-producte-selft/single-producte-selft.component';
import { ViewAllProductsComponent } from './products/components/view-all-products/view-all-products.component';

const routes: Routes = [
      {
        path: '',
        children: [
          {
            path: '',
            component: SectionHomeComponent ,
          },
          {
            path: '', component: HomePageComponent ,outlet:'secondary'
          }

        ]
      },
      {
        path: 'Home-page',
        children: [
          {
            path: '',
            component: SectionHomeComponent ,
          },
          {
            path: '', component: HomePageComponent ,outlet:'secondary'
          }

        ]
      },
      {
        path: 'View-All-Products/:id',
         component: ViewAllProductsComponent
      },
      {
        path: "View-All-Products/productsbyId",
        component:SingleProducteSelftComponent
      },
      {
        path: "Products-Detail",
        component:ProductsDetailComponent
      },
      {
        path:"shoppingCartPage",
        component:ShoppingcartComponent
      },
      {
        path: '**', pathMatch: 'full',
        component: ErrorComponent
      }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
