import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { BusinessAccount } from '../../../Models/User';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';

@Component({
  selector: 'app-BusinessAccount',
  templateUrl: './BusinessAccount.component.html',
  styleUrls: ['./BusinessAccount.component.css'],
})
export class BusinessAccountComponent implements OnInit {
  BusinessAccountForm!: FormGroup;
  user!: BusinessAccount;
  userSubmitted!: boolean;
  usernameExists = false;
  emailExists = false;
  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,

    private authService: AuthenticationService,
    private router: Router,
    @Inject(CookieService) private cookieServices: CookieService
  ) {}

  ngOnInit() {
    this.NewUserForm();
  }
  NewUserForm() {
    this.BusinessAccountForm = this.fb.group(
      {
        UserName: [
          null,
          [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')],
        ],
        Email: [
          null,
          [
            Validators.email,
            Validators.required,
            Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,10}'),
          ],
        ],
        Password: [null, [Validators.required, Validators.minLength(2)]],
        ComfirmPassword: [null, Validators.required],
      },
      { Validators: this.passwordMatchingValidator }
    );
  }
  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('Password')?.value === fc.get('ComfirmPassword')?.value
      ? null
      : { notmatched: true };
  }

  OnBusinessAccount(BusinessAccountForm: FormGroup) {

    this.userSubmitted = true;
    if (this.BusinessAccountForm.valid) {

      const newUser: BusinessAccount = this.userData();

      this.authService.GetAllUser().pipe(first()).subscribe(
        (users: IUser[]) => {
          const usernameExists = users.some(user => user.userName === newUser.UserName);
          const emailExists = users.some(user => user.email === newUser.Email);
          if (usernameExists) {
            this.usernameExists=true;
             // Display an error message to the user or perform any other required action
          }

          if (emailExists) {
            this.emailExists=true;
             // Display an error message to the user or perform any other required action
          }
          if (!usernameExists && !emailExists) {

            this.authService.BusinessAccount(newUser).subscribe(
              (data) => {
                this.onReset();
                this.router.navigate(['/Login']);

              },
              (error) => {
                console.log(error);
              }
            );
          }
        }
      )

    }
  }
  onReset() {
    this.BusinessAccountForm.reset();
  }
  userData(): BusinessAccount {
    return {
      UserName: this.UserName.value,
      Email: this.Email.value,
      Password: this.Password.value,
      ComfirmPassword: this.ComfirmPassword.value,
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
