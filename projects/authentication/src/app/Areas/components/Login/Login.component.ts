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

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  user:User | undefined;
  loggedInUser: any;

   constructor(private router:Router,
   private authService : AuthenticationService,
   private builder : FormBuilder,
   private cookieServices:CookieService) { }
   ngOnInit():void {
    this.loginForm=this.builder.group({
      UserName:this.builder.control('',Validators.required),
      Password:this.builder.control('',Validators.required)
    })
  }
  static GetAppURL(RoleName:number){
    switch(RoleName)
    {
      case 1:
        return Environment.AdminURL;
      case 2 :
        return Environment.SellerURl;
      default:
        return Environment.AdminURL;

    }

  }
  onLogin(loginForm: FormGroup) {
    if (this.loginForm.valid) {
       this.authService.AuthenticationLogin(this.loginForm.value).subscribe({
        next: (response:User) => {
          console.log(response);
          const user = response;
          if (user) {
                const GetAppURL = LoginComponent.GetAppURL(user.role);
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
