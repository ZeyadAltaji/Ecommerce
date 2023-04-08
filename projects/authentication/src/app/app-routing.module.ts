import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from 'projects/my-app/src/app/Error/components/Error/Error.component';
import { BusinessAccountComponent } from './Areas/components/BusinessAccount/BusinessAccount.component';
import { LoginComponent } from './Areas/components/Login/Login.component';
import { PaymentPageComponent } from './Areas/components/Payment-page/Payment-page.component';
import { UserAccountComponent } from './Areas/components/UserAccount/UserAccount.component';
import { RestPasswordComponent } from './Areas/components/RestPassword/RestPassword.component';

const routes: Routes = [
  {
    path:"shoppingCartPage/Payment",
    component:PaymentPageComponent
  },
  {
      path:"New-User",
      component:UserAccountComponent
  },
  {
    path:"Login",
    component:LoginComponent
  },
  {
    path:"BusinessAccount",
    component:BusinessAccountComponent
  },
  {
    path:"Rest_Password",
    component:RestPasswordComponent
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
