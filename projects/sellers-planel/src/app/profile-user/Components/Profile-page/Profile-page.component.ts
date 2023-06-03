import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Environment } from 'projects/authentication/src/app/Environments/Environment';
import { AuthenticationService } from 'projects/authentication/src/app/services/authentication.service';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
import swal from 'sweetalert';

@Component({
  selector: 'app-Profile-page',
  templateUrl: './Profile-page.component.html',
  styleUrls: ['./Profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  loggedInUser: any; // Declare a variable to store the logged-in user details
  public user :IUser | undefined;
  constructor(private cookieServices:CookieService,public userService:AuthenticationService){}

  ngOnInit() {
    const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }
  }

  DeleteMehtods(id: number): void {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'error',
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        debugger
        this.userService.DeleteUser(id).subscribe(
          (response) => {
            if (response) {
              swal('Poof! Your imaginary file has been deleted!', {
                icon: 'success',
              }).then(() => {
                this.cookieServices.delete('loggedInUser'); // Delete the loggedInUser cookie
                window.location.href = Environment.AuthURl; // Redirect to the specified URL
              });
            }
          },
          (error) => {
            console.error('Deletion failed:', error);
          }
        );
      }
    });
  }

}
