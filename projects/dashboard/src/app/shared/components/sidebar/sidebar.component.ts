import { Component, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Environment } from 'projects/authentication/src/app/Environments/Environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private cookieServices:CookieService){}
// @Input()sidenav:boolean=false;
isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  logout() {
    // Clear the logged-in user information and redirect to the login page
    this.cookieServices.delete('loggedInUser');
    window.location.href = Environment.AuthURl;
  }
}
