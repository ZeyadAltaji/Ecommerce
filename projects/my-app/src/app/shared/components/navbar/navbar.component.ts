import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from 'projects/authentication/src/app/Areas/components/Login/Login.component';
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

  LoginForm!:FormGroup;
  constructor(private fb:FormBuilder,private router:Router,
    public settingservice:SettingService) { }
  ngOnInit():void {
    this.LoginForm=this.fb.group({
      UserName:['',Validators.required],
      password :['',Validators.required]
    });
    this.settingservice.GetByIDlogo(1).subscribe(data => {
      console.log(data)
      this.logoData = data.isLogoUrl;

    });

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
  onsubmit(){
    if(this.LoginForm.valid){
      console.log(this.LoginForm.value)

    }
    else{
        console.log("Some Error on Email or password ! ")
    }
  }
  onNavigate(){
    window.location.href=environment.authentication_URL;
    // this.router.navigateByUrl(this.apiUrl)
    // this.router.navigateByUrl('/New-User')
  }

}
