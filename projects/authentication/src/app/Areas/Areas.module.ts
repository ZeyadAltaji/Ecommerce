import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountComponent } from './components/UserAccount/UserAccount.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/Login/Login.component';
import { BusinessAccountComponent } from './components/BusinessAccount/BusinessAccount.component';
import { PaymentPageComponent } from './components/Payment-page/Payment-page.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserAccountComponent,
    LoginComponent,
    BusinessAccountComponent,
    PaymentPageComponent
  ]
})
export class AreasModule { }
