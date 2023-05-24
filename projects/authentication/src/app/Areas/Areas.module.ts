import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountComponent } from './components/UserAccount/UserAccount.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/Login/Login.component';
import { BusinessAccountComponent } from './components/BusinessAccount/BusinessAccount.component';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RestPasswordComponent } from './components/RestPassword/RestPassword.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers:[
    AuthenticationService
  ]
  ,
  declarations: [
    UserAccountComponent,
    LoginComponent,
    BusinessAccountComponent,
    RestPasswordComponent

  ]
})
export class AreasModule { }
