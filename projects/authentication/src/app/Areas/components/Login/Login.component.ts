import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from '../../../Models/User';
 import { AuthenticationService } from '../../../services/authentication.service';
import ValidateForms from '../../../Helper/ValidateForms';
import { User } from 'projects/dashboard/src/app/Classes/User';
import { environment } from 'projects/authentication/src/environments/environment.development';
import { Environment } from '../../../Environments/Environment';
import { CookieService } from 'ngx-cookie-service';
import { SettingService } from 'projects/dashboard/src/app/services/Setting.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  user:User | undefined;
  loggedInUser: any;
  logoData!: any;
  cartItems: any[] = [];

  static cookieServiceee: CookieService; // declare the static property

   constructor(private router:Router,
   private authService : AuthenticationService,
   private builder : FormBuilder,
   private cookieServices:CookieService,
   public settingservice:SettingService) { }
   ngOnInit():void {
    this.loginForm=this.builder.group({
      UserName:this.builder.control('',Validators.required),
      Password:this.builder.control('',Validators.required)
    });
    this.settingservice.GetByIDlogo(1).subscribe(data => {
      console.log(data)
      this.logoData = data.isLogoUrl;

    });
  }

  static GetAppURL(RoleName:number){
    switch(RoleName)
    {
      case 1:
        return Environment.AdminURL;
      case 2 :
        return Environment.SellerURl;
      case 4 :
        return Environment.DeliveryURl;
      default:
        return Environment.AdminURL;

    }

  }
  onLogin(loginForm: FormGroup) {
    if (this.loginForm.valid) {
      debugger
       this.authService.AuthenticationLogin(this.loginForm.value).subscribe({
        next: (response:UserForLogin) => {
          console.log(response);
          const user = response;
          const role = user.fullUser.role;
          if (user ) {
            debugger

            if (role === 1) {

              window.location.href = Environment.AdminURL
            }
           //sler
           if (role === 2  ) {
              window.location.href = Environment.AdminURL;

              }
             //clinet
           if (role === 3 && this.cartItems.length > 0) {
             // Redirect to the shopping cart page
             window.location.href = Environment.ClinetURlShop;
              } else {
             // Redirect to the home page

             window.location.href = Environment.ClinetURlHome;

            }
            if (role === 4  ) {
              window.location.href = Environment.DeliveryURl;

              }
                const GetAppURL = LoginComponent.GetAppURL(user.fullUser.role);
                // Redirect to the appropriate URL based on the role
                window.location.href = GetAppURL;
                this.cookieServices.set('loggedInUser', JSON.stringify(user));
              }

        },
        error: (err) => {
          console.log(err?.error.message);
        }
      });
    } else {
      console.log("Invalid Data");
      ValidateForms.validateAllFroms(this.loginForm);
    }
  }



}
