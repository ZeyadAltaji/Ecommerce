import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'projects/authentication/src/app/services/authentication.service';
import { User } from 'projects/dashboard/src/app/Classes/User';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';

@Component({
  selector: 'app-New-employyes',
  templateUrl: './New-employyes.component.html',
  styleUrls: ['./New-employyes.component.css']
})
export class NewEmployyesComponent implements OnInit {
  NewEmployyesForm!:FormGroup;
  User=new User();
  formData: FormData = new FormData();
  loggedInUser: any;
  public user :IUser | undefined;

  @ViewChild('imageInput') imageInput?: ElementRef;

  constructor(private router: Router,
   private userService:AuthenticationService,
   private fb: FormBuilder,
   private sweetAlertService :SweetAlertService,
   @Inject(CookieService) private cookieServices:CookieService
   )
  { }


    ngOnInit() {
      const userString = this.cookieServices.get('loggedInUser');
      this.loggedInUser = userString ? JSON.parse(userString) : null;
      if (this.loggedInUser && this.loggedInUser.fullUser) {
        this.user = this.loggedInUser.fullUser;
      }
      this.AddNewUserForm();
  }
  OnSubmit(){
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      const adminId = this.loggedInUser.fullUser.id; // Get the adminid from the logged-in user
      const username = this.loggedInUser.fullUser.userName; // Get the adminid from the logged-in user
      this.userData(adminId,username);// Pass the adminid to the MapCars method
      const selectedValue = this._selectRole.value;
    if (selectedValue === '3') {
      this.userService.NewUser(this.formData).subscribe(
        (res) => {
          this.sweetAlertService.success("Success", "User added successfully.");
          this.router.navigate(['/Employyes']);

        },
        err => {
          this.sweetAlertService.error("Error", "User already exists, please try different user name.");
        }
      );
    } else if (selectedValue === '2') {
      this.userService.NewUser(this.formData).subscribe(
        (res) => {
          console.log("Success", "User Business added successfully.");
          this.sweetAlertService.success("Success", "User Business added successfully.");
          this.router.navigate(['/Employyes']);

        },
        err => {
          console.log("Error", "User already exists, please try different user name.");
        }
      );
      } else {
        console.error('Invalid option selected:', selectedValue);
      }

    }
  }
  AddNewUserForm() {
    this.NewEmployyesForm = this.fb.group({
      FirstName: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      lastName: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      UserName: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      Email: [null, [Validators.email, Validators.required, Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,10}')]],
      Password: [null, [Validators.required, Validators.minLength(2)]],
      ConfirmPassword: [null, Validators.required],
      Address: [null, Validators.required],
      Mobile1: [null, Validators.required],
      Mobile2: [null, Validators.required],
      selectRole: [null, Validators.required],
      image_userUrl :[null, Validators.required],

    },
    { Validators: this.passwordMatchingValidator }
    );
  }
  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('Password')?.value === fc.get('ComfirmPassword')?.value ? null :
      { notmatched: true }
  };
  userData(adminId: number,UserCreate:string) {
    this.formData = new FormData();
    debugger
    this.formData.append('Frist_Name', this.FristName.value);
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
    this.formData.append('Admin_Id', adminId.toString());
    this.formData.append('UserCreate', UserCreate);
}

get FristName() {
  return this.NewEmployyesForm.get('FirstName') as FormControl;
}
get LastName() {
  return this.NewEmployyesForm.get('lastName') as FormControl;
}
get UserName() {
  return this.NewEmployyesForm.get('UserName') as FormControl;
}
get _Email() {
  return this.NewEmployyesForm.get('Email') as FormControl;
}
get _Password() {
  return this.NewEmployyesForm.get('Password') as FormControl;
}
get _ComfirmPassword() {
  return this.NewEmployyesForm.get('ConfirmPassword') as FormControl;
}
get _Address() {
  return this.NewEmployyesForm.get('Address') as FormControl;
}
get _Mobile1() {
  return this.NewEmployyesForm.get('Mobile1') as FormControl;
}
get _Mobile2() {
  return this.NewEmployyesForm.get('Mobile2') as FormControl;
}
get _selectRole(){
  return this.NewEmployyesForm.get('selectRole') as FormControl;
}
get photo(){
  return this.NewEmployyesForm.controls['image_userUrl']as FormGroup;
}
HandleFile(event:any) {
  if (event.target.files !== null && event.target.files.length > 0) {
    const image_userUrl = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgElement = document.getElementById('image') as HTMLImageElement;
      if (imgElement && e.target) {
        imgElement.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(image_userUrl);
  } else {
  }
}

}
