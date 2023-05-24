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
        case 3:
          // // Check if the customer has chosenProducts
          // if (this. ().length > 0) {
          //   return Environment.ClinetURlShop; // Redirect to shoppingCartPage
          // } else {
          //   return Environment.ClinetURlHome; // Redirect to http://localhost:4201/ if the cart is empty
          // }
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
