import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from 'projects/authentication/src/app/Areas/components/Login/Login.component';
import { Environment } from 'projects/authentication/src/app/Environments/Environment';
import ValidateForms from 'projects/authentication/src/app/Helper/ValidateForms';
import { UserForLogin } from 'projects/authentication/src/app/Models/User';
import { AuthenticationService } from 'projects/authentication/src/app/services/authentication.service';
import { SettingService } from 'projects/dashboard/src/app/services/Setting.service';
import { environment } from 'projects/my-app/src/environments/environment.development';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showcart: boolean = false;
  showUser: boolean = false;
  showsearch: boolean = false;
   logoData!: any;

   loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private router:Router,
    public settingservice:SettingService,
    private cookieServices:CookieService,
    private authService : AuthenticationService) { }
  ngOnInit():void {
    this.loginForm=this.fb.group({
      UserName:['',Validators.required],
      password :['',Validators.required]
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
  mycart() {
    // this.active = true;
    if (this.showcart == false) {
      this.showcart = true;
      this.showUser = false
      this.showsearch = false;
    }
    else {
      this.showcart = false;
    }
  }
  myuser() {
    if (this.showUser == false) {
      this.showUser = true;
      this.showcart = false;
      this.showsearch = false;
    }
    else {
      this.showUser = false;
    }
  }
  mymenu() {
    if (this.showsearch == false) {
      this.showsearch = true;
      this.showcart = false;
      this.showUser = false;

    }
    else {
      this.showsearch = false;
    }

  }
  // onsubmit(){
  //   if(this.LoginForm.valid){
  //     console.log(this.LoginForm.value)

  //   }
  //   else{
  //       console.log("Some Error on Email or password ! ")
  //   }
  // }
  onNavigate(){
    window.location.href=environment.authentication_URL;
    // this.router.navigateByUrl(this.apiUrl)
    // this.router.navigateByUrl('/New-User')
  }

}
