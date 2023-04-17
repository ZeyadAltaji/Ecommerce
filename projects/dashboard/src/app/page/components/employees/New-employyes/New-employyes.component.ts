import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'projects/authentication/src/app/services/authentication.service';
import { User } from 'projects/dashboard/src/app/Classes/User';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';

@Component({
  selector: 'app-New-employyes',
  templateUrl: './New-employyes.component.html',
  styleUrls: ['./New-employyes.component.css']
})
export class NewEmployyesComponent implements OnInit {

  constructor(private router: Router,
    private userService:AuthenticationService,
   private fb: FormBuilder,
   private sweetAlertService :SweetAlertService)
  { }
      NewEmployyesForm!:FormGroup;
      User=new User();
    ngOnInit() {
      this.AddNewUserForm();
  }
  OnSubmit(){
    this.userData();
    const selectedValue = this._selectRole.value;

    if (selectedValue === '3') {
      this.userService.registerUserNormal(this.User).subscribe(
        (res) => {
          this.sweetAlertService.success("Success", "User added successfully.");
        },
        err => {
          this.sweetAlertService.error("Error", "There was an error creating the user account.");
        }
      );
    } else if (selectedValue === '2') {
      this.userService.createBusinessAccountNormal(this.User).subscribe(
        (res) => {
          console.log("Success", "User Business added successfully.");
        },
        err => {
          console.log("Error", "There was an error creating the user account.");
        }
      );
      } else {
        console.error('Invalid option selected:', selectedValue);
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

    },
    { Validators: this.passwordMatchingValidator }
    );
  }
  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('Password')?.value === fc.get('ComfirmPassword')?.value ? null :
      { notmatched: true }
  };
  userData(): void {

    this.User.frist_Name= this.FristName.value,
    this.User.last_Name= this.LastName.value,
    this.User.userName= this.UserName.value,
    this.User.email= this._Email.value,
    this.User.password= this._Password.value,
    this.User.comfirmPassword= this._ComfirmPassword.value,
    this.User.phone1= this._Mobile1.value,
    this.User.phone2= this._Mobile2.value,
    this.User.address= this._Address.value,
    this.User.role= this._selectRole.value


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

}
