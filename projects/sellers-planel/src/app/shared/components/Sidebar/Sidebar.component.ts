import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Environment } from 'projects/authentication/src/app/Environments/Environment';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';

@Component({
  selector: 'app-Sidebar',
  templateUrl: './Sidebar.component.html',
  styleUrls: ['./Sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public user: IUser = {
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
  };
  loggedInUser: any; // Declare a variable to store the logged-in user details

  constructor(private cookieServices: CookieService) {}

  ngOnInit() {
    const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }
  }
  logout() {
    // Clear the logged-in user information and redirect to the login page
    this.cookieServices.delete('loggedInUser');
    window.location.href = Environment.AuthURl;
  }
}
