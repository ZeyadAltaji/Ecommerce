import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'projects/authentication/src/app/services/authentication.service';
import { User } from 'projects/dashboard/src/app/Classes/User';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-edit-employyes',
  templateUrl: './edit-employyes.component.html',
  styleUrls: ['./edit-employyes.component.css']
})
export class EditEmployyesComponent implements OnInit {
  EditEmployyesForm!:FormGroup;
  userId:any;
  User=new User();
  formData: FormData = new FormData();
  @ViewChild('imageInput') imageInput?: ElementRef;
  UrlImage = '';
   Frist_Name:any;
  Last_Name:any;
  UserName:any;
  Email:any;
  Phone1:any;
  Phone2:any;
  Address:any;
  password:any;
  comfirmPassword:any;
  Role:any;
  selectedImage!: File;
  loggedInUser: any;
  IsActive: any;

  public user :IUser | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService:AuthenticationService,
    private fb: FormBuilder,
     private sweetAlertService :SweetAlertService,
     private router: Router,
     @Inject(CookieService) private cookieServices:CookieService)
  { }

  ngOnInit() {
    const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }
    this.EditNewUserForm();
    this.userId = this.route.snapshot.params['id']
    this.userService.GetByID(this.userId).subscribe({
      next:(response)=>{
        debugger
        this.User=response;
        this.UrlImage = `assets/image/Users/${response.public_id}`;
        this.Frist_Name = this.EditEmployyesForm.controls['FirstName'].setValue(this.User.frist_Name);
        this.Last_Name = this.EditEmployyesForm.controls['last_Name'].setValue(this.User.last_Name);
        this.UserName = this.EditEmployyesForm.controls['UserName'].setValue(this.User.userName);
        this.Email = this.EditEmployyesForm.controls['Email'].setValue(this.User.email);
        this.Phone1 = this.EditEmployyesForm.controls['Mobile1'].setValue(this.User.phone1);
        this.Phone2 = this.EditEmployyesForm.controls['Mobile2'].setValue(this.User.phone2);
        this.Address = this.EditEmployyesForm.controls['Address'].setValue(this.User.address);
         this.Role = this.EditEmployyesForm.controls['selectRole'].setValue(this.User.role);
         this.IsActive = this.EditEmployyesForm.controls['isActive'].setValue(this.User.isActive == true);

       }
    });
  }
  OnSubmit(){

    if (this.loggedInUser && this.loggedInUser.fullUser) {
      const username = this.loggedInUser.fullUser.userName;
      this.route.paramMap.subscribe({
        next:(params)=>{
           const id=params.get('id');
          if(id){

            const fd = new FormData();
              let imageFile = this.imageInput?.nativeElement.files[0];
              fd.append('Image_userUrl', imageFile);
              fd.append('Frist_Name', this._FristName.value);
              fd.append('Last_Name', this.LastName.value);
              fd.append('UserName', this._UserName.value);
              fd.append('Email', this._Email.value);
              fd.append('Phone1', this._Mobile1.value);
              fd.append('Phone2', this._Mobile2.value);
              fd.append('Address', this._Address.value);
              fd.append('password', this._Password.value);
              fd.append('comfirmPassword', this._ComfirmPassword.value);
              fd.append('userUpdate', this.loggedInUser.fullUser.userName);
              fd.append('Role', this._selectRole.value);
              const activeValue = this._isActive.value || false;

              // Store true or false in FormData based on the values
              fd.append('isActive', activeValue ? 'true' : 'false');
               fd.append('id', id.toString());
              if (this.selectedImage) { // check if a new image is selected
                fd.append('Image_userUrl', this.selectedImage, this.selectedImage.name);
                  }
              // Show a warning message before updating the User
              swal({
                title: "Are you sure?",
                text: "You are about to update the User. Do you want to continue?",
                icon: "warning",
                dangerMode: true,
              })
              .then((willUpdate) => {
                if (willUpdate) {
                  const frist_Name = this.User.frist_Name;
                  const Last_Name = this.User.last_Name;
                  const UserName = this.User.userName;
                  const Email = this.User.email;
                  const Phone1 = this.User.phone1;
                  const Phone2 = this.User.phone2;
                  const Address = this.User.address;
                  const password = this.User.password;
                  const comfirmPassword = this.User.comfirmPassword;
                  const role =this.User.role;
                  const updateimage=this.User.public_id;
                  this.userService.UpdateUser(fd).subscribe(data => {
                     // Show a success message after the User has been updated
                    swal({
                      title: "Success!",
                      text: "The User has been updated.",
                      icon: "success",
                    });
                    this.router.navigate(['/Users']);
                  }, ex => {
                    console.log(ex);
                  });

                }

              })
            }

          }
        });
   }
  }
  HandleFile(event:any){

  }
  EditNewUserForm() {
    this.EditEmployyesForm = this.fb.group({
      FirstName: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      last_Name: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      UserName: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      Email: [null, [Validators.email, Validators.required, Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,10}')]],
       Address: [null, Validators.required],
      Mobile1: [null, Validators.required],
      Mobile2: [null, Validators.required],
      selectRole: [null, Validators.required],
      Password: [null, [Validators.required, Validators.minLength(2)]],
      ConfirmPassword: [null, Validators.required],
      image_userUrl :[null, Validators.required],
      isActive: false

    },
    { Validators: this.passwordMatchingValidator }
    );
  }
  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('Password')?.value === fc.get('ConfirmPassword')?.value ? null :
      { notmatched: true }
  };
  userData(): void {
    this.formData = new FormData();
    this.formData.append('FirstName', this._FristName.value);
    this.formData.append('Last_Name', this.LastName.value);
    this.formData.append('UserName', this.UserName.value);
    this.formData.append('Email', this._Email.value);
    this.formData.append('Password', this._Password.value);
    this.formData.append('ComfirmPassword', this._ComfirmPassword.value);
    this.formData.append('Phone1', this._Mobile1.value);
    this.formData.append('Phone2', this._Mobile2.value);
    this.formData.append('Address', this._Address.value);
    this.formData.append('Role', this._selectRole.value);
    let imageFile = this.imageInput?.nativeElement.files[0];
    this.formData.append('Image_userUrl', imageFile);
  }

  get _FristName() {
     return this.EditEmployyesForm.controls['FirstName'] as FormGroup;

  }
  get LastName() {
    return this.EditEmployyesForm.controls['last_Name'] as FormGroup;

   }
  get _UserName() {

    return this.EditEmployyesForm.controls['UserName'] as FormGroup;
  }
  get _Email() {
    return this.EditEmployyesForm.controls['Email'] as FormGroup;
  }
  get _Password() {
    return this.EditEmployyesForm.controls['Password'] as FormGroup;
  }
  get _ComfirmPassword() {
    return this.EditEmployyesForm.controls['ConfirmPassword'] as FormGroup;
  }
  get _Address() {
    return this.EditEmployyesForm.controls['Address'] as FormGroup;
  }
  get _Mobile1() {
    return this.EditEmployyesForm.controls['Mobile1'] as FormGroup;
  }
  get _Mobile2() {
    return this.EditEmployyesForm.controls['Mobile2'] as FormGroup;
  }
  get _selectRole(){
    return this.EditEmployyesForm.controls['selectRole'] as FormGroup;
  }
  get photo(){
    return this.EditEmployyesForm.controls['image_userUrl']as FormGroup;
  }
  get _isActive(){
    return this.EditEmployyesForm.controls['isActive'] as FormControl;

}
}
