import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../../Classes/User';
import { IUser } from '../../../Models/IUser';
import { SettingService } from '../../../services/Setting.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{
  constructor(private cookieServices:CookieService,public settingservice:SettingService){
  }
  public user :IUser ={
    id: 0,
    userName: '',
    frist_Name: '',
    last_Name: '',
    email: '',
    password: '',
    comfirmPassword: '',
    passwordKey: '',
    phone1: '',
    phone2: '',
    address: '',
    role: 0,
    userCreate: '',
    userUpdate: '',
    isDelete: false,
    isActive: false,
    public_id: '',
   }
  loggedInUser: any; // Declare a variable to store the logged-in user details
  logoData!: any;

  ngOnInit() {

     const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }
    this.settingservice.GetByIDlogo(1).subscribe(data => {
      console.log(data)
      this.logoData = data.isLogoUrl;

    });

  }
  menustatus:boolean=false;
  showdropdown: boolean = false;

  // @Output()sidebarToggled=new EventEmitter<boolean>();
  logo: string = "assets/images/logo.png";

  sidebarToggle(){
    // this.menustatus=!this.menustatus;
    // this.sidebarToggled.emit(this.menustatus);
  }
  dropdown() {
    if (this.showdropdown == false) {
      this.showdropdown = true;

    }
    else {
      this.showdropdown = false;
    }
  }
  logout() {
    // Clear the logged-in user information and redirect to the login page
    this.cookieServices.delete('loggedInUser');
    window.location.href = '/login';
  }
}

