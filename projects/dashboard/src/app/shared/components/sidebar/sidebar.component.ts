import { Component, Inject, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Environment } from 'projects/authentication/src/app/Environments/Environment';
import { ContactUsService } from '../../../services/ContactUs.service';
import { IContactUs } from '../../../Models/IContactUs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor( @Inject(CookieService) private cookieServices:CookieService,private contactUsService: ContactUsService){}
// @Input()sidenav:boolean=false;
isDropdownOpen = false;
unansweredCount: number = 0;
    ngOnInit() {
      // interval(1000).subscribe(() => {
      this.getUnansweredMessageCount();
    // });
    }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  logout() {
    // Clear the logged-in user information and redirect to the login page
    this.cookieServices.delete('loggedInUser');
    window.location.href = Environment.AuthURl;
  }
  getUnansweredMessageCount() {

    this.contactUsService.GetAllMessages().subscribe((messages: IContactUs[]) => {
      this.unansweredCount = messages.filter(message => message.show === true).length;
    });
  }

}
