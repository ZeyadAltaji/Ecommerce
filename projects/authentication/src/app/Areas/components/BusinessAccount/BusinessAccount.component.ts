import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BusinessAccount } from '../../../Models/User';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-BusinessAccount',
  templateUrl: './BusinessAccount.component.html',
  styleUrls: ['./BusinessAccount.component.css']
})
export class BusinessAccountComponent implements OnInit {
  BusinessAccountForm!: FormGroup;
  user!: BusinessAccount;
  userSubmitted!: boolean;
  constructor(
    @Inject(FormBuilder) private fb:FormBuilder,

    private authService: AuthenticationService,
    private router:Router,
    @Inject(CookieService) private cookieServices:CookieService) { }


  ngOnInit() {
    this.NewUserForm();
  }
  NewUserForm() {
    this.BusinessAccountForm = this.fb.group({
      UserName: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      Email: [null, [Validators.email, Validators.required, Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,10}')]],
      Password: [null, [Validators.required, Validators.minLength(2)]],
      ComfirmPassword: [null, Validators.required]
    },
    { Validators: this.passwordMatchingValidator }
    );
  }
  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('Password')?.value === fc.get('ComfirmPassword')?.value ? null :
      { notmatched: true }
  };

  OnBusinessAccount(BusinessAccountForm:FormGroup){

     this.userSubmitted = true;
    if (this.BusinessAccountForm.valid) {
      this.authService.BusinessAccount(this.userData()).subscribe(
        (data) => {
          this.onReset();



        },
        (error) => {
          console.log(error);

        }
      );

    }
  }
  onReset() {
      this.BusinessAccountForm.reset();
  }
  userData(): BusinessAccount {
    return {
      UserName:this.UserName.value,
      Email: this.Email.value,
      Password: this.Password.value,
      ComfirmPassword: this.ComfirmPassword.value
    };
  }

  get UserName() {
    return this.BusinessAccountForm.get('UserName') as FormControl;
  }
  get Email() {
    return this.BusinessAccountForm.get('Email') as FormControl;
  }
  get Password() {
    return this.BusinessAccountForm.get('Password') as FormControl;
  }
  get ComfirmPassword() {
    return this.BusinessAccountForm.get('ComfirmPassword') as FormControl;
  }

}
