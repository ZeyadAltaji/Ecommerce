import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Error/components/Error/Error.component';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { SectionHomeComponent } from './home/components/section-home/section-home.component';
import { ProductsDetailComponent } from './products/components/products-detail/products-detail.component';
import { ShoppingcartComponent } from './products/components/shoppingcart/shoppingcart.component';
import { SingleProducteSelftComponent } from './products/components/single-producte-selft/single-producte-selft.component';
import { ViewAllProductsComponent } from './products/components/view-all-products/view-all-products.component';
 import { Privacy_policyComponent } from './home/privacy_policy/privacy_policy.component';
import { PaymentPageComponent } from './Payment-page/Payment-page.component';
import { OrderPageComponent } from './OrderPage/OrderPage.component';
import { Contact_usComponent } from './home/components/contact_us/contact_us.component';

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
        path: 'View-All-Products/:type/:id',
         component: ViewAllProductsComponent
      },
      {
        path: 'ByProducts/:id',
         component: SingleProducteSelftComponent
      },
      {
        path: "Products/:id",
        component:SingleProducteSelftComponent
      },
      {
        path: "Products/Products-Detail/:id",
        component:ProductsDetailComponent
      },
      {
        path:"shoppingCartPage",
        component:ShoppingcartComponent
      },
      {
        path:"Contact_Us",
        component:Contact_usComponent
      },
      {
        path:"PrivacyPolicy",
        component:Privacy_policyComponent
      },
      {
        path:"shoppingCartPage/Payment",
        component:PaymentPageComponent
      },
      {
        path:"shoppingCartPage/Order",
        component:OrderPageComponent
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
