import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Environment } from 'projects/authentication/src/app/Environments/Environment';

@Component({
  selector: 'app-Sidebar',
  templateUrl: './Sidebar.component.html',
  styleUrls: ['./Sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private cookieServices: CookieService) {}

  ngOnInit() {}
  logout() {
    // Clear the logged-in user information and redirect to the login page
    this.cookieServices.delete('loggedInUser');
    window.location.href = Environment.AuthURl;
  }
}
