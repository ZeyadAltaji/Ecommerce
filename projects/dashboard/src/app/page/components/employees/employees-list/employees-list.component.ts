import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'projects/authentication/src/app/services/authentication.service';
import { User } from 'projects/dashboard/src/app/Classes/User';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
import { interval } from 'rxjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  constructor(public userService:AuthenticationService) { }
  ListUser:IUser[]|undefined;
  DataUser=new User();
  selectedEmployee: User|undefined;
  public mainPhotoUrl: string | null = null;
  UrlImage = '';

   ngOnInit() {
    interval(1000).subscribe(() => {
      this.userService.GetAllUser().subscribe(listData=>{
        this.userService.ListUser=listData as IUser[];
        },
      error => {
        console.log('httperror:');
        console.log(error);
      });
    });
  }
  openModal(id: number) {
    this.userService.GetByIdModal(id)
      .subscribe(response => {
        this.selectedEmployee = response;
        this.UrlImage = `assets/image/Users/${response.public_id}`;

        const modal = document.getElementById('DataUserModal');
        modal?.classList.add('show');
        modal?.setAttribute('style', 'display: block; padding-right: 17px;');
        const modalBackdrop = document.createElement('div');
        modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');
        document.body.appendChild(modalBackdrop);
      });
  }
  closeModal() {
    const modal = document.getElementById('DataUserModal');
   modal?.classList.remove('show');
   modal?.setAttribute('style', 'display: none; padding-right: 0;');
   const modalBackdrop = document.querySelector('.modal-backdrop');
   modalBackdrop?.parentNode?.removeChild(modalBackdrop);
 }
 DeleteMehtods(id: number){
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "error",
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      this.userService.DeleteUser(id).subscribe((response) => {
        console.log(id);
        if (response) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        }
      });
    }
  });
 }
 setImageUrl(imageUrl: string) {
  this.DataUser.image_userUrl = imageUrl;
}
}
