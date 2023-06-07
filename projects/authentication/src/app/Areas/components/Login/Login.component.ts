import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
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
  styleUrls: ['./Login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user: User | undefined;
  loggedInUser: any;
  logoData!: any;
  cartItems: any[] = [];
  loginError: boolean = false;
  IsDelete:boolean=true;
  static cookieServiceee: CookieService; // declare the static property

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private builder: FormBuilder,
    public settingservice: SettingService,
    @Inject(CookieService) private cookieServices: CookieService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.builder.group({
      UserName: this.builder.control('', Validators.required),
      Password: this.builder.control('', Validators.required),
    });
    this.settingservice.GetByIDlogo(1).subscribe((data) => {
      console.log(data);
      this.logoData = data.isLogoUrl;
    });
    const cartId = localStorage.getItem('cartItems');

  }

  static GetAppURL(RoleName: number) {
    switch (RoleName) {
      case 1:
        return Environment.AdminURL;
      case 2:
        return Environment.SellerURl;
      case 4:
        return Environment.DeliveryURl;
      default:
        return Environment.AdminURL;
    }
  }
  onLogin(loginForm: FormGroup) {
    if (this.loginForm.valid) {
      debugger;
      this.authService.AuthenticationLogin(this.loginForm.value).subscribe({
        next: (response: UserForLogin) => {
          debugger
          console.log(response);
          const user = response;
          const role = user.fullUser.role;
          const isDelete = user.fullUser.isDelete;

          if (user) {
            debugger;

            if (isDelete === true) {
              this.IsDelete = false;
            }else{
              if (role === 1) {
                window.location.href = Environment.AdminURL
              }
              //sler
              else if (role === 2) {
                window.location.href = Environment.SellerURl;
              }
              //clinet
              else if (role === 3 && this.cartItems.length > 0) {
                // Redirect to the shopping cart page
                window.location.href = Environment.ClinetURlShop;
              } else if (role === 3) {
                // Redirect to the home page
                window.location.href = Environment.ClinetURlHome;


                // Close the previous page
              } else if (role === 4) {
                window.location.href = Environment.DeliveryURl;
              }
            }


            this.cookieServices.set('loggedInUser', JSON.stringify(user));
          }
        },
        error: (err) => {
          console.log(err?.error.message);
          this.loginError = true; // Set loginError to true in case of error
        },
      });
    } else {
      console.log('Invalid Data');
      ValidateForms.validateAllFroms(this.loginForm);
    }
  }
}
