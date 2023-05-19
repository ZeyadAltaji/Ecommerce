import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';

@Component({
  selector: 'app-Profile-page',
  templateUrl: './Profile-page.component.html',
  styleUrls: ['./Profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  loggedInUser: any; // Declare a variable to store the logged-in user details
  public user :IUser | undefined;
  constructor(private cookieServices:CookieService){}

  ngOnInit() {
    const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }
  }

}
